"""Genera web/src/data/organizaciones.json a partir del dossier de Instinct (hoja «Dossier»).
Uso: python3 construir.py dossier.txt  (exportación de la hoja con una sección «## Sheet name: Dossier»).
Solo datos públicos de organizaciones: sin nombres de personas, sin notas internas."""
import csv, io, json, re, sys, os
src = open(sys.argv[1], encoding='utf-8').read()
bloque = src.split('## Sheet name: Dossier')[1].split('## Sheet name:')[0].strip()
filas = list(csv.DictReader(io.StringIO(bloque)))

GRUPOS = [
  ('ddhh', 'Derechos humanos y apoyo jurídico'),
  ('prensa', 'Prensa independiente'),
  ('coaliciones', 'Coaliciones y plataformas'),
  ('partidos', 'Partidos y movimientos'),
  ('estudios', 'Centros de estudio'),
  ('tematicas', 'Causas temáticas'),
  ('animales', 'Protección animal'),
  ('ambiente', 'Medio ambiente'),
  ('diaspora', 'Diáspora por país'),
]
def grupo(cat):
    c = cat.lower()
    if c.startswith('medios extranjeros'): return 'extranjeros'
    if c.startswith('diáspora'): return 'diaspora'
    if c.startswith('periodismo'): return 'prensa'
    if c.startswith(('ddhh', 'libertad de prensa')): return 'ddhh'
    if c.startswith(('think tank', 'centro de estudios')): return 'estudios'
    if c.startswith('sociedad civil temática'): return 'tematicas'
    if c.startswith(('coalición', 'plataforma', 'alianza', 'colectivo')): return 'coaliciones'
    return 'partidos'

def ambito(a):
    a = a.lower()
    if 'isla' in a and ('exilio' in a or 'disidencia' in a): return 'ambos'
    if a.startswith('isla'): return 'isla'
    if a.startswith('mixto'): return 'ambos'
    return 'exilio'

# Textos sin notas internas, sin nombres de personas y sin calificativos no verificables.
QUE = {
  'Cuba Archive (Archivo Cuba)': 'Base de datos de muertes y desapariciones por motivos políticos en Cuba; documentos sobre la transición.',
  '14ymedio': 'Diario digital de noticias e investigación.',
  'Plataforma Democrática Cubana': 'Plataforma de grupos opositores.',
  'Unión Patriótica de Cuba': 'Organización opositora dentro de la isla, con programa propio.',
  'Partido Republicano de Cuba': 'Partido del exilio, con programa propio.',
  'Partido Cuba Primero': 'Partido del exilio, con programa general.',
  'Partido Nacionalista Democrático de Cuba': 'Partido del exilio, con programa propio.',
  'Proyecto Demócrata Cubano': 'Proyecto político con programa propio.',
  'Cuba Transformación': 'Programa económico e institucional.',
  'Partido Demócrata Cristiano de Cuba': 'Partido democristiano.',
  'Asamblea de la Resistencia Cubana': 'Plataforma de organizaciones del exilio.',
  'Comisión para la Ayuda a una Cuba Libre': 'Apoyo a la sociedad civil.',
  'Brigada 2506 (Asociación de Veteranos de Bahía de Cochinos)': 'Asociación de veteranos de Bahía de Cochinos.',
  'Frente Constitucionalista Cubano': 'Movimiento constitucionalista.',
  'VOZ | Cuba': 'Plataforma programática: «la voz de las personas, los animales y el medioambiente, y el eco de las causas que los defienden». Propone, argumenta y defiende soluciones propias.',
  'Partido del Pueblo': 'Partido político con programa publicado en 2020-2021.',
  'Partido Liberal Clásico Cubano': 'Partido político fundado en 2026.',
  'Partido Libertario de Cuba': 'Partido político; «Plan de la Libertad».',
  'Cuba Siglo 21': 'Análisis económico y jurídico.',
  'Centro de Estudios Convivencia': 'Centro de estudios dentro y fuera de Cuba; «Itinerario de Pensamiento y Propuestas» y revista Convivencia.',
  'Cuba Próxima': 'Propuestas constitucionales e institucionales; «La Cuba que queremos».',
  'Fundación Nacional Cubano-Americana': 'Organización del exilio; cabildeo y programas cívicos.',
  'Movimiento Democracia': 'Defensa de la democracia; red de abogados voluntarios para detenidos del 11J.',
  'Concertación Democrática Cubana D Frente': 'Articulación opositora; propuesta de nueva ley electoral y marco constitucional provisional.',
  'Pasos de Cambio': 'Coalición del exilio; firmó el Acuerdo de Liberación con la Asamblea de la Resistencia Cubana (marzo de 2026).',
  'Cuba Posible': 'Proyecto de debate reformista dentro de la isla (2013-2019).',
  'Cuba Decide': 'Campaña por un plebiscito vinculante para cambiar el sistema político.',
  'Movimiento Cristiano Liberación': 'Autor del Proyecto Varela (2002) y del Programa Transitorio.',
  'Estado de SATS': 'Foro de debate intelectual, artístico y político dentro de la isla.',
  'FANTU (Frente Antitotalitario Unido)': 'Movimiento opositor no violento dentro de la isla.',
  'Puentes de Amor': 'Campaña de la diáspora por el levantamiento de las sanciones y el acercamiento entre EE. UU. y Cuba.',
  'Yo Sí Te Creo en Cuba': 'Plataforma feminista; su Observatorio de Feminicidios registró casos hasta abril de 2026.',
  'Grupo de Trabajo de la Disidencia Interna': 'Grupo de la disidencia interna.',
  'ClickCuba': 'Medio digital: actualidad, presos políticos, migración.',
}
ESTADO = {
  'Concilio Cubano': 'Histórica', 'Cuba Posible': 'Histórica', 'Revista Encuentro de la Cultura Cubana': 'Histórica',
  'Acuerdo por la Democracia en Cuba': 'Documento de 1998', 'Puentes de Amor': 'Disuelta',
}
ACTOR = {
  'Concertación Democrática Cubana D Frente': 'd-frente', 'Pasos de Cambio': 'pasos-de-cambio',
  'Acuerdo por la Democracia en Cuba': 'acuerdo-democracia-cuba', 'Plataforma Democrática Cubana': 'plataforma-democratica-cubana',
  'Concilio Cubano': 'concilio-cubano', 'Movimiento Cristiano Liberación': 'mcl', 'Cuba Decide': 'cuba-decide',
  'Unión Patriótica de Cuba': 'unpacu', 'Partido Republicano de Cuba': 'partido-republicano-cuba',
  'Partido Cuba Primero': 'partido-cuba-primero', 'Partido Nacionalista Cubano': 'partido-nacionalista-cubano',
  'Partido Nacionalista Democrático de Cuba': 'partido-nacionalista-democratico', 'Proyecto Demócrata Cubano': 'proyecto-democrata-cubano',
  'Cuba Transformación': 'cuba-transformacion', 'Partido Demócrata Cristiano de Cuba': 'pdc-cuba',
  'Cuba Independiente y Democrática': 'cid', 'Asamblea de la Resistencia Cubana': 'arc-pasos-de-cambio',
  'Directorio Democrático Cubano': 'directorio-democratico-cubano', 'Comisión para la Ayuda a una Cuba Libre': 'cafc',
  'Brigada 2506 (Asociación de Veteranos de Bahía de Cochinos)': 'brigada-2506', 'Grupo de Trabajo de la Disidencia Interna': 'gtdi',
  'Movimiento C40': 'movimiento-c40', 'Frente Constitucionalista Cubano': 'frente-constitucionalista',
  'Consejo para la Transición Democrática en Cuba': 'ctdc', 'Centro de Estudios Convivencia': 'centro-convivencia',
  'Cuba Próxima': 'cuba-proxima', 'Cuba Siglo 21': 'cuba-siglo-21', 'Cuba Posible': 'cuba-posible', 'VOZ | Cuba': 'voz-cuba',
}
PERSONAS = re.compile(r'(fundad[oa] por|Fundador|Director|Figura|Lider|Líder|Coordinador|Dirige)', re.I)
salida = []
for f in filas:
    n = f['Nombre'].strip()
    if not n: continue
    que = QUE.get(n, f['Qué hace'].strip())
    if PERSONAS.search(que) or re.search(r'Banco|peine|fase \d|hold|OK de Mitch', que):
        raise SystemExit(f'Texto con nota interna o persona sin revisar: {n}: {que}')
    for a, b in [('DDHH', 'derechos humanos'), ('EEUU', 'EE. UU.'), ('~50', 'unos 50'), (' de alto tráfico', ''), (' articulado completo', ' articulado')]:
        que = que.replace(a, b)
    if not que.endswith('.'): que += '.'
    que = que[0].upper() + que[1:]
    verif = f['Verificación'].strip().startswith('Verificada')
    g = 'partidos' if n == 'VOZ | Cuba' else grupo(f['Categoría'])
    salida.append({
        'nombre': n, 'siglas': f['Siglas'].strip(), 'grupo': g,
        'ambito': ambito(f['Ámbito']), 'pais': re.sub(r'\s*\(.*?\)', '', f['País base']).strip().replace('EEUU', 'EE. UU.'),
        'fundada': f['Fundada'].strip(), 'que': que,
        'web': f['Web oficial'].strip() if verif else '',
        'estado': ESTADO.get(n, ''), 'actor': ACTOR.get(n, ''),
    })
# Organizaciones con ficha en «Diversidad política» que no están en el dossier, y enlace a esa ficha.
div = json.load(open(os.path.join(os.path.dirname(__file__), '../../web/src/data/diversidad.json'), encoding='utf-8'))['organizaciones']
DIV_NOMBRE = {'Partido Libertario de Cuba': 'partido-libertario-de-cuba', 'Partido Nacionalista Cubano': 'partido-nacionalista-cubano'}
for o in salida:
    o['diversidad'] = DIV_NOMBRE.get(o['nombre'], '')
EXTRA = {
  'alternativa-no-partidista-de-cuba': {'grupo': 'partidos', 'ambito': 'ambos', 'pais': '', 'que': 'Corriente cívica no partidista: una opción organizada para quienes no desean afiliarse a un partido; reconoce a los partidos como actores legítimos.', 'web': 'https://nopartidistacuba.org/'},
  'partido-pro-derechos-humanos-de-cuba': {'grupo': 'partidos', 'ambito': 'ambos', 'pais': '', 'que': 'Organización política independiente centrada en derechos humanos, democracia participativa y lucha no violenta.', 'web': ''},
}
nombres = {o['nombre'] for o in salida}
for d in div:
    if d['slug'] in EXTRA and d['nombre'] not in nombres:
        e = EXTRA[d['slug']]
        salida.append({'nombre': d['nombre'], 'siglas': '', 'grupo': e['grupo'], 'ambito': e['ambito'], 'pais': e['pais'],
                       'fundada': d.get('fecha', ''), 'que': e['que'], 'web': e['web'], 'estado': '', 'actor': '', 'diversidad': d['slug']})
# Añadidas a petición del fundador, con fuente pública propia.
salida.append({'nombre': 'Humanitarna Rešenja – Soluciones Humanitarias', 'siglas': '', 'grupo': 'diaspora', 'ambito': 'exilio', 'pais': 'Serbia',
               'fundada': '2025', 'que': 'Organización registrada en Belgrado que ofrece asesoramiento jurídico, protección de derechos e integración a personas migrantes y refugiadas en Serbia, en español, inglés, francés y serbio. En 2026 presentó ante el Comisionado para la Protección de la Igualdad de Serbia una comunicación sobre los ciudadanos cubanos que no pueden regularizar su residencia por las demoras de la Embajada de Cuba en expedir y renovar pasaportes.',
               'web': 'https://humanitariansolutions.org/', 'estado': '', 'actor': '', 'diversidad': ''})
salida.append({'nombre': 'Cubanos Libres en Uruguay', 'siglas': '', 'grupo': 'diaspora', 'ambito': 'exilio', 'pais': 'Uruguay',
               'fundada': '', 'que': 'Agrupación de emigrados cubanos en Uruguay que une activismo y cultura. En marzo de 2024 se reunió con el embajador de la Unión Europea en Montevideo para pedir que se revise la cláusula de derechos humanos del acuerdo entre la UE y Cuba, y le entregó una lista actualizada de presos políticos.',
               'web': '', 'estado': '', 'actor': '', 'diversidad': ''})
# Protección animal y medio ambiente (inventario de Instinct, 17/10/2026). Solo grupos independientes con
# actividad documentada; se excluyen los estatales o vinculados a universidades, iglesias o al Estado,
# los que solo figuran en directorios o logos, y las ONG extranjeras.
def _o(nombre, grupo, que, web='', fundada='', ambito='isla', pais='Cuba', estado=''):
    salida.append({'nombre': nombre, 'siglas': '', 'grupo': grupo, 'ambito': ambito, 'pais': pais, 'fundada': fundada,
                   'que': que, 'web': web, 'estado': estado, 'actor': '', 'diversidad': ''})
_o('Bienestar Animal Cuba (BAC)', 'animales', 'Red nacional de voluntariado con sede en La Habana y grupos en Camagüey, Matanzas, Villa Clara, Holguín y Pinar del Río. Rescates, adopciones responsables, campañas de esterilización y desparasitación, hogares temporales y ferias. Sin reconocimiento legal.', 'https://bacuba.org/', '2020')
_o('Cubanos en Defensa de los Animales (CeDA)', 'animales', 'Proyecto de La Habana dedicado al rescate de animales callejeros, la esterilización, la adopción responsable y la educación de niños y jóvenes.', 'https://cedacuba.org/', '2016')
_o('Protección Animal S.O.S (Pasos)', 'animales', 'Protectora de La Habana, con presencia en Puerto Padre (Las Tunas): rescates, refugio, esterilización, ferias de adopción y concienciación.', 'https://proteccionanimalpasos.com/', '2021')
_o('Aldameros (Colonia Aldama)', 'animales', 'Colonia protegida en el parque Aldama, Centro Habana, con más de 120 animales, en su mayoría gatos. Cuidado, rescates y adopciones.', '', '2020')
_o('Equipo de Protección Animal (EPA)', 'animales', 'Grupo comunitario de San Antonio de los Baños (Artemisa): rescates, hogares temporales, atención veterinaria y denuncias de maltrato amparadas en el Decreto-Ley 31/2021. No recibe apoyo de ninguna institución.', '', '2019')
_o('Santiagueros por el Bienestar Animal (SALBA)', 'animales', 'Grupo de Santiago de Cuba que rescata y protege animales callejeros y promueve adopciones. Organizó albergue para animales durante el huracán Melissa, en octubre de 2025.', '', '2019')
_o('Adopciones por Amor', 'animales', 'Refugio y red de adopciones en La Habana; según AP, realojó unas 300 mascotas en 2023.')
_o('Espíritu Animal', 'animales', 'Grupo de Pinar del Río: rescates, campañas y atención veterinaria a animales abandonados.')
_o('Protectores en Ciego de Ávila (PeCA)', 'animales', 'Grupo de Ciego de Ávila dedicado al rescate, la protección, la adopción responsable y el cuidado de animales callejeros; reubicó 260 animales en su primer año.', 'https://editosupervieda.wixsite.com/pecaprotectoresencie')
_o('APA Ciego de Ávila', 'animales', 'Grupo de Ciego de Ávila: rescate, adopción, esterilización, desparasitación, vacunación y educación contra la violencia hacia los animales.')
_o('Huellitas de mi Ciudad', 'animales', 'Grupo de Matanzas con refugio propio desde 2019, rescates y casas de tránsito.', '', '2019')
_o('Citykleta', 'ambiente', 'Comunidad ciclista de La Habana que promueve la movilidad sostenible y el activismo urbano; organiza el Festival de la Bicicleta.', 'https://citykleta.org/')
_o('Bicicletear La Habana', 'ambiente', 'Iniciativa ciudadana que promueve la bicicleta como transporte sostenible, con bicicletadas mensuales.', '', '2015')
_o('Guardabosques', 'ambiente', 'Organización ambiental independiente nacida en La Habana: denuncia de daños ecológicos urbanos, reforestación, limpieza de ríos y boletín nacional. En 2019 pidió al gobierno firmar el Acuerdo de Escazú. Su actividad en la isla terminó ese año, con el exilio de sus organizadores.', '', '2007', estado='Histórica')
_o('Canal Guardabosques', 'ambiente', 'Medio ambiental digital desde el exilio, continuador del boletín Guardabosques: ciencia, imagen y denuncia ambiental sobre Cuba.', 'https://canalguardabosques.com/', '2019', ambito='exilio', pais='')
out = {'grupos': GRUPOS, 'organizaciones': salida, 'fuente': 'Dossier de organizaciones independientes de Cuba (v3, 16/10/2026)'}
destino = os.path.join(os.path.dirname(__file__), '../../web/src/data/organizaciones.json')
json.dump(out, open(destino, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
from collections import Counter
print(len(salida), Counter(o['grupo'] for o in salida), sum(1 for o in salida if o['web']), 'con web', sum(1 for o in salida if o['actor']), 'con propuestas')
