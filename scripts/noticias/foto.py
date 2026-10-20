"""Prepara la foto de una noticia: blanco y negro, lado largo 1400 px, brillo medio cerca de 100, JPEG 80 progresivo.
Uso: python3 foto.py <foto original> <id de la noticia>   (guarda fotos/<id>.jpg)"""
import sys, os
from PIL import Image, ImageOps, ImageStat, ImageEnhance
src, nid = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('L'); im.thumbnail((1400, 1400))
im = ImageOps.autocontrast(im, cutoff=1)
im = ImageEnhance.Brightness(im).enhance(100 / max(ImageStat.Stat(im).mean[0], 1))
im = ImageEnhance.Contrast(im).enhance(1.15)
dst = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fotos', nid + '.jpg')
im.save(dst, quality=80, progressive=True); print(dst, im.size, round(ImageStat.Stat(im).mean[0]))
