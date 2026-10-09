# ENTRE TODOS · desarrollo

Código del sitio de propuestas y de su base de datos. Rama `desarrollo`; `main` es el sitio en vivo.

## Dos capas, dos repositorios

| Capa | Dónde | Quién la ve |
| --- | --- | --- |
| Propuestas combinadas: texto, incisos, variantes, cuestiones, autorías y enlace a cada documento original | Este repositorio (`web/src/data/publico.json`), el sitio y la API pública | Todo el mundo |
| Banco: citas, localización, clasificación, temas, exclusiones, verificación y carga SQL | Repositorio privado `laxolingua/entre-todos-banco` | Solo el equipo de ENTRE TODOS |

El banco es el back end y no se publica ni se entrega a socios. Este repositorio ignora `datos/`, `supabase/seed/` y `vista-previa/` para que nunca se suban por error.

## Qué hay aquí

| Ruta | Qué es |
| --- | --- |
| `scripts/construir_banco.py` | Valida el banco (privado) y genera la capa pública, los CSV internos y la carga SQL. Falla si algo no cuadra o si la capa pública lleva datos del banco. |
| `supabase/migrations/` | Esquema, permisos, participación y módulo elTOQUE. La última migración (`banco_privado`) cierra el banco a la API pública. |
| `supabase/tests/` | Pruebas de carga, privacidad del banco, permisos, búsqueda, participación e historial. |
| `web/` | Sitio estático (Astro). Se construye solo con `web/src/data/publico.json`. |
| `web/scripts/generar_vista_previa.mjs` | Vista previa de las propuestas en un solo HTML (solo capa pública). |

## Comandos

```bash
# Construir el sitio (no necesita el banco)
cd web && npm install && npm run build

# Regenerar datos desde el banco (solo el equipo)
# 1. Copiar datos/ y supabase/seed/ desde laxolingua/entre-todos-banco a esta carpeta.
python3 scripts/construir_banco.py
bash scripts/probar_bd_local.sh        # Postgres local desechable; no toca Supabase
# 2. Si cambiaron datos/ o supabase/seed/, subirlos al repositorio PRIVADO, nunca a este.
```

## Cargar en Supabase

Proyecto `pfjcumyygdwslwtrlebr`. Las migraciones crean el esquema `banco` y vistas `banco_*` / `cep_*` en `public`. No tocan las tablas del prototipo anterior.

```bash
supabase link --project-ref pfjcumyygdwslwtrlebr
supabase db push                                            # aplica supabase/migrations
psql "$SUPABASE_DB_URL" -f supabase/seed/banco_seed.sql     # carga (archivo del repositorio privado)
```

El esquema `banco` no debe añadirse nunca a los esquemas expuestos de la API (Project Settings > API). El equipo consulta el banco completo desde el panel de Supabase.

Para activar estrellas y aportes: activar *Anonymous sign-ins* en Authentication y poner `PUBLIC_PARTICIPACION=true` en `web/.env`.

## API pública (Supabase REST)

Base: `https://pfjcumyygdwslwtrlebr.supabase.co/rest/v1/` con la clave pública (`apikey`).

| Recurso | Qué devuelve |
| --- | --- |
| `GET banco_consolidadas` | Propuestas con texto, incisos, variantes, documentos (ids), autorías y cuestiones. |
| `GET banco_documentos` | Documentos: título, autoría, año, tipo y enlace al original. |
| `GET banco_consolidada_documentos` | Qué documento respalda cada propuesta y con qué papel. |
| `GET banco_cuestiones` | Cuestiones con alternativas y sus opciones. |
| `POST rpc/banco_buscar_consolidadas` | Búsqueda sin distinguir tildes: `{"q": "vivienda", "p_categoria": null, "p_limite": 50}`. Devuelve propuestas. |
| `GET banco_categorias`, `banco_actores` | Catálogos con su número de propuestas. |
| `GET banco_coincidencias_actores`, `banco_divergencias_actores` | Actores que plantean lo mismo, y los que eligen opciones distintas en una cuestión. |
| `GET banco_consolidada_historial` | Versiones anteriores de cada propuesta corregida. |
| `POST rpc/banco_valoracion_resumen` | Totales de valoración por propuesta. |
| `POST rpc/banco_valorar`, `rpc/banco_aportar`, `rpc/banco_apoyar_aporte` | Valorar (1-5), aportar y apoyar aportes. Requieren sesión (anónima vale). |
| `GET banco_aportes`, `banco_buenas_practicas` | Aportes publicados con sus apoyos; buenas prácticas verificadas. |
| `GET cep_preocupaciones`, `cep_preocupacion_propuestas` | Módulo elTOQUE: preocupaciones ciudadanas y sus propuestas. |
| `POST rpc/registrar_busqueda_sin_resultado` | Registra un término sin resultados, sin datos de quien busca. |

## Reglas que el código hace cumplir

- El banco no sale por la API pública ni por el sitio. Las pruebas fallan si una vista pública expone citas.
- Nadie escribe en el banco desde el navegador. Cada cambio guarda la versión anterior.
- Las valoraciones individuales no se pueden leer; solo se publican totales.
- Los aportes entran como pendientes y se publican tras moderación (rol `moderador` o `admin`).
- El equipo de elTOQUE (rol `editor_cep`) edita sus preocupaciones, no las propuestas.
- Las páginas de lectura funcionan sin JavaScript. Cada página tiene su imagen 1200x630 para redes.

## Pendiente

- Elegir hosting. Recomendado Cloudflare Pages: redirecciones 301, cabeceras de seguridad y ECH (activo por defecto en el plan gratuito). GitHub Pages no permite redirecciones.
- Dirección visual definitiva. La actual es provisional: Inter, grises, bordes redondeados.
