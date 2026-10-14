"""Genera los archivos de datos abiertos que enlaza /datos/ a partir del contenido publicado.
Uso: python3 datos_abiertos.py <pubdir>. Solo usa información ya pública (índice de propuestas y tabla de documentos)."""
import json, csv, sys, os
from bs4 import BeautifulSoup
P = sys.argv[1]
idx = json.load(open(f'{P}/datos/indice-propuestas.json', encoding='utf-8'))
filas = [{'id': e['id'], 'titulo': e['t'], 'texto': e['x'], 'incisos': e['i'], 'categoria': e['k'],
          'documentos': int(e['n']) if str(e['n']).isdigit() else e['n'], 'planteada_por': e['a'],
          'url': f"https://entre-todos.org/propuesta/{e['id']}/"} for e in idx]
json.dump({'fuente': 'ENTRE TODOS · entre-todos.org', 'licencia': 'Uso libre citando la fuente', 'propuestas': filas},
          open(f'{P}/datos/propuestas.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
with open(f'{P}/datos/propuestas.csv', 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.DictWriter(f, fieldnames=list(filas[0].keys())); w.writeheader(); w.writerows(filas)
b = BeautifulSoup(open(f'{P}/fuentes/index.html', encoding='utf-8').read(), 'html.parser')
docs = []
for tr in b.select('main table tbody tr'):
    td = tr.find_all('td')
    if not td: continue
    a = td[0].find('a', href=True)
    et = td[0].find(class_='discreto'); tipo = et.get_text(strip=True) if et else ''
    if et: et.extract()
    docs.append({'documento': td[0].get_text(' ', strip=True), 'tipo': tipo, 'autoria': td[1].get_text(' ', strip=True) if len(td) > 1 else '',
                 'anio': td[2].get_text(strip=True) if len(td) > 2 else '', 'propuestas': td[3].get_text(strip=True) if len(td) > 3 else '',
                 'enlace': a['href'] if a and a['href'].startswith('http') else ''})
with open(f'{P}/datos/documentos.csv', 'w', encoding='utf-8-sig', newline='') as f:
    w = csv.DictWriter(f, fieldnames=['documento', 'tipo', 'autoria', 'anio', 'propuestas', 'enlace']); w.writeheader(); w.writerows(docs)
print('propuestas', len(filas), '· documentos', len(docs))
