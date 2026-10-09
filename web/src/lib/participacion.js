// Participación en una propuesta consolidada: valoración 1-5, aportes y apoyos a aportes.
// Usa una sesión anónima de Supabase: sin nombre, correo ni documento.
// Requiere en Supabase las migraciones del banco y "Anonymous sign-ins" activado.
// Si el sitio se compila sin Supabase (PUBLIC_PARTICIPACION distinto de "true"), muestra los controles
// desactivados con una explicación, para que se vea cómo funcionará.
const URL_SB = import.meta.env.PUBLIC_SUPABASE_URL;
const CLAVE = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const ACTIVA = import.meta.env.PUBLIC_PARTICIPACION === 'true' && URL_SB && CLAVE;

const TIPOS = { mejora: 'Mejora', objecion: 'Objeción', inciso: 'Inciso', evidencia: 'Evidencia' };
const escapar = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const leer = (k) => { try { return localStorage.getItem(k); } catch { return null; } };
const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

let cliente = null;
async function sb() {
  if (!cliente) {
    const { createClient } = await import('@supabase/supabase-js');
    cliente = createClient(URL_SB, CLAVE, { auth: { persistSession: true } });
  }
  return cliente;
}
async function sesion() {
  const s = await sb();
  const { data } = await s.auth.getSession();
  if (!data.session) {
    const { error } = await s.auth.signInAnonymously();
    if (error) throw error;
  }
  return s;
}

function pintarEstrellas(caja, id) {
  caja.innerHTML = `
    <p class="dato-titulo">¿Cuánto apoyas esta propuesta?</p>
    <div class="estrellas" role="group" aria-label="Valoración de 1 a 5">
      ${[1, 2, 3, 4, 5].map((n) => `<button type="button" data-n="${n}" aria-pressed="false" aria-label="${n} de 5" ${ACTIVA ? '' : 'disabled'}><i class="fi fi-br-star" aria-hidden="true"></i></button>`).join('')}
    </div>
    <p class="discreto" data-estado></p>
    <p class="discreto">${ACTIVA
      ? 'Valoración anónima: no pedimos nombre, correo ni documento. Solo se publican totales, que reflejan a quienes participan y no a toda la población.'
      : 'La valoración se activa cuando el banco se publique con su base de datos. Será anónima y solo se publicarán totales.'}</p>`;
  const botones = [...caja.querySelectorAll('button[data-n]')];
  const marcar = (n) => botones.forEach((b) => {
    b.setAttribute('aria-pressed', String(Number(b.dataset.n) === n));
    b.classList.toggle('llena', Number(b.dataset.n) <= n);
  });
  marcar(Number(leer(`et-val-${id}`)) || 0);
  return { botones, marcar, estado: caja.querySelector('[data-estado]') };
}

async function valoracion(caja) {
  const id = caja.dataset.propuesta;
  const { botones, marcar, estado } = pintarEstrellas(caja, id);
  if (!ACTIVA) return;
  const s = await sb();
  async function resumen() {
    const { data, error } = await s.rpc('banco_valoracion_resumen', { p_ids: [id] });
    if (error) { estado.textContent = 'No se pudieron cargar los totales.'; return; }
    const r = data?.[0];
    estado.textContent = r
      ? `${r.votos} ${r.votos === 1 ? 'valoración' : 'valoraciones'} · media ${Number(r.media).toFixed(1)} de 5 · aceptación ${r.aceptacion_pct} %`
      : 'Aún no hay valoraciones.';
  }
  await resumen();
  botones.forEach((b) => b.addEventListener('click', async () => {
    const n = Number(b.dataset.n);
    botones.forEach((x) => (x.disabled = true));
    try {
      const c = await sesion();
      const { error } = await c.rpc('banco_valorar', { p_propuesta: id, p_estrellas: n });
      if (error) throw error;
      guardar(`et-val-${id}`, String(n));
      marcar(n);
      await resumen();
    } catch {
      estado.textContent = 'No se pudo registrar la valoración. Inténtalo de nuevo.';
    } finally {
      botones.forEach((x) => (x.disabled = false));
    }
  }));
}

function formulario(desactivado) {
  return `
    <form class="aporte-form" data-form>
      <label class="dato-titulo" for="aporte-tipo">Tu aporte</label>
      <div class="fila">
        <select id="aporte-tipo" name="tipo" ${desactivado ? 'disabled' : ''}>
          ${Object.entries(TIPOS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}
        </select>
      </div>
      <label for="aporte-texto" class="oculto">Texto del aporte</label>
      <textarea id="aporte-texto" name="texto" rows="4" minlength="10" maxlength="2000" required
        placeholder="Dirigido a la propuesta, no a personas. Si aportas una evidencia, incluye el enlace." ${desactivado ? 'disabled' : ''}></textarea>
      <button class="boton primario" type="submit" ${desactivado ? 'disabled' : ''}>Enviar para moderación</button>
      <p class="discreto" data-aviso>${desactivado ? 'Los aportes se activan cuando el banco se publique con su base de datos.' : ''}</p>
    </form>`;
}

async function aportes(seccion) {
  const id = seccion.dataset.propuesta;
  const caja = seccion.querySelector('[data-aportes]');
  if (!ACTIVA) { caja.innerHTML = formulario(true); return; }
  const s = await sb();
  async function listar() {
    const { data, error } = await s.from('banco_aportes').select('id,tipo,texto,creado_en,apoyos')
      .eq('consolidada_id', id).order('apoyos', { ascending: false }).limit(50);
    if (error) return '<p class="discreto">No se pudieron cargar los aportes.</p>';
    if (!data.length) return '<p class="discreto">Todavía no hay aportes publicados.</p>';
    return `<ul class="lista">${data.map((a) => `
      <li class="tarjeta aporte">
        <span class="etiqueta">${TIPOS[a.tipo] ?? escapar(a.tipo)}</span>
        <p>${escapar(a.texto)}</p>
        <button type="button" class="boton" data-apoyar="${a.id}" aria-pressed="${leer(`et-apoyo-${a.id}`) === '1'}">
          <i class="fi fi-br-thumbs-up" aria-hidden="true"></i><span>${a.apoyos}</span>
        </button>
      </li>`).join('')}</ul>`;
  }
  caja.innerHTML = (await listar()) + formulario(false);
  caja.addEventListener('click', async (e) => {
    const b = e.target.closest('[data-apoyar]');
    if (!b) return;
    const aporte = Number(b.dataset.apoyar);
    const apoyar = b.getAttribute('aria-pressed') !== 'true';
    b.disabled = true;
    try {
      const c = await sesion();
      const { data, error } = await c.rpc('banco_apoyar_aporte', { p_aporte: aporte, p_apoyo: apoyar });
      if (error) throw error;
      b.querySelector('span').textContent = data;
      b.setAttribute('aria-pressed', String(apoyar));
      guardar(`et-apoyo-${aporte}`, apoyar ? '1' : '0');
    } catch { /* se deja como estaba */ } finally { b.disabled = false; }
  });
  caja.addEventListener('submit', async (e) => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    const aviso = form.querySelector('[data-aviso]');
    const datos = new FormData(form);
    const boton = form.querySelector('button[type=submit]');
    boton.disabled = true;
    try {
      const c = await sesion();
      const { error } = await c.rpc('banco_aportar', { p_propuesta: id, p_tipo: datos.get('tipo'), p_texto: datos.get('texto') });
      if (error) throw error;
      form.reset();
      aviso.textContent = 'Recibido. Se publicará cuando lo revise el equipo de moderación.';
    } catch (err) {
      aviso.textContent = err?.code === '53400' ? 'Has llegado al límite de 10 aportes al día.' : 'No se pudo enviar. Revisa el texto (10 a 2000 caracteres) e inténtalo de nuevo.';
    } finally { boton.disabled = false; }
  });
}

export function iniciarParticipacion() {
  const v = document.getElementById('valoracion');
  if (v) valoracion(v);
  const a = document.getElementById('aportes');
  if (a) aportes(a);
}
