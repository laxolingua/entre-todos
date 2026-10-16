# Documentos oficiales de E/T

Todos los documentos oficiales de ENTRE TODOS se hacen así. Modelo: documentos-oficiales/carta-de-identidad-E-T-Cu-2026-002.pdf.

## Cómo se ven
- Membrete con la cabecera del país (CUBA, ESPAÑA…), el corte diagonal y entre-todos.org.
- Primera página: «DOCUMENTO OFICIAL · TIPO» en rojo, el asunto en grande y un recuadro con CONTENIDO (índice numerado) y FICHA (Ref., Fecha, Para, Versión, Estado).
- Texto en Barlow, justificado; secciones numeradas en azul marino; subtítulos de principio en negrita marina; subsecciones en rojo.
- Pie con entre-todos.org, contacto.entretodos@gmail.com y número de página.
- Referencia: E/T-País-Año-Número (E/T-Cu-2026-003, E/T-Es-2026-001…), en orden por país y año.
- Nunca notas internas de trabajo dentro del documento.

## Cómo se generan
1. Escribe un JSON como ejemplo-carta-de-identidad.json: pais (cuba | espana), tipo, asunto, indice, ficha y bloques.
   Bloques: {"h": "1. Sección"}, {"h2": "Subsección"}, {"p": "Párrafo"}, {"b": "Título en negrita.", "p": "texto"}, {"vin": "viñeta"}, {"num": "punto numerado"}, {"p": "…", "derecha": true}, {"firma": "Nombre"}, {"cargo": "Cargo"}.
2. node generar.js documento.json salida.docx   (requiere el paquete npm docx)
3. python3 incrustar_fuentes.py salida.docx final.docx   (mete Barlow dentro del Word)
4. Para el PDF: abrir en Word o LibreOffice y exportar.
