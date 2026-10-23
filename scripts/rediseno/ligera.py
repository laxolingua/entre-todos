"""Versión ligera para conexiones lentas (pensada para Cuba).
Se activa sola si el navegador pide ahorrar datos o la conexión es lenta (2G/3G), y con un interruptor
en el pie y en un aviso arriba. La elección se recuerda en el dispositivo.
En modo ligero: no se descarga ninguna foto (una política CSP bloquea las imágenes antes de que el
navegador las pida), se usa la letra del sistema (las tipografías no se descargan si no se usan) y en
lugar de las fotos se ven los paneles azul marino con puntos del diseño. Mismo contenido.
Uso: python3 ligera.py <pubdir>"""
import sys, glob
P = sys.argv[1]

CABEZA = """<script>(function(){try{var s=localStorage.getItem('et-ligera'),c=navigator.connection||{};
var on=s==='1'||(s===null&&(c.saveData||/(^|-)2g$|^3g$/.test(c.effectiveType||'')));
if(on){document.documentElement.className+=' ligera';
document.write('<meta http-equiv="Content-Security-Policy" content="img-src data: blob:">');}}catch(e){}})();</script>"""

ESTILO = """<style>
html.ligera body, html.ligera body *:not(i) { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif !important; }
html.ligera img { display: none !important; }
html.ligera .duo, html.ligera .foto, html.ligera .cat-banda, html.ligera .tarjeta-foto, html.ligera .banda-fondo .foto {
  background-color: #0b1d3f !important; background-image: radial-gradient(rgba(255,255,255,.18) 1px, transparent 1.3px) !important; background-size: 9px 9px !important; min-height: 60px; }
.et-ligera-aviso { display: none; }
html.ligera .et-ligera-aviso { display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap; background: #f4c20d; color: #0b1d3f; font: 600 .85rem/1.3 system-ui, sans-serif; padding: 6px 12px; text-align: center; }
.et-ligera-aviso button, .et-ligera-pie button { font: inherit; background: none; border: 0; padding: 0; color: inherit; text-decoration: underline; cursor: pointer; }
.et-ligera-pie { margin-top: 10px; font-size: .85rem; }
</style>"""

AVISO = """<div class="et-ligera-aviso" role="note">Versión ligera: sin fotos para gastar menos datos. <button type="button" data-et-ligera="0">Ver con fotos</button></div>"""
PIE = """<p class="et-ligera-pie"><button type="button" data-et-ligera="1">Activar la versión ligera</button><span hidden> · </span></p>"""
SCRIPT = """<script>(function(){var l=document.documentElement.classList.contains('ligera');
document.querySelectorAll('[data-et-ligera]').forEach(function(b){
if(b.closest('.et-ligera-pie')){b.textContent=l?'Ver la versión con fotos':'Activar la versión ligera (sin fotos, menos datos)';b.dataset.etLigera=l?'0':'1';}
b.addEventListener('click',function(){try{localStorage.setItem('et-ligera',b.dataset.etLigera);}catch(e){}location.reload();});});})();</script>"""

n = 0
for f in glob.glob(f'{P}/**/*.html', recursive=True):
    t = open(f, encoding='utf-8').read()
    if 'et-ligera' in t or '<head>' not in t: continue
    t = t.replace('<head>', '<head>' + CABEZA, 1)
    t = t.replace('</head>', ESTILO + '</head>', 1)
    i = t.find('<body')
    if i >= 0:
        j = t.find('>', i) + 1
        t = t[:j] + AVISO + t[j:]
    if '<footer class="pie">' in t:
        k = t.find('</footer>', t.find('<footer class="pie">'))
        t = t[:k] + '<div class="contenedor">' + PIE + '</div>' + t[k:]
    t = t.replace('</body>', SCRIPT + '</body>', 1)
    open(f, 'w', encoding='utf-8').write(t); n += 1
print('versión ligera en', n, 'páginas')
