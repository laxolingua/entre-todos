// Comprobación automática antes de publicar: abre el sitio ya construido en un navegador
// y verifica que las funciones clave siguen funcionando. Si algo falla, publicar.sh se detiene.
// Uso: node comprobar.mjs <pubdir>
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const RAIZ = path.resolve(process.argv[2] || '/tmp/pub');
const TIPOS = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff' };
const servidor = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(RAIZ, p);
  if (!f.startsWith(RAIZ)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'content-type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((ok) => servidor.listen(4399, ok));
const BASE = 'http://localhost:4399';

// Cada comprobación: página, qué debe aparecer y explicación en llano si falla.
const PRUEBAS = [
  ['/propuesta/fuerzas-seguridad-civiles/', () => (document.getElementById('valoracion')?.innerText || '').includes('Muy en contra'), 'La votación no aparece en las fichas de propuestas (Cuba).'],
  ['/propuesta/fuerzas-seguridad-civiles/', () => !!document.getElementById('aportes'), 'Faltan los aportes en las fichas.'],
  ['/propuesta/fuerzas-seguridad-civiles/', () => /og\/propuesta\/[a-z0-9-]+\.jpg/.test(document.querySelector('meta[property="og:image"]')?.content || ''), 'Las fichas no tienen su tarjeta para compartir.'],
  ['/consulta/continuidad-o-cambio/', () => !!document.getElementById('form-voto') && !!document.getElementById('btn-votar'), 'La consulta «Continuidad o cambio» no muestra el formulario de voto.'],
  ['/academia/', () => !!document.querySelector('[data-cert-zona]'), 'La Academia no muestra el certificado.'],
  ['/espana/', () => !!document.querySelector('h1'), 'La portada de España no carga.'],
  ['/espana/propuestas/', () => !!document.getElementById('banco-es'), 'El banco de propuestas de España no carga.'],
  ['/verificar/', () => !!document.querySelector('form, input'), 'La página para verificar certificados no carga.'],
  ['/panel/', () => !!document.getElementById('acceso'), 'El panel interno no carga.'],
  ['/seguridad/', () => (document.querySelector('h1')?.innerText || '').toLowerCase().includes('privacidad'), '«Tu privacidad» no carga.'],
];

const nav = await chromium.launch();
const pag = await nav.newPage();
const fallos = [];
for (const [ruta, prueba, mensaje] of PRUEBAS) {
  const errores = [];
  const oir = (e) => errores.push(String(e.message || e));
  pag.on('pageerror', oir);
  try {
    await pag.goto(BASE + ruta, { waitUntil: 'load', timeout: 30000 });
    await pag.waitForFunction(prueba, null, { timeout: 8000 });
  } catch {
    fallos.push(`${ruta}: ${mensaje}${errores.length ? ' Error: ' + errores[0].slice(0, 160) : ''}`);
  }
  pag.off('pageerror', oir);
}

// Enlaces internos rotos (se ignoran plantillas de JavaScript).
const rotos = new Set();
const recorrer = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? recorrer(path.join(d, e.name)) : e.name.endsWith('.html') ? [path.join(d, e.name)] : []);
for (const f of recorrer(RAIZ)) {
  const t = fs.readFileSync(f, 'utf8');
  for (const m of t.matchAll(/href="(\/[^"#?]*)/g)) {
    const h = m[1];
    if (h.startsWith('//') || h.includes('${')) continue;
    const p = path.join(RAIZ, h);
    if (!(fs.existsSync(p) || fs.existsSync(path.join(p, 'index.html')) || fs.existsSync(p + '.html'))) rotos.add(`${h} (en ${path.relative(RAIZ, f)})`);
  }
}
const pv = path.join(RAIZ, 'propuesta/fuerzas-seguridad-civiles/mi-voto/4/index.html');
if (!fs.existsSync(pv) || !fs.readFileSync(pv, 'utf8').includes('content="Yo voté')) fallos.push('Falta la página para compartir el voto propio.');
if (rotos.size) fallos.push(`Enlaces rotos: ${[...rotos].slice(0, 10).join(', ')}`);

await nav.close();
servidor.close();
if (fallos.length) {
  console.log('COMPROBACIÓN FALLIDA. No se publica:\n- ' + fallos.join('\n- '));
  process.exit(1);
}
console.log(`Comprobación correcta: ${PRUEBAS.length} funciones clave y enlaces internos.`);
