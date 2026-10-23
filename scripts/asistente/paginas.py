"""Extrae el texto de las páginas generales del sitio (ya fusionado) para el corpus del asistente.
Uso: python3 paginas.py /tmp/pub salida.json
Una fila por sección (h2) de cada página, máximo ~1.800 caracteres."""
import re, html, json, sys, pathlib
pub = pathlib.Path(sys.argv[1])
PAGINAS = ['', 'sobre', 'metodo', 'plataforma', 'compara', 'candidatura-solucionaria', 'cual-es-el-plan', 'generador-de-soluciones',
           'privacidad', 'seguridad', 'constituyente', 'diversidad-politica', 'reconstruccion', 'cuba-eeuu', 'consulta',
           'consulta/solicitud-consulta-civica', 'consulta/continuidad-o-cambio', 'consulta/encuestas', 'datos', 'abrazos',
           'cuestiones', 'actualidad', 'analisis', 'preguntar', 'academia', 'academia/conceptos']
PAGINAS += sorted(str(p.parent.relative_to(pub)) for p in (pub / 'analisis').glob('*/index.html'))
PAGINAS += sorted(str(p.parent.relative_to(pub)) for p in (pub / 'academia').glob('*/*/index.html'))
def limpio(h):
    h = re.sub(r'<(script|style|nav|form|svg|button|select)[^>]*>.*?</\1>', ' ', h, flags=re.S)
    return html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h))).strip()
filas = []
for p in PAGINAS:
    f = pub / p / 'index.html'
    if not f.exists():
        continue
    s = f.read_text()
    tit = limpio(re.search(r'<title>(.*?)</title>', s, re.S).group(1)).replace(' · ENTRE TODOS', '')
    m = re.search(r'<main[^>]*>(.*)</main>', s, re.S)
    cuerpo = m.group(1) if m else s
    partes = re.split(r'(?=<h2[\s>])', cuerpo)
    for i, parte in enumerate(partes):
        h2 = re.search(r'<h2[^>]*>(.*?)</h2>', parte, re.S)
        sec = limpio(h2.group(1)) if h2 else ''
        texto = limpio(parte)
        if len(texto) < 120:
            continue
        for j in range(0, len(texto), 1800):
            trozo = texto[j:j + 1800]
            filas.append({'id': f'pagina:{p or "inicio"}:{i}:{j // 1800}', 'tipo': 'pagina',
                          'titulo': f'{tit}{" — " + sec if sec and sec.lower() not in tit.lower() else ""}'[:200],
                          'texto': f'Página del sitio ENTRE TODOS: {tit}. {trozo}', 'url': f'/{p}/' if p else '/', 'meta': {}})
json.dump(filas, open(sys.argv[2], 'w'), ensure_ascii=False)
print(len(filas), 'secciones de', len(PAGINAS), 'páginas')
