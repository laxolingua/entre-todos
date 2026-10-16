// Registro de compromisos y planes para la reconstrucción de Cuba.
// Fuente: hoja «Promesas de ayuda para la reconstrucción de Cuba (v1)», Instinct, 17/10/2026.
// Excluido por decisión de Mitch: toda ayuda o cooperación con el gobierno actual
// (plan de la ONU coordinado con el gobierno, ayuda de México, Brasil y España, conversión de deuda, CAF 2016).
// Excluido por exactitud o alcance: registros de lobbying y movimientos de inversores (fuente única, no son ayuda),
// financiación de la NED (no es reconstrucción) y declaraciones políticas sin compromiso.
// Niveles: conceptual · tecnica · respaldada · verificable (ver la página).

export const actualizado = '17 de octubre de 2026';

export const contextoLegal = {
  titulo: 'Por qué el inicio dependería de capital privado y ayuda bilateral',
  texto: 'La Ley Helms-Burton (1996) obliga al Gobierno de EE. UU. a oponerse al ingreso de Cuba en el Fondo Monetario Internacional, el Banco Mundial y otras instituciones financieras internacionales hasta que exista un gobierno elegido democráticamente. La misma ley autoriza ayuda humanitaria y asistencia de emergencia a un gobierno de transición. Como comparación, Europa del Este recibió unos 165.000 millones de dólares de financiación multilateral entre 1990 y 1995.',
  fuente: { t: 'Miami Herald, 25/9/2026', url: 'https://www.miamiherald.com/news/nation-world/world/americas/cuba/article317370731.html' },
};

export const secciones = [
  {
    id: 'ofertas',
    titulo: 'Ofertas y compromisos de gobiernos',
    entradas: [
      {
        actor: 'Gobierno de EE. UU. · Departamento de Estado', fecha: '13/05/2026', nivel: 'verificable', cifra: '100 millones USD',
        que: 'Asistencia humanitaria directa al pueblo cubano, distribuida con la Iglesia católica y organizaciones humanitarias independientes, sin intermediación del gobierno cubano. Incluye una oferta de internet por satélite.',
        condiciones: 'Que las autoridades cubanas permitan la entrega.',
        fuentes: [{ t: 'Departamento de Estado', url: 'https://www.state.gov/releases/office-of-the-spokesperson/2026/05/the-united-states-is-ready-to-provide-100-million-in-direct-assistance-to-the-cuban-people-if-the-cuban-regime-will-permit-it' }],
        cautela: 'Que el gobierno cubano la aceptó el 3/7/2026 solo lo publica un medio.',
      },
      {
        actor: 'Gobierno de EE. UU. · Secretario de Estado', fecha: '11/07/2026', nivel: 'respaldada', cifra: 'Sin cifra',
        que: 'Oferta de ayuda económica, asistencia para la reconstrucción y una nueva relación entre los dos países.',
        condiciones: 'Reformas políticas y económicas reales y liberación de todos los presos políticos.',
        fuentes: [{ t: 'Departamento de Estado', url: 'https://www.state.gov/releases/office-of-the-spokesperson/2026/07/five-years-after-the-july-11-demonstrations-cubans-deserve-a-better-future' }],
      },
      {
        actor: "Samaritan's Purse · contrato del Gobierno de EE. UU.", fecha: '17/09/2026', nivel: 'respaldada', cifra: '40 millones USD',
        que: 'Contrato federal para distribuir ayuda humanitaria dentro de Cuba. La organización dice que los detalles aún no son definitivos.',
        fuentes: [{ t: 'The Guardian', url: 'https://www.theguardian.com/us-news/2026/sep/17/trump-marco-rubio-cuba' }],
        cautela: 'Fuente única.',
      },
      {
        actor: 'Unión Europea · Comisión Europea (ECHO)', fecha: '23/07/2026', nivel: 'verificable', cifra: '10 millones EUR',
        que: 'Ayuda humanitaria adicional para la población: salud y medicinas, alimentación de emergencia, agua, logística a zonas remotas y energía renovable. Se canaliza solo a través de socios humanitarios. Se suma a 4 millones de euros aprobados a inicios de 2026 y 2 millones en abril.',
        fuentes: [{ t: 'Comisión Europea', url: 'https://civil-protection-humanitarian-aid.ec.europa.eu/news-stories/news/eu-releases-additional-eur10-million-humanitarian-aid-cuban-population-2026-07-23_en' }],
        cautela: 'Es ayuda para la crisis actual, no para la reconstrucción posterior a un cambio.',
      },
      {
        actor: 'Unión Europea · Parlamento Europeo', fecha: '18/06/2026', nivel: 'respaldada', cifra: 'Sin cifra',
        que: 'Resolución que pide canales humanitarios directos a la población (energía, alimentos y medicinas), sanciones a los responsables de la represión y suspender el acuerdo de cooperación con Cuba si no hay pasos hacia la transición.',
        condiciones: 'Una transición democrática liderada por cubanos de la isla y de la diáspora.',
        fuentes: [{ t: 'Parlamento Europeo', url: 'https://www.europarl.europa.eu/news/es/press-room/20260615IPR45408/cuba-los-eurodiputados-piden-sanciones-de-la-ue-y-un-impulso-a-la-transicion' }],
      },
    ],
  },
  {
    id: 'diaspora',
    titulo: 'Capital de la diáspora',
    nota: 'Son disposiciones declaradas, no desembolsos. Las cifras de distintas fechas no se suman.',
    entradas: [
      {
        actor: 'Jorge Mas Santos · Fundación Nacional Cubano-Americana', fecha: 'Marzo a septiembre de 2026', nivel: 'respaldada', cifra: '40.000–90.000 millones USD',
        que: 'Estima lo que necesitaría la reconstrucción; unos 90.000 millones para estabilizar los tres primeros años. Afirma que reunir el capital no sería un problema y pone a disposición los activos de su familia.',
        condiciones: 'Marco legal, protección e incentivos a la inversión.',
        fuentes: [{ t: 'Miami Herald', url: 'https://www.miamiherald.com/news/nation-world/world/americas/cuba/article317370731.html' }, { t: 'Univision', url: 'https://www.univision.com/local/miami-wltv/empresarios-de-miami-preparan-un-plan-para-reconstruirla' }],
        cautela: 'Estimaciones hechas en fechas distintas (35.000–45.000, 40.000–80.000 y 40.000–90.000 millones): no se suman.',
      },
      {
        actor: 'Cámara de Comercio Nacional Cubano Americana', fecha: 'Marzo a septiembre de 2026', nivel: 'respaldada', cifra: '200.000 millones USD (potencial)',
        que: 'Familias dispuestas a invertir: si se reúnen 100, su patrimonio combinado rondaría esa cifra. Prepara una bolsa de valores en La Habana y una cumbre de inversiones.',
        condiciones: 'Solo con un gobierno democrático y garantías legales plenas.',
        fuentes: [{ t: 'Miami Herald', url: 'https://www.miamiherald.com/news/nation-world/world/americas/cuba/article317370731.html' }],
        cautela: 'Es patrimonio que podría movilizarse, no dinero comprometido.',
      },
      {
        actor: 'Empresarios del exilio (según un consultor)', fecha: '26/05/2026', nivel: 'conceptual', cifra: '35.000 millones USD (primer año)',
        que: 'Capital que, según el consultor Roberto Fernández-Rizo, estaría dispuesto para el primer año tras una transición, junto con un programa humanitario.',
        condiciones: 'Seguridad jurídica, transición democrática y elecciones anunciadas.',
        fuentes: [{ t: 'CiberCuba', url: 'https://www.cibercuba.com/noticias/2026-05-27-u1-e208933-s27061-nid330394-35-mil-millones-dolares-esperan-transicion' }],
        cautela: 'Fuente única y de segunda mano; tómese como indicativa.',
      },
      {
        actor: 'Grupo de empresarios cubanoamericanos', fecha: '25/09/2026', nivel: 'tecnica', cifra: '≈ 8.000 millones USD',
        que: 'Proyectos para el día después: renovar ocho aeropuertos y soluciones eléctricas de emergencia con plantas flotantes de generación.',
        condiciones: 'Que cambien las condiciones políticas y legales.',
        fuentes: [{ t: 'Univision (sobre un reportaje del Wall Street Journal)', url: 'https://www.univision.com/local/miami-wltv/empresarios-de-miami-preparan-un-plan-para-reconstruirla' }],
      },
    ],
  },
  {
    id: 'estimaciones',
    titulo: 'Estimaciones y planes técnicos',
    entradas: [
      {
        actor: 'Carlos Saladrigas · Cuba Emprende', fecha: '11/03/2026', nivel: 'tecnica', cifra: '6.000–10.000 millones USD (fase 1)',
        que: 'Plan en tres fases: estabilización en 2 a 4 años (red eléctrica, alimentos, salud, educación, orden público); reconstrucción de infraestructura en unos 5 años; y Cuba como centro financiero del Caribe.',
        condiciones: 'Levantamiento de las sanciones; financiación de la diáspora y de EE. UU., y en menor medida de la UE y América Latina.',
        fuentes: [{ t: 'CiberCuba', url: 'https://www.cibercuba.com/noticias/2026-03-11-u1-e2-s27061-nid322818-carlos-saladrigas-reconstruir-cuba-costara-6000-10000' }],
      },
      {
        actor: 'Rafael Romeu · «Cuba Día Cero»', fecha: '22/07/2026', nivel: 'tecnica', cifra: '275.000–375.000 millones USD en 10–15 años',
        que: 'Hoja de ruta de reconstrucción con capital privado. Propone además ayuda de emergencia de 180 a 270 millones de dólares para los seis primeros meses (salarios públicos, luz y alimentos).',
        condiciones: 'Marco legal que estimule la inversión privada.',
        fuentes: [{ t: 'Miami Herald', url: 'https://www.miamiherald.com/news/nation-world/world/americas/cuba/article316598143.html' }, { t: 'Infobae', url: 'https://www.infobae.com/cuba/2026/09/28/entre-usd-40000-y-usd-375000-millones-el-abismo-entre-las-cifras-y-los-planes-que-dividen-a-los-exiliados-cubanos-sobre-el-futuro-de-la-isla/' }],
      },
      {
        actor: 'Foro sobre infraestructura · Museo Americano de la Diáspora Cubana', fecha: '22/07/2026', nivel: 'tecnica', cifra: 'Por sector',
        que: 'Energía: reparar las termoeléctricas costaría unos 10.000 millones y al menos un año. Aeropuertos: 8.000–10.000 millones en 15 años. Telecomunicaciones: 5G en menos de tres años. Agua: rehabilitación en 2–5 años, priorizando hospitales. Carreteras: el 70 % en mal estado.',
        fuentes: [{ t: 'Miami Herald', url: 'https://www.miamiherald.com/news/nation-world/world/americas/cuba/article316598143.html' }],
        cautela: 'Estimaciones de expertos, no compromisos de financiación.',
      },
      {
        actor: 'Fundación Nacional Cubano-Americana · «Roadmap for a Prosperous, Democratic, Free-Market Cuba»', fecha: 'Primavera de 2026', nivel: 'tecnica', cifra: 'Sin cifra propia',
        que: 'Hoja de ruta: república constitucional de libre mercado, poder judicial independiente, incentivos a empresas con al menos un 10 % de propiedad cubana y una nueva clase empresarial dentro de la isla.',
        fuentes: [{ t: 'Miami Herald', url: 'https://www.miamiherald.com/news/nation-world/world/americas/cuba/article317370731.html' }],
      },
      {
        actor: 'Cuba Renace · plan integral de transición', fecha: '05/03/2026', nivel: 'tecnica', cifra: 'Proyecciones propias',
        que: 'Seis provincias históricas en una república federal, dolarización, impuestos planos, reapertura de la Bolsa de La Habana e infraestructura nacional (autopistas, ferrocarril, puertos, fibra y 5G, energía, agua).',
        fuentes: [{ t: 'cubarenace.org', url: 'https://www.cubarenace.org' }],
        cautela: 'Las proyecciones de crecimiento son del propio plan, sin aval de terceros.',
      },
      {
        actor: 'Grupo de trabajo sobre Cuba · Universidad de Harvard', fecha: '10/09/2026', nivel: 'tecnica', cifra: 'Sin cifra total',
        que: 'Informe de 14 especialistas: asamblea constituyente, economía social de mercado, reingreso en el FMI, el Banco Mundial y otros organismos para financiar electricidad, salud, educación, vivienda y transporte, y la diáspora como fuente de capital.',
        fuentes: [{ t: 'El País', url: 'https://english.elpais.com/international/2026-09-22/neither-us-intervention-nor-communist-stagnation-harvards-proposed-plan-for-cuba.html' }],
        cautela: 'Criticado por parte del exilio y rechazado por el canciller cubano. Se registra como posición.',
      },
      {
        actor: 'Cuba Transformación · cinco economistas', fecha: '22/06/2026', nivel: 'tecnica', cifra: 'Sin cifra',
        que: 'Hoja de ruta en tres fases hacia una economía social de mercado con Estado de derecho democrático.',
        fuentes: [{ t: 'cubatransformacion.com', url: 'https://cubatransformacion.com/' }],
      },
      {
        actor: 'Mauricio de Miranda Parrondo · «Plan Marshall» para Cuba', fecha: '08/09/2026', nivel: 'conceptual', cifra: 'Sin cifra',
        que: 'Programa de asistencia a gran escala con tres fuentes: cooperación de gobiernos, capital de la diáspora y reingreso en las instituciones financieras internacionales.',
        condiciones: 'Cambio político hacia la democracia y garantías institucionales.',
        fuentes: [{ t: 'CiberCuba', url: 'https://en.cibercuba.com/noticias/2026-09-08-u1-e207888-s27061-nid339869-economista-propone-plan-marshall-reconstruir-cuba' }],
      },
    ],
  },
];

export const NIVELES = {
  conceptual: 'Conceptual',
  tecnica: 'Técnica',
  respaldada: 'Respaldada',
  verificable: 'Verificable',
};
