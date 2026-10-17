# Rediseño VOZ + VOTO: cómo se aplica

El banco publicado (rama main) tiene más propuestas que web/src/data/publico.json, porque se
incorporaron directamente en el HTML. Por eso el diseño no se recompila desde los datos: se aplica
encima de lo publicado, sin tocar el contenido.

1. cd web && npm run build:rapido
2. Copia limpia de main en otra carpeta (git worktree add ../pub origin/main)
3. python3 scripts/rediseno/fusionar.py web/dist ../pub     (estilo, cabecera, pie, páginas nuevas)
4. python3 scripts/rediseno/enriquecer.py ../pub             (barra de categorías, tarjetas con foto, ficha)
5. python3 scripts/rediseno/no_traducir.py ../pub    (después de encuestas.py: ENTRE TODOS y E/T con translate="no",
   para que los traductores automáticos no los cambien por «Between us»)
   fusionar.py crea .nojekyll: sin él GitHub Pages no sirve la carpeta _astro y los botones de las páginas (como «Convertir en lección») no funcionan.
   enriquecer.py monta la escala de acuerdo y los aportes en cada propuesta (desactivados hasta publicar con Supabase).
6. Revisar, guardar main como rama estable-AAAA-MM-DD y publicar solo con el «publica» de Mitch.

Fotos: web/public/img/fotos/. Las actuales son provisionales; se sustituyen por las definitivas
con el mismo nombre (portada, propuestas, academia, consulta, morro, sobre, cat-<categoría>.jpg).
