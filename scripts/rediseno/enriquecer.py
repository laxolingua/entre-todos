# Reestructura las páginas publicadas del banco según el concepto (barra de categorías, tarjetas con
# foto y número, ficha con número rojo, foto y pestañas). No cambia ningún texto ni dato del banco.
import os, glob, re, sys, copy, html
from bs4 import BeautifulSoup
P = sys.argv[1]
leer = lambda f: BeautifulSoup(open(f, encoding='utf-8').read(), 'html.parser')
def guardar(f, s): open(f, 'w', encoding='utf-8').write(str(s))
frag = lambda h: BeautifulSoup(h, 'html.parser')

idx = leer(f'{P}/propuestas/index.html')
cats = []
for a in idx.select('a.categoria'):
    clave = a['href'].rstrip('/').split('/')[-1]
    nombre = a.find('h3').get_text(strip=True)
    n = int(re.search(r'\d+', a.select_one('.cifra').get_text()).group())
    cats.append((clave, nombre, n))
nombre_cat = {c: n for c, n, _ in cats}
total = int(re.search(r'\d+', idx.select_one('.cifra-grande').get_text()).group())

rango = {}
for clave, _, _ in cats:
    cp = leer(f'{P}/propuestas/categoria/{clave}/index.html')
    for i, a in enumerate(cp.select('li.tarjeta h3 a'), 1):
        rango[a['href'].rstrip('/').split('/')[-1]] = (clave, i)

def barra(activa):
    h = '<aside class="filtro-cat" aria-label="Categorías">'
    h += f'<a href="/propuestas/"{" class=activa" if activa is None else ""}>Todas <span>{total}</span></a>'
    for c, n, k in cats:
        h += f'<a href="/propuestas/categoria/{c}/"{" class=activa" if activa == c else ""}>{n} <span>{k}</span></a>'
    h += '<a class="enlace-flecha" href="/propuestas/">Ver todas →</a></aside>'
    return frag(h)

def banda(clave):
    return frag(f'<figure class="cat-banda duo" aria-hidden="true"><img src="/img/fotos/cat-{clave}.jpg" alt=""></figure>')

def tarjeta(li, soup, foto=False):
    a = li.find('h3').find('a'); pid = a['href'].rstrip('/').split('/')[-1]
    clave, num = rango.get(pid, (None, 0))
    if not clave: return
    li['class'] = li.get('class', []) + ['con-foto']
    cuerpo = soup.new_tag('div', attrs={'class': 'tarjeta-cuerpo'})
    for hijo in list(li.contents): cuerpo.append(hijo.extract())
    cuerpo.insert(0, frag(f'<p class="tarjeta-cat">{nombre_cat[clave]}</p><span class="tarjeta-num">{num:02d}</span>'))
    cuerpo.append(frag(f'<a class="enlace-flecha ver" href="{a["href"]}">Ver propuesta →</a>'))
    if foto: li.append(frag(f'<div class="tarjeta-foto duo"><img src="/img/fotos/cat-{clave}.jpg" alt="" loading="lazy"></div>'))
    li.append(cuerpo)
    return clave

# 1. Portada del banco
cuerpo = idx.find(id='banco-cuerpo')
grid = idx.new_tag('div', attrs={'class': 'banco-grid'}); princ = idx.new_tag('div', attrs={'class': 'banco-principal'})
form = cuerpo.find('form', class_='buscador'); form.insert_before(grid)
for el in [form, idx.find(id='resultados'), idx.find(id='categorias')]: princ.append(el.extract())
grid.append(barra(None)); grid.append(princ)
for ul in princ.select('#categorias ul.lista'):
    if ul.select_one('li.tarjeta.consolidada'):
        ul['class'] = ul.get('class', []) + ['con-fotos']
        # Portada: tarjetas sin foto (decisión de Mitch, 18/10/2026, entrega 034 IN).
        for li in ul.select('li.tarjeta.consolidada'): tarjeta(li, idx)
guardar(f'{P}/propuestas/index.html', idx)

# 2. Páginas de categoría
for clave, _, _ in cats:
    f = f'{P}/propuestas/categoria/{clave}/index.html'; s = leer(f); main = s.find('main')
    ul = main.find('ul', class_='lista', recursive=False)
    grid = s.new_tag('div', attrs={'class': 'banco-grid'}); ul.insert_before(grid)
    ul = ul.extract(); ul['class'] = ul.get('class', []) + ['con-fotos']
    # Página de categoría: una sola foto arriba y tarjetas sin foto (no se repite la imagen).
    for li in ul.select('li.tarjeta.consolidada'): tarjeta(li, s)
    cont = s.new_tag('div'); cont.append(banda(clave)); cont.append(ul)
    grid.append(barra(clave)); grid.append(cont)
    guardar(f, s)

# 3. Fichas de propuesta
n = 0
for f in glob.glob(f'{P}/propuesta/*/index.html'):
    s = leer(f); main = s.find('main'); pid = f.split('/')[-2]
    art = main.find('article', class_='ficha-consolidada')
    if not art or art.find(class_='ficha-cab'): continue
    clave, num = rango.get(pid, (None, 0))
    migas = main.find('nav', class_='migas')
    if migas: migas.decompose()
    ante = art.find('p', class_='antetitulo'); h1 = art.find('h1'); texto = art.find('p', class_='texto-consolidado')
    if clave:
        nuevo = s.new_tag('a', attrs={'class': 'antetitulo', 'href': f'/propuestas/categoria/{clave}/'}); nuevo.string = nombre_cat[clave]; ante.replace_with(nuevo); ante = nuevo
    cab = s.new_tag('div', attrs={'class': 'ficha-cab'}); art.insert(0, cab)
    izq = s.new_tag('div', attrs={'class': 'ficha-texto'})
    izq.append(frag('<a class="volver" href="/propuestas/">← Volver a propuestas</a><br>'))
    izq.append(ante.extract())
    if num: izq.append(frag(f'<span class="ficha-num">{num:02d}</span>'))
    izq.append(h1.extract()); izq.append(texto.extract())
    cab.append(izq)
    if clave:
        cab.append(frag(f'<figure class="ficha-foto duo" aria-hidden="true" style="margin:0"><img src="/img/fotos/cat-{clave}.jpg" alt=""><span class="ficha-orn blo"></span><span class="ficha-orn tri"></span><span class="ficha-orn bar"></span></figure>'))
    art['id'] = 'resumen'
    # pestañas
    tabs = [('#resumen', 'Resumen')]
    for sid, t in [('t-incisos', 'Incisos'), ('t-variantes', 'Diferencias'), ('t-fuentes', 'Fuentes y autores'), ('t-aportes', 'Aportes')]:
        if s.find(id=sid): tabs.append((f'#{sid}', t))
    nav = frag('<nav class="pestanas" aria-label="Secciones de la propuesta">' + ''.join(f'<a href="{h}"{" class=activa" if i == 0 else ""}>{t}</a>' for i, (h, t) in enumerate(tabs)) + '</nav>')
    art.insert_after(nav)
    # resumen + precisiones principales
    incisos = [li.find('p').get_text(' ', strip=True) for li in s.select('ol.incisos > li') if li.find('p')]
    nota = main.find('div', class_='resumen')
    if incisos or nota:
        bloque = s.new_tag('section', attrs={'class': 'ficha-resumen', 'aria-label': 'Resumen'})
        izq = s.new_tag('div'); izq.append(frag('<h2>Resumen</h2>'))
        if nota: izq.append(nota.extract())
        else: izq.append(frag(f'<p class="entradilla">{html.escape(texto.get_text(" ", strip=True))}</p>'))
        izq.append(frag('<span class="barra amarilla" style="margin-top:18px"></span>'))
        bloque.append(izq)
        if incisos:
            corto = lambda t: t if len(t) <= 110 else t[:107].rsplit(' ', 1)[0] + '…'
            caja = '<aside class="objetivos"><h3>Precisiones principales</h3><ol>' + ''.join(f'<li><span>{html.escape(corto(t))}</span></li>' for t in incisos[:4]) + '</ol>'
            caja += '<a class="enlace-flecha" href="#t-incisos">Ver todos los incisos →</a></aside>'
            bloque.append(frag(caja))
        s.find('nav', class_='pestanas').insert_after(bloque)
    guardar(f, s); n += 1
print('categorías', len(cats), '· fichas', n, '· total', total)

# 3b. Derechos fundamentales: se documentan, no se votan. La lista vive en web/src/data/derechos.js.
_der = set(re.findall(r"'([a-z0-9-]+)'", open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../web/src/data/derechos.js'), encoding='utf-8').read()))
_marca = ('<p class="marca-derecho"><strong>Derecho fundamental: no se somete a votación.</strong> Los derechos humanos y las garantías '
          'democráticas fundamentales se documentan, pero su existencia no se vota. Lo que sí puede debatirse es cómo garantizarlos. '
          '<a href="/metodo/">Ver el Método</a></p>')
_n = 0
for pid in _der:
    f = f'{P}/propuesta/{pid}/index.html'
    if not os.path.exists(f): continue
    t = open(f, encoding='utf-8').read()
    t2 = re.sub(r'<section[^>]*id="valoracion"[^>]*></section>', _marca, t, count=1)
    if t2 != t: open(f, 'w', encoding='utf-8').write(t2); _n += 1
print('derechos sin votación', _n)

# 4. Participación (escala de acuerdo y aportes): las páginas de main traen la sección vacía; se monta con el script de la compilación.
# Sin PUBLIC_PARTICIPACION=true la escala sale desactivada y explica que se activará con la base de datos.
nuevo = [a for a in glob.glob(f'{P}/_astro/participacion.*.js') if 'Muy en contra' in open(a, encoding='utf-8').read()]
nuevo.sort(key=lambda a: 'votante_entrar' not in open(a, encoding='utf-8').read())  # primero la versión con voto por documento
if nuevo:
    ruta = '/_astro/' + os.path.basename(nuevo[0])
    montaje = f'<script type="module">import("{ruta}").then(function(m){{m.iniciarParticipacion()}})</script>'
    montadas = 0
    for f in glob.glob(f'{P}/propuesta/*/index.html'):
        t = open(f, encoding='utf-8').read()
        if 'id="valoracion"' in t and 'iniciarParticipacion' not in t:
            open(f, 'w', encoding='utf-8').write(t.replace('</body>', montaje + '</body>', 1)); montadas += 1
    print('participación montada en', montadas, 'propuestas')
    # Las páginas de main traen además su propio script, que carga la versión antigua (estrellas, desactivada)
    # y pisaba la nueva. Se neutraliza esa versión antigua para que solo actúe la nueva.
    for a in glob.glob(f'{P}/_astro/participacion.*.js'):
        if 'Muy en contra' not in open(a, encoding='utf-8').read():
            open(a, 'w', encoding='utf-8').write('export function iniciarParticipacion(){}\n')
