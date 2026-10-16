const fs=require('fs');const path=require('path');const SPEC=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const DIR=path.join(__dirname,'recursos');
const {Document,Packer,Paragraph,TextRun,ImageRun,Header,Footer,AlignmentType,HorizontalPositionRelativeFrom,VerticalPositionRelativeFrom,TextWrappingType,PageNumber,BorderStyle,TabStopType,Table,TableRow,TableCell,WidthType,ShadingType,LevelFormat}=require('docx');
const MM=56.7; // twips per mm
const EMU=36000; // emu per mm
const F="Barlow", NAVY="0B1D3F", RED="D7192D", G2="3A4458", G3="5F6B80";
const cab=new ImageRun({type:'png',data:fs.readFileSync(path.join(DIR,'cabecera-'+(SPEC.pais||'cuba')+'.png')),transformation:{width:794,height:121},
  floating:{horizontalPosition:{relative:HorizontalPositionRelativeFrom.PAGE,offset:0},verticalPosition:{relative:VerticalPositionRelativeFrom.PAGE,offset:0},
  wrap:{type:TextWrappingType.NONE},behindDocument:true,allowOverlap:true}});
const pie=new ImageRun({type:'png',data:fs.readFileSync(path.join(DIR,'pie.png')),transformation:{width:200,height:30},
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
        ...SPEC.indice.map((x,i)=>item(String(i+1),x))]}),
      new TableCell({width:{size:R,type:WidthType.DXA},shading:sh,margins:{top:160,bottom:160,left:200,right:200},children:[
        new Paragraph({spacing:{after:80},children:[lab("FICHA")]}),
        ...Object.entries(SPEC.ficha).map(([k,v])=>meta(k,v))]})]})]});
}
const H=s=>new Paragraph({keepNext:true,keepLines:true,spacing:{before:240,after:100},children:[t(s,{bold:true,color:NAVY,size:24})]});
const B=s=>new Paragraph({numbering:{reference:"vin",level:0},spacing:{after:80,line:300},children:[t(s)]});
const N=s=>new Paragraph({numbering:{reference:"num",level:0},spacing:{after:80,line:300},children:[t(s)]});
const doc=new Document({
  creator:"ENTRE TODOS",title:SPEC.ficha["Ref."]+" "+SPEC.asunto,
  numbering:{config:[{reference:"vin",levels:[{level:0,format:LevelFormat.BULLET,text:"•",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:260}}}}]},{reference:"num",levels:[{level:0,format:LevelFormat.DECIMAL,text:"%1.",alignment:AlignmentType.LEFT,style:{paragraph:{indent:{left:360,hanging:300}}}}]}]},
  styles:{default:{document:{run:{font:F,size:22,color:"0B1630"},paragraph:{spacing:{line:300}}}}},
  sections:[{
    properties:{page:{size:{width:11906,height:16838},margin:{top:Math.round(42*MM),bottom:Math.round(28*MM),left:Math.round(20*MM),right:Math.round(20*MM),header:0,footer:Math.round(12*MM)}}},
    headers:{default:new Header({children:[new Paragraph({children:[cab]})]})},
    footers:{default:new Footer({children:[
      new Paragraph({children:[pie]}),
      new Paragraph({border:{top:{style:BorderStyle.SINGLE,size:4,color:NAVY,space:6}},tabStops:[{type:TabStopType.RIGHT,position:Math.round(170*MM)}],
        children:[t("ENTRE TODOS",{bold:true,color:NAVY,size:16}),t("   ·   entre-todos.org   ·   contacto.entretodos@gmail.com   ·   Potsdam, Alemania",{color:G3,size:16}),
          t("\t",{size:16}),t("",{size:16,color:G3,children:[PageNumber.CURRENT]})]}),
    ]})},
    children:[
      P(t("DOCUMENTO OFICIAL  ·  "+SPEC.tipo.toUpperCase(),{bold:true,color:RED,size:16,characterSpacing:12}),{spacing:{after:120}}),
      P(t(SPEC.asunto.toUpperCase(),{font:"Barlow Condensed",bold:true,color:NAVY,size:40}),{spacing:{before:0,after:220,line:276,lineRule:"auto"}}),
      ficha(),
      P(t(""),{spacing:{after:120}}),
      ...SPEC.bloques.map(x=> x.h ? H(x.h)
        : x.h2 ? new Paragraph({keepNext:true,spacing:{before:200,after:80},children:[t(x.h2,{bold:true,color:RED,size:22})]})
        : x.vin ? B(x.vin) : x.num ? N(x.num)
        : x.b ? P([t(x.b+" ",{bold:true,color:NAVY}),t(x.p)],{alignment:AlignmentType.JUSTIFIED})
        : x.firma ? P(t(x.firma,{bold:true}),{spacing:{before:600,after:0}})
        : x.cargo ? P(t(x.cargo,{color:G2}))
        : P(t(x.p),{alignment:x.derecha?AlignmentType.RIGHT:AlignmentType.JUSTIFIED})),
    ]}]});
Packer.toBuffer(doc).then(b=>fs.writeFileSync(process.argv[3],b));
