"""Contador de visitas anónimo, propio (sin servicios externos ni cookies).
Cada página envía a Supabase solo: sitio (Cuba/España), ruta, zona horaria del navegador y si es la
entrada de una visita (llega desde fuera del sitio). No guarda nada en el dispositivo ni envía IP propia.
Uso: python3 contador.py <pubdir>"""
import sys, glob
P = sys.argv[1]
URL = 'https://pfjcumyygdwslwtrlebr.supabase.co'
CLAVE = 'sb_publishable_gaor3DqGUprtjEQOmijZeQ_52oV_og8'
JS = ("<script>(function(){try{if(navigator.webdriver)return;var h=location.hostname,"
      "e=(h==='entre-todos.org'||h==='www.entre-todos.org')?'web':'pre',"
      "p=location.pathname.replace(/^\\/entre-todos-preview/,'')||'/';"
      "if(/^\\/panel(\\/|$)/.test(p))return;"
      "var s=/^\\/espana(\\/|$)/.test(p)?'es':'cu',r=document.referrer,n=true;"
      "try{n=!r||new URL(r).hostname!==h}catch(x){}"
      "var z='';try{z=Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch(x){}"
      f"fetch('{URL}/rest/v1/rpc/metricas_contar',{{method:'POST',keepalive:true,"
      f"headers:{{'apikey':'{CLAVE}','Content-Type':'application/json'}},"
      "body:JSON.stringify({p_sitio:s,p_ruta:p,p_zona:z,p_nuevo:n,p_entorno:e})}).catch(function(){})}catch(x){}})();</script>")
n = 0
for f in glob.glob(f'{P}/**/*.html', recursive=True):
    t = open(f, encoding='utf-8').read()
    if 'metricas_contar' in t or '</body>' not in t or '/panel/' in f.replace(P, ''): continue
    t = t.replace('</body>', JS + '</body>', 1)
    open(f, 'w', encoding='utf-8').write(t); n += 1
print('contador en', n, 'páginas')
