// Participación en una propuesta consolidada: valoración en cinco niveles de acuerdo (se guarda como 1 a 5), aportes y apoyos a aportes.
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
// Filtro contra robots (Cloudflare Turnstile): solo se carga cuando alguien participa por primera vez.
const SITEKEY = import.meta.env.PUBLIC_TURNSTILE_SITEKEY;
function tokenTurnstile() {
  if (!SITEKEY) return Promise.resolve(undefined);
  return new Promise((ok, mal) => {
    const pintar = () => {
      let caja = document.getElementById('et-turnstile');
      if (!caja) { caja = document.createElement('div'); caja.id = 'et-turnstile'; caja.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:50'; document.body.appendChild(caja); }
      window.turnstile.render(caja, { sitekey: SITEKEY, callback: (t) => { ok(t); setTimeout(() => caja.remove(), 800); }, 'error-callback': () => mal(new Error('turnstile')) });
    };
    if (window.turnstile) return pintar();
    const sc = document.createElement('script');
    sc.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    sc.async = true; sc.onload = pintar; sc.onerror = () => mal(new Error('turnstile'));
    document.head.appendChild(sc);
  });
}
async function sesion() {
  const s = await sb();
  const { data } = await s.auth.getSession();
  if (!data.session) {
    const captchaToken = await tokenTurnstile();
    const { error } = await s.auth.signInAnonymously(captchaToken ? { options: { captchaToken } } : undefined);
    if (error) throw error;
  }
  return s;
}

const NIVELES = ['Muy en contra', 'En contra', 'Neutral', 'A favor', 'Muy a favor'];
function pintarEscala(caja, id) {
  caja.innerHTML = `
    <p class="dato-titulo">¿Cuánto apoyas esta propuesta?</p>
    <div class="escala" role="radiogroup" aria-label="Tu nivel de acuerdo con esta propuesta">
      ${NIVELES.map((t, k) => `<button type="button" data-v="${k + 1}" role="radio" aria-checked="false" ${ACTIVA ? '' : 'disabled'}>${t}</button>`).join('')}
    </div>
    <p class="discreto" data-estado></p>
    <p class="discreto">${ACTIVA
      ? 'Valoración anónima: no pedimos nombre, correo ni documento. Solo se publican totales, que reflejan a quienes participan y no a toda la población.'
      : 'La valoración se activa cuando el banco se publique con su base de datos. Será anónima y solo se publicarán totales.'}</p>`;
  const botones = [...caja.querySelectorAll('button[data-v]')];
  const escala = caja.querySelector('.escala');
  const marcar = (n) => {
    escala.classList.toggle('elegida', n > 0);
    botones.forEach((b) => {
      const on = Number(b.dataset.v) === n;
      b.classList.toggle('on', on);
      b.setAttribute('aria-checked', String(on));
    });
  };
  marcar(Number(leer(`et-val-${id}`)) || 0);
  return { botones, marcar, estado: caja.querySelector('[data-estado]') };
}

async function valoracion(caja) {
  const id = caja.dataset.propuesta;
  const { botones, marcar, estado } = pintarEscala(caja, id);
  if (!ACTIVA) return;
  const s = await sb();
  async function resumen() {
    const { data, error } = await s.rpc('banco_valoracion_resumen', { p_ids: [id] });
    if (error) { estado.textContent = 'No se pudieron cargar los totales.'; return; }
    const r = data?.[0];
    estado.textContent = r
      ? `${r.votos} ${r.votos === 1 ? 'valoración' : 'valoraciones'} · A favor o Muy a favor: ${r.aceptacion_pct} %`
      : 'Aún no hay valoraciones.';
  }
  await resumen();
  botones.forEach((b) => b.addEventListener('click', async () => {
    const n = Number(b.dataset.v);
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
