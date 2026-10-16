# EscalaAcuerdo
Escala de acuerdo de cinco niveles para valorar propuestas: cinco bloques paralelos inclinados, de rojo (en contra) a marino (a favor).

- Sustituye a las estrellas. Rótulos fijos: Muy en contra, En contra, Neutral, A favor, Muy a favor.
- En reposo cada bloque lleva su tono suave (`voto-N-suave`); el elegido toma el tono pleno (`voto-N`) y los demás bajan al 45 % de opacidad.
- Texto blanco solo en los niveles 1, 4 y 5 elegidos; en 2 y 3, texto marino (contraste).
- Es un grupo de radio accesible (`role="radiogroup"`, `aria-checked`). Se puede cambiar el voto.
- No se usa con derechos fundamentales: esos llevan la etiqueta «Derecho fundamental · no se vota».
- Umbral propuesto para la Plataforma plural de gobierno: 60 % A favor + Muy a favor con al menos 100 votos (pendiente de aprobación).
