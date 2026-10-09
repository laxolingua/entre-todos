// Índice compacto del archivo para el buscador: id, titular, autoría, cita, resumen, año, tipo de cita.
import { propuestas, autoriaPropuesta } from '../../lib/banco.js';

export function GET() {
  const indice = propuestas.map((p) => ({
    id: p.id,
    t: p.titular,
    a: autoriaPropuesta(p),
    c: p.cita,
    r: p.resumen,
    y: p.anio,
    s: p.forma_cita === 'parafraseada' ? 2 : p.estado_cita === 'Verbatim-secundario' ? 1 : 0,
  }));
  return new Response(JSON.stringify(indice), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
