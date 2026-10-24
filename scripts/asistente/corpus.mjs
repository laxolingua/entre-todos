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
// Mapa del sitio: qué es ENTRE TODOS y qué tiene cada sección (para preguntas generales).
const SECCIONES = [
  ['Propuestas (banco de propuestas)', '/propuestas/', 'Reúne las propuestas publicadas por organizaciones, coaliciones, especialistas y ciudadanos sobre el futuro de Cuba. Cada idea aparece una vez, con todas sus fuentes y autores. Es una de las herramientas de ENTRE TODOS, no todo el sitio.'],
  ['Cuestiones con alternativas', '/cuestiones/', 'Los desacuerdos de fondo entre las propuestas, con las opciones y quién defiende cada una.'],
  ['Actores', '/actores/', '129 organizaciones de la sociedad civil cubana, dentro y fuera de la isla, con información pública y su fuente.'],
  ['¿Cuál es el plan?', '/cual-es-el-plan/', 'Espacio de colaboración con otra organización. Próximamente.'],
  ['Temas', '/temas/', 'Las propuestas del banco agrupadas por tema: qué se propone, quién lo propone y en qué documento.'],
  ['E/T España', '/espana/', 'Elecciones generales del 29 de noviembre de 2026 en España: propuestas de los partidos por tema con enlace a su programa oficial, comparador de posturas, encuestas por separado y fechas clave para votar. Sin recomendación de voto.'],
  ['Compara tus posturas', '/compara/', 'Cuestiones en las que las organizaciones proponen caminos opuestos, para ver con cuáles coincides.'],
  ['Plataforma plural de gobierno', '/plataforma/', 'Herramienta para elegir, tema por tema, las propuestas que incluirías en un programa, vengan de quien vengan. Se guarda solo en tu dispositivo. La plataforma común que se formaría con las valoraciones de todos aún no está activa.'],
  ['Candidatura solucionaria', '/candidatura-solucionaria/', 'Un tipo de candidato sin programa cerrado que gobierna con la plataforma plural construida por la ciudadanía.'],
  ['Generador de soluciones', '/generador-de-soluciones/', 'De un problema a una propuesta, paso a paso: investigar sus causas, generar ideas, evaluarlas con el criterio del mayor bien y el menor daño, y escribir la propuesta.'],
  ['Consultas', '/consulta/', 'Consultas ciudadanas no vinculantes. Hoy está abierta «Continuidad o cambio». También está la solicitud internacional de una consulta libre en Cuba. El termómetro de gestión, las consultas sobre propuestas y las de actualidad están en preparación y aún no funcionan.'],
  ['Banco de encuestas', '/consulta/encuestas/', 'Todas las encuestas y sondeos sobre Cuba hechos fuera del Estado, con su método y enlazados a las propuestas.'],
  ['Blog A+ (Academia)', '/academia/', 'Blog académico con 48 lecciones en 12 bloques y dos módulos (La nueva Cuba y Pensar y debatir): derechos, democracia, ética y pensamiento crítico, creativo, sistémico y solucionario. Cada lección da una insignia; cada bloque, un certificado; y cada módulo, el Certificado Academia A+, verificable en /verificar/. Sin cuenta ni datos personales.'],
  ['Abrazos', '/abrazos/', 'Campaña de ENTRE TODOS: fotos de abrazos, reales o hechas con IA, para cubanos que sufren por defender una Cuba democrática y plural.'],
  ['Diversidad política', '/diversidad-politica/', 'Partidos, corrientes, organizaciones y candidaturas de la Cuba plural que el sistema de partido único no reconoce. Registro documental, sin respaldo a ninguna opción.'],
  ['Proceso constituyente', '/constituyente/', 'Las nueve constituciones de Cuba comparadas por bloques, con el texto íntegro de las nueve, y las propuestas constitucionales del banco.'],
  ['Cuba y Estados Unidos', '/cuba-eeuu/', 'Lo que pide Washington, lo que responde La Habana y lo que ya proponen los cubanos, con las condiciones de la ley Helms-Burton una a una.'],
  ['Actualidad', '/actualidad/', 'Hechos de la semana sobre Cuba, resumidos con sus fuentes, quién los cuenta y su relación con las propuestas.'],
  ['Análisis', '/analisis/', 'Artículos de ENTRE TODOS hechos con el banco, las consultas y las encuestas.'],
  ['Reconstrucción', '/reconstruccion/', 'Registro de planes, marcos legales y compromisos públicos para reconstruir Cuba: qué se propone, con qué respaldo y con qué grado de evidencia.'],
  ['Verificar un certificado', '/verificar/', 'Página para comprobar con su código si un certificado de la Academia A+ es válido.'],
  ['Datos abiertos', '/datos/', 'Descarga de las propuestas reunidas por ENTRE TODOS en CSV o JSON.'],
  ['Buscador E/T', '/buscador/', 'Buscador inteligente que responde preguntas sobre todo el contenido del sitio, con fuentes.'],
  ['Sobre nosotros', '/sobre/', 'Qué es ENTRE TODOS, su independencia y sus herramientas.'],
  ['Método', '/metodo/', 'La metodología de la Gobernanza Solucionaria y cómo se reúnen y valoran las propuestas.'],
  ['Tu privacidad', '/seguridad/', 'Cómo protege ENTRE TODOS tus datos personales y qué puedes hacer si prefieres mantener tu participación en privado.'],
  ['Privacidad', '/privacidad/', 'Qué datos se guardan y cómo se protegen.'],
];
add('sitio:mapa', 'pagina', 'Mapa del sitio ENTRE TODOS: secciones y herramientas',
  `ENTRE TODOS (E/T) es una plataforma cívica, independiente, plural y no partidista sobre el futuro de Cuba que aplica la metodología de la Gobernanza Solucionaria. Sus secciones y herramientas son: ${SECCIONES.map(([t, , d]) => `${t}: ${d}`).join(' ')}`,
  '/sobre/', {});
for (const [t, u, d] of SECCIONES) add(`sitio:${u}`, 'pagina', `Sección: ${t}`, `Sección del sitio ENTRE TODOS: ${t}. ${d}`, u, {});
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
