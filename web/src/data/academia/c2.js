// Bloque 2: Libertad de expresión y de prensa (lecciones 2.2 a 2.4).
export const lecciones = [
  {
    id: 'limites-distintos',
    titulo: 'Estados Unidos, Alemania, España y Costa Rica: límites distintos',
    minutos: 7,
    bloques: [
      { p: 'Las cuatro democracias protegen la libertad de expresión. Ninguna la trata como absoluta y cada una pone el límite en un lugar distinto. Esta lección describe esos límites sin ordenarlos de mejor a peor.' },
      { h: 'Estados Unidos: el límite más estrecho' },
      { p: 'Desde el caso Brandenburg contra Ohio (1969), un discurso solo puede castigarse si busca incitar a una violencia inminente y es probable que la provoque. En New York Times contra Sullivan (1964), la Corte Suprema decidió que un funcionario público solo gana una demanda por difamación si prueba que el medio publicó algo falso sabiendo que lo era o sin importarle si lo era.' },
      { p: 'En 1971, en el caso de los Papeles del Pentágono, la Corte Suprema permitió a The New York Times y The Washington Post publicar documentos secretos sobre la guerra de Vietnam. El Gobierno no logró justificar que se prohibiera publicarlos de antemano.' },
      { h: 'Alemania: la dignidad como límite' },
      { cita: 'Toda persona tiene el derecho a expresar y difundir libremente su opinión oralmente, por escrito y a través de la imagen [...]. La libertad de prensa y la libertad de información por radio, televisión y cinematografía serán garantizadas. La censura está prohibida.', fuente: 'Ley Fundamental de Alemania, artículo 5.1 (fragmento)' },
      { p: 'El mismo artículo permite límites fijados por leyes generales y por la protección de la juventud y del honor personal. El Código Penal castiga la incitación al odio contra grupos de población y la negación del Holocausto. Es una respuesta a la experiencia de la dictadura nazi.' },
      { h: 'España: ni censura previa ni secuestro sin juez' },
      { p: 'El artículo 20 de la Constitución de 1978 protege la libertad de expresión y el derecho a comunicar y recibir información veraz. Prohíbe la censura previa y dice que solo un juez puede ordenar el secuestro de una publicación. El límite está en el respeto a los demás derechos, en especial al honor, la intimidad, la propia imagen y la protección de la juventud y de la infancia.' },
      { h: 'Costa Rica: publicar sin censura y responder por los abusos' },
      { cita: 'Todos pueden comunicar sus pensamientos de palabra o por escrito, y publicarlos sin previa censura; pero serán responsables de los abusos que cometan en el ejercicio de este derecho, en los casos y del modo que la ley establezca.', fuente: 'Constitución de Costa Rica (1949), artículo 29' },
      { p: 'En 2004, la Corte Interamericana de Derechos Humanos condenó a Costa Rica en el caso Herrera Ulloa. Un periodista había sido condenado penalmente por reproducir informaciones de la prensa europea sobre un diplomático. La Corte consideró que esa condena violaba la libertad de expresión, y Costa Rica tuvo que anularla.' },
      { h: 'Lo que comparten' },
      { p: 'En los cuatro países el límite lo fija una ley conocida de antemano, lo aplica un juez independiente y se aplica después de hablar o publicar, nunca antes. Un ciudadano que no está de acuerdo con una condena puede recurrirla, y en Costa Rica, como en los demás países que aceptan la Corte Interamericana, puede llegar hasta un tribunal internacional.' },
    ],
    tabla: {
      titulo: 'Dónde pone cada país el límite',
      columnas: ['País', 'Censura previa', 'Límite principal', 'Quién decide'],
      filas: [
        ['Estados Unidos', 'Prohibida salvo casos extremos', 'Incitación a una violencia inminente; difamación con falsedad consciente', 'Tribunales'],
        ['Alemania', 'Prohibida (art. 5.1)', 'Leyes generales, honor, juventud; incitación al odio y negación del Holocausto', 'Tribunales y Tribunal Constitucional Federal'],
        ['España', 'Prohibida (art. 20.2)', 'Honor, intimidad, propia imagen, protección de la infancia', 'Tribunales y Tribunal Constitucional'],
        ['Costa Rica', 'Prohibida (art. 29)', 'Responsabilidad posterior según la ley', 'Tribunales, Sala Constitucional y Corte Interamericana'],
      ],
    },
  },
  {
    id: 'prensa-independiente',
    titulo: 'Prensa independiente: propiedad, licencias y acceso a la información',
    minutos: 6,
    bloques: [
      { p: 'Para que haya prensa libre no basta con poder hablar. Hacen falta tres condiciones: que cualquiera pueda fundar un medio, que nadie necesite permiso del gobierno para ejercer el periodismo y que la información pública esté al alcance de quien la pida.' },
      { h: 'Quién puede ser dueño de un medio' },
      { p: 'En Estados Unidos, Alemania, España y Costa Rica cualquier persona u organización puede fundar un periódico, una revista o un medio digital sin autorización. Conviven medios privados, públicos y sin ánimo de lucro. Los medios públicos, como la ZDF alemana o RTVE en España, se rigen por consejos y leyes pensados para que no dependan del gobierno de turno.' },
      { p: 'La radio y la televisión por el espectro sí necesitan licencia, porque las frecuencias son limitadas. Esa licencia regula el uso de la frecuencia. No autoriza ni revisa los contenidos.' },
      { h: 'Ejercer el periodismo sin carné' },
      { p: 'En 1985, a petición de Costa Rica, la Corte Interamericana de Derechos Humanos emitió la Opinión Consultiva OC-5/85. Concluyó que obligar a los periodistas a pertenecer a un colegio profesional para poder ejercer es contrario a la Convención Americana. El periodismo es una forma de ejercer la libertad de expresión, y esa libertad no puede reservarse a quien tiene un carné.' },
      { h: 'El derecho a saber' },
      { p: 'Estados Unidos aprobó en 1966 la Ley de Libertad de Información (FOIA), que permite a cualquier persona pedir documentos a las agencias federales. Alemania tiene desde 2005 una ley federal de libertad de información. España aprobó en 2013 la Ley de transparencia, acceso a la información pública y buen gobierno. En Costa Rica, el artículo 30 de la Constitución garantiza el libre acceso a los departamentos administrativos para informarse sobre asuntos de interés público.' },
      { h: 'Qué dice la ley en Cuba' },
      { p: 'El artículo 55 de la Constitución de 2019 establece que los medios fundamentales de comunicación son de propiedad socialista de todo el pueblo o de las organizaciones políticas, sociales y de masas. La Ley de Comunicación Social, de 2023, regula los medios y la comunicación institucional dentro de ese marco. Los medios independientes cubanos, como 14ymedio o elTOQUE, trabajan sin reconocimiento legal en el país.' },
    ],
  },
  {
    id: 'internet-y-expresion',
    titulo: 'Internet y expresión: el caso cubano y las leyes que lo regulan',
    minutos: 7,
    bloques: [
      { p: 'En 2012 el Consejo de Derechos Humanos de la ONU afirmó que los derechos de las personas también deben protegerse en internet, en particular la libertad de expresión. Lo que vale para un periódico impreso vale para un blog, una red social o un mensaje.' },
      { h: 'Cómo lo regulan otras democracias' },
      { p: 'En Estados Unidos, la sección 230 de la Ley de Decencia en las Comunicaciones (1996) establece que una plataforma no responde por lo que publican sus usuarios. En la Unión Europea, la Ley de Servicios Digitales obliga a las grandes plataformas a retirar contenidos ilegales cuando se les notifican, a explicar sus decisiones y a permitir que el usuario las recurra. Alemania tuvo antes su propia ley, de 2017, con plazos para retirar contenidos manifiestamente ilegales.' },
      { p: 'En todos esos casos lo que se retira es un contenido que una ley ya define como ilegal, y el usuario puede acudir a un juez. Ningún gobierno de esos países puede cortar internet a una región para impedir que la gente se comunique.' },
      { h: 'Las normas cubanas' },
      { p: 'Desde 2019 varias normas regulan lo que se publica en internet en Cuba:' },
      { lista: [
        'El Decreto-Ley 370 de 2019, sobre la informatización de la sociedad, multa la difusión por redes públicas de información contraria al interés social, la moral, las buenas costumbres y la integridad de las personas.',
        'El Decreto-Ley 35 de 2021, de telecomunicaciones, y su reglamento sobre incidentes de ciberseguridad incluyen entre esos incidentes la difusión de noticias falsas y de mensajes que inciten a alterar el orden público.',
        'La Ley de Comunicación Social de 2023 regula también la comunicación en redes y plataformas digitales.',
      ] },
      { p: 'Durante las protestas del 11 de julio de 2021, organizaciones que miden la conectividad, como NetBlocks, registraron restricciones al acceso a redes sociales y servicios de mensajería en la isla.' },
      { h: 'La pregunta de fondo' },
      { p: 'Las cuatro democracias de este bloque castigan la difamación o la incitación a la violencia también en internet. La diferencia está en tres preguntas: quién decide qué es ilegal, si lo decide antes o después de publicar y si la persona puede recurrir ante un juez independiente. Con esas tres preguntas se puede examinar cualquier ley sobre internet, también una futura ley cubana.' },
    ],
  },
];

export const fuentes = [
  { t: 'Ley Fundamental de Alemania (Bundestag, en español)', url: 'https://www.btg-bestellservice.de/pdf/80206000.pdf' },
  { t: 'Constitución Española de 1978 (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-1978-31229' },
  { t: 'Constitución Política de Costa Rica (SCIJ)', url: 'http://www.pgrweb.go.cr/scij/' },
  { t: 'Corte IDH, caso Herrera Ulloa contra Costa Rica (2004)', url: 'https://www.corteidh.or.cr/docs/casos/articulos/seriec_107_esp.pdf' },
  { t: 'Corte IDH, Opinión Consultiva OC-5/85', url: 'https://www.corteidh.or.cr/docs/opiniones/seriea_05_esp.pdf' },
  { t: 'Ley 19/2013 de transparencia (BOE)', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2013-12887' },
  { t: 'Consejo de Derechos Humanos de la ONU, resolución 20/8 (2012)', url: 'https://undocs.org/es/A/HRC/RES/20/8' },
  { t: 'Gaceta Oficial de la República de Cuba', url: 'https://www.gacetaoficial.gob.cu/' },
];

export const entradas = {
  'limites-distintos': {
    gancho: { q: '¿Debería ser delito negar un genocidio?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Cuatro democracias protegen la libertad de expresión y cada una pone el límite en un lugar distinto. Lo que comparten es quién lo decide y cuándo.',
    th: 'Has visto cuatro maneras de poner el límite. ¿Recuerdas cuál es la de cada país y qué tienen en común? Compruébalo.',
    relacionadas: ['libertad-expresion', 'despenalizacion-disenso', 'tribunal-constitucional'],
    actividades: [
      {
        tipo: 'relaciona', titulo: '¿Qué país es?', instrucciones: 'Elige a qué país corresponde cada rasgo.',
        opciones: ['Estados Unidos', 'Alemania', 'España', 'Costa Rica'],
        items: [
          { a: 'Solo se castiga el discurso que incita a una violencia inminente', b: 'Estados Unidos' },
          { a: 'Castiga la negación del Holocausto', b: 'Alemania' },
          { a: 'Solo un juez puede ordenar el secuestro de una publicación', b: 'España' },
          { a: 'La Corte Interamericana anuló la condena de un periodista', b: 'Costa Rica' },
        ],
      },
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'En Estados Unidos un funcionario puede ganar una demanda por difamación solo con probar que la información era falsa.', v: false, e: 'Desde 1964 tiene que probar además que el medio sabía que era falsa o no le importó comprobarlo.' },
          { t: 'La Ley Fundamental alemana prohíbe la censura.', v: true, e: 'El artículo 5.1 termina con la frase «La censura está prohibida».' },
          { t: 'En las cuatro democracias el límite se aplica antes de publicar.', v: false, e: 'Se aplica después, por un juez y según una ley conocida de antemano.' },
        ],
      },
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'En 1971 la Corte Suprema permitió publicar los Papeles del [Pentágono]. La Constitución de Costa Rica permite publicar sin previa [censura]. En España se protege el derecho a comunicar información [veraz].',
        extra: ['Senado', 'licencia', 'oficial'],
      },
      {
        tipo: 'escribe', titulo: 'Tu opinión', instrucciones: 'En dos o tres frases: ¿dónde pondrías tú el límite de la libertad de expresión en Cuba? ¿Por qué?',
        guia: ['Qué no se podría decir o publicar', 'Quién lo decidiría', 'Cuándo: antes o después de publicar'],
        ejemplo: 'Pondría el límite en la incitación directa a la violencia y en la difamación probada. Lo decidiría un juez independiente, siempre después de publicar. Nadie necesitaría permiso para hablar.',
      },
    ],
  },
  'prensa-independiente': {
    gancho: { q: '¿Debería un periodista necesitar un carné oficial para trabajar?', o: ['Sí', 'Depende', 'No'] },
    entradilla: 'Fundar un medio sin permiso, ejercer el periodismo sin carné y pedir información pública: las tres condiciones de una prensa independiente.',
    th: 'Ya conoces las tres condiciones. ¿Sabrías reconocerlas en casos concretos? Compruébalo.',
    relacionadas: ['libertad-expresion', 'transparencia', 'acceso-informacion-internet'],
    actividades: [
      {
        tipo: 'vf', titulo: 'Verdadero o falso', instrucciones: 'Marca si cada afirmación es verdadera o falsa.',
        items: [
          { t: 'Para fundar un periódico digital en España hace falta autorización del gobierno.', v: false, e: 'Cualquier persona u organización puede fundar un medio sin autorización.' },
          { t: 'La licencia de radio regula el uso de la frecuencia, no el contenido.', v: true, e: 'Las frecuencias son limitadas. La licencia no revisa lo que se dice.' },
          { t: 'La Corte Interamericana consideró compatible con la Convención exigir colegiación obligatoria a los periodistas.', v: false, e: 'En la Opinión Consultiva OC-5/85 concluyó lo contrario.' },
          { t: 'La Constitución cubana de 2019 reserva los medios fundamentales a la propiedad socialista o de las organizaciones políticas, sociales y de masas.', v: true, e: 'Lo establece el artículo 55.' },
        ],
      },
      {
        tipo: 'relaciona', titulo: 'Leyes de acceso a la información', instrucciones: 'Elige el año de cada norma.',
        opciones: ['1949', '1966', '2005', '2013'],
        items: [
          { a: 'Ley de Libertad de Información de Estados Unidos (FOIA)', b: '1966' },
          { a: 'Ley federal de libertad de información de Alemania', b: '2005' },
          { a: 'Ley de transparencia de España', b: '2013' },
          { a: 'Constitución de Costa Rica, con el acceso a los departamentos administrativos', b: '1949' },
        ],
      },
      {
        tipo: 'escribe', titulo: 'Escribe tu versión', instrucciones: 'En dos o tres frases: ¿cómo debería regular una futura ley cubana la propiedad de los medios?',
        guia: ['Quién puede fundar un medio', 'Qué papel tendrían los medios públicos', 'Qué se exigiría para ejercer el periodismo'],
        ejemplo: 'Cualquier persona podría fundar un medio sin pedir permiso. Los medios públicos tendrían un consejo independiente del gobierno. Nadie necesitaría carné para ejercer el periodismo.',
      },
    ],
  },
  'internet-y-expresion': {
    gancho: { q: '¿Debería un gobierno poder cortar internet durante una protesta?', o: ['Sí', 'Solo en casos extremos', 'No'] },
    entradilla: 'Los mismos derechos valen en internet. Cómo regulan las redes otras democracias y qué dicen las normas cubanas desde 2019.',
    th: 'Has leído las normas de varios países. ¿Recuerdas qué regula cada una? Compruébalo.',
    relacionadas: ['acceso-informacion-internet', 'libertad-expresion', 'despenalizacion-disenso'],
    actividades: [
      {
        tipo: 'relaciona', titulo: 'Norma y contenido', instrucciones: 'Elige qué establece cada norma.',
        opciones: ['Las plataformas no responden por lo que publican sus usuarios', 'Las grandes plataformas retiran contenidos ilegales notificados y explican sus decisiones', 'Multa la difusión por redes de información contraria al interés social', 'Incluye las noticias falsas entre los incidentes de ciberseguridad'],
        items: [
          { a: 'Sección 230, Estados Unidos (1996)', b: 'Las plataformas no responden por lo que publican sus usuarios' },
          { a: 'Ley de Servicios Digitales, Unión Europea', b: 'Las grandes plataformas retiran contenidos ilegales notificados y explican sus decisiones' },
          { a: 'Decreto-Ley 370 de 2019, Cuba', b: 'Multa la difusión por redes de información contraria al interés social' },
          { a: 'Decreto-Ley 35 de 2021 y su reglamento, Cuba', b: 'Incluye las noticias falsas entre los incidentes de ciberseguridad' },
        ],
      },
      {
        tipo: 'huecos', titulo: 'Completa', instrucciones: 'Elige la palabra que falta en cada frase.',
        texto: 'En 2012 el Consejo de Derechos Humanos afirmó que los derechos también deben protegerse en [internet]. Para examinar una ley sobre internet hay que preguntar quién decide qué es ilegal, si lo decide antes o [después] de publicar y si se puede recurrir ante un [juez].',
        extra: ['ministro', 'televisión', 'nunca'],
      },
      {
        tipo: 'opcion', titulo: 'Una pregunta', instrucciones: 'Elige la respuesta correcta.',
        items: [
          { q: '¿Qué tienen en común las leyes sobre internet de Estados Unidos, Alemania, España y Costa Rica?', o: ['Prohíben las redes sociales', 'Lo que se retira lo define una ley y el usuario puede acudir a un juez', 'Permiten cortar internet en una región'], c: 1, e: 'Los contenidos ilegales los define una ley y su retirada puede recurrirse.' },
        ],
      },
    ],
  },
};
