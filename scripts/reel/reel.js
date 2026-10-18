// Uso: node reel.js ficha.json carpeta-salida
// Genera una imagen por diapositiva (1080x1920) a partir de la ficha de la propuesta.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
(async () => {
  const [ficha, out] = process.argv.slice(2); const D = JSON.parse(fs.readFileSync(ficha, 'utf8'));
  fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch();
  // Captura de móvil de la ficha publicada en la vista previa local (:4340), si está disponible
  if (!D.diapositivas && !D.captura) { try {
    const m = await b.newPage({ viewport: { width: 400, height: 820 }, deviceScaleFactor: 2 });
    await m.goto(`http://localhost:4340/propuesta/${D.id}/`, { timeout: 5000 }); await m.waitForTimeout(600);
    await m.screenshot({ path: path.join(__dirname, 'capturas', `${D.id}.png`) }); D.captura = D.id; await m.close();
  } catch (e) { /* sin vista previa local: diapositiva de texto */ } }
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file://' + path.join(__dirname, 'plantilla.html'));
  const n = await p.evaluate(([D, F, C]) => window.pintar(D, F, C), [D, '/tmp/pub/img/fotos/', path.join(__dirname, 'capturas') + '/']);
  await p.waitForTimeout(800);
  const s = await p.$$('.s'); for (let i = 0; i < s.length; i++) await s[i].screenshot({ path: path.join(out, `d${i + 1}.png`) });
  await b.close(); console.log(n);
})();
