# Encuestas del grupo de Facebook: consulta del día

Mismo sistema que el sitio, para que los resultados se puedan sumar a las fichas.

- **Escala:** las cinco opciones de la escala de acuerdo del sitio, siempre en este orden: Muy en contra, En contra, Neutral, A favor, Muy a favor.
- **Dos posts por encuesta, siempre (decidido por Mitch):**
  1. Primero se publica la encuesta. Su encabezado repite la noticia o la propuesta, con su código, y la pregunta, para que los datos se puedan recoger bien aunque se vea suelta. Facebook permite una foto solo en la pregunta, no en las opciones; las opciones van en texto.
  2. Después, en un post aparte, la imagen con el contexto y la indicación de votar.
  - Facebook muestra primero lo último publicado, así que en el grupo se ve arriba el contexto y justo debajo la encuesta.
  - Con varias encuestas: encuesta 1, encuesta 2 y, al final, el post de contexto.
  - Las imágenes `opcion-1…5.png` quedan sin uso.
- **Qué imagen va en cada sitio (noticias):**
  - En la foto de la pregunta de cada encuesta va su `tarjeta-encuesta-N.png`.
  - El post de contexto lleva la portada cuadrada de la noticia (`noticias/salida/<id>/portada-cuadrada.png`), con el titular, la entradilla y la indicación de votar en el texto. Es un solo post de contexto para todas las encuestas de la noticia, publicado después de la última encuesta.
- **Código:** el encabezado de la encuesta empieza por el código de la propuesta, por ejemplo «P-001 · ¿Cuánto apoyas esta propuesta?». Es lo que permite pasar el resultado a su ficha.
- **Ajustes de Facebook, siempre apagados:** Allow members to add options y Allow people to choose multiple options.
- **Aviso:** la publicación dice siempre que el voto es visible para los miembros del grupo.
- **Duración:** 7 días. Al cerrar, se hace una captura y se anotan los votos de cada opción en la tabla de resultados.

Generar (desde scripts/encuestas-fb):

```
NODE_PATH=/opt/npm-tools/node_modules node encuesta.js <id de la propuesta> <código>
```

Ejemplo: `node encuesta.js presos-politicos P-001`. Sale en `salida/<código>/`: publicacion.png, opcion-1…5.png y simulacion-grupo.png.

## Encuestas de una noticia

Una imagen por encuesta, con la foto del hecho, la pregunta y las opciones:

```
NODE_PATH=/opt/npm-tools/node_modules node tarjeta.js <id de la noticia>
```

Ejemplo: `node tarjeta.js 001-onu-cuba-libre`. Sale en `salida/<id>/`: tarjeta-encuesta-1.png, tarjeta-encuesta-2.png.

Código de las encuestas de noticias: número de la noticia y número de encuesta, por ejemplo «N-001-1».
