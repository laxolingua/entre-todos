Manual de identidad visual del sitio entre-todos.org (versión de octubre de 2026, rama `rediseno-2026-10-14`). Es la dirección aprobada. Quien diseñe o programe cualquier parte del sitio —el equipo, Instinct, el equipo colaborador del módulo «¿Cuál es el plan?» u otra IA— lo sigue tal cual. Si algo no está aquí, se pregunta antes de inventarlo.

## Carácter

ENTRE TODOS es una plataforma cívica, independiente, plural y no partidista. La imagen tiene que transmitir seriedad, firmeza y claridad, como un documento público bien hecho: titulares fuertes, fotos en blanco y negro, una geometría única y tres colores. No es una campaña ni un partido, así que nada de efectos, degradados de moda, iconos sonrientes ni lemas.

## Reglas que no se pueden romper

1. **Una sola diagonal.** Toda forma inclinada va en la dirección «/» a 60° de la horizontal (`skewX(var(--sesgo))`, `sesgo` = -30°). Gruesas, finas o franjas, todas paralelas entre sí. Ninguna otra inclinación en ninguna parte.
2. **Fotos en blanco y negro.** En la web, siempre. Las imágenes a color de «Cuba soñada» se publican solo en la página y el grupo de Facebook y en Instagram; el sitio enlaza a ellas, no las aloja.
3. **Tres colores de marca:** `marino`, `rojo`, `amarillo`. Sobre blanco y gris claro. No se añaden colores nuevos.
4. **Esquinas rectas.** Radio máximo 4 px (`radio`). Nada de tarjetas redondeadas ni botones en píldora.
5. **Titulares en Barlow Condensed 800, mayúsculas, marino.** Texto en Barlow. El logotipo en Montserrat 900. No se cargan otras fuentes.
6. **Iconos de Flaticon UIcons Bold Rounded**, alojados en el propio sitio. Nunca emojis.
7. **Cero peticiones a terceros.** Fuentes, iconos e imágenes se sirven desde entre-todos.org. Ni Google Fonts, ni CDN, ni analítica, ni redes sociales incrustadas. Protege a quien entra desde Cuba.
8. **Nunca una función a medias.** O funciona, o lleva el aviso «Próximamente».

## Logotipo

- Logotipo tipográfico en dos líneas: **ENTRE** en `marino` sobre **TODOS** en `rojo`, Montserrat 900, mayúsculas, interlínea 0,84, espaciado -0,035em (estilo `logotipo`). Sobre marino, ENTRE pasa a blanco.
- Componente `Logotipo`. Se escribe como texto HTML, no como imagen.
- **Abreviatura: E/T**, siempre con barra. Nunca «ET», que es la abreviatura de elTOQUE. La barra viene de la abreviatura tradicional de «entre» («e/», como en las direcciones cubanas: «e/ 23 y 25») y repite la diagonal de la marca. En referencias de documentos se escribe E/T-2026-001; en nombres de archivo, donde la barra no se admite, E-T.
- **Monograma E/T** para espacios cuadrados y redondos (avatar de redes, icono de aplicación): letras E y T juntas, cortadas por una raya `amarillo` inclinada. Versiones marino y blanca en el grupo de recursos «Marca».
- Espacio libre alrededor: como mínimo la altura de la letra E. Tamaño mínimo: 18 px de alto por línea.
- Prohibido: cambiar colores, poner el logotipo en una línea, inclinarlo, añadir sombras, contornos o degradados, o redibujarlo en otra fuente.

## Color

| Token | Uso | Proporción aproximada |
|---|---|---|
| `superficie`, `fondo` | Fondos: blanco para tarjetas y paneles, gris muy claro detrás | 60 % |
| `marino` | Estructura: titulares, bloques oscuros, pie, panel inclinado del corte | 25 % |
| `rojo` | Acción y énfasis: botón principal, antetítulos, barras, TODOS | 10 % |
| `amarillo` | Solo acentos finos: barra sobre fotos, barra bajo títulos, raya del monograma | 5 % |

- Texto: `texto` para el cuerpo, `texto-2` para entradillas, `texto-3` para notas. Nada más claro que `texto-3` para texto que hay que leer.
- **El amarillo nunca es color de texto sobre blanco** (contraste 1,7:1). Sobre amarillo, texto `marino`.
- El rojo es el color de la acción: un solo elemento rojo dominante por pantalla.
- `aviso` y `aviso-suave` son solo para avisos. Los colores `voto-*` son exclusivos de la escala de acuerdo.
- El sitio tiene un solo tema (claro). No hay modo oscuro.

## Tipografía

- **Barlow Condensed** (`--font-display`): titulares h1 y h2 en 800, mayúsculas; números de tarjeta en 300.
- **Barlow** (`--font-texto`): todo el texto, de 400 a 700.
- **Montserrat 900** (`--font-logo`): solo el logotipo.
- Escala: `titular-1` 58 px (37 px en móvil), `titular-2` 30 px, `titular-tarjeta` 23 px, `entradilla` 18 px, `cuerpo` 17 px, `nota` 15 px, `antetitulo` 13 px con espaciado .14em, `etiqueta` 12 px.
- Líneas de texto de 66 caracteres como máximo.
- Mayúsculas solo en titulares, antetítulos, botones y etiquetas. El texto corrido y los títulos de propuesta van en mayúsculas y minúsculas.
- Las fuentes se sirven desde el sitio (paquetes `@fontsource`, subconjunto latino). No se enlaza Google Fonts.

## Geometría: la diagonal

La identidad se reconoce por su corte inclinado (componente `CorteDiagonal`):

- Ángulo único: `sesgo` = -30° en `skewX`, o sea, una diagonal «/» a 60° de la horizontal. Para dibujar paralelogramos con `clip-path` o SVG, el desplazamiento horizontal es `pendiente` (0,577) por cada píxel de alto.
- Piezas permitidas: máscara blanca que corta la foto, panel `marino` translúcido, paralelogramo `rojo`, barra fina `amarillo`, textura de puntos (puntos de 1,1 px cada 7 px).
- Todas las piezas de una misma pantalla son paralelas. Si una línea no es paralela a las demás, está mal.
- Las esquinas de las tarjetas pueden llevar un triángulo de fondo en la esquina inferior derecha, nunca en otra esquina.
- Prohibido: curvas, ondas, círculos decorativos, diagonales en la dirección «\», ángulos distintos de 60°.

## Fotografía

- Siempre en blanco y negro en la web. El CSS aplica `filter: grayscale(1)` (clase `.duo`) y un velo marino; aun así, los archivos se guardan ya en escala de grises para que pesen menos.
- Tono: oscuro y con contraste. Brillo medio en torno a 100 sobre 255 y contraste alto. Las 18 fotos de categoría ya están igualadas así; una foto nueva se ajusta al mismo tono antes de subirla.
- Tamaño: 1400 px de lado largo como máximo, JPEG calidad 80, progresivo.
- Temas: escenas de la vida cotidiana en Cuba (trabajo, votación, familia, ciudad, campo). Sin rostros de famosos, sin políticos, sin símbolos de partido.
- Archivos de categoría: `web/public/img/fotos/cat-<clave>.jpg` (transicion, constitucion, modelo_pais, sistema_electoral, reconstruccion, educacion, economia, trabajo, salud, medio_ambiente, sociedad_civil, derechos, familia, tercera_edad, vivienda, genero, animales, alimentacion).
- Fotos a color: solo en redes (Facebook e Instagram), nunca en el sitio.

## Iconografía

- Flaticon UIcons, estilo Bold Rounded (`fi fi-br-<nombre>`), versión 3.3.1.
- El sitio carga un subconjunto propio de 165 iconos (`/fonts/uicons-br.woff2` y `.css`, unos 16 KB), generado con `scripts/rediseno/iconos.py`. Para un icono nuevo se añade el nombre al script y se regenera; no se enlaza la CDN de Flaticon.
- Los iconos acompañan a una palabra; no la sustituyen. Color heredado del texto.
- Sin emojis en ninguna parte del sitio.

### Redes sociales

- Van en el pie de página, como botones redondos de 44 px con borde fino blanco, solo con el icono. Cada botón lleva `aria-label` y `title` con el nombre de la red.
- Logotipos de marca: Flaticon UIcons Brands (`fi fi-brands-instagram`, `fi fi-brands-facebook`), en un subconjunto propio de 2 iconos (`/fonts/uicons-brands.woff2` y `.css`). Tampoco se enlaza la CDN.
- Instagram: el logotipo solo (@EntreTodosOrg).
- Página de Facebook: logotipo de Facebook con una insignia amarilla redonda con una bandera (`fi-br-flag`), que es el icono con el que Facebook identifica las Páginas.
- Grupo de Facebook: logotipo de Facebook con la misma insignia amarilla con el icono de personas (`fi-br-users`).
- Las direcciones están en `web/src/data/sitio.json`. Si una red no tiene dirección, no se muestra su botón.
- Excepción a la regla de que los iconos acompañan a una palabra: aquí el icono basta porque es el signo reconocido de cada red.

## Componentes

- **Botón** (`Boton`): `.boton.rojo` para la acción principal, `.boton` con borde marino para las secundarias, `.boton.claro` sobre fondos marinos, `.enlace-flecha` dentro de tarjetas.
- **Titulares** (`Titulares`): antetítulo rojo con raya, titular condensado marino, barra de 64×6 px.
- **Etiqueta** (`Etiqueta`): neutra, alternativa, aviso y derecho fundamental.
- **Tarjeta de propuesta** (`TarjetaPropuesta`): foto 16:9 en blanco y negro con barra amarilla inclinada, categoría, número, título, extracto y «Ver propuesta».
- **Aviso «Próximamente»** (`AvisoProximo`): bloque marino con esquina cortada.
- **Escala de acuerdo** (`EscalaAcuerdo`): cinco bloques inclinados, de rojo a marino. Sustituye a las estrellas.
- **Panel**: blanco, borde `borde`, radio 4 px, `sombra`, relleno 24 px. Variante marina para avisos importantes.
- Altura mínima de todo lo que se toca: 44 px (`control-minimo`); botones de 46 px.
- Foco visible: contorno `rojo` de 3 px separado 2 px.

## Maquetación

- Contenedor de 1180 px como máximo; márgenes de 16 px en móvil y 28 px desde 720 px.
- Rejillas con `gap` de 14 px (18 px si llevan fotos), columnas de al menos 280 px.
- Una sola sombra (`sombra`). Las tarjetas sobre `fondo`, nunca tarjetas dentro de tarjetas.
- Cabecera blanca y fija: logotipo a la izquierda; menú (Propuestas, ¿Cuál es el plan?, Blog A+, Consulta, Sobre nosotros); iconos de perfil y búsqueda.
- Pie marino en cuatro columnas con «Cómo participar con seguridad».
- Todo debe funcionar a 360 px de ancho sin desplazamiento horizontal.

## Texto y tono

- Español, tuteo («Elige un tema», «Tu voto»). Frases cortas y directas.
- Sin lemas ni frases de anuncio. Sin la estructura «Esto no es X. Es Y.». Sin superlativos de marketing.
- Los botones dicen lo que hacen: «Vota», «Ver fuentes y autores», «Salir ahora».
- Cifras con punto de miles (42.263) y porcentajes con coma decimal (43,8 %).
- Las propuestas se presentan por su contenido; las autorías se consultan aparte, en «Ver fuentes y autores».
- Incluir una propuesta no significa respaldarla, y el sitio lo dice cuando hace falta.
- Los derechos fundamentales no se votan y llevan su etiqueta.
- Los resultados de consultas siempre van con el número de participantes, las fechas y sus límites.

## Rendimiento: el sitio debe abrir con mala conexión

- HTML de cada página: menos de 20 KB comprimido.
- Fotos: de 130 a 250 KB cada una como máximo; `loading="lazy"` fuera de la primera pantalla. Pendiente: versiones WebP y `srcset`.
- Fuentes: solo los pesos listados (unos 240 KB en total, en caché tras la primera visita).
- Pendiente aprobado: una «Versión ligera» automática para conexiones pobres, sin fotos ni fuentes web, con el mismo orden y los mismos colores.

## Espacios de colaboradores

- El módulo «¿Cuál es el plan?» se monta en `<div id="modulo-plan" data-modulo="cual-es-el-plan">`. El equipo colaborador puede sustituir el contenido de ese bloque por completo y conectar sus datos.
- Dentro de su módulo usa estos tokens (`tokens.css`), las fuentes Barlow y Barlow Condensed y la regla de la diagonal, para que el sitio se lea como una sola pieza.
- No modifica la cabecera, el pie, otras páginas ni la rama `main`; trabaja mediante pull request a `rediseno-2026-10-14`.

## Documentos oficiales: aspecto y edición

Modelo aprobado por Mitch el 16/10/2026: la Carta de Identidad E/T-Cu-2026-002 (`documentos-oficiales/carta-de-identidad-E-T-Cu-2026-002.pdf`). Todo documento oficial de E/T luce exactamente así: acuerdos, cartas, informes, actas, anexos, informes a financiadores y documentos para colaboradores. Grupo de recursos «Membrete».

### Página y membrete

- A4, márgenes laterales de 20 mm, superior de 42 mm (deja sitio a la cabecera) e inferior de 28 mm.
- **Cabecera** a sangre, de 210 × 32 mm, igual en todas las páginas: logotipo a la izquierda con el país debajo, en `texto-3`, mayúsculas espaciadas y entre rayas (— CUBA —, — ESPAÑA —). A la derecha va el corte diagonal: franja `acento-suave`, panel `marino`, barra `amarillo`, puntos y paralelogramo `rojo`, con **entre-todos.org** en blanco. Cada país tiene su imagen de cabecera (`scripts/documentos/recursos/cabecera-<país>.png`).
- **Pie** en todas las páginas: línea `marino` fina; «ENTRE TODOS · entre-todos.org · contacto.entretodos@gmail.com · Potsdam, Alemania» en 8 pt `texto-3`; número de página a la derecha; esquina roja y amarilla abajo a la derecha.
- La cabecera y el pie no se modifican de un documento a otro.

### Primera página: saber de qué trata al abrirlo

1. **Tipo**, en `rojo`, 8 pt, negrita, mayúsculas: «DOCUMENTO OFICIAL · CARTA», «· ACUERDO», «· INFORME», «· ACTA», «· ANEXO», «· CARTA DE IDENTIDAD».
2. **Asunto**, en Barlow Condensed 800, 20 pt, mayúsculas, `marino`. Una línea, dos como máximo. Dice de qué trata, sin lemas.
3. **Recuadro** `acento-suave` con borde izquierdo `marino` de 4,5 pt:
   - a la izquierda, **CONTENIDO**: el índice numerado de los apartados, que coincide exactamente con los títulos del cuerpo;
   - a la derecha, **FICHA**: Ref., Fecha, Para, Versión (si la hay) y Estado.
4. En las cartas, después del recuadro: lugar y fecha a la derecha, destinatario (nombre en negrita, cargo y organización debajo, copias en `texto-3`) y saludo.

### Cuerpo del texto

- Barlow 11 pt, color `texto`, interlínea 1,25, justificado. Párrafos de 3 a 5 líneas.
- Apartados numerados «1. Título», en Barlow negrita 12 pt `marino`, con aire antes y pegados a su texto (nunca un título solo al final de una página).
- Subapartados sin número en Barlow negrita 11 pt `rojo` (como «Unidad nacional en la diversidad»).
- Principios o cláusulas con título en línea: el título en negrita `marino` seguido de punto y el texto en la misma línea («**Financiamiento.** La plataforma publica…»).
- Viñetas y listas numeradas con sangría de 6 mm; nunca se escriben los símbolos a mano.
- Tablas solo cuando se comparan cosas: cabecera en negrita `marino`, filas sin colores de fondo.
- Firma al final: nombre en negrita y cargo debajo en `texto-2`.
- Nada de colores fuera de la paleta, nada de emojis, nada de imágenes decorativas.

### Referencia, versiones y estado

- Referencia: **E/T-País-Año-Número**, numerada en orden dentro de cada país y año: E/T-Cu-2026-001, E/T-Cu-2026-002, E/T-Es-2026-001. El número no se reutiliza.
- Una versión nueva conserva la referencia y cambia la ficha: «Versión: v2» y una línea que dice qué cambió y cuándo. El documento anterior nunca se sobrescribe: se hace una copia y se edita la copia.
- Estados: Borrador · Para aprobar · Aprobado · Firmado · Vigente · Sustituido.
- Nada se envía ni se publica sin la aprobación de Mitch.

### Lo que nunca va dentro de un documento oficial

- Notas internas de trabajo, comentarios entre IA, listas de pendientes o razonamientos sobre la redacción. Eso va al Espacio Común, aparte.
- Claves, contraseñas, datos personales de participantes ni identidades de personas en Cuba.
- Importes de subvenciones o números de expediente, salvo en los documentos para el financiador y con la aprobación de Mitch.

### Cómo se edita

- **Para hacer un documento nuevo:** usar la herramienta `scripts/documentos/generar.js` (instrucciones en `scripts/documentos/LEEME.md`). Se le da el país, el tipo, el asunto, el índice, la ficha y los bloques de texto, y devuelve el Word con el membrete. Después, `incrustar_fuentes.py` mete Barlow dentro del archivo.
- **Para escribirlo a mano:** partir de la plantilla `marca/membrete/membrete-ENTRE-TODOS.docx` y escribir sobre los textos entre corchetes, sin cambiar estilos, márgenes, cabecera ni pie.
- **En Word:** se edita directamente; las fuentes van incrustadas. Al terminar, guardar también como PDF.
- **En Google Docs:** abrir el .docx con Google Docs; Barlow está disponible. Revisar que la cabecera y el pie se mantengan antes de exportar a PDF.
- Al cambiar un apartado, actualizar también el índice del recuadro para que coincidan.
- Se envía siempre el **PDF**: lleva las fuentes dentro y se ve igual en cualquier pantalla. El Word es para editar.

### Nombres de archivo

- En el repositorio: tipo, referencia y asunto breve, con guiones (`carta-E-T-Cu-2026-001-sitio-nuevo.pdf`). La barra de E/T se escribe E-T.
- En el Espacio Común: número del índice, iniciales y asunto, solo con espacios (`011 CL Carta de Identidad documento oficial`). Sin guiones bajos ni fechas en el nombre; la fecha va dentro del documento.

## Archivos fuente

- Estilos: `web/src/styles/global.css` (todas las variables en `:root` al principio; la geometría unificada en el bloque «geometría unificada»).
- Plantilla general: `web/src/layouts/Base.astro`.
- Datos de contacto y redes: `web/src/data/sitio.json` (único lugar donde se cambia el correo).
- Recursos de marca para redes: carpeta `marca/` del repositorio.
- Membrete: `marca/membrete/` (plantilla Word, muestra PDF e imágenes de cabecera y pie).
- Repositorio: github.com/laxolingua/entre-todos.
