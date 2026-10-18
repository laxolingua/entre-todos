// Uso: node capturas.js  → capturas de móvil de las secciones (vista previa local en :4340)
const { chromium } = require('playwright');
const P = [['portada','/'],['propuestas','/propuestas/'],['ficha','/propuesta/pluripartidismo/'],['academia','/academia/libertad-de-expresion/sin-permiso-previo/'],['actores','/actores/'],['cuba-eeuu','/cuba-eeuu/'],['actualidad','/actualidad/'],['consulta','/consulta/']];
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 400, height: 820 }, deviceScaleFactor: 2 });
for (const [n, u] of P) { await p.goto('http://localhost:4340' + u); await p.waitForTimeout(700);
  if (n === 'portada') { const h = await p.$('.hoy'); if (h) await h.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -60)); }
  await p.screenshot({ path: `capturas/${n}.png` }); }
await b.close(); })();
