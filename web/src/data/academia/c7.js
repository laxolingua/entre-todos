// Módulo «Pensar y debatir», bloque 7: Pensamiento crítico.
// Texto propio de ENTRE TODOS. Ejemplos de la vida diaria y de comentarios típicos de redes, sin nombres reales.
export const lecciones = [
  {
    id: 'que-es-un-argumento',
    titulo: '¿Por qué gritar más alto no te da la razón?',
    bloques: [
      { p: 'En una discusión de cola, de bar o de comentarios en Facebook, a menudo gana quien grita más, quien insulta mejor o quien tiene más seguidores. Eso decide quién se queda con la última palabra, pero no quién tiene razón. Para saber quién tiene razón hacen falta argumentos.' },
      { h: 'Qué es un argumento' },
      { p: 'Un argumento es una afirmación apoyada en razones. Tiene dos partes: las <strong>premisas</strong>, que son las razones, y la <strong>conclusión</strong>, que es lo que esas razones intentan demostrar.' },
      { cita: 'Premisa: el bache de la esquina ya ha roto tres gomas este mes. Premisa: arreglarlo cuesta menos que lo que pierden los vecinos en gomas. Conclusión: hay que arreglar el bache.', fuente: 'Ejemplo de argumento' },
      { h: 'Lo que no es un argumento' },
      { lista: [
        '<strong>Una opinión sin razones:</strong> «Eso está mal y punto».',
        '<strong>Un insulto:</strong> «Tú no sabes nada, ignorante». Ataca a la persona y no dice nada sobre el tema.',
        '<strong>Una repetición:</strong> decir lo mismo más alto o más veces no añade razones.',
        '<strong>Una amenaza:</strong> «Ya verás lo que te pasa si sigues diciendo eso». Puede hacer callar a alguien, pero no demuestra nada.',
      ] },
      { h: 'Por qué importa' },
      { p: 'Una democracia funciona cuando las personas pueden discrepar sin convertirse en enemigas. Para eso hace falta separar dos cosas: la idea, que se puede criticar sin piedad, y la persona, que merece respeto aunque se equivoque. Un argumento discute la idea; un insulto ataca a la persona.' },
    ],
  },
  {
    id: 'construir-un-argumento',
    titulo: '¿Cómo convencer a alguien que no piensa como tú?',
    bloques: [
      { p: 'Convencer a quien ya está de acuerdo es fácil. El reto es convencer a quien piensa distinto, y para eso no sirve repetir tu opinión: hay que ordenar las razones para que la otra persona pueda seguirlas.' },
      { h: 'Una estructura sencilla' },
      { lista: [
        '<strong>Tesis:</strong> lo que defiendes, en una frase clara.',
        '<strong>Razones:</strong> por qué lo defiendes. Mejor dos o tres sólidas que diez débiles.',
        '<strong>Evidencia:</strong> datos, hechos o ejemplos que apoyan cada razón.',
        '<strong>Explicación:</strong> cómo la evidencia demuestra la razón. No basta con poner un dato; hay que decir qué demuestra.',
        '<strong>Conclusión:</strong> vuelve a la tesis y di qué se debería hacer.',
      ] },
      { h: 'Un ejemplo' },
      { p: '<strong>Tesis:</strong> el municipio debería publicar cada mes en qué gasta su presupuesto. <strong>Razón:</strong> los vecinos no pueden opinar sobre lo que no conocen. <strong>Evidencia:</strong> en España y en Costa Rica los ayuntamientos publican sus cuentas en internet. <strong>Explicación:</strong> cuando las cuentas son públicas, cualquiera puede ver si el dinero llegó a donde debía. <strong>Conclusión:</strong> publicar el gasto cuesta poco y permite controlar a quien gestiona el dinero de todos.' },
      { h: 'Consejos para escribirlo' },
      { lista: [
        'Una idea por párrafo.',
        'Frases cortas y palabras que todo el mundo entienda.',
        'Sin adjetivos que insulten: «la medida absurda de esos incapaces» convence menos que «la medida tiene dos problemas».',
      ] },
    ],
  },
  {
    id: 'contraargumentos',
    titulo: '¿Qué haces cuando te llevan la contraria?',
    bloques: [
      { p: 'Que alguien no esté de acuerdo contigo no es un ataque: es una oportunidad de comprobar si tu argumento resiste. Los argumentos más fuertes son los que han sobrevivido a las mejores objeciones.' },
      { h: 'Busca la mejor versión de la otra postura' },
      { p: 'Antes de responder, intenta formular la postura contraria de la forma más fuerte posible, de modo que quien la defiende diría: «Sí, eso es lo que pienso». Si respondes a una versión ridícula de lo que dijo el otro, no has respondido a nada.' },
      { h: 'Tres formas de responder' },
      { lista: [
        '<strong>Reconocer:</strong> «Tienes razón en que esto cuesta dinero».',
        '<strong>Limitar:</strong> «Pero el coste es menor que el beneficio, por estas razones».',
        '<strong>Refutar:</strong> «Ese dato no es correcto; la fuente original dice otra cosa».',
      ] },
      { h: 'Reconocer los límites de tu propia postura' },
      { p: 'Ninguna propuesta es perfecta. Decir «mi propuesta tiene este riesgo y así lo reduciría» no te debilita; te hace más creíble, porque demuestra que has pensado en las objeciones antes que los demás.' },
      { h: 'Cambiar de opinión' },
      { p: 'Si la otra persona tiene mejores razones, cambiar de opinión no es perder. Es lo que hace una persona que piensa. Quien nunca cambia de opinión no está pensando, está defendiendo un territorio.' },
    ],
  },
  {
    id: 'evidencia',
    titulo: '¿Basta con que lo diga mucha gente?',
    bloques: [
      { p: 'Que algo lo repita mucha gente no lo hace verdadero. Tampoco lo hace verdadero que lo diga alguien importante. Lo que da fuerza a una afirmación es la evidencia que la sostiene.' },
      { h: 'Tipos de evidencia, de más a menos sólida' },
      { lista: [
        '<strong>Datos y estudios</strong> hechos con un método que otros pueden comprobar.',
        '<strong>Documentos originales:</strong> una ley, un contrato, una grabación completa.',
        '<strong>Opinión de expertos</strong> en ese tema concreto, mejor si varios coinciden.',
        '<strong>Testimonios</strong> de personas que vivieron el hecho. Valiosos, pero cada uno ve una parte.',
        '<strong>Anécdotas:</strong> «a mi primo le pasó». Pueden ser ciertas, pero un caso no demuestra una regla.',
      ] },
      { h: 'Dos errores frecuentes' },
      { p: '<strong>Confundir coincidencia con causa.</strong> Que dos cosas pasen a la vez no significa que una cause la otra. Si las ventas de helado y los ahogamientos suben en verano, no es porque el helado ahogue: los dos suben porque hace calor.' },
      { p: '<strong>Elegir solo los datos que convienen.</strong> Mostrar el único mes en que algo mejoró y esconder los once en que empeoró es engañar con datos verdaderos.' },
    ],
  },
  {
    id: 'credibilidad-de-las-fuentes',
    titulo: '¿Cómo saber si una noticia es fiable?',
    bloques: [
      { p: 'Cada día llegan por WhatsApp, Facebook y Telegram cientos de noticias, capturas y audios. Algunos son ciertos, otros falsos y muchos están a medias. Antes de creer o compartir, hay cinco preguntas útiles.' },
      { h: 'Cinco preguntas sobre quien informa' },
      { lista: [
        '<strong>Reputación:</strong> ¿esta fuente ha acertado antes o tiene un historial de errores y bulos?',
        '<strong>Capacidad de saberlo:</strong> ¿estaba allí, tiene acceso a los documentos o lo cuenta de oídas?',
        '<strong>Interés:</strong> ¿gana algo si le crees? Tener interés no significa mentir, pero obliga a comprobar más.',
        '<strong>Conocimiento:</strong> ¿sabe del tema o opina de todo?',
        '<strong>Imparcialidad:</strong> ¿presenta varias versiones o solo la que le conviene?',
      ] },
      { h: 'Señales de alarma' },
      { lista: [
        'No dice quién lo escribe ni cuándo.',
        'Usa mayúsculas, signos de exclamación y frases como «compártelo antes de que lo borren».',
        'Es una captura de pantalla sin enlace al original.',
        'Ningún otro medio lo cuenta.',
      ] },
      { h: 'Dónde buscar fuentes fiables' },
      { lista: [
        '<strong>Documentos originales:</strong> la Gaceta Oficial para las leyes cubanas y los sitios oficiales de cada organismo.',
        '<strong>Datos:</strong> Naciones Unidas, el Banco Mundial, la CEPAL y la Oficina Nacional de Estadística e Información de Cuba, sabiendo quién produce cada dato.',
        '<strong>Estudios:</strong> Google Académico (scholar.google.com) busca artículos académicos, muchos gratuitos.',
        '<strong>Verificadores:</strong> servicios como AFP Factual o EFE Verifica comprueban noticias que circulan en redes.',
        '<strong>Varios medios:</strong> si medios con líneas distintas cuentan lo mismo, es más probable que sea cierto.',
      ] },
    ],
  },
  {
    id: 'como-citar',
    titulo: '¿Por qué decir de dónde sacaste algo te da más credibilidad?',
    bloques: [
      { p: 'Cuando escribes «según un estudio», nadie puede comprobarlo. Cuando escribes qué estudio, quién lo hizo y dónde se puede leer, cualquiera puede verificarlo. Citar la fuente es una forma de decir: «no me creas a mí, compruébalo tú».' },
      { h: 'Qué poner al citar' },
      { lista: [
        '<strong>Quién:</strong> el autor o la institución.',
        '<strong>Qué:</strong> el título del documento, artículo o vídeo.',
        '<strong>Dónde:</strong> el medio o la editorial y, si existe, el enlace.',
        '<strong>Cuándo:</strong> la fecha de publicación.',
      ] },
      { cita: 'Naciones Unidas, «Declaración Universal de Derechos Humanos», 1948, un.org.', fuente: 'Ejemplo de cita sencilla' },
      { h: 'Citar con las palabras exactas' },
      { p: 'Si copias las palabras de alguien, van entre comillas y con su autor. Si lo cuentas con tus palabras, no hacen falta comillas, pero sí decir de quién es la idea. Presentar como tuyas las palabras o ideas de otro se llama plagio.' },
      { h: 'En redes también' },
      { p: 'En un comentario basta con el enlace al original. Una captura sin enlace no es una fuente: es una imagen que cualquiera puede haber modificado.' },
    ],
  },
  {
    id: 'falacias',
    titulo: '¿Cómo reconocer una trampa en una discusión?',
    bloques: [
      { p: 'Una falacia es un razonamiento que parece válido pero no lo es. Muchas se usan sin mala intención; otras, para ganar una discusión sin tener razón. Reconocerlas te protege de ser manipulado y te ayuda a no usarlas.' },
      { h: 'Las más frecuentes en redes' },
      { lista: [
        '<strong>Ataque a la persona:</strong> «¿Qué va a saber ese, si se fue del país?». Se ataca a quien habla, no a lo que dice.',
        '<strong>Hombre de paja:</strong> alguien propone revisar un impuesto y le responden «¿o sea que quieres que los hospitales cierren?». Se deforma la postura para atacarla más fácil.',
        '<strong>Falso dilema:</strong> «O estás conmigo o estás contra mí». Se presentan dos opciones cuando hay más.',
        '<strong>«¿Y tú más?»:</strong> «¿Y tú hablas de corrupción, con lo que pasa en tu país?». Que otro también haga algo mal no demuestra que esto esté bien.',
        '<strong>Apelación a la autoridad:</strong> «Es verdad porque lo dijo un famoso». Una persona conocida puede equivocarse, sobre todo fuera de su especialidad.',
        '<strong>Pendiente resbaladiza:</strong> «Si permiten esto, mañana permitirán cualquier cosa». Se da por segura una cadena de consecuencias sin demostrarla.',
        '<strong>Apelación a la mayoría:</strong> «Todo el mundo lo sabe». Que mucha gente lo crea no lo hace cierto.',
      ] },
      { h: 'Qué hacer cuando la detectas' },
      { p: 'Nómbrala sin insultar y vuelve al tema: «Eso es sobre mí, no sobre lo que dije. ¿Qué piensas del argumento?». Así la discusión sigue en las ideas.' },
    ],
  },
  {
    id: 'sesgos-y-bulos',
    titulo: '¿Por qué creemos lo que queremos creer?',
    bloques: [
      { p: 'Nadie piensa de forma totalmente objetiva. El cerebro toma atajos que ahorran tiempo, pero que a veces nos engañan. Se llaman sesgos cognitivos, y conocerlos es la mejor defensa.' },
      { h: 'Tres sesgos comunes' },
      { lista: [
        '<strong>Sesgo de confirmación:</strong> buscamos, recordamos y creemos más fácilmente lo que confirma lo que ya pensábamos.',
        '<strong>Sesgo de grupo:</strong> creemos más a «los nuestros» y desconfiamos de «los otros», aunque digan lo mismo.',
        '<strong>Anclaje:</strong> el primer dato que oímos marca cómo juzgamos todo lo que viene después.',
      ] },
      { h: 'Noticias falsas' },
      { p: 'Una noticia falsa se diseña para que la compartamos sin pensar: provoca indignación o miedo, confirma lo que ya creíamos y llega de alguien de confianza. Por eso las más peligrosas son las que nos gustan.' },
      { h: 'Teorías conspirativas' },
      { p: 'Todos los gobiernos ocultan cosas, y algunas conspiraciones han sido reales y se han demostrado con documentos. Una teoría conspirativa es otra cosa: explica todo con un plan secreto, no acepta ninguna prueba en contra y convierte la falta de pruebas en prueba de que el secreto es enorme. Si nada podría demostrar que es falsa, no es una explicación: es una creencia.' },
      { h: 'Una regla práctica' },
      { p: 'Cuando una noticia te enfade mucho o te guste mucho, espera antes de compartirla y busca si otra fuente la confirma.' },
    ],
  },
  {
    id: 'ia-con-criterio',
    titulo: '¿Puedes fiarte de lo que te dice una inteligencia artificial?',
    bloques: [
      { p: 'Las inteligencias artificiales como ChatGPT, Claude o Gemini escriben con seguridad y buena redacción. Eso hace que parezcan fiables siempre. No lo son: pueden equivocarse con la misma seguridad con que aciertan.' },
      { h: 'Lo que conviene saber' },
      { lista: [
        '<strong>Pueden inventar:</strong> datos, citas, leyes o libros que no existen. A esto se le llama «alucinación».',
        '<strong>Pueden estar desactualizadas:</strong> muchas no saben lo que pasó después de cierta fecha.',
        '<strong>Reflejan sesgos</strong> de los textos con los que se entrenaron.',
        '<strong>Tienden a darte la razón</strong> si la pregunta ya sugiere la respuesta.',
      ] },
      { h: 'Cómo usarlas bien' },
      { lista: [
        'Para entender un tema, ordenar ideas o revisar la redacción de un texto.',
        'Pidiendo siempre las fuentes y comprobándolas tú.',
        'Preguntando también por la postura contraria: «¿Cuáles son los mejores argumentos en contra?».',
        'Sin dejar que piense por ti: la conclusión tiene que ser tuya.',
      ] },
      { p: 'Usada así, una IA puede ser una buena compañera para pensar. Usada sin criterio, es una fábrica de errores bien escritos.' },
    ],
  },
];

export const entradas = {
  'que-es-un-argumento': {
    gancho: { q: '¿Gana una discusión quien tiene más seguidores o quien da mejores razones?', o: ['Quien tiene más seguidores', 'Depende', 'Quien da mejores razones'] },
    entradilla: 'Qué es un argumento, qué no lo es y por qué separar la idea de la persona es la base de cualquier debate.',
    th: 'Ya sabes qué es un argumento. ¿Sabrías distinguirlo de lo que no lo es? Compruébalo.',
    relacionadas: ['educacion-civica', 'libertad-expresion'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Es un argumento?', instrucciones: 'Elige qué es cada frase.',
        opciones: ['Argumento', 'Opinión sin razones', 'Insulto'],
        items: [
          { a: 'Hay que arreglar la escuela porque el techo puede caerse y hay niños dentro.', b: 'Argumento' },
          { a: 'Esa propuesta es mala y ya está.', b: 'Opinión sin razones' },
          { a: 'Solo un ignorante puede pensar eso.', b: 'Insulto' },
          { a: 'Conviene vacunar a los perros porque la rabia se transmite a las personas.', b: 'Argumento' },
        ],
      },
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'Un argumento tiene premisas y una [conclusión]. Las premisas son las [razones]. Un insulto ataca a la [persona], no a la idea.',
        extra: ['opinión', 'mayoría', 'voz'],
      },
      {
        tipo: 'escribe', titulo: 'Tu argumento', instrucciones: 'Escribe un argumento corto sobre algo de tu barrio: dos premisas y una conclusión.',
        guia: ['Primera razón', 'Segunda razón', 'Conclusión'],
        ejemplo: 'El parque no tiene luz por la noche. Varias personas se han caído al pasar. Hay que poner farolas en el parque.',
      },
    ],
  },
  'construir-un-argumento': {
    gancho: { q: '¿Qué convence más: repetir tu opinión con fuerza o explicar tus razones con calma?', o: ['Repetirla con fuerza', 'Depende de la persona', 'Explicar las razones'] },
    entradilla: 'Tesis, razones, evidencia, explicación y conclusión: una estructura para ordenar lo que piensas y que otros puedan seguirte.',
    th: 'Ya conoces la estructura. ¿Sabrías reconocer cada parte? Compruébalo.',
    relacionadas: ['transparencia', 'participacion-local'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué parte es?', instrucciones: 'Elige qué parte del argumento es cada frase.',
        opciones: ['Tesis', 'Razón', 'Evidencia', 'Conclusión'],
        items: [
          { a: 'El municipio debería publicar sus cuentas.', b: 'Tesis' },
          { a: 'Los vecinos no pueden opinar sobre lo que no conocen.', b: 'Razón' },
          { a: 'En Costa Rica los ayuntamientos publican sus cuentas en internet.', b: 'Evidencia' },
          { a: 'Publicar el gasto cuesta poco y permite controlar el dinero de todos.', b: 'Conclusión' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Escribe tu argumento', instrucciones: 'Elige un problema de tu comunidad y escribe un párrafo con la estructura: tesis, razón, evidencia, explicación y conclusión.',
        guia: ['Tesis', 'Razón y evidencia', 'Conclusión'],
        ejemplo: '',
      },
    ],
  },
  contraargumentos: {
    gancho: { q: 'Si alguien te demuestra que te equivocas, ¿cambias de opinión?', o: ['Casi nunca', 'A veces', 'Sí'] },
    entradilla: 'Cómo responder a quien te lleva la contraria: buscar la mejor versión de su postura, reconocer, limitar o refutar.',
    th: 'Ya sabes cómo responder a una objeción. ¿Sabrías reconocer cada tipo de respuesta? Compruébalo.',
    relacionadas: ['dialogo-nacional', 'reconciliacion'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué tipo de respuesta es?', instrucciones: 'Elige qué hace cada respuesta.',
        opciones: ['Reconocer', 'Limitar', 'Refutar'],
        items: [
          { a: 'Es verdad que la medida tiene un coste.', b: 'Reconocer' },
          { a: 'Pero el coste dura un año y el beneficio, muchos.', b: 'Limitar' },
          { a: 'Ese dato es falso: el informe original dice lo contrario.', b: 'Refutar' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Reconocer un punto débil de tu propuesta te hace menos creíble.', v: false, e: 'Muestra que has pensado en las objeciones.' },
          { t: 'Responder a una versión ridícula de lo que dijo el otro no responde a su argumento.', v: true, e: 'Hay que responder a la mejor versión de su postura.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'La otra postura', instrucciones: 'Elige un tema en el que tengas una opinión firme. Escribe el mejor argumento que daría alguien que piensa lo contrario.',
        guia: ['El tema', 'La postura contraria', 'Su mejor razón'],
        ejemplo: '',
      },
    ],
  },
  evidencia: {
    gancho: { q: 'Si algo lo comparte mucha gente, ¿es probable que sea cierto?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Qué cuenta como prueba, cuánto vale cada tipo de evidencia y dos errores que engañan con datos verdaderos.',
    th: 'Ya conoces los tipos de evidencia. ¿Sabrías ordenarlos? Compruébalo.',
    relacionadas: ['transparencia', 'informacion-ambiental-abierta'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué tipo de evidencia es?', instrucciones: 'Elige qué tipo de evidencia es cada caso.',
        opciones: ['Dato o estudio', 'Documento original', 'Testimonio', 'Anécdota'],
        items: [
          { a: 'Una encuesta a 2.000 personas con su método publicado', b: 'Dato o estudio' },
          { a: 'El texto completo de una ley en la Gaceta Oficial', b: 'Documento original' },
          { a: 'Una vecina que vio el accidente', b: 'Testimonio' },
          { a: 'A un amigo mío le funcionó', b: 'Anécdota' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Si dos cosas suben a la vez, una causa la otra.', v: false, e: 'Pueden tener una causa común o coincidir por azar.' },
          { t: 'Se puede engañar usando solo datos verdaderos.', v: true, e: 'Eligiendo solo los que convienen y escondiendo el resto.' },
        ],
      },
    ],
  },
  'credibilidad-de-las-fuentes': {
    gancho: { q: '¿Compartes una noticia antes de comprobarla?', o: ['A menudo', 'A veces', 'Nunca'] },
    entradilla: 'Cinco preguntas para juzgar a quien informa, señales de alarma y dónde buscar fuentes fiables.',
    th: 'Ya tienes las cinco preguntas. ¿Sabrías aplicarlas? Compruébalo.',
    relacionadas: ['acceso-informacion-internet', 'libertad-expresion'],
    actividades: [
      {
        tipo: 'vf', titulo: '¿Señal de alarma?', instrucciones: 'Marca verdadero si es una señal de alarma.',
        items: [
          { t: 'El mensaje dice «compártelo antes de que lo borren».', v: true, e: 'Busca que compartas sin pensar.' },
          { t: 'La noticia tiene autor, fecha y enlace al documento original.', v: false, e: 'Son señales de una fuente que se puede comprobar.' },
          { t: 'Es una captura de pantalla sin enlace.', v: true, e: 'Cualquiera puede modificar una imagen.' },
          { t: 'Varios medios con líneas distintas cuentan lo mismo.', v: false, e: 'Hace más probable que sea cierto.' },
        ],
      },
      {
        tipo: 'relaciona', titulo: '¿Qué pregunta aplica?', instrucciones: 'Elige qué pregunta sobre la fuente pone en duda cada caso.',
        opciones: ['Capacidad de saberlo', 'Interés', 'Conocimiento'],
        items: [
          { a: 'Un vendedor dice que su producto es el mejor del mercado', b: 'Interés' },
          { a: 'Alguien cuenta lo que pasó en una reunión a la que no fue', b: 'Capacidad de saberlo' },
          { a: 'Un cantante opina sobre una vacuna', b: 'Conocimiento' },
        ],
      },
    ],
  },
  'como-citar': {
    gancho: { q: '¿Te fías más de un texto que dice de dónde saca sus datos?', o: ['Sí', 'Me da igual', 'No'] },
    entradilla: 'Quién, qué, dónde y cuándo: cómo citar una fuente de forma sencilla y por qué hacerlo te da credibilidad.',
    th: 'Ya sabes qué poner al citar. ¿Sabrías hacerlo? Compruébalo.',
    relacionadas: ['educacion-civica'],
    actividades: [
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'Una cita dice quién, qué, dónde y [cuándo]. Las palabras exactas de otra persona van entre [comillas]. Presentar como propias las ideas de otro se llama [plagio].',
        extra: ['cuánto', 'mayúsculas', 'resumen'],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Una captura de pantalla sin enlace es una buena fuente.', v: false, e: 'Hay que enlazar el original.' },
          { t: 'Si cuentas una idea con tus palabras, también debes decir de quién es.', v: true, e: 'No hacen falta comillas, pero sí el autor.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Cita una fuente', instrucciones: 'Elige un artículo o documento que hayas leído y escribe su cita con quién, qué, dónde y cuándo.',
        guia: ['Quién', 'Qué y dónde', 'Cuándo'],
        ejemplo: 'Naciones Unidas, «Declaración Universal de Derechos Humanos», 1948, un.org.',
      },
    ],
  },
  falacias: {
    gancho: { q: '¿Has ganado alguna discusión sin tener razón?', o: ['Sí', 'Quizás', 'No'] },
    entradilla: 'Siete trampas frecuentes en las discusiones de redes, con ejemplos, y cómo responder sin insultar.',
    th: 'Ya conoces siete falacias. ¿Sabrías reconocerlas en un comentario? Compruébalo.',
    relacionadas: ['libertad-expresion', 'dialogo-nacional'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué falacia es?', instrucciones: 'Elige la falacia de cada comentario.',
        opciones: ['Ataque a la persona', 'Hombre de paja', 'Falso dilema', '¿Y tú más?', 'Pendiente resbaladiza', 'Apelación a la mayoría'],
        items: [
          { a: '¿Qué vas a saber tú de economía, si nunca has tenido un negocio?', b: 'Ataque a la persona' },
          { a: 'Quieres más transporte público, o sea, que prohíban los carros.', b: 'Hombre de paja' },
          { a: 'O apoyas esta medida o quieres que el país se hunda.', b: 'Falso dilema' },
          { a: '¿Y tú me hablas de mentiras, con lo que dijiste el año pasado?', b: '¿Y tú más?' },
          { a: 'Si dejamos que abran un negocio, mañana venderán el país entero.', b: 'Pendiente resbaladiza' },
          { a: 'Todo el mundo sabe que eso es así.', b: 'Apelación a la mayoría' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Responde sin insultar', instrucciones: 'Te escriben: «Tú no tienes derecho a opinar porque vives fuera». Escribe una respuesta que nombre la falacia y vuelva al tema.',
        guia: ['Nombra la falacia', 'Vuelve al tema', 'Sin insultar'],
        ejemplo: '',
      },
    ],
  },
  'sesgos-y-bulos': {
    gancho: { q: '¿Crees que tú caes en noticias falsas?', o: ['Nunca', 'Alguna vez', 'Seguramente sí'] },
    entradilla: 'Tres sesgos que todos tenemos, cómo funcionan las noticias falsas y qué distingue una teoría conspirativa de una conspiración demostrada.',
    th: 'Ya conoces los sesgos. ¿Sabrías reconocerlos? Compruébalo.',
    relacionadas: ['acceso-informacion-internet'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué sesgo es?', instrucciones: 'Elige el sesgo de cada caso.',
        opciones: ['Sesgo de confirmación', 'Sesgo de grupo', 'Anclaje'],
        items: [
          { a: 'Solo leo los medios que dicen lo que ya pienso.', b: 'Sesgo de confirmación' },
          { a: 'Si lo dice alguien de mi grupo, me lo creo; si lo dice el otro, no.', b: 'Sesgo de grupo' },
          { a: 'Como el primer precio que vi fue de 100, 70 me parece barato.', b: 'Anclaje' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Las noticias falsas más peligrosas son las que confirman lo que ya creemos.', v: true, e: 'Las compartimos sin comprobar.' },
          { t: 'Ninguna conspiración ha sido real nunca.', v: false, e: 'Algunas se han demostrado con documentos. La diferencia está en las pruebas.' },
          { t: 'Una teoría que nada podría demostrar falsa es una buena explicación.', v: false, e: 'Si nada puede refutarla, es una creencia.' },
        ],
      },
    ],
  },
  'ia-con-criterio': {
    gancho: { q: '¿Te fías de lo que te responde una inteligencia artificial?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Qué puede hacer mal una IA, cómo comprobar lo que dice y cómo usarla para pensar mejor sin que piense por ti.',
    th: 'Ya sabes qué riesgos tiene. ¿Sabrías usarla bien? Compruébalo.',
    relacionadas: ['gobierno-digital', 'ia-asesora-no-decide'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Una IA puede inventar una ley que no existe.', v: true, e: 'Se llama alucinación.' },
          { t: 'Si una IA escribe con seguridad, lo que dice es correcto.', v: false, e: 'Puede equivocarse con la misma seguridad.' },
          { t: 'Pedir a la IA los mejores argumentos en contra ayuda a pensar mejor.', v: true, e: 'Te muestra lo que quizá no habías considerado.' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Pruébalo', instrucciones: 'Pregunta a una IA un dato concreto sobre tu municipio o tu país y pídele la fuente. Escribe si la fuente existía y si decía lo mismo.',
        guia: ['Qué preguntaste', 'Qué fuente dio', 'Si era correcta'],
        ejemplo: '',
      },
    ],
  },
};

export const preguntas = [
  { q: '¿Qué dos partes tiene un argumento?', o: ['Opinión y voto', 'Premisas y conclusión', 'Insulto y respuesta', 'Pregunta y respuesta'], c: 1, e: 'Las premisas son las razones; la conclusión, lo que demuestran.' },
  { q: '¿Qué es un hombre de paja?', o: ['Atacar a la persona', 'Deformar la postura del otro para atacarla más fácil', 'Presentar solo dos opciones', 'Apelar a la mayoría'], c: 1, e: 'Se responde a una versión que el otro no defendió.' },
  { q: '¿Qué tipo de evidencia es, en general, la menos sólida?', o: ['Un estudio con método publicado', 'Un documento original', 'Una anécdota', 'La opinión coincidente de varios expertos'], c: 2, e: 'Un caso no demuestra una regla.' },
  { q: 'Las ventas de helado y los ahogamientos suben a la vez en verano. ¿Qué demuestra?', o: ['Que el helado causa ahogamientos', 'Que coinciden por una causa común: el calor', 'Que los ahogamientos causan ventas', 'Nada se puede saber'], c: 1, e: 'Coincidencia no es causa.' },
  { q: '¿Qué es el sesgo de confirmación?', o: ['Creer más lo que confirma lo que ya pensábamos', 'Confiar en el primer dato', 'Confiar solo en expertos', 'Desconfiar de todo'], c: 0, e: 'Por eso las noticias falsas que nos gustan son las más peligrosas.' },
  { q: '¿Qué debe tener una cita sencilla?', o: ['Solo el enlace', 'Quién, qué, dónde y cuándo', 'Solo el autor', 'Una captura de pantalla'], c: 1, e: 'Así cualquiera puede comprobarla.' },
  { q: '¿Qué es una «alucinación» de una inteligencia artificial?', o: ['Un error de conexión', 'Cuando inventa datos, citas o fuentes que no existen', 'Cuando se niega a responder', 'Una imagen generada'], c: 1, e: 'Por eso hay que comprobar sus fuentes.' },
];

export const fuentes = [
  { t: 'Google Académico', url: 'https://scholar.google.com/' },
  { t: 'AFP Factual', url: 'https://factual.afp.com/' },
  { t: 'EFE Verifica', url: 'https://verifica.efe.com/' },
  { t: 'Gaceta Oficial de la República de Cuba', url: 'https://www.gacetaoficial.gob.cu/' },
  { t: 'CEPALSTAT, datos de América Latina y el Caribe', url: 'https://statistics.cepal.org/' },
];
