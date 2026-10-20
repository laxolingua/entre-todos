// Genera las piezas de una noticia de ENTRE TODOS a partir de su ficha JSON.
// Uso: NODE_PATH=/opt/npm-tools/node_modules node noticia.js 001-onu-cuba-libre
// Salida: salida/<id>/portada-ancha.png (1200x630), portada-cuadrada.png (1080x1080), pagina.png
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const id = process.argv[2];
const D = JSON.parse(fs.readFileSync(path.join(__dirname, id + '.json'), 'utf8'));
const idx = JSON.parse(fs.readFileSync('/tmp/pub/datos/indice-propuestas.json', 'utf8'));
const P = {}; for (const e of idx) P[e.id] = { t: e.t, k: e.k };
(async () => {
  const out = path.join(__dirname, 'salida', id); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1300, height: 1000 } });
  await p.goto('file://' + path.join(__dirname, 'plantilla.html'));
  await p.evaluate(([D, F, P]) => window.pintar(D, F, P), [D, 'file://' + path.join(__dirname, 'fotos') + '/', P]);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  for (const [sel, n] of [['#ancha', 'portada-ancha'], ['#cuadrada', 'portada-cuadrada'], ['#pagina', 'pagina']])
    await (await p.$(sel)).screenshot({ path: path.join(out, n + '.png') });
  await b.close(); console.log('ok', out);
})();
