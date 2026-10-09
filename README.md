# ENTRE TODOS · desarrollo

Código del sitio nuevo de ENTRE TODOS. Primer módulo: el **banco de propuestas**.

## Qué hay aquí

| Carpeta | Contenido |
| --- | --- |
| `datos/fuente/` | Banco verbatim canónico (760 propuestas, 58 fuentes, 3 jul 2026). Nunca se edita. |
| `datos/curado/` | Atribución de cada fuente a un actor y nombres provisionales de 9 categorías. Se edita a mano. |
| `datos/generado/` | Banco normalizado (JSON) y datos abiertos (CSV). Lo genera el script. |
| `scripts/construir_banco.py` | Valida el banco y genera `datos/generado/` y la carga SQL. Falla si algo no cuadra. |
| `supabase/migrations/` | Base de datos: banco, valoraciones y aportes, módulo «¿Cuál es el plan?» de elTOQUE. |
| `supabase/seed/banco_seed.sql` | Carga del banco. Se puede ejecutar varias veces sin duplicar nada. |
| `supabase/tests/` | 32 pruebas de permisos, búsqueda, historial y privacidad. |
| `web/` | Sitio estático (Astro): 919 páginas, una por propuesta, fuente, actor, categoría y tema. |
| `vista-previa/` | El banco en un solo HTML navegable, para revisar sin desplegar. |

## Comandos

```bash
# 1. Regenerar datos (tras cambiar datos/curado o el banco fuente)
python3 scripts/construir_banco.py

# 2. Probar la base de datos en un Postgres local desechable (no toca Supabase)
bash scripts/probar_bd_local.sh

# 3. Sitio
cd web
npm install
npm run build        # datos + imágenes para compartir + sitio -> web/dist
npm run dev          # servidor local en http://localhost:4321
node scripts/generar_vista_previa.mjs   # vista previa en un solo archivo
```

## Cargar el banco en Supabase

Proyecto `pfjcumyygdwslwtrlebr`. Las migraciones crean un esquema propio (`banco`) y vistas `banco_*` / `cep_*` en `public`. No tocan las tablas del prototipo anterior.

```bash
supabase link --project-ref pfjcumyygdwslwtrlebr
supabase db push                                   # aplica supabase/migrations
psql "$SUPABASE_DB_URL" -f supabase/seed/banco_seed.sql   # carga las 760 propuestas
```

`SUPABASE_DB_URL` está en el panel de Supabase: Project Settings > Database > Connection string. Para deshacerlo: `drop schema banco cascade;` y borrar las vistas `public.banco_*` y `public.cep_*`.

Para activar las valoraciones de 1 a 5 estrellas:

1. Activar *Anonymous sign-ins* en Authentication.
2. Poner `PUBLIC_VALORACION=true` en `web/.env`.

## API pública (Supabase REST)

Base: `https://pfjcumyygdwslwtrlebr.supabase.co/rest/v1/` con la clave pública (`apikey`).

| Recurso | Qué devuelve |
| --- | --- |
| `GET banco_propuestas` | Propuestas publicadas con cita, fuente, autoría, categorías y tema. Admite filtros PostgREST, por ejemplo `?categorias=cs.{economia}`. |
| `POST rpc/banco_buscar` | Búsqueda de texto sin distinguir tildes: `{"q": "vivienda", "p_categoria": null, "p_limite": 50}`. |
| `GET banco_categorias`, `banco_fuentes`, `banco_actores`, `banco_temas` | Catálogos con sus conteos. |
| `GET banco_coincidencias_actores` | Pares de actores que proponen sobre los mismos temas (base del grafo). |
| `GET banco_historial` | Versiones anteriores de cada propuesta corregida. |
| `POST rpc/banco_valoracion_resumen` | Totales de valoración por propuesta. |
| `POST rpc/banco_valorar`, `rpc/banco_aportar` | Valorar (1-5) y aportar. Requieren sesión (anónima vale). |
| `GET cep_preocupaciones`, `cep_preocupacion_propuestas` | Módulo elTOQUE: preocupaciones ciudadanas y sus propuestas. |
| `POST rpc/registrar_busqueda_sin_resultado` | Registra un término sin resultados, sin datos de quien busca. |

## Reglas que el código hace cumplir

- Nadie escribe en el banco desde el navegador. Correcciones con clave de servicio; cada cambio guarda la versión anterior.
- Las valoraciones individuales no se pueden leer. Solo se publican totales.
- Los aportes entran como pendientes y solo se publican tras moderación (rol `moderador` o `admin`).
- El equipo de elTOQUE (rol `editor_cep`) edita sus preocupaciones, no el banco.
- Las páginas de lectura funcionan sin JavaScript. Cada página tiene su imagen 1200x630 para redes.

## Pendiente

- Verificar las atribuciones de `datos/curado/atribucion_fuentes.json` contra cada documento.
- Confirmar los nombres de las 9 categorías provisionales y si se fusionan las fuentes duplicadas (4/33, 2/46, 13/36, 14/37, 23/34, 45/50).
- Elegir hosting. Recomendado Cloudflare Pages: redirecciones 301, cabeceras de seguridad y ECH (activo por defecto en el plan gratuito), que dificulta los bloqueos por nombre de dominio en Cuba. Requiere que el dominio use los DNS de Cloudflare. GitHub Pages no permite redirecciones.
- Dirección visual definitiva. La actual es provisional: Inter, grises, bordes redondeados.
