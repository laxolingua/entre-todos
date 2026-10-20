// Bloque 1, serie «La nueva Cuba». Cada lección: la duda, hoy en breve, qué exige el derecho internacional,
// cómo lo resolvieron otras democracias (con lo que salió bien y lo que se les critica), y qué proponen las propuestas del banco.
// Regla de neutralidad: ninguna lección recomienda una opción; las propuestas se muestran en orden aleatorio.
export const NEUTRAL = 'Esta lección presenta opciones y experiencias; no recomienda ninguna.';

export const lecciones = [
  {
    id: 'universales',
    titulo: 'Después del cambio, ¿tendrían derechos también los que reprimieron?',
    bloques: [
      { p: 'Es una de las preguntas más difíciles de cualquier transición. Muchas personas que sufrieron la represión piensan que quienes la ejercieron no merecen las garantías que negaron a otros. Otras piensan que una democracia se distingue justamente porque las ofrece a todos.' },
      { h: 'Hoy, en breve' },
      { p: 'Cuba firmó en 2008 los dos pactos internacionales de derechos humanos de 1966 y no ha ratificado ninguno. Firmar expresa la intención de cumplir un tratado; solo la ratificación obliga al Estado y lo somete a la supervisión internacional.' },
      { h: 'Qué exige el derecho internacional' },
      { cita: 'Todos los seres humanos nacen libres e iguales en dignidad y derechos.', fuente: 'Declaración Universal de Derechos Humanos, artículo 1' },
      { p: 'Los derechos humanos son universales: corresponden a cada persona por el hecho de serlo, también a quien cometió delitos. El Pacto Internacional de Derechos Civiles y Políticos garantiza a toda persona acusada un juicio justo, con abogado y presunción de inocencia (artículo 14).' },
      { p: 'El mismo Pacto prohíbe castigar a alguien por un acto que no era delito cuando se cometió, pero añade una excepción: sí se puede juzgar un acto que ya era delictivo según los principios generales del derecho reconocidos por la comunidad internacional (artículo 15). Es la base sobre la que se han juzgado torturas y asesinatos cometidos por orden de un Estado.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Alemania, tras la RDA.</strong> Los tribunales de la Alemania reunificada juzgaron a guardias fronterizos que dispararon contra personas que intentaban cruzar el Muro y a los dirigentes que dieron las órdenes. Egon Krenz, último secretario general del partido gobernante de la RDA, fue condenado en 1997. Todos los acusados tuvieron abogado y juicio público. Lo que se le critica: muchas condenas fueron leves o suspendidas, y para algunas víctimas la justicia llegó tarde o no llegó.' },
      { p: '<strong>España.</strong> La Ley de Amnistía de 1977, aprobada por las primeras Cortes democráticas, liberó a presos políticos y también impidió juzgar los delitos cometidos por funcionarios de la dictadura. Facilitó un acuerdo entre fuerzas muy enfrentadas. Lo que se le critica: órganos de Naciones Unidas han pedido a España que no la use para impedir investigar crímenes graves.' },
      { p: '<strong>Chile.</strong> La democracia recuperada en 1990 creó la Comisión Nacional de Verdad y Reconciliación, que documentó las muertes y desapariciones de la dictadura. Los juicios llegaron más tarde, cuando los tribunales dejaron de aplicar la amnistía de 1978 a los casos de desaparición.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'El banco reúne cuatro caminos que distintas fuentes proponen para Cuba: una amnistía recíproca, la justicia transicional, una comisión de la verdad y la exclusión temporal de cargos públicos de quienes participaron en la represión (lustración). Algunos se pueden combinar. Las encontrarás al final de esta lección, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Tres transiciones, la misma pregunta', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'Qué hizo con los responsables', 'Lo que se le critica'],
      filas: [
        ['Alemania (desde 1990)', 'Juicios con todas las garantías a guardias y dirigentes', 'Condenas leves o tardías'],
        ['España (1977)', 'Amnistía también para los funcionarios de la dictadura', 'Impide investigar crímenes graves'],
        ['Chile (desde 1990)', 'Comisión de la verdad primero, juicios después', 'La justicia tardó años en llegar'],
      ],
    },
  },
  {
    id: 'democracias',
    titulo: '¿Hay un solo modelo de democracia?',
    bloques: [
      { p: 'Cuando se habla de una Cuba democrática, mucha gente piensa en un único modelo, casi siempre el de Estados Unidos. Pero las democracias se organizan de formas muy distintas. Conocerlas ayuda a ver qué es esencial y qué es una elección de cada país.' },
      { h: 'Hoy, en breve' },
      { p: 'La Constitución de 2019 define a la Asamblea Nacional del Poder Popular como el órgano supremo del Estado. La Asamblea elige al presidente de la República y aprueba las leyes, y un solo partido está reconocido como fuerza dirigente.' },
      { h: 'Qué exige el derecho internacional' },
      { cita: 'Todos los ciudadanos gozarán [...] del derecho a votar y ser elegidos en elecciones periódicas, auténticas, realizadas por sufragio universal e igual y por voto secreto que garantice la libre expresión de la voluntad de los electores.', fuente: 'Pacto Internacional de Derechos Civiles y Políticos, artículo 25 (fragmento)' },
      { p: 'El derecho internacional exige elecciones auténticas, libertades y jueces que protejan los derechos. No impone un sistema de gobierno: deja que cada pueblo elija el suyo.' },
      { h: 'Cómo lo hacen otras democracias' },
      { p: '<strong>Estados Unidos y Costa Rica: sistemas presidenciales.</strong> Los ciudadanos eligen directamente al presidente, que es a la vez jefe de Estado y de Gobierno, y el parlamento no puede destituirlo por desacuerdo político. Lo que se valora: un gobierno estable durante todo su mandato. Lo que se critica: cuando presidente y parlamento chocan, la política puede bloquearse.' },
      { p: '<strong>Alemania y España: sistemas parlamentarios.</strong> Los ciudadanos eligen el parlamento, y el parlamento elige al jefe de Gobierno. Puede sustituirlo con una moción de censura, siempre que elija a la vez a otro. Lo que se valora: el gobierno depende de mayorías y tiene que negociar. Lo que se critica: si no hay mayoría clara, formar gobierno puede tardar meses.' },
      { h: 'Lo que comparten' },
      { p: 'En los cuatro países hay varios partidos y candidaturas que compiten de verdad, jueces independientes a los que acudir y derechos que ninguna mayoría puede suprimir. Esa es la parte común de cualquier democracia plural. Lo demás se puede elegir.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Para Cuba, las fuentes del banco proponen caminos distintos: un sistema semiparlamentario, un presidente elegido directamente, un parlamento con dos cámaras o un ejecutivo técnico no partidista. Los encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Cuatro democracias, los mismos datos', tras: 'Cómo lo hacen otras democracias',
      columnas: ['País', 'Sistema', 'Quién elige al jefe de Gobierno', 'Quién protege los derechos'],
      filas: [
        ['Estados Unidos', 'Presidencial', 'Los ciudadanos (mediante el Colegio Electoral)', 'Tribunales federales y Corte Suprema'],
        ['Costa Rica', 'Presidencial', 'Los ciudadanos', 'Sala Constitucional de la Corte Suprema'],
        ['Alemania', 'Parlamentario', 'El Bundestag', 'Tribunal Constitucional Federal'],
        ['España', 'Parlamentario, con monarquía', 'El Congreso de los Diputados', 'Tribunal Constitucional'],
      ],
    },
  },
  {
    id: 'cuba-2019',
    titulo: '¿Sirve de algo la Constitución de 2019 en una transición, o hay que empezar de cero?',
    bloques: [
      { p: 'El día que empiece un cambio en Cuba habrá que decidir qué reglas rigen mientras tanto. Unos proponen reformar la Constitución vigente para ir paso a paso; otros, recuperar la de 1940; otros, convocar enseguida una asamblea constituyente.' },
      { h: 'Hoy, en breve' },
      { p: 'La Constitución de 2019 reconoce derechos con un lenguaje parecido al de otras constituciones, pero declara irrevocable el sistema socialista (artículo 4) y reserva a un solo partido la dirección de la sociedad y del Estado (artículo 5). Permite reformarla, pero su artículo 229 excluye de cualquier reforma la irrevocabilidad del sistema.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'El derecho internacional no dice cómo se cambia una constitución. Reconoce el derecho de los pueblos a determinar libremente su condición política (artículo 1 de los dos pactos de 1966) y el de cada ciudadano a participar en los asuntos públicos (artículo 25 del Pacto de derechos civiles y políticos).' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>España: de la ley a la ley.</strong> En 1976 las Cortes franquistas aprobaron la Ley para la Reforma Política, que se votó en referéndum y abrió paso a elecciones libres en 1977. Esas Cortes elegidas redactaron la Constitución de 1978. Lo que se valora: un cambio sin vacío legal. Lo que se critica: obligó a pactar con quienes venían del régimen.' },
      { p: '<strong>Polonia: reformar primero, escribir después.</strong> En 1989 se reformó la Constitución comunista de 1952 tras las negociaciones de la Mesa Redonda. La Constitución nueva no llegó hasta 1997. Lo que se valora: estabilidad durante el cambio. Lo que se critica: durante años convivieron normas viejas y nuevas.' },
      { p: '<strong>Chile: la constitución heredada.</strong> La democracia de 1990 mantuvo la Constitución de 1980 con reformas, la mayor en 2005. En 2020 los chilenos votaron redactar una nueva, pero rechazaron en plebiscito las dos propuestas que se presentaron, en 2022 y en 2023. Muestra que empezar de cero tampoco garantiza un acuerdo.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen seis caminos: restablecer la Constitución de 1940, reformar provisionalmente la de 2019, reformarla con una cláusula que lleve a una constituyente, reformarla sin más, convocar una asamblea constituyente o celebrar elecciones antes de la constituyente. Los encontrarás al final, en orden aleatorio.' },
    ],
  },
  {
    id: 'practica',
    titulo: '¿Cómo saber si un derecho funciona de verdad?',
    bloques: [
      { p: 'Una nueva Constitución puede escribir todos los derechos imaginables y aun así no protegerlos. Ha pasado en muchos países. Estas cinco preguntas sirven para comprobar si un derecho funcionará de verdad en la nueva Cuba, sea cual sea el modelo que se elija.' },
      { lista: [
        '¿Está escrito con claridad, sin remitirlo todo a una ley posterior?',
        '¿Hay un juez independiente del gobierno al que la persona pueda acudir si se viola?',
        '¿Se puede ejercer sin pedir permiso previo a la autoridad?',
        '¿Hay prensa libre que informe cuando se viola?',
        '¿Está protegido frente a la mayoría del momento, de modo que una votación no pueda suprimirlo?',
      ] },
      { h: 'Hoy, en breve' },
      { p: 'La Constitución de 2019 reconoce derechos, pero varios dependen de que se ejerzan «conforme a la ley» o a los fines de la sociedad, y no existe un tribunal constitucional independiente: el control lo ejerce la misma Asamblea que aprueba las leyes.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'El Pacto de derechos civiles y políticos obliga a los Estados a garantizar un recurso efectivo a toda persona cuyos derechos sean violados, decidido por una autoridad competente (artículo 2.3).' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: 'Alemania y España crearon tribunales constitucionales a los que cualquier persona puede llegar mediante un recurso individual. Costa Rica permite acudir a su Sala Constitucional sin abogado. Lo que se critica en los tres casos: los tribunales se saturan y algunos recursos tardan años.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen una carta de derechos, recursos de amparo y garantías, y un tribunal constitucional. Las encontrarás al final, en orden aleatorio, para que apliques a cada una las cinco preguntas.' },
    ],
  },
];

export const entradas = {
  universales: {
    gancho: { q: '¿Deberían tener las mismas garantías en un juicio quienes reprimieron?', o: ['Sí', 'Depende del caso', 'No'] },
    entradilla: 'Qué exige el derecho internacional y qué hicieron Alemania, España y Chile con los responsables de la represión.',
    th: 'Has visto tres formas de responder la misma pregunta. ¿Recuerdas qué hizo cada país? Compruébalo.',
    relacionadas: ['amnistia-reciproca', 'justicia-transicional', 'comision-verdad', 'lustracion'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige qué hizo cada país con los responsables.',
        opciones: ['Alemania', 'España', 'Chile'],
        items: [
          { a: 'Juzgó a guardias fronterizos y a dirigentes', b: 'Alemania' },
          { a: 'Aprobó una amnistía en 1977', b: 'España' },
          { a: 'Creó una comisión de la verdad en 1990', b: 'Chile' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Según el derecho internacional, toda persona acusada tiene derecho a un juicio justo, también quien cometió delitos.', v: true, e: 'Lo garantiza el artículo 14 del Pacto de derechos civiles y políticos.' },
          { t: 'El Pacto prohíbe juzgar cualquier acto que no fuera delito según la ley del país cuando se cometió.', v: false, e: 'Hay una excepción: los actos delictivos según los principios generales del derecho reconocidos por la comunidad internacional.' },
          { t: 'Cuba ratificó en 2008 los pactos de 1966.', v: false, e: 'Los firmó en 2008 y no los ha ratificado.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu opinión', instrucciones: 'En dos o tres frases: ¿qué debería hacer la nueva Cuba con los responsables de la represión?',
        guia: ['Qué harías', 'Qué garantías tendrían', 'Qué recibirían las víctimas'],
        ejemplo: '',
      },
    ],
  },
  democracias: {
    gancho: { q: '¿Debería Cuba copiar el sistema de gobierno de Estados Unidos?', o: ['Sí', 'En parte', 'No'] },
    entradilla: 'Sistemas presidenciales y parlamentarios: en qué se diferencian y qué tienen en común todas las democracias plurales.',
    th: 'Has visto dos grandes formas de organizar una democracia. ¿Sabrías distinguirlas? Compruébalo.',
    relacionadas: ['gobierno-semiparlamentario', 'eleccion-directa-presidente', 'parlamento-bicameral', 'ejecutivo-tecnico-no-partidista'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Presidencial o parlamentario?', instrucciones: 'Elige el sistema de cada país.',
        opciones: ['Presidencial', 'Parlamentario'],
        items: [
          { a: 'Estados Unidos', b: 'Presidencial' },
          { a: 'Alemania', b: 'Parlamentario' },
          { a: 'Costa Rica', b: 'Presidencial' },
          { a: 'España', b: 'Parlamentario' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'El derecho internacional obliga a todos los países a tener un sistema presidencial.', v: false, e: 'Exige elecciones auténticas y derechos protegidos, no un sistema concreto.' },
          { t: 'En un sistema parlamentario el parlamento elige al jefe de Gobierno.', v: true, e: 'Y puede sustituirlo con una moción de censura.' },
          { t: 'Todas las democracias plurales tienen jueces independientes a los que acudir.', v: true, e: 'Es parte de lo que comparten, sea cual sea su sistema.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu opinión', instrucciones: 'En dos o tres frases: ¿qué sistema de gobierno te parece mejor para Cuba y por qué?',
        guia: ['Qué sistema', 'Qué problema resolvería', 'Qué riesgo tendría'],
        ejemplo: '',
      },
    ],
  },
  'cuba-2019': {
    gancho: { q: '¿Habría que empezar con una Constitución completamente nueva?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Reformar, restablecer o empezar de cero: lo que hicieron España, Polonia y Chile, y lo que proponen las fuentes para Cuba.',
    th: 'Has visto tres caminos distintos. ¿Recuerdas cuál siguió cada país? Compruébalo.',
    relacionadas: ['constitucion-1940', 'reforma-provisional-2019', 'reforma-clausula-hacia-constituyente', 'reforma-constitucional-vigente', 'asamblea-constituyente', 'elecciones-antes-de-constituyente'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige qué camino siguió cada país.',
        opciones: ['España', 'Polonia', 'Chile'],
        items: [
          { a: 'Una ley de reforma votada en referéndum abrió paso a elecciones libres', b: 'España' },
          { a: 'Reformó la constitución comunista y escribió una nueva en 1997', b: 'Polonia' },
          { a: 'Rechazó en plebiscito dos propuestas de constitución nueva', b: 'Chile' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'El derecho internacional fija cómo debe cambiarse una constitución.', v: false, e: 'Reconoce el derecho de cada pueblo a decidir su condición política, sin imponer un método.' },
          { t: 'La Constitución de 2019 permite reformar la irrevocabilidad del sistema socialista.', v: false, e: 'El artículo 229 la excluye de cualquier reforma.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu opinión', instrucciones: 'En dos o tres frases: ¿qué reglas deberían regir en Cuba mientras se hace una nueva Constitución?',
        guia: ['Qué texto regiría', 'Quién lo decidiría', 'Cuánto duraría'],
        ejemplo: '',
      },
    ],
  },
  practica: {
    gancho: { q: '¿Basta con que un derecho esté escrito en la Constitución?', o: ['Sí', 'Ayuda, pero no basta', 'No'] },
    entradilla: 'Cinco preguntas para comprobar si un derecho funcionará de verdad en la nueva Cuba.',
    th: 'Ahora te toca aplicarlas. Elige un derecho y examínalo con las cinco preguntas.',
    relacionadas: ['carta-de-derechos', 'amparo-y-garantias', 'tribunal-constitucional'],
    actividades: [
      {
        tipo: 'examen', titulo: 'Examina un derecho', instrucciones: 'Elige un derecho y responde las cinco preguntas pensando en la Cuba de hoy. No hay respuesta correcta: es tu análisis.',
        derechos: ['Libertad de expresión', 'Libertad de reunión', 'Libertad de prensa', 'Libertad de asociación', 'Juicio justo'],
        preguntas: [
          '¿Está escrito con claridad, sin remitirlo todo a una ley posterior?',
          '¿Hay un juez independiente del gobierno al que acudir?',
          '¿Se ejerce sin pedir permiso previo?',
          '¿Hay prensa libre que informe cuando se viola?',
          '¿Está protegido frente a la mayoría del momento?',
        ],
      },
      {
        tipo: 'escribe', titulo: 'Escribe tu versión', instrucciones: 'En dos o tres frases: ¿cómo garantizarías ese derecho en la nueva Constitución?',
        guia: ['Qué reconoce el derecho', 'Qué no puede exigirse para ejercerlo', 'A quién se acude si se viola'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué significa que los derechos humanos sean universales?', o: ['Que los concede cada gobierno', 'Que corresponden a toda persona, también a quien cometió delitos', 'Que los decide la mayoría', 'Que solo rigen en los países de la ONU'], c: 1, e: 'Corresponden a cada persona por el hecho de serlo.' },
  { q: '¿Cuál es la situación de Cuba respecto a los pactos de derechos humanos de 1966?', o: ['Los ratificó en 2008', 'Los firmó en 2008 y no los ha ratificado', 'Nunca los firmó', 'Los denunció en 2019'], c: 1, e: 'Firmar no obliga; ratificar sí.' },
  { q: '¿Qué hizo España en 1977 con los delitos de los funcionarios de la dictadura?', o: ['Los juzgó en tribunales especiales', 'Los incluyó en una ley de amnistía', 'Creó una comisión de la verdad', 'Los envió a la Corte Penal Internacional'], c: 1, e: 'La Ley de Amnistía de 1977 los incluyó, y hoy se le critica que impida investigar crímenes graves.' },
  { q: '¿En qué se diferencia un sistema parlamentario de uno presidencial?', o: ['En el parlamentario no hay elecciones', 'En el parlamentario el parlamento elige al jefe de Gobierno', 'En el presidencial no hay parlamento', 'No hay diferencia'], c: 1, e: 'En el presidencial lo eligen los ciudadanos.' },
  { q: '¿Qué exige el derecho internacional sobre el sistema de gobierno?', o: ['Un sistema presidencial', 'Un sistema parlamentario', 'Elecciones auténticas y derechos protegidos, sin imponer un sistema', 'Una monarquía constitucional'], c: 2, e: 'Cada pueblo elige su sistema.' },
  { q: '¿Qué país reformó primero su constitución comunista y escribió una nueva años después?', o: ['Chile', 'España', 'Polonia', 'Costa Rica'], c: 2, e: 'Polonia reformó la de 1952 en 1989 y aprobó una nueva en 1997.' },
  { q: '¿Qué muestra el caso de Chile entre 2020 y 2023?', o: ['Que una constitución nueva siempre se aprueba', 'Que empezar de cero tampoco garantiza un acuerdo', 'Que no se puede reformar una constitución', 'Que los plebiscitos están prohibidos'], c: 1, e: 'Rechazó en plebiscito las dos propuestas presentadas.' },
  { q: '¿Qué obliga el Pacto a garantizar a toda persona cuyos derechos se violen?', o: ['Una indemnización automática', 'Un recurso efectivo ante una autoridad competente', 'Asilo en otro país', 'Nada'], c: 1, e: 'Lo establece el artículo 2.3.' },
];

export const fuentes = [
  { t: 'Declaración Universal de Derechos Humanos (ONU, 1948)', url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights' },
  { t: 'Pacto Internacional de Derechos Civiles y Políticos (ACNUDH)', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
  { t: 'Estado de ratificación de los tratados de la ONU por país', url: 'https://indicators.ohchr.org/' },
  { t: 'Ley 46/1977, de Amnistía (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1977-24937' },
  { t: 'Ley 1/1977, para la Reforma Política (BOE)', url: 'https://www.boe.es/buscar/doc.php?id=BOE-A-1977-24' },
  { t: 'Informe de la Comisión Nacional de Verdad y Reconciliación de Chile', url: 'https://bibliotecadigital.indh.cl/' },
  { t: 'Constitución de Cuba de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
  { t: 'Constitución Española de 1978 (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229' },
  { t: 'Ley Fundamental de Alemania (Bundestag, en español)', url: 'https://www.btg-bestellservice.de/pdf/80206000.pdf' },
];
