// Módulo «Pensar y debatir», bloque 8: Pensamiento creativo. Texto propio de ENTRE TODOS.
export const lecciones = [
  {
    id: 'reformular-el-problema',
    titulo: '¿Y si el problema no es el que crees?',
    bloques: [
      { p: 'Muchas soluciones fallan porque responden a la pregunta equivocada. Antes de buscar respuestas, conviene comprobar que estamos haciendo la pregunta correcta.' },
      { h: 'Un ejemplo' },
      { p: 'En un edificio, los vecinos se quejan de que el elevador tarda mucho. La primera idea es cambiarlo, lo que cuesta mucho dinero. Alguien reformula el problema: la queja no es la velocidad, sino que la espera se hace larga. Ponen un espejo junto al elevador y las quejas bajan. El problema real era la espera, no el elevador.' },
      { p: 'El ejemplo es clásico en los cursos de creatividad. No dice que los espejos lo resuelvan todo; dice que la forma de plantear el problema decide qué soluciones se nos ocurren.' },
      { h: 'Tres preguntas para reformular' },
      { lista: [
        '<strong>¿Por qué es un problema?</strong> Pregunta «¿por qué?» varias veces seguidas hasta llegar a la causa.',
        '<strong>¿Para quién es un problema?</strong> El mismo hecho puede ser un problema distinto para un vecino, un comerciante o un animal del barrio.',
        '<strong>¿Cómo podríamos…?</strong> Convierte la queja en una pregunta abierta: de «no hay transporte» a «¿cómo podríamos llegar al trabajo sin depender de la guagua?».',
      ] },
      { h: 'Un problema bien escrito' },
      { p: 'Dice qué pasa, a quién afecta, dónde y desde cuándo, sin incluir ya la solución. «Hay que comprar un camión de basura» es una solución disfrazada de problema. «La basura se acumula tres días por semana en esta calle y atrae ratas» es un problema que admite muchas soluciones.' },
    ],
  },
  {
    id: 'generar-alternativas',
    titulo: '¿Por qué la primera idea casi nunca es la mejor?',
    bloques: [
      { p: 'La primera idea que se nos ocurre suele ser la más obvia, la que ya hemos visto. Las buenas ideas aparecen después, cuando se agotan las obvias. Por eso conviene separar dos momentos: primero generar muchas ideas, y solo después elegir.' },
      { h: 'Reglas para generar ideas' },
      { lista: [
        '<strong>Cantidad antes que calidad.</strong> Treinta ideas, aunque veinte sean malas, dan más opciones que tres.',
        '<strong>Sin juzgar mientras se generan.</strong> Criticar una idea en el momento hace que la gente deje de proponer.',
        '<strong>Construir sobre las ideas de otros.</strong> «Sí, y además…» funciona mejor que «sí, pero…».',
        '<strong>Las ideas raras son bienvenidas.</strong> Una idea imposible puede llevar a otra posible.',
      ] },
      { h: 'Técnicas sencillas' },
      { lista: [
        '<strong>Invertir:</strong> ¿cómo empeoraríamos el problema? Luego se da la vuelta a cada respuesta.',
        '<strong>Combinar:</strong> unir dos ideas que no parecen relacionadas.',
        '<strong>Copiar con cabeza:</strong> ¿quién, en otro país u otro oficio, ya resolvió algo parecido?',
        '<strong>Cambiar el punto de vista:</strong> ¿cómo lo resolvería un niño, una abuela, un ingeniero, un campesino?',
      ] },
      { h: 'Después, elegir' },
      { p: 'Cuando hay muchas ideas, se agrupan las parecidas y se evalúan con criterios claros: ¿resuelve la causa?, ¿cuánto cuesta?, ¿a quién perjudica?, ¿se puede hacer? Elegir es el trabajo del pensamiento crítico; generar, el del creativo. Hacen falta los dos.' },
    ],
  },
  {
    id: 'inventar-o-resolver',
    titulo: '¿Es lo mismo «inventar» que resolver?',
    bloques: [
      { p: 'En Cuba, «inventar» es casi una forma de vida: arreglar un ventilador con piezas de otro, cocinar con lo que hay, llegar a fin de mes. Es una creatividad enorme, nacida de la necesidad, y es una capacidad valiosa para cualquier país.' },
      { h: 'La diferencia' },
      { p: 'Inventar resuelve el problema de hoy para una persona o una familia. Resolver de verdad cambia las condiciones para que el problema no vuelva a aparecer, ni para esa familia ni para las demás. Arreglar el ventilador otra vez es inventar; conseguir que haya electricidad estable y piezas a la venta es resolver.' },
      { h: 'Llevar el ingenio a lo común' },
      { p: 'La misma creatividad que sirve para salir del día puede servir para diseñar soluciones colectivas: un huerto comunitario, una cooperativa de reparación, una propuesta para el municipio. La diferencia está en preguntarse no solo «¿cómo salgo de esto?», sino «¿cómo salimos todos y por qué pasa?».' },
      { h: 'De la idea a la propuesta' },
      { p: 'Una idea creativa se convierte en propuesta cuando se escribe con claridad, se apoya en evidencia y se piensa en a quién afecta. Ese es el camino de los bloques de pensamiento solucionario y del banco de propuestas de ENTRE TODOS, donde cualquier persona puede presentar la suya.' },
    ],
  },
];

export const entradas = {
  'reformular-el-problema': {
    gancho: { q: 'Cuando algo va mal, ¿buscas primero la solución o la causa?', o: ['La solución', 'Depende', 'La causa'] },
    entradilla: 'Por qué muchas soluciones fallan al responder la pregunta equivocada, y tres preguntas para plantear bien un problema.',
    th: 'Ya sabes reformular. ¿Sabrías distinguir un problema de una solución disfrazada? Compruébalo.',
    relacionadas: ['participacion-local', 'residuos-servicio-exigible'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Problema o solución disfrazada?', instrucciones: 'Elige qué es cada frase.',
        opciones: ['Problema bien planteado', 'Solución disfrazada'],
        items: [
          { a: 'Hay que comprar un camión de basura.', b: 'Solución disfrazada' },
          { a: 'La basura se acumula tres días por semana y atrae ratas.', b: 'Problema bien planteado' },
          { a: 'Hay que poner más guaguas.', b: 'Solución disfrazada' },
          { a: 'Los trabajadores del barrio tardan dos horas en llegar al trabajo.', b: 'Problema bien planteado' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Reformula', instrucciones: 'Elige una queja frecuente de tu barrio y conviértela en una pregunta que empiece por «¿Cómo podríamos…?».',
        guia: ['La queja', 'A quién afecta', '¿Cómo podríamos…?'],
        ejemplo: 'Queja: no hay agua por la tarde. Afecta a las familias del último piso. ¿Cómo podríamos tener agua por la tarde en los pisos altos?',
      },
    ],
  },
  'generar-alternativas': {
    gancho: { q: '¿Sueles quedarte con la primera idea que se te ocurre?', o: ['Casi siempre', 'A veces', 'Casi nunca'] },
    entradilla: 'Generar muchas ideas antes de elegir: reglas y técnicas sencillas para salir de lo obvio.',
    th: 'Ya conoces las reglas. ¿Sabrías aplicarlas? Compruébalo.',
    relacionadas: ['participacion-ciudadana', 'emprendimiento'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Mientras se generan ideas, conviene criticar cada una enseguida.', v: false, e: 'Juzgar en ese momento frena la generación de ideas.' },
          { t: 'Una idea imposible puede llevar a otra posible.', v: true, e: 'Por eso las ideas raras son bienvenidas.' },
          { t: 'Generar ideas y elegir entre ellas son dos momentos distintos.', v: true, e: 'Primero el pensamiento creativo; después, el crítico.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Diez ideas', instrucciones: 'Escribe diez ideas, sin juzgarlas, para que los niños de tu barrio tengan dónde jugar. Luego marca las dos mejores.',
        guia: ['Diez ideas', 'Las dos mejores', 'Por qué'],
        ejemplo: '',
      },
    ],
  },
  'inventar-o-resolver': {
    gancho: { q: '¿Crees que la creatividad cubana para «inventar» podría ayudar a reconstruir el país?', o: ['Sí', 'En parte', 'No'] },
    entradilla: 'La diferencia entre salir del problema de hoy y cambiar las condiciones para que no vuelva, y cómo llevar el ingenio a soluciones colectivas.',
    th: 'Ya conoces la diferencia. ¿Sabrías reconocerla? Compruébalo.',
    relacionadas: ['participacion-local', 'sociedad-civil-fuerte'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Inventar o resolver?', instrucciones: 'Elige qué es cada acción.',
        opciones: ['Inventar: salir del problema hoy', 'Resolver: que no vuelva a pasar'],
        items: [
          { a: 'Arreglar otra vez el ventilador con piezas de otro', b: 'Inventar: salir del problema hoy' },
          { a: 'Crear una cooperativa que venda piezas de repuesto', b: 'Resolver: que no vuelva a pasar' },
          { a: 'Llenar tanques cuando llega el agua', b: 'Inventar: salir del problema hoy' },
          { a: 'Proponer al municipio reparar las tuberías del barrio', b: 'Resolver: que no vuelva a pasar' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'De inventar a resolver', instrucciones: 'Piensa en algo que tú o tu familia «inventan» a menudo. Escribe qué haría falta para que ese problema dejara de existir.',
        guia: ['Lo que inventas', 'Por qué pasa', 'Qué lo resolvería'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué tiene un problema bien planteado?', o: ['La solución incluida', 'Qué pasa, a quién afecta, dónde y desde cuándo', 'Solo una queja', 'Un culpable'], c: 1, e: 'Sin incluir ya la solución.' },
  { q: '¿Cuál es una regla para generar ideas?', o: ['Criticar cada idea al momento', 'Quedarse con la primera', 'Cantidad antes que calidad', 'Solo ideas posibles'], c: 2, e: 'Las buenas ideas suelen aparecer después de las obvias.' },
  { q: '¿En qué se diferencia resolver de «inventar»?', o: ['No hay diferencia', 'Resolver cambia las condiciones para que el problema no vuelva', 'Inventar es más caro', 'Resolver lo hace solo el Estado'], c: 1, e: 'Inventar sale del problema de hoy; resolver evita que vuelva.' },
];

export const fuentes = [];
