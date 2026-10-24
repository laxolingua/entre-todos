// Propuestas ciudadanas por país (VOZ): enviar una propuesta, ver las publicadas y apoyarlas.
// Usa la sesión anónima de Supabase (sin correo ni documento). Las propuestas se moderan antes de publicarse.
// Ver supabase/migrations/20261024120000_propuestas_ciudadanas.sql.
import { sb, sesion, ACTIVA, escapar } from './participacion.js';

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fecha = (s) => { const d = new Date(s); return `${d.getDate()} de ${MESES[d.getMonth()]}`; };

export function iniciarCiudadania(raiz) {
  const pais = raiz.dataset.pais;
  const iconos = JSON.parse(raiz.dataset.iconos || '{}');
  const form = raiz.querySelector('form');
  const estado = raiz.querySelector('[data-estado]');
  const lista = raiz.querySelector('[data-lista]');
  const filtro = raiz.querySelector('[data-filtro]');
  let todas = [];
  let mios = new Set();

  if (!ACTIVA) {
    form.querySelectorAll('input,select,textarea,button').forEach((x) => { x.disabled = true; });
    estado.textContent = 'La participación está desactivada en esta versión del sitio.';
    lista.innerHTML = '';
    return;
  }

  function pintar() {
    const t = filtro.value;
    const ver = t ? todas.filter((p) => p.tema === t) : todas;
    if (!ver.length) {
      lista.innerHTML = `<p class="discreto">${t ? 'Todavía no hay propuestas publicadas sobre este tema.' : 'Todavía no hay propuestas publicadas. Puedes ser la primera persona en proponer.'}</p>`;
      return;
    }
    lista.innerHTML = ver.map((p) => `
      <article class="pc-es">
        <p class="pc-tema"><i class="fi ${escapar(iconos[p.tema] || 'fi-br-bulb')}" aria-hidden="true"></i> ${escapar(p.tema)} · ${fecha(p.creado_en)}</p>
        <p class="pc-problema"><strong>Problema:</strong> ${escapar(p.problema)}</p>
        <p class="pc-propuesta">${escapar(p.propuesta)}</p>
        ${p.como ? `<p class="pc-como"><strong>Cómo se haría:</strong> ${escapar(p.como)}</p>` : ''}
        <button type="button" class="boton pc-apoyo" data-apoyar="${p.id}" aria-pressed="${mios.has(p.id)}">
          <i class="fi fi-br-hand-heart" aria-hidden="true"></i> <span>${mios.has(p.id) ? 'Apoyada' : 'Apoyar'}</span> · <strong>${p.apoyos}</strong>
        </button>
      </article>`).join('');
  }

  async function cargar() {
    try {
      const c = await sb();
      const { data, error } = await c.rpc('ciudadania_publicadas', { p_pais: pais });
      if (error) throw error;
      todas = data || [];
      const { data: s } = await c.auth.getSession();
      if (s.session) {
        const { data: m } = await c.rpc('ciudadania_mis_apoyos', { p_pais: pais });
        mios = new Set((m || []).map(Number));
      }
      pintar();
    } catch {
      lista.innerHTML = '<p class="discreto">No se pudieron cargar las propuestas. Vuelve a intentarlo más tarde.</p>';
    }
  }

  filtro.addEventListener('change', pintar);

  lista.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-apoyar]');
    if (!b) return;
    const id = Number(b.dataset.apoyar);
    const apoyar = !mios.has(id);
    b.disabled = true;
    try {
      const c = await sesion();
      const { data, error } = await c.rpc('ciudadania_apoyar', { p_id: id, p_apoyo: apoyar });
      if (error) throw error;
      apoyar ? mios.add(id) : mios.delete(id);
      const p = todas.find((x) => Number(x.id) === id);
      if (p) p.apoyos = data;
      pintar();
    } catch {
      b.disabled = false;
      estado.textContent = 'No se pudo registrar el apoyo. Inténtalo de nuevo.';
    }
  });

  form.addEventListener('input', (e) => { e.target.removeAttribute('aria-invalid'); estado.textContent = ''; });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const tema = d.get('tema'), problema = String(d.get('problema') || '').trim(), propuesta = String(d.get('propuesta') || '').trim();
    if (!tema) { form.tema.setAttribute('aria-invalid', 'true'); estado.textContent = 'Elige un tema.'; form.tema.focus(); return; }
    if (problema.length < 10) { form.problema.setAttribute('aria-invalid', 'true'); estado.textContent = 'Describe el problema en al menos 10 caracteres.'; form.problema.focus(); return; }
    if (propuesta.length < 20) { form.propuesta.setAttribute('aria-invalid', 'true'); estado.textContent = 'Escribe tu propuesta en al menos 20 caracteres.'; form.propuesta.focus(); return; }
    const boton = form.querySelector('button[type=submit]');
    boton.disabled = true;
    estado.textContent = 'Enviando…';
    try {
      const c = await sesion();
      const { error } = await c.rpc('ciudadania_proponer', { p_pais: pais, p_tema: tema, p_problema: problema, p_propuesta: propuesta, p_como: String(d.get('como') || '').trim() || null });
      if (error) throw error;
      form.reset();
      estado.textContent = 'Recibida. Se publicará cuando la revisemos, normalmente en uno o dos días.';
    } catch (err) {
      estado.textContent = err?.code === '53400' ? 'Has llegado al límite de 5 propuestas al día.' : 'No se pudo enviar. Inténtalo de nuevo.';
    } finally {
      boton.disabled = false;
    }
  });

  cargar();
}
