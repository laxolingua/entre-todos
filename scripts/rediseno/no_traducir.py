#!/usr/bin/env python3
"""Marca el nombre ENTRE TODOS (y E/T) para que los traductores automáticos no lo traduzcan.

Chrome, Edge y Safari traducen «ENTRE TODOS» como «Between us» o «Among all». Este script envuelve
cada aparición en el texto visible con <span translate="no" class="notranslate">…</span>, que esos
traductores respetan. El resto de la página se sigue traduciendo con normalidad.

No toca: atributos, <script>, <style>, <title>, <textarea>, ni «entre todos» en minúsculas
(frase normal del español que sí debe traducirse).

Uso (en el pipeline, después de encuestas.py):
  python3 scripts/rediseno/no_traducir.py /tmp/pub
"""
import re
import sys
from pathlib import Path

NOMBRE = re.compile(r'(?<![\w/])(ENTRE TODOS|Entre Todos|E/T)(?![\w/])')
TOKEN = re.compile(r'(<!--.*?-->|<[^>]*>)', re.S)
SALTAR = {'script', 'style', 'title', 'textarea'}
ENVOLVER = r'<span translate="no" class="notranslate">\1</span>'


def procesar(html: str) -> tuple[str, int]:
    partes = TOKEN.split(html)
    dentro = None  # etiqueta cuyo contenido no se toca
    cambios = 0
    anterior = ''  # última etiqueta vista, para no envolver dos veces
    for i, p in enumerate(partes):
        if not p:
            continue
        if p.startswith('<'):
            anterior = p
            m = re.match(r'<(/?)([a-zA-Z0-9]+)', p)
            if m:
                cierre, tag = m.group(1) == '/', m.group(2).lower()
                if dentro is None and not cierre and tag in SALTAR and not p.endswith('/>'):
                    dentro = tag
                elif dentro == tag and cierre:
                    dentro = None
            continue
        if dentro is None and 'translate="no"' not in anterior and NOMBRE.search(p):
            nuevo, n = NOMBRE.subn(ENVOLVER, p)
            partes[i] = nuevo
            cambios += n
    return ''.join(partes), cambios


def main(carpeta: str) -> None:
    total = archivos = 0
    for f in Path(carpeta).rglob('*.html'):
        texto = f.read_text(encoding='utf-8')
        nuevo, n = procesar(texto)
        if n:
            f.write_text(nuevo, encoding='utf-8')
            total += n
            archivos += 1
    print(f'no_traducir: {total} apariciones marcadas en {archivos} páginas')


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
