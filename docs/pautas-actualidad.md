# Pautas de Actualidad

Fecha: 22 de octubre de 2026. Para quien prepare las fichas de Actualidad (Nico o cualquier agente). Claude revisa antes de publicar.

## Qué entra

Hechos de Cuba y alrededor de Cuba que pueden llevar a un cambio, que muestran lo que no funciona o que tienen que ver con el futuro del país. Se miran desde la ciudadanía, no desde el Gobierno.

Entra:
- leyes, decretos y medidas nuevas, con lo que cambian para la gente;
- derechos: detenciones, presos políticos, censura, libertad de prensa, de reunión o religiosa;
- economía real: precios, salarios, apagones, abastecimiento, sector privado, remesas;
- sociedad civil: organizaciones, iniciativas ciudadanas, proyectos comunitarios;
- emigración y diáspora: normas, cifras, derechos de quienes viven fuera;
- relación de Cuba con otros países cuando afecta a la vida en la isla;
- informes y datos verificables: encuestas, observatorios, estudios.

No entra:
- declaraciones sin hechos detrás, rumores o noticias de una sola fuente no verificable;
- sucesos sin relación con un cambio posible (crónica roja, farándula);
- opinión. Se puede citar una crítica, pero atribuida a quien la hace.

## Cuántas y cuándo

Entre 3 y 5 fichas por semana, bien trabajadas. Mejor tres buenas que diez flojas. Se publican de lunes a jueves; el viernes se revisa la semana.

## Cada ficha lleva

Todo va en `web/src/data/actualidad.json`, dentro de `piezas`.

| Campo | Qué es | Reglas |
|---|---|---|
| id | Nombre corto para la dirección web | minúsculas y guiones, sin tildes: `ley-vivienda-187` |
| fecha | Día del hecho o de su publicación | `dd/mm/aaaa` |
| categoria | Categoría del banco | una de: transicion, sistema_electoral, derechos, economia, trabajo, vivienda, salud, educacion, alimentacion, familia, genero, tercera_edad, medio_ambiente, animales, sociedad_civil, reconstruccion, constitucion, modelo_pais |
| titular | Titular propio | informativo y neutro, con el dato principal; nunca copiado del medio; sin adjetivos de juicio |
| resumen | Dos frases | lo que pasó y por qué es noticia |
| esencial | 4 a 6 puntos | cada punto un hecho concreto (cifras, fechas, nombres de normas) y los medios que lo dicen en `f` |
| importa | Una frase | a quién afecta y por qué; neutra, sin decir qué hay que pensar |
| propuestas | Ids del banco | al menos una; las más directamente relacionadas primero |
| sondeo | Opcional | solo si existe de verdad un sondeo en redes: `{codigo, pregunta, enlace, red}` |
| cobertura | Lista de medios | `{medio, titulo, url}`; mínimo dos fuentes; incluir la prensa oficial si lo cuenta |
| puntoCiego | true o false | true solo si se buscó en Granma, Cubadebate y la Gaceta Oficial y no aparece |
| notaPuntoCiego | Si puntoCiego es true | «No encontramos esta noticia en la prensa oficial cubana (búsqueda del [fecha]).» |

El tipo de cada medio (independiente en Cuba, exilio, oficial, internacional) está en `web/src/data/medios.json`. Si aparece un medio nuevo, se añade allí.

## Cómo escribir

- Solo lo que dicen las fuentes enlazadas. Si dos fuentes se contradicen, se dice y se atribuye cada versión.
- Cifras exactas, con su fuente. Nada de «miles» si la fuente da un número.
- Las críticas y valoraciones siempre atribuidas: «Diario de Cuba critica que…».
- Frases cortas. Sin eslóganes, sin emojis, sin «Esto no es X. Es Y.».
- Nombres de personas solo cuando son parte del hecho (un detenido, un funcionario que firma una norma). Nunca datos privados.
- Español de Cuba, claro, para alguien que lee en el teléfono.

## Imágenes

Nunca fotos de los medios citados (derechos de autor). La ficha usa la foto de su categoría con el corte rojo y la marca ENTRE TODOS; se pone sola según `categoria`.

## Huecos del banco

Si un tema se repite en las noticias y ninguna propuesta del banco lo trata, se anota al final del documento 049 de Drive (sección «Huecos del banco») con la fecha y los enlaces. Esos huecos alimentan nuevas propuestas.

## Antes de publicar

1. Abrir cada enlace y comprobar que dice lo que pone la ficha.
2. Comprobar que cada id de `propuestas` existe en el banco.
3. Buscar el hecho en la prensa oficial antes de marcar punto ciego.
4. Claude revisa el texto y publica en la vista previa. A la web principal solo con el «publica» de Mitch.

## Archivo

Las noticias anteriores al formato de ficha siguen en `noticias` y aparecen en la pestaña Archivo. No se añaden más a esa lista.
