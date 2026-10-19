"""Incorpora a la vista previa las propuestas de la Constitución de Gobernanza Solucionaria (gs.json),
con las mismas reglas que cualquier fuente: fichas nuevas, GS como fuente añadida, cuestiones y nota en Método.
Se ejecuta justo después de fusionar.py. Uso: python3 gs.py /tmp/pub"""
import json, re, os, sys, html, glob, copy
from urllib.parse import quote
from bs4 import BeautifulSoup

P = sys.argv[1]
G = json.load(open(os.path.join(os.path.dirname(__file__), 'gs.json'), encoding='utf-8'))
DOCS = G['documentos']
D = DOCS['gs']
rd = lambda f: open(f, encoding='utf-8').read()
def wr(f, s): os.makedirs(os.path.dirname(f), exist_ok=True); open(f, 'w', encoding='utf-8').write(s)
esc = html.escape
LETRAS = 'abcdefghijklmnopqrstuvwxyz'
idx_f = f'{P}/datos/indice-propuestas.json'
idx = json.load(open(idx_f, encoding='utf-8'))
por_id = {e['id']: e for e in idx}
if any(n['id'] in por_id for n in G['nuevas']):
    print('gs.py: ya aplicado'); sys.exit(0)

def corto(t, n=110):
    return t if len(t) <= n else t[:n].rsplit(' ', 1)[0] + '…'

def doc_li(n, etiquetas, D=None):
    D = D or DOCS['gs']
    tit = f'<a href="{D["url"]}" rel="noopener" target="_blank">{esc(D["titulo"])}</a>' if D['url'] else \
          f'<span>{esc(D["titulo"])}<span class="discreto"> · {esc(D["estado"])}</span></span>'
    et = ''.join(f'<span class="etiqueta">{esc(e)}</span>' for e in etiquetas)
    return (f'<li class="tarjeta" id="doc-{n}"> <h3><span class="discreto">{n}. </span>{tit}</h3> '
            f'<p class="autoria"><span>{esc(D["autoria"])}</span><span class="discreto"> · {D["anio"]}</span>'
            f'<span class="discreto"> · {esc(D["tipo"])}</span></p> <div class="etiquetas">{et}</div> </li>')

def inciso_li(letra, texto, n):
    return (f'<li><span class="letra" aria-hidden="true">{letra}</span><div><p>{esc(texto)}</p>'
            f'<p class="quien">Documentos: <a href="#doc-{n}">{n}</a></p></div></li>')

# ---------- 1. Fichas nuevas ----------
cat_nombre = {}
for n in G['nuevas']:
    tpl = rd(f'{P}/propuesta/{n["plantilla"]}/index.html')
    viejo = n['plantilla']; pid = n['id']
    cab, cuerpo = tpl[:tpl.index('<main')], tpl[tpl.index('<main'):]
    desc = corto(n['x'], 150) + ' La plantea 1 documento.'
    cab = re.sub(r'<title>.*?</title>', f'<title>{esc(n["t"])} · ENTRE TODOS</title>', cab, count=1, flags=re.S)
    for attr in ['name="description"', 'property="og:description"', 'name="twitter:description"']:
        cab = re.sub(rf'(<meta {attr} content=")[^"]*', lambda m: m.group(1) + esc(desc, quote=True), cab)
        cab = re.sub(rf'(<meta content=")[^"]*("\s+{attr})', lambda m: m.group(1) + esc(desc, quote=True) + m.group(2), cab)
    for attr in ['property="og:title"', 'name="twitter:title"']:
        cab = re.sub(rf'(<meta {attr} content=")[^"]*', lambda m: m.group(1) + esc(n['t'], quote=True), cab)
        cab = re.sub(rf'(<meta content=")[^"]*("\s+{attr})', lambda m: m.group(1) + esc(n['t'], quote=True) + m.group(2), cab)
    cab = cab.replace(f'og/propuesta/{viejo}.png', f'og/categoria/{n["cat"]}.png').replace(f'/propuesta/{viejo}/', f'/propuesta/{pid}/')
    s = BeautifulSoup(cuerpo, 'html.parser')
    m = s.find('main')
    art = m.find('article')
    cat_nombre[n['cat']] = art.find(class_='antetitulo').get_text(strip=True)
    art.find('h1').string = n['t']
    art.find('p', class_='texto-consolidado').string = n['x']
    da = art.find('p', class_='desde-anio')
    if da: da.decompose()
    nr = art.find('p', class_='nota-redaccion')
    if nr:
        nr.string = 'Redacción de ENTRE TODOS a partir de 1 documento, respetando su lenguaje. Las fuentes disponibles enlazan a su original; las internas se indican como tales.'
        if n.get('nota'):
            extra = s.new_tag('p', attrs={'class': 'discreto'}); extra.string = n['nota']; nr.insert_after(extra)
    url = f'https://entre-todos.org/propuesta/{pid}/'
    for a in art.select('.acciones a[href*="facebook"]'): a['href'] = 'https://www.facebook.com/sharer/sharer.php?u=' + quote(url, safe='')
    for a in art.select('.acciones a[href*="wa.me"]'): a['href'] = 'https://wa.me/?text=' + quote(f'{n["t"]}. {corto(n["x"], 160)} {url}', safe='')
    for b in art.select('[data-copiar]'): b['data-copiar'] = url
    for el in m.select('[data-propuesta]'): el['data-propuesta'] = pid
    # Resumen
    res = m.find('section', class_='ficha-resumen')
    if res:
        res.find('p', class_='entradilla').string = n['x']
        asi = res.find('aside')
        if asi:
            if n['i']:
                ol = asi.find('ol'); ol.clear()
                for t in n['i'][:4]:
                    li = s.new_tag('li'); sp = s.new_tag('span'); sp.string = corto(t); li.append(sp); ol.append(li)
            else:
                asi.decompose()
    # Incisos
    sec_i = m.find('section', attrs={'aria-labelledby': 't-incisos'})
    nav = m.find('nav', class_='pestanas')
    if n['i']:
        if sec_i is None:
            sec_i = BeautifulSoup('<section aria-labelledby="t-incisos"><h2 id="t-incisos">Incisos y precisiones de las fuentes</h2>'
                                  '<p class="discreto">Elementos que alguna fuente añade a la idea central. Cada uno remite a los documentos de la lista de abajo.</p><ol class="incisos"></ol></section>', 'html.parser').section
            m.find('section', attrs={'aria-labelledby': 't-fuentes'}).insert_before(sec_i)
        ol = sec_i.find('ol', class_='incisos'); ol.clear()
        for k, t in enumerate(n['i']):
            ol.append(BeautifulSoup(inciso_li(LETRAS[k], t, 1), 'html.parser'))
    else:
        if sec_i: sec_i.decompose()
        if nav:
            a = nav.find('a', href='#t-incisos')
            if a: a.decompose()
    # Fuentes
    sec_f = m.find('section', attrs={'aria-labelledby': 't-fuentes'})
    sec_f.find('summary').string = 'Ver fuentes y autores (1 documento)'
    ul = sec_f.find('ul', class_='lista'); ul.clear()
    Dn = DOCS[n.get('doc', 'gs')]
    ul.append(BeautifulSoup(doc_li(1, ['Idea central', n['loc']] + [f'Inciso {LETRAS[k]})' for k in range(len(n['i']))], Dn), 'html.parser'))
    cuerpo = str(s).replace(f'/propuesta/{viejo}/', f'/propuesta/{pid}/')
    wr(f'{P}/propuesta/{pid}/index.html', cab + cuerpo)
    idx.append({'id': pid, 't': n['t'], 'x': n['x'], 'i': ' '.join(n['i']), 'a': DOCS[n.get('doc', 'gs')]['autoria'], 'k': cat_nombre[n['cat']], 'n': 1})
    n['_k'] = cat_nombre[n['cat']]

# ---------- 2. GS como fuente añadida ----------
for e in G['fuente_en']:
    f = f'{P}/propuesta/{e["id"]}/index.html'; t = rd(f)
    mm = re.search(r'Ver fuentes y autores \((\d+) documentos?\)', t); nd = int(mm.group(1)) + 1
    t = t.replace(mm.group(0), f'Ver fuentes y autores ({nd} documentos)', 1)
    t = re.sub(r'a partir de \d+ documentos?,', f'a partir de {nd} documentos,', t, count=1)
    t = re.sub(r'La plantean? \d+ documentos?\.', f'La plantean {nd} documentos.', t)
    etq = ['Idea central', e['loc']]
    if e['i'] and 'class="incisos"' in t:
        i0 = t.index('class="incisos"'); fin = t.index('</ol>', i0)
        letra = LETRAS[t[i0:fin].count('class="letra"')]
        t = t[:fin] + inciso_li(letra, e['i'], nd) + t[fin:]
        etq.append(f'Inciso {letra})')
        e['_inc'] = True
    i0 = t.index('aria-labelledby="t-fuentes"'); i1 = t.index('<ul class="lista">', i0); fin = t.index('</ul>', i1)
    t = t[:fin] + doc_li(nd, etq) + t[fin:]
    wr(f, t)
    r = por_id[e['id']]
    r['n'] = nd; r['a'] = r['a'] + ' · ' + D['autoria']
    if e.get('_inc'): r['i'] = (r['i'] + ' ' + e['i']).strip()
json.dump(idx, open(idx_f, 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))

# Textos de ficha: el documento GS aún no tiene enlace público
if True:
    for pid in [n['id'] for n in G['nuevas'] if not DOCS[n.get('doc','gs')]['url']] + ([e['id'] for e in G['fuente_en']] if not D['url'] else []):
        f = f'{P}/propuesta/{pid}/index.html'; t = rd(f)
        t = t.replace('de los documentos públicos de los que sale esta propuesta, con lo que aporta cada uno. Cada enlace lleva al original.',
                      'de los documentos de los que sale esta propuesta, con lo que aporta cada uno. Las fuentes públicas enlazan a su original; las internas se indican sin enlace público.')
        t = t.replace('respetando su lenguaje. Cada documento enlaza a su original.',
                      'respetando su lenguaje. Las fuentes disponibles enlazan a su original; las internas se indican como tales.')
        wr(f, t)

# ---------- 3. Tarjetas en listados y contadores ----------
total = len(idx); varios = sum(1 for e in idx if str(e['n']) != '1')
por_cat = {}
for e in idx: por_cat[e['k']] = por_cat.get(e['k'], 0) + 1
def tarjeta(n):
    ni = len(n['i'])
    et = '<span class="etiqueta">1 documento</span>' + (f' <span class="etiqueta">{ni} inciso{"s" if ni != 1 else ""}</span>' if ni else '')
    return (f'<li class="tarjeta consolidada"> <h3><a href="/propuesta/{n["id"]}/">{esc(n["t"])}</a></h3> '
            f'<p class="texto">{esc(corto(n["x"], 200))}</p> <div class="etiquetas"> {et}    </div> </li>')
docs_gs = {e['id']: int(por_id[e['id']]['n']) for e in G['fuente_en']}
for f in glob.glob(f'{P}/propuestas/**/*.html', recursive=True) + glob.glob(f'{P}/actores/**/*.html', recursive=True):
    t = rd(f); o = t
    for pid, nd in docs_gs.items():
        t = re.sub(rf'(<a href="/propuesta/{pid}/">.*?<span class="etiqueta">)\d+ documentos?(</span>)',
                   lambda m: f'{m.group(1)}{nd} documentos{m.group(2)}', t, count=1, flags=re.S)
    for nombre, c in por_cat.items():
        t = re.sub(rf'({re.escape(nombre)} <span>)\d+(</span>)', lambda m: f'{m.group(1)}{c}{m.group(2)}', t)
    t = re.sub(r'(Todas <span>)\d+(</span>)', lambda m: f'{m.group(1)}{total}{m.group(2)}', t)
    if t != o: wr(f, t)
for cat in {n['cat'] for n in G['nuevas']}:
    f = f'{P}/propuestas/categoria/{cat}/index.html'; t = rd(f)
    nuevas = [n for n in G['nuevas'] if n['cat'] == cat]
    i = t.index('<ul class="lista'); fin = t.index('</ul>', i)
    t = t[:fin] + ''.join(tarjeta(n) for n in nuevas) + t[fin:]
    t = re.sub(r'(<ul class="cifras">\s*<li><strong>)\d+', lambda m: f'{m.group(1)}{por_cat[nuevas[0]["_k"]]}', t, count=1)
    wr(f, t)

# ---------- 4. Cuestiones ----------
f = f'{P}/cuestiones/index.html'; t = rd(f)
def tarjeta_c(pid):
    e = next(x for x in idx if x['id'] == pid)
    return (f'<li class="tarjeta consolidada"> <h3><a href="/propuesta/{pid}/">{esc(e["t"])}</a></h3> '
            f'<p class="texto">{esc(corto(e["x"], 200))}</p> <p class="autoria"><i class="fi fi-br-users" aria-hidden="true"></i>{esc(e["a"])}</p> </li>')
q = G['cuestiones']['sistema-de-gobierno']
i = t.index('id="sistema-de-gobierno"'); fin = t.index('</section>', i)
bloque = t[i:fin]
viejo_t = re.search(r'<h2 id="t-sistema-de-gobierno">(.*?)</h2>', bloque).group(1)
bloque = bloque.replace(viejo_t, q['titulo'], 1)
bloque = bloque[:bloque.rindex('</ul>')] + ''.join(tarjeta_c(p) for p in q['agregar']) + bloque[bloque.rindex('</ul>'):]
t = t[:i] + bloque + t[fin:]
t = t.replace(f'<a href="#sistema-de-gobierno">{viejo_t}</a>', f'<a href="#sistema-de-gobierno">{q["titulo"]}</a>')
nuevos, enlaces = '', ''
for c in G['cuestiones']['nuevas']:
    nuevos += (f'<section class="cuestion-bloque" id="{c["id"]}" aria-labelledby="t-{c["id"]}"> <h2 id="t-{c["id"]}">{esc(c["titulo"])}</h2> '
               f'<p class="discreto">{esc(c["texto"])}</p> <p class="etiqueta aviso" style="display:inline-flex">Opciones incompatibles entre sí</p> '
               f'<ul class="lista" style="margin-top:12px"> {"".join(tarjeta_c(p) for p in c["ids"])} </ul> </section>')
    enlaces += f'<li><a href="#{c["id"]}">{esc(c["titulo"])}</a></li>'
k = t.rindex('</section>', 0, t.index('</main>')) + len('</section>')
t = t[:k] + nuevos + t[k:]
t = t.replace('</ul> </nav>', enlaces + '</ul> </nav>', 1)
wr(f, t)
ncuest = t.count('class="cuestion-bloque"')

# ---------- 5. Método ----------
f = f'{P}/metodo/index.html'; t = rd(f)
i = t.index('<h2>2. Cómo se combinan')
t = t[:i] + f'<p class="discreto">{esc(G["metodo"])}</p> ' + t[i:]
wr(f, t)

# ---------- 6. Documentos ----------
f = f'{P}/fuentes/index.html'; t = rd(f)
filas = ''
for k, Dk in DOCS.items():
    cuenta = sum(1 for n in G['nuevas'] if n.get('doc', 'gs') == k) + (len(G['fuente_en']) if k == 'gs' else 0)
    celda = f'<a href="{Dk["url"]}" rel="noopener" target="_blank">{esc(Dk["titulo"])}</a>' if Dk['url'] else f'<span>{esc(Dk["titulo"])}<span class="discreto"> · {esc(Dk["estado"])}</span></span>'
    filas += (f'<tr> <td>{celda}<div class="discreto">{esc(Dk["tipo"])}</div></td> '
              f'<td>{esc(Dk["autoria"])}</td> <td>{Dk["anio"]}</td> <td>{cuenta}</td> </tr>')
fila = filas
i = t.index('<tbody>', t.index('<main')) + len('<tbody>'); fin = t.index('</tbody>', i)
t = t[:fin] + fila + t[fin:]
ndocs = t[i:fin + len(fila)].count('<tr')
wr(f, t)

# ---------- 7. Cifras en todo el sitio ----------
for f in glob.glob(f'{P}/**/*.html', recursive=True):
    t = rd(f); o = t
    t = re.sub(r'\b168(\s*(?:</strong>|<small>|</dd>)?\s*(?:propuestas|Propuestas|<span>Propuestas|<small>propuestas))', lambda m: f'{total}{m.group(1)}', t)
    t = re.sub(r'\b168( propuestas)', lambda m: f'{total}{m.group(1)}', t)
    t = t.replace('<dt>Propuestas publicadas</dt><dd>168</dd>', f'<dt>Propuestas publicadas</dt><dd>{total}</dd>')
    t = re.sub(r'\b81( documentos)', lambda m: f'{ndocs}{m.group(1)}', t)
    t = t.replace('<dd>81</dd>', f'<dd>{ndocs}</dd>')
    t = re.sub(r'\b10( cuestiones)', lambda m: f'{ncuest}{m.group(1)}', t)
    t = re.sub(r'\b136( de ellas recogen más de un documento)', lambda m: f'{varios}{m.group(1)}', t)
    if t != o: wr(f, t)
print(f'gs.py: {len(G["nuevas"])} fichas nuevas, fuente añadida en {len(G["fuente_en"])}, total {total}, documentos {ndocs}, cuestiones {ncuest}')
