"""Imagen para compartir (1200x630) de cada página que aún usa la genérica /og/banco.png.
Toma la foto de la cabecera (Banda) y el título de la página, y escribe /og/auto/<ruta>.jpg.
Uso: python3 og.py <pubdir>"""
import sys, os, glob, re, html
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance
P = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
TIT = ImageFont.truetype(os.path.join(AQUI, 'fuentes/BarlowCondensed-800.ttf'), 76)
PEQ = ImageFont.truetype(os.path.join(AQUI, 'fuentes/Barlow-500.ttf'), 30)
MARINO, ROJO, AMARILLO = (11, 29, 63), (215, 25, 45), (244, 194, 13)
LOGO = os.path.join(P, 'img/logo-entre-todos.png')
cache = {}

def lineas(texto, ancho):
    d = ImageDraw.Draw(Image.new('L', (1, 1))); out, l = [], ''
    for w in texto.split():
        p = (l + ' ' + w).strip()
        if d.textlength(p, font=TIT) > ancho and l: out.append(l); l = w
        else: l = p
    out.append(l); return out[:3]

def hacer(foto, titulo, destino):
    W, H = 1200, 630
    im = Image.new('RGB', (W, H), MARINO)
    try:
        f = ImageOps.fit(Image.open(foto).convert('L'), (720, H)); f = ImageEnhance.Contrast(f).enhance(1.05)
        im.paste(Image.merge('RGB', (f, f, f)), (W - 720, 0))
    except Exception:
        pass
    d = ImageDraw.Draw(im)
    # Panel marino con el borde en diagonal «/» (60°), como la cabecera del sitio.
    d.polygon([(0, 0), (700, 0), (700 - int(H / 1.732), H), (0, H)], fill=MARINO)
    d.polygon([(700, 0), (724, 0), (724 - int(H / 1.732), H), (700 - int(H / 1.732), H)], fill=ROJO)
    d.rectangle([60, 70, 150, 80], fill=ROJO)
    y = 120
    for l in lineas(titulo.upper(), 470): d.text((60, y), l, font=TIT, fill='white'); y += 80
    d.rectangle([60, y + 14, 120, y + 22], fill=AMARILLO)
    d.text((60, H - 70), 'entre-todos.org', font=PEQ, fill=(223, 230, 245))
    if os.path.exists(LOGO):
        lg = Image.open(LOGO).convert('RGBA'); lg.thumbnail((88, 88)); im.paste(lg, (W - 120, H - 120), lg)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    im.save(destino, quality=84, optimize=True)

n = 0
for f in glob.glob(f'{P}/**/index.html', recursive=True):
    t = open(f, encoding='utf-8').read()
    if '/og/banco.png' not in t: continue
    m = re.search(r'<section class="banda">.*?<img src="([^"]+)"', t, re.S)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', t, re.S)
    if not m or not h1: continue
    foto = os.path.join(P, m.group(1).lstrip('/'))
    titulo = html.unescape(re.sub(r'<[^>]+>', ' ', h1.group(1)))
    titulo = re.sub(r'\s+', ' ', titulo).strip()
    rel = os.path.relpath(os.path.dirname(f), P).replace(os.sep, '-')
    rel = 'inicio' if rel == '.' else rel
    destino = f'{P}/og/auto/{rel}.jpg'
    hacer(foto, titulo, destino)
    t = t.replace('/og/banco.png', f'/og/auto/{rel}.jpg')
    open(f, 'w', encoding='utf-8').write(t); n += 1
print('imágenes para compartir', n)
