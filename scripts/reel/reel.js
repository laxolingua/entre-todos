// Uso: node reel.js ficha.json carpeta-salida
// Genera una imagen por diapositiva (1080x1920) a partir de la ficha de la propuesta.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const [ficha, out] = process.argv.slice(2); const D = JSON.parse(fs.readFileSync(ficha, 'utf8'));
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(__dirname, 'plantilla.html'));
  const n = await p.evaluate(([D, F]) => window.pintar(D, F), [D, '/tmp/pub/img/fotos/']);
  await p.waitForTimeout(800);
  const s = await p.$$('.s'); for (let i = 0; i < s.length; i++) await s[i].screenshot({ path: path.join(out, `d${i + 1}.png`) });
  await b.close(); console.log(n);
})();
