"""Copia la vista previa a una carpeta con enlaces relativos (para publicarla como artefacto privado).
Uso: python3 vista_previa.py <pubdir> <salida>. Escribe <salida>/lista.json con los archivos."""
import os, re, sys, shutil, json
P, S = sys.argv[1:]
shutil.rmtree(S, ignore_errors=True); os.makedirs(S)
INCL = ['_astro', 'fonts', 'img', 'academia', 'actores', 'abrazos', 'consulta', 'constituyente', 'cual-es-el-plan', 'cuestiones', 'datos', 'diversidad-politica', 'fuentes', 'metodo', 'perfil', 'privacidad', 'propuesta', 'propuestas', 'reconstruccion', 'cuba-eeuu', 'seguridad', 'sobre']
for d in INCL: shutil.copytree(f'{P}/{d}', f'{S}/{d.replace("_astro", "astro")}')
for f in ['index.html', 'favicon.svg', 'favicon.png', 'apple-touch-icon.png', 'og-consulta.jpg']: shutil.copy(f'{P}/{f}', f'{S}/{f}')
def fix(rel):
    rel = rel.rstrip('/')
    if rel == '' or os.path.isdir(os.path.join(S, rel)): rel = (rel + '/' if rel else '') + 'index.html'
    return rel
for dp, _, fs in os.walk(S):
    for f in fs:
        if not f.endswith(('.html', '.css')): continue
        p = os.path.join(dp, f); s = open(p, encoding='utf-8').read().replace('/_astro/', '/astro/')
        d = os.path.relpath(dp, S); up = '' if d == '.' else '../' * (d.count('/') + 1)
        def rep(m):
            a, q, url = m.groups()
            if url.startswith('//'): return m.group(0)
            path, sep, rest = re.match(r'([^#?]*)([#?]?)(.*)', url[1:]).groups()
            return f'{a}{q}{up}{fix(path)}{sep}{rest}'
        s = re.sub(r'((?:href|src|action)=)(["\'])(/[^"\']*)', rep, s)
        s = re.sub(r'(url\()(["\']?)(/[^)"\']*)', rep, s)
        open(p, 'w', encoding='utf-8').write(s)
lista = sorted(os.path.relpath(os.path.join(d, f), S) for d, _, fs in os.walk(S) for f in fs if not (d == S and f == 'index.html'))
json.dump(lista, open(f'{S}/../lista.json', 'w'))
print(len(lista), 'archivos')
