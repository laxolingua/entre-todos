// Índice compacto del banco de propuestas para el buscador: título, texto, incisos, variantes y autorías.
import { consolidadas, catPorClave, autoriasConsolidada } from '../../lib/banco.js';

export function GET() {
  const indice = consolidadas.map((c) => ({
    id: c.id,
    t: c.titulo,
    x: c.texto,
    i: [...c.incisos.map((i) => i.texto), ...c.variantes.map((v) => v.texto)].join(' '),
    a: autoriasConsolidada(c).join(' · '),
    k: catPorClave.get(c.categoria)?.nombre ?? '',
    n: c.fuentes.length,
  }));
  return new Response(JSON.stringify(indice), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
