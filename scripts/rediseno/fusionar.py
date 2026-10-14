# Aplica el diseño compilado (web/dist) sobre una copia del sitio publicado, sin tocar el contenido del banco.
import re,os,glob,shutil,sys
D,P=sys.argv[1],sys.argv[2]
rd=lambda f: open(f,encoding='utf-8').read()
css=re.search(r'<style>(.*?)</style>',rd(D+'/propuestas/index.html'),re.S).group(1)
def trozo(s,a,b):
    i=s.index(a); j=s.index(b,i); return s[i:j]
cab={}
for sec,ref in [('propuestas','propuesta/presos-politicos/index.html'),('cuestiones','cuestiones/index.html'),('fuentes','fuentes/index.html'),('actores','actores/index.html'),('metodo','metodo/index.html'),('datos','datos/index.html')]:
    cab[sec]=trozo(rd(f'{D}/{ref}'),'<a class="saltar"','<main')
pie=trozo(rd(D+'/propuestas/index.html'),'<footer class="pie">','</body>')
mapa={'propuestas':'propuestas','propuesta':'propuestas','cuestiones':'cuestiones','fuentes':'fuentes','actores':'actores','metodo':'metodo','datos':'datos'}
n=0
for d,sec in mapa.items():
    for f in glob.glob(f'{P}/{d}/**/*.html',recursive=True):
        s=rd(f)
        if '<header class="cabecera">' not in s: print('SALTO',f); continue
        s=re.sub(r'<style>.*?</style>',lambda m:'<style>'+css+'</style>',s,count=1,flags=re.S)
        s=s[:s.index('<a class="saltar"')]+cab[sec]+s[s.index('<main'):]
        s=s[:s.index('<footer class="pie">')]+pie+s[s.index('</body>'):]
        s=s.replace('<meta name="theme-color" content="#f5f5f7" media="(prefers-color-scheme: light)"><meta name="theme-color" content="#0f0f11" media="(prefers-color-scheme: dark)">','<meta name="theme-color" content="#0b1d3f">')
        open(f,'w',encoding='utf-8').write(s); n+=1
print('paginas del banco:',n)
f=P+'/propuestas/index.html'; s=rd(f); mine=rd(D+'/propuestas/index.html')
ed=re.search(r'<p class="edicion">.*?</p>',s,re.S).group(0).replace('<p class="edicion">','<p class="edicion" style="margin-top:22px">')
pre=trozo(mine,'<main id="contenido">','<form class="buscador"')
pre=re.sub(r'<p class="edicion"[^>]*>.*?</p>',lambda m: ed,pre,count=1,flags=re.S)
i=s.index('<main'); j=s.index('<form class="buscador"'); k=s.index('</main>')
s=s[:i]+pre+s[j:k]+'</div></main>'+s[k+7:]
open(f,'w',encoding='utf-8').write(s)
if not os.path.exists(P+'/inicio-anterior.html'): shutil.copy(P+'/index.html',P+'/inicio-anterior.html')
shutil.copy(D+'/index.html',P+'/index.html')
for d in ['academia','consulta','sobre','img']:
    shutil.copytree(f'{D}/{d}',f'{P}/{d}',dirs_exist_ok=True)
for f in ['favicon.svg','favicon.png','apple-touch-icon.png']: shutil.copy(f'{D}/{f}',f'{P}/{f}')
for f in glob.glob(D+'/_astro/*'):
    if not os.path.exists(P+'/_astro/'+os.path.basename(f)): shutil.copy(f,P+'/_astro/')
print('ok')
