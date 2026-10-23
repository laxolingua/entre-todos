// Genera el corpus del asistente «Pregúntale al banco» y lo escribe como SQL (upsert sin embeddings).
// Uso: python3 scripts/asistente/paginas.py /tmp/pub /tmp/paginas.json && node --loader <json> scripts/asistente/corpus.mjs <carpeta salida> /tmp/paginas.json
// Los embeddings los calcula después la función preguntar con {accion:'indexar'}.
import fs from 'node:fs';
const D = (f) => JSON.parse(fs.readFileSync(new URL(`../../web/src/data/${f}`, import.meta.url)));
const publico = D('publico.json');
const extra = D('propuestas-extra.json');
const encuestas = D('encuestas.json');
const banco = D('banco-encuestas.json');
const actualidad = D('actualidad.json');
const { ARTICULOS } = await import('../../web/src/data/analisis.js');
const { CONDICIONES } = await import('../../web/src/data/helms-burton.js');
const { DERECHOS } = await import('../../web/src/data/derechos.js');

const docs = Object.fromEntries(publico.documentos.map((d) => [d.id, d]));
const act = Object.fromEntries(publico.actores.map((a) => [a.id, a.nombre]));
const cat = Object.fromEntries(publico.categorias.map((c) => [c.clave, c.nombre]));
const titulo = Object.fromEntries([...publico.propuestas, ...Object.values(extra)].map((p) => [p.id, p.titulo]));
const autorias = (p) => [...new Set((p.documentos || []).map((i) => docs[i]).filter(Boolean).map((d) => act[d.actor] || d.autoria))];
const filas = [];
const add = (id, tipo, t, texto, url, meta = {}) => filas.push({ id, tipo, titulo: t, texto: texto.replace(/\s+/g, ' ').trim().slice(0, 2400), url, meta });

for (const p of publico.propuestas) {
  const a = autorias(p);
  add(`propuesta:${p.id}`, 'propuesta', p.titulo,
    `Propuesta del banco de ENTRE TODOS. Categoría: ${cat[p.categoria] || p.categoria}. ${p.titulo}. ${p.texto || ''} ${p.nota || ''} ${(p.incisos || []).map((i) => i.texto || i).join(' ')} Defendida por ${a.length} autorías: ${a.join(', ')}.${DERECHOS.has(p.id) ? ' Es un derecho esencial: no se somete a votación.' : ''}`,
    `/propuesta/${p.id}/`, { categoria: p.categoria, autorias: a.length });
}
for (const p of Object.values(extra)) {
  add(`propuesta:${p.id}`, 'propuesta', p.titulo, `Propuesta del banco de ENTRE TODOS. ${p.titulo}. ${p.texto || ''}`, `/propuesta/${p.id}/`, {});
}
for (const c of publico.cuestiones) {
  add(`cuestion:${c.id}`, 'cuestion', c.pregunta,
    `Desacuerdo entre las propuestas del banco. ${c.pregunta} ${c.texto} Opciones ${c.excluyentes ? 'incompatibles entre sí' : 'que se pueden combinar'}: ${c.opciones.map((o) => titulo[o] || o).join('; ')}.`,
    `/cuestiones/#${c.id}`, {});
}
for (const e of banco.encuestas) {
  add(`encuesta:${e.id}`, 'encuesta', e.titulo,
    `Encuesta o sondeo: ${e.titulo}. Autor: ${e.autor}. Fecha: ${e.fecha}. Participantes: ${e.n}. Método: ${e.metodo === 'aleatoria' ? 'muestra aleatoria' : e.metodo === 'panel' ? 'panel en línea, no aleatorio' : e.metodo === 'abierta' ? 'encuesta abierta en línea, no representativa' : 'votos o comentarios en redes sociales, cifras del autor'}. Resultado: ${e.dato} ${e.datoTexto}. ${e.resultado || ''}`,
    e.url && !e.url.startsWith('/') ? e.url : (e.url || '/consulta/encuestas/'), { metodo: e.metodo, autor: e.autor, fecha: e.fecha });
}
for (const [i, q] of encuestas.preguntas.entries()) {
  const s = encuestas.encuestas[q.encuesta];
  add(`pregunta:${q.encuesta}:${i}`, 'encuesta', `${s.nombre}: ${q.pregunta}`.slice(0, 200),
    `Pregunta de la encuesta ${s.nombre} (${s.autor}, ${s.fecha}; ${s.muestra}; ${s.metodo}). Pregunta: ${q.pregunta} Resultado: ${q.resultado} ${q.nota || ''}`,
    s.fuente, { metodo: s.tipo, autor: s.autor, fecha: s.fecha });
}
for (const a of ARTICULOS) {
  add(`analisis:${a.id}`, 'analisis', a.titulo, `Análisis de ENTRE TODOS. ${a.titulo}. ${a.entradilla}`, `/analisis/${a.id}/`, {});
}
for (const c of CONDICIONES) {
  add(`helms:${c.id}`, 'analisis', `Helms-Burton: ${c.titulo}`,
    `Condición de la ley Helms-Burton (sección ${c.seccion}) para un gobierno de transición en Cuba: ${c.ley} Qué dice hoy Cuba: ${c.cuba} ${c.bancoNota || ''} ${(c.encuestas || []).map((x) => `${x.q}: ${x.r}.`).join(' ')} No medido: ${c.sinMedir.join(' ')}`,
    `/cuba-eeuu/#hb-${c.id}`, {});
}
for (const p of actualidad.piezas) {
  add(`actualidad:${p.id}`, 'actualidad', p.titular,
    `Noticia de Actualidad (${p.fecha}). ${p.titular}. ${p.resumen} ${p.esencial.map((e) => e.t).join(' ')} Por qué importa: ${p.importa}`,
    `/actualidad/${p.id}/`, { fecha: p.fecha });
}
if (process.argv[3] && fs.existsSync(process.argv[3])) filas.push(...JSON.parse(fs.readFileSync(process.argv[3])));
fs.mkdirSync(process.argv[2], { recursive: true });
fs.writeFileSync(`${process.argv[2]}/corpus.json`, JSON.stringify({ generado: new Date().toISOString(), filas }));
const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const lotes = [];
for (let i = 0; i < filas.length; i += 40) lotes.push(filas.slice(i, i + 40));
const sql = lotes.map((l) => `insert into asistente.conocimiento (id, tipo, titulo, texto, url, meta) values\n${l.map((f) => `(${q(f.id)}, ${q(f.tipo)}, ${q(f.titulo)}, ${q(f.texto)}, ${q(f.url)}, ${q(JSON.stringify(f.meta))}::jsonb)`).join(',\n')}\non conflict (id) do update set tipo = excluded.tipo, titulo = excluded.titulo, texto = excluded.texto, url = excluded.url, meta = excluded.meta, embedding = case when asistente.conocimiento.texto = excluded.texto then asistente.conocimiento.embedding else null end, actualizado = now();`);
fs.mkdirSync(process.argv[2], { recursive: true });
sql.forEach((s, i) => fs.writeFileSync(`${process.argv[2]}/lote-${String(i).padStart(2, '0')}.sql`, s));
console.error(`${filas.length} filas en ${sql.length} lotes`);
