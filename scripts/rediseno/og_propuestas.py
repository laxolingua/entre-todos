"""Tarjeta para compartir cada propuesta (Cuba) en redes: og/propuesta/<id>.jpg con «¿Tú qué piensas? Vota en entre-todos.org».
Pone los metadatos de la ficha y el script de los botones de compartir (siempre la ficha general:
el voto se puede cambiar, así que no se comparte la opción votada).
Las imágenes se guardan en caché para no regenerarlas en cada publicación.
Uso: python3 og_propuestas.py <pubdir>"""
import sys, os, re, glob, html, hashlib, shutil, json
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance, ImageFilter
P = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
CACHE = '/tmp/claude-0/og-cache'
os.makedirs(CACHE, exist_ok=True)
VERSION = 'v6'
SITIO = 'https://entre-todos.org'
F = os.path.join(AQUI, 'fuentes')
def fnt(n, s): return ImageFont.truetype(os.path.join(F, n), s)
LOGO = fnt('BarlowCondensed-800.ttf', 44); SUB = fnt('Barlow-500.ttf', 22); CAT = fnt('Barlow-500.ttf', 22)
CTA = fnt('BarlowCondensed-800.ttf', 42); CTA2 = fnt('BarlowCondensed-800.ttf', 30); EXT = fnt('Barlow-500.ttf', 18)
M, R, A, B = (11, 29, 63), (215, 25, 45), (244, 194, 13), (255, 255, 255)
OPC = ['Muy en contra', 'En contra', 'Neutral', 'A favor', 'Muy a favor']
COL = [(242, 201, 206), (250, 226, 229), (236, 238, 242), (214, 221, 235), (178, 193, 222)]

def lineas(d, t, f, w):
    out, l = [], ''
    for p in t.split():
        q = (l + ' ' + p).strip()
        if d.textlength(q, font=f) > w and l: out.append(l); l = p
        else: l = q
    out.append(l); return out

def tarjeta(foto, cat, tit, dest, voto=0):
    """Tarjeta al estilo de los banners del sitio (aprobada por Mitch el 24/10/2026): tarjeta blanca con
    bordes redondos sobre fondo gris claro, foto en diagonal a la derecha y triángulo marino con puntos."""
    W, H, S, MG = 1200, 630, 2, 24          # S: supermuestreo para bordes suaves; MG: margen de la tarjeta
    w, h = (W - 2 * MG) * S, (H - 2 * MG) * S
    card = Image.new('RGB', (w, h), B); d = ImageDraw.Draw(card)
    fx = 556 * S
    try:
        f = ImageOps.fit(Image.open(foto).convert('L'), (w - fx, h)); f = ImageEnhance.Contrast(f).enhance(1.12)
        m = Image.new('L', f.size, 0); ImageDraw.Draw(m).polygon([(int(h / 1.732), 0), (f.size[0], 0), (f.size[0], f.size[1]), (0, f.size[1])], fill=255)
        card.paste(Image.merge('RGB', (f, f, f)), (fx, 0), m)
    except Exception:
        pass
    tri = Image.new('RGB', (w, h), M); dt = ImageDraw.Draw(tri)
    for yy in range(0, h, 14 * S):
        for xx in range(0, w, 14 * S): dt.ellipse([xx, yy, xx + 2 * S, yy + 2 * S], fill=(60, 78, 118))
    mt = Image.new('L', (w, h), 0); ImageDraw.Draw(mt).polygon([(w, h - 300 * S), (w, h), (w - int(300 * S / 1.732 * 1.15), h)], fill=255)
    card.paste(tri, (0, 0), mt)
    d = ImageDraw.Draw(card)
    TX = fnt('BarlowCondensed-800.ttf', 30 * S)
    for k, pal in enumerate(['PROPONER', 'VALORAR', 'VOTAR']):
        d.text((w - 158 * S, h - 128 * S + k * 33 * S), pal, font=TX, fill=B)
    d.rectangle([w - 158 * S, h - 22 * S, w - 108 * S, h - 17 * S], fill=R)
    x = 48 * S
    LG = fnt('BarlowCondensed-800.ttf', 40 * S); SB = fnt('Barlow-500.ttf', 20 * S)
    d.text((x, 24 * S), 'ENTRE', font=LG, fill=M); d.text((x, 57 * S), 'TODOS', font=LG, fill=R)
    d.rectangle([166 * S, 32 * S, 170 * S, 96 * S], fill=A)
    d.text((186 * S, 38 * S), 'PROPUESTAS PARA', font=SB, fill=M); d.text((186 * S, 66 * S), 'UNA NUEVA CUBA', font=SB, fill=M)
    d.rectangle([x, 136 * S, x + 64 * S, 143 * S], fill=A)
    d.text((x, 156 * S), cat.upper(), font=fnt('Barlow-500.ttf', 21 * S), fill=R)
    y = 188 * S
    for tam in (62, 55, 49, 44):
        ft = fnt('BarlowCondensed-800.ttf', tam * S); ls = lineas(d, tit.upper(), ft, 480 * S)
        if len(ls) <= 3: break
    for l in ls[:3]: d.text((x, y), l, font=ft, fill=M); y += tam * S
    y = max(y + 18 * S, 388 * S); xx = x
    if voto == -1:   # derecho fundamental: no se vota, no lleva escala
        DF = fnt('BarlowCondensed-800.ttf', 26 * S)
        d.rectangle([x, y + 4 * S, x + 6 * S, y + 46 * S], fill=R)
        d.text((x + 18 * S, y + 2 * S), 'DERECHO FUNDAMENTAL', font=DF, fill=M)
        d.text((x + 18 * S, y + 30 * S), 'No se vota: se garantiza.', font=fnt('Barlow-500.ttf', 18 * S), fill=(95, 107, 128))
        y += 70 * S; C1 = fnt('BarlowCondensed-800.ttf', 30 * S); t1 = '¿CÓMO GARANTIZARLO? LÉELO EN ENTRE-TODOS.ORG'
        d.rectangle([x, y, x + d.textlength(t1, font=C1) + 32 * S, y + 50 * S], fill=R); d.text((x + 16 * S, y + 7 * S), t1, font=C1, fill=B)
        COL_ = []
    else:
        COL_ = COL
    for c in COL_:
        d.polygon([(xx + 11 * S, y), (xx + 82 * S, y), (xx + 71 * S, y + 30 * S), (xx, y + 30 * S)], fill=c); xx += 78 * S
    EX = fnt('Barlow-500.ttf', 16 * S)
    if voto != -1:
      d.text((x, y + 36 * S), 'EN CONTRA', font=EX, fill=(95, 107, 128))
      wf = d.textlength('A FAVOR', font=EX); d.text((x + 78 * 5 * S - 11 * S - wf, y + 36 * S), 'A FAVOR', font=EX, fill=(95, 107, 128))
      y += 70 * S; C1 = fnt('BarlowCondensed-800.ttf', 30 * S); t1 = '¿TÚ QUÉ PIENSAS? VOTA EN ENTRE-TODOS.ORG'
      d.rectangle([x, y, x + d.textlength(t1, font=C1) + 32 * S, y + 50 * S], fill=R); d.text((x + 16 * S, y + 7 * S), t1, font=C1, fill=B)
    fondo = Image.new('RGB', (W * S, H * S), (233, 237, 243))
    sh = Image.new('L', (W * S, H * S), 0); ImageDraw.Draw(sh).rounded_rectangle([(MG + 6) * S, (MG + 10) * S, (W - MG - 2) * S, (H - MG + 6) * S], radius=30 * S, fill=45)
    sh = sh.filter(ImageFilter.GaussianBlur(18 * S)); fondo.paste((200, 206, 216), (0, 0), sh)
    mk = Image.new('L', (w, h), 0); ImageDraw.Draw(mk).rounded_rectangle([0, 0, w - 1, h - 1], radius=30 * S, fill=255)
    fondo.paste(card, (MG * S, MG * S), mk)
    fondo.resize((W, H), Image.LANCZOS).save(dest, quality=84, optimize=True, progressive=True)

def con_cache(foto, cat, tit, dest, voto=0):
    clave = hashlib.sha1(json.dumps([VERSION, foto, os.path.getmtime(foto) if os.path.exists(foto) else 0, cat, tit, voto]).encode()).hexdigest()
    c = os.path.join(CACHE, clave + '.jpg')
    if not os.path.exists(c): tarjeta(foto, cat, tit, c, voto)
    shutil.copyfile(c, dest)

def meta(t, prop, valor, nombre=False):
    attr = 'name' if nombre else 'property'
    pat = re.compile(r'<meta content="[^"]*" ' + attr + '="' + re.escape(prop) + '"/?>')
    nuevo = f'<meta content="{html.escape(valor, quote=True)}" {attr}="{prop}"/>'
    return pat.sub(nuevo, t, count=1) if pat.search(t) else t.replace('</head>', nuevo + '</head>', 1)

DESC = 'Propuesta para una nueva Cuba. ¿Tú qué piensas? Vota en entre-todos.org'
DESC_DERECHO = 'Derecho fundamental para una nueva Cuba: no se vota, se garantiza. ¿Cómo garantizarlo? Léelo en entre-todos.org'
SCRIPT = """<script>(function(){var OPC=%s,ID=%s,T=%s,BASE=(/(^|\.)entre-todos\.org$/.test(location.hostname)?'%s':location.origin+(location.pathname.indexOf('/entre-todos-preview/')===0?'/entre-todos-preview':''))+'/propuesta/'+ID+'/';
function url(v){return v?BASE+'mi-voto/'+v+'/':BASE}
function texto(v){return v?'Yo voté «'+OPC[v-1]+'» en esta propuesta para una nueva Cuba: '+T+'. ¿Y tú? Vota en ENTRE TODOS: '+url(v):T+'. Propuesta para una nueva Cuba. ¿Tú qué piensas? Vota en ENTRE TODOS: '+url(0)}
function abrir(red,v){var h=red==='fb'?'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url(v)):'https://wa.me/?text='+encodeURIComponent(texto(v));window.open(h,'_blank','noopener')}
document.querySelectorAll('a[href*="facebook.com/sharer"],a[href*="wa.me/"]').forEach(function(a){var red=a.href.indexOf('wa.me')>-1?'wa':'fb';
a.addEventListener('click',function(e){e.preventDefault();abrir(red,0)})})})();</script>
<style>.et-compartir{margin:12px 0;padding:14px 16px;border-left:5px solid #f4c20d}.et-compartir p{margin:0 0 10px}.et-compartir .acciones{display:flex;flex-wrap:wrap;gap:10px}.et-compartir .boton.marino{background:#0b1d3f;color:#fff;border-color:#0b1d3f}</style>"""

PAGINA_VOTO = """<!doctype html><html lang="es"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="robots" content="noindex"/><title>{titulo_og} · ENTRE TODOS</title>
<meta property="og:type" content="website"/><meta property="og:site_name" content="ENTRE TODOS"/><meta property="og:locale" content="es_ES"/>
<meta property="og:title" content="{titulo_og}"/><meta property="og:description" content="Propuesta para una nueva Cuba. ¿Y tú? Vota en entre-todos.org"/>
<meta property="og:url" content="{url}"/><meta property="og:image" content="{img}"/><meta property="og:image:width" content="1200"/><meta property="og:image:height" content="630"/>
<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:image" content="{img}"/>
<link rel="canonical" href="{ficha_abs}"/>
<style>body{{font:16px/1.5 system-ui,sans-serif;background:#0b1d3f;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;padding:16px;text-align:center}}a{{color:#f4c20d}}</style>
</head><body><p>Abriendo la propuesta… <a href="{ficha}">Ir a «{titulo}»</a></p>
<script>location.replace('{ficha}'.replace(/^\\//, location.pathname.match(/^\\/entre-todos-preview\\//) ? '/entre-todos-preview/' : '/'))</script></body></html>"""

hechas = 0
os.makedirs(f'{P}/og/propuesta', exist_ok=True)
for f in sorted(glob.glob(f'{P}/propuesta/*/index.html')):
    pid = os.path.basename(os.path.dirname(f))
    t = open(f, encoding='utf-8').read()
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', t, re.S)
    if not h1: continue
    titulo = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', h1.group(1)))).strip()
    ca = re.search(r'class="antetitulo"[^>]*>([^<]+)<', t)
    cat = html.unescape(ca.group(1)).strip() if ca else 'Propuesta'
    im = re.search(r'<img[^>]*src="(/img/fotos/[^"]+)"', t)
    foto = os.path.join(P, (im.group(1) if im else '/img/fotos/propuestas.jpg').lstrip('/'))
    derecho = 'marca-derecho' in t
    con_cache(foto, cat, titulo, f'{P}/og/propuesta/{pid}.jpg', -1 if derecho else 0)
    img = f'{SITIO}/og/propuesta/{pid}.jpg'
    for k, v in (('og:image', img), ('twitter:image', img)):
        t = meta(t, k, v, nombre=k.startswith('twitter'))
    desc = DESC_DERECHO if derecho else DESC
    t = meta(t, 'og:description', desc); t = meta(t, 'twitter:description', desc, nombre=True)
    if 'et-compartir' not in t:
        t = t.replace('</body>', SCRIPT % (json.dumps(OPC, ensure_ascii=False), json.dumps(pid), json.dumps(titulo, ensure_ascii=False), SITIO) + '</body>', 1)
    open(f, 'w', encoding='utf-8').write(t)
    hechas += 1
print('tarjetas para compartir en', hechas, 'propuestas')
