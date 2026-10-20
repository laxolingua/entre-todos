// Módulo «Pensar y debatir», bloque 9: Pensamiento ético. Texto propio de ENTRE TODOS.
export const lecciones = [
  {
    id: 'que-hace-que-algo-este-bien',
    titulo: '¿Qué hace que algo esté bien?',
    bloques: [
      { p: 'Todos los días decidimos qué está bien y qué está mal, casi siempre sin pensarlo. Cuando dos personas no están de acuerdo, ayuda saber que la filosofía lleva más de dos mil años dando tres grandes respuestas a esta pregunta.' },
      { h: 'Por sus consecuencias' },
      { p: 'Para filósofos como Jeremy Bentham y John Stuart Mill, en el siglo XIX, una acción es buena si produce el mayor bienestar posible para el mayor número. Lo que importa es el resultado. Su fuerza: obliga a pensar en todos los afectados. Su riesgo: podría justificar el daño a unos pocos si beneficia a muchos.' },
      { h: 'Por el deber' },
      { p: 'Para Immanuel Kant, en el siglo XVIII, hay cosas que no se deben hacer aunque den buen resultado, porque tratan a una persona solo como un medio para otro fin. Mentir, torturar o usar a alguien están mal en sí mismos. Su fuerza: protege a cada persona frente a la mayoría. Es la idea que está detrás de los derechos humanos. Su riesgo: puede volverse rígida cuando dos deberes chocan.' },
      { h: 'Por el carácter' },
      { p: 'Para Aristóteles, en la Grecia antigua, la pregunta no es solo «¿qué debo hacer?», sino «¿qué clase de persona quiero ser?». Las virtudes, como la valentía, la justicia o la honestidad, se aprenden con la práctica, como un oficio. Su fuerza: mira la vida entera, no solo una decisión. Su riesgo: no siempre dice qué hacer en un caso concreto.' },
      { h: 'Usarlas juntas' },
      { p: 'Las tres no se excluyen. Ante una decisión difícil, se pueden hacer tres preguntas: ¿qué consecuencias tendrá para todos los afectados?, ¿respeta los derechos de cada persona?, ¿qué haría una persona justa y honesta?' },
    ],
  },
  {
    id: 'fines-y-medios',
    titulo: '¿Vale cualquier medio si el fin es bueno?',
    bloques: [
      { p: 'Muchos de los peores abusos de la historia se cometieron en nombre de un fin que sus autores consideraban bueno: la patria, la revolución, la seguridad, la fe. Por eso la pregunta sobre fines y medios es una de las más importantes para una sociedad que quiere cambiar.' },
      { h: 'El problema' },
      { p: 'Si el fin justifica los medios, cualquier abuso se puede defender diciendo que sirve a algo mayor. Y quien decide cuál es ese fin suele ser quien tiene el poder. Las personas concretas, con nombre y familia, acaban sacrificadas por una idea.' },
      { h: 'Los límites que ha fijado la humanidad' },
      { p: 'Tras la Segunda Guerra Mundial, el derecho internacional fijó límites que no se pueden cruzar por ningún fin: la prohibición de la tortura, de la desaparición forzada, de la esclavitud y del genocidio no admite excepciones, ni siquiera en guerra o emergencia.' },
      { h: 'Aplicado al cambio en Cuba' },
      { p: 'La pregunta también vale para quienes quieren un cambio. Una transición que usara los métodos que critica, como la persecución del que piensa distinto, la delación o el castigo sin juicio, reproduciría lo que quería dejar atrás. Los medios no son solo el camino: son una parte del lugar al que se llega.' },
      { h: 'Un dilema para pensar' },
      { p: 'Durante una crisis, un gobierno propone suspender una libertad durante un tiempo «por el bien de todos». ¿Qué condiciones tendría que cumplir para aceptarlo? ¿Quién controlaría que la suspensión termine?' },
    ],
  },
  {
    id: 'circulo-moral',
    titulo: '¿Hasta dónde llega nuestra responsabilidad?',
    bloques: [
      { p: 'A lo largo de la historia, el grupo de seres que merecen consideración moral se ha ido ampliando: de la propia familia o tribu a la nación, de un sexo o una raza a toda la humanidad. Algunos filósofos llaman a este grupo el «círculo moral».' },
      { h: 'Los animales' },
      { cita: 'La cuestión no es ¿pueden razonar?, ni ¿pueden hablar?, sino ¿pueden sufrir?', fuente: 'Jeremy Bentham, Introducción a los principios de la moral y la legislación (1789)' },
      { p: 'Si lo que importa moralmente es la capacidad de sufrir, los animales entran en el círculo. Muchas democracias han reconocido en sus leyes que los animales son seres sensibles, no simples objetos. En Cuba, el Decreto-Ley 31 de 2021 sobre bienestar animal fue la primera norma general en esa materia, tras años de reclamos de grupos protectores.' },
      { h: 'El medio ambiente y las generaciones futuras' },
      { p: 'Ríos, costas, suelos y bosques no sufren como un animal, pero de ellos depende la vida de personas y animales, hoy y mañana. Por eso muchas constituciones protegen el medio ambiente y algunas hablan de los derechos de las generaciones futuras.' },
      { h: 'Una regla práctica' },
      { p: 'Una forma de tomar decisiones que tiene en cuenta todo el círculo es preguntarse qué opción hace el mayor bien y el menor daño a las personas, a los animales y al medio ambiente. Es el criterio que usan la educación humana y la Gobernanza Solucionaria, y lo verás en los bloques siguientes.' },
    ],
  },
];

export const entradas = {
  'que-hace-que-algo-este-bien': {
    gancho: { q: '¿Está bien mentir para evitar un daño mayor?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Consecuencias, deber y carácter: tres respuestas de la filosofía a la pregunta de qué está bien, y cómo usarlas juntas.',
    th: 'Ya conoces tres formas de juzgar una acción. ¿Sabrías reconocerlas? Compruébalo.',
    relacionadas: ['dignidad-humana', 'carta-de-derechos'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué enfoque es?', instrucciones: 'Elige qué enfoque usa cada razonamiento.',
        opciones: ['Consecuencias', 'Deber', 'Carácter'],
        items: [
          { a: 'Hay que elegir la opción que más bienestar dé a más personas.', b: 'Consecuencias' },
          { a: 'No se puede torturar a nadie, aunque sirva para algo.', b: 'Deber' },
          { a: '¿Qué haría aquí una persona honesta?', b: 'Carácter' },
        ],
      },
      {
        tipo: 'relaciona', titulo: '¿Quién lo dijo?', instrucciones: 'Elige qué filósofo se asocia a cada idea.',
        opciones: ['Mill', 'Kant', 'Aristóteles'],
        items: [
          { a: 'El mayor bienestar para el mayor número', b: 'Mill' },
          { a: 'No tratar nunca a una persona solo como un medio', b: 'Kant' },
          { a: 'Las virtudes se aprenden con la práctica', b: 'Aristóteles' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tres preguntas', instrucciones: 'Piensa en una decisión difícil que hayas tomado. Analízala con las tres preguntas: consecuencias, derechos y carácter.',
        guia: ['Consecuencias', 'Derechos', 'Carácter'],
        ejemplo: '',
      },
    ],
  },
  'fines-y-medios': {
    gancho: { q: '¿Justifica un buen fin cualquier medio?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Por qué muchos abusos se cometieron en nombre de un fin bueno, qué límites fijó el derecho internacional y qué significa para un cambio en Cuba.',
    th: 'Ya conoces el problema de los fines y los medios. Compruébalo.',
    relacionadas: ['justicia-transicional', 'emergencia-caduca', 'debido-proceso'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'El derecho internacional permite la tortura en situaciones de emergencia.', v: false, e: 'La prohibición de la tortura no admite excepciones.' },
          { t: 'Una transición que persigue al que piensa distinto reproduce lo que quiere dejar atrás.', v: true, e: 'Los medios forman parte del resultado.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'El dilema', instrucciones: 'Un gobierno quiere suspender una libertad durante una crisis. Escribe tres condiciones que exigirías para aceptarlo.',
        guia: ['Cuánto tiempo', 'Quién lo controla', 'Qué no se puede suspender nunca'],
        ejemplo: '',
      },
    ],
  },
  'circulo-moral': {
    gancho: { q: '¿Deberían las leyes proteger a los animales del sufrimiento?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Cómo se ha ido ampliando a lo largo de la historia el grupo de seres que merecen consideración moral: los animales, el medio ambiente y las generaciones futuras.',
    th: 'Ya conoces la idea del círculo moral. Compruébalo.',
    relacionadas: ['estatuto-juridico-animales', 'proteccion-ambiental', 'generaciones-futuras'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Para Bentham, lo que importa moralmente es si un ser puede sufrir.', v: true, e: '«La cuestión no es ¿pueden razonar?, sino ¿pueden sufrir?».' },
          { t: 'Cuba no tiene ninguna norma de bienestar animal.', v: false, e: 'El Decreto-Ley 31 de 2021 es su primera norma general.' },
          { t: 'Algunas constituciones mencionan los derechos de las generaciones futuras.', v: true, e: 'Protegen el medio ambiente también para quienes vendrán.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'El mayor bien, el menor daño', instrucciones: 'Elige una decisión de tu barrio (por ejemplo, qué hacer con los perros callejeros) y escribe qué opción haría el mayor bien y el menor daño a personas, animales y medio ambiente.',
        guia: ['Personas', 'Animales', 'Medio ambiente'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué enfoque juzga una acción por sus resultados?', o: ['El del deber', 'El de las consecuencias', 'El del carácter', 'Ninguno'], c: 1, e: 'Bentham y Mill.' },
  { q: '¿Qué idea de Kant está detrás de los derechos humanos?', o: ['El mayor bienestar para el mayor número', 'No tratar nunca a una persona solo como un medio', 'Las virtudes se aprenden', 'El fin justifica los medios'], c: 1, e: 'Protege a cada persona frente a la mayoría.' },
  { q: '¿Cuál de estas prohibiciones no admite excepciones según el derecho internacional?', o: ['La de reunirse', 'La de la tortura', 'La de viajar', 'La de publicar'], c: 1, e: 'Tampoco la desaparición forzada, la esclavitud ni el genocidio.' },
  { q: 'Según Bentham, ¿qué cuenta para la consideración moral?', o: ['Poder razonar', 'Poder hablar', 'Poder sufrir', 'Ser humano'], c: 2, e: 'Por eso incluye a los animales.' },
];

export const fuentes = [
  { t: 'Gaceta Oficial de la República de Cuba (Decreto-Ley 31 de 2021, de bienestar animal)', url: 'https://www.gacetaoficial.gob.cu/' },
  { t: 'Convención contra la Tortura (ACNUDH)', url: 'https://www.ohchr.org/es/instruments-listings' },
];
