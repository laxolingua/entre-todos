"""Añade «Qué dicen las encuestas» a las fichas de propuesta de la vista previa.
Uso: python3 encuestas.py /tmp/pub   (después de anios.py)
Datos: web/src/data/encuestas.json (desde 021 IN). Nunca suma ni promedia."""
import json, sys, pathlib, html, re
pub = pathlib.Path(sys.argv[1])
d = json.load(open(pathlib.Path(__file__).resolve().parents[2] / 'web/src/data/encuestas.json'))
TIPO = {'representativa': 'Muestra representativa', 'abierta': 'Sondeo abierto', 'firmas': 'Firmas'}
banco = json.load(open(pathlib.Path(__file__).resolve().parents[2] / 'web/src/data/banco-encuestas.json'))
MET = {'aleatoria': 'Muestra aleatoria', 'panel': 'Panel en línea', 'abierta': 'Abierta en línea', 'redes': 'Redes sociales'}
por = {}
for q in d['preguntas']:
    for pid in q['propuestas']:
        por.setdefault(pid, []).append(q)
extra = {}
for b in banco['encuestas']:
    if b['id'] in d['encuestas']:
        continue  # ya aparece con sus preguntas detalladas
    for pid in b['propuestas']:
        extra.setdefault(pid, []).append(b)
e = lambda t: html.escape(t or '')
n = 0
for pid in sorted(set(por) | set(extra)):
    qs = por.get(pid, [])
    f = pub / 'propuesta' / pid / 'index.html'
    if not f.exists():
        continue
    items = ''
    for q in sorted(qs, key=lambda q: d['encuestas'][q['encuesta']]['fecha'][-4:]):
        s = d['encuestas'][q['encuesta']]
        dom = re.sub(r'^www\.', '', s['fuente'].split('/')[2])
        quien = f"Respuestas de quienes participaron" if s['tipo'] != 'representativa' else 'Resultado'
        items += (f'<li><p><strong>{e(s["nombre"])} · {e(s["fecha"])}</strong> <span class="etiqueta">{TIPO[s["tipo"]]}</span></p>'
                  f'<p class="discreto">{e(s["autor"])}. {e(s["poblacion"])}, {e(s["muestra"])}. {e(s["metodo"])}.</p>'
                  f'<blockquote>{e(q["pregunta"])}</blockquote><p>{quien}: {e(q["resultado"])}</p>'
                  + (f'<p class="discreto">{e(q["nota"])}</p>' if q.get('nota') else '')
                  + f'<p class="discreto"><a href="{e(s["fuente"])}" rel="noopener" target="_blank">{dom}</a></p></li>')
    mas = ''
    for b in sorted(extra.get(pid, []), key=lambda b: -b['anio']):
        enl = f'<a href="{e(b["url"])}"' + ('' if b['url'].startswith('/') else ' rel="noopener" target="_blank"') + f'>{e(b["titulo"])}</a>' if b['url'] else e(b['titulo'])
        mas += (f'<li class="m-{b["metodo"]}"><p class="be-mini-cifra"><strong>{e(b["dato"])}</strong> {e(b["datoTexto"])}</p>'
                f'<p class="discreto"><span class="be-mini-tag">{MET[b["metodo"]]}</span> {enl} · {e(b["autor"])}, {e(b["fecha"])}</p></li>')
    bloque = ('<section class="seccion encuestas-prop" id="encuestas"><h2>Qué dicen las encuestas</h2>'
              '<p class="discreto">Preguntas parecidas hechas por otros. No miden el texto de esta propuesta y no se suman entre sí.</p>'
              + (f'<ul class="enc-lista">{items}</ul>' if items else '')
              + (f'<ul class="be-mini">{mas}</ul>' if mas else '')
              + '<p><a class="enlace-flecha" href="/consulta/encuestas/">Ver el banco de encuestas <i class="fi fi-br-arrow-right" aria-hidden="true"></i></a></p></section>')
    s = f.read_text()
    s = re.sub(r'<section class="seccion encuestas-prop".*?</section>', '', s, flags=re.S)
    i = s.find('<section aria-labelledby="t-fuentes">')
    if i < 0:
        i = s.find('<section aria-labelledby="t-aportes"')
    if i < 0:
        continue
    s = s[:i] + bloque + s[i:]
    f.write_text(s); n += 1
print(f'{n} fichas con encuestas')
