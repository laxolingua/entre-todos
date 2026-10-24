// Participación en una propuesta consolidada: valoración en cinco niveles de acuerdo (se guarda como 1 a 5), aportes y apoyos a aportes.
// El voto exige identificarse con documento (carné o pasaporte) y un PIN; los aportes usan la sesión anónima.
// Ver docs/votacion-credencial.md.
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
const CONTACTO = 'contacto.entretodos@gmail.com';
const CLAVE_TOKEN = 'et-votante';
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const PROVINCIAS = ['Pinar del Río', 'Artemisa', 'La Habana', 'Mayabeque', 'Matanzas', 'Cienfuegos', 'Villa Clara', 'Sancti Spíritus',
  'Ciego de Ávila', 'Camagüey', 'Las Tunas', 'Holguín', 'Granma', 'Santiago de Cuba', 'Guantánamo', 'Isla de la Juventud'];

// Mismo código que la consulta «Continuidad o cambio»: SHA-256 del número más el tipo, en el navegador.
async function codigoDocumento(numero, tipo) {
  const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode((numero + tipo).trim().toUpperCase()));
  return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
}
function validarCarne(v) {
  if (!/^\d{11}$/.test(v)) return 'El carné tiene 11 cifras.';
  const aa = +v.slice(0, 2), mm = +v.slice(2, 4), dd = +v.slice(4, 6);
  if (mm < 1 || mm > 12 || dd < 1 || dd > 31) return 'El mes o el día no son válidos. Revisa el número.';
  return '';
}
const ERRORES = {
  pin: (r) => `PIN incorrecto. Te quedan ${r.restantes} intentos antes de un bloqueo de una hora.`,
  bloqueado: () => 'Demasiados intentos con este documento. Vuelve a intentarlo en una hora.',
  congelado: () => `Este documento está en revisión por una reclamación y sus votos no cuentan por ahora. Escríbenos a ${CONTACTO}.`,
  limite: () => 'Demasiados intentos desde este navegador. Espera una hora.',
  formato_pin: () => 'El PIN debe tener 6 cifras.',
  derecho_fundamental: () => 'Los derechos fundamentales no se someten a votación.',
  identificacion: () => 'Tu sesión de voto caducó. Identifícate de nuevo.',
};
const mensaje = (r) => (ERRORES[r?.error] || (() => 'No se pudo completar. Inténtalo de nuevo.'))(r || {});

let misVotos = null;
async function cargarMisVotos() {
  const token = leer(CLAVE_TOKEN);
  if (!token) return null;
  const c = await sb();
  const { data: ses } = await c.auth.getSession();
  if (!ses.session) return null;
  const { data } = await c.rpc('mis_votos', { p_token: token });
  if (!data?.ok) { if (data?.error === 'identificacion') guardar(CLAVE_TOKEN, ''); return null; }
  return data;
}

function pintarEscala(caja) {
  caja.innerHTML = `
    <p class="dato-titulo">¿Cuánto apoyas esta propuesta?</p>
    <div class="escala" role="radiogroup" aria-label="Tu nivel de acuerdo con esta propuesta">
      ${NIVELES.map((t, k) => `<button type="button" data-v="${k + 1}" role="radio" aria-checked="false" ${ACTIVA ? '' : 'disabled'}>${t}</button>`).join('')}
    </div>
    <p class="discreto" data-estado></p>
    <div data-identificacion hidden></div>
    <p class="discreto" data-sesion></p>
    <p class="discreto">${ACTIVA
      ? 'Un documento, un voto. Tu número de carné o pasaporte no sale de tu dispositivo: se convierte en un código que el servidor vuelve a cifrar con una clave secreta. Solo se publican totales, que reflejan a quienes participan y no a toda la población. <a href="/privacidad/">Privacidad</a>'
      : 'La valoración se activa cuando el banco se publique con su base de datos.'}</p>`;
  const botones = [...caja.querySelectorAll('button[data-v]')];
  const escala = caja.querySelector('.escala');
  const marcar = (n) => {
    escala.classList.toggle('elegida', n > 0);
    // Para el botón de compartir: la opción que eligió esta persona en esta ficha (0 = sin voto).
    document.documentElement.dataset.miVoto = String(n || 0);
    botones.forEach((b) => { const on = Number(b.dataset.v) === n; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
  };
  return { botones, marcar, estado: caja.querySelector('[data-estado]'), panel: caja.querySelector('[data-identificacion]'), sesionTxt: caja.querySelector('[data-sesion]') };
}

function formularioIdentificacion() {
  return `
    <form class="identificacion" novalidate>
      <p class="dato-titulo">Identifícate para votar</p>
      <p class="discreto">La primera vez eliges un PIN de 6 cifras. Con tu documento y tu PIN recuperas tus votos en cualquier dispositivo.</p>
      <fieldset class="fila-tipo"><legend class="oculto">Documento</legend>
        <label><input type="radio" name="tipo" value="ci" checked> Carné de identidad cubano</label>
        <label><input type="radio" name="tipo" value="pasaporte"> Pasaporte u otro documento</label>
      </fieldset>
      <label>Número <input name="numero" inputmode="text" autocomplete="off" required></label>
      <p class="ayuda" data-ayuda></p>
      <label>PIN de 6 cifras <input name="pin" type="password" inputmode="numeric" pattern="\\d{6}" maxlength="6" autocomplete="off" required></label>
      <label data-solo="ci">Provincia (opcional) <select name="provincia"><option value="">—</option>${PROVINCIAS.map((p) => `<option>${p}</option>`).join('')}</select></label>
      <label data-solo="pasaporte" hidden>País donde vives (opcional) <input name="pais" maxlength="60" autocomplete="off"></label>
      <label class="trampa" aria-hidden="true">Web <input name="web" tabindex="-1" autocomplete="off"></label>
      <label class="declaracion"><input type="checkbox" name="mio" required> Este documento es mío y no lo uso por otra persona.</label>
      <div class="fila"><button class="boton primario" type="submit">Identificarme y votar</button>
        <button class="boton" type="button" data-cancelar>Cancelar</button></div>
      <p class="discreto" data-aviso role="status"></p>
      <p class="discreto"><button type="button" class="enlace" data-abrir-reclamo>¿Olvidaste tu PIN o alguien votó con tu documento?</button></p>
      <div class="reclamo" data-reclamo hidden>
        <p class="discreto">Escribe arriba el número de tu documento y elige. Los votos de ese documento quedarán congelados hasta comprobar quién es el titular.</p>
        <div class="fila"><button type="button" class="boton" data-reclamar="pin_olvidado">Olvidé mi PIN</button>
          <button type="button" class="boton" data-reclamar="suplantacion">Alguien votó con mi documento</button></div>
      </div>
      <p class="discreto">Si la página no carga bien: actualiza el navegador o pega el enlace directamente en vez de abrirlo desde Facebook.</p>
    </form>`;
}

function pedirIdentificacion(panel) {
  return new Promise((resolver) => {
    panel.innerHTML = formularioIdentificacion();
    panel.hidden = false;
    const f = panel.querySelector('form');
    const abierto = Date.now();
    const aviso = f.querySelector('[data-aviso]');
    const ayuda = f.querySelector('[data-ayuda]');
    const tipo = () => f.querySelector('input[name=tipo]:checked').value;
    const cerrar = (v) => { panel.hidden = true; panel.innerHTML = ''; resolver(v); };
    f.addEventListener('change', (e) => {
      if (e.target.name === 'tipo') f.querySelectorAll('[data-solo]').forEach((x) => { x.hidden = x.dataset.solo !== tipo(); });
    });
    f.numero.addEventListener('input', () => {
      if (tipo() !== 'ci') { ayuda.textContent = ''; return; }
      const v = f.numero.value.replace(/\D/g, ''); f.numero.value = v;
      const err = v.length === 11 ? validarCarne(v) : '';
      if (v.length === 11 && !err) {
        const aa = +v.slice(0, 2), anio = (aa <= 26 ? 2000 : 1900) + aa;
        ayuda.textContent = `Formato válido · nacimiento: ${+v.slice(4, 6)} de ${MESES[+v.slice(2, 4) - 1]} de ${anio}. El número no se guarda.`;
      } else ayuda.textContent = err;
    });
    f.querySelector('[data-cancelar]').addEventListener('click', () => cerrar(null));
    f.querySelector('[data-abrir-reclamo]').addEventListener('click', () => { f.querySelector('[data-reclamo]').hidden = false; });
    f.querySelectorAll('[data-reclamar]').forEach((btn) => btn.addEventListener('click', async () => {
      const motivo = btn.dataset.reclamar;
      const t = tipo(), n = f.numero.value.trim();
      if (!n || (t === 'ci' && validarCarne(n))) { aviso.textContent = 'Escribe primero el número de tu documento.'; return; }
      try {
        const c = await sesion();
        const { data } = await c.rpc('votante_reclamar', { p_codigo: await codigoDocumento(n, t), p_tipo: t, p_motivo: motivo });
        if (data?.ok) {
          aviso.innerHTML = `Reclamación registrada con la referencia <strong>${escapar(data.referencia)}</strong>. Los votos de este documento quedan congelados y no cuentan hasta comprobar quién es el titular. Escríbenos a <a href="mailto:${CONTACTO}?subject=Reclamaci%C3%B3n%20${escapar(data.referencia)}">${CONTACTO}</a> con esa referencia para verificar tu identidad.`;
        } else aviso.textContent = data?.error === 'no_registrado' ? 'Ese documento no ha votado todavía. Puedes identificarte y votar.' : mensaje(data);
      } catch { aviso.textContent = 'No se pudo enviar la reclamación. Inténtalo de nuevo.'; }
    }));
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (f.web.value) return cerrar(null);
      const t = tipo(), n = f.numero.value.trim(), pin = f.pin.value.trim();
      if (t === 'ci' && validarCarne(n)) { aviso.textContent = validarCarne(n); return; }
      if (t === 'pasaporte' && n.length < 6) { aviso.textContent = 'El número debe tener al menos 6 caracteres.'; return; }
      if (!/^\d{6}$/.test(pin)) { aviso.textContent = 'El PIN debe tener 6 cifras.'; return; }
      if (!f.mio.checked) { aviso.textContent = 'Confirma que el documento es tuyo.'; return; }
      if (Date.now() - abierto < 4000) { aviso.textContent = 'Revisa los datos y vuelve a pulsar.'; return; }
      const boton = f.querySelector('button[type=submit]'); boton.disabled = true; aviso.textContent = 'Comprobando…';
      try {
        const c = await sesion();
        const { data } = await c.rpc('votante_entrar', { p_codigo: await codigoDocumento(n, t), p_tipo: t, p_pin: pin,
          p_pais: t === 'pasaporte' ? f.pais.value : null, p_provincia: t === 'ci' ? f.provincia.value : null });
        if (!data?.ok) { aviso.textContent = mensaje(data); boton.disabled = false; return; }
        guardar(CLAVE_TOKEN, data.token);
        guardar('et-votante-tipo', t);
        cerrar({ nuevo: data.estado === 'nuevo' || data.estado === 'pin_nuevo' });
      } catch { aviso.textContent = 'No se pudo comprobar. Inténtalo de nuevo.'; boton.disabled = false; }
    });
  });
}
async function valoracion(caja) {
  const id = caja.dataset.propuesta;
  const { botones, marcar, estado, panel, sesionTxt } = pintarEscala(caja);
  if (!ACTIVA) return;
  const s = await sb();
  async function resumen() {
    const { data, error } = await s.rpc('banco_votos_resumen', { p_ids: [id] });
    if (error) { estado.textContent = 'No se pudieron cargar los totales.'; return; }
    const r = data?.[0];
    estado.textContent = r
      ? `${r.votos} ${r.votos === 1 ? 'voto' : 'votos'} · A favor o Muy a favor: ${r.aceptacion_pct} %`
      : 'Aún no hay votos.';
  }
  function pintarSesion() {
    const token = leer(CLAVE_TOKEN);
    if (!token) { sesionTxt.innerHTML = ''; return; }
    const t = leer('et-votante-tipo') === 'pasaporte' ? 'pasaporte' : 'carné';
    sesionTxt.innerHTML = `Votas identificado con tu ${t}. <button type="button" class="enlace" data-salir>Salir</button>`;
    sesionTxt.querySelector('[data-salir]').addEventListener('click', async () => {
      try { const c = await sb(); await c.rpc('votante_salir', { p_token: token }); } catch {}
      guardar(CLAVE_TOKEN, ''); misVotos = null; marcar(0); pintarSesion();
    });
  }
  await resumen();
  try { misVotos = misVotos || (await cargarMisVotos()); } catch { misVotos = null; }
  if (misVotos?.votos?.[id]) marcar(misVotos.votos[id]);
  pintarSesion();
  botones.forEach((b) => b.addEventListener('click', async () => {
    const n = Number(b.dataset.v);
    botones.forEach((x) => (x.disabled = true));
    try {
      if (!leer(CLAVE_TOKEN)) {
        const r = await pedirIdentificacion(panel);
        if (!r) return;
        try { misVotos = await cargarMisVotos(); } catch {}
        pintarSesion();
      }
      const c = await sesion();
      const { data, error } = await c.rpc('votar', { p_token: leer(CLAVE_TOKEN), p_propuesta: id, p_valor: n });
      if (error || !data?.ok) {
        if (data?.error === 'identificacion') guardar(CLAVE_TOKEN, '');
        estado.textContent = mensaje(data); pintarSesion(); return;
      }
      if (misVotos?.votos) misVotos.votos[id] = n;
      marcar(n);
      await resumen();
    } catch {
      estado.textContent = 'No se pudo registrar el voto. Inténtalo de nuevo.';
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
          <i class="fi fi-br-social-network" aria-hidden="true"></i><span>${a.apoyos}</span>
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
// Gancho global: las páginas del banco fusionadas montan la participación con
// import(chunk).then(m => (m.iniciarParticipacion || window.etIniciarParticipacion)()).
// Si este módulo pasa a ser un chunk compartido, Vite acorta los nombres de exportación y el gancho sigue funcionando.
if (typeof window !== 'undefined') window.etIniciarParticipacion = iniciarParticipacion;


export { sb, sesion, ACTIVA, escapar };
