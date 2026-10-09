// Datos públicos del sitio: solo la capa ciudadana del banco (web/src/data/publico.json).
// El banco en sí (citas, localizaciones, clasificación y verificación) es el back end privado
// y nunca se importa desde el sitio. scripts/construir_banco.py genera este archivo.
import publico from '../data/publico.json';

export const meta = publico.meta;
export const categorias = [...publico.categorias].sort((a, b) => a.orden - b.orden);
export const actores = [...publico.actores].sort((a, b) => b.propuestas - a.propuestas || a.nombre.localeCompare(b.nombre, 'es'));
export const documentos = publico.documentos;
export const propuestas = publico.propuestas;
export const cuestiones = publico.cuestiones;

export const catPorClave = new Map(categorias.map((c) => [c.clave, c]));
export const actorPorId = new Map(actores.map((a) => [a.id, a]));
export const docPorId = new Map(documentos.map((d) => [d.id, d]));
export const propPorId = new Map(propuestas.map((p) => [p.id, p]));
export const cuestionesDe = (id) => cuestiones.filter((q) => q.opciones.includes(id));

/** Todos los documentos de una propuesta: idea central, incisos y variantes, sin repetir. */
export function documentosDe(p) {
  return [...new Set([...p.documentos, ...p.incisos.flatMap((i) => i.documentos), ...p.variantes.flatMap((v) => v.documentos)])];
}

const autorias = (ids) => [...new Set(ids.map((id) => docPorId.get(id)?.autoria).filter(Boolean))];

/** Autorías de la idea central, en orden de aparición. */
export const autoriasCentrales = (p) => autorias(p.documentos);
/** Autorías de todo lo que contiene la propuesta (idea central, incisos y variantes). */
export const autoriasDe = (p) => autorias(documentosDe(p));

/** Etiqueta corta de un documento: autoría y año. */
export function etiquetaDoc(id) {
  const d = docPorId.get(id);
  if (!d) return '';
  return `${d.autoria}${d.anio ? ` (${d.anio})` : ''}`;
}

/** Agrupa documentos por etiqueta para no repetir la misma autoría y año. */
export function agruparDocs(ids) {
  const grupos = new Map();
  for (const id of ids) {
    const e = etiquetaDoc(id);
    if (!grupos.has(e)) grupos.set(e, []);
    grupos.get(e).push(id);
  }
  return [...grupos.entries()].map(([etiqueta, lista]) => ({ etiqueta, ids: lista }));
}

export const propuestasDeCategoria = (clave) => propuestas.filter((p) => p.categoria === clave);
export const propuestasDeDocumento = (id) => propuestas.filter((p) => documentosDe(p).includes(id) || p.analizan.includes(id));
export function propuestasDeActor(actor) {
  const ids = new Set(documentos.filter((d) => d.actor === actor).map((d) => d.id));
  return propuestas.filter((p) => documentosDe(p).some((id) => ids.has(id)));
}
export const documentosDeActor = (actor) => documentos.filter((d) => d.actor === actor);

export const METODOS_VERIFICACION = {
  dominio_oficial: 'comprobada en el sitio oficial del autor',
  documento_revisado: 'comprobada leyendo el propio documento',
  instinct: 'comprobada por el equipo de revisión de ENTRE TODOS',
};

export const TIPOS_FUENTE = {
  ACAD: 'Centro de estudios',
  COAL: 'Coalición',
  ORG: 'Organización',
  PERS: 'Autor individual',
};

// Icono (Flaticon UIcons Bold Rounded) y tono por categoría.
const ICONOS = {
  transicion: 'rotate-right', constitucion: 'document', modelo_pais: 'flag', sistema_electoral: 'vote-yea',
  reconstruccion: 'hammer', educacion: 'graduation-cap', economia: 'chart-line-up', trabajo: 'briefcase',
  salud: 'stethoscope', medio_ambiente: 'leaf', sociedad_civil: 'users', derechos: 'shield-check',
  familia: 'family', tercera_edad: 'person-walking-with-cane', vivienda: 'house-chimney', genero: 'users-alt',
  animales: 'paw', alimentacion: 'wheat', justicia: 'gavel', participacion: 'comments',
  instituciones: 'landmark-alt', internacional: 'globe', descentralizacion: 'map-marker', diaspora: 'plane-departure',
  reconciliacion: 'handshake', derechos_digitales: 'laptop-code', reforma_politica: 'balance-scale-left',
};
const TONOS = [
  ['#0a66c2', 'rgba(10,102,194,.10)'], ['#1d7a46', 'rgba(29,122,70,.10)'], ['#b4471c', 'rgba(180,71,28,.10)'],
  ['#6b3fb3', 'rgba(107,63,179,.10)'], ['#0f7c86', 'rgba(15,124,134,.10)'], ['#a3346b', 'rgba(163,52,107,.10)'],
  ['#7a6100', 'rgba(122,97,0,.12)'], ['#3d5a80', 'rgba(61,90,128,.10)'],
];

export function iconoCategoria(clave) {
  return `fi fi-br-${ICONOS[clave] || 'document'}`;
}

export function tonoCategoria(clave) {
  const i = Math.max(0, categorias.findIndex((c) => c.clave === clave));
  const [tono, suave] = TONOS[i % TONOS.length];
  return `--tono:${tono};--tono-suave:${suave}`;
}

/** Recorta un texto largo para descripciones y tarjetas sin cortar palabras. */
export function recortar(texto, max = 160) {
  if (!texto || texto.length <= max) return texto;
  const corte = texto.slice(0, max);
  return corte.slice(0, corte.lastIndexOf(' ')) + '…';
}
