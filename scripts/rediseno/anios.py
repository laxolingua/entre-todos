"""Añade a la vista previa el año del documento más antiguo de cada propuesta, leído de las fichas publicadas.
Uso: python3 anios.py /tmp/pub"""
import re, glob, os, sys
P = sys.argv[1]
anio, ndocs, docs_por = {}, {}, {}
for f in glob.glob(f'{P}/propuesta/*/index.html'):
    pid = os.path.basename(os.path.dirname(f)); s = open(f, encoding='utf-8').read()
    años = [int(a) for a in re.findall(r'<p class="autoria">.*?<span class="discreto"> · (\d{4})</span>', s)]
    if años: anio[pid] = min(años)
    m = re.search(r'Ver fuentes y autores \((\d+) documento', s)
    if m: ndocs[pid] = int(m.group(1))
    docs_por[pid] = set(re.findall(r'<li class="tarjeta" id="doc-\d+"> <h3><span class="discreto">\d+\. </span><a href="([^"]+)"', s))
    if pid in anio and 'documentada desde' not in s:
        s = re.sub(r'(<p class="texto-consolidado">.*?</p>)', lambda m: m.group(1) + f'<p class="desde-anio"><strong>Propuesta documentada desde {anio[pid]}.</strong></p>', s, count=1, flags=re.S)
        open(f, 'w', encoding='utf-8').write(s)
n = 0
for f in glob.glob(f'{P}/propuestas/**/*.html', recursive=True) + glob.glob(f'{P}/actores/**/*.html', recursive=True):
    s = open(f, encoding='utf-8').read(); o = s
    def tarjeta(m):
        pid = m.group(2)
        if pid not in anio or 'etiqueta desde' in m.group(0): return m.group(0)
        return m.group(0).replace('<div class="etiquetas"> ', f'<div class="etiquetas"> <span class="etiqueta desde">Desde {anio[pid]}</span> ', 1)
    s = re.sub(r'(<h3><a href="/propuesta/([a-z0-9-]+)/">.*?<div class="etiquetas"> )', tarjeta, s, flags=re.S)
    if s != o: open(f, 'w', encoding='utf-8').write(s); n += 1
f = f'{P}/cuba-eeuu/index.html'
if os.path.exists(f):
    s = open(f, encoding='utf-8').read()
    def etq(m):
        ids = [i for i in m.group(1).split(',') if i in anio]
        if not ids: return m.group(0)
        total = len(set().union(*[docs_por.get(i, set()) for i in ids]))
        return f'<p class="ce-etq" data-ids="{m.group(1)}">En el banco desde {min(anio[i] for i in ids)} · {total} documentos</p>'
    s = re.sub(r'<p class="ce-etq" data-ids="([^"]+)">.*?</p>', etq, s)
    s = re.sub(r'<span class="discreto" data-desde="([a-z0-9-]+)">desde \d*</span>', lambda m: f'<span class="discreto" data-desde="{m.group(1)}">desde {anio.get(m.group(1), "")}</span>', s)
    open(f, 'w', encoding='utf-8').write(s)
print(len(anio), 'propuestas con año;', n, 'listados actualizados')
