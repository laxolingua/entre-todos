// Módulo «Pensar y debatir», bloque 10: Pensamiento sistémico. Texto propio de ENTRE TODOS.
export const lecciones = [
  {
    id: 'soluciones-que-empeoran',
    titulo: '¿Por qué las soluciones rápidas a veces empeoran el problema?',
    bloques: [
      { p: 'Un sistema es un conjunto de partes conectadas: una familia, un barrio, una economía, un ecosistema. Cuando se toca una parte, se mueven las demás. Por eso una solución que parece obvia puede producir efectos que nadie esperaba.' },
      { h: 'Un ejemplo de economía' },
      { p: 'Un gobierno fija por decreto que un producto se venda a un precio muy por debajo de lo que cuesta producirlo. La intención es buena: que todos puedan comprarlo. Pero a ese precio a los productores no les compensa venderlo, el producto desaparece de las tiendas y reaparece en un mercado informal, más caro que antes. Es uno de los efectos mejor estudiados de la economía, y se ha visto en muchos países y épocas.' },
      { h: 'Consecuencias no previstas' },
      { p: 'No significa que no haya que actuar. Significa que antes de actuar conviene preguntarse: ¿qué más va a cambiar si hago esto?, ¿quién va a reaccionar y cómo?, ¿qué pasará dentro de un año, no solo mañana?' },
      { h: 'Círculos que se refuerzan' },
      { p: 'Muchos problemas se alimentan a sí mismos. Si hay pocas guaguas, más gente intenta subir a cada una, las guaguas se rompen antes y hay todavía menos guaguas. Detectar estos círculos ayuda a encontrar dónde cortarlos.' },
    ],
  },
  {
    id: 'modelo-del-iceberg',
    titulo: '¿Por qué los mismos problemas vuelven una y otra vez?',
    bloques: [
      { p: 'Lo que vemos de un problema suele ser solo la punta. Debajo están las causas que lo hacen volver. El modelo del iceberg, muy usado en el pensamiento sistémico, propone mirar cuatro niveles.' },
      { lista: [
        '<strong>El hecho:</strong> lo que pasa y se ve. «Hoy se fue la corriente ocho horas».',
        '<strong>Los patrones:</strong> lo que se repite con el tiempo. «Pasa casi todos los días, y más en verano».',
        '<strong>Las estructuras:</strong> lo que produce esos patrones: reglas, instituciones, infraestructuras, quién decide y con qué recursos. Por ejemplo, centrales eléctricas envejecidas, falta de mantenimiento y dependencia del combustible importado.',
        '<strong>Los modelos mentales:</strong> las creencias y costumbres que sostienen esas estructuras, como «esto siempre ha sido así» o «no se puede hacer nada».',
      ] },
      { h: 'Por qué importa' },
      { p: 'Las soluciones que actúan solo sobre el hecho, como comprar una planta eléctrica para una casa, alivian a quien puede pagarlas, pero el problema vuelve. Las que llegan a las estructuras y a los modelos mentales son más difíciles, pero cambian el sistema.' },
      { p: 'El modelo del iceberg forma parte también del Marco Solucionario del Instituto para la Educación Humana, que verás en el bloque de pensamiento solucionario.' },
    ],
  },
  {
    id: 'puntos-de-palanca',
    titulo: '¿Dónde empujar para que algo cambie de verdad?',
    bloques: [
      { p: 'En un sistema hay lugares donde un pequeño cambio produce grandes efectos. La investigadora estadounidense Donella Meadows los llamó «puntos de palanca», en un ensayo de 1999 que se sigue usando en universidades de todo el mundo.' },
      { h: 'De menos a más fuerza' },
      { lista: [
        '<strong>Los números:</strong> subir un salario o bajar un precio. Es lo que más se discute y, según Meadows, lo que menos cambia el sistema.',
        '<strong>La información:</strong> quién sabe qué. Cuando las cuentas públicas se publican, cambia el comportamiento de quien gestiona el dinero.',
        '<strong>Las reglas:</strong> quién puede hacer qué, y quién decide. Cambiar las reglas cambia lo que los demás pueden hacer.',
        '<strong>Los objetivos:</strong> para qué existe el sistema. Un sistema que busca controlar funciona distinto de uno que busca servir.',
        '<strong>La mentalidad:</strong> las ideas de fondo sobre cómo funciona el mundo. Es lo más difícil de cambiar y lo que más cambia todo.',
      ] },
      { h: 'Aplicarlo' },
      { p: 'Ante un problema, pregúntate en qué nivel actúa cada solución propuesta. Muchas veces la discusión se centra en los números cuando la palanca está en la información o en las reglas.' },
    ],
  },
];

export const entradas = {
  'soluciones-que-empeoran': {
    gancho: { q: '¿Una solución con buena intención siempre da buen resultado?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Qué es un sistema, por qué una solución obvia puede producir efectos que nadie esperaba y cómo detectar los círculos que alimentan un problema.',
    th: 'Ya sabes qué son las consecuencias no previstas. Compruébalo.',
    relacionadas: ['fin-planificacion-central', 'estabilizacion-monetaria', 'subsidios'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Fijar un precio muy por debajo del coste puede hacer que el producto desaparezca de las tiendas.', v: true, e: 'Es uno de los efectos mejor estudiados de la economía.' },
          { t: 'Pensar en sistemas significa no actuar nunca.', v: false, e: 'Significa preguntarse qué más cambiará antes de actuar.' },
          { t: 'Algunos problemas se alimentan a sí mismos.', v: true, e: 'Son círculos que se refuerzan.' },
        ],
      },
      {
        tipo: 'escribe', titulo: '¿Qué más cambiaría?', instrucciones: 'Elige una medida que se haya propuesto en tu municipio o en el país. Escribe dos consecuencias que no fueran la intención.',
        guia: ['La medida', 'Consecuencia 1', 'Consecuencia 2'],
        ejemplo: '',
      },
    ],
  },
  'modelo-del-iceberg': {
    gancho: { q: '¿Los apagones son un problema técnico o algo más?', o: ['Técnico', 'Las dos cosas', 'Algo más'] },
    entradilla: 'El hecho, los patrones, las estructuras y los modelos mentales: cuatro niveles para entender por qué los problemas vuelven.',
    th: 'Ya conoces los cuatro niveles. ¿Sabrías reconocerlos? Compruébalo.',
    relacionadas: ['energia', 'matriz-energetica-renovable', 'infraestructura'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué nivel es?', instrucciones: 'Elige a qué nivel del iceberg corresponde cada frase.',
        opciones: ['Hecho', 'Patrón', 'Estructura', 'Modelo mental'],
        items: [
          { a: 'Hoy no hay agua en el edificio.', b: 'Hecho' },
          { a: 'Falta el agua tres días por semana desde hace un año.', b: 'Patrón' },
          { a: 'Las tuberías tienen sesenta años y no hay presupuesto para cambiarlas.', b: 'Estructura' },
          { a: 'Aquí siempre ha sido así, no se puede hacer nada.', b: 'Modelo mental' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu iceberg', instrucciones: 'Elige un problema de tu barrio y descríbelo en los cuatro niveles.',
        guia: ['Hecho', 'Patrón', 'Estructura y modelo mental'],
        ejemplo: '',
      },
    ],
  },
  'puntos-de-palanca': {
    gancho: { q: '¿Qué cambia más un país: subir los salarios o cambiar las reglas?', o: ['Subir los salarios', 'Las dos cosas', 'Cambiar las reglas'] },
    entradilla: 'Los puntos de palanca de Donella Meadows: dónde un pequeño cambio produce grandes efectos.',
    th: 'Ya conoces los niveles de palanca. Compruébalo.',
    relacionadas: ['transparencia', 'reforma-del-estado', 'educacion-civica'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué palanca usa?', instrucciones: 'Elige en qué nivel actúa cada medida.',
        opciones: ['Números', 'Información', 'Reglas', 'Objetivos'],
        items: [
          { a: 'Subir el salario mínimo', b: 'Números' },
          { a: 'Publicar en internet el presupuesto municipal', b: 'Información' },
          { a: 'Permitir que cualquiera abra un negocio sin licencia previa', b: 'Reglas' },
          { a: 'Que la policía tenga como fin proteger a las personas y no vigilar opiniones', b: 'Objetivos' },
        ],
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué es una consecuencia no prevista?', o: ['Un efecto que nadie buscaba al actuar', 'Un error de cálculo', 'Una ley nueva', 'Una crisis'], c: 0, e: 'Por eso conviene preguntarse qué más cambiará.' },
  { q: 'En el modelo del iceberg, ¿qué nivel está más al fondo?', o: ['El hecho', 'Los patrones', 'Las estructuras', 'Los modelos mentales'], c: 3, e: 'Las creencias que sostienen las estructuras.' },
  { q: 'Según Donella Meadows, ¿qué palanca suele cambiar menos el sistema?', o: ['La mentalidad', 'Las reglas', 'Los números', 'Los objetivos'], c: 2, e: 'Es lo que más se discute y lo que menos cambia.' },
];

export const fuentes = [
  { t: 'Donella Meadows, «Leverage Points: Places to Intervene in a System» (1999), Academy for Systems Change', url: 'https://donellameadows.org/archives/leverage-points-places-to-intervene-in-a-system/' },
  { t: 'Instituto para la Educación Humana (Institute for Humane Education)', url: 'https://humaneeducation.org/' },
];
