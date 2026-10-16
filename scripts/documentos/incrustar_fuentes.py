import zipfile,uuid,re,sys,shutil
src,dst=sys.argv[1],sys.argv[2]
fonts={"Barlow":{"Regular":__import__("os").path.join(__import__("os").path.dirname(__import__("os").path.abspath(__file__)),"recursos","fuentes","")+"Barlow-400.ttf","Bold":__import__("os").path.join(__import__("os").path.dirname(__import__("os").path.abspath(__file__)),"recursos","fuentes","")+"Barlow-700.ttf"},
       "Barlow Condensed":{"Bold":__import__("os").path.join(__import__("os").path.dirname(__import__("os").path.abspath(__file__)),"recursos","fuentes","")+"BarlowCondensed-800.ttf"}}
def obf(data,g):
    key=bytes.fromhex(g.replace('-',''))[::-1]
    b=bytearray(data)
    for i in range(32): b[i]^=key[i%16]
    return bytes(b)
zin=zipfile.ZipFile(src);files={n:zin.read(n) for n in zin.namelist()}
ft=files['word/fontTable.xml'].decode()
rels='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
n=0;entries=''
for fam,styles in fonts.items():
    emb=''
    for st,path in styles.items():
        n+=1;g='{'+str(uuid.uuid4()).upper()+'}'
        files[f'word/fonts/font{n}.odttf']=obf(open(path,'rb').read(),g[1:-1])
        rels+=f'<Relationship Id="rIdF{n}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/font" Target="fonts/font{n}.odttf"/>'
        emb+=f'<w:embed{st} r:id="rIdF{n}" w:fontKey="{g}"/>'
    entries+=f'<w:font w:name="{fam}"><w:charset w:val="00"/><w:family w:val="swiss"/><w:pitch w:val="variable"/>{emb}</w:font>'
rels+='</Relationships>'
ft=re.sub(r'<w:font w:name="Barlow( Condensed)?">.*?</w:font>','',ft,flags=re.S)
if 'xmlns:r=' not in ft[:500]: ft=ft.replace('<w:fonts ','<w:fonts xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ',1)
ft=ft.replace('</w:fonts>',entries+'</w:fonts>')
files['word/fontTable.xml']=ft.encode()
files['word/_rels/fontTable.xml.rels']=rels.encode()
ct=files['[Content_Types].xml'].decode()
if 'odttf' not in ct: ct=ct.replace('<Types ','<Types ',1).replace('</Types>','<Default Extension="odttf" ContentType="application/vnd.openxmlformats-officedocument.obfuscatedFont"/></Types>')
files['[Content_Types].xml']=ct.encode()
s=files['word/settings.xml'].decode()
if 'embedTrueTypeFonts' not in s:
    m=re.search(r'<w:displayBackgroundShape[^>]*/>',s)
    s=s[:m.end()]+'<w:embedTrueTypeFonts/>'+s[m.end():] if m else re.sub(r'(<w:settings[^>]*>)',r'\1<w:embedTrueTypeFonts/>',s,count=1)
files['word/settings.xml']=s.encode()
z=zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED)
for k,v in files.items(): z.writestr(k,v)
z.close()
