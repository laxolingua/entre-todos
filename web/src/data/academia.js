// Blog A+ de ENTRE TODOS.
// Cada curso: comprobación inicial, lecciones breves, comprobación final e insignia.
// El progreso se guarda solo en el navegador de la persona; nada se envía al servidor.
// Comparaciones entre democracias sin ranking: cada país se describe con sus fuentes.

import * as c2 from './academia/c2.js';
import * as c3 from './academia/c3.js';
import * as c4 from './academia/c4.js';
import * as c5 from './academia/c5.js';
import * as c6 from './academia/c6.js';

export const PAISES_COMPARADOS = ['Cuba', 'Estados Unidos', 'Alemania', 'España', 'Costa Rica'];

export const cursos = [
  {
    id: 'derechos-humanos',
    num: 1,
    titulo: 'Derechos humanos en la práctica',
    foto: 'derechos',
    estado: 'disponible',
    minutos: 25,
    insignia: 'Derechos humanos en la práctica',
    resumen:
      'Qué son los derechos universales, cómo los protegen distintas democracias, Estados Unidos entre ellas, y qué dice la Constitución cubana de 2019. Al final, cinco preguntas para comprobar si un derecho funciona más allá del papel.',
    lecciones: [
      {
        id: 'universales',
        titulo: 'Derechos que no dependen de una votación',
        minutos: 6,
        bloques: [
          { p: 'El 10 de diciembre de 1948 la Asamblea General de las Naciones Unidas aprobó la Declaración Universal de Derechos Humanos. Su primer artículo resume la idea central:' },
          { cita: 'Todos los seres humanos nacen libres e iguales en dignidad y derechos.', fuente: 'Declaración Universal de Derechos Humanos, artículo 1' },
          { p: 'Universal significa que estos derechos corresponden a cada persona por el hecho de serlo. Ningún gobierno los concede y ninguna mayoría puede retirarlos. Por eso en ENTRE TODOS los derechos fundamentales no se someten a votación: se votan las propuestas para garantizarlos mejor.' },
          { p: 'La Declaración no es un tratado. Para convertir sus principios en obligaciones jurídicas, la ONU aprobó en 1966 dos pactos: el Pacto Internacional de Derechos Civiles y Políticos (expresión, reunión, asociación, juicio justo, elecciones) y el Pacto Internacional de Derechos Económicos, Sociales y Culturales (trabajo, salud, educación, vivienda).' },
          { h: 'Firmar no es ratificar' },
          { p: 'Un Estado que firma un pacto expresa su intención de cumplirlo. Solo al ratificarlo queda jurídicamente obligado y se somete a la supervisión internacional prevista en el tratado.' },
          { p: 'Cuba firmó los dos pactos el 28 de febrero de 2008 y hasta hoy no ha ratificado ninguno. Estados Unidos ratificó el de derechos civiles y políticos en 1992 y firmó el de derechos económicos, sociales y culturales en 1977 sin ratificarlo. Son dos situaciones distintas que conviene conocer con exactitud.' },
        ],
      },
      {
        id: 'democracias',
        titulo: 'Cómo los protegen otras democracias',
        minutos: 7,
        bloques: [
          { p: 'Las democracias no protegen los derechos de una sola manera. Comparar varias ayuda a distinguir lo esencial de lo que es una elección de cada país. Esta comparación no ordena a los países de mejor a peor.' },
          { h: 'Estados Unidos' },
          { p: 'La Constitución de 1787 se completó en 1791 con la Carta de Derechos, sus diez primeras enmiendas. La Primera Enmienda dice:' },
          { cita: 'El Congreso no hará ley alguna por la que adopte una religión como oficial del Estado o se prohíba practicarla libremente, o que coarte la libertad de expresión o de prensa, o el derecho del pueblo para reunirse pacíficamente y para pedir al gobierno la reparación de agravios.', fuente: 'Constitución de los Estados Unidos, Primera Enmienda (1791)' },
          { p: 'Desde el caso Marbury contra Madison (1803), los tribunales pueden anular una ley contraria a la Constitución. Cualquier persona puede llevar ante un juez a una autoridad que viole sus derechos.' },
          { h: 'Alemania' },
          { p: 'La Ley Fundamental de 1949 se escribió tras la dictadura nazi y empieza por la dignidad:' },
          { cita: 'La dignidad humana es intangible. Respetarla y protegerla es obligación de todo poder público.', fuente: 'Ley Fundamental de la República Federal de Alemania, artículo 1.1' },
          { p: 'Su artículo 79.3 prohíbe reformar ese principio y la estructura democrática del Estado, incluso con mayoría. Un Tribunal Constitucional Federal resuelve las demandas de los ciudadanos contra actos del poder público.' },
          { h: 'España' },
          { p: 'La Constitución de 1978, aprobada en referéndum tras la dictadura franquista, reconoce la libertad de expresión en su artículo 20 y añade que su ejercicio no puede restringirse mediante ningún tipo de censura previa. Quien considera violado un derecho fundamental puede presentar un recurso de amparo ante el Tribunal Constitucional.' },
          { h: 'Costa Rica' },
          { p: 'La Constitución de 1949 reconoce el recurso de amparo y el de hábeas corpus. Desde 1989 una Sala Constitucional de la Corte Suprema los resuelve, y cualquier persona puede acudir a ella sin abogado.' },
          { h: 'Lo que comparten y en qué difieren' },
          { p: 'Las cuatro tienen derechos escritos, un juez independiente al que acudir y límites que ninguna mayoría puede saltarse. Difieren en muchos detalles. Un ejemplo: Alemania castiga penalmente la incitación al odio contra grupos de población; en Estados Unidos, desde el caso Brandenburg contra Ohio (1969), incluso el discurso ofensivo está protegido salvo que incite a una violencia inminente y probable. Son dos respuestas democráticas distintas a la misma pregunta.' },
        ],
        tabla: {
          titulo: 'Cinco países, los mismos datos',
          columnas: ['País', 'Texto de derechos', 'Quién controla que se respeten', 'Pacto de derechos civiles y políticos', 'Pacto de derechos económicos, sociales y culturales'],
          filas: [
            ['Cuba', 'Constitución de 2019', 'La Asamblea Nacional del Poder Popular, el mismo órgano que aprueba las leyes; no hay tribunal constitucional', 'Firmado en 2008, no ratificado', 'Firmado en 2008, no ratificado'],
            ['Estados Unidos', 'Constitución de 1787 y Carta de Derechos de 1791', 'Tribunales federales y Corte Suprema', 'Ratificado en 1992', 'Firmado en 1977, no ratificado'],
            ['Alemania', 'Ley Fundamental de 1949', 'Tribunal Constitucional Federal', 'Ratificado en 1973', 'Ratificado en 1973'],
            ['España', 'Constitución de 1978', 'Tribunal Constitucional (recurso de amparo)', 'Ratificado en 1977', 'Ratificado en 1977'],
            ['Costa Rica', 'Constitución de 1949', 'Sala Constitucional de la Corte Suprema (desde 1989)', 'Ratificado en 1968', 'Ratificado en 1968'],
          ],
        },
      },
      {
        id: 'cuba-2019',
        titulo: 'Qué dice la Constitución cubana de 2019',
        minutos: 7,
        bloques: [
          { p: 'La Constitución vigente se aprobó en referéndum el 24 de febrero de 2019 y se proclamó el 10 de abril de ese año. Reconoce derechos con un lenguaje que se parece al de otras constituciones. La diferencia está en las condiciones que los acompañan. Conviene leer el texto directamente.' },
          { cita: 'El Estado reconoce, respeta y garantiza a las personas la libertad de pensamiento, conciencia y expresión.', fuente: 'Constitución de Cuba (2019), artículo 54' },
          { cita: 'Se reconoce a las personas la libertad de prensa. Este derecho se ejerce de conformidad con la ley y los fines de la sociedad. Los medios fundamentales de comunicación social, en cualquiera de sus manifestaciones y soportes, son de propiedad socialista de todo el pueblo o de las organizaciones políticas, sociales y de masas.', fuente: 'Constitución de Cuba (2019), artículo 55 (fragmento)' },
          { cita: 'Los derechos de reunión, manifestación y asociación, con fines lícitos y pacíficos, se reconocen por el Estado siempre que se ejerzan con respeto al orden público y el acatamiento a las preceptivas establecidas en la ley.', fuente: 'Constitución de Cuba (2019), artículo 56' },
          { p: 'El mismo texto fija un marco que ningún derecho puede cuestionar:' },
          { cita: 'El sistema socialista que refrenda esta Constitución, es irrevocable.', fuente: 'Constitución de Cuba (2019), artículo 4' },
          { cita: 'El Partido Comunista de Cuba, único, martiano, fidelista, marxista y leninista, vanguardia organizada de la nación cubana, [...] es la fuerza política dirigente superior de la sociedad y del Estado.', fuente: 'Constitución de Cuba (2019), artículo 5 (fragmento)' },
          { h: 'Cómo se reclama' },
          { p: 'Desde 2022 la Ley 153, de amparo de los derechos constitucionales, permite reclamar ante los tribunales populares. El control de que las leyes respeten la Constitución corresponde a la Asamblea Nacional del Poder Popular, que también las aprueba. La pregunta práctica es si un ciudadano puede ganar un caso contra el Estado cuando el derecho que invoca choca con los fines que la propia Constitución declara superiores.' },
          { p: 'Esta lección cita el texto y no lo califica. Las propuestas del banco de ENTRE TODOS sobre derechos y sobre una nueva Constitución recogen las respuestas que distintas organizaciones cubanas han dado a esa pregunta.' },
        ],
      },
      {
        id: 'practica',
        titulo: 'Del papel a la práctica: cinco preguntas',
        minutos: 5,
        bloques: [
          { p: 'Un derecho escrito no basta. Estas cinco preguntas sirven para examinar cualquier derecho en cualquier país, también en el futuro de Cuba:' },
          { lista: [
            '¿Está escrito en la Constitución con claridad y sin remitir todo a una ley posterior?',
            '¿Hay un juez independiente del gobierno al que la persona pueda acudir si se viola?',
            '¿Se puede ejercer sin pedir permiso previo a la autoridad?',
            '¿Hay prensa libre que informe cuando se viola?',
            '¿Está protegido contra la mayoría del momento, de modo que una votación no pueda suprimirlo?',
          ] },
          { p: 'Ningún país responde perfectamente a las cinco. Las democracias se distinguen porque cuando fallan existe un camino para corregirlo: tribunales, prensa, elecciones y organizaciones ciudadanas que no dependen del poder.' },
          { p: 'Puedes aplicar estas preguntas a las propuestas del banco: ¿cuáles proponen jueces independientes?, ¿cuáles eliminan los permisos previos?, ¿cuáles protegen a la prensa?' },
        ],
      },
    ],
    preguntas: [
      { q: '¿En qué año aprobó la Asamblea General de la ONU la Declaración Universal de Derechos Humanos?', o: ['1948', '1959', '1966', '1976'], c: 0, e: 'La aprobó el 10 de diciembre de 1948. En 1966 se aprobaron los dos pactos internacionales.' },
      { q: '¿Qué significa que un derecho humano sea universal?', o: ['Que cada gobierno lo concede a sus ciudadanos', 'Que lo decide una mayoría en votación', 'Que solo rige en los países de la ONU', 'Que corresponde a toda persona por el hecho de serlo'], c: 3, e: 'Los derechos humanos no los concede el Estado ni los decide una mayoría: pertenecen a cada persona.' },
      { q: 'Cuba firmó en 2008 los dos pactos internacionales de 1966. ¿Cuál es su situación hoy?', o: ['Los firmó y no los ha ratificado', 'Los ratificó y están en vigor para Cuba', 'Nunca los firmó', 'Los denunció en 2019'], c: 0, e: 'Los firmó el 28 de febrero de 2008 y no ha ratificado ninguno, por lo que no está obligada por ellos ni sometida a su supervisión.' },
      { q: 'En Estados Unidos, ¿qué texto prohíbe al Congreso limitar la libertad de expresión, de prensa y de religión?', o: ['La Declaración de Independencia', 'La Ley Fundamental', 'La Primera Enmienda de la Constitución', 'La Carta de las Naciones Unidas'], c: 2, e: 'La Primera Enmienda, parte de la Carta de Derechos de 1791.' },
      { q: 'Alemania y Estados Unidos tratan de forma distinta la incitación al odio. ¿Qué afirmación es correcta?', o: ['Las dos la castigan igual', 'Estados Unidos la castiga con más dureza que Alemania', 'Ninguna de las dos protege la libertad de expresión', 'Alemania la castiga penalmente; en Estados Unidos casi todo discurso ofensivo está protegido salvo la incitación a una violencia inminente'], c: 3, e: 'Son dos respuestas democráticas distintas. La comparación muestra opciones, no un ganador.' },
      { q: 'En España, ¿qué puede hacer una persona que considera violado un derecho fundamental?', o: ['Presentar un recurso de amparo ante el Tribunal Constitucional', 'Pedir un referéndum', 'Esperar a las siguientes elecciones', 'Nada: solo el Gobierno puede reclamar'], c: 0, e: 'El recurso de amparo permite a cualquier persona llegar al Tribunal Constitucional. Costa Rica tiene una vía parecida en su Sala Constitucional.' },
      { q: 'La Constitución cubana de 2019 reconoce la libertad de prensa en su artículo 55. ¿Qué condición añade?', o: ['Ninguna', 'Que requiere una licencia internacional', 'Que se ejerce conforme a la ley y los fines de la sociedad, y que los medios fundamentales son de propiedad socialista', 'Que solo la tienen los periodistas extranjeros'], c: 2, e: 'El artículo reconoce el derecho y en la misma frase lo condiciona a la ley y a los fines de la sociedad, y reserva la propiedad de los medios fundamentales.' },
      { q: '¿Qué elemento comparten Estados Unidos, Alemania, España y Costa Rica para proteger los derechos?', o: ['El mismo sistema electoral', 'Un juez independiente al que la persona puede acudir cuando el poder los viola', 'Un partido que garantiza los derechos', 'La misma ley sobre discurso de odio'], c: 1, e: 'Los cuatro tienen jueces independientes con poder para corregir al gobierno. Los sistemas electorales y las leyes sobre discurso varían.' },
    ],
    fuentes: [
      { t: 'Declaración Universal de Derechos Humanos (ONU, 1948)', url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights' },
      { t: 'Pacto Internacional de Derechos Civiles y Políticos (ACNUDH)', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { t: 'Estado de ratificación de los tratados de la ONU por país', url: 'https://indicators.ohchr.org/' },
      { t: 'ONU: Cuba firma los dos pactos internacionales (28 de febrero de 2008)', url: 'https://press.un.org/en/2008/080228_cuba.doc.htm' },
      { t: 'Constitución de los Estados Unidos y Carta de Derechos (Archivos Nacionales)', url: 'https://www.archives.gov/espanol/constitucion' },
      { t: 'Ley Fundamental de Alemania (Bundestag, en español)', url: 'https://www.btg-bestellservice.de/pdf/80206000.pdf' },
      { t: 'Constitución Española de 1978 (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229' },
      { t: 'Constitución de Cuba de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
      { t: 'Ley 153 de 2022, de amparo de los derechos constitucionales (Diccionario panhispánico del español jurídico)', url: 'https://dpej.rae.es/eli/cu/l/2022/05/15/153' },
    ],
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
];

export const cursoPorId = Object.fromEntries(cursos.map((c) => [c.id, c]));
