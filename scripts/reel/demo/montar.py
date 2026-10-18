"""Monta el vídeo de demostración: grabación del móvil + rótulos por paso + portada y cierre + música."""
import json, subprocess, os
D = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(D)
def run(c): subprocess.run(c, shell=True, check=True)
t = json.load(open(f'{D}/fotogramas/tiempos.json')); m = dict(json.load(open(f'{D}/marcas.json')))
fin = m['fin'] + 0.8
fr = sorted(f for f in os.listdir(f'{D}/fotogramas') if f.endswith('.jpg'))
with open(f'{D}/lista.txt', 'w') as L:
    for i, f in enumerate(fr):
        d = (t[i + 1] if i + 1 < len(t) else fin) - t[i]
        L.write(f"file 'fotogramas/{f}'\nduration {max(d, 0.001):.3f}\n")
    L.write(f"file 'fotogramas/{fr[-1]}'\n")
run(f"cd {D} && ffmpeg -y -loglevel error -f concat -safe 0 -i lista.txt -vf fps=30,scale=732:1498 -t {fin:.2f} -pix_fmt yuv420p pantalla.mp4")
fases = [0, m['valorar'], m['aportes'], m['escribir'], m['enviar'], fin]
with open(f'{D}/fondos.txt', 'w') as L:
    for i in range(5): L.write(f"file 'fondo{i+1}.png'\nduration {fases[i+1]-fases[i]:.3f}\n")
    L.write("file 'fondo5.png'\n")
run(f"cd {D} && ffmpeg -y -loglevel error -f concat -safe 0 -i fondos.txt -i pantalla.mp4 -filter_complex '[0:v]fps=30,format=yuv420p[b];[b][1:v]overlay=190:702:shortest=1[v]' -map '[v]' -t {fin:.2f} -c:v libx264 -crf 19 centro.mp4")
# portada y cierre con la plantilla de los reels
run(f"cd {R} && NODE_PATH=/opt/npm-tools/node_modules node reel.js demo/extremos.json demo/ext >/dev/null")
X = 0.5; a, c = 3.5, 5.5
run(f"cd {D} && ffmpeg -y -loglevel error -loop 1 -t {a+X} -i ext/d1.png -i centro.mp4 -loop 1 -t {c} -i ext/d2.png "
    f"-filter_complex '[0:v]fps=30,format=yuv420p[a];[1:v]fps=30,format=yuv420p[m];[2:v]fps=30,format=yuv420p[c];"
    f"[a][m]xfade=transition=fade:duration={X}:offset={a}[am];[am][c]xfade=transition=fade:duration={X}:offset={a+fin-X}[v]' "
    f"-map '[v]' -c:v libx264 -crf 19 -r 30 sin-audio.mp4")
L = subprocess.run(f"ffprobe -v error -show_entries format=duration -of csv=p=0 {D}/sin-audio.mp4", shell=True, capture_output=True, text=True).stdout.strip()
run(f"python3 {R}/musica.py {L} {D}/m.wav >/dev/null")
run(f"cd {D} && ffmpeg -y -loglevel error -i sin-audio.mp4 -i m.wav -c:v copy -c:a aac -b:a 192k -af 'loudnorm=I=-16:TP=-1.5:LRA=11' -shortest demo-participar.mp4")
print(f'{D}/demo-participar.mp4', L)
