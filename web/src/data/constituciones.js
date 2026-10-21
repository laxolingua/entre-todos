// Las constituciones de Cuba: ficha de cada una, comparación por bloques y propuestas del banco por bloque.
// Textos de resumen propios de ENTRE TODOS. Pendiente de revisión por un especialista en derecho constitucional.
// texto: enlace al texto completo. idioma: 'es' o 'fr' (traducción francesa de la Universidad de Perpiñán).
// Donde no hay enlace, el texto completo en español está pendiente de localizar.

export const BLOQUES = [
  { id: 'fundamentos', t: 'Fundamentos' },
  { id: 'derechos', t: 'Derechos' },
  { id: 'participacion', t: 'Participación' },
  { id: 'estado', t: 'Organización del Estado' },
  { id: 'economia', t: 'Economía' },
  { id: 'reforma', t: 'Reforma' },
];

export const CONSTITUCIONES = [
  {
    id: '1869', corto: 'Guáimaro', nombre: 'Constitución de Guáimaro', fecha: '10 de abril de 1869', vigencia: '1869–1878',
    origen: 'Asamblea de representantes de los territorios alzados contra España, reunida en Guáimaro durante la Guerra de los Diez Años.',
    resumen: 'La primera constitución cubana. Organizó la República en Armas con un poder legislativo fuerte y declaró libres a todos los habitantes.',
    b: {
      fundamentos: 'República en Armas. El poder legislativo reside en la Cámara de Representantes.',
      derechos: 'Todos los habitantes son enteramente libres, lo que abolía la esclavitud. La Cámara no puede atacar las libertades de culto, imprenta, reunión pacífica, enseñanza y petición.',
      participacion: 'Representantes por cada uno de los estados en que se dividía el territorio.',
      estado: 'La Cámara nombra al presidente y al general en jefe, y puede deponerlos.',
      economia: 'No regula el sistema económico.',
      reforma: 'La Cámara puede enmendarla.',
    },
    texto: 'https://mjp.univ-perp.fr/constit/cu1869.htm', idioma: 'fr',
  },
  {
    id: '1878', corto: 'Baraguá', nombre: 'Constitución de Baraguá', fecha: 'marzo de 1878', vigencia: '1878',
    origen: 'Redactada por los jefes que rechazaron el Pacto del Zanjón tras la Protesta de Baraguá, encabezada por Antonio Maceo.',
    resumen: 'Un texto muy breve para un gobierno provisional que prolongó la guerra unas semanas. Duró hasta el fin de las hostilidades.',
    b: {
      fundamentos: 'Gobierno provisional para continuar la guerra.',
      derechos: 'No incluye un catálogo de derechos.',
      participacion: 'No prevé elecciones.',
      estado: 'Un gobierno provisional de pocos miembros.',
      economia: 'No regula el sistema económico.',
      reforma: 'No prevé reforma: era un texto de emergencia.',
    },
    texto: '', idioma: '',
  },
  {
    id: '1895', corto: 'Jimaguayú', nombre: 'Constitución de Jimaguayú', fecha: '16 de septiembre de 1895', vigencia: '1895–1897',
    origen: 'Asamblea de representantes del Ejército Libertador al comienzo de la Guerra de Independencia.',
    resumen: 'Concentró el gobierno en un Consejo de Gobierno y dio autonomía al mando militar, para evitar los choques entre civiles y militares de la guerra anterior. Tenía una vigencia máxima de dos años.',
    b: {
      fundamentos: 'Gobierno provisional de la República de Cuba durante la guerra.',
      derechos: 'No incluye un catálogo de derechos.',
      participacion: 'Prevé una nueva Asamblea de Representantes a los dos años.',
      estado: 'Un Consejo de Gobierno (presidente, vicepresidente y cuatro secretarios) con poder ejecutivo y legislativo. El general en jefe dirige las operaciones militares con autonomía.',
      economia: 'No regula el sistema económico.',
      reforma: 'Rige como máximo dos años, hasta que una nueva asamblea la revise.',
    },
    texto: 'https://catalogo.academiadominicanahistoria.org.do/opac-tmpl/files/libros/GobiernoProvisionaldelaRepublicadeCuba-ConstituciondelGobiernoProvisionaldelaRepublicadeCuba-1896.pdf', idioma: 'es',
  },
  {
    id: '1897', corto: 'La Yaya', nombre: 'Constitución de La Yaya', fecha: '29 de octubre de 1897', vigencia: '1897–1898',
    origen: 'Asamblea de Representantes reunida en La Yaya, Camagüey, al vencer el plazo de la de Jimaguayú.',
    resumen: 'La última constitución mambisa y la primera con un título completo de derechos individuales y políticos.',
    b: {
      fundamentos: 'República de Cuba, con gobierno civil durante la guerra.',
      derechos: 'Título de derechos individuales y políticos: garantías ante la detención, inviolabilidad de la correspondencia y del domicilio, libertad religiosa, de enseñanza, de expresión y de petición, y sufragio. Podían suspenderse durante la guerra.',
      participacion: 'Sufragio para elegir a los representantes.',
      estado: 'Un Consejo de Gobierno y una Asamblea de Representantes.',
      economia: 'No regula el sistema económico.',
      reforma: 'Rige hasta que se promulgue otra constitución.',
    },
    texto: 'https://mjp.univ-perp.fr/constit/cu1897.htm', idioma: 'fr',
  },
  {
    id: '1901', corto: 'República', nombre: 'Constitución de 1901', fecha: '21 de febrero de 1901', vigencia: '1902–1933',
    origen: 'Convención Constituyente elegida durante la ocupación militar de Estados Unidos.',
    resumen: 'Fundó la República como Estado independiente, con un sistema presidencial. Llevaba como apéndice la Enmienda Platt, que daba a Estados Unidos derecho a intervenir en Cuba.',
    b: {
      fundamentos: 'República unitaria y democrática. La Enmienda Platt, en apéndice, limitaba la soberanía hasta su derogación en 1934.',
      derechos: 'Derechos individuales clásicos: igualdad ante la ley, habeas corpus, libertad de expresión, reunión, asociación y culto.',
      participacion: 'Sufragio universal masculino.',
      estado: 'Presidente elegido, Congreso de dos cámaras y Tribunal Supremo que podía declarar inconstitucionales las leyes.',
      economia: 'Protege la propiedad privada; no regula un modelo económico.',
      reforma: 'Dos tercios del Congreso y una convención constituyente elegida para ese fin.',
    },
    texto: 'https://mjp.univ-perp.fr/constit/cu1901.htm', idioma: 'fr',
  },
  {
    id: '1940', corto: 'Convención', nombre: 'Constitución de 1940', fecha: '1 de julio de 1940', vigencia: '1940–1952',
    origen: 'Convención Constituyente elegida en 1939, con representación de casi todas las fuerzas políticas, incluidos los comunistas. Se firmó en Guáimaro.',
    resumen: 'Considerada la más avanzada de su tiempo en América Latina por sus derechos sociales. Rigió hasta el golpe de Estado de Fulgencio Batista en 1952.',
    b: {
      fundamentos: 'Estado independiente y soberano, organizado como república unitaria y democrática.',
      derechos: 'Derechos individuales y amplios derechos sociales: jornada máxima de ocho horas, salario mínimo, seguridad social, igualdad sin discriminación por sexo, raza, color o clase. Proscribe el latifundio.',
      participacion: 'Sufragio universal, también de las mujeres. Iniciativa popular para proponer leyes y reformas.',
      estado: 'Sistema semiparlamentario: presidente elegido y primer ministro sometido a la confianza del Congreso. Tribunal de Garantías Constitucionales y Sociales.',
      economia: 'Economía de mercado con función social de la propiedad e intervención del Estado.',
      reforma: 'Por iniciativa del Congreso o de los ciudadanos; la reforma integral exige una asamblea elegida para ese fin.',
    },
    texto: 'https://www.cubanet.org/htdocs/ref/dis/40_print.htm', idioma: 'es',
  },
  {
    id: '1959', corto: 'Ley Fundamental', nombre: 'Ley Fundamental de 1959', fecha: '7 de febrero de 1959', vigencia: '1959–1976',
    origen: 'Aprobada por el Consejo de Ministros del Gobierno Revolucionario, sin asamblea ni referendo.',
    resumen: 'Reprodujo buena parte de la Constitución de 1940, pero trasladó el poder legislativo al Consejo de Ministros. Se reformó muchas veces por decisión del propio gobierno.',
    b: {
      fundamentos: 'Mantiene la república de 1940, con el gobierno revolucionario como poder constituyente.',
      derechos: 'Conserva gran parte de los derechos de 1940. Sus reformas permitieron confiscaciones y extendieron la pena de muerte a delitos políticos.',
      participacion: 'No se celebraron elecciones durante su vigencia.',
      estado: 'El Consejo de Ministros ejerce el poder legislativo y el ejecutivo.',
      economia: 'Sus reformas permitieron la nacionalización de la economía.',
      reforma: 'El Consejo de Ministros podía reformarla.',
    },
    texto: '', idioma: '',
  },
  {
    id: '1976', corto: 'Socialista', nombre: 'Constitución de 1976', fecha: '24 de febrero de 1976', vigencia: '1976–2019',
    origen: 'Redactada por una comisión del Partido y del gobierno, discutida en asambleas y aprobada en referendo.',
    resumen: 'Institucionalizó el Estado socialista. Se reformó en 1978, en 1992, cuando el Estado pasó de ateo a laico y se abrió a la inversión extranjera, y en 2002, para declarar irrevocable el socialismo.',
    b: {
      fundamentos: 'Estado socialista. El Partido Comunista es la fuerza dirigente superior de la sociedad y del Estado.',
      derechos: 'Derechos sociales (educación, salud, trabajo). Las libertades no pueden ejercerse contra la existencia y los fines del Estado socialista.',
      participacion: 'Elección de delegados municipales entre varios candidatos. Desde 1992, voto directo de los diputados, con candidaturas únicas por escaño.',
      estado: 'La Asamblea Nacional del Poder Popular es el órgano supremo y elige al Consejo de Estado, cuyo presidente es jefe de Estado y de Gobierno.',
      economia: 'Propiedad socialista de los medios fundamentales de producción y economía planificada.',
      reforma: 'Dos tercios de la Asamblea; las reformas sobre su integración y facultades exigen referendo.',
    },
    texto: 'https://www.cubanet.org/htdocs/ref/dis/const_92.htm', idioma: 'es',
  },
  {
    id: '2019', corto: 'Vigente', nombre: 'Constitución de 2019', fecha: '10 de abril de 2019', vigencia: 'Vigente',
    origen: 'Proyecto de una comisión de la Asamblea Nacional, consulta popular y referendo el 24 de febrero de 2019.',
    resumen: 'La constitución vigente. Mantiene el sistema socialista y el papel dirigente del Partido, crea las figuras de presidente de la República y primer ministro, limita los mandatos y reconoce la propiedad privada.',
    b: {
      fundamentos: 'Estado socialista de derecho. El Partido Comunista es la fuerza política dirigente superior de la sociedad y del Estado. El socialismo es irrevocable.',
      derechos: 'Amplía el catálogo de derechos e incluye el habeas corpus y el debido proceso. Las libertades de expresión y de prensa se ejercen de conformidad con los fines de la sociedad.',
      participacion: 'Voto directo para la Asamblea con candidaturas únicas por escaño. El presidente lo elige la Asamblea.',
      estado: 'Presidente de la República (máximo dos mandatos de cinco años), primer ministro, Asamblea Nacional como órgano supremo y gobernadores provinciales.',
      economia: 'Propiedad socialista predominante y planificación, con reconocimiento de la propiedad privada y del mercado.',
      reforma: 'Dos tercios de la Asamblea y referendo para ciertas materias. Los artículos sobre el sistema socialista no se pueden reformar.',
    },
    texto: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es', idioma: 'es',
  },
];

// Propuestas del banco relacionadas con cada bloque (ids del banco ciudadano).
export const PROPUESTAS_BLOQUE = {
  fundamentos: ['dignidad-humana', 'soberania-popular', 'soberania-nacional', 'estado-de-derecho', 'estado-laico', 'preambulo-invocacion-dios', 'simbolos-nacionales', 'fin-partido-unico-dirigente', 'estado-neutral-juramento'],
  derechos: ['carta-de-derechos', 'pactos-ddhh', 'amparo-y-garantias', 'estructura-nueva-constitucion', 'pena-muerte', 'derecho-aborto', 'vida-desde-la-concepcion', 'ciudadania'],
  participacion: ['elecciones-libres', 'pluripartidismo', 'revocacion-mandato', 'participacion-ciudadana', 'participacion-local', 'parlamento-mixto-sorteo', 'voto-emigracion'],
  estado: ['gobierno-semiparlamentario', 'eleccion-directa-presidente', 'parlamento', 'parlamento-bicameral', 'tribunal-constitucional', 'independencia-judicial', 'defensor-pueblo', 'limitacion-mandatos', 'ejecutivo-tecnico-no-partidista', 'emergencia-caduca', 'descentralizacion'],
  economia: ['propiedad-privada', 'economia-social-mercado', 'socialismo-democratico', 'pluralidad-propiedad', 'elementos-a-conservar'],
  reforma: ['asamblea-constituyente', 'proceso-constituyente', 'constitucion-1940', 'reforma-provisional-2019', 'reforma-clausula-hacia-constituyente', 'reforma-constitucional-vigente', 'reforma-de-la-constitucion'],
};

export const FUENTES = [
  { t: 'Digithèque de matériaux juridiques et politiques, Universidad de Perpiñán (constituciones cubanas, en traducción francesa)', url: 'https://mjp.univ-perp.fr/constit/cu.htm' },
  { t: 'Constitución de 1940 (Cubanet)', url: 'https://www.cubanet.org/htdocs/ref/dis/40_print.htm' },
  { t: 'Constitución de 1976 con la reforma de 1992 (Cubanet)', url: 'https://www.cubanet.org/htdocs/ref/dis/const_92.htm' },
  { t: 'Constitución de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
  { t: 'Andrés M. Lazcano y Mazón, Las constituciones de Cuba (Madrid, 1952), índice', url: 'https://sidn.ramajudicial.gov.co/SIDN/DOCTRINA/TABLAS%20DE%20CONTENIDO%20Y%20TEXTOS%20COMPLETOS/342%20-%20DERECHO%20CONSTITUCIONAL%20Y%20PROCESAL%20CONSTITUCIONAL/3116_Las_constituciones_de_Cuba_Lazcano.pdf' },
];
