#!/usr/bin/env bash
# Levanta un Postgres local desechable, aplica migraciones + datos y ejecuta las pruebas.
# Uso: bash scripts/probar_bd_local.sh
set -euo pipefail
RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
PGBIN="${PGBIN:-/usr/lib/postgresql/16/bin}"
DIR="$(mktemp -d)"
PUERTO="${PUERTO:-54329}"
chown postgres "$DIR" 2>/dev/null || true
como_pg() { if [ "$(id -u)" = 0 ]; then su postgres -s /bin/bash -c "$*"; else bash -c "$*"; fi; }

como_pg "$PGBIN/initdb -D $DIR/datos -U postgres --locale=C.UTF-8 -E UTF8 >/dev/null"
como_pg "$PGBIN/pg_ctl -D $DIR/datos -o '-p $PUERTO -k $DIR' -l $DIR/log.txt start -w >/dev/null"
trap 'como_pg "$PGBIN/pg_ctl -D $DIR/datos stop -m fast >/dev/null"; rm -rf "$DIR"' EXIT

P="psql -h $DIR -p $PUERTO -U postgres -d postgres -v ON_ERROR_STOP=1 -q"
$P -f "$RAIZ/supabase/tests/entorno_local.sql"
for m in "$RAIZ"/supabase/migrations/*.sql; do
  echo "migración: $(basename "$m")"
  $P -f "$m"
done
echo "datos: banco_seed.sql"
$P -f "$RAIZ/supabase/seed/banco_seed.sql"
echo "datos: segunda carga (debe ser idempotente)"
$P -f "$RAIZ/supabase/seed/banco_seed.sql"
$P -t -f "$RAIZ/supabase/tests/banco_pruebas.sql" 2>&1 | grep -E "ok |FALLA|ERROR|TODAS" | sed "s/^psql:[^ ]* NOTICE:  /  /"
