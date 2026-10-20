// Biblioteca del Blog A+: documentos internacionales, con su naturaleza y la situación de Cuba.
// Situación de Cuba comprobada con la Biblioteca de Derechos Humanos de la Universidad de Minnesota (2023)
// y el registro de la ONU; se actualiza en indicators.ohchr.org.
const OHCHR = 'https://www.ohchr.org/es/instruments-listings';
export const grupos = [
  {
    titulo: 'La base: la Carta Internacional de Derechos Humanos',
    docs: [
      { t: 'Declaración Universal de Derechos Humanos', inst: 'ONU', anio: 1948, tipo: 'Declaración', que: 'Los derechos y libertades de toda persona. Base de todos los tratados posteriores.', cuba: 'Cuba votó a favor en 1948.', gana: '', url: 'https://www.un.org/es/about-us/universal-declaration-of-human-rights' },
      { t: 'Pacto Internacional de Derechos Civiles y Políticos', inst: 'ONU', anio: 1966, tipo: 'Tratado', que: 'Expresión, conciencia, religión, reunión, asociación, participación política, juicio justo, protección frente a detenciones arbitrarias.', cuba: 'Firmado en 2008. No ratificado.', gana: 'Al ratificarlo, Cuba se sometería al examen periódico de su Comité de Derechos Humanos; con su Protocolo Facultativo, cualquier persona podría presentar quejas ante él.', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-civil-and-political-rights' },
      { t: 'Pacto Internacional de Derechos Económicos, Sociales y Culturales', inst: 'ONU', anio: 1966, tipo: 'Tratado', que: 'Trabajo, seguridad social, salud, educación, cultura y condiciones de vida adecuadas.', cuba: 'Firmado en 2008. No ratificado.', gana: 'Supervisión internacional de los derechos sociales que hoy se presentan como logros, con informes públicos y comparables.', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/international-covenant-economic-social-and-cultural-rights' },
      { t: 'Segundo Protocolo Facultativo del Pacto de Derechos Civiles y Políticos, destinado a abolir la pena de muerte', inst: 'ONU', anio: 1989, tipo: 'Tratado', que: 'Compromiso de abolir la pena de muerte.', cuba: 'No firmado.', gana: '', url: OHCHR },
    ],
  },
  {
    titulo: 'Democracia',
    docs: [
      { t: 'Carta Democrática Interamericana', inst: 'OEA', anio: 2001, tipo: 'Declaración', que: 'Define los elementos esenciales de la democracia representativa y cómo actuar cuando se rompe el orden democrático.', cuba: 'Cuba no participa en la OEA (ver nota).', gana: 'Una Cuba democrática que vuelva a la OEA contaría con su apoyo y su observación electoral.', url: 'https://www.oas.org/es/cidh/mandato/documentos-basicos/carta-democratica-interamericana.pdf' },
      { t: 'Democracia y derechos humanos', inst: 'ONU', anio: 2008, tipo: 'Documento de referencia', que: 'Publicación de Naciones Unidas sobre la relación entre democracia y derechos humanos.', cuba: '', gana: '', url: 'https://www.un.org/es/events/democracyday/2008/pdf/DEMOCRACIAYDERECHOSHUMANOSDEFINITIVO.pdf' },
      { t: 'Construcción constitucional', inst: 'IDEA Internacional', anio: null, tipo: 'Documento de referencia', que: 'Guías y experiencias comparadas sobre cómo se hacen y reforman constituciones.', cuba: '', gana: '', url: 'https://www.idea.int/es/theme/construccion-constitucional' },
    ],
  },
  {
    titulo: 'Justicia, detención y actuación de las autoridades',
    docs: [
      { t: 'Principios básicos relativos a la independencia de la judicatura', inst: 'ONU', anio: 1985, tipo: 'Principios', que: 'Condiciones para que los tribunales sean independientes e imparciales.', cuba: 'No requiere ratificación.', gana: '', url: 'https://www.ohchr.org/es/instruments-mechanisms/instruments/basic-principles-independence-judiciary' },
      { t: 'Convención contra la Tortura y Otros Tratos o Penas Crueles, Inhumanos o Degradantes', inst: 'ONU', anio: 1984, tipo: 'Tratado', que: 'Prohibición absoluta de la tortura y obligación de investigarla y castigarla.', cuba: 'Ratificada en 1995. No ha ratificado su Protocolo Facultativo, que permite visitas a los lugares de detención.', gana: 'Con el Protocolo Facultativo, inspecciones independientes de cárceles y centros de detención.', url: OHCHR },
      { t: 'Convención Internacional para la Protección de Todas las Personas contra las Desapariciones Forzadas', inst: 'ONU', anio: 2006, tipo: 'Tratado', que: 'Prohíbe las desapariciones forzadas y obliga a buscar a las personas desaparecidas.', cuba: 'Ratificada en 2009.', gana: '', url: OHCHR },
      { t: 'Conjunto de Principios para la Protección de Todas las Personas Sometidas a Cualquier Forma de Detención o Prisión', inst: 'ONU', anio: 1988, tipo: 'Principios', que: 'Garantías de toda persona detenida: abogado, aviso a la familia, control judicial.', cuba: 'No requiere ratificación.', gana: '', url: OHCHR },
      { t: 'Código de conducta para funcionarios encargados de hacer cumplir la ley', inst: 'ONU', anio: 1979, tipo: 'Principios', que: 'Cómo deben actuar la policía y demás autoridades: uso de la fuerza, respeto de la dignidad.', cuba: 'No requiere ratificación.', gana: '', url: OHCHR },
    ],
  },
  {
    titulo: 'Igualdad y no discriminación',
    docs: [
      { t: 'Convención Internacional sobre la Eliminación de Todas las Formas de Discriminación Racial', inst: 'ONU', anio: 1965, tipo: 'Tratado', que: 'Prohíbe la discriminación por raza, color u origen.', cuba: 'Ratificada en 1972.', gana: '', url: OHCHR },
      { t: 'Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer', inst: 'ONU', anio: 1979, tipo: 'Tratado', que: 'Igualdad de derechos de las mujeres en todos los ámbitos.', cuba: 'Ratificada en 1980. Firmó en 2000 su Protocolo Facultativo, sin ratificarlo.', gana: 'Con el Protocolo, las mujeres podrían presentar quejas individuales ante su comité.', url: OHCHR },
      { t: 'Convención sobre los Derechos del Niño', inst: 'ONU', anio: 1989, tipo: 'Tratado', que: 'Derechos de niñas, niños y adolescentes.', cuba: 'Ratificada en 1991.', gana: '', url: OHCHR },
      { t: 'Convención sobre los Derechos de las Personas con Discapacidad', inst: 'ONU', anio: 2006, tipo: 'Tratado', que: 'Igualdad y accesibilidad para las personas con discapacidad.', cuba: 'Ratificada en 2007.', gana: '', url: OHCHR },
    ],
  },
  {
    titulo: 'Trabajo y derechos sindicales (OIT)',
    docs: [
      { t: 'Convenio 87 sobre la libertad sindical', inst: 'OIT', anio: 1948, tipo: 'Tratado', que: 'Derecho a crear sindicatos sin autorización previa y a afiliarse al que se elija.', cuba: 'Ratificado en 1952.', gana: 'Cumplirlo permitiría sindicatos independientes, como exige el propio convenio.', url: OHCHR },
      { t: 'Convenio 98 sobre el derecho de sindicación y de negociación colectiva', inst: 'OIT', anio: 1949, tipo: 'Tratado', que: 'Protección frente a la discriminación sindical y derecho a negociar convenios colectivos.', cuba: 'Ratificado en 1952.', gana: '', url: OHCHR },
      { t: 'Convenios 29 y 105 sobre el trabajo forzoso', inst: 'OIT', anio: 1930, tipo: 'Tratado', que: 'Prohíben el trabajo forzoso, también como castigo por opiniones políticas.', cuba: 'Ratificados en 1953 y 1958.', gana: '', url: OHCHR },
      { t: 'Convenio 100 sobre igualdad de remuneración', inst: 'OIT', anio: 1951, tipo: 'Tratado', que: 'Igual salario por trabajo de igual valor entre hombres y mujeres.', cuba: 'Ratificado en 1954.', gana: '', url: OHCHR },
    ],
  },
  {
    titulo: 'Migración, refugio y nacionalidad',
    docs: [
      { t: 'Convención sobre el Estatuto de los Refugiados', inst: 'ONU', anio: 1951, tipo: 'Tratado', que: 'Quién es refugiado y qué protección le deben los Estados.', cuba: 'No firmada.', gana: 'Un marco legal para proteger a quienes busquen refugio en Cuba.', url: OHCHR },
      { t: 'Convenciones sobre el Estatuto de los Apátridas y para Reducir los Casos de Apatridia', inst: 'ONU', anio: 1954, tipo: 'Tratado', que: 'Protección de las personas sin nacionalidad y reglas para evitar que haya más.', cuba: 'No firmadas.', gana: '', url: OHCHR },
      { t: 'Convención Internacional sobre la Protección de los Derechos de Todos los Trabajadores Migratorios y de sus Familiares', inst: 'ONU', anio: 1990, tipo: 'Tratado', que: 'Derechos de quienes trabajan fuera de su país y de sus familias.', cuba: 'No firmada.', gana: '', url: OHCHR },
    ],
  },
  {
    titulo: 'Sistema interamericano',
    docs: [
      { t: 'Declaración Americana de los Derechos y Deberes del Hombre', inst: 'OEA', anio: 1948, tipo: 'Declaración', que: 'Derechos civiles, políticos y sociales, y deberes de las personas. Anterior incluso a la Declaración Universal.', cuba: 'Cuba no participa en la OEA (ver nota).', gana: '', url: 'https://www.oas.org/es/cidh/mandato/documentos-basicos/declaracion-americana-derechos-deberes-hombre.pdf' },
      { t: 'Convención Americana sobre Derechos Humanos (Pacto de San José)', inst: 'OEA', anio: 1969, tipo: 'Tratado', que: 'Derechos civiles y políticos en América. Crea la Corte Interamericana de Derechos Humanos.', cuba: 'No es parte.', gana: 'Las personas podrían llevar sus casos ante la Comisión y, si Cuba acepta su competencia, ante la Corte Interamericana.', url: 'https://www.oas.org/es/cidh/mandato/documentosbasicos-es.pdf' },
      { t: 'Protocolo de San Salvador', inst: 'OEA', anio: 1988, tipo: 'Tratado', que: 'Derechos económicos, sociales y culturales en el sistema interamericano.', cuba: 'No es parte.', gana: '', url: 'https://www.oas.org/es/cidh/mandato/documentosbasicos-es.pdf' },
      { t: 'Convenciones Interamericanas contra la tortura, la desaparición forzada y la violencia contra la mujer', inst: 'OEA', anio: 1985, tipo: 'Tratado', que: 'Prevención y castigo de la tortura (1985), la desaparición forzada (1994) y la violencia contra la mujer (Belém do Pará, 1994).', cuba: 'No es parte.', gana: '', url: 'https://www.oas.org/es/cidh/mandato/documentosbasicos-es.pdf' },
    ],
  },
];

export const notaOEA = 'Cuba fue excluida de la OEA en 1962. En 2009 la OEA dejó sin efecto esa exclusión, pero Cuba no ha pedido volver. Una Cuba democrática que regrese tendría acceso a la Comisión y la Corte Interamericanas, a la observación electoral de la OEA y, como miembro de la OEA, podría ingresar en el Banco Interamericano de Desarrollo, una de las principales fuentes de financiación de la región.';
