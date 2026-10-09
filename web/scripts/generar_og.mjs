// Genera las imágenes para compartir (1200x630 PNG) de cada propuesta y categoría.
// Regla del proyecto: toda página pública tiene su imagen para Facebook e Instagram.
// Solo regenera las que cambiaron (compara una huella del contenido).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const raiz = new URL('../', import.meta.url);
// Solo la capa pública: el banco nunca entra en el sitio.
const pub = JSON.parse(readFileSync(new URL('src/data/publico.json', raiz), 'utf8'));
const fuente = (peso) => readFileSync(new URL(`node_modules/@fontsource/inter/files/inter-latin-${peso}-normal.woff`, raiz));
const fuenteExt = (peso) => readFileSync(new URL(`node_modules/@fontsource/inter/files/inter-latin-ext-${peso}-normal.woff`, raiz));
const fonts = [
  { name: 'Inter', data: fuente(400), weight: 400, style: 'normal' },
  { name: 'Inter', data: fuente(600), weight: 600, style: 'normal' },
  { name: 'Inter', data: fuente(700), weight: 700, style: 'normal' },
  { name: 'InterExt', data: fuenteExt(400), weight: 400, style: 'normal' },
  { name: 'InterExt', data: fuenteExt(700), weight: 700, style: 'normal' },
];

const docs = new Map(pub.documentos.map((d) => [d.id, d]));
const cats = new Map(pub.categorias.map((c) => [c.clave, c]));
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
const t = pub.meta.totales;
trabajos.push({ ruta: 'banco.png', datos: {
  etiqueta: 'Propuestas',
  titulo: 'Lo que se ha propuesto para el futuro de Cuba',
  cuerpo: `${t.propuestas} propuestas reunidas a partir de ${t.documentos} documentos públicos.`,
  pie: 'Cada idea, con todas sus fuentes',
} });
for (const c of pub.categorias) {
  trabajos.push({ ruta: `categoria/${c.clave}.png`, datos: {
    etiqueta: 'Categoría', titulo: c.nombre, cuerpo: c.descripcion ? recortar(c.descripcion, 150) : null,
    pie: `${c.propuestas} ${c.propuestas === 1 ? 'propuesta' : 'propuestas'}`,
  } });
}
for (const c of pub.propuestas) {
  const quien = [...new Set(c.documentos.map((id) => docs.get(id)?.autoria).filter(Boolean))];
  trabajos.push({ ruta: `propuesta/${c.id}.png`, datos: {
    etiqueta: cats.get(c.categoria)?.nombre ?? 'Propuesta',
    titulo: recortar(c.titulo, 95), cuerpo: recortar(c.texto, 200),
    pie: recortar(`${c.total_documentos} ${c.total_documentos === 1 ? 'documento' : 'documentos'} · ${quien.slice(0, 2).join(', ')}${quien.length > 2 ? '…' : ''}`, 70),
  } });
}

const salida = new URL('public/og/', raiz);
// La caché de huellas vive fuera de public/ para no publicarse con el sitio.
const huellasArchivo = new URL('.og-huellas.json', raiz);
const previas = existsSync(huellasArchivo) ? JSON.parse(readFileSync(huellasArchivo, 'utf8')) : {};
const huellas = Object.fromEntries(trabajos.filter((x) => previas[x.ruta]).map((x) => [x.ruta, previas[x.ruta]]));
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
