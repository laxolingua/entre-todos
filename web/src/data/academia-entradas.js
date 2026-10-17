// Blog académico de ENTRE TODOS: cada lección de un bloque se publica como una entrada de blog.
// Se lee como un artículo; el botón «Convertir en lección» activa la pregunta previa, la lectura activa,
// las actividades y el informe. Todo se guarda solo en el navegador de la persona.
//
// Tipos de actividad:
//   opcion    preguntas de opción múltiple            { q, o: [...], c, e }
//   vf        afirmaciones verdaderas o falsas        { t, v: true|false, e }
//   relaciona emparejar cada elemento con su pareja  { a, b }
//   huecos    completar huecos con un banco de palabras: texto con [palabra]
//   escribe   escritura breve con guía, ejemplo y autovaloración

export const PUBLICADO = '17 de octubre de 2026';
export const ACTUALIZADO = '17 de octubre de 2026';

export const entradas = {
  universales: {
    gancho: { q: '¿Puede una mayoría votar para quitarle un derecho a alguien?', o: ['Sí', 'Depende del derecho', 'No'] },
    entradilla: 'Qué son los derechos universales, qué diferencia hay entre firmar y ratificar un pacto, y en qué situación está Cuba.',
    th: 'Ya sabes qué dice la Declaración y qué falta para que un pacto obligue. ¿Sabrías decir cuál de las dos cosas ha hecho Cuba? Compruébalo en tres actividades cortas.',
    relacionadas: ['pactos-ddhh', 'carta-de-derechos', 'educacion-civica'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'La Declaración Universal de Derechos Humanos se aprobó en 1948.', v: true, e: 'La aprobó la Asamblea General de la ONU el 10 de diciembre de 1948.' },
          { t: 'Firmar un pacto obliga jurídicamente al Estado que lo firma.', v: false, e: 'Firmar expresa la intención de cumplirlo. Obliga cuando se ratifica.' },
          { t: 'Cuba ratificó en 2008 los dos pactos internacionales de 1966.', v: false, e: 'Los firmó el 28 de febrero de 2008 y no ha ratificado ninguno.' },
          { t: 'Estados Unidos ratificó en 1992 el Pacto de derechos civiles y políticos.', v: true, e: 'Lo ratificó en 1992. El de derechos económicos, sociales y culturales lo firmó en 1977 sin ratificarlo.' },
        ],
      },
      {
        tipo: 'relaciona', titulo: '¿Qué pacto lo protege?', instrucciones: 'Elige en qué pacto de 1966 está cada derecho.',
        opciones: ['Derechos civiles y políticos', 'Derechos económicos, sociales y culturales'],
        items: [
          { a: 'Libertad de expresión', b: 'Derechos civiles y políticos' },
          { a: 'Educación', b: 'Derechos económicos, sociales y culturales' },
          { a: 'Juicio justo', b: 'Derechos civiles y políticos' },
          { a: 'Salud', b: 'Derechos económicos, sociales y culturales' },
          { a: 'Elecciones', b: 'Derechos civiles y políticos' },
        ],
      },
      {
        tipo: 'opcion', titulo: 'Una pregunta', instrucciones: 'Elige la respuesta correcta.',
        items: [
          { q: '¿Qué significa que un derecho humano sea universal?', o: ['Que cada gobierno lo concede a sus ciudadanos', 'Que lo decide una mayoría en votación', 'Que corresponde a toda persona por el hecho de serlo'], c: 2, e: 'Ningún gobierno lo concede y ninguna mayoría puede retirarlo.' },
        ],
      },
    ],
  },
  democracias: {
    gancho: { q: '¿Debería castigarse por ley el discurso de odio?', o: ['Sí', 'Depende del caso', 'No'] },
    entradilla: 'Estados Unidos, Alemania, España y Costa Rica protegen los derechos de formas distintas. Lo que comparten es lo esencial.',
    th: 'Cuatro democracias, cuatro respuestas distintas a la misma pregunta. ¿Recuerdas quién vigila los derechos en cada país? Pruébalo.',
    relacionadas: ['tribunal-constitucional', 'amparo-y-garantias', 'defensor-pueblo'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Quién vigila los derechos?', instrucciones: 'Elige qué órgano controla en cada país que se respeten los derechos.',
        opciones: ['Corte Suprema y tribunales federales', 'Tribunal Constitucional Federal', 'Tribunal Constitucional (recurso de amparo)', 'Sala Constitucional de la Corte Suprema', 'Asamblea Nacional del Poder Popular'],
        items: [
          { a: 'Estados Unidos', b: 'Corte Suprema y tribunales federales' },
          { a: 'Alemania', b: 'Tribunal Constitucional Federal' },
          { a: 'España', b: 'Tribunal Constitucional (recurso de amparo)' },
          { a: 'Costa Rica', b: 'Sala Constitucional de la Corte Suprema' },
          { a: 'Cuba', b: 'Asamblea Nacional del Poder Popular' },
        ],
      },
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'La Ley Fundamental alemana dice que la dignidad humana es [intangible]. En España, quien considera violado un derecho fundamental puede presentar un recurso de [amparo]. En Estados Unidos, la [Primera] Enmienda protege la libertad de expresión y de prensa. En Costa Rica se puede acudir a la Sala Constitucional sin [abogado].',
        extra: ['Segunda', 'votable', 'permiso'],
      },
      {
        tipo: 'opcion', titulo: 'Una pregunta', instrucciones: 'Elige la respuesta correcta.',
        items: [
          { q: '¿Qué comparten Estados Unidos, Alemania, España y Costa Rica?', o: ['El mismo sistema electoral', 'Un juez independiente al que acudir cuando el poder viola un derecho', 'La misma ley sobre discurso de odio'], c: 1, e: 'Los cuatro tienen jueces con poder para corregir al gobierno. En lo demás difieren.' },
        ],
      },
    ],
  },
  'cuba-2019': {
    gancho: { q: '¿Puede haber libertad de prensa si los medios principales pertenecen al Estado?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'La Constitución vigente reconoce derechos con un lenguaje parecido al de otras constituciones. La diferencia está en las condiciones.',
    th: 'Has leído los artículos tal como están escritos. ¿Recuerdas qué dice cada uno? Compruébalo.',
    relacionadas: ['libertad-expresion', 'libertad-reunion-asociacion', 'reforma-constitucional-vigente'],
    actividades: [
      {
        tipo: 'relaciona', titulo: 'Artículo y contenido', instrucciones: 'Elige qué establece cada artículo de la Constitución de 2019.',
        opciones: ['Libertad de pensamiento, conciencia y expresión', 'Libertad de prensa conforme a la ley y los fines de la sociedad', 'Reunión y asociación con respeto al orden público', 'El sistema socialista es irrevocable', 'El Partido Comunista dirige la sociedad y el Estado'],
        items: [
          { a: 'Artículo 4', b: 'El sistema socialista es irrevocable' },
          { a: 'Artículo 5', b: 'El Partido Comunista dirige la sociedad y el Estado' },
          { a: 'Artículo 54', b: 'Libertad de pensamiento, conciencia y expresión' },
          { a: 'Artículo 55', b: 'Libertad de prensa conforme a la ley y los fines de la sociedad' },
          { a: 'Artículo 56', b: 'Reunión y asociación con respeto al orden público' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Desde 2022, la Ley 153 permite reclamar ante los tribunales la violación de un derecho constitucional.', v: true, e: 'La Ley 153, de amparo de los derechos constitucionales, es de 2022.' },
          { t: 'Cuba tiene un tribunal constitucional independiente.', v: false, e: 'El control constitucional corresponde a la Asamblea Nacional, que también aprueba las leyes.' },
          { t: 'El artículo 56 reconoce la reunión y la asociación sin ninguna condición.', v: false, e: 'Las condiciona al orden público y a lo que establezca la ley.' },
        ],
      },
    ],
  },
  practica: {
    gancho: { q: '¿Basta con que un derecho esté escrito en la Constitución?', o: ['Sí', 'Ayuda, pero no basta', 'No'] },
    entradilla: 'Cinco preguntas para examinar cualquier derecho en cualquier país, también en el futuro de Cuba.',
    th: 'Ahora te toca aplicarlas. Elige un derecho y examínalo con las cinco preguntas. Luego escribe cómo lo garantizarías tú.',
    relacionadas: ['carta-de-derechos', 'amparo-y-garantias', 'legalizacion-organizaciones'],
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
        tipo: 'escribe', titulo: 'Escribe tu versión', instrucciones: 'En dos o tres frases: ¿cómo garantizarías ese derecho en una futura Constitución?',
        guia: ['Qué reconoce el derecho', 'Qué no puede exigirse para ejercerlo', 'A quién se acude si se viola'],
        ejemplo: 'Toda persona puede reunirse y manifestarse pacíficamente sin pedir permiso. La ley solo puede exigir un aviso previo en la vía pública. Quien vea impedido este derecho puede acudir a un juez, que resolverá en 48 horas.',
      },
    ],
  },
};
