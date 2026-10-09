// Índice compacto para el buscador: título, texto, incisos, variantes, autorías y categoría.
import { propuestas, catPorClave, autoriasDe } from '../../lib/banco.js';

export function GET() {
  const indice = propuestas.map((c) => ({
    id: c.id,
    t: c.titulo,
    x: c.texto,
    i: [...c.incisos.map((i) => i.texto), ...c.variantes.map((v) => v.texto)].join(' '),
    a: autoriasDe(c).join(' · '),
    k: catPorClave.get(c.categoria)?.nombre ?? '',
    n: c.total_documentos,
  }));
  return new Response(JSON.stringify(indice), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
