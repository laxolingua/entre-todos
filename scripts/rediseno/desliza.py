"""Pista visual en las zonas que se deslizan en horizontal (pestañas de las fichas, tablas anchas, filtros):
si hay contenido fuera de la pantalla, el borde derecho se difumina y las tablas muestran «Desliza para ver más».
Uso: python3 desliza.py <pubdir>"""
import sys, glob
P = sys.argv[1]
CSS = """<style>
.et-desliza-mas { -webkit-mask-image: linear-gradient(to right, #000 82%, transparent); mask-image: linear-gradient(to right, #000 82%, transparent); }
.et-desliza-ambos { -webkit-mask-image: linear-gradient(to right, transparent, #000 14%, #000 82%, transparent); mask-image: linear-gradient(to right, transparent, #000 14%, #000 82%, transparent); }
.et-desliza-menos { -webkit-mask-image: linear-gradient(to right, transparent, #000 14%); mask-image: linear-gradient(to right, transparent, #000 14%); }
.et-desliza-aviso { display: flex; align-items: center; gap: 6px; font-size: .82rem; font-weight: 600; color: var(--marino, #0b1d3f); margin: 6px 0; }
.et-desliza-aviso[hidden] { display: none; }
@media (max-width: 640px) {
  .comparativa table { min-width: 0 !important; }
  .comparativa thead { display: none; }
  .comparativa tr, .comparativa tbody th, .comparativa td { display: block; width: 100%; }
  .comparativa tr { border-bottom: 3px solid var(--borde, #dfe3ea); }
  .comparativa td[data-label]::before { content: attr(data-label); display: block; font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--rojo, #d7192d); margin-bottom: 2px; }
}
</style>"""
JS = """<script>(function(){var S='.pestanas,.desplazable,.subnav .contenedor,.filtro-cat,.tabla-scroll';
function marcar(e){var mas=e.scrollWidth-e.clientWidth-e.scrollLeft>4,menos=e.scrollLeft>4;
e.classList.toggle('et-desliza-mas',mas&&!menos);e.classList.toggle('et-desliza-ambos',mas&&menos);e.classList.toggle('et-desliza-menos',menos&&!mas);
var a=e._aviso;if(a)a.hidden=!(e.scrollWidth-e.clientWidth>4);}
function etiquetas(){document.querySelectorAll('.comparativa table').forEach(function(tb){var h=[].map.call(tb.querySelectorAll('thead th'),function(x){return x.textContent.trim()});
tb.querySelectorAll('tbody tr').forEach(function(tr){[].forEach.call(tr.children,function(c,i){if(c.tagName==='TD'&&h[i])c.setAttribute('data-label',h[i])})})});}
function iniciar(){etiquetas();document.querySelectorAll(S).forEach(function(e){
if(e.matches('.desplazable,.tabla-scroll')&&!e._aviso){var a=document.createElement('p');a.className='et-desliza-aviso';a.innerHTML='Desliza para ver más <span aria-hidden="true">&rarr;</span>';e.parentNode.insertBefore(a,e);e._aviso=a;}
marcar(e);e.addEventListener('scroll',function(){marcar(e)},{passive:true});});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
window.addEventListener('resize',function(){document.querySelectorAll(S).forEach(marcar)});})();</script>"""
n = 0
for f in glob.glob(f'{P}/**/*.html', recursive=True):
    t = open(f, encoding='utf-8').read()
    if 'et-desliza' in t or '</body>' not in t: continue
    t = t.replace('</head>', CSS + '</head>', 1).replace('</body>', JS + '</body>', 1)
    open(f, 'w', encoding='utf-8').write(t); n += 1
print('pista de deslizamiento en', n, 'páginas')
