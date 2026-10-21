// Blog A+ de ENTRE TODOS.
// Cada curso: comprobación inicial, lecciones breves, comprobación final e insignia.
// El progreso se guarda solo en el navegador de la persona; nada se envía al servidor.
// Comparaciones entre democracias sin ranking: cada país se describe con sus fuentes.

import * as c1 from './academia/c1.js';
import * as c2 from './academia/c2.js';
import * as c3 from './academia/c3.js';
import * as c4 from './academia/c4.js';
import * as c5 from './academia/c5.js';
import * as c6 from './academia/c6.js';
import * as c7 from './academia/c7.js';
import * as c8 from './academia/c8.js';
import * as c9 from './academia/c9.js';
import * as c10 from './academia/c10.js';
import * as c11 from './academia/c11.js';
import * as c12 from './academia/c12.js';

export const PAISES_COMPARADOS = ['Cuba', 'Estados Unidos', 'Alemania', 'España', 'Costa Rica'];

export const cursos = [
  {
    id: 'derechos-humanos', num: 1, titulo: 'Derechos humanos en la práctica', foto: 'derechos', estado: 'disponible',
    insignia: 'Derechos humanos en la práctica',
    resumen: 'Qué exige el derecho internacional, qué modelos de democracia existen y qué caminos hay para la Constitución de la nueva Cuba, con lo que hicieron otros países en transición.',
    lecciones: c1.lecciones, preguntas: c1.preguntas, fuentes: c1.fuentes,
  },
  {
    id: 'libertad-de-expresion', num: 2, titulo: 'Libertad de expresión y de prensa', foto: 'sociedad_civil', estado: 'disponible', minutos: 25,
    insignia: 'Libertad de expresión y de prensa',
    fuentes: [
      { t: 'Declaración Universal de Derechos Humanos (ONU)', url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights' },
      { t: 'Pacto Internacional de Derechos Civiles y Políticos (ACNUDH)', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { t: 'Convención Americana sobre Derechos Humanos (OEA)', url: 'https://www.oas.org/dil/esp/tratados_b-32_convencion_americana_sobre_derechos_humanos.htm' },
      { t: 'Constitución de Cuba de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
      ...c2.fuentes,
    ],
    lecciones: c2.lecciones, preguntas: c2.preguntas,
    resumen: 'Si la nueva Cuba podría prohibir que se defienda el régimen anterior, si debería ser delito ofender a un presidente, qué hacer con la prensa oficialista y quién controlaría internet.',
    plan: c2.lecciones.map((l) => l.titulo),
  },
  {
    id: 'justicia', num: 3, titulo: 'Justicia y Estado de derecho', foto: 'constitucion', estado: 'disponible', minutos: 25,
    resumen: 'Si se podría juzgar a un expresidente, qué hacer con los jueces actuales, qué pasaría con las condenas políticas y si los ciudadanos deberían juzgar en los tribunales.',
    plan: c3.lecciones.map((l) => l.titulo),
    insignia: 'Justicia y Estado de derecho', lecciones: c3.lecciones, preguntas: c3.preguntas, fuentes: c3.fuentes,
  },
  {
    id: 'rendicion-de-cuentas', num: 4, titulo: 'Rendición de cuentas', foto: 'modelo_pais', estado: 'disponible', minutos: 25,
    resumen: 'Qué impediría una nueva dictadura, cuándo deberían ser las primeras elecciones libres, qué se debería saber de los ministros y si cualquiera podría leer su expediente de la Seguridad del Estado.',
    plan: c4.lecciones.map((l) => l.titulo),
    insignia: 'Rendición de cuentas', lecciones: c4.lecciones, preguntas: c4.preguntas, fuentes: c4.fuentes,
  },
  {
    id: 'libertad-religiosa', num: 5, titulo: 'Libertad religiosa', foto: 'familia', estado: 'disponible', minutos: 20,
    resumen: 'La objeción de conciencia al servicio militar, el dinero del Estado para las iglesias, el choque entre ritos religiosos y protección animal, y la religión en la escuela.',
    plan: c5.lecciones.map((l) => l.titulo),
    insignia: 'Libertad religiosa', lecciones: c5.lecciones, preguntas: c5.preguntas, fuentes: c5.fuentes,
  },
  {
    id: 'sociedad-civil', num: 6, titulo: 'Sociedad civil independiente', foto: 'transicion', estado: 'disponible', minutos: 25,
    resumen: 'Qué pasaría con los CDR, la FMC y la CTC, el dinero extranjero de las organizaciones, si haría falta permiso para asociarse y quién protegería a periodistas y activistas.',
    plan: c6.lecciones.map((l) => l.titulo),
    insignia: 'Sociedad civil independiente', lecciones: c6.lecciones, preguntas: c6.preguntas, fuentes: c6.fuentes,
  },
  {
    id: 'pensamiento-critico', num: 7, modulo: 'Pensar y debatir', titulo: 'Pensamiento crítico', foto: 'educacion', estado: 'disponible',
    insignia: 'Pensamiento crítico',
    resumen: 'Cómo construir y defender un argumento, juzgar la evidencia y las fuentes, citar, reconocer falacias y sesgos, y usar la inteligencia artificial con criterio. Basado en los contenidos de los cursos preparatorios de acceso a universidades europeas.',
    lecciones: c7.lecciones, preguntas: c7.preguntas, fuentes: c7.fuentes,
  },
  {
    id: 'pensamiento-creativo', num: 8, modulo: 'Pensar y debatir', titulo: 'Pensamiento creativo', foto: 'reconstruccion', estado: 'disponible',
    insignia: 'Pensamiento creativo',
    resumen: 'Plantear bien un problema, generar muchas ideas antes de elegir y llevar el ingenio de «inventar» a soluciones que sirvan a todos.',
    lecciones: c8.lecciones, preguntas: c8.preguntas, fuentes: c8.fuentes,
  },
  {
    id: 'pensamiento-etico', num: 9, modulo: 'Pensar y debatir', titulo: 'Pensamiento ético', foto: 'animales', estado: 'disponible',
    insignia: 'Pensamiento ético',
    resumen: 'Tres formas de juzgar qué está bien, el problema de los fines y los medios, y hasta dónde llega nuestra responsabilidad: personas, animales y medio ambiente.',
    lecciones: c9.lecciones, preguntas: c9.preguntas, fuentes: c9.fuentes,
  },
  {
    id: 'pensamiento-sistemico', num: 10, modulo: 'Pensar y debatir', titulo: 'Pensamiento sistémico', foto: 'medio_ambiente', estado: 'disponible',
    insignia: 'Pensamiento sistémico',
    resumen: 'Por qué las soluciones rápidas a veces empeoran el problema, el modelo del iceberg y los puntos de palanca: dónde empujar para que algo cambie de verdad.',
    lecciones: c10.lecciones, preguntas: c10.preguntas, fuentes: c10.fuentes,
  },
  {
    id: 'educacion-humana', num: 11, modulo: 'Pensar y debatir', titulo: 'Educación humana', foto: 'familia', estado: 'disponible',
    insignia: 'Educación humana',
    resumen: 'El mayor bien y el menor daño a personas, animales y medio ambiente; discrepar sin humillar; y el precio real de lo que elegimos. Basado en el trabajo de Zoe Weil y el Instituto para la Educación Humana.',
    lecciones: c11.lecciones, preguntas: c11.preguntas, fuentes: c11.fuentes,
  },
  {
    id: 'pensamiento-solucionario', num: 12, modulo: 'Pensar y debatir', titulo: 'Pensamiento solucionario', foto: 'reconstruccion', estado: 'disponible',
    insignia: 'Pensamiento solucionario',
    resumen: 'De la queja a la solución y de la solución a la propuesta, con el Marco Solucionario del Instituto para la Educación Humana.',
    lecciones: c12.lecciones, preguntas: c12.preguntas, fuentes: c12.fuentes,
  },
];

// Tiempo de lectura real: unas 180 palabras por minuto, como en los blogs.
const palabras = (l) => [...(l.bloques || []).flatMap((b) => [b.p, b.h, b.cita, ...(b.lista || [])]), ...(l.tabla ? l.tabla.filas.flat() : [])]
  .filter(Boolean).join(' ').replace(/<[^>]+>/g, '').split(/\s+/).length;
for (const c of cursos) {
  for (const l of c.lecciones || []) l.minutos = Math.max(2, Math.ceil(palabras(l) / 180));
  if (c.lecciones?.length) c.minutos = c.lecciones.reduce((n, l) => n + l.minutos, 0);
}

export const cursoPorId = Object.fromEntries(cursos.map((c) => [c.id, c]));
