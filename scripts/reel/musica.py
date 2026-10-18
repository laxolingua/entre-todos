"""Música propia para los reels (generada, sin derechos de terceros).
Estilo documental sobrio: pad de cuerdas suave, piano en arpegio y pulso grave.
Uso: python3 musica.py segundos salida.wav"""
import sys, numpy as np
from scipy.io import wavfile
from scipy.signal import fftconvolve
SR = 44100
dur = float(sys.argv[1]); out = sys.argv[2]
t_total = int(SR * dur)
mix = np.zeros((t_total, 2))
def f(n): return 440 * 2 ** ((n - 69) / 12)
# Progresión menor y abierta: Am - F - C - G (cada acorde ~4,2 s)
acordes = [[57, 60, 64], [53, 57, 60], [48, 55, 64], [55, 59, 62]]
bajo = [45, 41, 48, 43]
ac_dur = 4.2
def nota(freq, length, amp, ataque=0.01, caida=3.0, armon=(1, .5, .25, .12)):
    n = int(SR * length); t = np.arange(n) / SR
    w = sum(a * np.sin(2 * np.pi * freq * (k + 1) * t) for k, a in enumerate(armon))
    env = np.minimum(t / ataque, 1) * np.exp(-t * caida)
    return amp * w * env
def pad(freqs, length, amp):
    n = int(SR * length); t = np.arange(n) / SR
    w = sum(np.sin(2 * np.pi * fr * t) + .3 * np.sin(2 * np.pi * fr * 2.002 * t) + .2 * np.sin(2 * np.pi * fr * .999 * t) for fr in freqs)
    env = np.minimum(t / 1.2, 1) * np.minimum((length - t) / 1.2, 1)
    return amp * w * env
def poner(sig, ini, pan=0.0):
    i = int(SR * ini); j = min(i + len(sig), t_total)
    if j <= i: return
    s = sig[: j - i]
    mix[i:j, 0] += s * (1 - pan) ; mix[i:j, 1] += s * (1 + pan)
k = 0; t0 = 0.0
while t0 < dur:
    ch = acordes[k % 4]
    poner(pad([f(n) for n in ch], ac_dur + 1.2, .05), t0)
    poner(nota(f(bajo[k % 4]), ac_dur, .16, ataque=.05, caida=.6, armon=(1, .3)), t0)
    arp = [ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12, ch[2] + 12, ch[0] + 24, ch[2] + 12, ch[1] + 12]
    if t0 >= 3.0:  # el piano entra tras la pregunta inicial
        for i, n in enumerate(arp):
            poner(nota(f(n), 2.2, .07, caida=2.2), t0 + i * ac_dur / 8, pan=(-.3 if i % 2 else .3))
    # pulso suave en cada tiempo
    if t0 >= 8.0:
        for b in range(4):
            poner(nota(55, .5, .12, ataque=.005, caida=9, armon=(1,)), t0 + b * ac_dur / 4)
    t0 += ac_dur; k += 1
# reverberación sencilla
ir_t = np.arange(int(SR * 2.2)) / SR
ir = np.random.default_rng(1).standard_normal(len(ir_t)) * np.exp(-ir_t * 3)
for c in range(2):
    mix[:, c] = mix[:, c] * .8 + .12 * fftconvolve(mix[:, c], ir)[:t_total] / np.max(np.abs(ir)) / 30
# fundidos de entrada y salida
fi = int(SR * 1.0); fo = int(SR * 2.0)
mix[:fi] *= np.linspace(0, 1, fi)[:, None]; mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix /= np.max(np.abs(mix)) / 0.6
wavfile.write(out, SR, (mix * 32767).astype(np.int16))
print(out)
