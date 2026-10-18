// Graba en móvil cómo se valora y se aporta en una propuesta (demostración: los controles se activan solo en esta grabación).
const { chromium } = require('playwright'); const fs = require('fs');
const ID = process.argv[2] || 'eleccion-directa-presidente';
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 860, height: 1760 }, deviceScaleFactor: 1, isMobile: true, hasTouch: false });
  await ctx.addInitScript(() => { document.addEventListener('DOMContentLoaded', () => { const m = document.querySelector('meta[name=viewport]'); if (m) m.setAttribute('content', 'width=430'); }); });
  const p = await ctx.newPage(); const marcas = [];
  // Fotogramas a resolución real (860x1760) con la grabación de pantalla de Chrome
  fs.rmSync('fotogramas', { recursive: true, force: true }); fs.mkdirSync('fotogramas');
  const cdp = await ctx.newCDPSession(p); const lista = []; let t0 = 0;
  cdp.on('Page.screencastFrame', async (e) => { const n = lista.length; fs.writeFileSync(`fotogramas/${String(n).padStart(5, '0')}.jpg`, Buffer.from(e.data, 'base64')); lista.push(e.metadata.timestamp); try { await cdp.send('Page.screencastFrameAck', { sessionId: e.sessionId }); } catch {} });
  const marca = (n) => marcas.push([n, (Date.now() - t0) / 1000]);
  const espera = (ms) => p.waitForTimeout(ms);
  const bajar = async (y, pasos = 30) => { for (let i = 0; i < pasos; i++) { await p.mouse.wheel(0, y / pasos); await espera(25); } };
  await p.goto(`http://localhost:4340/propuesta/${ID}/`); await espera(800);
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, everyNthFrame: 1, maxWidth: 860, maxHeight: 1760 }); t0 = Date.now(); await espera(400);
  await p.waitForSelector('.valoracion button[data-v]', { timeout: 15000 }); await p.waitForSelector('[data-form]', { timeout: 15000 });
  // Modo demostración: activa los controles y simula la respuesta del servidor
  await p.evaluate(() => {
    document.querySelectorAll('.valoracion button[data-v]').forEach((x) => { x.disabled = false; x.addEventListener('click', () => {
      document.querySelectorAll('.valoracion button[data-v]').forEach((y) => { y.classList.toggle('on', y === x); y.setAttribute('aria-checked', String(y === x)); });
      document.querySelector('.valoracion .escala').classList.add('elegida');
      document.querySelector('.valoracion [data-estado]').textContent = 'Registrada. Puedes cambiarla cuando quieras.';
    }); });
    document.querySelectorAll('.valoracion .discreto').forEach((x) => { if (x.textContent.includes('se activa')) x.textContent = 'Valoración anónima: no pedimos nombre, correo ni documento. Solo se publican totales.'; });
    document.querySelectorAll('[data-form] [disabled]').forEach((x) => (x.disabled = false));
    const av = document.querySelector('[data-form] [data-aviso]'); if (av) av.textContent = '';
    const f = document.querySelector('[data-form]'); if (f) f.addEventListener('submit', (e) => { e.preventDefault(); f.reset(); f.querySelector('[data-aviso]').textContent = 'Recibido. Se publicará cuando lo revise el equipo de moderación.'; });
  });
  marca('leer'); await espera(1500); await bajar(520); await espera(1500);
  marca('valorar');
  const v = p.locator('.valoracion'); await v.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -240)); await espera(1200);
  await p.locator('.valoracion button[data-v="4"]').click(); await espera(2600);
  marca('aportes');
  await p.locator('.pestanas a[href="#t-aportes"]').click(); await espera(1200);
  const f = p.locator('[data-form]'); await f.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -660)); await espera(800);
  await p.selectOption('#aporte-tipo', 'mejora'); await espera(700);
  marca('escribir');
  await p.click('#aporte-texto'); await p.keyboard.type('Fijar un máximo de dos mandatos para el presidente, como en la mayoría de las democracias de la región.', { delay: 38 });
  await espera(900);
  marca('enviar');
  await p.click('[data-form] button[type=submit]'); await espera(3200);
  marca('fin');
  await cdp.send('Page.stopScreencast'); await espera(300); await ctx.close(); await b.close();
  const base = lista[0]; fs.writeFileSync('fotogramas/tiempos.json', JSON.stringify(lista.map((x) => x - base)));
  fs.writeFileSync('marcas.json', JSON.stringify(marcas)); console.log(JSON.stringify(marcas));
})();
