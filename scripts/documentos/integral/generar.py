"""Documento integral de propuestas de ENTRE TODOS, generado desde el banco publicado.
Uso: python3 generar.py /tmp/pub salida.html   (después, pdf.js convierte a PDF)"""
import sys, json, csv, re, html, datetime
from bs4 import BeautifulSoup
P, OUT = sys.argv[1], sys.argv[2]
e = lambda t: html.escape(str(t or ''))
datos = json.load(open(f'{P}/datos/propuestas.json'))['propuestas']
docs = list(csv.DictReader(open(f'{P}/datos/documentos.csv', encoding='utf-8-sig')))
VOZ = 'VOZ | Cuba, Programa de propuestas (ed. 0.4.2, 2026), en preparación para su publicación'
def fuente(t): return VOZ if 'interno' in t.lower() else t

TITULOS = [
 ('I', 'Cómo empieza y cómo se conduce la transición', ['Transición Democrática']),
 ('II', 'Constitución y poderes del Estado', ['Proceso Constituyente']),
 ('III', 'Derechos y libertades', ['Derechos y Libertades']),
 ('IV', 'Sistema electoral', ['Sistema Electoral']),
 ('V', 'Modelo de país y forma de gobierno', ['Plataforma de Gobierno']),
 ('VI', 'Economía, trabajo y reconstrucción', ['Economía', 'Trabajo y Seguridad Social', 'Reconstrucción Nacional']),
 ('VII', 'Sociedad, educación, salud y familia', ['Sociedad Civil', 'Educación', 'Salud', 'Familia, Niñez y Juventud', 'Género e Igualdad', 'Tercera Edad', 'Vivienda y Urbanismo', 'Alimentación y Agro']),
 ('VIII', 'Animales y medio ambiente', ['Protección Animal y Biodiversidad', 'Medio Ambiente']),
]
# Derechos y garantías que no se votan (criterio del Método, sección 4). Lista propuesta para aprobación.
DERECHOS = {'presos-politicos', 'despenalizacion-disenso', 'legalizacion-organizaciones', 'pluripartidismo', 'elecciones-libres',
 'libertad-expresion', 'libertad-reunion-asociacion', 'libertad-religiosa', 'libre-movilidad', 'acceso-informacion-internet',
 'inviolabilidad-intimidad', 'igualdad-y-no-discriminacion', 'debido-proceso', 'amparo-y-garantias', 'carta-de-derechos',
 'pactos-ddhh', 'dignidad-humana', 'independencia-judicial', 'diaspora-derechos-plenos', 'libertad-sindical'}

def ficha(id):
    s = BeautifulSoup(open(f'{P}/propuesta/{id}/index.html', encoding='utf-8').read(), 'html.parser')
    inc = []
    sec = s.find('section', attrs={'aria-labelledby': 't-incisos'})
    if sec:
        for li in sec.select('ol.incisos > li'):
            p = li.find('p'); inc.append(p.get_text(' ', strip=True) if p else '')
    var = []
    sec = s.find('section', attrs={'aria-labelledby': 't-variantes'})
    if sec:
        for tr in sec.select('tbody tr'):
            td = tr.find('td'); var.append(td.get_text(' ', strip=True))
    d = s.select_one('p.desde-anio'); desde = re.search(r'(\d{4})', d.get_text()) if d else None
    return inc, var, (desde.group(1) if desde else '')

# Cuestiones abiertas tal como están en el sitio
cs = BeautifulSoup(open(f'{P}/cuestiones/index.html', encoding='utf-8').read(), 'html.parser')
cuestiones = []
for sec in cs.select('section[id]'):
    h = sec.find(['h2', 'h3'])
    if not h: continue
    ids = list(dict.fromkeys(a['href'].rstrip('/').split('/')[-1] for a in sec.select('a[href*="/propuesta/"]')))
    if not ids: continue
    p = sec.find('p'); cuestiones.append({'id': sec['id'], 'q': h.get_text(' ', strip=True), 'txt': p.get_text(' ', strip=True) if p else '', 'ids': ids})

orden = []; art = {}
for num, tit, cats in TITULOS:
    ps = [p for c in cats for p in datos if p['categoria'] == c]
    for p in ps: orden.append((num, p)); art[p['id']] = len(orden)
assert len(orden) == len(datos), (len(orden), len(datos))
cq = {}
for i, c in enumerate(cuestiones, 1):
    for pid in c['ids']: cq.setdefault(pid, []).append(i)

hoy = datetime.date.today().strftime('%d/%m/%Y')
H = [f'''<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Texto íntegro del banco de propuestas · ENTRE TODOS</title>
<link rel="stylesheet" href="estilo.css"></head><body>
<section class="portada">
 <div class="logo">Entre<b>Todos</b></div>
 <p class="estado">Borrador para revisión · v0.2</p>
 <h1>Texto íntegro del banco de propuestas</h1>
 <p class="sub">Las {len(datos)} propuestas de la sociedad civil cubana reunidas por ENTRE TODOS, en un solo documento</p>
 <dl class="ficha"><div><dt>Fecha</dt><dd>{hoy}</dd></div><div><dt>Propuestas</dt><dd>{len(datos)}</dd></div><div><dt>Documentos fuente</dt><dd>{len(docs)}</dd></div><div><dt>Cuestiones abiertas</dt><dd>{len(cuestiones)}</dd></div></dl>
 <ol class="indice">''' + ''.join(f'<li><span>{n}</span>{e(t)}</li>' for n, t, _ in TITULOS) + '''<li><span>A</span>Anexo A: fuentes de cada artículo</li><li><span>B</span>Anexo B: documentos fuente</li></ol>
</section>
<section class="preambulo"><h2>Preámbulo</h2>
<p>Este documento reúne en un solo texto todas las propuestas del banco de ENTRE TODOS, que en el sitio se presentan por categorías. Cada propuesta es un artículo. Recoge lo que ya han propuesto organizaciones y autores cubanos, de la isla y del exilio, en documentos públicos. Que una propuesta figure aquí no significa que ENTRE TODOS la respalde.</p>
<p><strong>Primero la idea.</strong> En el cuerpo del texto no aparece ningún nombre de organización ni de autor. Las fuentes de cada artículo están en el Anexo A.</p>
<p><strong>Derechos que no se votan.</strong> Los derechos humanos y las garantías democráticas fundamentales no se someten a votación sobre su existencia. Llevan la marca <span class="marca-d">Derecho fundamental</span>. Lo que se puede valorar es el cómo: sus incisos y modalidades.</p>
<p><strong>Desacuerdos a la vista.</strong> Donde las fuentes proponen caminos distintos no se elige uno: las cuestiones abiertas muestran las opciones lado a lado.</p>
<p><strong>Fidelidad.</strong> La redacción de cada artículo es de ENTRE TODOS y conserva el lenguaje de las fuentes. Los incisos y modalidades proceden de los documentos y no se suavizan. No se incluyen documentos del Estado cubano ni del Partido Comunista.</p>
<p><strong>Límite.</strong> Este documento no mide apoyo. Cuánto respaldo tiene cada propuesta lo dirá la participación en entre-todos.org cuando esté habilitada.</p>
</section>
<section class="cuestiones"><h2>Cuestiones abiertas</h2>''']
for i, c in enumerate(cuestiones, 1):
    nota = ''
    if any(x in DERECHOS for x in c['ids']):
        nota = '<p class="nota-d">Esta cuestión toca un derecho fundamental. El derecho en sí no se vota; lo que se recoge es el desacuerdo entre las fuentes sobre su alcance.</p>'
    H.append(f'<div class="cuestion"><p class="cq-n">Cuestión {i}</p><h3>{e(c["q"])}</h3><p>{e(c["txt"])}</p>{nota}<ul>' +
             ''.join(f'<li>Art. {art[x]}. {e(next(p["titulo"] for p in datos if p["id"] == x))}</li>' for x in c['ids'] if x in art) + '</ul></div>')
H.append('</section>')
actual = None
for n, (num, p) in enumerate(orden, 1):
    if num != actual:
        actual = num; t = next(t for a, t, _ in TITULOS if a == num); k = sum(1 for x, _ in orden if x == num)
        H.append(f'<h2 class="titulo"><span>Título {num}</span>{e(t)}<small>{k} artículos</small></h2>')
    inc, var, desde = ficha(p['id'])
    mk = '<span class="marca-d">Derecho fundamental: no se somete a votación</span>' if p['id'] in DERECHOS else ''
    meta = [f'{p["documentos"]} {"documento" if str(p["documentos"]) == "1" else "documentos"}']
    if desde: meta.append(f'documentada desde {desde}')
    if p['id'] in cq: meta.append(' · '.join(f'cuestión abierta {i}' for i in cq[p['id']]))
    H.append(f'<article><h4>Artículo {n}. {e(p["titulo"])}</h4>{mk}<p class="texto">{e(p["texto"])}</p>')
    if inc: H.append('<p class="sub-h">Incisos que añaden las fuentes</p><ol class="inc" type="a">' + ''.join(f'<li>{e(x)}</li>' for x in inc) + '</ol>')
    if var: H.append('<p class="sub-h">Modalidades en que difieren las fuentes</p><ul class="var">' + ''.join(f'<li>{e(x)}</li>' for x in var) + '</ul>')
    H.append(f'<p class="meta">{" · ".join(meta)} · Anexo A</p></article>')
H.append('<section class="anexo"><h2 class="titulo"><span>Anexo A</span>Fuentes de cada artículo</h2><table><thead><tr><th>Art.</th><th>Docs.</th><th>Fuentes</th></tr></thead><tbody>')
for n, (num, p) in enumerate(orden, 1):
    fs = ' · '.join(dict.fromkeys(fuente(x.strip()) for x in (p.get('planteada_por') or '').split('·') if x.strip()))
    H.append(f'<tr><td>{n}</td><td>{e(p["documentos"])}</td><td>{e(fs)}</td></tr>')
H.append('</tbody></table></section>')
H.append('<section class="anexo"><h2 class="titulo"><span>Anexo B</span>Documentos fuente</h2><p>Documentos públicos de los que salen las propuestas, con su año y enlace al original.</p><table><thead><tr><th>Año</th><th>Documento</th><th>Tipo</th></tr></thead><tbody>')
for d in sorted(docs, key=lambda d: (d.get('anio') or '9999', d['documento'])):
    nom = fuente(d['documento']) if 'interno' in (d.get('tipo') or '').lower() else d['documento']
    tipo = 'Programa en preparación' if 'interno' in (d.get('tipo') or '').lower() else d.get('tipo', '')
    link = f' <a href="{e(d["enlace"])}">{e(re.sub(r"^https?://(www\\.)?", "", d["enlace"]).split("/")[0])}</a>' if d.get('enlace') else ''
    H.append(f'<tr><td>{e(d.get("anio"))}</td><td>{e(nom)}{link}</td><td>{e(tipo)}</td></tr>')
H.append('</tbody></table><p class="cierre">ENTRE TODOS · entre-todos.org · contacto.entretodos@gmail.com<br>Correcciones: cualquier organización o autor puede pedir que se corrija la atribución o el texto de una propuesta escribiendo a esa dirección.</p></section></body></html>')
open(OUT, 'w', encoding='utf-8').write('\n'.join(H))
print(len(orden), 'artículos ·', len(cuestiones), 'cuestiones ·', sum(1 for _, p in orden if p['id'] in DERECHOS), 'derechos marcados')
