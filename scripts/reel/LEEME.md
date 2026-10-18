# Reels de propuestas

Patrón maestro aprobado por Mitch el 18/10/2026: 6 diapositivas verticales (1080x1920), sin narración y unos 33 segundos.

1. Pregunta gancho sobre la foto de la categoría (3 s).
2. La propuesta: título y resumen (5 s).
3. Qué incluye: los incisos, copiados literalmente del banco (8 s).
4. Documentada desde el año y número de documentos (5 s).
5. Qué dicen las encuestas: cifra, pregunta, fuente y nota de que no mide el texto exacto (7 s). Si no hay encuesta, esta diapositiva se omite.
6. Invitación sin botones. Si `derecho: true`, la pregunta es «¿Cómo debería garantizarse?», porque los derechos fundamentales no se votan (5 s).

Uso: `./reel.sh ficha.json` deja el MP4 y las imágenes en `salida/`.
Ficha: ver `pluripartidismo.json`. Para preparar fichas (Instinct o ChatGPT): textos literales del banco publicado, encuesta solo de la hoja 021, sin nombres de autores.

Audio: `musica.py` genera una pista propia de estilo documental (pad, piano en arpegio y pulso grave; el piano entra tras la pregunta y el pulso desde la diapositiva 3). No usa música de terceros. Si se publica con música de la biblioteca de TikTok o Instagram, subir la versión sin audio.
