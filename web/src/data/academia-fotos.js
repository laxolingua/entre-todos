// Foto de cada lección. Si existe public/img/academia/<id de la lección>.jpg (imagen propia, generada con IA),
// se usa esa y lleva el pie «Imagen generada con IA». Si no, la foto de categoría del sitio.
import fs from 'node:fs';
import path from 'node:path';

const FOTOS = ['derechos', 'constitucion', 'sociedad_civil', 'transicion'];
const DIR = path.resolve('public/img/academia');

export function fotoLeccion(c, l, n) {
  if (fs.existsSync(path.join(DIR, `${l.id}.jpg`))) return { src: `/img/academia/${l.id}.jpg`, ia: true };
  return { src: `/img/fotos/cat-${l.foto || FOTOS[n] || c.foto}.jpg`, ia: false };
}
