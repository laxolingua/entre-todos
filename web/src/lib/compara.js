// Datos de «Compara tus posturas»: las cuestiones del banco (más las de GS y la Alternativa No Partidista)
// y qué opción propone cada organización según sus documentos.
// Una organización «propone» una opción si alguno de sus documentos es fuente de esa propuesta.
// Nada de esto es una respuesta de la organización: es lo que consta en sus documentos, sin confirmar.
import publico from '../data/publico.json';
import gs from '../../../scripts/rediseno/gs.json';

const P = new Map(publico.propuestas.map((p) => [p.id, { id: p.id, titulo: p.titulo, texto: p.texto }]));
for (const n of gs.nuevas) if (!P.has(n.id)) P.set(n.id, { id: n.id, titulo: n.t, texto: n.x });

const docActor = new Map(publico.documentos.filter((d) => d.actor).map((d) => [d.id, d.actor]));
const apoyos = new Map(); // propuesta -> Set(actor)
const add = (p, a) => { if (!apoyos.has(p)) apoyos.set(p, new Set()); apoyos.get(p).add(a); };
for (const p of publico.propuestas) for (const d of p.documentos) if (docActor.has(d)) add(p.id, docActor.get(d));
const GS = 'gobernanza-solucionaria', NP = 'alternativa-no-partidista';
for (const n of gs.nuevas) add(n.id, n.doc === 'np' ? NP : GS);
for (const f of gs.fuente_en) add(f.id, GS);

const actoresBase = publico.actores.map((a) => ({ id: a.id, nombre: a.nombre, web: a.web || '' }));
actoresBase.push({ id: GS, nombre: gs.documentos.gs.autoria, web: '' }, { id: NP, nombre: gs.documentos.np.autoria, web: '' });

let cuestiones = publico.cuestiones.map((q) => ({ id: q.id, pregunta: q.pregunta, texto: q.texto, excluyentes: q.excluyentes, opciones: [...q.opciones] }));
for (const [id, cambio] of Object.entries(gs.cuestiones)) {
  if (id === 'nuevas') continue;
  const q = cuestiones.find((x) => x.id === id);
  if (q) { if (cambio.titulo) q.pregunta = cambio.titulo; for (const o of cambio.agregar || []) if (!q.opciones.includes(o)) q.opciones.push(o); }
}
for (const n of gs.cuestiones.nuevas || []) cuestiones.push({ id: n.id, pregunta: n.titulo, texto: n.texto, excluyentes: /excluyentes/i.test(n.tipo || ''), opciones: n.ids });

cuestiones = cuestiones.map((q) => ({
  ...q,
  opciones: q.opciones.filter((o) => P.has(o)).map((o) => ({ ...P.get(o), actores: [...(apoyos.get(o) || [])] })),
}));

// Solo organizaciones con postura conocida en al menos una cuestión.
const conPostura = new Set(cuestiones.flatMap((q) => q.opciones.flatMap((o) => o.actores)));
export const actores = actoresBase.filter((a) => conPostura.has(a.id)).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
export { cuestiones };
