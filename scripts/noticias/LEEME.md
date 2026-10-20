# Noticias de ENTRE TODOS: patrón

Instinct, ChatGPT o quien prepare una noticia escribe **solo la ficha JSON** y elige la foto. El diseño lo pone el generador. No se diseña a mano.

## Qué produce cada noticia

1. **Portada ancha** 1200 × 630: página de Actualidad y enlaces compartidos.
2. **Portada cuadrada** 1080 × 1080: grupo de Facebook e Instagram, con «Vota en la encuesta».
3. **Página de la noticia**, siempre con este orden:
   - antetítulo, titular, entradilla, fecha;
   - foto con pie y crédito;
   - Lo que pasó;
   - Las posiciones;
   - Contexto;
   - Por verificar;
   - Propuestas del banco relacionadas;
   - Tu opinión (encuesta);
   - Fuentes.

Ejemplo completo: `001-onu-cuba-libre.json`.

## Cómo se genera

```
NODE_PATH=/opt/npm-tools/node_modules node scripts/noticias/noticia.js 001-onu-cuba-libre
```

El resultado queda en `salida/<id>/`.

## La ficha (campos)

- `id`: número de tres cifras y tema corto, por ejemplo `002-presos-liberados`. La foto se guarda con el mismo nombre en `fotos/`.
- `fecha`: escrita como «20 de octubre de 2026».
- `seccion`: una o dos palabras, como ONU, Economía o Derechos.
- `titular`: hechos, no opinión. Debe nombrar a los actores y la acción, sin adjetivos.
- `entradilla`: dos frases como máximo. Qué, quién, cuándo y dónde.
- `foto`: `archivo`, `pie` (qué se ve, dónde y cuándo) y `credito`. Sin crédito no se publica.
- `hechos`: de tres a cinco frases, cada una comprobable.
- `posiciones`: al menos dos, con la misma extensión y el mismo formato. Cada una lleva `quien`, `texto` (sus ideas con sus palabras, sin adoptar su lenguaje) y `fuente`.
- `contexto`: un párrafo.
- `por_verificar`: lo que viene solo de prensa o sin original. Si todo está verificado, se deja vacío.
- `propuestas`: ids del banco relacionados, como máximo tres.
- `encuestas`: una o dos encuestas, cada una con una pregunta y de tres a cuatro opciones. Una opción siempre es «Necesito más información». La primera puede ser la cuestión del banco relacionada y la segunda, sobre el hecho de la noticia. Con dos encuestas, el botón de la portada cuadrada dice «Vota en las encuestas».
- `fuentes`: nombre del medio con su fecha y la URL.

## Reglas editoriales

- E/T no toma partido. Hechos y posiciones, cada una con su fuente.
- Las dos posiciones tienen el mismo peso: misma extensión y mismo diseño. No hay colores distintos por bando.
- Las citas textuales van entre comillas latinas «» y atribuidas. No se usa el vocabulario de una parte como si fuera de E/T.
- Lo no verificado se dice. Nunca se presenta una cifra de prensa como dato propio.
- La encuesta pregunta a la comunidad. No resume lo que piensa E/T.
- Sin lemas, sin «Esto no es X. Es Y.», sin emojis.

## Reglas visuales (las aplica el generador)

- **Foto del hecho:** del propio evento y pública. Se convierte a blanco y negro con brillo medio cerca de 100 y lado largo de 1400 px. El crédito va siempre visible. Es la única excepción a «sin políticos» del manual: en Actualidad la foto muestra el hecho.
- **Colores:** solo marino, rojo y amarillo. El amarillo nunca va como texto sobre blanco.
- **Diagonal única «/» a 60°:**
  - en la portada ancha, el panel marino corta la foto;
  - en la cuadrada, el bloque del logotipo;
  - en la página, la marca roja de cada sección.
- **Tipografía:** titulares en Barlow Condensed 800 en mayúsculas; texto en Barlow; logotipo en Montserrat 900, escrito como texto.
- **Esquinas:** rectas, con un radio máximo de 4 px.

## Texto para el grupo de Facebook

Se arma así: titular, una línea con la entradilla, «Lee las dos posiciones y sus fuentes en entre-todos.org/actualidad» y la encuesta con las opciones de la ficha.
