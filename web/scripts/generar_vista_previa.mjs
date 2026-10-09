// Genera una vista previa navegable de las propuestas en un solo archivo HTML (datos incluidos).
// Solo usa la capa pública (src/data/publico.json): el banco es privado y nunca entra en la vista previa.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const raiz = new URL('../', import.meta.url);
const pub = JSON.parse(readFileSync(new URL('src/data/publico.json', raiz), 'utf8'));
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
.tarjeta h3 a, .opciones a, .quien a { cursor: pointer; }
.volver { margin-top: 24px; }
`;

const datos = JSON.stringify(pub).replace(/</g, '\\u003c');

const html = `<title>Propuestas ENTRE TODOS</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
<style>
${css}
${extra}
</style>
<div class="aviso-previa">Vista previa de desarrollo de las propuestas combinadas. Actualizada el ${pub.meta.actualizado}.</div>
<header class="cabecera">
  <div class="contenedor">
    <a class="marca" href="#inicio">ENTRE TODOS</a>
    <nav class="nav" aria-label="Principal">
      <button type="button" data-ir="inicio">Propuestas</button>
      <button type="button" data-ir="cuestiones">Cuestiones</button>
      <button type="button" data-ir="documentos">Documentos</button>
      <button type="button" data-ir="actores">Actores</button>
      <button type="button" data-ir="metodo">Método</button>
    </nav>
  </div>
</header>
<main id="contenido" class="contenedor"></main>
<footer class="pie"><div class="contenedor">
  <p style="margin:0">Cada propuesta reúne las fuentes que dicen lo mismo; su redacción es editorial y conserva el lenguaje de las fuentes. Cada documento enlaza a su original.</p>
</div></footer>
<script type="application/json" id="datos">${datos}</script>
<script>
(() => {
  const B = JSON.parse(document.getElementById('datos').textContent);
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const norm = (s) => (s || '').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  const recortar = (t, n) => (!t || t.length <= n ? t : t.slice(0, t.slice(0, n).lastIndexOf(' ')) + '…');
  const cats = [...B.categorias].sort((a, b) => a.orden - b.orden);
  const catPor = new Map(cats.map((c) => [c.clave, c]));
  const docPor = new Map(B.documentos.map((d) => [d.id, d]));
  const propPor = new Map(B.propuestas.map((p) => [p.id, p]));
  const actores = [...B.actores].sort((a, b) => b.propuestas - a.propuestas || a.nombre.localeCompare(b.nombre, 'es'));
  const TIPOS = { ACAD: 'Centro de estudios', COAL: 'Coalición', ORG: 'Organización', PERS: 'Autor individual' };
  const METODOS = { dominio_oficial: 'comprobada en el sitio oficial del autor', documento_revisado: 'comprobada leyendo el propio documento', instinct: 'comprobada por el equipo de revisión de ENTRE TODOS' };
  const todos = (p) => [...new Set([...p.documentos, ...p.incisos.flatMap((i) => i.documentos), ...p.variantes.flatMap((v) => v.documentos)])];
  const autorias = (ids) => [...new Set(ids.map((id) => docPor.get(id)?.autoria).filter(Boolean))];
  const etiqueta = (id) => { const d = docPor.get(id); return d ? d.autoria + (d.anio ? ' (' + d.anio + ')' : '') : ''; };
  function quienes(ids) {
    const g = new Map();
    ids.forEach((id) => { const e = etiqueta(id); if (!g.has(e)) g.set(e, []); g.get(e).push(id); });
    return [...g.entries()].map(([e, l]) => '<a href="' + esc(docPor.get(l[0]).url) + '" target="_blank" rel="noopener">' + esc(e) + '</a>'
      + (l.length > 1 ? '<span class="discreto"> (' + l.length + ' documentos)</span>' : '')).join(' · ');
  }
  function tarjeta(p, conCat) {
    const a = autorias(todos(p)); const vis = a.slice(0, 3);
    return '<li class="tarjeta consolidada"><h3><a href="#p-' + p.id + '">' + esc(p.titulo) + '</a></h3>'
      + '<p class="texto">' + esc(recortar(p.texto, 230)) + '</p>'
      + '<p class="autoria">' + esc(vis.join(' · ')) + (a.length > 3 ? ' y ' + (a.length - 3) + ' más' : '') + '</p>'
      + '<div class="etiquetas"><span class="etiqueta">' + p.total_documentos + (p.total_documentos === 1 ? ' documento' : ' documentos') + '</span>'
      + (p.incisos.length ? '<span class="etiqueta">' + p.incisos.length + (p.incisos.length === 1 ? ' inciso' : ' incisos') + '</span>' : '')
      + (p.variantes.length ? '<span class="etiqueta aviso">Las fuentes difieren en el cómo</span>' : '')
      + (p.cuestiones.length ? '<span class="etiqueta alterna">Tiene alternativas</span>' : '')
      + (conCat ? '<a class="etiqueta" href="#categoria-' + p.categoria + '">' + esc(catPor.get(p.categoria)?.nombre) + '</a>' : '')
      + '</div></li>';
  }
  const t = B.meta.totales;
  function vistaInicio() {
    const top = [...B.propuestas].sort((a, b) => b.total_documentos - a.total_documentos || a.orden - b.orden).slice(0, 6);
    return '<h1>Propuestas para el futuro de Cuba</h1>'
      + '<p class="entradilla">Lo que han propuesto organizaciones, coaliciones y especialistas. Cada idea aparece una sola vez, con todas las fuentes que la plantean; lo que alguna fuente añade va como inciso, con su referencia.</p>'
      + '<ul class="cifras"><li><strong>' + t.propuestas + '</strong> propuestas</li><li><strong>' + t.documentos + '</strong> documentos</li><li><strong>' + t.autorias + '</strong> autorías</li><li><strong>' + t.cuestiones + '</strong> <a href="#cuestiones">cuestiones con alternativas</a></li></ul>'
      + '<form class="buscador" role="search" id="buscador"><label for="q" class="oculto">Buscar propuestas</label><input id="q" type="search" placeholder="Buscar: elecciones, vivienda, presos políticos…" autocomplete="off"><button class="boton primario" type="submit">Buscar</button></form>'
      + '<div id="resultados" aria-live="polite"></div><div id="bloques">'
      + '<h2>Donde más fuentes coinciden</h2><ul class="lista">' + top.map((p) => tarjeta(p, true)).join('') + '</ul>'
      + '<h2>Por categoría</h2><div class="rejilla">' + cats.map((c) => '<a class="categoria" href="#categoria-' + c.clave + '"><span class="icono" aria-hidden="true">' + esc(c.nombre[0]) + '</span><h3>' + esc(c.nombre) + '</h3><p>' + esc(c.descripcion || '') + '</p><span class="cifra">' + c.propuestas + (c.propuestas === 1 ? ' propuesta' : ' propuestas') + '</span></a>').join('') + '</div>'
      + '</div>';
  }
  function activarBuscador() {
    const f = $('#buscador'); if (!f) return;
    const q = $('#q'); const out = $('#resultados'); const bloques = $('#bloques');
    const indice = B.propuestas.map((p) => [norm([p.titulo, p.texto, ...p.incisos.map((i) => i.texto), ...p.variantes.map((v) => v.texto), autorias(todos(p)).join(' '), catPor.get(p.categoria)?.nombre].join(' ')), p]);
    function ejecutar() {
      const w = norm(q.value).split(/\\s+/).filter((x) => x.length > 1);
      if (!w.length) { out.innerHTML = ''; bloques.hidden = false; return; }
      const r = indice.filter(([s]) => w.every((x) => s.includes(x))).map(([, p]) => p);
      bloques.hidden = r.length > 0;
      out.innerHTML = r.length ? '<p class="discreto">' + r.length + (r.length === 1 ? ' propuesta' : ' propuestas') + '.</p><ul class="lista">' + r.map((p) => tarjeta(p, true)).join('') + '</ul>'
        : '<div class="panel"><p style="margin:0">Ninguna propuesta menciona «' + esc(q.value) + '».</p></div>';
    }
    let espera;
    f.addEventListener('submit', (e) => { e.preventDefault(); ejecutar(); });
    q.addEventListener('input', () => { clearTimeout(espera); espera = setTimeout(ejecutar, 300); });
  }
  function vistaCategoria(clave) {
    const c = catPor.get(clave); if (!c) return vistaInicio();
    const l = B.propuestas.filter((p) => p.categoria === clave).sort((a, b) => b.total_documentos - a.total_documentos || a.orden - b.orden);
    return '<nav class="migas"><a href="#inicio">Propuestas</a><span aria-hidden="true">›</span><span>' + esc(c.nombre) + '</span></nav><h1>' + esc(c.nombre) + '</h1>'
      + (c.descripcion ? '<p class="entradilla">' + esc(c.descripcion) + '</p>' : '') + '<p class="discreto">' + l.length + ' propuestas, ordenadas por número de documentos.</p>'
      + '<ul class="lista">' + l.map((p) => tarjeta(p)).join('') + '</ul>';
  }
  function vistaPropuesta(id) {
    const p = propPor.get(id); if (!p) return vistaInicio();
    const c = catPor.get(p.categoria); const total = todos(p).length; const cent = autorias(p.documentos);
    const papeles = new Map(); const ap = (d, r) => { if (!papeles.has(d)) papeles.set(d, []); if (!papeles.get(d).includes(r)) papeles.get(d).push(r); };
    p.documentos.forEach((d) => ap(d, 'Idea central')); p.incisos.forEach((i) => i.documentos.forEach((d) => ap(d, 'Inciso ' + i.letra + ')')));
    p.variantes.forEach((v) => v.documentos.forEach((d) => ap(d, 'Variante'))); p.analizan.forEach((d) => ap(d, 'Análisis del problema'));
    const qs = B.cuestiones.filter((q) => q.opciones.includes(p.id));
    return '<nav class="migas"><a href="#inicio">Propuestas</a><span aria-hidden="true">›</span><a href="#categoria-' + c.clave + '">' + esc(c.nombre) + '</a></nav>'
      + '<article class="panel ficha-consolidada"><p class="antetitulo">' + esc(c.nombre) + '</p><h1>' + esc(p.titulo) + '</h1><p class="texto-consolidado">' + esc(p.texto) + '</p>'
      + '<p class="discreto nota-redaccion">Redacción de ENTRE TODOS a partir de ' + total + (total === 1 ? ' documento' : ' documentos') + ', respetando su lenguaje. Cada documento enlaza a su original.</p>'
      + '<div class="respaldo"><span class="dato-titulo">La ' + (cent.length === 1 ? 'plantea' : 'plantean') + '</span><ul class="chips">' + cent.map((a) => '<li>' + esc(a) + '</li>').join('') + '</ul></div></article>'
      + (p.incisos.length ? '<section><h2>Incisos y precisiones de las fuentes</h2><p class="discreto">Elementos que alguna fuente añade a la idea central. Cada uno indica quién lo propone.</p><ol class="incisos">'
        + p.incisos.map((i) => '<li><span class="letra" aria-hidden="true">' + i.letra + '</span><div><p>' + esc(i.texto) + '</p><p class="quien">Lo propone: ' + quienes(i.documentos) + '</p></div></li>').join('') + '</ol></section>' : '')
      + (p.variantes.length ? '<section><h2>Diferencias entre las fuentes</h2><p class="discreto">Las fuentes coinciden en lo esencial, pero no en el procedimiento.</p><div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Modalidad</th><th scope="col">Quién la propone</th></tr></thead><tbody>'
        + p.variantes.map((v) => '<tr><td>' + esc(v.texto) + '</td><td>' + quienes(v.documentos) + '</td></tr>').join('') + '</tbody></table></div></section>' : '')
      + (p.nota ? '<div class="resumen"><strong>Nota editorial</strong>' + esc(p.nota) + '</div>' : '')
      + qs.map((q) => '<section class="panel cuestion"><p class="antetitulo">' + (q.excluyentes ? 'Alternativas incompatibles' : 'Otras respuestas a la misma cuestión') + '</p><h2>' + esc(q.pregunta) + '</h2><ul class="opciones">'
        + q.opciones.map((o) => '<li>' + (o === p.id ? '<strong>' + esc(propPor.get(o).titulo) + ' <span class="discreto">(esta propuesta)</span></strong>' : '<a href="#p-' + o + '">' + esc(propPor.get(o).titulo) + '</a>') + '</li>').join('') + '</ul></section>').join('')
      + '<section><h2>Documentos</h2><ul class="lista">' + [...papeles.entries()].map(([d, r]) => { const x = docPor.get(d);
          return '<li class="tarjeta"><h3><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.titulo) + '</a></h3><p class="autoria">' + esc(x.autoria) + (x.anio ? ' · ' + x.anio : '') + '</p><div class="etiquetas">' + r.map((y) => '<span class="etiqueta">' + esc(y) + '</span>').join('') + '</div></li>'; }).join('') + '</ul></section>';
  }
  function vistaCuestiones() {
    return '<h1>Cuestiones con alternativas</h1><p class="entradilla">Asuntos en los que las fuentes proponen caminos distintos. Las alternativas no se combinan: cada una se presenta por separado, con quién la sostiene.</p>'
      + B.cuestiones.map((q) => '<section class="cuestion-bloque"><h2>' + esc(q.pregunta) + '</h2>' + (q.texto ? '<p class="discreto">' + esc(q.texto) + '</p>' : '')
        + '<p class="etiqueta' + (q.excluyentes ? ' aviso' : '') + '" style="display:inline-flex">' + (q.excluyentes ? 'Opciones incompatibles entre sí' : 'Opciones que pueden combinarse') + '</p>'
        + '<ul class="lista" style="margin-top:12px">' + q.opciones.map((o) => tarjeta(propPor.get(o))).join('') + '</ul></section>').join('');
  }
  function vistaDocumentos() {
    const n = (id) => B.propuestas.filter((p) => todos(p).includes(id)).length;
    const l = B.documentos.map((d) => [d, n(d.id)]).sort((a, b) => b[1] - a[1]);
    return '<h1>Documentos</h1><p class="entradilla">Los ' + l.length + ' documentos públicos de los que salen las propuestas. Cada uno enlaza a su original.</p>'
      + '<div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Documento</th><th scope="col">Autoría</th><th scope="col">Año</th><th scope="col">Propuestas</th></tr></thead><tbody>'
      + l.map(([d, k]) => '<tr><td><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.titulo) + '</a></td><td>' + esc(d.autoria) + '</td><td>' + (d.anio || '') + '</td><td>' + k + '</td></tr>').join('') + '</tbody></table></div>';
  }
  function vistaActores() {
    return '<h1>Actores cívicos</h1><p class="entradilla">Organizaciones, coaliciones y centros de estudios cuyas propuestas están reunidas aquí.</p>'
      + '<div class="desplazable"><table class="tabla"><thead><tr><th scope="col">Actor</th><th scope="col">Tipo</th><th scope="col">Propuestas</th></tr></thead><tbody>'
      + actores.map((a) => '<tr><td><a href="#actor-' + a.id + '">' + esc(a.nombre) + '</a></td><td>' + (TIPOS[a.tipo] || '') + '</td><td>' + a.propuestas + '</td></tr>').join('') + '</tbody></table></div>';
  }
  function vistaActor(id) {
    const a = actores.find((x) => x.id === id); if (!a) return vistaActores();
    const ids = new Set(B.documentos.filter((d) => d.actor === id).map((d) => d.id));
    const l = B.propuestas.filter((p) => todos(p).some((d) => ids.has(d)));
    return '<nav class="migas"><a href="#actores">Actores</a><span aria-hidden="true">›</span><span>' + esc(a.nombre) + '</span></nav><h1>' + esc(a.nombre) + '</h1>'
      + '<ul class="cifras"><li>' + (TIPOS[a.tipo] || '') + '</li><li><strong>' + l.length + '</strong> propuestas</li>' + (a.web ? '<li><a href="' + esc(a.web) + '" target="_blank" rel="noopener">Sitio web</a></li>' : '') + '</ul>'
      + '<ul class="lista">' + l.map((p) => tarjeta(p, true)).join('') + '</ul>';
  }
  function vistaMetodo() {
    const inc = B.propuestas.reduce((s, p) => s + p.incisos.length, 0);
    const v = B.propuestas.filter((p) => p.variantes.length).length;
    return '<h1>Cómo se reúnen las propuestas</h1><p class="entradilla">Cada idea aparece una sola vez, con todas las fuentes que la plantean y un enlace a cada documento original.</p>'
      + '<h2>Tres reglas</h2><ul><li><strong>Repetición:</strong> cuando dos textos dicen lo mismo, se combinan y se conservan todas las fuentes.</li>'
      + '<li><strong>Complemento:</strong> lo que una fuente añade entra como inciso con su propia referencia (' + inc + ' incisos).</li>'
      + '<li><strong>Alternativa:</strong> las diferencias de fondo no se combinan; se agrupan en ' + t.cuestiones + ' cuestiones. Las diferencias de procedimiento se muestran dentro de la propuesta (' + v + ' propuestas).</li></ul>'
      + '<h2>Autorías</h2><ul>' + Object.entries(B.meta.verificacion).map(([m, n]) => '<li>' + n + ' documentos: ' + METODOS[m] + '.</li>').join('') + '</ul>';
  }
  function mostrar() {
    const h = location.hash.slice(1) || 'inicio';
    let html;
    if (h.startsWith('p-')) html = vistaPropuesta(h.slice(2));
    else if (h.startsWith('categoria-')) html = vistaCategoria(h.slice(10));
    else if (h.startsWith('actor-')) html = vistaActor(h.slice(6));
    else html = ({ cuestiones: vistaCuestiones, documentos: vistaDocumentos, actores: vistaActores, metodo: vistaMetodo }[h] || vistaInicio)();
    $('#contenido').innerHTML = html;
    const sec = h.startsWith('p-') || h.startsWith('categoria-') ? 'inicio' : h.startsWith('actor-') ? 'actores' : h;
    document.querySelectorAll('.nav button').forEach((b) => b.setAttribute('aria-current', b.dataset.ir === sec ? 'page' : 'false'));
    activarBuscador();
    window.scrollTo(0, 0);
  }
  document.querySelectorAll('.nav button').forEach((b) => b.addEventListener('click', () => { location.hash = b.dataset.ir; }));
  window.addEventListener('hashchange', mostrar);
  mostrar();
})();
</script>`;

const destino = new URL('../vista-previa/', raiz);
mkdirSync(destino, { recursive: true });
writeFileSync(new URL('propuestas-entre-todos.html', destino), html);
console.log('vista previa: vista-previa/propuestas-entre-todos.html', Math.round(html.length / 1024), 'KB');
