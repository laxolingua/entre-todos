// Las ocho condiciones de la ley Helms-Burton para un gobierno de transición (sección 205(a), 22 U.S.C. 6065),
// comparadas con la Constitución de 2019, el banco de E/T y las encuestas de 2026.
// Cifras verificadas el 23/10/2026 en las fuentes originales (ver docs/helms-burton-verificacion.md).
// Regla: las cifras de encuestas distintas no se suman ni se comparan como una sola medida.

export const LEY_URL = 'https://uscode.house.gov/us/usc/119-118/t22/s6065/';
export const CONST_URL = 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es';

export const ENCUESTAS = {
  eltoque: { nombre: 'elTOQUE y coalición de medios', ficha: 'abril–mayo de 2026 · 24.503 respuestas desde Cuba', metodo: 'Encuesta abierta en línea', url: 'https://eltoque.com/' },
  ddc: { nombre: 'Diario de Cuba / Cubadata', ficha: '20 de mayo–8 de junio de 2026 · 2.214 personas', metodo: 'Panel de cubanos conectados', url: 'https://diariodecuba.com/foro-ddc/1786446936_68136.html' },
  ddc2: { nombre: 'Diario de Cuba / Cubadata', ficha: 'mayo–junio de 2026 · 2.214 personas', metodo: 'Panel de cubanos conectados', url: 'https://diariodecuba.com/foro-ddc/1790265665_68572.html' },
  ocdh: { nombre: 'Observatorio Cubano de Derechos Humanos', ficha: 'IX Estudio de Derechos Sociales, 2026 · 1.318 entrevistas en 79 municipios', metodo: 'Entrevistas en todas las provincias', url: 'https://diariodecuba.com/cuba/1786634914_68446.html' },
  lapop: { nombre: 'Vanderbilt LAPOP · Barómetro de las Américas', ficha: 'verano de 2026 · 1.095 personas', metodo: 'Cubanos conectados a internet', url: 'https://www.americasquarterly.org/article/cubas-debate-is-missing-what-cubans-want/' },
};

// Qué responden los encuestados sobre el embargo en sí (todas las opciones, sin agrupar).
export const EMBARGO = {
  eltoque: {
    pregunta: '¿Qué debe hacerse con el embargo de Estados Unidos?',
    cuba: [
      ['Mantenerlo como presión para forzar cambios democráticos', 43.8],
      ['Eliminarlo de forma gradual a medida que Cuba avance en reformas', 26.1],
      ['Eliminarlo por completo e incondicionalmente', 14.8],
      ['Intensificarlo en áreas estratégicas como la energía', 8.5],
      ['Sin posición definida', 6.8],
    ],
    exterior: [
      ['Mantenerlo como presión para forzar cambios democráticos', 51.5],
      ['Eliminarlo de forma gradual a medida que Cuba avance en reformas', 21.3],
      ['Intensificarlo en áreas estratégicas como la energía', 13.2],
      ['Eliminarlo por completo e incondicionalmente', 9.0],
      ['Sin posición definida', 5.0],
    ],
  },
  ddc: 'Cuando se pregunta de forma neutral, las tres opciones favorables a aliviar las sanciones suman cerca del 54 %. Cuando se pregunta directamente, el 37,9 % prefiere abolirlas por completo y el 32,6 % eliminarlas gradualmente.',
  lapop: 'El 77 % prefiere cambios económicos cuanto antes a reformar primero las instituciones, y el 69 % da prioridad a la recuperación económica sobre la apertura política. Sobre el futuro de Cuba, el 34 % elige una república independiente, el 30 % un estatus como el de Puerto Rico y el 29 % la anexión a Estados Unidos.',
  ddcUrl: 'https://diariodecuba.com/foro-ddc/1786706613_68369.html',
};

export const CONDICIONES = [
  {
    id: 'actividad-politica',
    titulo: 'Legalizar toda la actividad política',
    ley: 'Que el gobierno de transición «haya legalizado toda la actividad política».',
    seccion: '205(a)(1)',
    cuba: 'El Partido Comunista de Cuba, «único», es «la fuerza política dirigente superior de la sociedad y del Estado». La Constitución no reconoce otros partidos.',
    cubaFuente: 'Constitución de 2019, artículo 5',
    propuestas: ['pluripartidismo', 'despenalizacion-disenso'],
    bancoNota: 'Hay desacuerdo sobre si los comunistas podrán participar: unas fuentes proponen proscribir el comunismo y otras admitir a todos los partidos que renuncien a la violencia.',
    cuestion: 'lugar-de-los-comunistas',
    correspondencia: 'directa',
    encuestas: [
      { e: 'eltoque', q: 'Qué mantener o eliminar del sistema actual: el Partido Comunista', r: '98,2 % eliminar', v: 98.2 },
      { e: 'ddc', q: 'Eliminar el partido único', r: '≈ 57 % eliminar · ≈ 37 % no responde', v: 57 },
    ],
    sinMedir: ['Si los encuestados aceptan que el fin del embargo dependa de esta condición.'],
  },
  {
    id: 'presos-politicos',
    titulo: 'Liberar a todos los presos políticos',
    ley: 'Que haya «liberado a todos los presos políticos» y permitido investigar las prisiones cubanas y su inspección por organizaciones internacionales de derechos humanos.',
    seccion: '205(a)(2)',
    cuba: 'El Gobierno cubano niega que haya presos políticos en el país. Organizaciones de activistas documentan miles de personas encarceladas por motivos políticos.',
    cubaFuente: 'AP, 19 de octubre de 2026',
    cubaUrl: 'https://www.elnuevodia.com/noticias/mundo/notas/eeuu-y-cuba-chocan-en-la-onu-mientras-washington-intenta-influir-en-voto-sobre-embargo-economico/',
    propuestas: ['presos-politicos', 'despenalizacion-disenso'],
    correspondencia: 'directa',
    encuestas: [],
    sinMedir: ['Ninguna de las encuestas revisadas pregunta por la liberación de los presos políticos.', 'Tampoco por la inspección internacional de las prisiones.'],
  },
  {
    id: 'seguridad-del-estado',
    titulo: 'Disolver la Seguridad del Estado, los CDR y las Brigadas de Respuesta Rápida',
    ley: 'Que haya «disuelto el actual Departamento de Seguridad del Estado» del Ministerio del Interior, incluidos los Comités de Defensa de la Revolución y las Brigadas de Respuesta Rápida.',
    seccion: '205(a)(3)',
    cuba: 'La Constitución no menciona la Seguridad del Estado. Dice que el Estado «reconoce y estimula a las organizaciones de masas y sociales».',
    cubaFuente: 'Constitución de 2019, artículo 14',
    propuestas: ['fuerzas-seguridad-civiles', 'despenalizacion-disenso'],
    bancoNota: 'Los documentos del banco piden fuerzas de seguridad neutrales y bajo autoridad civil. Ninguno pide expresamente disolver los CDR o las Brigadas de Respuesta Rápida.',
    correspondencia: 'parcial',
    encuestas: [
      { e: 'eltoque', q: 'Qué mantener o eliminar del sistema actual: la Seguridad del Estado', r: '94,5 % eliminar', v: 94.5 },
      { e: 'ddc2', q: 'Qué hacer con la Seguridad del Estado (dos formulaciones)', r: '35,5 % y 35,6 % eliminarla; el resto se reparte entre reformarla a fondo, otras opciones y no responder', v: 35.5 },
    ],
    sinMedir: ['Qué hacer con los CDR y las Brigadas de Respuesta Rápida.'],
  },
  {
    id: 'elecciones',
    titulo: 'Elecciones libres en un máximo de 18 meses',
    ley: 'Compromiso público de celebrar elecciones libres y justas en un plazo no mayor de 18 meses, con «varios partidos políticos independientes» con pleno acceso a los medios y bajo supervisión de observadores internacionales reconocidos.',
    seccion: '205(a)(4)',
    cuba: 'Hay voto directo para la Asamblea Nacional con una candidatura por escaño. La Asamblea elige al presidente. Solo un partido es legal.',
    cubaFuente: 'Constitución de 2019, artículos 5 y 126; Ley Electoral de 2019',
    propuestas: ['elecciones-libres', 'nueva-ley-electoral', 'gobierno-transicion', 'elecciones-antes-de-constituyente'],
    bancoNota: 'Los documentos coinciden en elecciones libres con observación internacional. No coinciden en el orden: unos proponen elegir primero un parlamento y otros redactar antes una nueva Constitución.',
    correspondencia: 'directa',
    encuestas: [
      { e: 'ddc', q: 'Condiciones indispensables para que una transición sea legítima', r: '19,0 % elige las elecciones libres, casi empatadas con la protección de salud y educación y con las garantías de soberanía (19,2 %)', v: 19 },
    ],
    sinMedir: ['El plazo de 18 meses.', 'Si se acepta la supervisión de observadores extranjeros.'],
  },
  {
    id: 'radio-marti',
    titulo: 'Dejar de interferir Radio y TV Martí',
    ley: 'Que haya cesado toda interferencia con las transmisiones de Radio Martí y TV Martí, emisoras del Gobierno de Estados Unidos.',
    seccion: '205(a)(5)',
    cuba: 'Se reconoce la libertad de prensa, pero los medios fundamentales de comunicación son de propiedad socialista o de las organizaciones políticas, sociales y de masas, y no pueden ser de otro tipo de propiedad.',
    cubaFuente: 'Constitución de 2019, artículo 55',
    propuestas: ['libertad-expresion', 'acceso-informacion-internet'],
    bancoNota: 'Los documentos piden libertad de prensa y acceso libre a internet en general. Ninguno trata las emisoras estadounidenses.',
    correspondencia: 'parcial',
    encuestas: [],
    sinMedir: ['Ninguna encuesta revisada pregunta por Radio y TV Martí.'],
  },
  {
    id: 'justicia-derechos-sindicatos',
    titulo: 'Jueces independientes, derechos humanos y sindicatos libres',
    ley: 'Compromiso y avances demostrables en establecer un poder judicial independiente, respetar los derechos humanos de la Declaración Universal y permitir sindicatos independientes (convenios 87 y 98 de la OIT) y grupos sociales, económicos y políticos independientes.',
    seccion: '205(a)(6)',
    cuba: 'Los jueces «son independientes y no deben obediencia más que a la ley». Se reconocen los derechos de reunión, manifestación y asociación «con fines lícitos y pacíficos». La Constitución no menciona otros sindicatos que la Central de Trabajadores de Cuba.',
    cubaFuente: 'Constitución de 2019, artículos 56, 134 y 150',
    propuestas: ['independencia-judicial', 'pactos-ddhh', 'libertad-sindical', 'legalizacion-organizaciones'],
    correspondencia: 'directa',
    encuestas: [],
    sinMedir: ['No se encontró una pregunta específica sobre jueces independientes ni sobre sindicatos independientes.'],
  },
  {
    id: 'sin-castro',
    titulo: 'Un gobierno de transición sin Fidel ni Raúl Castro',
    ley: 'Que el gobierno de transición «no incluya a Fidel Castro ni a Raúl Castro».',
    seccion: '205(a)(7)',
    cuba: 'Fidel Castro murió en 2016. Raúl Castro dejó la dirección del Partido Comunista en 2021.',
    cubaFuente: 'Hechos públicos',
    propuestas: ['justicia-transicional', 'comision-verdad', 'gobierno-transicion'],
    bancoNota: 'Los documentos no nombran a personas. Proponen justicia transicional, sin impunidad y sin venganza, y una comisión de la verdad.',
    correspondencia: 'parcial',
    encuestas: [
      { e: 'eltoque', q: '¿Aceptaría una transición sin juzgar a figuras del Gobierno?', r: '58,8 % inaceptable; 20,9 % solo para delitos menores; 15,7 % aceptable si garantiza paz', v: 58.8 },
      { e: 'ddc2', q: 'Qué justicia para la transición', r: '32,1 % justicia plena para violaciones graves; 28,6 % justicia gradual con verdad y reparación', v: 32.1 },
      { e: 'lapop', q: 'Quién toma las decisiones importantes en Cuba', r: '46 % la familia Castro; 14 % Miguel Díaz-Canel', v: 46 },
    ],
    sinMedir: ['Si se acepta excluir por ley a personas concretas de un gobierno de transición.'],
  },
  {
    id: 'ayuda',
    titulo: 'Dejar llegar la ayuda a la población',
    ley: 'Que haya dado garantías adecuadas de que permitirá la distribución rápida y eficiente de asistencia al pueblo cubano.',
    seccion: '205(a)(8)',
    cuba: 'La Constitución no trata este punto.',
    cubaFuente: 'Constitución de 2019',
    propuestas: ['plan-de-emergencia', 'atencion-vulnerables'],
    correspondencia: 'parcial',
    encuestas: [
      { e: 'ocdh', q: 'Principal problema del país', r: '70 % los apagones; 52 % la crisis alimentaria', v: 70 },
      { e: 'lapop', q: 'Cortes de electricidad en el último mes', r: '86 % tuvo apagones todos los días', v: 86 },
    ],
    sinMedir: ['Si los encuestados aceptan las condiciones de reparto que fije Estados Unidos.'],
  },
];

export const NIVELES = {
  directa: 'Correspondencia directa',
  parcial: 'Correspondencia parcial',
};
