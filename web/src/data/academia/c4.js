// Bloque 4, serie «La nueva Cuba»: rendición de cuentas.
// Formato del bloque 1. Regla de neutralidad: ninguna lección recomienda una opción.
export const lecciones = [
  {
    id: 'separacion-de-poderes',
    titulo: '¿Qué impediría que un nuevo gobierno se convirtiera en otra dictadura?',
    bloques: [
      { p: 'Muchos cubanos temen que, tras un cambio, quien llegue al poder lo use igual que el anterior. La historia de América Latina tiene ejemplos de líderes que llegaron con apoyo popular y luego concentraron todo el poder. La pregunta es qué reglas lo impiden.' },
      { h: 'Hoy, en breve' },
      { p: 'El artículo 5 de la Constitución de 2019 define al Partido Comunista como la «fuerza política dirigente superior de la sociedad y del Estado». La Asamblea Nacional elige al presidente, a los magistrados del Tribunal Supremo, al fiscal general y al contralor. No existe un tribunal que pueda anular una ley por inconstitucional.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'La Carta Democrática Interamericana (2001) enumera entre los elementos esenciales de la democracia la separación e independencia de los poderes públicos, el régimen plural de partidos y el acceso al poder con sujeción al Estado de derecho. Cuba no participa en la OEA.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Costa Rica.</strong> La Constitución de 1949 abolió el ejército. En 1989 creó la Sala Constitucional, que puede anular leyes, y su Tribunal Supremo de Elecciones tiene rango de cuarto poder. Lo que se valora: más de setenta años de alternancia pacífica. Lo que se critica: la Sala Constitucional ha llegado a tener tanto poder que algunos la acusan de gobernar.' },
      { p: '<strong>Venezuela.</strong> En 1999 una Asamblea Constituyente elegida con amplio apoyo se declaró por encima de los poderes existentes e intervino el Congreso y la justicia. Una enmienda de 2009 permitió después la reelección indefinida. Es un caso muy estudiado de cómo una mayoría electoral puede desmontar los contrapesos.' },
      { p: '<strong>Hungría.</strong> En 2011 un solo partido, con dos tercios del parlamento, aprobó una nueva Constitución y cambió la composición del Tribunal Constitucional. La Comisión de Venecia del Consejo de Europa y el Parlamento Europeo criticaron que debilitaba los contrapesos. Sus defensores responden que lo aprobó una mayoría elegida.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen un Estado de derecho con separación de poderes, un Tribunal Constitucional independiente, prohibir la perpetuación en el poder, la revocación de mandatos y un parlamento que controle al gobierno. Las encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Contrapesos que funcionaron y que se desmontaron', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'Qué pasó', 'Qué enseña'],
      filas: [
        ['Costa Rica', 'Sin ejército, Sala Constitucional y tribunal electoral fuerte', 'Contrapesos estables durante décadas'],
        ['Venezuela (1999)', 'La Constituyente intervino el Congreso y la justicia', 'Una mayoría puede desmontar los contrapesos'],
        ['Hungría (2011)', 'Nueva Constitución aprobada por un solo partido', 'Debate entre mayoría y contrapesos'],
      ],
    },
  },
  {
    id: 'elecciones-y-alternancia',
    titulo: '¿Cuánto tiempo debería pasar hasta las primeras elecciones libres?',
    bloques: [
      { p: 'Unos quieren elecciones lo antes posible, para que el pueblo decida cuanto antes. Otros advierten que sin partidos organizados, prensa libre y un registro electoral fiable, unas elecciones rápidas favorecen a quien ya tiene poder y dinero.' },
      { h: 'Hoy, en breve' },
      { p: 'Las últimas elecciones con varios partidos en libre competencia en Cuba fueron las de 1948. Hoy las candidaturas a la Asamblea Nacional las propone una comisión de candidaturas y el número de candidatos coincide con el de escaños.' },
      { h: 'Qué exige el derecho internacional' },
      { cita: 'Todos los ciudadanos gozarán [...] del derecho a votar y ser elegidos en elecciones periódicas, auténticas, realizadas por sufragio universal e igual y por voto secreto que garantice la libre expresión de la voluntad de los electores.', fuente: 'Pacto Internacional de Derechos Civiles y Políticos, artículo 25 (fragmento)' },
      { p: 'El derecho internacional no fija un plazo para las primeras elecciones tras un cambio. Exige que sean auténticas: con libertad para formar partidos, hacer campaña e informar.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Checoslovaquia.</strong> Siete meses entre la Revolución de Terciopelo (noviembre de 1989) y las primeras elecciones libres (junio de 1990). Lo que se valora: legitimó muy pronto al nuevo gobierno. Lo que se critica: los nuevos partidos apenas tuvieron tiempo de organizarse.' },
      { p: '<strong>España.</strong> Diecinueve meses entre la muerte de Franco (noviembre de 1975) y las primeras elecciones generales (junio de 1977). En ese tiempo se legalizaron los partidos, incluido el Partido Comunista, y se aprobó una ley de reforma política en referéndum.' },
      { p: '<strong>Polonia.</strong> En junio de 1989 se celebraron elecciones solo parcialmente libres, pactadas con el gobierno comunista: se disputaba un tercio de la cámara baja y todo el Senado. Las primeras elecciones plenamente libres al parlamento llegaron en 1991. Lo que se critica: el pacto garantizó escaños a los comunistas durante dos años.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen caminos distintos: un gobierno provisional de duración limitada que convoque elecciones, primero elecciones libres y después la Constituyente, una nueva ley electoral antes de las primeras elecciones o una consulta popular vinculante. Las encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Del cambio a las primeras elecciones libres', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'El cambio', 'Primeras elecciones libres', 'Tiempo'],
      filas: [
        ['Checoslovaquia', 'Noviembre de 1989', 'Junio de 1990', '7 meses'],
        ['España', 'Noviembre de 1975', 'Junio de 1977', '19 meses'],
        ['Polonia', 'Junio de 1989 (parcialmente libres)', 'Octubre de 1991', 'Más de 2 años'],
      ],
    },
  },
  {
    id: 'transparencia',
    titulo: '¿Debería poder saber cualquiera cuánto gana y qué tiene un ministro?',
    bloques: [
      { p: 'En Cuba se habla mucho de los privilegios de los dirigentes y poco se puede comprobar. En otros países cualquier persona puede consultar el patrimonio de un ministro, sus viajes o los contratos que firma. Hay quien piensa que es imprescindible y quien lo ve como una invasión de la intimidad.' },
      { h: 'Hoy, en breve' },
      { p: 'No se publican los salarios ni las declaraciones de patrimonio de los dirigentes cubanos, ni los estados financieros del conglomerado empresarial de las Fuerzas Armadas, GAESA.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'La Convención de la ONU contra la Corrupción (2003), que Cuba ratificó en 2007, pide sistemas para que los funcionarios declaren sus bienes e intereses y medidas para que el público acceda a la información sobre la administración. El Comité de Derechos Humanos de la ONU considera el acceso a la información pública parte de la libertad de expresión.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Suecia.</strong> Desde 1766 su ley de libertad de prensa reconoce el principio de acceso público a los documentos oficiales. Cualquiera puede pedir los ingresos declarados de cualquier persona a la agencia tributaria. Lo que se critica: esa transparencia alcanza también a los ciudadanos comunes.' },
      { p: '<strong>España.</strong> La Ley de Transparencia de 2013 creó un portal público y un consejo que resuelve las reclamaciones. Las declaraciones de bienes de los altos cargos se publican en el Boletín Oficial del Estado. Lo que se critica: muchas respuestas llegan tarde o incompletas.' },
      { p: '<strong>México.</strong> Creó en 2002 un instituto autónomo de acceso a la información, el INAI, considerado un modelo en la región. En 2025 fue disuelto y sus funciones pasaron a una secretaría del gobierno. Sus defensores lo ven como un retroceso; el gobierno lo justificó por ahorro y duplicidad de funciones.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen cuentas públicas abiertas con un Tribunal de Cuentas independiente, la declaración de bienes de cada funcionario al empezar y terminar su cargo, protección para quien denuncie la corrupción e intervenir GAESA. Las encontrarás al final, en orden aleatorio.' },
    ],
  },
  {
    id: 'prensa-y-organizaciones',
    titulo: '¿Debería cualquiera poder leer su expediente de la Seguridad del Estado?',
    bloques: [
      { p: 'Muchos cubanos saben o sospechan que la Seguridad del Estado tiene un expediente sobre ellos, alimentado a veces por vecinos, compañeros o familiares. Abrir esos archivos puede revelar verdades dolorosas. Cerrarlos puede proteger a quien vigiló y dejar sin respuesta a quien fue vigilado.' },
      { h: 'Hoy, en breve' },
      { p: 'Los archivos de la Seguridad del Estado, del Ministerio del Interior y de los Comités de Defensa de la Revolución no son accesibles para las personas investigadas ni para los historiadores.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'Los principios de la ONU contra la impunidad reconocen el derecho de las víctimas y de la sociedad a conocer la verdad sobre las violaciones pasadas, y piden preservar los archivos para que no se destruyan. También protegen los datos personales de terceros que aparezcan en ellos.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Alemania.</strong> La ley sobre los archivos de la Stasi de 1991 permite a cualquier persona leer su expediente y conocer el nombre real de quienes informaron sobre ella. Más de tres millones de personas han pedido consultarlo. Lo que se valora: la verdad quedó al alcance de cada víctima. Lo que se critica: rompió amistades y familias, y algunos expedientes contenían datos falsos o exagerados.' },
      { p: '<strong>República Checa.</strong> Desde 2007 un instituto público custodia los archivos de la antigua policía política y los abre a cualquier ciudadano e investigador.' },
      { p: '<strong>Rumanía.</strong> Desde 1999 un consejo público custodia los archivos de la Securitate y verifica si los candidatos a cargos públicos colaboraron con ella. Lo que se critica: parte de los archivos fue destruida o tardó años en ser entregada por los servicios de inteligencia.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen una Comisión de la Verdad independiente, recuperar y enseñar la memoria histórica, una ley de lustración y proteger los datos personales. Las encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Los archivos de la policía política', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'Desde', 'Quién puede consultarlos'],
      filas: [
        ['Alemania', '1991', 'Cada persona su expediente; investigadores y prensa con límites'],
        ['Rumanía', '1999', 'Las personas investigadas; se verifica a los candidatos'],
        ['República Checa', '2007', 'Cualquier ciudadano e investigador'],
      ],
    },
  },
];

export const fuentes = [
  { t: 'Carta Democrática Interamericana (OEA, 2001)', url: 'https://www.oas.org/charter/docs_es/resolucion1_es.htm' },
  { t: 'Constitución Política de Costa Rica (SCIJ)', url: 'http://www.pgrweb.go.cr/scij/' },
  { t: 'Comisión de Venecia, opinión sobre la nueva Constitución de Hungría (2011)', url: 'https://www.venice.coe.int/' },
  { t: 'Convención de las Naciones Unidas contra la Corrupción (UNODC)', url: 'https://www.unodc.org/unodc/es/treaties/CAC/' },
  { t: 'Ley 19/2013 de transparencia (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2013-12887' },
  { t: 'Conjunto de principios de la ONU para la lucha contra la impunidad (E/CN.4/2005/102/Add.1)', url: 'https://undocs.org/es/E/CN.4/2005/102/Add.1' },
  { t: 'Archivo de la Stasi (Bundesarchiv)', url: 'https://www.stasi-unterlagen-archiv.de/' },
  { t: 'Constitución de Cuba de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
];

export const entradas = {
  'separacion-de-poderes': {
    gancho: { q: '¿Te preocupa que un nuevo gobierno en Cuba acabe concentrando todo el poder?', o: ['Mucho', 'Algo', 'Nada'] },
    entradilla: 'Costa Rica, Venezuela y Hungría: contrapesos que duraron y contrapesos que una mayoría desmontó.',
    th: 'Has visto tres casos. ¿Recuerdas qué pasó en cada uno? Compruébalo.',
    relacionadas: ['estado-de-derecho', 'tribunal-constitucional', 'limitacion-mandatos', 'revocacion-mandato', 'parlamento'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige el país de cada hecho.',
        opciones: ['Costa Rica', 'Venezuela', 'Hungría'],
        items: [
          { a: 'Abolió el ejército en su Constitución de 1949', b: 'Costa Rica' },
          { a: 'Una Constituyente intervino el Congreso y la justicia en 1999', b: 'Venezuela' },
          { a: 'Un solo partido aprobó una nueva Constitución en 2011', b: 'Hungría' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'En Cuba existe un tribunal que puede anular una ley por inconstitucional.', v: false, e: 'No existe; lo proponen varias fuentes del banco.' },
          { t: 'La Carta Democrática Interamericana considera esencial la separación de poderes.', v: true, e: 'Junto al régimen plural de partidos y el Estado de derecho.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu propuesta', instrucciones: 'Escribe dos reglas que impedirían que un futuro gobierno cubano se perpetúe en el poder.',
        guia: ['Regla 1', 'Regla 2', 'Quién las haría cumplir'],
        ejemplo: '',
      },
    ],
  },
  'elecciones-y-alternancia': {
    gancho: { q: '¿Cuándo deberían ser las primeras elecciones libres tras un cambio?', o: ['En menos de un año', 'Entre uno y dos años', 'Cuando estén listas las instituciones'] },
    entradilla: 'Siete meses en Checoslovaquia, diecinueve en España y más de dos años en Polonia: qué se ganó y qué se perdió en cada caso.',
    th: 'Has visto tres calendarios distintos. ¿Recuerdas cuánto tardó cada país? Compruébalo.',
    relacionadas: ['gobierno-transicion', 'elecciones-antes-de-constituyente', 'nueva-ley-electoral', 'consulta-popular'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Cuánto tiempo?', instrucciones: 'Elige el tiempo que pasó en cada país hasta las primeras elecciones libres.',
        opciones: ['7 meses', '19 meses', 'Más de 2 años'],
        items: [
          { a: 'Checoslovaquia', b: '7 meses' },
          { a: 'España', b: '19 meses' },
          { a: 'Polonia', b: 'Más de 2 años' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'El derecho internacional fija un plazo máximo para las primeras elecciones tras un cambio.', v: false, e: 'Exige que sean auténticas, no un plazo.' },
          { t: 'Las últimas elecciones con varios partidos en libre competencia en Cuba fueron las de 1948.', v: true, e: '' },
        ],
      },
    ],
  },
  'transparencia': {
    gancho: { q: '¿Deberías poder saber cuánto gana y qué bienes tiene un ministro?', o: ['Sí', 'Solo lo esencial', 'No'] },
    entradilla: 'Suecia abre sus documentos desde 1766, España publica los bienes de sus altos cargos y México disolvió en 2025 su instituto de transparencia.',
    th: 'Has visto tres sistemas de transparencia. Compruébalo.',
    relacionadas: ['transparencia', 'proteccion-denunciantes', 'enfriamiento-puertas-giratorias', 'gaesa', 'evaluacion-independiente-politicas'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige el país de cada hecho.',
        opciones: ['Suecia', 'España', 'México'],
        items: [
          { a: 'Acceso público a los documentos oficiales desde 1766', b: 'Suecia' },
          { a: 'Publica en el boletín oficial los bienes de los altos cargos', b: 'España' },
          { a: 'Disolvió en 2025 su instituto autónomo de transparencia', b: 'México' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu propuesta', instrucciones: '¿Qué información de los dirigentes debería ser pública y cuál no?',
        guia: ['Pública', 'Privada', 'Por qué'],
        ejemplo: '',
      },
    ],
  },
  'prensa-y-organizaciones': {
    gancho: { q: '¿Querrías leer tu expediente de la Seguridad del Estado, si lo hubiera?', o: ['Sí', 'No sé', 'No'] },
    entradilla: 'Alemania, Rumanía y la República Checa abrieron los archivos de su policía política. Qué se ganó y qué dolió.',
    th: 'Has visto tres formas de abrir los archivos. Compruébalo.',
    relacionadas: ['comision-verdad', 'memoria-historica', 'lustracion', 'inviolabilidad-intimidad'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige el país de cada archivo.',
        opciones: ['Alemania', 'Rumanía', 'República Checa'],
        items: [
          { a: 'Más de tres millones de personas pidieron leer su expediente', b: 'Alemania' },
          { a: 'Verifica si los candidatos colaboraron con la policía política', b: 'Rumanía' },
          { a: 'Un instituto abre los archivos a cualquier ciudadano desde 2007', b: 'República Checa' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu opinión', instrucciones: 'Si los archivos se abrieran, ¿debería saberse el nombre de quien informaba? Explícalo en dos frases.',
        guia: ['Tu respuesta', 'Por qué'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué país abolió el ejército en su Constitución de 1949?', o: ['Panamá', 'Costa Rica', 'Uruguay', 'Chile'], c: 1, e: 'Y creó en 1989 una Sala Constitucional.' },
  { q: '¿Cuánto tiempo pasó en España entre la muerte de Franco y las primeras elecciones?', o: ['3 meses', '19 meses', '5 años', '10 años'], c: 1, e: 'De noviembre de 1975 a junio de 1977.' },
  { q: '¿Qué tratado contra la corrupción ratificó Cuba en 2007?', o: ['La Carta Democrática', 'La Convención de la ONU contra la Corrupción', 'El Pacto de derechos civiles y políticos', 'Ninguno'], c: 1, e: 'Pide declaraciones de bienes y acceso a la información.' },
  { q: '¿Qué permite la ley alemana sobre los archivos de la Stasi?', o: ['Destruirlos', 'Que cada persona lea su expediente', 'Venderlos', 'Que solo los lea el gobierno'], c: 1, e: 'Y conocer el nombre real de quien informaba.' },
];
