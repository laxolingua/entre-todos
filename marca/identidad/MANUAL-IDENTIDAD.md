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
- Cabecera blanca y fija: logotipo a la izquierda; menú (Propuestas, ¿Cuál es el plan?, Academia, Consulta, Sobre nosotros); iconos de perfil y búsqueda.
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

## Archivos fuente

- Estilos: `web/src/styles/global.css` (todas las variables en `:root` al principio; la geometría unificada en el bloque «geometría unificada»).
- Plantilla general: `web/src/layouts/Base.astro`.
- Datos de contacto y redes: `web/src/data/sitio.json` (único lugar donde se cambia el correo).
- Recursos de marca para redes: carpeta `marca/` del repositorio.
- Repositorio: github.com/laxolingua/entre-todos.
