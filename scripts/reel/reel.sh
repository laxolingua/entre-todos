#!/bin/bash
# Uso: reel.sh ficha.json  →  <id>.mp4 (vertical 1080x1920, sin audio, fundido de 0,5 s entre diapositivas)
set -e
F=$1; DIR=$(dirname "$0"); ID=$(python3 -c "import json,sys;print(json.load(open('$F'))['id'])")
T=$(mktemp -d); N=$(NODE_PATH=/opt/npm-tools/node_modules node "$DIR/reel.js" "$F" "$T")
DUR=($(python3 -c "import json;d=json.load(open('$F'));du=d.get('duraciones',[3,5,8,5,7,5]);
du=du if (d.get('encuesta') or d.get('diapositivas')) else du[:4]+du[5:];print(' '.join(map(str,du)))"))
X=0.5; IN=""; FIL=""; OFF=0
for i in $(seq 1 $N); do d=${DUR[$((i-1))]}; IN="$IN -loop 1 -t $(python3 -c "print($d+$X)") -i $T/d$i.png"; done
PREV="[0:v]"; for i in $(seq 1 $((N-1))); do
  OFF=$(python3 -c "print($OFF+${DUR[$((i-1))]})"); FIL="$FIL$PREV[$i:v]xfade=transition=fade:duration=$X:offset=$OFF[v$i];"; PREV="[v$i]"; done
ffmpeg -y -loglevel error $IN -filter_complex "${FIL}${PREV}format=yuv420p[out]" -map "[out]" -r 30 -c:v libx264 -preset medium -crf 20 "$DIR/salida/$ID.mp4"
# Música propia (sin derechos de terceros) y volumen normalizado para redes
L=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$DIR/salida/$ID.mp4")
python3 "$DIR/musica.py" "$L" "$T/m.wav" >/dev/null
ffmpeg -y -loglevel error -i "$DIR/salida/$ID.mp4" -i "$T/m.wav" -c:v copy -c:a aac -b:a 192k -af "loudnorm=I=-16:TP=-1.5:LRA=11" -shortest "$DIR/salida/$ID-audio.mp4"
mv "$DIR/salida/$ID-audio.mp4" "$DIR/salida/$ID.mp4"
cp $T/d*.png "$DIR/salida/" 2>/dev/null || true; echo "$DIR/salida/$ID.mp4"
