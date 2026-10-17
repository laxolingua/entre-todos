// Cuba y Estados Unidos en 2026. Datos de la investigación de Instinct (hoja 014 del Espacio Común, 16/10/2026),
// verificados por Claude con cobertura independiente el 17/10/2026. Solo hechos con fuente y fecha.
// Las propuestas del banco se enlazan por su ficha pública; las autorías quedan dentro de cada ficha.

export const ACTUALIZADO = '17 de octubre de 2026';

export const exigencias = [
  {
    pide: 'Elecciones libres, con distintos partidos',
    quien: 'Marco Rubio, secretario de Estado (mensaje del 20 de mayo); Washington pide elecciones «libres y justas» (Reuters, 5 de octubre)',
    cita: '«Quiero que el pueblo cubano tenga elecciones libres»',
    fuente: 'https://www.lanacion.com.ar/estados-unidos/las-condiciones-basicas-de-marco-rubio-y-estados-unidos-para-abrir-negociaciones-con-cuba-nid08062026/',
    propuestas: ['elecciones-libres', 'autoridad-electoral-independiente', 'nueva-ley-electoral'],
  },
  {
    pide: 'Libertad de prensa y de expresión',
    quien: 'Marco Rubio, ante el Comité de Asuntos Exteriores de la Cámara de Representantes (junio)',
    cita: '«Quiero que tenga libertad de prensa y libertad de expresión»',
    fuente: 'https://www.lanacion.com.ar/estados-unidos/las-condiciones-basicas-de-marco-rubio-y-estados-unidos-para-abrir-negociaciones-con-cuba-nid08062026/',
    propuestas: ['libertad-expresion'],
  },
  {
    pide: 'Liberar a los presos políticos',
    quien: 'Mike Waltz, embajador de EE. UU. ante la ONU (4 de junio)',
    cita: '«Pedimos cosas muy simples: abrir la economía, liberar a los presos políticos, dejar de tratar a los ciudadanos privados como una amenaza…»',
    fuente: 'https://www.cubanet.org/abran-la-economia-liberen-a-los-presos-dejen-de-tratar-a-los-ciudadanos-como-una-amenaza-ee-uu-al-regimen-cubano-en-la-onu/',
    propuestas: ['presos-politicos', 'amnistia-reciproca'],
  },
  {
    pide: 'Abrir la economía a los cubanos: libre empresa y propiedad',
    quien: 'Marco Rubio (20 de mayo) y Mike Waltz (4 de junio)',
    cita: '«Una nueva Cuba donde ustedes, los cubanos de a pie y no solo Gaesa, puedan ser dueños de una gasolinera, o de una tienda de ropa, o de un restaurante»',
    fuente: 'https://elpais.com/us/2026-05-20/marco-rubio-ofrece-una-nueva-via-para-cuba-con-elecciones-libres-y-sin-el-poder-de-las-fuerzas-armadas.html',
    propuestas: ['libertad-empresa', 'propiedad-privada', 'comercio-exterior-libre', 'fin-planificacion-central'],
  },
  {
    pide: 'Dejar de tratar a los ciudadanos como una amenaza',
    quien: 'Mike Waltz, embajador de EE. UU. ante la ONU (4 de junio)',
    cita: '«…dejar de tratar a los ciudadanos privados como una amenaza»',
    fuente: 'https://www.cubanet.org/abran-la-economia-liberen-a-los-presos-dejen-de-tratar-a-los-ciudadanos-como-una-amenaza-ee-uu-al-regimen-cubano-en-la-onu/',
    propuestas: ['despenalizacion-disenso', 'libertad-reunion-asociacion'],
  },
  {
    pide: 'Varios partidos y fin del partido único como fuerza dirigente',
    quien: 'Exigencia que el gobierno cubano atribuye a EE. UU. (ministro Vicente de la O Levy, Reuters, 14 de octubre); Rubio y Waltz piden elecciones con distintos partidos',
    cita: '',
    fuente: 'https://www.cibercuba.com/noticias/2026-10-14-u1-e207888-s27061-nid342836-levy-califica-elecciones-libres-multipartidismo',
    propuestas: ['pluripartidismo', 'legalizacion-organizaciones', 'fin-partido-unico-dirigente'],
  },
  {
    pide: 'Que los cubanos puedan elegir y sustituir a sus gobernantes',
    quien: 'Marco Rubio (mensaje del 20 de mayo)',
    cita: '',
    fuente: 'https://elpais.com/us/2026-05-20/marco-rubio-ofrece-una-nueva-via-para-cuba-con-elecciones-libres-y-sin-el-poder-de-las-fuerzas-armadas.html',
    propuestas: ['eleccion-directa-presidente', 'revocacion-mandato', 'limitacion-mandatos'],
  },
  {
    pide: 'Reformas políticas y económicas a la vez, con un período de transición',
    quien: 'Marco Rubio (Senado, 2 de junio; Fox News, 28 de septiembre)',
    cita: '«No se puede tener libertad económica en Cuba si no se tiene primero libertad política. Ambas tienen que ocurrir al mismo tiempo»',
    fuente: 'https://www.cibercuba.com/noticias/2026-09-29-u207888-e207888-s27061-nid341453-marco-rubio-insiste-regimen-cubano-cayo-unica',
    propuestas: ['cambio-de-modelo', 'reforma-del-estado'],
  },
  {
    pide: 'Derechos humanos, Estado de derecho y democracia',
    quien: 'Memorando Presidencial de Seguridad Nacional 5, citado por el Departamento de Estado',
    cita: '«mejorar los derechos humanos, impulsar el Estado de derecho, fomentar los mercados libres y la libre empresa, y promover la democracia en Cuba»',
    fuente: 'https://www.state.gov/translations/spanish/ee-uu-emite-sanciones-contra-el-regimen-militar-y-las-elites-de-cuba',
    propuestas: ['estado-de-derecho', 'carta-de-derechos', 'pactos-ddhh'],
  },
];

export const seguridad = [
  { pide: 'Fin del apoyo a grupos armados de la región (ELN, FARC y disidencias)', quien: 'Marco Rubio, Senado, 2 de junio', fuente: 'https://elpais.com/america/2026-06-02/marco-rubio-sobre-la-crisis-con-cuba-hemos-hablado-con-ellos-y-les-hemos-dicho-lo-que-tienen-que-hacer-para-recuperar-su-economia.html' },
  { pide: 'Cierre de las instalaciones de inteligencia de China y Rusia', quien: 'Marco Rubio, Senado, 2 de junio', fuente: 'https://elpais.com/america/2026-06-02/marco-rubio-sobre-la-crisis-con-cuba-hemos-hablado-con-ellos-y-les-hemos-dicho-lo-que-tienen-que-hacer-para-recuperar-su-economia.html' },
  { pide: 'Que Cuba no albergue operaciones militares o de inteligencia hostiles a EE. UU.', quien: 'Mensaje presidencial, 20 de mayo', fuente: 'https://www.state.gov/translations/spanish/mensaje-presidencial-en-el-dia-de-la-independencia-de-cuba' },
];

export const hammer = [
  { fecha: 'Enero y febrero', texto: 'Recorre Mayabeque y las zonas de Holguín afectadas por el huracán Melissa para verificar la entrega de ayuda.' },
  { fecha: 'Febrero', texto: 'EE. UU. denuncia que agentes cubanos acosan al diplomático en sus viajes por la isla y amenaza con sanciones de visado.' },
  { fecha: '18 y 19 de febrero', texto: 'En Madrid se reúne con más de un centenar de cubanos de la diáspora europea para escuchar sus propuestas.' },
  { fecha: '27 de febrero', texto: 'Se reúne con la Conferencia de Obispos Católicos de Cuba sobre la ayuda humanitaria a través de Cáritas.' },
  { fecha: 'Abril a octubre', texto: 'Visita a artistas, periodistas independientes, ex presos políticos y familias de presos del 11J en La Habana, Artemisa y Villa Clara.' },
  { fecha: '2 de junio', texto: 'Coordina con la Iglesia católica la distribución de 100 millones de dólares de ayuda humanitaria de EE. UU.' },
  { fecha: '15 de junio', texto: 'La Embajada abre la convocatoria «Hacia una Cuba libre y próspera» para proyectos independientes.' },
  { fecha: '2 de julio', texto: 'Según la Embajada, la Seguridad del Estado impide a decenas de invitados asistir a la celebración del 4 de julio.' },
  { fecha: 'Septiembre', texto: 'En Villa Clara visita hogares vulnerables, verifica la entrega de alimentos y se reúne con el obispo y con opositores; campaña de descrédito en redes oficialistas.' },
];
export const hammerFuentes = [
  'https://www.cubanet.org/mike-hammer-me-impresiona-la-valentia-de-los-periodistas-independientes-en-cuba/',
  'https://www.aciprensa.com/noticias/121845/representante-de-estados-unidos-en-cuba-tiene-encuentros-con-obispos-y-opositores',
  'https://www.14ymedio.com/cuba/hammer-reune-madrid-centenar-activistas_1_1123858.html',
];

export const posiciones = [
  {
    titulo: 'El embargo es la causa de la crisis',
    quien: 'Gobierno de Cuba. Bruno Rodríguez, ministro de Relaciones Exteriores, en la Asamblea General de la ONU (26 de septiembre)',
    cita: '«una hostilidad permanente, abusiva y despiadada que dura ya casi siete décadas»',
    fuente: 'http://misiones.cubaminrex.cu/es/articulo/intervencion-de-bruno-rodriguez-parrilla-ministro-de-relaciones-exteriores-de-la-41',
  },
  {
    titulo: 'Levantarlo ya, sin condiciones',
    quien: 'El movimiento Puentes de Amor y la mayoría de la Asamblea General de la ONU en su resolución anual',
    cita: '',
    fuente: 'https://radiomiamitoday.com/puentes-de-amor-para-cuba-no-bloqueo/',
  },
  {
    titulo: 'Levantarlo a cambio de reformas verificables',
    quien: 'La Administración de EE. UU. («nueva vía», 20 de mayo) y las condiciones de la ley Helms-Burton',
    cita: '«El presidente Trump ofrece una nueva vía entre Estados Unidos y una nueva Cuba»',
    fuente: 'https://elpais.com/us/2026-05-20/marco-rubio-ofrece-una-nueva-via-para-cuba-con-elecciones-libres-y-sin-el-poder-de-las-fuerzas-armadas.html',
  },
  {
    titulo: 'Mantener y endurecer la presión',
    quien: 'Congresistas cubanoamericanos María Elvira Salazar, Mario Díaz-Balart y Carlos Giménez',
    cita: 'Piden «strong enforcement of U.S. sanctions» y revisar las licencias para negocios con el gobierno cubano (11 de febrero)',
    fuente: 'http://salazar.house.gov/media/press-releases/salazar-diaz-balart-and-gimenez-demand-strong-enforcement-us-sanctions-against',
  },
  {
    titulo: 'Anexión a Estados Unidos',
    quien: 'Una petición ciudadana en Change.org y una corriente en redes sociales, sin organización pública conocida',
    cita: '',
    fuente: 'https://www.univision.com/local/miami-wltv/polemica-por-propuesta-que-busca-que-cuba-sea-anexada-a-eeuu-como-forma-de-terminar-con-la-dictadura-video',
  },
  {
    titulo: 'Intervención militar de EE. UU.',
    quien: 'José Daniel Ferrer y parte del exilio del sur de Florida',
    cita: '«EE. UU. va a tener que intervenir militarmente en Cuba porque el régimen lo que está haciendo es ganar tiempo» (ABC, 16 de mayo)',
    fuente: 'https://www.abc.es/internacional/jose-daniel-ferrer-eeuu-tener-intervenir-militarmente-20260516013702-nt.html',
  },
];

export const leyes = [
  { anio: '1962', texto: 'Proclamación 3447 del presidente Kennedy: embargo a todo el comercio con Cuba.', fuente: 'https://www.archives.gov/federal-register/codification/proclamations/03447.html' },
  { anio: '1992', texto: 'Ley de Democracia Cubana («Torricelli»): prohíbe comerciar con Cuba a las filiales de empresas estadounidenses en otros países.', fuente: 'https://www.congress.gov/bill/102nd-congress/house-bill/5323' },
  { anio: '1996', texto: 'Ley LIBERTAD («Helms-Burton»): convierte el embargo en ley. El presidente no puede levantarlo sin el Congreso.', fuente: 'https://www.congress.gov/104/plaws/publ114/PLAW-104publ114.htm' },
];
export const condiciones = {
  texto: 'La ley fija las condiciones para reconocer un «gobierno de transición» y un «gobierno elegido democráticamente». Entre ellas: legalizar toda actividad política, liberar a todos los presos políticos, permitir sindicatos y prensa independientes, y celebrar elecciones libres. La mayoría son derechos universales; las reclamaciones de propiedades son un asunto bilateral.',
  fuentes: ['https://www.law.cornell.edu/uscode/text/22/6065', 'https://www.govinfo.gov/link/uscode/22/6066'],
};
