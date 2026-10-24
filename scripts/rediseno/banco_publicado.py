"""Extrae del banco publicado (páginas ya fusionadas, con GS) los datos que usan los análisis:
propuestas con sus documentos (autoría y año), documentos y cuestiones.
Así los análisis cuentan lo mismo que ve el público (184 propuestas, 83 documentos...) y no el JSON fuente antiguo.
Uso: python3 banco_publicado.py <pubdir> <salida.json>"""
import json, sys, glob, os, re
from bs4 import BeautifulSoup
P, OUT = sys.argv[1], sys.argv[2]

docs = {}       # clave: url o título -> id
documentos = []
def doc_id(titulo, url, autoria, anio, tipo):
    k = url or titulo
    if k not in docs:
        docs[k] = f'd{len(docs) + 1}'
        documentos.append({'id': docs[k], 'titulo': titulo, 'url': url, 'autoria': autoria, 'anio': anio, 'tipo': tipo, 'actor': None})
    return docs[k]

propuestas = []
for f in sorted(glob.glob(f'{P}/propuesta/*/index.html')):
    pid = os.path.basename(os.path.dirname(f))
    b = BeautifulSoup(open(f, encoding='utf-8').read(), 'html.parser')
    h1 = b.select_one('main h1')
    if not h1: continue
    cat = b.select_one('.antetitulo a, .antetitulo')
    ids = []
    for li in b.select('.fuentes-detalle li.tarjeta'):
        a = li.select_one('h3 a'); h3 = li.select_one('h3')
        titulo = (a or h3).get_text(' ', strip=True)
        titulo = re.sub(r'^\d+\.\s*', '', titulo)
        url = a['href'] if a and a.get('href', '').startswith('http') else ''
        au = li.select_one('.autoria')
        partes = [s.get_text(strip=True).lstrip('· ').strip() for s in au.select('.discreto')] if au else []
        nombre = (au.select_one('a') or au).get_text(' ', strip=True) if au else ''
        if au:
            for s in au.select('.discreto'): nombre = nombre.replace(s.get_text(strip=True), '')
        nombre = nombre.strip(' ·')
        anio = next((int(x) for x in partes if re.fullmatch(r'\d{4}', x)), None)
        tipo = next((x for x in partes if not re.fullmatch(r'\d{4}', x)), '')
        ids.append(doc_id(titulo, url, nombre, anio, tipo))
    propuestas.append({'id': pid, 'titulo': h1.get_text(' ', strip=True), 'categoria': cat.get_text(' ', strip=True) if cat else '', 'documentos': ids})

cuestiones = []
cq = f'{P}/cuestiones/index.html'
if os.path.exists(cq):
    b = BeautifulSoup(open(cq, encoding='utf-8').read(), 'html.parser')
    for s in b.select('section.cuestion-bloque'):
        txt = s.select_one('p.discreto')
        cuestiones.append({'id': s['id'], 'pregunta': s.select_one('h2').get_text(' ', strip=True),
                           'texto': txt.get_text(' ', strip=True) if txt else '',
                           'excluyentes': bool(s.select_one('.etiqueta.aviso')),
                           'opciones': [a['href'].strip('/').split('/')[-1] for a in s.select('li h3 a[href^="/propuesta/"]')]})

autorias = {d['autoria'] for d in documentos if d['autoria']}
# Totales oficiales: los de la página Fuentes (incluye documentos que aún no citan ninguna ficha).
n_docs, aut_f = len(documentos), set()
fu = f'{P}/fuentes/index.html'
if os.path.exists(fu):
    filas = BeautifulSoup(open(fu, encoding='utf-8').read(), 'html.parser').select('main table tbody tr')
    filas = [tr.find_all('td') for tr in filas if tr.find_all('td')]
    n_docs = len(filas); aut_f = {td[1].get_text(' ', strip=True) for td in filas if len(td) > 1}
datos = {'meta': {'totales': {'propuestas': len(propuestas), 'documentos': n_docs, 'autorias': len(aut_f or autorias)}},
         'propuestas': propuestas, 'documentos': documentos, 'actores': [], 'cuestiones': cuestiones}
json.dump(datos, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False)
# Cifras que muestran la portada, Sobre nosotros y Propuestas: siempre las mismas que el banco publicado.
cif = os.path.join(os.path.dirname(OUT), 'cifras-publicadas.json')
json.dump({'propuestas': len(propuestas), 'documentos': n_docs, 'autorias': len(aut_f or autorias), 'cuestiones': len(cuestiones)}, open(cif, 'w', encoding='utf-8'))
print('propuestas', len(propuestas), '· documentos', len(documentos), '· autorías', len(autorias), '· cuestiones', len(cuestiones))
