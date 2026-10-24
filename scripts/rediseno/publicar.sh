# Publica en la vista previa: compila, fusiona con main, aplica los pasos y empuja las tres ramas.
# Uso: bash scripts/rediseno/publicar.sh "mensaje del commit"
set -e
MSG="$1"
cd /tmp/et/web && export PUBLIC_SUPABASE_URL=https://pfjcumyygdwslwtrlebr.supabase.co PUBLIC_SUPABASE_ANON_KEY=sb_publishable_gaor3DqGUprtjEQOmijZeQ_52oV_og8 PUBLIC_PARTICIPACION=true PUBLIC_TURNSTILE_SITEKEY=0x4AAAAAAFfbyky0YsME0feo && npm run build:rapido 2>&1 | tail -1
cd /tmp/pub && git reset -q --hard origin/main && git clean -fdq
cd /tmp/et/scripts/rediseno && python3 fusionar.py /tmp/et/web/dist /tmp/pub >/dev/null && python3 gs.py /tmp/pub >/dev/null
for s in enriquecer anios encuestas sondeos no_traducir datos_abiertos buscador og og_propuestas ligera contador; do python3 $s.py /tmp/pub >/dev/null; done
cp /tmp/et/web/public/asistente/corpus.json /tmp/pub/asistente/corpus.json
node /tmp/et/scripts/rediseno/comprobar.mjs /tmp/pub || { echo 'NO SE PUBLICA: corrige lo anterior'; exit 1; }
T="

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01N9aobFCYm1Z5XzM3oAhg63"
cd /tmp/pub && git add -A && git commit -qm "$MSG$T" && git push -qf origin HEAD:publicacion-rediseno-2026-10-14 2>&1 | grep -v "^warning\|gc\|prune\|Automatic" || true
cd /home/claude/entre-todos-preview && git pull -q --rebase && python3 /tmp/et/scripts/rediseno/prefijo_preview.py /tmp/pub /home/claude/entre-todos-preview >/dev/null && git add -A && (git commit -qm "$MSG$T" && git push -q) 2>&1 | grep -v "^warning\|gc\|prune\|Automatic" || true
cd /tmp/et && git add -A && (git commit -qm "$MSG$T" && git push -q origin HEAD:rediseno-2026-10-14) 2>&1 | grep -v "^warning\|gc\|prune\|Automatic" || true
echo PUBLICADO
