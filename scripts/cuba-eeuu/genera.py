"""Genera web/src/data/cuba-eeuu-cronologia.json desde la hoja 014 de Instinct (pestaña «1 Cronologia 2026»).
Las fechas dd/mm que Excel leyó como mm/dd se corrigen. Solo hecho, quién, fuente y marcas de cautela."""
import json, re, os
d = json.load(open(os.path.join(os.path.dirname(__file__), '014.json'), encoding='utf-8'))
MESES = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre']
def fecha(t):
    m = re.match(r'(\d{4})-(\d{2})-(\d{2}) 00:00:00', t)
    if m:  # Excel invirtió día y mes
        dia, mes = int(m.group(2)), int(m.group(3))
        return (mes, dia), f'{dia} de {MESES[mes-1]}'
    m = re.match(r'(\d{1,2})/(\d{2})/(\d{4})', t)
    if m: return (int(m.group(2)), int(m.group(1))), f'{int(m.group(1))} de {MESES[int(m.group(2))-1]}'
    for i, mes in enumerate(MESES):
        if mes in t.lower():
            fin = 'finales' in t.lower()
            return (i + 1, 31 if fin else 0), ('finales de ' if fin else '') + mes
    return (13, 0), t
salida = []
for r in d['1 Cronologia 2026'][1:]:
    clave, f = fecha(r[0])
    hecho = r[1].strip().replace('ANUNCIADO, NO OCURRIDO: ', '')
    nota = r[5]
    marca = 'Anunciado' if r[1].startswith('ANUNCIADO') else ('Fuente única' if 'fuente única' in nota.lower() or 'sin confirmación' in nota.lower() else '')
    fuente = r[4].split(' ')[0].strip()
    salida.append({'orden': clave, 'fecha': f, 'hecho': hecho, 'quien': r[2].strip(), 'cita': r[3].strip(), 'fuente': fuente, 'marca': marca})
salida.sort(key=lambda x: x['orden'])
for x in salida: del x['orden']
destino = os.path.join(os.path.dirname(__file__), '../../web/src/data/cuba-eeuu-cronologia.json')
json.dump(salida, open(destino, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(len(salida), [x['fecha'] for x in salida][:12])
