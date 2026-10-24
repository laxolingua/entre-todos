"""Tarjetas para compartir las propuestas (Cuba) en redes: una general por ficha y una por cada opción de voto.
- og/propuesta/<id>.jpg            general: «¿Tú qué piensas? Vota en entre-todos.org»
- og/propuesta/<id>-v<n>.jpg       con la opción elegida: «Yo voté: A favor. ¿Y tú?»
- propuesta/<id>/mi-voto/<n>/      página mínima para compartir el voto propio (sus metadatos llevan
                                   la tarjeta con el voto) que lleva a la ficha
Además pone los metadatos de la ficha y el script del botón de compartir, que pregunta si incluir el voto.
Las imágenes se guardan en caché para no regenerarlas en cada publicación.
Uso: python3 og_propuestas.py <pubdir>"""
import sys, os, re, glob, html, hashlib, shutil, json
from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageEnhance, ImageFilter
P = sys.argv[1]
AQUI = os.path.dirname(os.path.abspath(__file__))
CACHE = '/tmp/claude-0/og-cache'
os.makedirs(CACHE, exist_ok=True)
VERSION = 'v4'
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
    W, H = 1200, 630
    im = Image.new('RGB', (W, H), M)
    try:
        f = ImageOps.fit(Image.open(foto).convert('L'), (560, H)); f = ImageEnhance.Contrast(f).enhance(1.1).filter(ImageFilter.GaussianBlur(0.8))
        im.paste(Image.merge('RGB', (f, f, f)), (W - 560, 0))
    except Exception:
        pass
    d = ImageDraw.Draw(im)
    x0, s = 700, int(H / 1.732)
    d.polygon([(0, 0), (x0, 0), (x0 - s, H), (0, H)], fill=M)
    d.polygon([(x0, 0), (x0 + 22, 0), (x0 + 22 - s, H), (x0 - s, H)], fill=R)
    d.polygon([(W - 70, H - 180), (W - 40, H - 180), (W - 110, H - 60), (W - 140, H - 60)], fill=A)
    d.text((56, 30), 'ENTRE', font=LOGO, fill=B); d.text((56, 66), 'TODOS', font=LOGO, fill=R)
    d.rectangle([182, 38, 186, 110], fill=A)
    d.text((204, 44), 'PROPUESTAS PARA', font=SUB, fill=B); d.text((204, 74), 'UNA NUEVA CUBA', font=SUB, fill=B)
    d.text((56, 134), cat.upper(), font=CAT, fill=A)
    y = 168
    for tam in (64, 56, 50, 44):
        ft = fnt('BarlowCondensed-800.ttf', tam); ls = lineas(d, tit.upper(), ft, 500)
        if len(ls) <= 3: break
    if len(ls) > 3: ls = ls[:3]; ls[-1] = ls[-1].rstrip('.,;:') + '…'
    for l in ls: d.text((56, y), l, font=ft, fill=B); y += int(tam * 1.03)
    y = max(y + 14, 370); x = 56
    for i, c in enumerate(COL):
        sel = voto == i + 1
        pts = [(x + 12, y), (x + 92, y), (x + 80, y + 36), (x, y + 36)]
        d.polygon(pts, fill=A if sel else c)
        if sel: d.polygon(pts, outline=B, width=3)
        x += 88
    d.text((56, y + 44), 'EN CONTRA', font=EXT, fill=(200, 210, 230))
    w = d.textlength('A FAVOR', font=EXT); d.text((56 + 88 * 5 - 12 - w, y + 44), 'A FAVOR', font=EXT, fill=(200, 210, 230))
    y += 84
    l1 = '¿TÚ QUÉ PIENSAS?' if not voto else f'YO VOTÉ: {OPC[voto - 1].upper()}. ¿Y TÚ?'
    l2 = 'VOTA EN ENTRE-TODOS.ORG'
    ancho = max(d.textlength(l1, font=CTA), d.textlength(l2, font=CTA2)) + 36
    d.rectangle([56, y, 56 + ancho, y + 96], fill=A)
    d.text((74, y + 4), l1, font=CTA, fill=M)
    d.text((74, y + 54), l2, font=CTA2, fill=M)
    im.save(dest, quality=75, optimize=True, progressive=True)

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
SCRIPT = """<script>(function(){var OPC=%s,ID=%s,T=%s,BASE=(/(^|\.)entre-todos\.org$/.test(location.hostname)?'%s':location.origin+(location.pathname.indexOf('/entre-todos-preview/')===0?'/entre-todos-preview':''))+'/propuesta/'+ID+'/';
function url(v){return v?BASE+'mi-voto/'+v+'/':BASE}
function texto(v){return v?'Yo voté «'+OPC[v-1]+'» en esta propuesta para una nueva Cuba: '+T+'. ¿Y tú? Vota en ENTRE TODOS: '+url(v):T+'. Propuesta para una nueva Cuba. ¿Tú qué piensas? Vota en ENTRE TODOS: '+url(0)}
function abrir(red,v){var h=red==='fb'?'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(url(v)):'https://wa.me/?text='+encodeURIComponent(texto(v));window.open(h,'_blank','noopener')}
document.querySelectorAll('a[href*="facebook.com/sharer"],a[href*="wa.me/"]').forEach(function(a){var red=a.href.indexOf('wa.me')>-1?'wa':'fb';
a.addEventListener('click',function(e){var v=+(document.documentElement.dataset.miVoto||0);e.preventDefault();if(!v){abrir(red,0);return}
var p=document.getElementById('et-compartir');if(p)p.remove();p=document.createElement('div');p.id='et-compartir';p.className='et-compartir panel';
p.innerHTML='<p><b>¿Qué quieres compartir?</b></p><div class="acciones"><button type="button" class="boton" data-o="0">Solo la propuesta</button><button type="button" class="boton marino" data-o="1">La propuesta y mi voto («'+OPC[v-1]+'»)</button></div>';
a.closest('.acciones,div').insertAdjacentElement('afterend',p);
p.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){abrir(red,b.dataset.o==='1'?v:0);p.remove()})})})})})();</script>
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
    con_cache(foto, cat, titulo, f'{P}/og/propuesta/{pid}.jpg')
    img = f'{SITIO}/og/propuesta/{pid}.jpg'
    for k, v in (('og:image', img), ('twitter:image', img)):
        t = meta(t, k, v, nombre=k.startswith('twitter'))
    t = meta(t, 'og:description', DESC); t = meta(t, 'twitter:description', DESC, nombre=True)
    if 'et-compartir' not in t:
        t = t.replace('</body>', SCRIPT % (json.dumps(OPC, ensure_ascii=False), json.dumps(pid), json.dumps(titulo, ensure_ascii=False), SITIO) + '</body>', 1)
    open(f, 'w', encoding='utf-8').write(t)
    for v in range(1, 6):
        con_cache(foto, cat, titulo, f'{P}/og/propuesta/{pid}-v{v}.jpg', v)
        d = f'{P}/propuesta/{pid}/mi-voto/{v}'
        os.makedirs(d, exist_ok=True)
        open(f'{d}/index.html', 'w', encoding='utf-8').write(PAGINA_VOTO.format(
            titulo_og=html.escape(f'Yo voté «{OPC[v - 1]}»: {titulo}', quote=True), titulo=html.escape(titulo),
            url=f'{SITIO}/propuesta/{pid}/mi-voto/{v}/', img=f'{SITIO}/og/propuesta/{pid}-v{v}.jpg',
            ficha=f'/propuesta/{pid}/', ficha_abs=f'{SITIO}/propuesta/{pid}/'))
    hechas += 1
print('tarjetas para compartir en', hechas, 'propuestas')
