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
        s=re.sub(r'<noscript>\s*<link[^>]*flaticon[^>]*>\s*</noscript>','',s)
        s=re.sub(r'<link[^>]*flaticon[^>]*>','',s)
        if '/fonts/uicons-br.css' not in s: s=s.replace('</head>','<link rel="stylesheet" href="/fonts/uicons-br.css"></head>',1)
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
shutil.copy(D+'/index.html',P+'/index.html')
for d in ['academia','consulta','sobre','img','fonts','privacidad','seguridad','abrazos','cual-es-el-plan','diversidad-politica','constituyente','reconstruccion','perfil','cuba-eeuu','actualidad']:
    shutil.copytree(f'{D}/{d}',f'{P}/{d}',dirs_exist_ok=True)
# El directorio de actores cívicos sale del diseño nuevo (dossier de organizaciones); las fichas de cada actor siguen siendo las del banco.
shutil.copy(D+'/actores/index.html',P+'/actores/index.html')
for f in ['favicon.svg','favicon.png','apple-touch-icon.png']: shutil.copy(f'{D}/{f}',f'{P}/{f}')
for f in glob.glob(D+'/_astro/*'):
    if not os.path.exists(P+'/_astro/'+os.path.basename(f)): shutil.copy(f,P+'/_astro/')
# correo real de contacto (el antiguo entretodos@entre-todos.org no existe)
for f in glob.glob(P+'/*.html'):
    t=open(f,encoding='utf-8').read()
    if 'sosplanet@gmail.com' in t: t=t.replace('sosplanet@gmail.com','contacto.entretodos@gmail.com'); open(f,'w',encoding='utf-8').write(t)
    if 'entretodos@entre-todos.org' in t: open(f,'w',encoding='utf-8').write(t.replace('entretodos@entre-todos.org','contacto.entretodos@gmail.com'))
# páginas de la web anterior: redirección a su equivalente con el diseño nuevo
REDIR={
 'consulta-popular-cuba.html':'/consulta/continuidad-o-cambio/','consulta-fix-counters.html':'/consulta/continuidad-o-cambio/',
 'consulta-civica-11j-2026/index.html':'/consulta/solicitud-consulta-civica/',
 'politica-privacidad.html':'/privacidad/','transparencia-cuba.html':'/seguridad/','metodologia.html':'/metodo/',
 'abrazos.html':'/abrazos/','abrazo-anna-bensi.html':'/abrazos/anna-bensi/',
 'candidaturas-cuba.html':'/diversidad-politica/','candidatos/index.html':'/diversidad-politica/',
 'candidata-amelia-calzadilla-2026.html':'/diversidad-politica/amelia-calzadilla/',
 'candidato-armando-labrador-2026.html':'/diversidad-politica/armando-labrador/',
 'candidato-eduardo-arias-leon-2026.html':'/diversidad-politica/eduardo-arias-leon/',
 'candidato-luis-michel-cespedes-rodriguez-2026.html':'/diversidad-politica/luis-michel-cespedes/',
 'partido-libertario-cuba-2026.html':'/diversidad-politica/partido-libertario-de-cuba/',
 'partido-pro-derechos-humanos-cuba-2026.html':'/diversidad-politica/partido-pro-derechos-humanos-de-cuba/',
 'alternativa-no-partidista-cuba-2026.html':'/diversidad-politica/alternativa-no-partidista-de-cuba/',
 'candidato-plural-independiente-cuba.html':'/sobre/',
 'constituyente-cuba.html':'/constituyente/','proceso-constituyente-cuba.html':'/constituyente/','constituyente-workplan.html':'/constituyente/',
 'plan-reconstruccion-cuba.html':'/reconstruccion/','actor-carlos-saladrigas-2026.html':'/reconstruccion/','actor-fnca-caba-roadmap-2026.html':'/reconstruccion/','actor-jorge-mas-santos-2026.html':'/reconstruccion/',
 'propuestas-transicion-cuba.html':'/propuestas/','plataforma-gobierno-cuba.html':'/propuestas/','plataforma-gobierno/index.html':'/propuestas/','transicion/index.html':'/propuestas/categoria/transicion/',
 'gobierno-cuba.html':'/propuestas/','elecciones-cuba.html':'/propuestas/categoria/sistema_electoral/','elecciones-conformacion-cuba.html':'/propuestas/categoria/sistema_electoral/','elecciones/index.html':'/propuestas/categoria/sistema_electoral/',
 'implementacion-cuba.html':'/propuestas/','implementacion-rendicion-cuentas.html':'/propuestas/',
 'app.html':'/','index-fixed.html':'/','inicio-anterior.html':'/','info.html':'/sobre/','et-guia-visual.html':'/',
 'gobernanza-solucionaria-v4.html':'/sobre/','gobernanza-solucionaria-v5.html':'/sobre/',
 'miembro.html':'/perfil/','miembros.html':'/perfil/','perfil-usuario-demo.html':'/perfil/','perfil-mitch-real.html':'/sobre/',
 'perfil-demo-clara-marin.html':'/perfil/','perfil-demo-daniel-soto.html':'/perfil/','perfil-demo-lia-ortega.html':'/perfil/',
 'eval-portada/index.html':'/','eval-portada/academia_entre_todos_leccion_01.html':'/academia/','eval-portada/academia_hub_muestra.html':'/academia/',
}
plantilla='<!doctype html><html lang="es"><head><meta charset="utf-8"><title>ENTRE TODOS</title><meta name="robots" content="noindex"><link rel="canonical" href="https://entre-todos.org{u}"><meta http-equiv="refresh" content="0; url={u}"><script>location.replace("{u}"+location.hash)</script></head><body><p><a href="{u}">ENTRE TODOS</a></p></body></html>'
for viejo,nuevo in REDIR.items():
    destino=os.path.join(P,viejo)
    os.makedirs(os.path.dirname(destino),exist_ok=True)
    open(destino,'w',encoding='utf-8').write(plantilla.format(u=nuevo))
for d in ['consulta-civica-11j-2026','eval-portada']:
    for f in glob.glob(f'{P}/{d}/**/*',recursive=True):
        if os.path.isfile(f) and not f.endswith('.html'): os.remove(f)
print('redirecciones:',len(REDIR))
print('ok')
