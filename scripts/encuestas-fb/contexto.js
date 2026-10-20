// Imagen del post de contexto de una noticia (1080 × 1350): la noticia y cómo votar. Se publica después de las encuestas.
// Uso: NODE_PATH=/opt/npm-tools/node_modules node contexto.js 001-onu-cuba-libre
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const id = process.argv[2]; const N = path.join(__dirname, '..', 'noticias');
const D = JSON.parse(fs.readFileSync(path.join(N, id + '.json'), 'utf8'));
const F = 'file://' + path.join(N, 'fotos', D.foto.archivo + '.jpg');
(async () => {
  const out = path.join(__dirname, 'salida', id); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 1500 } });
  await p.goto('file://' + path.join(__dirname, 'contexto.html'));
  await p.evaluate(([D, F, P]) => window.pintar(D, F, P), [D, F, D.foto.posicion || 'center top']);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await (await p.$('#ctx')).screenshot({ path: path.join(out, 'contexto.png') });
  const h = await p.evaluate(() => { const c = document.querySelector('.c'), v = document.querySelector('.voto'); return [c.getBoundingClientRect().bottom, v.getBoundingClientRect().top]; });
  if (h[0] > h[1]) console.log('AVISO: el texto choca con «Cómo votar»', h);
  await b.close(); console.log('ok', out);
})();
