# Encuestas del grupo de Facebook: consulta del día

Mismo sistema que el sitio, para que los resultados se puedan sumar a las fichas.

- **Escala:** las cinco opciones de la escala de acuerdo del sitio, siempre en este orden: Muy en contra, En contra, Neutral, A favor, Muy a favor. Cada opción lleva su imagen (`opcion-1.png` … `opcion-5.png`).
- **Código:** la pregunta empieza por el código de la propuesta, por ejemplo «P-001 · ¿Cuánto apoyas esta propuesta?». Es lo que permite pasar el resultado a su ficha.
- **Ajustes de Facebook, siempre apagados:** Allow members to add options y Allow people to choose multiple options.
- **Aviso:** la publicación dice siempre que el voto es visible para los miembros del grupo.
- **Duración:** 7 días. Al cerrar, se hace una captura y se anotan los votos de cada opción en la tabla de resultados.

Generar (desde scripts/encuestas-fb):

```
NODE_PATH=/opt/npm-tools/node_modules node encuesta.js <id de la propuesta> <código>
```

Ejemplo: `node encuesta.js presos-politicos P-001`. Sale en `salida/<código>/`: publicacion.png, opcion-1…5.png y simulacion-grupo.png.
