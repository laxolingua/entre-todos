// Autorías distintas detrás de cada propuesta del banco (organización o, si no hay, autor del documento).
import publico from '../data/publico.json';
const docs = Object.fromEntries(publico.documentos.map((d) => [d.id, d]));
const act = Object.fromEntries(publico.actores.map((a) => [a.id, a.nombre]));
export const propPorId = Object.fromEntries(publico.propuestas.map((p) => [p.id, p]));
export const limpiar = (n) => n.replace(/\s*\((entrevista|ideas|publicado|artículo|recoge|petición)[^)]*\)/g, '').replace(/^Archivo Cuba$/, 'Petición «CUBA LIBRE»');
export function autorias(p) {
  const m = new Map();
  for (const id of p.documentos || []) {
    const d = docs[id];
    if (!d) continue;
    const nombre = limpiar(act[d.actor] || d.autoria);
    const anio = d.anio || null;
    if (!m.has(nombre) || (anio && (!m.get(nombre) || anio < m.get(nombre)))) m.set(nombre, anio);
  }
  return [...m.entries()].map(([nombre, anio]) => ({ nombre, anio })).sort((a, b) => (a.anio || 9999) - (b.anio || 9999));
}
export const totales = publico.meta.totales;
export const propuestas = publico.propuestas;
export const cuestiones = publico.cuestiones;
