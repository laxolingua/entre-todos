// Bloque 3: Justicia y Estado de derecho.
export const lecciones = [
  {
    id: 'nadie-por-encima',
    titulo: 'Nadie por encima de la ley',
    minutos: 6,
    bloques: [
      { p: 'Estado de derecho significa que todas las personas y todas las instituciones, también el gobierno, están sometidas a leyes públicas, que se aplican por igual y que juzgan tribunales independientes. Así lo resumió en 2004 el secretario general de la ONU en un informe al Consejo de Seguridad.' },
      { p: 'La idea tiene dos partes. La primera: el poder actúa según reglas conocidas, no según la voluntad de quien manda. La segunda: cuando el poder se salta esas reglas, alguien puede pararlo.' },
      { h: 'Cómo lo escriben otras constituciones' },
      { cita: 'Los ciudadanos y los poderes públicos están sujetos a la Constitución y al resto del ordenamiento jurídico.', fuente: 'Constitución Española de 1978, artículo 9.1' },
      { cita: 'El poder legislativo está sometido al orden constitucional; los poderes ejecutivo y judicial, a la ley y al derecho.', fuente: 'Ley Fundamental de Alemania, artículo 20.3' },
      { h: 'Un ejemplo: el presidente y sus grabaciones' },
      { p: 'En 1974, en el caso Estados Unidos contra Nixon, la Corte Suprema ordenó por unanimidad al presidente Richard Nixon entregar las grabaciones de su despacho que pedía la investigación del caso Watergate. Nixon las entregó y dimitió dos semanas después. Ni el cargo más alto del país estaba por encima de una orden judicial.' },
      { h: 'Qué dice la Constitución cubana de 2019' },
      { p: 'El artículo 7 establece que la Constitución es la norma suprema y que todos están obligados a cumplirla, incluidos los órganos del Estado y sus funcionarios. El artículo 5 define al Partido Comunista de Cuba como la fuerza política dirigente superior de la sociedad y del Estado. Ninguna ley regula cómo se exigen responsabilidades al Partido, que no es un órgano del Estado.' },
      { p: 'La pregunta práctica es la misma que en cualquier país: si una autoridad incumple la ley, ¿hay alguien con poder real para obligarla a cumplirla?' },
    ],
  },
  {
    id: 'jueces-independientes',
    titulo: 'Jueces independientes: cómo se eligen en cinco países',
    minutos: 7,
    bloques: [
      { p: 'Un juez es independiente cuando puede fallar contra el gobierno sin temer por su puesto. Para eso importan tres cosas: quién lo nombra, cuánto dura en el cargo y quién puede destituirlo.' },
      { h: 'Estados Unidos' },
      { p: 'Los jueces federales, incluidos los de la Corte Suprema, los propone el presidente y los confirma el Senado. Son vitalicios mientras observen buena conducta y su sueldo no puede reducirse. Solo el Congreso puede destituirlos mediante un juicio político. En muchos estados los jueces locales se eligen por votación popular.' },
      { h: 'Alemania' },
      { p: 'Los dieciséis magistrados del Tribunal Constitucional Federal los elige, la mitad, el Bundestag y, la otra mitad, el Bundesrat, en ambos casos por mayoría de dos tercios. El mandato es de doce años y no se puede repetir. La mayoría reforzada obliga a que gobierno y oposición se pongan de acuerdo.' },
      { h: 'España' },
      { p: 'El Consejo General del Poder Judicial gobierna a los jueces: decide nombramientos, ascensos y sanciones, para que no dependan del Ministerio de Justicia. Los doce magistrados del Tribunal Constitucional los proponen el Congreso y el Senado (cuatro cada uno, por mayoría de tres quintos), el Gobierno (dos) y el Consejo General del Poder Judicial (dos). Su mandato es de nueve años.' },
      { h: 'Costa Rica' },
      { p: 'La Asamblea Legislativa elige a los magistrados de la Corte Suprema por mayoría de dos tercios. Su mandato es de ocho años y se renueva automáticamente salvo que dos tercios de la Asamblea voten en contra. Así, un magistrado no depende de agradar al gobierno de turno para seguir en el cargo.' },
      { h: 'Cuba' },
      { p: 'La Constitución de 2019 dice que los jueces son independientes y solo deben obediencia a la ley. Al presidente y a los magistrados del Tribunal Supremo Popular los elige la Asamblea Nacional del Poder Popular, ante la que el tribunal rinde cuenta de su trabajo. La misma Asamblea aprueba las leyes y controla que respeten la Constitución.' },
    ],
    tabla: {
      titulo: 'Cinco países, los mismos datos',
      columnas: ['País', 'Quién elige al tribunal superior', 'Mayoría exigida', 'Duración del cargo'],
      filas: [
        ['Estados Unidos', 'Presidente con confirmación del Senado', 'Mayoría simple del Senado', 'Vitalicio'],
        ['Alemania', 'Bundestag y Bundesrat', 'Dos tercios', '12 años, sin repetir'],
        ['España', 'Congreso, Senado, Gobierno y Consejo General del Poder Judicial', 'Tres quintos en las Cortes', '9 años'],
        ['Costa Rica', 'Asamblea Legislativa', 'Dos tercios', '8 años, renovables automáticamente'],
        ['Cuba', 'Asamblea Nacional del Poder Popular', 'La que fija la ley', 'La que fija la ley; el tribunal rinde cuenta a la Asamblea'],
      ],
    },
  },
  {
    id: 'juicio-justo',
    titulo: 'El juicio justo y la presunción de inocencia',
    minutos: 6,
    bloques: [
      { cita: 'Toda persona acusada de delito tiene derecho a que se presuma su inocencia mientras no se pruebe su culpabilidad, conforme a la ley y en juicio público en el que se le hayan asegurado todas las garantías necesarias para su defensa.', fuente: 'Declaración Universal de Derechos Humanos, artículo 11.1' },
      { p: 'Es la acusación la que tiene que probar la culpa. El acusado no tiene que probar que es inocente. El artículo 14 del Pacto Internacional de Derechos Civiles y Políticos detalla las garantías mínimas:' },
      { lista: [
        'Un tribunal competente, independiente e imparcial, establecido por la ley.',
        'Un juicio público, salvo excepciones justificadas.',
        'Saber sin demora de qué se le acusa, en un idioma que entienda.',
        'Tiempo y medios para preparar la defensa y un abogado de su elección.',
        'No ser obligado a declarar contra sí mismo ni a confesarse culpable.',
        'Poder recurrir la condena ante un tribunal superior.',
      ] },
      { h: 'Hábeas corpus: presentar a la persona' },
      { p: 'El hábeas corpus obliga a la autoridad a presentar ante un juez a una persona detenida para que este decida si la detención es legal. Existe en Inglaterra desde la Edad Media y lo recogen las constituciones de Estados Unidos, España y Costa Rica, entre otras. La Ley Fundamental alemana llega al mismo resultado con otra fórmula: solo un juez puede decidir sobre una privación de libertad, y nadie puede quedar detenido por la policía más allá del día siguiente a su detención.' },
      { h: 'Qué dicen las normas cubanas' },
      { p: 'La Constitución de 2019 reconoce el debido proceso, la presunción de inocencia, el derecho a la defensa desde el inicio del proceso y el hábeas corpus. La Ley del Proceso Penal de 2021 los desarrolla. La mayoría de los abogados ejerce en la Organización Nacional de Bufetes Colectivos, una entidad autorizada por el Estado.' },
      { p: 'Tras las protestas del 11 de julio de 2021, la Oficina del Alto Comisionado de la ONU para los Derechos Humanos y organizaciones independientes informaron de juicios sumarios y colectivos y de acusados que no pudieron elegir abogado. El Gobierno cubano sostuvo que los procesos respetaron la ley.' },
    ],
  },
  {
    id: 'practica-justicia',
    titulo: 'Del papel a la práctica: preguntas para examinar un sistema judicial',
    minutos: 5,
    bloques: [
      { p: 'Estas cinco preguntas sirven para examinar cualquier sistema judicial, también el de una futura Cuba:' },
      { lista: [
        '¿Puede un juez fallar contra el gobierno sin perder su puesto?',
        '¿Lo eligió una mayoría que obliga a gobierno y oposición a ponerse de acuerdo?',
        '¿Puede la persona detenida ver a un juez en pocas horas?',
        '¿Puede elegir libremente a su abogado?',
        '¿Son públicos los juicios y pueden asistir la familia y la prensa?',
      ] },
      { p: 'Ningún sistema responde perfectamente a las cinco. En las democracias los fallos se discuten, se recurren y se corrigen: existen tribunales superiores, prensa que informa sobre los juicios y abogados que no dependen del Estado.' },
      { p: 'Puedes aplicar estas preguntas a las propuestas del banco: ¿cuáles proponen un tribunal constitucional?, ¿cuáles cambian la forma de elegir a los jueces?, ¿cuáles garantizan el debido proceso?' },
    ],
  },
];

export const fuentes = [
  { t: 'Informe del secretario general de la ONU sobre el Estado de derecho (S/2004/616)', url: 'https://undocs.org/es/S/2004/616' },
  { t: 'Pacto Internacional de Derechos Civiles y Políticos, artículo 14 (ACNUDH)', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
  { t: 'Constitución Española de 1978 (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229' },
  { t: 'Ley Fundamental de Alemania (Bundestag, en español)', url: 'https://www.btg-bestellservice.de/pdf/80206000.pdf' },
  { t: 'Constitución de los Estados Unidos (Archivos Nacionales)', url: 'https://www.archives.gov/espanol/constitucion' },
  { t: 'Constitución de Cuba de 2019 (Constitute Project)', url: 'https://www.constituteproject.org/constitution/Cuba_2019?lang=es' },
  { t: 'Gaceta Oficial de la República de Cuba', url: 'https://www.gacetaoficial.gob.cu/' },
];

export const entradas = {
  'nadie-por-encima': {
    gancho: { q: '¿Debería un presidente poder negarse a cumplir una orden judicial?', o: ['Sí', 'En casos excepcionales', 'No'] },
    entradilla: 'Qué significa el Estado de derecho, cómo lo escriben otras constituciones y qué pasó cuando un presidente de Estados Unidos recibió una orden judicial.',
    th: 'Ya sabes qué es el Estado de derecho. ¿Sabrías reconocerlo en casos concretos? Compruébalo.',
    relacionadas: ['estado-de-derecho', 'gobierno-limitado', 'fin-partido-unico-dirigente'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'En un Estado de derecho las leyes obligan también al gobierno.', v: true, e: 'Es la primera parte de la idea: el poder actúa según reglas conocidas.' },
          { t: 'En 1974 la Corte Suprema permitió a Nixon quedarse con sus grabaciones.', v: false, e: 'Le ordenó entregarlas, por unanimidad. Dimitió dos semanas después.' },
          { t: 'La Constitución cubana define al Partido Comunista como un órgano del Estado.', v: false, e: 'Lo define como fuerza política dirigente superior de la sociedad y del Estado; no es un órgano del Estado.' },
        ],
      },
      {
        tipo: 'relaciona', titulo: 'Texto y país', instrucciones: 'Elige a qué constitución pertenece cada frase.',
        opciones: ['España', 'Alemania', 'Cuba'],
        items: [
          { a: 'Los ciudadanos y los poderes públicos están sujetos a la Constitución', b: 'España' },
          { a: 'El poder ejecutivo y el judicial están sometidos a la ley y al derecho', b: 'Alemania' },
          { a: 'Un partido es la fuerza política dirigente superior de la sociedad y del Estado', b: 'Cuba' },
        ],
      },
      {
        tipo: 'opcion', titulo: 'Una pregunta', instrucciones: 'Elige la respuesta correcta.',
        items: [
          { q: '¿Cuál es la segunda parte de la idea de Estado de derecho?', o: ['Que el gobierno elige a los jueces', 'Que cuando el poder se salta las reglas, alguien puede pararlo', 'Que las leyes no se pueden cambiar'], c: 1, e: 'Hace falta alguien con poder real para obligar a la autoridad a cumplir la ley.' },
        ],
      },
    ],
  },
  'jueces-independientes': {
    gancho: { q: '¿Quién debería elegir a los jueces del tribunal más alto?', o: ['El gobierno', 'El parlamento con una mayoría amplia', 'Los ciudadanos en votación'] },
    entradilla: 'Quién nombra a los jueces, cuánto duran y quién puede destituirlos: cinco países, cinco respuestas.',
    th: 'Has visto cinco formas de elegir a los jueces. ¿Recuerdas cuál es la de cada país? Compruébalo.',
    relacionadas: ['independencia-judicial', 'seleccion-de-jueces', 'tribunal-constitucional'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige a qué país corresponde cada forma de elegir a los jueces.',
        opciones: ['Estados Unidos', 'Alemania', 'España', 'Costa Rica', 'Cuba'],
        items: [
          { a: 'Jueces vitalicios propuestos por el presidente y confirmados por el Senado', b: 'Estados Unidos' },
          { a: 'Mandato de doce años sin repetir, con mayoría de dos tercios', b: 'Alemania' },
          { a: 'Un consejo gobierna a los jueces y decide sus nombramientos', b: 'España' },
          { a: 'Ocho años renovables salvo que dos tercios voten en contra', b: 'Costa Rica' },
          { a: 'El tribunal supremo rinde cuenta a la asamblea que aprueba las leyes', b: 'Cuba' },
        ],
      },
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'Un juez es independiente cuando puede fallar contra el [gobierno] sin temer por su puesto. La mayoría de dos tercios obliga a gobierno y [oposición] a ponerse de acuerdo. En España, el Tribunal Constitucional tiene [doce] magistrados.',
        extra: ['partido', 'dieciséis', 'prensa'],
      },
      {
        tipo: 'escribe', titulo: 'Escribe tu versión', instrucciones: 'En dos o tres frases: ¿cómo elegirías a los jueces del tribunal más alto de una futura Cuba?',
        guia: ['Quién los elige', 'Con qué mayoría', 'Cuánto duran y quién puede destituirlos'],
        ejemplo: 'Los elegiría el parlamento por mayoría de dos tercios, entre candidatos propuestos por las facultades de Derecho y los colegios de abogados. Durarían diez años sin repetir. Solo podrían ser destituidos por un delito probado.',
      },
    ],
  },
  'juicio-justo': {
    gancho: { q: '¿Debería la persona acusada demostrar que es inocente?', o: ['Sí', 'Depende del delito', 'No'] },
    entradilla: 'La presunción de inocencia, las garantías mínimas de todo juicio y el hábeas corpus, con lo que dicen las normas cubanas.',
    th: 'Ya conoces las garantías de un juicio justo. ¿Sabrías reconocerlas? Compruébalo.',
    relacionadas: ['debido-proceso', 'amparo-y-garantias', 'presos-politicos'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'La presunción de inocencia obliga al acusado a probar que no cometió el delito.', v: false, e: 'Es la acusación la que tiene que probar la culpa.' },
          { t: 'El Pacto de derechos civiles y políticos garantiza el derecho a recurrir la condena.', v: true, e: 'Es una de las garantías del artículo 14.' },
          { t: 'El hábeas corpus obliga a presentar a la persona detenida ante un juez.', v: true, e: 'El juez decide si la detención es legal.' },
          { t: 'La Constitución cubana de 2019 no menciona la presunción de inocencia.', v: false, e: 'La reconoce, junto con el debido proceso y el hábeas corpus.' },
        ],
      },
      {
        tipo: 'relaciona', titulo: '¿Se respeta la garantía?', instrucciones: 'Elige si cada caso respeta o no las garantías de un juicio justo.',
        opciones: ['Respeta la garantía', 'No la respeta'],
        items: [
          { a: 'La familia y la prensa pueden asistir al juicio', b: 'Respeta la garantía' },
          { a: 'El acusado conoce los cargos el mismo día del juicio', b: 'No la respeta' },
          { a: 'El acusado elige a su abogado', b: 'Respeta la garantía' },
          { a: 'Se obliga al detenido a firmar una confesión', b: 'No la respeta' },
        ],
      },
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'Toda persona acusada tiene derecho a que se presuma su [inocencia]. Nadie puede ser obligado a declarar contra sí [mismo]. El tribunal tiene que ser competente, independiente e [imparcial].',
        extra: ['culpa', 'secreto', 'militar'],
      },
    ],
  },
  'practica-justicia': {
    gancho: { q: '¿Confiarías en un juez para defenderte de una autoridad?', o: ['Sí', 'Depende del país', 'No'] },
    entradilla: 'Cinco preguntas para examinar cualquier sistema judicial, también el de una futura Cuba.',
    th: 'Ahora te toca aplicarlas. Examina con las cinco preguntas un sistema judicial y escribe cómo lo mejorarías.',
    relacionadas: ['independencia-judicial', 'jueces-de-paz', 'formacion-juridica'],
    actividades: [
      {
        tipo: 'examen', titulo: 'Examina un sistema judicial', instrucciones: 'Elige un sistema y responde las cinco preguntas. No hay respuesta correcta: es tu análisis.',
        derechos: ['El sistema judicial cubano de hoy', 'El de Estados Unidos', 'El de Alemania', 'El de España', 'El de Costa Rica'],
        preguntas: [
          '¿Puede un juez fallar contra el gobierno sin perder su puesto?',
          '¿Lo eligió una mayoría que obliga a ponerse de acuerdo?',
          '¿Ve la persona detenida a un juez en pocas horas?',
          '¿Puede elegir libremente a su abogado?',
          '¿Son públicos los juicios?',
        ],
      },
      {
        tipo: 'escribe', titulo: 'Escribe tu versión', instrucciones: 'En dos o tres frases: ¿qué cambiarías primero en el sistema judicial que has examinado?',
        guia: ['Qué cambiarías', 'Por qué es lo primero', 'Cómo sabrías que funciona'],
        ejemplo: 'Permitiría a los abogados ejercer de forma independiente. Sin abogado libre las demás garantías se quedan en el papel. Sabría que funciona cuando los acusados puedan elegir defensor desde la detención.',
      },
    ],
  },
};
