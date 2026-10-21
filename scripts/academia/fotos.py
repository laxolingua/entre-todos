# Prepara las imágenes de las lecciones: «2.1 reunion.png» → web/public/img/academia/sin-permiso-previo.jpg
# Blanco y negro, 1600 px de ancho, JPEG 80 progresivo. Uso: python3 fotos.py <carpeta con las imágenes>
import sys, re, pathlib
from PIL import Image, ImageOps
IDS = {
 '1.1':'universales','1.2':'democracias','1.3':'cuba-2019','1.4':'practica',
 '2.1':'sin-permiso-previo','2.2':'limites-distintos','2.3':'prensa-independiente','2.4':'internet-y-expresion',
 '3.1':'nadie-por-encima','3.2':'jueces-independientes','3.3':'juicio-justo','3.4':'practica-justicia',
 '4.1':'separacion-de-poderes','4.2':'elecciones-y-alternancia','4.3':'transparencia','4.4':'prensa-y-organizaciones',
 '5.1':'conciencia-y-culto','5.2':'estado-y-religion','5.3':'minorias-religiosas','5.4':'practica-religion',
 '6.1':'asociarse-libremente','6.2':'registro-y-financiacion','6.3':'organizaciones-en-cuba','6.4':'participar-con-seguridad',
 '7.1':'que-es-un-argumento','7.2':'construir-un-argumento','7.3':'contraargumentos','7.4':'evidencia','7.5':'credibilidad-de-las-fuentes',
 '7.6':'como-citar','7.7':'falacias','7.8':'sesgos-y-bulos','7.9':'ia-con-criterio',
 '8.1':'reformular-el-problema','8.2':'generar-alternativas','8.3':'inventar-o-resolver',
 '9.1':'que-hace-que-algo-este-bien','9.2':'fines-y-medios','9.3':'circulo-moral',
 '10.1':'soluciones-que-empeoran','10.2':'modelo-del-iceberg','10.3':'puntos-de-palanca',
 '11.1':'que-es-educacion-humana','11.2':'discrepar-sin-humillar','11.3':'el-precio-real',
 '12.1':'que-es-ser-solucionario','12.2':'marco-solucionario','12.3':'de-la-solucion-a-la-propuesta'}
out = pathlib.Path(__file__).resolve().parents[2] / 'web/public/img/academia'; out.mkdir(parents=True, exist_ok=True)
for f in sorted(pathlib.Path(sys.argv[1]).iterdir()):
    m = re.match(r'(\d+\.\d+)', f.name)
    if not m or m.group(1) not in IDS: continue
    im = ImageOps.grayscale(Image.open(f).convert('RGB'))
    if im.width > 1600: im = im.resize((1600, round(im.height * 1600 / im.width)), Image.LANCZOS)
    im.save(out / f'{IDS[m.group(1)]}.jpg', 'JPEG', quality=80, progressive=True, optimize=True)
    print(m.group(1), '→', IDS[m.group(1)], im.size)
