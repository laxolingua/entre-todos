"""Música propia para los reels (generada, sin derechos de terceros).
Estilo optimista y con ritmo (inspiracional, ~108 bpm, tonalidad mayor):
pulsación de marimba/piano en corcheas, bajo sincopado, bombo, palmas y charles.
Estructura: intro ligera (pregunta) -> entra el ritmo completo -> final abierto.
Uso: python3 musica.py segundos salida.wav"""
import sys, numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve
SR = 44100
dur = float(sys.argv[1]); out = sys.argv[2]
N = int(SR * dur); mix = np.zeros((N, 2)); rng = np.random.default_rng(7)
BPM = 108; beat = 60 / BPM; bar = 4 * beat
def f(n): return 440 * 2 ** ((n - 69) / 12)
def poner(sig, ini, pan=0.0, vol=1.0):
    i = int(SR * ini); j = min(i + len(sig), N)
    if j <= i or i < 0: return
    s = sig[: j - i] * vol
    mix[i:j, 0] += s * (1 - pan); mix[i:j, 1] += s * (1 + pan)
def tono(freq, length, ataque=.004, caida=4.0, armon=(1, .45, .2, .08)):
    t = np.arange(int(SR * length)) / SR
    w = sum(a * np.sin(2 * np.pi * freq * (k + 1) * t) for k, a in enumerate(armon))
    return w * np.minimum(t / ataque, 1) * np.exp(-t * caida)
def bombo():
    t = np.arange(int(SR * .35)) / SR
    return np.sin(2 * np.pi * (50 + 90 * np.exp(-t * 30)) * t) * np.exp(-t * 9)
def palma():
    t = np.arange(int(SR * .18)) / SR; n = rng.standard_normal(len(t))
    return n * np.exp(-t * 28) * .6
def charles():
    t = np.arange(int(SR * .05)) / SR; n = rng.standard_normal(len(t))
    n = np.diff(np.concatenate([[0], n]))  # más brillante
    return n * np.exp(-t * 90) * .25
def pad(freqs, length):
    t = np.arange(int(SR * length)) / SR
    w = sum(np.sin(2 * np.pi * fr * t) + .25 * np.sin(2 * np.pi * fr * 1.003 * t) for fr in freqs)
    return w * np.minimum(t / .4, 1) * np.minimum((length - t) / .4, 1)
# Progresión luminosa: C - G - Am - F
acordes = [[60, 64, 67], [59, 62, 67], [57, 60, 64], [57, 60, 65]]
bajos = [36, 43, 45, 41]
ritmo_ini = 3.0     # el ritmo completo entra tras la pregunta
k = 0; t0 = 0.0
while t0 < dur:
    ch = acordes[k % 4]; b = bajos[k % 4]
    poner(pad([f(n) for n in ch], bar + .3), t0, vol=.035)
    # pulsación en corcheas (marimba/piano)
    patron = [ch[0] + 12, ch[2], ch[1] + 12, ch[2], ch[0] + 12, ch[2] + 12, ch[1] + 12, ch[2]]
    for i, n in enumerate(patron):
        poner(tono(f(n), .6, caida=7), t0 + i * beat / 2, pan=(.25 if i % 2 else -.25), vol=.11)
    if t0 >= ritmo_ini - .01:
        # bajo sincopado
        for pos in (0, 1.5, 2, 3.5):
            poner(tono(f(b), .45, ataque=.01, caida=5, armon=(1, .5, .15)), t0 + pos * beat, vol=.22)
        for x in range(4):
            if x in (0, 2): poner(bombo(), t0 + x * beat, vol=.5)
            if x in (1, 3): poner(palma(), t0 + x * beat, vol=.22)
        for x in range(8): poner(charles(), t0 + x * beat / 2, pan=.4, vol=(.35 if x % 2 else .2))
        # melodía corta cada dos compases, después de la diapositiva 3
        if t0 >= 8.0 and k % 2 == 0:
            for i, n in enumerate([ch[2] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24]):
                poner(tono(f(n), 1.0, caida=3, armon=(1, .2)), t0 + (i * 1.0) * beat, vol=.07, pan=.1)
    t0 += bar; k += 1
ir_t = np.arange(int(SR * 1.2)) / SR
ir = rng.standard_normal(len(ir_t)) * np.exp(-ir_t * 5)
for c in range(2):
    mix[:, c] = mix[:, c] + .08 * fftconvolve(mix[:, c], ir)[:N] / np.max(np.abs(ir)) / 25
fi = int(SR * .4); fo = int(SR * 1.8)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]; mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix /= np.max(np.abs(mix)) / .7
wavfile.write(out, SR, (mix * 32767).astype(np.int16)); print(out)
