const fs=require('fs');
const {Document,Packer,Paragraph,TextRun,ImageRun,Header,Footer,AlignmentType,HorizontalPositionRelativeFrom,VerticalPositionRelativeFrom,TextWrappingType,PageNumber,BorderStyle,TabStopType,Table,TableRow,TableCell,WidthType,ShadingType,LevelFormat}=require('docx');
const MM=56.7; // twips per mm
const EMU=36000; // emu per mm
const F="Barlow", NAVY="0B1D3F", RED="D7192D", G2="3A4458", G3="5F6B80";
const cab=new ImageRun({type:'png',data:fs.readFileSync('cabecera-cuba.png'),transformation:{width:794,height:121},
  floating:{horizontalPosition:{relative:HorizontalPositionRelativeFrom.PAGE,offset:0},verticalPosition:{relative:VerticalPositionRelativeFrom.PAGE,offset:0},
  wrap:{type:TextWrappingType.NONE},behindDocument:true,allowOverlap:true}});
const pie=new ImageRun({type:'png',data:fs.readFileSync('pie.png'),transformation:{width:200,height:30},
  floating:{horizontalPosition:{relative:HorizontalPositionRelativeFrom.PAGE,offset:Math.round((210-52.9)*EMU)},verticalPosition:{relative:VerticalPositionRelativeFrom.PAGE,offset:Math.round((297-7.94)*EMU)},
  wrap:{type:TextWrappingType.NONE},behindDocument:true,allowOverlap:true}});
const t=(s,o={})=>new TextRun({text:s,font:F,...o});
const P=(runs,o={})=>new Paragraph({children:Array.isArray(runs)?runs:[runs],spacing:{after:160,line:300},...o});
function ficha(){
  const W=Math.round(170*MM), L=Math.round(108*MM), R=W-L;
  const sh={type:ShadingType.CLEAR,fill:"E8EDF7",color:"auto"};
  const nb={style:BorderStyle.NONE,size:0,color:"FFFFFF"};
  const lab=s=>t(s,{bold:true,color:RED,size:15,characterSpacing:10});
  const item=(n,s)=>new Paragraph({spacing:{after:40,line:260},children:[t(n+"  ",{bold:true,color:NAVY,size:19}),t(s,{size:19,color:"0B1630"})]});
  const meta=(k,v)=>new Paragraph({spacing:{after:40,line:260},children:[t(k+"  ",{bold:true,color:NAVY,size:17}),t(v,{size:17,color:G2})]});
  return new Table({width:{size:W,type:WidthType.DXA},columnWidths:[L,R],
    borders:{top:nb,bottom:nb,left:{style:BorderStyle.SINGLE,size:36,color:NAVY},right:nb,insideHorizontal:nb,insideVertical:{style:BorderStyle.SINGLE,size:4,color:"FFFFFF"}},
    rows:[new TableRow({children:[
      new TableCell({width:{size:L,type:WidthType.DXA},shading:sh,margins:{top:160,bottom:160,left:240,right:200},children:[
        new Paragraph({spacing:{after:80},children:[lab("CONTENIDO")]}),
        item("1","El sitio nuevo y el repositorio"),item("2","El espacio de «¿Cuál es el plan?»"),item("3","Los datos"),item("4","Cómo trabajamos en el código"),item("5","Acceso y contrato"),item("6","La encuesta junto a las propuestas"),item("7","Las fases 1, 2 y 3")]}),
      new TableCell({width:{size:R,type:WidthType.DXA},shading:sh,margins:{top:160,bottom:160,left:200,right:200},children:[
        new Paragraph({spacing:{after:80},children:[lab("FICHA")]}),
        meta("Ref.","E/T-Cu-2026-001"),meta("Fecha","19/10/2026"),meta("Para","Abraham, desarrollo elTOQUE"),meta("Estado","Versión 3")]})]})]});
}
const H=s=>new Paragraph({keepNext:true,keepLines:true,spacing:{before:240,after:100},children:[t(s,{bold:true,color:NAVY,size:24})]});
const B=s=>new Paragraph({numbering:{reference:"vin",level:0},spacing:{after:80,line:300},children:[t(s)]});
const N=s=>new Paragraph({numbering:{reference:"num",level:0},spacing:{after:80,line:300},children:[t(s)]});
const doc=new Document({
  creator:"ENTRE TODOS",title:"E/T-2026-001 Acceso al sitio nuevo de ENTRE TODOS",
  numbering:{config:[{reference:"vin",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:260}}}}]},{reference:"num",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:300}}}}]}]},
  styles:{default:{document:{run:{font:F,size:22,color:"0B1630"},paragraph:{spacing:{line:300}}}}},
  sections:[{
    properties:{page:{size:{width:11906,height:16838},margin:{top:Math.round(42*MM),bottom:Math.round(28*MM),left:Math.round(20*MM),right:Math.round(20*MM),header:0,footer:Math.round(12*MM)}}},
    headers:{default:new Header({children:[new Paragraph({children:[cab]})]})},
    footers:{default:new Footer({children:[
      new Paragraph({children:[pie]}),
      new Paragraph({border:{top:{style:BorderStyle.SINGLE,size:4,color:NAVY,space:6}},tabStops:[{type:TabStopType.RIGHT,position:Math.round(170*MM)}],
        children:[t("ENTRE TODOS",{bold:true,color:NAVY,size:16}),t("   ·   entre-todos.org   ·   contacto.entretodos@gmail.com",{color:G3,size:16}),
          t("\t",{size:16}),t("",{size:16,color:G3,children:[PageNumber.CURRENT]})]}),
    ]})},
    children:[
      P(t("DOCUMENTO OFICIAL  ·  CARTA",{bold:true,color:RED,size:16,characterSpacing:12}),{spacing:{after:120}}),
      P(t("EL SITIO NUEVO Y EL ESPACIO DE «¿CUÁL ES EL PLAN?»",{font:"Barlow Condensed",bold:true,color:NAVY,size:40}),{spacing:{before:0,after:220,line:276,lineRule:"auto"}}),
      ficha(),
      P(t(""),{spacing:{after:200}}),
      P(t("19 de octubre de 2026",{color:G3}),{alignment:AlignmentType.RIGHT,spacing:{after:240}}),
      P(t("Abraham (GitHub: dogcalas)",{bold:true}),{spacing:{after:0}}),
      P(t("Desarrollo, elTOQUE / Más Voces Foundation"),{spacing:{after:0}}),
      P(t("Copia: José Jasán Nieves y Taylí Sánchez (GitHub: taylisanchez-085)",{color:G3}),{spacing:{after:300}}),
      P(t("Hola, Abraham:")),
      P(t("Como quedamos en la reunión del 12 de octubre, te escribo para orientarte en el sitio nuevo de ENTRE TODOS, que es donde irá el módulo, y para dejar por escrito cómo vamos a trabajar.")),
      H("1. El sitio nuevo y el repositorio"),
      P(t("Lo que vieron en entre-todos.org es la versión anterior. La versión nueva está terminando de construirse y la puedes ver en laxolingua.github.io/entre-todos-preview (todavía no es pública y tiene la votación desactivada). El código está en github.com/laxolingua/entre-todos: la rama rediseno-2026-10-14 tiene el código fuente y la rama main es el sitio publicado. El repositorio es público, así que ya pueden clonarlo y revisarlo; las instrucciones para compilarlo están en TRASPASO-2026-10-14.md.")),
      P(t("ENTRE TODOS se está organizando por países. Esta es la edición de Cuba (E/T-Cu) y pronto saldrá la de España. El módulo vive en la edición de Cuba.")),
      H("2. El espacio de «¿Cuál es el plan?»"),
      P(t("La página es web/src/pages/cual-es-el-plan.astro. Dentro hay un bloque reservado (id=\"modulo-plan\") con un aviso de «Próximamente» que pusimos solo para no dejar el hueco vacío mientras ustedes trabajan. Es su espacio: pueden rehacerlo por completo y conectar lo que necesiten. Tal como acordamos en agosto, el módulo va integrado en ENTRE TODOS y desde él se llega al resto del sitio por la cabecera, el pie y el menú.")),
      H("3. Los datos"),
      P(t("Trabajamos con la misma base que verá el público, la que preparé y depuré para que no tengan que rehacer ese trabajo. En la vista previa son hoy 184 propuestas combinadas con sus incisos, en 18 categorías, con sus 83 documentos de origen. Las pueden descargar en laxolingua.github.io/entre-todos-preview/datos/propuestas.json (y .csv); también están en la rama publicacion-rediseno-2026-10-14 y estarán en la base de datos.")),
      P(t("Las preocupaciones, sus enlaces con las propuestas y los votos del módulo tendrán sus propias tablas, con un rol de edición limitado a ellas. El archivo interno de citas sigue siendo la base de trabajo de ENTRE TODOS y no forma parte de lo que se comparte, como ya conversamos.")),
      H("4. Cómo trabajamos en el código"),
      B("Los cambios entran a la rama rediseno-2026-10-14 por pull request; yo los reviso y los integro. La rama main está protegida."),
      B("Para que el sitio se lea como una sola pieza, dentro del módulo usamos el manual de identidad (marca/identidad/MANUAL-IDENTIDAD.md, con colores y medidas en tokens.css)."),
      B("Ustedes conocen mejor que nadie lo que necesita quien entra desde Cuba: páginas ligeras y nada que exponga a quien participa. ENTRE TODOS comparte ese compromiso y lo mantiene en todo el sitio: sin rastreadores ni servicios de terceros y pidiendo los mínimos datos."),
      H("5. Acceso y contrato"),
      P(t("Gracias por los usuarios de GitHub (dogcalas y taylisanchez-085). Como el repositorio es público, pueden empezar ya: hacen un fork, trabajan en él y me envían los cambios por pull request a la rama rediseno-2026-10-14. El acceso de escritura directo al repositorio y a las tablas del módulo lo activo para esos dos usuarios en cuanto firmemos el contrato que está preparando José. Quedo atento al borrador; por mi parte, envío las condiciones de ENTRE TODOS sobre datos, código y marca para incorporarlas al contrato como anexo.")),
      H("6. La encuesta junto a las propuestas"),
      P(t("Nos gustaría mostrar, junto a cada propuesta, los resultados publicados de la Encuesta Cuba 2026 que traten el mismo tema. Proponemos incluir esta cláusula en el contrato:")),
      new Paragraph({indent:{left:Math.round(6*MM)},border:{left:{style:BorderStyle.SINGLE,size:18,color:RED,space:10}},shading:{type:ShadingType.CLEAR,fill:"F2F4F8",color:"auto"},spacing:{after:200,line:290},children:[t("«elTOQUE autoriza a ENTRE TODOS a mostrar, junto a cada propuesta del banco, los resultados publicados de la Encuesta Cuba 2026 que traten el mismo tema. Cada resultado se mostrará con la pregunta tal como se formuló, la fecha, el número de respuestas y el método, con la indicación de que es un sondeo abierto y no una muestra representativa. Siempre se citará a elTOQUE y la coalición de medios como autores, con enlace a la fuente. ENTRE TODOS no sumará ni promediará estos resultados con los de otras encuestas. Si elTOQUE publica datos ajustados o ponderados, ENTRE TODOS usará esos.»",{italics:true,color:G2})]}),
      H("7. Las fases 1, 2 y 3"),
      P(t("Quedó pendiente la pregunta de Taylí. Las fases separan las propuestas según el momento en que se aplicarían: la transición, el proceso constituyente y el gobierno ya elegido. Hay además unos mínimos que no se votan, porque se dan por hechos en cualquier paso a la democracia, como la liberación de los presos políticos y el respeto de los derechos humanos. Si les sirve, lo vemos con más detalle en la próxima reunión.")),
      P(t("Cualquier duda, por el grupo de WhatsApp. Gracias por el trabajo que ya han adelantado."),{spacing:{before:200}}),
      P(t("Un abrazo,"),{spacing:{before:240,after:960}}),
      P(t("Michel Estopiñán Cuba",{bold:true}),{spacing:{after:0}}),
      P(t("Fundador y responsable, ENTRE TODOS",{color:G2})),
    ]}]});
Packer.toBuffer(doc).then(b=>fs.writeFileSync('Carta E-T-Cu-2026-001 v3.docx',b));
