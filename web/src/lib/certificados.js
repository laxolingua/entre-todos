// Academia A+: registro de lecciones completadas, emisión y verificación de certificados.
// Las lecciones se registran con la sesión anónima del sitio (sin cuenta ni datos personales).
// En el servidor solo queda: qué lecciones completó la sesión y el nombre elegido para el certificado.
import qrcode from 'qrcode-generator';
// Sesión anónima propia (misma lógica que participacion.js). No se importa de allí para no romper
// el nombre de su exportación, que el pipeline usa en las fichas del banco.
const URL_SB = import.meta.env.PUBLIC_SUPABASE_URL;
const CLAVE = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const SITEKEY = import.meta.env.PUBLIC_TURNSTILE_SITEKEY;
const participacionActiva = import.meta.env.PUBLIC_PARTICIPACION === 'true' && !!URL_SB && !!CLAVE;
let cliente = null;
async function sb() {
  if (!cliente) { const { createClient } = await import('@supabase/supabase-js'); cliente = createClient(URL_SB, CLAVE, { auth: { persistSession: true } }); }
  return cliente;
}
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

export const SITIO = 'https://entre-todos.org';
export const MODULOS = {
  nc: { titulo: 'La nueva Cuba', detalle: 'completó el módulo <b>«La nueva Cuba»</b>: 6 bloques y 24 lecciones sobre derechos humanos, libertad de expresión, justicia, rendición de cuentas, libertad religiosa y sociedad civil.' },
  pd: { titulo: 'Pensar y debatir', detalle: 'completó el módulo <b>«Pensar y debatir»</b>: 6 bloques y 24 lecciones de pensamiento crítico, creativo, ético y sistémico, educación humana y pensamiento solucionario.' },
};

const leer = (k) => { try { return JSON.parse(localStorage.getItem(k) || '{}'); } catch { return {}; } };
const guardar = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sin almacenamiento */ } };
export const progreso = (bloque, leccion) => leer(`et-blog-${bloque}-${leccion}`);
export const fechaLarga = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

// Registra en el servidor las lecciones con insignia que aún no se registraron. Silencioso si falla.
export async function sincronizar(lecciones) {
  if (!participacionActiva) return false;
  const hechas = leer('et-acad-sync');
  const pendientes = lecciones.filter(([b, l]) => progreso(b, l).insignia && !hechas[`${b}/${l}`]);
  if (!pendientes.length) return true;
  try {
    const c = await sesion();
    for (const [b, l] of pendientes) {
      const s = progreso(b, l);
      const { data, error } = await c.rpc('academia_registrar_leccion', { p_bloque: b, p_leccion: l,
        p_antes: typeof s.antes === 'number' ? s.antes : null, p_despues: typeof s.despues === 'number' ? s.despues : null });
      if (!error && data?.ok) { hechas[`${b}/${l}`] = 1; guardar('et-acad-sync', hechas); }
    }
    return true;
  } catch { return false; }
}

// Pide el certificado verificable. Devuelve { ok, codigo } o { ok:false, error }.
export async function emitir(tipo, ref, nombre, lecciones) {
  if (!participacionActiva) return { ok: false, error: 'inactivo' };
  try {
    await sincronizar(lecciones);
    const c = await sesion();
    const { data, error } = await c.rpc('academia_emitir_certificado', { p_tipo: tipo, p_ref: ref, p_nombre: nombre });
    if (error) return { ok: false, error: 'red' };
    return data;
  } catch { return { ok: false, error: 'red' }; }
}

export async function verificar(codigo) {
  if (!participacionActiva) return { ok: false, error: 'inactivo' };
  try {
    const c = await sb();
    const { data, error } = await c.rpc('academia_verificar', { p_codigo: codigo });
    return error ? { ok: false, error: 'red' } : data;
  } catch { return { ok: false, error: 'red' }; }
}

export const urlVerificar = (codigo) => `${SITIO}/verificar/?c=${encodeURIComponent(codigo)}`;

export function pintarQR(nodo, texto) {
  if (!nodo) return;
  const q = qrcode(0, 'M'); q.addData(texto); q.make();
  nodo.innerHTML = q.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
}

// Enlace de LinkedIn para añadir el certificado en «Licencias y certificaciones».
export function enlaceLinkedIn({ nombreCert, codigo, fecha }) {
  const d = new Date(fecha);
  const p = new URLSearchParams({ startTask: 'CERTIFICATION_NAME', name: nombreCert, organizationName: 'ENTRE TODOS',
    issueYear: String(d.getFullYear()), issueMonth: String(d.getMonth() + 1), certUrl: urlVerificar(codigo), certId: codigo });
  return `https://www.linkedin.com/profile/add?${p}`;
}

export function imprimir(nodo) {
  // Copia el certificado a un contenedor propio y fija la página en A4 apaisado solo durante la impresión.
  const caja = document.createElement('div'); caja.id = 'cert-imprimir';
  const copia = nodo.cloneNode(true); copia.classList.add('imprimir'); caja.appendChild(copia);
  const estilo = document.createElement('style');
  estilo.textContent = '@page { size: A4 landscape; margin: 0; } @media print { body > *:not(#cert-imprimir) { display: none !important; } #cert-imprimir { display: block !important; } }';
  document.body.appendChild(caja); document.head.appendChild(estilo);
  const limpiar = () => { caja.remove(); estilo.remove(); };
  window.addEventListener('afterprint', limpiar, { once: true });
  window.print();
  setTimeout(() => { if (document.body.contains(caja) && !window.matchMedia('print').matches) limpiar(); }, 1500);
}

export const MENSAJES = {
  incompleto: 'Al servidor le faltan lecciones de este certificado. Vuelve a abrir cada lección completada en este mismo navegador y pruébalo otra vez.',
  nombre: 'Escribe un nombre de 2 a 60 caracteres.',
  red: 'No se pudo conectar ahora. Puedes descargarlo sin código de verificación o intentarlo más tarde.',
  inactivo: 'La verificación aún no está activa. Puedes descargarlo sin código de verificación.',
  sesion: 'No se pudo abrir la sesión. Inténtalo de nuevo.',
};

// Monta el flujo completo en una zona de certificado: nombre, emisión, código, QR, LinkedIn y PDF.
export function montarCertificado(zona, { tipo, ref, nombreCert, lecciones, fecha }) {
  const cert = zona.querySelector('[data-certificado]');
  const $ = (s) => zona.querySelector(s);
  const clave = `et-cert-${tipo}-${ref}`;
  const est = leer(clave);
  const inp = $('[data-cert-input]');
  const nom = $('[data-cert-nombre]');
  const msg = $('[data-cert-msg]');
  const fe = $('[data-cert-fecha]');
  if (fe) fe.textContent = fechaLarga(est.fecha || fecha || new Date().toISOString());
  const pintarCodigo = () => {
    if (!est.codigo) return;
    $('[data-cert-codigo]').textContent = est.codigo;
    $('[data-cert-url]').textContent = `entre-todos.org/verificar · ${est.codigo}`;
    pintarQR($('[data-cert-qr]'), urlVerificar(est.codigo));
    const li = $('[data-cert-linkedin]');
    if (li) { li.href = enlaceLinkedIn({ nombreCert, codigo: est.codigo, fecha: est.fecha || new Date().toISOString() }); li.hidden = false; }
    const ver = $('[data-cert-ver]');
    if (ver) { ver.href = `/verificar/?c=${encodeURIComponent(est.codigo)}`; ver.hidden = false; }
  };
  if (inp) {
    inp.value = est.nombre || '';
    if (est.nombre && nom) nom.textContent = est.nombre;
    inp.addEventListener('input', () => { if (nom) nom.textContent = inp.value.trim() || 'Tu nombre'; });
  }
  pintarCodigo();
  $('[data-cert-emitir]')?.addEventListener('click', async (ev) => {
    const b = ev.currentTarget; const nombre = (inp?.value || '').trim();
    if (nombre.length < 2) { msg.textContent = MENSAJES.nombre; return; }
    b.disabled = true; msg.textContent = 'Generando tu certificado… Si aparece la casilla «Verify you are human» abajo a la derecha, márcala.';
    const r = await emitir(tipo, ref, nombre, lecciones);
    b.disabled = false;
    if (r?.ok) {
      Object.assign(est, { codigo: r.codigo, nombre: r.nombre, fecha: est.fecha || new Date().toISOString() });
      guardar(clave, est); if (nom) nom.textContent = r.nombre;
      if (fe) fe.textContent = fechaLarga(est.fecha);
      pintarCodigo(); msg.textContent = 'Listo. Tu certificado ya se puede verificar.';
    } else { msg.textContent = MENSAJES[r?.error] || MENSAJES.red; }
  });
  $('[data-cert-pdf]')?.addEventListener('click', () => {
    if (inp && nom && inp.value.trim()) nom.textContent = inp.value.trim();
    imprimir(cert);
  });
}
