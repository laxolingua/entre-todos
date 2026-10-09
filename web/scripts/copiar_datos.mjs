// Copia los datos abiertos generados a public/datos para que se publiquen con el sitio.
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
const origen = new URL('../../datos/generado/', import.meta.url);
const destino = new URL('../public/datos/', import.meta.url);
mkdirSync(destino, { recursive: true });
for (const f of readdirSync(origen)) {
  if (f.endsWith('.csv') || f === 'banco.json') cpSync(new URL(f, origen), new URL(f, destino));
}
console.log('datos copiados a public/datos');
