"""Copia la vista previa (/tmp/pub) al repositorio entre-todos-preview y añade el prefijo /entre-todos-preview/ a las rutas.
Uso: python3 prefijo_preview.py <pub> <repo_preview> [archivo relativo ...]  (sin archivos: copia todo)."""
import os, re, sys, shutil
P = '/entre-todos-preview'
pub, dest, *archivos = sys.argv[1:]
def prefijar(s):
    s = re.sub(r'((?:href|src|action|srcset|content|poster)=")/(?!/|entre-todos-preview/)', r'\1' + P + '/', s)
    s = re.sub(r"(url\(['\"]?)/(?!/|entre-todos-preview/)", r'\1' + P + '/', s)
    s = re.sub(r"(fetch\([`'\"])/(?!/|entre-todos-preview/)", r'\1' + P + '/', s)
    s = re.sub(r'(url=)/(?!/|entre-todos-preview/)', r'\1' + P + '/', s)
    s = re.sub(r"(location\.(?:replace|assign)\(\s*[`'\"])/(?!/|entre-todos-preview/)", r'\1' + P + '/', s)
    s = re.sub(r"(location\.href\s*=\s*[`'\"])/(?!/|entre-todos-preview/)", r'\1' + P + '/', s)
    return s
if not archivos:
    archivos = [os.path.relpath(os.path.join(d, f), pub) for d, dn, fs in os.walk(pub) if '.git' not in d.split(os.sep) for f in fs if f not in ('CNAME',)]
    archivos = [a for a in archivos if not a.startswith('.github')]
for a in archivos:
    o, t = os.path.join(pub, a), os.path.join(dest, a)
    os.makedirs(os.path.dirname(t), exist_ok=True)
    if a.endswith(('.html', '.css', '.js')):
        open(t, 'w', encoding='utf-8').write(prefijar(open(o, encoding='utf-8').read()))
    else:
        shutil.copy(o, t)
open(os.path.join(dest, '.nojekyll'), 'w').close()  # sin esto Pages no sirve _astro y los scripts fallan
print(len(archivos), 'archivos')
