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
    lecciones: [
      {
        id: 'sin-permiso-previo',
        foto: 'educacion', // provisional hasta la foto propia (GPT-1)
        titulo: 'Expresarse sin permiso previo',
        minutos: 6,
        bloques: [
          { p: 'La Declaración Universal de Derechos Humanos dedica su artículo 19 a la libertad de opinión y de expresión:' },
          { cita: 'Todo individuo tiene derecho a la libertad de opinión y de expresión; este derecho incluye el de no ser molestado a causa de sus opiniones, el de investigar y recibir informaciones y opiniones, y el de difundirlas, sin limitación de fronteras, por cualquier medio de expresión.', fuente: 'Declaración Universal de Derechos Humanos, artículo 19' },
          { p: 'El artículo protege tres cosas a la vez: tener una opinión sin que nadie te moleste por ella, buscar y recibir información, y difundirla por el medio que elijas. Quien solo puede hablar, pero no informarse, o solo puede informarse, pero no publicar, no tiene la libertad completa.' },
          { h: 'Los límites que admite el derecho internacional' },
          { p: 'La libertad de expresión no es absoluta. El Pacto Internacional de Derechos Civiles y Políticos de 1966 admite restricciones, pero con tres condiciones: tienen que estar fijadas por una ley, tienen que ser necesarias y solo pueden servir para proteger los derechos o la reputación de otras personas, la seguridad nacional, el orden público o la salud o la moral públicas. El mismo Pacto obliga a prohibir la propaganda en favor de la guerra y la incitación al odio nacional, racial o religioso.' },
          { h: 'Responder después, no pedir permiso antes' },
          { p: 'La Convención Americana sobre Derechos Humanos de 1969 añade una regla clara: la expresión no puede estar sujeta a censura previa. Quien abusa de su libertad responde después, ante un juez y según la ley. Nadie tiene que pedir permiso antes de hablar o publicar. La única excepción que admite es la clasificación de espectáculos públicos para proteger a menores.' },
          { h: 'Qué dice la Constitución cubana de 2019' },
          { p: 'El artículo 54 reconoce la libertad de pensamiento, conciencia y expresión. El artículo 55 reconoce la libertad de prensa, pero añade que se ejerce «de conformidad con la ley y los fines de la sociedad» y que los medios fundamentales de comunicación son de propiedad socialista de todo el pueblo o de las organizaciones políticas, sociales y de masas, y no pueden ser de otro tipo de propiedad. Cuba firmó el Pacto de derechos civiles y políticos en 2008 y no lo ha ratificado.' },
        ],
      },
      ...c2.lecciones,
    ],
    resumen: 'Qué protege la libertad de expresión, dónde están sus límites en distintas democracias y qué hace falta para que exista una prensa independiente.',
    plan: ['Expresarse sin permiso previo', 'Estados Unidos, Alemania, España y Costa Rica: límites distintos', 'Prensa independiente: propiedad, licencias y acceso a la información', 'Internet y expresión: el caso cubano y las leyes que lo regulan'],
  },
  {
    id: 'justicia', num: 3, titulo: 'Justicia y Estado de derecho', foto: 'constitucion', estado: 'disponible', minutos: 25,
    resumen: 'Qué significa que nadie esté por encima de la ley, por qué importa que los jueces no dependan del gobierno y cómo se garantiza un juicio justo.',
    plan: ['Nadie por encima de la ley', 'Jueces independientes: cómo se eligen en cinco países', 'El juicio justo y la presunción de inocencia', 'Del papel a la práctica: preguntas para examinar un sistema judicial'],
    insignia: 'Justicia y Estado de derecho', lecciones: c3.lecciones, fuentes: c3.fuentes,
  },
  {
    id: 'rendicion-de-cuentas', num: 4, titulo: 'Rendición de cuentas', foto: 'modelo_pais', estado: 'disponible', minutos: 25,
    resumen: 'Cómo controlan los ciudadanos a quienes gobiernan: separación de poderes, elecciones libres, transparencia y prensa.',
    plan: ['Separación de poderes y contrapesos', 'Elecciones libres y alternancia', 'Transparencia: acceso a la información pública en distintas democracias', 'El papel de la prensa y de las organizaciones ciudadanas'],
    insignia: 'Rendición de cuentas', lecciones: c4.lecciones, fuentes: c4.fuentes,
  },
  {
    id: 'libertad-religiosa', num: 5, titulo: 'Libertad religiosa', foto: 'familia', estado: 'disponible', minutos: 20,
    resumen: 'Creer, no creer o cambiar de creencia: cómo distintos Estados separan religión y poder y protegen a las minorías.',
    plan: ['Libertad de conciencia y de culto', 'Modelos de relación entre Estado y religión en cinco países', 'Minorías religiosas y no creyentes', 'Del papel a la práctica'],
    insignia: 'Libertad religiosa', lecciones: c5.lecciones, fuentes: c5.fuentes,
  },
  {
    id: 'sociedad-civil', num: 6, titulo: 'Sociedad civil independiente', foto: 'transicion', estado: 'disponible', minutos: 25,
    resumen: 'Asociarse sin permiso del poder: qué son las organizaciones independientes, cómo se registran y financian en democracia y por qué importan.',
    plan: ['Asociarse libremente', 'Registro y financiación de organizaciones en cinco países', 'Organizaciones independientes en la historia de Cuba', 'Cómo participar con seguridad'],
    insignia: 'Sociedad civil independiente', lecciones: c6.lecciones, fuentes: c6.fuentes,
  },
  {
    id: 'pensamiento-critico', num: 7, modulo: 'Pensar y debatir', titulo: 'Pensamiento crítico', foto: 'educacion', estado: 'disponible',
    insignia: 'Pensamiento crítico',
    resumen: 'Cómo construir y defender un argumento, juzgar la evidencia y las fuentes, citar, reconocer falacias y sesgos, y usar la inteligencia artificial con criterio. Basado en los contenidos de los cursos preparatorios de acceso a universidades europeas.',
    lecciones: c7.lecciones, preguntas: c7.preguntas, fuentes: c7.fuentes,
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
