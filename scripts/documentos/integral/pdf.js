// Uso: node pdf.js integral.html salida.pdf
const { chromium } = require('playwright'); const path = require('path');
(async () => { const [i, o] = process.argv.slice(2); const b = await chromium.launch(); const p = await b.newPage();
await p.goto('file://' + path.resolve(i)); await p.waitForTimeout(800);
await p.pdf({ path: o, format: 'A4', printBackground: true, displayHeaderFooter: true,
  headerTemplate: '<div style="width:100%;font-size:7pt;font-family:Arial;color:#7a849a;padding:0 18mm;display:flex;justify-content:space-between"><span>ENTRE TODOS · Texto íntegro del banco de propuestas</span><span>Borrador v0.2</span></div>',
  footerTemplate: '<div style="width:100%;font-size:7pt;font-family:Arial;color:#7a849a;padding:0 18mm;display:flex;justify-content:space-between"><span>entre-todos.org · contacto.entretodos@gmail.com</span><span class="pageNumber"></span></div>',
  margin: { top: '22mm', bottom: '20mm', left: '18mm', right: '18mm' } });
await b.close(); })();
