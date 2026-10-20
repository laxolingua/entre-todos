// Tarjeta de imagen para cada encuesta de una noticia. Se publica en un post aparte, justo después de su encuesta.
// Uso: NODE_PATH=/opt/npm-tools/node_modules node tarjeta.js 001-onu-cuba-libre
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const id = process.argv[2]; const N = path.join(__dirname, '..', 'noticias');
const D = JSON.parse(fs.readFileSync(path.join(N, id + '.json'), 'utf8'));
const F = 'file://' + path.join(N, 'fotos', D.foto.archivo + '.jpg');
(async () => {
  const out = path.join(__dirname, 'salida', id); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 1200 } });
  await p.goto('file://' + path.join(__dirname, 'tarjeta.html'));
  await p.evaluate(([D, F, P]) => window.pintar(D, F, P), [D, F, D.foto.posicion || 'center top']);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  for (let i = 1; i <= D.encuestas.length; i++) await (await p.$('#t' + i)).screenshot({ path: path.join(out, 'tarjeta-encuesta-' + i + '.png') });
  await b.close(); console.log('ok', out);
})();
