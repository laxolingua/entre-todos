// Buscador E/T: búsqueda por significado + respuesta redactada con Cloudflare Workers AI.
// Acciones (POST JSON):
//   {pregunta}            → {respuesta, fuentes[], modelo}
//   {accion: 'indexar'}   → carga el corpus público y calcula los embeddings que falten.
// Secretos: CF_ACCOUNT_ID, CF_AI_TOKEN (Cloudflare). SUPABASE_DB_URL lo pone Supabase.
// Solo responde con el corpus de ENTRE TODOS. Las preguntas no se guardan; solo un contador diario y
// un límite por hora con el hash de la IP (sin la IP).
import postgres from 'npm:postgres@3.4.5';

const CF_ID = Deno.env.get('CF_ACCOUNT_ID') ?? '';
const CF_TOKEN = Deno.env.get('CF_AI_TOKEN') ?? '';
const sql = postgres(Deno.env.get('SUPABASE_DB_URL')!, { prepare: false, max: 2 });
const CORPUS_URL = 'https://laxolingua.github.io/entre-todos-preview/asistente/corpus.json';
const EMB = '@cf/baai/bge-m3';
const GRANDE = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
const PEQUENO = '@cf/meta/llama-3.1-8b-instruct-fp8-fast';
// Neuronas por millón de tokens (precios publicados por Cloudflare).
const COSTE: Record<string, [number, number]> = { [GRANDE]: [26668, 204805], [PEQUENO]: [4119, 34868], [EMB]: [1075, 0] };
const CUPO = 10000, RESERVA = 1500;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'content-type, apikey, authorization, x-client-info',
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });

async function cf(model: string, body: unknown) {
  const r = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ID}/ai/run/${model}`, {
    method: 'POST', headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  const d = await r.json();
  if (!r.ok || !d.success) throw new Error(`cloudflare ${r.status}: ${JSON.stringify(d.errors ?? d).slice(0, 300)}`);
  return d.result;
}
const tokens = (t: string) => Math.ceil(t.length / 3.5);
const vec = (v: number[]) => `[${v.join(',')}]`;

async function embed(textos: string[]) {
  const r = await cf(EMB, { text: textos });
  await sql`select asistente.sumar(${(textos.reduce((a, t) => a + tokens(t), 0) / 1e6) * COSTE[EMB][0]})`;
  return r.data as number[][];
}

async function indexar() {
  const corpus = await (await fetch(CORPUS_URL, { cache: 'no-store' })).json();
  let cambiadas = 0;
  for (const f of corpus.filas) {
    const r = await sql`
      insert into asistente.conocimiento (id, tipo, titulo, texto, url, meta)
      values (${f.id}, ${f.tipo}, ${f.titulo}, ${f.texto}, ${f.url}, ${sql.json(f.meta)})
      on conflict (id) do update set tipo = excluded.tipo, titulo = excluded.titulo, url = excluded.url, meta = excluded.meta, activo = true,
        embedding = case when asistente.conocimiento.texto = excluded.texto then asistente.conocimiento.embedding else null end,
        texto = excluded.texto, actualizado = now()
      returning (embedding is null) as falta`;
    if (r[0]?.falta) cambiadas++;
  }
  const ids = corpus.filas.map((f: { id: string }) => f.id);
  const retiradas = await sql`update asistente.conocimiento set activo = false where activo and not (id = any(${ids})) returning id`;
  let hechas = 0;
  for (;;) {
    const pend = await sql`select id, titulo, texto from asistente.conocimiento where embedding is null and activo limit 40`;
    if (!pend.length) break;
    const v = await embed(pend.map((p) => `${p.titulo}. ${p.texto}`));
    for (let i = 0; i < pend.length; i++) await sql`update asistente.conocimiento set embedding = ${vec(v[i])}::extensions.vector where id = ${pend[i].id}`;
    hechas += pend.length;
    if (hechas > 1200) break;
  }
  return { filas: corpus.filas.length, cambiadas, embeddings: hechas, retiradas: retiradas.length };
}

const SISTEMA = `Eres el Buscador E/T, el buscador del sitio ENTRE TODOS (E/T), una plataforma cívica, independiente, plural y no partidista sobre el futuro de Cuba que aplica la metodología de la Gobernanza Solucionaria.
ENTRE TODOS tiene varias secciones y herramientas; el banco de propuestas es una de ellas, no todo el sitio. Las fuentes de tipo «pagina» explican qué es ENTRE TODOS, cómo funciona, sus secciones, su método y quién está detrás; úsalas para preguntas sobre el sitio. Si preguntan por las secciones, nómbralas.
Responde en español claro y breve (entre 60 y 160 palabras), sin títulos ni listas largas.
Usa SOLO la información de las FUENTES numeradas. Después de cada dato pon el número de su fuente entre corchetes, por ejemplo [2].
Si las fuentes no responden la pregunta, dilo con sinceridad y sugiere qué sección de ENTRE TODOS consultar. No inventes cifras, nombres ni fechas.
No des tu opinión ni recomiendes una postura política. Si hay posturas distintas en las fuentes, preséntalas todas.
Recuerda que las encuestas describen a quienes respondieron y que las cifras de encuestas distintas no se suman.`;

async function preguntar(pregunta: string, ip: string) {
  const clave = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + '|et-asistente'))))
    .slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
  const [lim] = await sql`select * from asistente.registrar(${clave}, 0)`;
  if (!lim.permitido) return json({ error: 'Has hecho muchas preguntas en poco tiempo. Prueba de nuevo dentro de una hora.' }, 429);

  const [e] = await embed([pregunta]);
  const fuentes = await sql`select id, tipo, titulo, texto, url, meta, similitud from asistente.buscar(${vec(e)}::extensions.vector, 10)`;
  const utiles = fuentes.filter((f) => f.similitud > 0.35);
  const salida = utiles.map((f, i) => ({ n: i + 1, tipo: f.tipo, titulo: f.titulo, url: f.url, meta: f.meta }));
  if (!utiles.length) return json({ respuesta: 'No encontré nada en ENTRE TODOS sobre esa pregunta. Prueba con otras palabras o explora las secciones del sitio.', fuentes: [], modelo: null });

  const hoy = Number((await sql`select asistente.neuronas_hoy() as n`)[0].n);
  const modelo = hoy < CUPO - RESERVA - 300 ? GRANDE : hoy < CUPO - 200 ? PEQUENO : null;
  if (!modelo) return json({ respuesta: null, aviso: 'Hoy se agotó el cupo gratuito de respuestas redactadas. Estas son las fuentes que encontré:', fuentes: salida, modelo: null });

  const contexto = utiles.map((f, i) => `[${i + 1}] (${f.tipo}) ${f.titulo}\n${String(f.texto).slice(0, 1200)}`).join('\n\n');
  const mensajes = [
    { role: 'system', content: SISTEMA },
    { role: 'user', content: `FUENTES:\n${contexto}\n\nPREGUNTA: ${pregunta}` },
  ];
  let r;
  try { r = await cf(modelo, { messages: mensajes, max_tokens: 400, temperature: 0.2 }); }
  catch (_) { return json({ respuesta: null, aviso: 'No pude redactar la respuesta ahora. Estas son las fuentes que encontré:', fuentes: salida, modelo: null }); }
  const texto: string = (r.response ?? '').trim();
  const tin = r.usage?.prompt_tokens ?? tokens(SISTEMA + contexto + pregunta);
  const tout = r.usage?.completion_tokens ?? tokens(texto);
  await sql`select asistente.sumar(${(tin / 1e6) * COSTE[modelo][0] + (tout / 1e6) * COSTE[modelo][1]})`;
  return json({ respuesta: texto, fuentes: salida, modelo: modelo === GRANDE ? 'grande' : 'pequeño' });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Usa POST' }, 405);
  if (!CF_ID || !CF_TOKEN) return json({ error: 'Faltan los secretos de Cloudflare' }, 500);
  try {
    const b = await req.json();
    if (b.accion === 'indexar') return json(await indexar());
    const p = String(b.pregunta ?? '').trim().slice(0, 400);
    if (p.length < 4) return json({ error: 'Escribe una pregunta.' }, 400);
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'sin-ip';
    return await preguntar(p, ip);
  } catch (e) {
    console.error(e);
    return json({ error: 'Algo falló. Prueba de nuevo en un momento.' }, 500);
  }
});
