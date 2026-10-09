// Genera las imágenes para compartir (1200x630 PNG) de cada propuesta del banco, categoría, tema y cita del archivo.
// Regla del proyecto: toda página pública tiene su imagen para Facebook e Instagram.
// Solo regenera las que cambiaron (compara una huella del contenido).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const raiz = new URL('../', import.meta.url);
const banco = JSON.parse(readFileSync(new URL('../datos/generado/banco.json', raiz), 'utf8'));
const fuente = (peso) => readFileSync(new URL(`node_modules/@fontsource/inter/files/inter-latin-${peso}-normal.woff`, raiz));
const fuenteExt = (peso) => readFileSync(new URL(`node_modules/@fontsource/inter/files/inter-latin-ext-${peso}-normal.woff`, raiz));
const fonts = [
  { name: 'Inter', data: fuente(400), weight: 400, style: 'normal' },
  { name: 'Inter', data: fuente(600), weight: 600, style: 'normal' },
  { name: 'Inter', data: fuente(700), weight: 700, style: 'normal' },
  { name: 'InterExt', data: fuenteExt(400), weight: 400, style: 'normal' },
  { name: 'InterExt', data: fuenteExt(700), weight: 700, style: 'normal' },
];

const fuentes = new Map(banco.fuentes.map((f) => [f.ref, f]));
const actores = new Map(banco.actores.map((a) => [a.id, a]));
const cats = new Map(banco.categorias.map((c) => [c.clave, c]));
const autoria = (p) => {
  const f = fuentes.get(p.fuente);
  return (f.actor && actores.get(f.actor)?.nombre) || f.autor_texto || 'Autoría por confirmar';
};
const recortar = (t, max) => (t.length <= max ? t : t.slice(0, t.slice(0, max).lastIndexOf(' ')) + '…');

const h = (type, style, children) => ({ type, props: { style, children } });

function lienzo({ etiqueta, titulo, cuerpo, pie }) {
  return h('div', {
    width: '1200px', height: '630px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    background: '#f5f5f7', padding: '56px 64px', fontFamily: 'Inter, InterExt', color: '#1d1d1f',
  }, [
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '24px', color: '#515154' }, [
      h('div', { display: 'flex', fontWeight: 700, letterSpacing: '1px', color: '#1d1d1f' }, 'ENTRE TODOS'),
      h('div', { display: 'flex', background: '#ffffff', borderRadius: '999px', padding: '8px 20px', fontWeight: 600 }, etiqueta),
    ]),
    h('div', { display: 'flex', flexDirection: 'column', gap: '22px' }, [
      h('div', { display: 'flex', fontSize: titulo.length > 60 ? '50px' : '60px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1px' }, titulo),
      cuerpo ? h('div', { display: 'flex', fontSize: '30px', lineHeight: 1.4, color: '#515154' }, cuerpo) : null,
    ].filter(Boolean)),
    h('div', { display: 'flex', justifyContent: 'space-between', fontSize: '24px', color: '#6e6e73' }, [
      h('div', { display: 'flex' }, pie),
      h('div', { display: 'flex' }, 'entre-todos.org'),
    ]),
  ]);
}

const trabajos = [];
const publicadas = banco.propuestas.filter((p) => p.estado === 'publicada');
trabajos.push({ ruta: 'banco.png', datos: {
  etiqueta: 'Banco de propuestas',
  titulo: 'Lo que se ha propuesto para el futuro de Cuba',
  cuerpo: `${banco.meta.totales.consolidadas} propuestas reunidas a partir de ${publicadas.length} citas literales de ${banco.meta.totales.fuentes} documentos públicos.`,
  pie: 'Cada idea, con todas sus fuentes',
} });
for (const c of banco.categorias.filter((x) => x.consolidadas > 0 || x.propuestas > 0)) {
  trabajos.push({ ruta: `categoria/${c.clave}.png`, datos: {
    etiqueta: 'Categoría', titulo: c.nombre, cuerpo: c.descripcion ? recortar(c.descripcion, 150) : null,
    pie: c.consolidadas ? `${c.consolidadas} ${c.consolidadas === 1 ? 'propuesta' : 'propuestas'}` : `${c.propuestas} citas`,
  } });
}
const propPorId = new Map(publicadas.map((p) => [p.id, p]));
for (const c of banco.consolidadas) {
  const quien = [...new Set(c.respaldo.map((id) => propPorId.get(id)).filter(Boolean).map(autoria))];
  trabajos.push({ ruta: `propuesta/${c.id}.png`, datos: {
    etiqueta: cats.get(c.categoria)?.nombre ?? 'Propuesta',
    titulo: recortar(c.titulo, 95), cuerpo: recortar(c.texto, 200),
    pie: recortar(`${c.fuentes.length} ${c.fuentes.length === 1 ? 'documento' : 'documentos'} · ${quien.slice(0, 2).join(', ')}${quien.length > 2 ? '…' : ''}`, 70),
  } });
}
for (const t of banco.temas) {
  const ps = t.propuestas.map((id) => propPorId.get(id)).filter(Boolean);
  const n = new Set(ps.map(autoria)).size;
  trabajos.push({ ruta: `tema/${t.slug}.png`, datos: {
    etiqueta: 'Tema común', titulo: t.nombre, cuerpo: `${ps.length} citas de ${n} autorías distintas sobre este tema.`,
    pie: 'Compara sus textos literales',
  } });
}
for (const p of publicadas) {
  trabajos.push({ ruta: `archivo/${p.id}.png`, datos: {
    etiqueta: 'Archivo · ' + (cats.get(p.categorias[0])?.nombre ?? 'Cita'),
    titulo: recortar(p.titular, 90), cuerpo: `«${recortar(p.cita, 210)}»`,
    pie: recortar(`${autoria(p)}${p.anio ? ` · ${p.anio}` : ''}`, 60),
  } });
}

const salida = new URL('public/og/', raiz);
const huellasArchivo = new URL('public/og/.huellas.json', raiz);
const huellas = existsSync(huellasArchivo) ? JSON.parse(readFileSync(huellasArchivo, 'utf8')) : {};
let hechas = 0;
for (const { ruta, datos } of trabajos) {
  const huella = createHash('sha1').update(JSON.stringify(datos)).digest('hex');
  const destino = new URL(ruta, salida);
  if (huellas[ruta] === huella && existsSync(destino)) continue;
  const svg = await satori(lienzo(datos), { width: 1200, height: 630, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  mkdirSync(new URL('.', destino), { recursive: true });
  writeFileSync(destino, png);
  huellas[ruta] = huella;
  hechas++;
}
writeFileSync(huellasArchivo, JSON.stringify(huellas));
console.log(`imágenes para compartir: ${hechas} generadas, ${trabajos.length - hechas} sin cambios`);
