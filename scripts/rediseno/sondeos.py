"""Añade «Qué respondieron en redes» a las fichas de propuesta.
Uso: python3 sondeos.py /tmp/pub [datos.json]   (después de encuestas.py)
Datos: web/src/data/sondeos-redes.json. Cada sondeo: codigo, red, pregunta, propuesta, cierre,
votos (5 niveles de la escala: Muy en contra … Muy a favor) u opciones ({texto: votos}), enlace, notas.
Nunca suma sondeos entre sí ni con los votos del sitio."""
import json, sys, pathlib, html, re
pub = pathlib.Path(sys.argv[1])
ruta = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else pathlib.Path(__file__).resolve().parents[2] / 'web/src/data/sondeos-redes.json'
d = json.load(open(ruta))
NIV = ['Muy en contra', 'En contra', 'Neutral', 'A favor', 'Muy a favor']
e = lambda t: html.escape(str(t or ''))
por = {}
for s in d['sondeos']:
    por.setdefault(s['propuesta'], []).append(s)
n = 0
for pid, ss in por.items():
    f = pub / 'propuesta' / pid / 'index.html'
    if not f.exists():
        continue
    items = ''
    for s in sorted(ss, key=lambda s: s['cierre'], reverse=True):
        ops = dict(zip(NIV, s['votos'])) if s.get('votos') else s.get('opciones', {})
        total = sum(ops.values()) or 1
        filas = ''.join(f'<li><span>{e(k)}</span><span class="barra-sondeo"><span style="width:{round(v*100/total)}%"></span></span><span>{round(v*100/total)} %</span></li>' for k, v in ops.items())
        items += (f'<li class="sondeo"><p><strong>{e(s["red"])} · {e(s["cierre"])}</strong> <span class="etiqueta">Sondeo abierto</span> <span class="discreto">{e(s["codigo"])}</span></p>'
                  f'<blockquote>{e(s["pregunta"])}</blockquote><ul class="reparto">{filas}</ul>'
                  f'<p class="discreto">{sum(ops.values())} votos. <a href="{e(s["enlace"])}" rel="noopener" target="_blank">Ver la publicación</a></p>'
                  + (f'<p class="discreto">{e(s["notas"])}</p>' if s.get('notas') else '') + '</li>')
    bloque = ('<section class="seccion sondeos-redes" id="sondeos-redes"><h2>Qué respondieron en redes</h2>'
              '<p class="discreto">Sondeos de ENTRE TODOS en Facebook e Instagram. Vota quien quiere, sin verificar su identidad, y cada cuenta vota una vez. '
              'Reflejan a quienes respondieron, no a toda la población, y no se suman con otros resultados.</p>'
              f'<ul class="enc-lista">{items}</ul></section>')
    t = f.read_text()
    t = re.sub(r'<section class="seccion sondeos-redes".*?</section>', '', t, flags=re.S)
    i = t.find('<section class="seccion encuestas-prop"')
    if i < 0: i = t.find('<section aria-labelledby="t-fuentes">')
    if i < 0: continue
    f.write_text(t[:i] + bloque + t[i:]); n += 1
print(f'{n} fichas con sondeos de redes')
