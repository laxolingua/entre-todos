// Acceso a los datos del banco generados por scripts/construir_banco.py.
// Cuando el banco viva en Supabase, este módulo será el único punto a cambiar.
import banco from '../../../datos/generado/banco.json';

export const meta = banco.meta;
export const categorias = [...banco.categorias].sort((a, b) => a.orden - b.orden);
export const actores = [...banco.actores].sort((a, b) => b.propuestas - a.propuestas || a.nombre.localeCompare(b.nombre, 'es'));
export const fuentes = [...banco.fuentes].sort((a, b) => a.ref - b.ref);
export const temas = [...banco.temas].sort((a, b) => b.propuestas.length - a.propuestas.length || a.nombre.localeCompare(b.nombre, 'es'));
// Archivo documental: solo las entradas publicadas. Las que están en revisión no tienen página.
export const propuestas = banco.propuestas.filter((p) => p.estado === 'publicada');
export const enRevision = banco.propuestas.filter((p) => p.estado !== 'publicada');
export const noPropuestas = banco.no_propuestas;
// Banco ciudadano: una propuesta por idea, con sus incisos, variantes y fuentes.
export const consolidadas = banco.consolidadas;
export const cuestiones = banco.cuestiones;
export const soloArchivo = banco.solo_archivo;

export const catPorClave = new Map(categorias.map((c) => [c.clave, c]));
export const actorPorId = new Map(actores.map((a) => [a.id, a]));
export const fuentePorRef = new Map(fuentes.map((f) => [f.ref, f]));
export const temaPorSlug = new Map(temas.map((t) => [t.slug, t]));
export const propPorId = new Map(propuestas.map((p) => [p.id, p]));
export const consPorId = new Map(consolidadas.map((c) => [c.id, c]));
export const cuestionesDe = (id) => cuestiones.filter((q) => q.opciones.includes(id));

/** Nombre de quien firma una fuente: actor atribuido, autor individual o null. */
export function autoriaFuente(f) {
  if (!f) return null;
  if (f.actor) return actorPorId.get(f.actor)?.nombre ?? null;
  return f.autor_texto || null;
}

/** Texto de autoría de una propuesta, para tarjetas y fichas. */
export function autoriaPropuesta(p) {
  const f = fuentePorRef.get(p.fuente);
  return autoriaFuente(f) || 'Autoría por confirmar';
}

/** Autorías distintas (actor o autor) que sostienen una propuesta consolidada, sin contar diagnósticos. */
export function autoriasConsolidada(c) {
  const ids = new Set([...c.respaldo, ...c.incisos.flatMap((i) => i.fuentes), ...c.variantes.flatMap((v) => v.fuentes)]);
  const nombres = [...ids].map((id) => propPorId.get(id)).filter(Boolean).map(autoriaPropuesta);
  return [...new Set(nombres)];
}

/** Autorías de la idea central (respaldo), en orden de aparición. */
export function autoriasRespaldo(c) {
  return [...new Set(c.respaldo.map((id) => propPorId.get(id)).filter(Boolean).map(autoriaPropuesta))];
}

/** Etiqueta corta de una entrada para citarla junto a un inciso: autoría y año. */
export function etiquetaEntrada(id) {
  const p = propPorId.get(id);
  if (!p) return id;
  return `${autoriaPropuesta(p)}${p.anio ? ` (${p.anio})` : ''}`;
}

/**
 * Agrupa entradas por etiqueta para no repetir la misma autoría y año.
 * Devuelve [{ etiqueta, ids }] en orden de aparición.
 */
export function agruparEntradas(ids) {
  const grupos = new Map();
  for (const id of ids) {
    const e = etiquetaEntrada(id);
    if (!grupos.has(e)) grupos.set(e, []);
    grupos.get(e).push(id);
  }
  return [...grupos.entries()].map(([etiqueta, lista]) => ({ etiqueta, ids: lista }));
}

export function consolidadasDeCategoria(clave) {
  return consolidadas.filter((c) => c.categoria === clave);
}

/** Propuestas consolidadas que sostiene un actor, con el papel de sus entradas. */
export function consolidadasDeActor(id) {
  const refs = new Set(fuentes.filter((f) => f.actor === id).map((f) => f.ref));
  return consolidadas.filter((c) => c.entradas.some((e) => refs.has(propPorId.get(e)?.fuente)));
}

export const FORMAS_CITA = {
  literal: null,
  secundaria: 'Cita de una fuente secundaria que recoge estas ideas.',
  citada: 'Palabras del autor citadas entre comillas por la prensa.',
  parafraseada: 'Paráfrasis del periodista, no cita literal del autor.',
};

export const METODOS_VERIFICACION = banco.meta.metodos_verificacion;

export function propuestasDeCategoria(clave) {
  return propuestas.filter((p) => p.categorias.includes(clave));
}

export function propuestasDeFuente(ref) {
  return propuestas.filter((p) => p.fuente === ref);
}

export function propuestasDeActor(id) {
  const refs = new Set(fuentes.filter((f) => f.actor === id).map((f) => f.ref));
  return propuestas.filter((p) => refs.has(p.fuente));
}

/**
 * Agrupa propuestas por tema: primero los temas con varias fuentes (fusiones),
 * luego el resto por tema fino. Así se ve "tema arriba, propuestas debajo".
 */
export function agruparPorTema(lista) {
  const grupos = new Map();
  for (const p of lista) {
    const clave = p.tema ? `t:${p.tema}` : `f:${p.tema_fino}`;
    if (!grupos.has(clave)) {
      grupos.set(clave, {
        clave,
        nombre: p.tema ? temaPorSlug.get(p.tema).nombre : p.titular,
        slug: p.tema,
        propuestas: [],
      });
    }
    grupos.get(clave).propuestas.push(p);
  }
  return [...grupos.values()].sort(
    (a, b) => Number(!!b.slug) - Number(!!a.slug) || b.propuestas.length - a.propuestas.length || a.nombre.localeCompare(b.nombre, 'es'),
  );
}

export const TIPOS_FUENTE = {
  ACAD: 'Centro de estudios',
  COAL: 'Coalición',
  ORG: 'Organización',
  PERS: 'Autor individual',
};

export const TIPOS_ENTRADA = {
  propuesta: 'Propuesta',
  critica: 'Crítica',
  reforma_propuesta: 'Reforma propuesta',
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
