// Buscador en el navegador. Descarga el índice solo cuando alguien busca.
// Dos modos: "ciudadano" (banco de propuestas consolidadas) y "archivo" (citas literales).
const MAX = 60;
const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

const normalizar = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const escapar = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const indices = {};
const MODOS = {
  archivo: { url: '/datos/indice.json', texto: (p) => `${p.t} ${p.a} ${p.c} ${p.r}` },
  ciudadano: { url: '/datos/indice-propuestas.json', texto: (p) => `${p.t} ${p.x} ${p.i} ${p.a} ${p.k}` },
};
async function cargarIndice(modo) {
  if (!indices[modo]) {
    const r = await fetch(MODOS[modo].url);
    if (!r.ok) throw new Error('No se pudo cargar el índice');
    indices[modo] = (await r.json()).map((p) => ({ ...p, _t: normalizar(p.t), _x: normalizar(MODOS[modo].texto(p)) }));
  }
  return indices[modo];
}

function buscar(lista, consulta) {
  const palabras = normalizar(consulta).split(/\s+/).filter((w) => w.length > 1);
  if (!palabras.length) return [];
  const res = [];
  for (const p of lista) {
    if (!palabras.every((w) => p._x.includes(w))) continue;
    const puntos = palabras.reduce((s, w) => s + (p._t.includes(w) ? 3 : 1), 0);
    res.push([puntos, p]);
  }
  return res.sort((a, b) => b[0] - a[0] || a[1].id.localeCompare(b[1].id)).map((x) => x[1]);
}

function registrarVacio(termino) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;
  fetch(`${SUPABASE_URL}/rest/v1/rpc/registrar_busqueda_sin_resultado`, {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_termino: termino, p_contexto: 'banco' }),
    keepalive: true,
  }).catch(() => {});
}

function tarjetaArchivo(p) {
  const sec = p.s ? `<span class="etiqueta aviso">${p.s === 2 ? 'Paráfrasis de prensa' : 'Cita secundaria'}</span>` : '';
  return `<li class="tarjeta"><h3><a href="/archivo/${escapar(p.id)}/">${escapar(p.t)}</a></h3>
    <p class="autoria">${escapar(p.a)}${p.y ? ` · ${p.y}` : ''}</p>
    <blockquote>«${escapar(p.c)}»</blockquote><div class="etiquetas">${sec}</div></li>`;
}

function tarjetaCiudadana(p) {
  const texto = p.x.length > 230 ? `${p.x.slice(0, p.x.lastIndexOf(' ', 230))}…` : p.x;
  return `<li class="tarjeta consolidada"><h3><a href="/propuesta/${escapar(p.id)}/">${escapar(p.t)}</a></h3>
    <p class="texto">${escapar(texto)}</p>
    <p class="autoria">${escapar(p.a.split(' · ').slice(0, 3).join(' · '))}</p>
    <div class="etiquetas"><span class="etiqueta">${p.n} ${p.n === 1 ? 'documento' : 'documentos'}</span><span class="etiqueta">${escapar(p.k)}</span></div></li>`;
}

export function iniciarBuscador() {
  const form = document.getElementById('buscador');
  const input = document.getElementById('q');
  const salida = document.getElementById('resultados');
  const categorias = document.getElementById('categorias');
  if (!form || !input || !salida) return;
  const modo = form.dataset.modo === 'archivo' ? 'archivo' : 'ciudadano';
  const tarjeta = modo === 'archivo' ? tarjetaArchivo : tarjetaCiudadana;
  const nombre = modo === 'archivo' ? ['cita', 'citas'] : ['propuesta', 'propuestas'];
  const otro = modo === 'archivo'
    ? (q) => `<p class="discreto">Ver también en el <a href="/propuestas/?q=${encodeURIComponent(q)}">banco de propuestas</a>.</p>`
    : (q) => `<p class="discreto">¿Buscas una cita concreta? <a href="/archivo/?q=${encodeURIComponent(q)}">Busca en el archivo documental</a>.</p>`;

  async function ejecutar(consulta, actualizarUrl = true) {
    const q = consulta.trim();
    if (actualizarUrl) {
      const url = new URL(location.href);
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
    if (!q) { salida.innerHTML = ''; if (categorias) categorias.hidden = false; return; }
    salida.innerHTML = '<p class="discreto">Buscando…</p>';
    try {
      const encontrados = buscar(await cargarIndice(modo), q);
      if (categorias) categorias.hidden = encontrados.length > 0;
      if (!encontrados.length) {
        salida.innerHTML = `<div class="panel"><p style="margin:0">Nada en ${modo === 'archivo' ? 'el archivo' : 'el banco'} menciona «${escapar(q)}».</p>
          <p class="discreto" style="margin:6px 0 0">Prueba con otra palabra o explora por categoría.</p>${otro(q)}</div>`;
        registrarVacio(q);
        return;
      }
      const mostrados = encontrados.slice(0, MAX);
      salida.innerHTML = `<p class="discreto">${encontrados.length} ${encontrados.length === 1 ? nombre[0] : nombre[1]}${encontrados.length > MAX ? `; se muestran las ${MAX} más relevantes` : ''}.</p>
        <ul class="lista">${mostrados.map(tarjeta).join('')}</ul>${otro(q)}`;
    } catch {
      salida.innerHTML = '<div class="panel"><p style="margin:0">No se pudo cargar el buscador. Revisa la conexión y vuelve a intentarlo.</p></div>';
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); ejecutar(input.value); });
  let espera;
  input.addEventListener('input', () => { clearTimeout(espera); espera = setTimeout(() => ejecutar(input.value), 350); });
  const inicial = new URL(location.href).searchParams.get('q');
  if (inicial) { input.value = inicial; ejecutar(inicial, false); }
}
