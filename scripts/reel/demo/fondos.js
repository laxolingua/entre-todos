const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('file://' + process.cwd() + '/fondos.html'); await p.waitForTimeout(600);
const s = await p.$$('.s'); for (let i = 0; i < s.length; i++) await s[i].screenshot({ path: `fondo${i + 1}.png` }); await b.close(); })();
