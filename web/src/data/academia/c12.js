// Módulo «Pensar y debatir», bloque 12: Pensamiento solucionario.
// Basado en el Marco Solucionario del Instituto para la Educación Humana (Institute for Humane Education). Texto propio de ENTRE TODOS.
export const lecciones = [
  {
    id: 'que-es-ser-solucionario',
    titulo: '¿Qué hace falta para resolver un problema y no solo quejarse de él?',
    bloques: [
      { p: 'Ante un problema hay tres reacciones frecuentes: quejarse, buscar un culpable o acostumbrarse. Las tres son comprensibles y ninguna lo resuelve. Hay una cuarta: investigarlo y buscar una solución que funcione para todos.' },
      { h: 'Ser solucionario' },
      { p: 'El Instituto para la Educación Humana llama «solucionarias» a las personas que buscan soluciones a los problemas de su comunidad y del mundo con dos condiciones: que ataquen las causas de fondo y que hagan el mayor bien y el menor daño a las personas, los animales y el medio ambiente.' },
      { h: 'Cómo saber si una solución es solucionaria' },
      { lista: [
        '<strong>¿Ataca las causas de fondo,</strong> de modo que el problema no vuelva?',
        '<strong>¿Hace el mayor bien y el menor daño</strong> a todos los afectados, también a los que no tienen voz?',
        '<strong>¿Evita consecuencias negativas</strong> que nadie buscaba?',
        '<strong>¿Se puede llevar a cabo</strong> con los recursos que existen?',
      ] },
      { h: 'Gobernanza Solucionaria' },
      { p: 'La Gobernanza Solucionaria, la metodología de ENTRE TODOS, aplica la misma idea a la política: buscar para cada asunto la mejor solución, venga de quien venga, en lugar de aceptar paquetes cerrados de partido.' },
    ],
  },
  {
    id: 'marco-solucionario',
    titulo: '¿Cómo se pasa de una queja a una solución?',
    bloques: [
      { p: 'El Marco Solucionario del Instituto para la Educación Humana propone cuatro fases y doce pasos. Aquí van con un ejemplo de barrio: la basura que se acumula en una esquina.' },
      { h: 'I. Identificar' },
      { lista: [
        'Elige un tema que te importe: la limpieza del barrio.',
        'Identifica un problema concreto: la basura se acumula tres días por semana en la esquina y atrae ratas.',
        'Escribe el enunciado del problema y las preguntas que guiarán la investigación: ¿por qué no se recoge?, ¿quién tira la basura allí?, ¿a quién afecta?',
      ] },
      { h: 'II. Investigar' },
      { lista: [
        'Aprende más con datos y escuchando a todas las partes: vecinos, recogedores, la dirección de servicios comunales.',
        'Determina efectos y causas, con el modelo del iceberg: el camión pasa poco porque falta combustible; los vecinos tiran allí porque no hay contenedores.',
        'Averigua qué han hecho otros: otros barrios, otros países.',
      ] },
      { h: 'III. Innovar' },
      { lista: [
        'Busca los puntos donde actuar tiene más efecto y genera muchas ideas.',
        'Elige la solución que ataque las causas, haga el mayor bien y el menor daño a personas, animales y medio ambiente, y se pueda hacer.',
        'Haz un plan de acción: qué, quién, cuándo y con qué.',
      ] },
      { h: 'IV. Aplicar' },
      { lista: [
        'Pon en marcha la solución.',
        'Compártela con otros: vecinos, el municipio o el banco de propuestas de ENTRE TODOS.',
        'Evalúa, reflexiona y celebra lo logrado.',
      ] },
    ],
  },
  {
    id: 'de-la-solucion-a-la-propuesta',
    titulo: '¿Cómo convertir tu solución en una propuesta?',
    bloques: [
      { p: 'No todas las soluciones son iguales. El Instituto para la Educación Humana distingue cinco tipos de acción, y muchas soluciones combinan varias.' },
      { lista: [
        '<strong>Acción inmediata:</strong> resolver lo urgente, como una jornada de limpieza.',
        '<strong>Colaborar con quien ya trabaja en el problema:</strong> unirse a un grupo o una organización existente.',
        '<strong>Campaña educativa:</strong> informar y explicar qué puede hacer cada persona.',
        '<strong>Petición o cambio de política:</strong> pedir a quien decide que cambie una regla o un presupuesto.',
        '<strong>Invención o intervención:</strong> crear algo nuevo, un aparato, un servicio o una forma de organizarse.',
      ] },
      { h: 'Escribir una propuesta' },
      { p: 'Una propuesta para el banco de ENTRE TODOS tiene cuatro partes:' },
      { lista: [
        '<strong>El problema</strong>, bien planteado: qué pasa, a quién afecta y por qué.',
        '<strong>La propuesta</strong>, en una o dos frases claras.',
        '<strong>Por qué funcionaría</strong>, con evidencia y, si existe, un ejemplo de otro lugar.',
        '<strong>Su impacto</strong> en personas, animales y medio ambiente, incluidos los posibles efectos negativos.',
      ] },
      { p: 'Con este bloque terminas el módulo «Pensar y debatir». Ahora puedes aplicar todo lo aprendido, solo o en grupo, con el <a href="/generador-de-soluciones/">Generador de soluciones</a>: del problema a la propuesta, paso a paso.' },
    ],
  },
];

export const entradas = {
  'que-es-ser-solucionario': {
    gancho: { q: 'Ante un problema de tu barrio, ¿qué haces más a menudo?', o: ['Quejarme', 'Acostumbrarme', 'Buscar una solución'] },
    entradilla: 'Qué es una persona solucionaria, cuatro preguntas para saber si una solución lo es y cómo se relaciona con la Gobernanza Solucionaria.',
    th: 'Ya conoces las cuatro preguntas. Compruébalo.',
    relacionadas: ['participacion-ciudadana', 'participacion-local'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué reacción es?', instrucciones: 'Elige qué reacción muestra cada frase.',
        opciones: ['Quejarse', 'Buscar un culpable', 'Acostumbrarse', 'Buscar una solución'],
        items: [
          { a: 'Esto es un desastre, como siempre.', b: 'Quejarse' },
          { a: 'La culpa es de los vecinos del lado.', b: 'Buscar un culpable' },
          { a: 'Total, aquí nunca cambia nada.', b: 'Acostumbrarse' },
          { a: '¿Por qué pasa y qué podríamos hacer?', b: 'Buscar una solución' },
        ],
      },
    ],
  },
  'marco-solucionario': {
    gancho: { q: '¿Crees que tu barrio podría resolver alguno de sus problemas sin esperar al gobierno?', o: ['Sí', 'Algunos', 'No'] },
    entradilla: 'Las cuatro fases y los doce pasos del Marco Solucionario, con un ejemplo de barrio.',
    th: 'Ya conoces las cuatro fases. ¿Sabrías ordenarlas? Compruébalo.',
    relacionadas: ['autonomia-municipal', 'participacion-local'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué fase es?', instrucciones: 'Elige a qué fase pertenece cada paso.',
        opciones: ['Identificar', 'Investigar', 'Innovar', 'Aplicar'],
        items: [
          { a: 'Escribir el enunciado del problema', b: 'Identificar' },
          { a: 'Hablar con todas las partes afectadas', b: 'Investigar' },
          { a: 'Elegir la solución que haga más bien y menos daño', b: 'Innovar' },
          { a: 'Compartir la solución con otros', b: 'Aplicar' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu problema', instrucciones: 'Elige un problema de tu barrio y escribe la fase I: el tema, el problema concreto y tres preguntas para investigarlo.',
        guia: ['Tema', 'Problema concreto', 'Tres preguntas'],
        ejemplo: '',
      },
    ],
  },
  'de-la-solucion-a-la-propuesta': {
    gancho: { q: '¿Te animarías a escribir una propuesta para Cuba?', o: ['Sí', 'Quizás', 'No'] },
    entradilla: 'Los cinco tipos de acción y cómo escribir una propuesta para el banco de ENTRE TODOS.',
    th: 'Ahora te toca escribir tu propia propuesta.',
    relacionadas: ['participacion-ciudadana', 'sociedad-civil-fuerte'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué tipo de acción es?', instrucciones: 'Elige el tipo de acción de cada caso.',
        opciones: ['Acción inmediata', 'Campaña educativa', 'Petición o cambio de política', 'Invención o intervención'],
        items: [
          { a: 'Una jornada de limpieza el sábado', b: 'Acción inmediata' },
          { a: 'Carteles que explican dónde y cuándo sacar la basura', b: 'Campaña educativa' },
          { a: 'Pedir al municipio un contenedor para la esquina', b: 'Petición o cambio de política' },
          { a: 'Una compostera comunitaria para los restos de comida', b: 'Invención o intervención' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Tu propuesta', instrucciones: 'Escribe una propuesta con sus cuatro partes: problema, propuesta, por qué funcionaría y su impacto en personas, animales y medio ambiente.',
        guia: ['Problema', 'Propuesta y por qué funcionaría', 'Impacto'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué dos condiciones pide el Marco Solucionario a una solución?', o: ['Que sea rápida y barata', 'Que ataque las causas de fondo y haga el mayor bien y el menor daño', 'Que la apruebe el gobierno', 'Que sea nueva'], c: 1, e: 'Y además, que se pueda llevar a cabo.' },
  { q: '¿Cuáles son las cuatro fases del Marco Solucionario?', o: ['Leer, escribir, votar, publicar', 'Identificar, investigar, innovar, aplicar', 'Quejarse, culpar, aceptar, cambiar', 'Proponer, debatir, votar, ejecutar'], c: 1, e: 'Con doce pasos en total.' },
  { q: 'Pedir al municipio que cambie una regla es…', o: ['Acción inmediata', 'Campaña educativa', 'Petición o cambio de política', 'Invención'], c: 2, e: 'Uno de los cinco tipos de acción.' },
];

export const fuentes = [
  { t: 'Instituto para la Educación Humana, Marco Solucionario (Solutionary Framework)', url: 'https://humaneeducation.org/' },
];
