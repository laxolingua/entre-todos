// Bloque 6, serie «La nueva Cuba»: sociedad civil independiente.
// Formato del bloque 1. Regla de neutralidad: ninguna lección recomienda una opción.
export const lecciones = [
  {
    id: 'asociarse-libremente',
    titulo: '¿Qué pasaría con los CDR, la FMC y la CTC?',
    bloques: [
      { p: 'Casi todos los cubanos han pertenecido a alguna organización de masas: los Comités de Defensa de la Revolución, la Federación de Mujeres Cubanas, la Central de Trabajadores de Cuba o la Federación Estudiantil Universitaria. Tienen locales, cuotas, archivos y presencia en cada barrio y centro de trabajo. En una Cuba futura habría que decidir si desaparecen, se transforman o compiten con organizaciones nuevas.' },
      { h: 'Hoy, en breve' },
      { p: 'La Constitución de 2019 reconoce a las organizaciones de masas y sociales y les atribuye un papel en la construcción del socialismo. Solo existe una central sindical reconocida, la CTC. Fundar una organización fuera de ese sistema es, en la práctica, imposible.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'El Pacto Internacional de Derechos Civiles y Políticos reconoce el derecho a asociarse libremente, incluido el de fundar sindicatos (artículo 22). Los convenios 87 y 98 de la Organización Internacional del Trabajo, que Cuba ratificó, garantizan que los trabajadores creen las organizaciones que quieran sin autorización previa.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>España.</strong> El sindicato vertical de la dictadura, al que pertenecían obligatoriamente trabajadores y empresarios, se disolvió en 1977, cuando se legalizaron los sindicatos libres como Comisiones Obreras y UGT. Su patrimonio se repartió años después entre los nuevos sindicatos. Lo que se critica: ese reparto tardó y generó disputas.' },
      { p: '<strong>Alemania oriental.</strong> La central sindical oficial, el FDGB, se disolvió en 1990 y sus afiliados pudieron pasar a los sindicatos del Oeste. La organización juvenil del partido, la FDJ, siguió existiendo como una asociación muy pequeña.' },
      { p: '<strong>Polonia.</strong> La central sindical creada por el gobierno en 1984, OPZZ, sobrevivió al cambio y hoy compite con Solidaridad, el sindicato independiente nacido en 1980. Lo que se valora: sus afiliados decidieron libremente quedarse. Lo que se critica: conservó el patrimonio recibido del régimen.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen legalizar las organizaciones independientes, la libertad de reunión y asociación, sindicatos libres y una sociedad civil autónoma. Ninguna detalla todavía qué hacer con cada organización de masas. Las encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Qué pasó con las organizaciones oficiales', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'Organización', 'Qué pasó'],
      filas: [
        ['España', 'Sindicato vertical', 'Disuelto en 1977; patrimonio repartido después'],
        ['Alemania oriental', 'FDGB y FDJ', 'El FDGB se disolvió; la FDJ quedó como asociación mínima'],
        ['Polonia', 'OPZZ', 'Sobrevivió y compite con Solidaridad'],
      ],
    },
  },
  {
    id: 'registro-y-financiacion',
    titulo: '¿Debería una organización cubana poder recibir dinero del extranjero?',
    bloques: [
      { p: 'Muchas iniciativas independientes cubanas, desde medios hasta proyectos sociales, se sostienen con donaciones o subvenciones del extranjero. El gobierno las presenta como agentes de potencias extranjeras. En una Cuba futura, la pregunta seguirá viva: unos verán en ese dinero una ayuda legítima y otros una vía de influencia externa.' },
      { h: 'Hoy, en breve' },
      { p: 'El Código Penal de 2022 castiga recibir fondos para financiar actividades contra el Estado y su orden constitucional. La Ley 88 de 1999 castiga además colaborar con la aplicación de la ley Helms-Burton de Estados Unidos.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'La Declaración de la ONU sobre los defensores de derechos humanos (1998) reconoce el derecho a solicitar, recibir y utilizar recursos para proteger los derechos humanos, también de fuentes extranjeras. Los Estados pueden pedir transparencia, pero no usar esas normas para silenciar a las organizaciones.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Estados Unidos.</strong> La ley de registro de agentes extranjeros de 1938 obliga a registrarse a quien hace actividad política por encargo de un gobierno o entidad extranjera. No alcanza a las organizaciones que solo reciben donaciones. Lo que se critica: su aplicación ha sido irregular durante décadas.' },
      { p: '<strong>Hungría.</strong> En 2017 obligó a las organizaciones que recibían fondos del extranjero a registrarse y a declararlo en sus publicaciones. En 2020 el Tribunal de Justicia de la Unión Europea concluyó que la ley era discriminatoria y Hungría la derogó en 2021.' },
      { p: '<strong>Nicaragua.</strong> La ley de agentes extranjeros de 2020 obligó a registrarse a quien recibiera fondos del exterior. En los años siguientes el gobierno canceló la personalidad jurídica de miles de organizaciones. Organismos de la ONU y la OEA la han considerado una herramienta para cerrar el espacio cívico.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen considerar legítima la ayuda exterior a la sociedad civil salvo la ilícita, la que sale directamente de las arcas de los Estados o la que viene condicionada. Otra propone que los partidos y campañas se financien solo con fondos públicos, sin dinero del exterior. Las encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Leyes sobre dinero extranjero', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'Ley', 'Qué pasó'],
      filas: [
        ['Estados Unidos', 'Registro de agentes extranjeros (1938)', 'Solo para actividad política por encargo'],
        ['Hungría', 'Organizaciones con fondos extranjeros (2017)', 'Anulada por el tribunal europeo; derogada en 2021'],
        ['Nicaragua', 'Agentes extranjeros (2020)', 'Miles de organizaciones cerradas'],
      ],
    },
  },
  {
    id: 'organizaciones-en-cuba',
    titulo: '¿Haría falta permiso del Estado para crear una asociación?',
    bloques: [
      { p: 'Un grupo de vecinos que quiere limpiar su playa, una asociación de protección animal o un club de lectura: en Cuba, para existir legalmente, todos necesitan que un organismo del Estado acepte tutelarlos. Una nueva ley podría mantener ese control, reducirlo o eliminarlo.' },
      { h: 'Hoy, en breve' },
      { p: 'La Ley de Asociaciones de 1985 exige que cada asociación tenga un «órgano de relación», un organismo estatal que la supervisa, y que el Ministerio de Justicia autorice su inscripción. Muchas asociaciones llevan años sin respuesta y funcionan sin reconocimiento legal.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'Los relatores de la ONU sobre libertad de asociación han señalado que el registro debería ser una simple notificación, y que las asociaciones no registradas también tienen derecho a existir. El Pacto admite límites solo si son necesarios en una sociedad democrática.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>España.</strong> La Ley Orgánica del Derecho de Asociación de 2002 establece que una asociación existe desde que tres personas firman su acta fundacional. La inscripción en el registro sirve solo para darle publicidad y no depende de la opinión del gobierno.' },
      { p: '<strong>Alemania.</strong> Siete personas pueden fundar una asociación e inscribirla en un registro que lleva un juzgado, no el gobierno. También se puede funcionar sin inscribirse.' },
      { p: '<strong>Estados Unidos.</strong> Cualquier grupo puede organizarse sin pedir permiso. El registro solo importa para obtener beneficios fiscales: la agencia tributaria reconoce como entidades sin fines de lucro a las que cumplen sus requisitos. Lo que se critica: esa revisión fiscal se ha acusado a veces de trato desigual según la orientación política.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen que cualquier persona pueda crear asociaciones sin control de la administración pública, legalizar las organizaciones independientes y una sociedad civil autónoma y fuerte. Las encontrarás al final, en orden aleatorio.' },
    ],
    tabla: {
      titulo: 'Crear una asociación en cuatro países', tras: 'Cómo lo resolvieron otras democracias',
      columnas: ['País', 'Personas necesarias', 'Quién registra', '¿Hace falta permiso?'],
      filas: [
        ['España', '3', 'Registro de asociaciones, solo para publicidad', 'No'],
        ['Alemania', '7 para inscribirla', 'Un juzgado', 'No'],
        ['Estados Unidos', 'No hay mínimo federal', 'Agencia tributaria, solo para beneficios fiscales', 'No'],
        ['Cuba', 'Según la ley de 1985', 'Ministerio de Justicia, con un organismo tutor', 'Sí'],
      ],
    },
  },
  {
    id: 'participar-con-seguridad',
    titulo: '¿Quién protegería a periodistas y activistas en la nueva Cuba?',
    bloques: [
      { p: 'Un cambio político no elimina de golpe la violencia contra quien informa o denuncia. En varios países de América Latina, periodistas y defensores de derechos humanos siguen siendo amenazados y asesinados décadas después de recuperar la democracia. La pregunta es qué instituciones los protegerían.' },
      { h: 'Hoy, en breve' },
      { p: 'Periodistas independientes y activistas cubanos denuncian vigilancia, detenciones breves, prohibiciones de salir del país y presiones a sus familias. No existe ningún organismo independiente al que puedan acudir.' },
      { h: 'Qué exige el derecho internacional' },
      { p: 'La Declaración de la ONU sobre los defensores de derechos humanos (1998) obliga a los Estados a protegerlos frente a la violencia, las amenazas y las represalias. La Corte Interamericana ha ordenado a varios Estados adoptar medidas de protección concretas para personas en riesgo.' },
      { h: 'Cómo lo resolvieron otras democracias' },
      { p: '<strong>Colombia.</strong> En 2011 creó la Unidad Nacional de Protección, que da escoltas, vehículos blindados y teléfonos a miles de personas amenazadas. Lo que se critica: cientos de líderes sociales han sido asesinados en los últimos años pese a ella.' },
      { p: '<strong>México.</strong> En 2012 creó un mecanismo federal para proteger a periodistas y defensores de derechos humanos. Lo que se critica: México sigue entre los países más peligrosos del mundo para ejercer el periodismo, y varias personas protegidas han sido asesinadas.' },
      { p: '<strong>Unión Europea.</strong> Sus directrices de 2004 sobre defensores de derechos humanos orientan a sus embajadas para apoyarlos en otros países, y en 2024 aprobó una directiva contra las demandas abusivas que buscan silenciar a periodistas.' },
      { h: 'Qué proponen las propuestas del banco' },
      { p: 'Las fuentes del banco proponen un Defensor del Pueblo independiente, protección para quien denuncie la corrupción, un poder judicial independiente y acción ciudadana ante los tribunales. Las encontrarás al final, en orden aleatorio.' },
    ],
  },
];

export const fuentes = [
  { t: 'Pacto Internacional de Derechos Civiles y Políticos, artículo 22 (ACNUDH)', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
  { t: 'OIT, convenios 87 y 98 y ratificaciones por país (NORMLEX)', url: 'https://normlex.ilo.org/' },
  { t: 'Declaración de la ONU sobre los defensores de los derechos humanos (1998)', url: 'https://www.ohchr.org/es/special-procedures/sr-human-rights-defenders/declaration-human-rights-defenders' },
  { t: 'Tribunal de Justicia de la UE, Comisión contra Hungría, C-78/18 (2020)', url: 'https://curia.europa.eu/' },
  { t: 'Ley Orgánica 1/2002, reguladora del Derecho de Asociación (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2002-5852' },
  { t: 'Relator especial de la ONU sobre libertad de reunión y asociación', url: 'https://www.ohchr.org/es/special-procedures/sr-freedom-of-assembly-and-association' },
  { t: 'Gaceta Oficial de la República de Cuba', url: 'https://www.gacetaoficial.gob.cu/' },
  { t: 'Constitución de Cuba de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
];

export const entradas = {
  'asociarse-libremente': {
    gancho: { q: '¿Qué debería pasar con los CDR después de un cambio?', o: ['Disolverlos', 'Que sus miembros decidan', 'Mantenerlos'] },
    entradilla: 'Qué hicieron España, Alemania oriental y Polonia con los sindicatos y organizaciones oficiales del régimen anterior.',
    th: 'Has visto tres caminos para las organizaciones oficiales. Compruébalo.',
    relacionadas: ['libertad-reunion-asociacion', 'libertad-sindical', 'legalizacion-organizaciones', 'sociedad-civil-fuerte'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige el país de cada hecho.',
        opciones: ['España', 'Alemania oriental', 'Polonia'],
        items: [
          { a: 'El sindicato vertical se disolvió en 1977', b: 'España' },
          { a: 'La central oficial FDGB se disolvió en 1990', b: 'Alemania oriental' },
          { a: 'La central oficial sobrevivió y compite con Solidaridad', b: 'Polonia' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Los convenios 87 y 98 de la OIT exigen autorización previa para crear un sindicato.', v: false, e: 'Garantizan crearlos sin autorización previa.' },
          { t: 'Cuba ha ratificado los convenios 87 y 98 de la OIT.', v: true, e: 'Aunque solo reconoce una central sindical.' },
        ],
      },
    ],
  },
  'registro-y-financiacion': {
    gancho: { q: '¿Debería una ONG cubana poder recibir dinero del extranjero?', o: ['Sí', 'Con transparencia', 'No'] },
    entradilla: 'Estados Unidos, Hungría y Nicaragua regulan el dinero extranjero de formas muy distintas. Qué dice el derecho internacional.',
    th: 'Has visto tres leyes sobre fondos extranjeros. Compruébalo.',
    relacionadas: ['ayuda-exterior-legitima', 'financiamiento-solo-publico', 'sociedad-civil-fuerte', 'transparencia'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige el país de cada ley.',
        opciones: ['Estados Unidos', 'Hungría', 'Nicaragua'],
        items: [
          { a: 'Registro solo para actividad política por encargo (1938)', b: 'Estados Unidos' },
          { a: 'Ley anulada por el tribunal europeo y derogada en 2021', b: 'Hungría' },
          { a: 'Miles de organizaciones cerradas tras la ley de 2020', b: 'Nicaragua' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu propuesta', instrucciones: '¿Qué reglas pondrías al dinero extranjero que reciben las organizaciones cubanas?',
        guia: ['Qué se permitiría', 'Qué transparencia se exigiría', 'Qué no se permitiría'],
        ejemplo: '',
      },
    ],
  },
  'organizaciones-en-cuba': {
    gancho: { q: '¿Debería hacer falta permiso del Estado para crear una asociación?', o: ['Sí', 'Solo registrarla', 'No'] },
    entradilla: 'Tres personas en España, siete en Alemania y ningún mínimo en Estados Unidos. En Cuba, un organismo del Estado que la tutele.',
    th: 'Has visto cómo se crea una asociación en cuatro países. Compruébalo.',
    relacionadas: ['libertad-reunion-asociacion', 'legalizacion-organizaciones', 'sociedad-civil-fuerte', 'participacion-ciudadana'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Cuántas personas?', instrucciones: 'Elige cuántas personas hacen falta para fundar o inscribir una asociación.',
        opciones: ['3', '7', 'No hay mínimo federal'],
        items: [
          { a: 'España', b: '3' },
          { a: 'Alemania, para inscribirla', b: '7' },
          { a: 'Estados Unidos', b: 'No hay mínimo federal' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'La ley cubana de 1985 exige un organismo estatal que supervise cada asociación.', v: true, e: 'El «órgano de relación».' },
          { t: 'Para los relatores de la ONU, una asociación no registrada no tiene derechos.', v: false, e: 'Señalan que también tiene derecho a existir.' },
        ],
      },
    ],
  },
  'participar-con-seguridad': {
    gancho: { q: '¿Crees que en una Cuba democrática los periodistas estarían seguros?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Colombia, México y la Unión Europea crearon mecanismos para proteger a periodistas y activistas. Qué funciona y qué no.',
    th: 'Has visto tres mecanismos de protección. Compruébalo.',
    relacionadas: ['defensor-pueblo', 'proteccion-denunciantes', 'independencia-judicial', 'accion-ciudadana-colectiva'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país o región es?', instrucciones: 'Elige quién creó cada mecanismo.',
        opciones: ['Colombia', 'México', 'Unión Europea'],
        items: [
          { a: 'Unidad Nacional de Protección (2011)', b: 'Colombia' },
          { a: 'Mecanismo federal para periodistas y defensores (2012)', b: 'México' },
          { a: 'Directiva contra demandas abusivas a periodistas (2024)', b: 'Unión Europea' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu propuesta', instrucciones: '¿Qué institución protegería en la nueva Cuba a quien informa o denuncia?',
        guia: ['Qué institución', 'Qué haría', 'De quién dependería'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué pasó con el sindicato vertical español en 1977?', o: ['Se mantuvo', 'Se disolvió y se legalizaron los sindicatos libres', 'Se privatizó', 'Pasó al ejército'], c: 1, e: 'Comisiones Obreras y UGT se legalizaron ese año.' },
  { q: '¿Qué concluyó en 2020 el Tribunal de Justicia de la UE sobre la ley húngara de fondos extranjeros?', o: ['Que era válida', 'Que era discriminatoria', 'Que debía ampliarse', 'Nada'], c: 1, e: 'Hungría la derogó en 2021.' },
  { q: '¿Cuántas personas hacen falta en España para fundar una asociación?', o: ['Una', 'Tres', 'Siete', 'Cien'], c: 1, e: 'La inscripción sirve solo para darle publicidad.' },
  { q: '¿Qué exige la ley cubana de asociaciones de 1985?', o: ['Nada', 'Un organismo estatal que supervise cada asociación', 'Siete fundadores', 'Un juez'], c: 1, e: 'El «órgano de relación».' },
  { q: '¿Qué reconoce la Declaración de la ONU sobre los defensores de derechos humanos?', o: ['Que solo el Estado puede financiarlos', 'El derecho a recibir recursos, también del extranjero', 'Que deben registrarse como agentes extranjeros', 'Nada sobre financiación'], c: 1, e: 'Es de 1998.' },
];
