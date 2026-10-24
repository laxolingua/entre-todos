"""Genera un subconjunto local de Flaticon UIcons (bold rounded) con solo los iconos usados.
Uso: python3 iconos.py <carpeta_paquete_uicons> <salida_public> <dir_html> [<dir_html> ...]
Evita cargar la fuente desde un CDN externo (privacidad) y reduce ~350 KB a unos pocos KB."""
import re, sys, os, glob
from fontTools import subset
pkg, salida, *dirs = sys.argv[1:]
css = open(os.path.join(pkg, 'css/bold/rounded.css'), encoding='utf-8').read()
mapa = dict(re.findall(r'\.fi-br-([a-z0-9-]+):before\{content:"\\([0-9a-f]+)"\}', css))
usados = set()
for d in dirs:
    for f in glob.glob(os.path.join(d, '**/*.html'), recursive=True) + glob.glob(os.path.join(d, '**/*.astro'), recursive=True) + glob.glob(os.path.join(d, '**/*.js'), recursive=True) + glob.glob(os.path.join(d, '**/*.json'), recursive=True):
        usados |= set(re.findall(r'fi-br-([a-z0-9-]+)', open(f, encoding='utf-8', errors='ignore').read()))
usados = sorted(n for n in usados if n in mapa)
fuente = glob.glob(os.path.join(pkg, 'css/uicons-bold-rounded-*.woff2'))[0]
os.makedirs(os.path.join(salida, 'fonts'), exist_ok=True)
destino = os.path.join(salida, 'fonts/uicons-br.woff2')
opts = subset.Options(); opts.flavor = 'woff2'; opts.layout_features = []
fnt = subset.load_font(fuente, opts)
s = subset.Subsetter(opts); s.populate(unicodes=[int(mapa[n], 16) for n in usados]); s.subset(fnt)
subset.save_font(fnt, destino, opts)
reglas = ''.join(f'.fi-br-{n}:before{{content:"\\{mapa[n]}"}}' for n in usados)
import hashlib
ver = hashlib.md5(open(destino, 'rb').read()).hexdigest()[:8]
open(os.path.join(salida, 'fonts/uicons-br.css'), 'w').write(
    '@font-face{font-family:uicons-br;src:url(/fonts/uicons-br.woff2?v=' + ver + ') format("woff2");font-display:swap}'
    'i[class^=fi-br-]:before,i[class*=" fi-br-"]:before,span[class^=fi-br-]:before,span[class*=" fi-br-"]:before'
    '{font-family:uicons-br!important;font-style:normal;font-weight:400!important;font-variant:normal;text-transform:none;line-height:1;-webkit-font-smoothing:antialiased}'
    + reglas)
print(len(usados), 'iconos ·', os.path.getsize(destino), 'bytes')
