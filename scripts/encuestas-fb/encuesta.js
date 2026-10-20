// Genera la consulta del día para el grupo de Facebook: imagen de la publicación, las cinco imágenes de la escala
// y una simulación de cómo se ve en el grupo.
// Uso: NODE_PATH=/opt/npm-tools/node_modules node encuesta.js presos-politicos P-001
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const [id, codigo] = process.argv.slice(2);
const idx = JSON.parse(fs.readFileSync('/tmp/pub/datos/indice-propuestas.json', 'utf8'));
const e = idx.find(x => x.id === id); if (!e) throw new Error('No existe ' + id);
const CAT = { 'Transición Democrática': 'transicion', 'Proceso Constituyente': 'constitucion', 'Plataforma de Gobierno': 'modelo_pais', 'Sistema Electoral': 'sistema_electoral', 'Reconstrucción Nacional': 'reconstruccion', 'Educación': 'educacion', 'Economía': 'economia', 'Trabajo y Seguridad Social': 'trabajo', 'Salud': 'salud', 'Medio Ambiente': 'medio_ambiente', 'Sociedad Civil': 'sociedad_civil', 'Derechos y Libertades': 'derechos', 'Familia, Niñez y Juventud': 'familia', 'Tercera Edad': 'tercera_edad', 'Vivienda y Urbanismo': 'vivienda', 'Género e Igualdad': 'genero', 'Protección Animal y Biodiversidad': 'animales', 'Alimentación y Agro': 'alimentacion' };
const D = { codigo, titulo: e.t, categoria: e.k, resumen: e.x, documentos: e.n };
const foto = 'file:///tmp/et/web/public/img/fotos/cat-' + (CAT[e.k] || 'transicion') + '.jpg';
(async () => {
  const out = path.join(__dirname, 'salida', codigo); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 1200 } });
  const tpl = 'file://' + path.join(__dirname, 'plantilla.html');
  await p.goto(tpl); await p.evaluate(([D, F]) => window.pintar(D, F, {}), [D, foto]);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const OP = {};
  for (const n of ['pub', 'op1', 'op2', 'op3', 'op4', 'op5']) {
    const f = path.join(out, (n === 'pub' ? 'publicacion' : 'opcion-' + n.slice(2)) + '.png');
    await (await p.$('#' + n)).screenshot({ path: f }); OP[n] = 'file://' + f;
  }
  await p.goto(tpl); await p.evaluate(([D, F, OP]) => window.pintar(D, F, OP), [D, foto, OP]);
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  await (await p.$('#fb')).screenshot({ path: path.join(out, 'simulacion-grupo.png') });
  await b.close(); console.log('ok', out);
})();
