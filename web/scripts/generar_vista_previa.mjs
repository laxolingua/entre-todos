// Genera una vista previa navegable del banco en un solo archivo HTML (datos incluidos).
// Sirve para revisar el banco y enseñarlo sin desplegar el sitio. No sustituye al sitio estático.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const raiz = new URL('../', import.meta.url);
const banco = JSON.parse(readFileSync(new URL('../datos/generado/banco.json', raiz), 'utf8'));
let css = readFileSync(new URL('src/styles/global.css', raiz), 'utf8');

// Tema oscuro con el formato de los artefactos: respeta la preferencia del sistema y la elección explícita.
const oscuro = css.match(/@media \(prefers-color-scheme: dark\) \{\s*:root \{([\s\S]*?)\}\s*\}/);
const tokensOscuros = oscuro[1];
css = css.replace(oscuro[0],
  `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {${tokensOscuros}} }\n:root[data-theme="dark"] {${tokensOscuros}}`);

const extra = `
.aviso-previa { background: var(--aviso-suave); color: var(--aviso); font-size: .86rem; padding: 10px 16px; text-align: center; }
.cabecera .marca { cursor: pointer; }
.nav button { background: none; border: 0; font: inherit; cursor: pointer; color: var(--texto-2); font-size: .92rem; font-weight: 500;
  padding: 8px 12px; border-radius: 999px; min-height: 40px; white-space: nowrap; }
.nav button:hover, .nav button[aria-current="page"] { background: var(--fondo); color: var(--texto); }
.categoria .icono { font-weight: 700; font-size: 1rem; }
`;

const datos = JSON.stringify(banco).replace(/</g, '\\u003c');

const html = `<title>Banco de Propuestas ENTRE TODOS</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>
${css}
${extra}
</style>
<div class="aviso-previa">Vista previa de desarrollo. Datos del banco verbatim del 3 de julio de 2026.</div>
<header class="cabecera">
  <div class="contenedor">
    <a class="marca" href="#inicio">ENTRE TODOS</a>
    <nav class="nav" aria-label="Principal">
      <button type="button" data-ir="inicio">Propuestas</button>
      <button type="button" data-ir="temas">Temas</button>
      <button type="button" data-ir="fuentes">Fuentes</button>
      <button type="button" data-ir="actores">Actores</button>
      <button type="button" data-ir="metodo">Método</button>
    </nav>
  </div>
</header>
<main id="contenido" class="contenedor"></main>
<footer class="pie"><div class="contenedor">
  <p style="margin:0">Las citas son literales y enlazan al documento original. Los titulares y resúmenes son editoriales.</p>
</div></footer>
<script type="application/json" id="datos">${datos}</script>
<script>
(() => {
  const B = JSON.parse(document.getElementById('datos').textContent);
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  const cats = [...B.categorias].sort((a, b) => a.orden - b.orden);
  const catPor = new Map(cats.map((c) => [c.clave, c]));
  const actPor = new Map(B.actores.map((a) => [a.id, a]));
  const fuePor = new Map(B.fuentes.map((f) => [f.ref, f]));
  const temPor = new Map(B.temas.map((t) => [t.slug, t]));
  const propPor = new Map(B.propuestas.map((p) => [p.id, p]));
  const TIPO_F = { ACAD: 'Centro de estudios', COAL: 'Coalición', ORG: 'Organización', PERS: 'Autor individual' };
  const TIPO_E = { propuesta: 'Propuesta', critica: 'Crítica', reforma_propuesta: 'Reforma propuesta' };
  const TONOS = ['#0a66c2', '#1d7a46', '#b4471c', '#6b3fb3', '#0f7c86', '#a3346b', '#7a6100', '#3d5a80'];
  const autoriaF = (f) => (f.actor && actPor.get(f.actor)?.nombre) || f.autor_texto || null;
  const autoria = (p) => autoriaF(fuePor.get(p.fuente)) || 'Autoría por confirmar';
  const indice = B.propuestas.map((p) => ({ p, t: norm(p.titular), x: norm(p.titular + ' ' + autoria(p) + ' ' + p.cita + ' ' + p.resumen) }));

  function agrupar(lista) {
    const g = new Map();
    for (const p of lista) {
      const k = p.tema ? 't:' + p.tema : 'f:' + p.tema_fino;
      if (!g.has(k)) g.set(k, { slug: p.tema, nombre: p.tema ? temPor.get(p.tema).nombre : p.titular, ps: [] });
      g.get(k).ps.push(p);
    }
    return [...g.values()].sort((a, b) => Number(!!b.slug) - Number(!!a.slug) || b.ps.length - a.ps.length);
  }

  function tarjeta(p, grupo = false, cats_ = true) {
    const cab = grupo
      ? '<h3><a href="#prop-' + p.id + '">' + esc(autoria(p)) + (p.anio ? '<span class="discreto"> · ' + p.anio + '</span>' : '') + '</a></h3>'
      : '<h3><a href="#prop-' + p.id + '">' + esc(p.titular) + '</a></h3><p class="autoria">' + esc(autoria(p)) + (p.anio ? ' · ' + p.anio : '') + '</p>';
    const et = [];
    if (p.tipo !== 'propuesta') et.push('<span class="etiqueta">' + TIPO_E[p.tipo] + '</span>');
    if (p.estado_cita === 'Verbatim-secundario') et.push('<span class="etiqueta aviso">Cita secundaria</span>');
    if (cats_) for (const c of p.categorias) et.push('<a class="etiqueta" href="#cat-' + c + '">' + esc(catPor.get(c)?.nombre ?? c) + '</a>');
    return '<li class="tarjeta">' + cab + '<blockquote>«' + esc(p.cita) + '»</blockquote><div class="etiquetas">' + et.join('') + '</div></li>';
  }
  const lista = (ps, grupo, c) => '<ul class="lista">' + ps.map((p) => tarjeta(p, grupo, c)).join('') + '</ul>';
  const migas = (...xs) => '<nav class="migas" aria-label="Ruta">' + xs.map((x, i) => (i ? '<span aria-hidden="true">›</span>' : '') + x).join('') + '</nav>';

  function vistaInicio() {
    const t = B.meta.totales;
    const tarjetaCat = (c, i) => '<a class="categoria" href="#cat-' + c.clave + '" style="--tono:' + TONOS[i % 8] + ';--tono-suave:color-mix(in srgb, ' + TONOS[i % 8] + ' 12%, transparent)">'
      + '<span class="icono" aria-hidden="true">' + esc(c.nombre[0]) + '</span><h3>' + esc(c.nombre) + '</h3>'
      + '<p>' + esc(c.descripcion || 'Categoría en revisión.') + '</p><span class="cifra">' + c.propuestas + ' propuestas</span></a>';
    const decl = cats.filter((c) => c.declarada && c.propuestas);
    const prov = cats.filter((c) => !c.declarada && c.propuestas);
    return '<h1>Banco de propuestas</h1><p class="entradilla">Lo que han propuesto organizaciones, coaliciones y especialistas sobre el futuro de Cuba, citado de forma literal y con enlace al documento original.</p>'
      + '<ul class="cifras"><li><strong>' + t.propuestas + '</strong> propuestas</li><li><strong>' + t.fuentes + '</strong> documentos</li><li><strong>' + t.temas + '</strong> temas en que coinciden varias fuentes</li></ul>'
      + '<form class="buscador" role="search" id="buscador"><label for="q" class="oculto">Buscar propuestas</label><input id="q" type="search" placeholder="Buscar: elecciones, vivienda, presos políticos…" autocomplete="off"><button class="boton primario" type="submit">Buscar</button></form>'
      + '<div id="resultados" aria-live="polite"></div>'
      + '<section id="categorias"><h2>Por categoría</h2><div class="rejilla">' + decl.map(tarjetaCat).join('') + '</div>'
      + '<h2>Otras categorías en revisión</h2><div class="rejilla">' + prov.map((c, i) => tarjetaCat(c, i + decl.length)).join('') + '</div></section>';
  }

  function activarBuscador() {
    const f = $('#buscador'), q = $('#q'), out = $('#resultados'), cs = $('#categorias');
    const ejecutar = () => {
      const ws = norm(q.value).split(/\\s+/).filter((w) => w.length > 1);
      if (!ws.length) { out.innerHTML = ''; cs.hidden = false; return; }
      const r = indice.filter((e) => ws.every((w) => e.x.includes(w)))
        .map((e) => [ws.reduce((s, w) => s + (e.t.includes(w) ? 3 : 1), 0), e.p])
        .sort((a, b) => b[0] - a[0]).map((x) => x[1]);
      cs.hidden = r.length > 0;
      out.innerHTML = r.length
        ? '<p class="discreto">' + r.length + ' propuestas' + (r.length > 60 ? '; se muestran las 60 más relevantes' : '') + '.</p>' + lista(r.slice(0, 60), false, true)
        : '<div class="panel"><p style="margin:0">Ninguna propuesta del banco menciona «' + esc(q.value) + '».</p><p class="discreto" style="margin:6px 0 0">En el sitio, esta búsqueda quedaría registrada como vacío temático, sin datos de quien busca.</p></div>';
    };
    let espera;
    f.addEventListener('submit', (e) => { e.preventDefault(); ejecutar(); });
    q.addEventListener('input', () => { clearTimeout(espera); espera = setTimeout(ejecutar, 300); });
  }

  function vistaCategoria(clave) {
    const c = catPor.get(clave); if (!c) return null;
    const ps = B.propuestas.filter((p) => p.categorias.includes(clave));
    const gs = agrupar(ps), con = gs.filter((g) => g.slug), resto = gs.filter((g) => !g.slug);
    return migas('<a href="#inicio">Propuestas</a>', '<span>' + esc(c.nombre) + '</span>') + '<h1>' + esc(c.nombre) + '</h1>'
      + (c.descripcion ? '<p class="entradilla">' + esc(c.descripcion) + '</p>' : '<p class="etiqueta aviso" style="display:inline-flex">Categoría con nombre provisional</p>')
      + '<ul class="cifras"><li><strong>' + ps.length + '</strong> propuestas</li><li><strong>' + gs.length + '</strong> temas</li>' + (c.fase ? '<li>' + esc(c.fase) + '</li>' : '') + '</ul>'
      + (con.length ? '<h2>Temas en que coinciden varias fuentes</h2>' : '')
      + con.map((g) => '<section class="grupo"><header><h2><a href="#tema-' + g.slug + '">' + esc(g.nombre) + '</a></h2><span class="discreto">' + g.ps.length + ' propuestas</span></header>' + lista(g.ps, true, false) + '</section>').join('')
      + (resto.length ? '<h2>Otras propuestas</h2>' + lista(resto.flatMap((g) => g.ps), false, false) : '');
  }

  function vistaTema(slug) {
    const t = temPor.get(slug); if (!t) return null;
    const ps = t.propuestas.map((id) => propPor.get(id)).sort((a, b) => (a.anio ?? 0) - (b.anio ?? 0));
    const n = new Set(ps.map(autoria)).size;
    return migas('<a href="#inicio">Propuestas</a>', '<a href="#temas">Temas</a>', '<span>' + esc(t.nombre) + '</span>') + '<h1>' + esc(t.nombre) + '</h1>'
      + '<p class="entradilla">' + ps.length + ' propuestas de ' + n + ' autorías distintas tratan este tema, por orden cronológico.</p>'
      + '<p class="discreto">Coincidir en el tema no significa coincidir en la postura. Lee cada cita completa.</p>' + lista(ps, true, true);
  }

  function vistaTemas() {
    const filas = B.temas.map((t) => { const ps = t.propuestas.map((id) => propPor.get(id)); return { t, n: ps.length, a: new Set(ps.map(autoria)).size }; })
      .sort((x, y) => y.n - x.n || x.t.nombre.localeCompare(y.t.nombre, 'es'));
    return '<h1>Temas en que coinciden varias fuentes</h1><p class="entradilla">Cada tema reúne propuestas de documentos distintos sobre un mismo asunto.</p>'
      + '<div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Tema</th><th scope="col">Propuestas</th><th scope="col">Autorías</th></tr></thead><tbody>'
      + filas.map((f) => '<tr><td><a href="#tema-' + f.t.slug + '">' + esc(f.t.nombre) + '</a></td><td>' + f.n + '</td><td>' + f.a + '</td></tr>').join('') + '</tbody></table></div>';
  }

  function vistaPropuesta(id) {
    const p = propPor.get(id); if (!p) return null;
    const f = fuePor.get(p.fuente), a = f.actor ? actPor.get(f.actor) : null, t = p.tema ? temPor.get(p.tema) : null, c0 = catPor.get(p.categorias[0]);
    const rel = t ? t.propuestas.filter((x) => x !== id).map((x) => propPor.get(x)) : B.propuestas.filter((o) => o.id !== id && o.tema_fino === p.tema_fino);
    const dato = (dt, dd) => '<div class="dato"><dt>' + dt + '</dt><dd>' + dd + '</dd></div>';
    return migas('<a href="#inicio">Propuestas</a>', '<a href="#cat-' + c0.clave + '">' + esc(c0.nombre) + '</a>', '<span>' + p.id + '</span>')
      + '<div class="ficha"><article class="panel"><p class="discreto" style="margin:0">' + TIPO_E[p.tipo] + ' · ' + esc(autoria(p)) + (p.fecha_texto ? ' · ' + esc(p.fecha_texto) : '') + '</p>'
      + '<h1>' + esc(p.titular) + '</h1><blockquote class="cita">' + esc(p.cita) + '</blockquote>'
      + (p.estado_cita === 'Verbatim-secundario' ? '<p class="etiqueta aviso" style="margin-top:14px;display:inline-flex">Cita secundaria: procede de una síntesis de prensa, no del documento original.</p>' : '')
      + (p.resumen ? '<div class="resumen"><strong>Resumen editorial</strong>' + esc(p.resumen) + '</div>' : '')
      + '<div class="acciones"><a class="boton primario" href="' + esc(f.url) + '" target="_blank" rel="noopener">Leer el documento original</a></div></article>'
      + '<aside class="panel" aria-label="Datos de la fuente"><dl>'
      + dato('Autoría', (a ? '<a href="#actor-' + a.id + '">' + esc(a.nombre) + '</a>' : esc(f.autor_texto || 'Por confirmar')) + '<div class="discreto">Atribución pendiente de verificar con el documento.</div>')
      + dato('Documento', '<a href="#fuente-' + f.ref + '">' + esc(f.documento) + '</a>')
      + dato('Dónde está en el documento', esc(p.localizacion || 'Sin localización'))
      + dato('Tipo de fuente', TIPO_F[f.tipo])
      + dato('Categorías', '<span class="etiquetas" style="margin-top:6px">' + p.categorias.map((c) => '<a class="etiqueta" href="#cat-' + c + '">' + esc(catPor.get(c)?.nombre ?? c) + '</a>').join('') + '</span>')
      + (t ? dato('Tema común', '<a href="#tema-' + t.slug + '">' + esc(t.nombre) + '</a>') : '')
      + dato('Identificador', p.id) + '</dl></aside></div>'
      + (rel.length ? '<section><h2>' + (t ? 'Otras propuestas sobre «' + esc(t.nombre) + '»' : 'Propuestas sobre el mismo asunto') + '</h2>' + lista(rel, !!t, false) + '</section>' : '');
  }

  function vistaFuentes() {
    const fs = [...B.fuentes].sort((a, b) => b.propuestas - a.propuestas || a.ref - b.ref);
    return '<h1>Fuentes</h1><p class="entradilla">Los ' + fs.length + ' documentos públicos de los que se han extraído las propuestas.</p>'
      + '<div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Documento</th><th scope="col">Autoría</th><th scope="col">Propuestas</th></tr></thead><tbody>'
      + fs.map((f) => '<tr><td><a href="#fuente-' + f.ref + '">' + esc(f.documento) + '</a>' + (f.duplicado_de ? '<div class="discreto">Mismo documento que la fuente ' + f.duplicado_de + '</div>' : '') + '</td><td>' + esc(autoriaF(f) || 'Por confirmar') + '</td><td>' + f.propuestas + '</td></tr>').join('')
      + '</tbody></table></div>';
  }

  function vistaFuente(ref) {
    const f = fuePor.get(Number(ref)); if (!f) return null;
    const ps = B.propuestas.filter((p) => p.fuente === f.ref);
    return migas('<a href="#fuentes">Fuentes</a>', '<span>Fuente ' + f.ref + '</span>') + '<h1>' + esc(f.documento) + '</h1>'
      + '<ul class="cifras"><li>' + esc(autoriaF(f) || 'Autoría por confirmar') + '</li><li>' + TIPO_F[f.tipo] + '</li><li><strong>' + ps.length + '</strong> propuestas</li></ul>'
      + '<div class="acciones"><a class="boton primario" href="' + esc(f.url) + '" target="_blank" rel="noopener">Abrir el documento original</a></div>'
      + '<div style="margin-top:24px">' + lista(agrupar(ps).flatMap((g) => g.ps), false, true) + '</div>';
  }

  function vistaActores() {
    const as = B.actores.filter((a) => a.propuestas).sort((a, b) => b.propuestas - a.propuestas);
    return '<h1>Actores cívicos</h1><p class="entradilla">Organizaciones, coaliciones y centros de estudios cuyas propuestas están en el banco.</p>'
      + '<p class="discreto">Atribuciones hechas a partir del título y del sitio de cada documento, pendientes de verificación una a una.</p>'
      + '<div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Actor</th><th scope="col">Tipo</th><th scope="col">Propuestas</th></tr></thead><tbody>'
      + as.map((a) => '<tr><td><a href="#actor-' + a.id + '">' + esc(a.nombre) + '</a></td><td>' + TIPO_F[a.tipo] + '</td><td>' + a.propuestas + '</td></tr>').join('') + '</tbody></table></div>';
  }

  function vistaActor(id) {
    const a = actPor.get(id); if (!a) return null;
    const refs = new Set(B.fuentes.filter((f) => f.actor === id).map((f) => f.ref));
    const ps = B.propuestas.filter((p) => refs.has(p.fuente));
    return migas('<a href="#actores">Actores</a>', '<span>' + esc(a.nombre) + '</span>') + '<h1>' + esc(a.nombre) + '</h1>'
      + '<ul class="cifras"><li>' + TIPO_F[a.tipo] + '</li><li><strong>' + refs.size + '</strong> documentos</li><li><strong>' + ps.length + '</strong> propuestas</li></ul>'
      + lista(agrupar(ps).flatMap((g) => g.ps), false, true);
  }

  function vistaMetodo() {
    const t = B.meta.totales;
    return '<h1>Cómo se construyó el banco</h1><p class="entradilla">El banco reúne propuestas ya publicadas sobre el futuro de Cuba. No las redacta ni las corrige: las cita y las ordena.</p>'
      + '<p>Cada propuesta es un fragmento literal de un documento público, con el lugar donde aparece, la fecha y el enlace al original. ' + (t.propuestas - t.citas_secundarias) + ' citan el documento original y ' + t.citas_secundarias + ' una síntesis de prensa (cita secundaria).</p>'
      + '<p>Los titulares y resúmenes son editoriales. Ante cualquier duda manda la cita literal.</p>'
      + '<h2>Fragmentos revisados y excluidos</h2><p>' + B.no_propuestas.length + ' fragmentos se dejaron fuera porque describen, opinan o declaran, pero no proponen.</p>'
      + '<div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Fragmento</th><th scope="col">Motivo</th></tr></thead><tbody>'
      + B.no_propuestas.map((n) => '<tr><td>«' + esc(n.cita) + '»</td><td>' + esc(n.motivo) + '</td></tr>').join('') + '</tbody></table></div>';
  }

  const RUTAS = [
    [/^cat-([a-z_]+)$/, vistaCategoria, () => 'inicio'], [/^tema-([a-z0-9-]+)$/, vistaTema, () => 'temas'],
    [/^prop-(P-[0-9]+)$/, vistaPropuesta, () => 'inicio'], [/^fuente-([0-9]+)$/, vistaFuente, () => 'fuentes'],
    [/^actor-([a-z0-9-]+)$/, vistaActor, () => 'actores'],
  ];
  const FIJAS = { inicio: vistaInicio, temas: vistaTemas, fuentes: vistaFuentes, actores: vistaActores, metodo: vistaMetodo };

  function mostrar() {
    const h = location.hash.slice(1) || 'inicio';
    let html = null, seccion = h;
    if (FIJAS[h]) html = FIJAS[h]();
    else for (const [re, fn, sec] of RUTAS) { const m = h.match(re); if (m) { html = fn(m[1]); seccion = sec(); break; } }
    if (html === null) { html = vistaInicio(); seccion = 'inicio'; }
    $('#contenido').innerHTML = html;
    document.querySelectorAll('.nav button').forEach((b) => (b.dataset.ir === seccion ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current')));
    if ($('#buscador')) activarBuscador();
    window.scrollTo(0, 0);
  }
  document.querySelectorAll('.nav button').forEach((b) => b.addEventListener('click', () => { location.hash = b.dataset.ir; }));
  window.addEventListener('hashchange', mostrar);
  mostrar();
})();
</script>
`;

const destino = new URL('../vista-previa/', raiz);
mkdirSync(destino, { recursive: true });
writeFileSync(new URL('banco-explorador.html', destino), html);
console.log('vista previa:', new URL('banco-explorador.html', destino).pathname, Math.round(html.length / 1024), 'KB');
