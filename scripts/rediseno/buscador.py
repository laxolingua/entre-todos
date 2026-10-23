"""Apunta la lupa de la cabecera al Buscador E/T en todas las páginas (también las que vienen de main).
Uso: python3 buscador.py /tmp/pub"""
import sys, pathlib
n = 0
for f in pathlib.Path(sys.argv[1]).rglob('*.html'):
    s = f.read_text()
    t = s.replace('href="/propuestas/#buscador" aria-label="Buscar propuestas"', 'href="/buscador/" aria-label="Buscador E/T"')
    if t != s:
        f.write_text(t); n += 1
print(f'{n} páginas con la lupa hacia el Buscador E/T')
