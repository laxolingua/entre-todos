// Actualidad: datos y utilidades compartidas por la portada y las fichas.
import datos from '../data/actualidad.json';
import medios from '../data/medios.json';
import publico from '../data/publico.json';

export const TIPOS = {
  independiente: { nombre: 'Independiente en Cuba', color: 'var(--act-indep)' },
  exilio: { nombre: 'Medio del exilio', color: 'var(--act-exilio)' },
  oficial: { nombre: 'Prensa oficial', color: 'var(--act-oficial)' },
  internacional: { nombre: 'Internacional', color: 'var(--act-intl)' },
};
export const ORDEN_TIPOS = ['independiente', 'exilio', 'oficial', 'internacional'];

export const propPorId = Object.fromEntries(publico.propuestas.map((p) => [p.id, p]));
export const catPorClave = Object.fromEntries(publico.categorias.map((c) => [c.clave, c]));

export const tipoDe = (medio) => medios.medios[medio] || 'internacional';

export const iniciales = (medio) => {
  const p = medio.replace(/^(El|La|Los|Las)\s+/, '').split(/\s+/).filter((w) => !/^(de|del|la|el|y|en)$/i.test(w));
  return (p.length > 1 ? p.slice(0, 3).map((w) => w[0]).join('') : p[0].slice(0, 2)).toUpperCase();
};

// Reparto de la cobertura por tipo de medio, en el orden fijo de la leyenda.
export const reparto = (cobertura) => {
  const n = {};
  for (const c of cobertura) n[tipoDe(c.medio)] = (n[tipoDe(c.medio)] || 0) + 1;
  return ORDEN_TIPOS.filter((t) => n[t]).map((t) => ({ tipo: t, n: n[t], ...TIPOS[t] }));
};

export const minutos = (p) => {
  const palabras = [p.resumen, p.importa, ...p.esencial.map((e) => e.t)].join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
};

const aFecha = (f) => { const [d, m, a] = f.split('/').map(Number); return new Date(a, m - 1, d); };
export const fechaLarga = (f) => aFecha(f).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

export const foto = (cat) => `/img/fotos/cat-${catPorClave[cat] ? cat : 'economia'}.jpg`;

export const piezas = [...datos.piezas].sort((a, b) => aFecha(b.fecha) - aFecha(a.fecha));
// Noticias anteriores al formato de ficha: solo titular, medio y enlace.
export const archivo = [...datos.noticias].map((x) => ({
  ...x,
  categoria: propPorId[x.propuestas?.[0]]?.categoria || 'economia',
})).sort((a, b) => aFecha(b.fecha) - aFecha(a.fecha));
export const actualizado = datos.actualizado;
