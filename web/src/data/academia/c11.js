// Módulo «Pensar y debatir», bloque 11: Educación humana.
// Basado en el trabajo de Zoe Weil y el Instituto para la Educación Humana (Institute for Humane Education). Texto propio de ENTRE TODOS.
export const lecciones = [
  {
    id: 'que-es-educacion-humana',
    titulo: '¿Puede la educación hacer a una sociedad más humana?',
    bloques: [
      { p: '«Humano» tiene dos sentidos: lo que somos y cómo tratamos a los demás. Llamamos inhumano a quien humilla, maltrata o es indiferente al sufrimiento. La educación humana se ocupa de ese segundo sentido: aprender a vivir y decidir de forma que hagamos el mayor bien y el menor daño posibles.' },
      { h: 'De dónde viene' },
      { p: 'La educadora estadounidense Zoe Weil cofundó en 1996 el Instituto para la Educación Humana (Institute for Humane Education). Su propuesta une en un solo enfoque cuatro campos que suelen enseñarse por separado: los derechos humanos, la protección de los animales, el cuidado del medio ambiente y la convivencia entre culturas.' },
      { h: 'Sus cuatro elementos' },
      { lista: [
        '<strong>Información veraz</strong> sobre cómo nuestras decisiones afectan a otros.',
        '<strong>Curiosidad, creatividad y pensamiento crítico,</strong> para investigar y no aceptar respuestas hechas.',
        '<strong>Reverencia, respeto y responsabilidad</strong> hacia las personas, los animales y la naturaleza.',
        '<strong>Alternativas positivas:</strong> no basta con saber qué está mal; hay que conocer qué se puede hacer.',
      ] },
      { h: 'El mayor bien, el menor daño' },
      { p: 'Weil resume su criterio en una pregunta que se puede hacer ante cualquier decisión, personal o pública: ¿qué opción hace el mayor bien y el menor daño a las personas, a los animales y al medio ambiente? Es el mismo filtro ético que usa la Gobernanza Solucionaria y que aplica ENTRE TODOS.' },
    ],
  },
  {
    id: 'discrepar-sin-humillar',
    titulo: '¿Cómo discutir con alguien que piensa lo contrario sin convertirlo en enemigo?',
    bloques: [
      { p: 'Durante décadas en Cuba no hubo espacios libres para debatir en público. Debatir es una habilidad, y como cualquier habilidad se aprende practicando. Estas pautas sirven en una cola, en una reunión de vecinos o en los comentarios de una red social.' },
      { h: 'Escuchar antes de responder' },
      { lista: [
        '<strong>Pregunta antes de contestar:</strong> «¿Qué quieres decir con eso?», «¿por qué lo piensas?».',
        '<strong>Repite con tus palabras</strong> lo que entendiste: «Si te entiendo bien, dices que…». Si el otro dice «sí, eso», ya podéis discutir de verdad.',
        '<strong>Busca lo que compartís:</strong> casi siempre hay un deseo común debajo del desacuerdo, como que la familia viva mejor.',
      ] },
      { h: 'Discrepar con respeto' },
      { lista: [
        'Critica la idea, no a la persona.',
        'Habla en primera persona: «yo lo veo de otra forma» en lugar de «tú estás equivocado».',
        'No te burles. La burla no convence a nadie; solo humilla y cierra la conversación.',
        'Reconoce cuando el otro tiene razón en algo.',
        'Acepta que, a veces, la conversación termina sin acuerdo. Eso también es convivir.',
      ] },
      { h: 'Los límites' },
      { p: 'Respetar a la persona no obliga a aceptar cualquier idea. Se puede rechazar con firmeza la defensa de la violencia o de la persecución de quien piensa distinto sin insultar a quien la defiende. La firmeza está en los argumentos, no en el tono.' },
    ],
  },
  {
    id: 'el-precio-real',
    titulo: '¿Cuánto cuesta de verdad lo que elegimos?',
    bloques: [
      { p: 'Cada producto y cada decisión tienen un precio que pagamos y otro que pagan otros: quien lo produjo, los animales afectados, el lugar de donde salió la materia prima, quien vivirá con los residuos. La educación humana invita a mirar ese precio real.' },
      { h: 'Cuatro preguntas' },
      { lista: [
        '¿Quién lo hizo y en qué condiciones trabajó?',
        '¿Qué animales se vieron afectados?',
        '¿Qué recursos naturales usó y qué residuos deja?',
        '¿Hay una alternativa que haga más bien y menos daño?',
      ] },
      { h: 'Sin culpa, con información' },
      { p: 'No se trata de sentirse culpable por todo, ni de que cada persona pueda elegir siempre lo ideal: en Cuba, a menudo no hay donde elegir. Se trata de saber, para decidir mejor cuando se puede y para exigir mejores opciones cuando no se puede.' },
      { h: 'Del bolsillo a la política' },
      { p: 'Las mismas preguntas sirven para juzgar una ley o una política pública: ¿a quién beneficia?, ¿a quién perjudica?, ¿a qué animales y qué entorno afecta?, ¿qué alternativa haría más bien y menos daño? Es el filtro que podrás aplicar a las propuestas del banco.' },
    ],
  },
];

export const entradas = {
  'que-es-educacion-humana': {
    gancho: { q: '¿Se puede aprender a ser más humano?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Qué es la educación humana, de dónde viene, sus cuatro elementos y el criterio del mayor bien y el menor daño.',
    th: 'Ya conoces los cuatro elementos. Compruébalo.',
    relacionadas: ['educacion-civica', 'derechos-animales', 'proteccion-ambiental'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'La educación humana une derechos humanos, protección animal, medio ambiente y convivencia entre culturas.', v: true, e: 'Es su rasgo principal.' },
          { t: 'Basta con saber qué está mal; no hace falta conocer alternativas.', v: false, e: 'Las alternativas positivas son uno de sus cuatro elementos.' },
          { t: 'El criterio del mayor bien y el menor daño incluye a los animales.', v: true, e: 'Personas, animales y medio ambiente.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Mayor bien, menor daño', instrucciones: 'Elige una decisión que tomes a menudo (qué comer, cómo moverte, qué comprar) y escribe qué opción haría más bien y menos daño.',
        guia: ['La decisión', 'Las opciones', 'La que hace más bien y menos daño'],
        ejemplo: '',
      },
    ],
  },
  'discrepar-sin-humillar': {
    gancho: { q: '¿Has terminado alguna discusión política peleado con alguien?', o: ['Sí', 'Alguna vez', 'No'] },
    entradilla: 'Escuchar antes de responder, discrepar con respeto y mantener la firmeza en los argumentos y no en el tono.',
    th: 'Ya conoces las pautas. ¿Sabrías aplicarlas? Compruébalo.',
    relacionadas: ['dialogo-nacional', 'reconciliacion', 'libertad-expresion'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Ayuda o cierra la conversación?', instrucciones: 'Elige el efecto de cada frase.',
        opciones: ['Ayuda al diálogo', 'Cierra la conversación'],
        items: [
          { a: 'Si te entiendo bien, dices que…', b: 'Ayuda al diálogo' },
          { a: 'Jajaja, qué ignorante.', b: 'Cierra la conversación' },
          { a: 'Yo lo veo de otra forma, por esta razón…', b: 'Ayuda al diálogo' },
          { a: 'Contigo no se puede hablar.', b: 'Cierra la conversación' },
          { a: 'En eso tienes razón.', b: 'Ayuda al diálogo' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Reescribe', instrucciones: 'Reescribe este comentario para que discrepe sin humillar: «Tú no sabes nada, eres un idiota que repite lo que le dicen».',
        guia: ['Sin insulto', 'Con tu postura', 'Con una razón'],
        ejemplo: 'No estoy de acuerdo con lo que dices. Creo que los datos muestran otra cosa: ¿has visto este informe?',
      },
    ],
  },
  'el-precio-real': {
    gancho: { q: '¿Piensas en quién hizo lo que compras?', o: ['Casi nunca', 'A veces', 'A menudo'] },
    entradilla: 'El precio que pagamos y el que pagan otros: cuatro preguntas para decidir mejor, en el bolsillo y en la política.',
    th: 'Ya conoces las cuatro preguntas. Compruébalo.',
    relacionadas: ['derechos-laborales', 'bienestar-animal-granjas-traccion', 'proteccion-ambiental'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'El precio real de un producto incluye costes que pagan otros.', v: true, e: 'Trabajadores, animales, medio ambiente.' },
          { t: 'La educación humana pretende que cada persona se sienta culpable por todo.', v: false, e: 'Busca información para decidir mejor y exigir mejores opciones.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Aplica el filtro', instrucciones: 'Elige una propuesta del banco y aplícale las cuatro preguntas.',
        guia: ['A quién beneficia', 'A quién perjudica', 'Qué animales y entorno afecta'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Quién cofundó el Instituto para la Educación Humana?', o: ['Jeremy Bentham', 'Zoe Weil', 'Donella Meadows', 'John Stuart Mill'], c: 1, e: 'En 1996.' },
  { q: '¿Cuál de estos es uno de los cuatro elementos de la educación humana?', o: ['Obediencia', 'Alternativas positivas', 'Competencia', 'Memorización'], c: 1, e: 'No basta con saber qué está mal.' },
  { q: '¿Qué ayuda más en una discusión?', o: ['Burlarse del otro', 'Repetir con tus palabras lo que entendiste', 'Hablar más alto', 'Cambiar de tema'], c: 1, e: 'Así se comprueba que se discute lo mismo.' },
];

export const fuentes = [
  { t: 'Instituto para la Educación Humana (Institute for Humane Education)', url: 'https://humaneeducation.org/' },
];
