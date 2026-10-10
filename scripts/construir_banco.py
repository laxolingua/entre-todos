#!/usr/bin/env python3
"""Construye el banco de propuestas normalizado a partir del JSON canónico.

Entrada (no se modifica nunca):
  datos/fuente/banco_FASE3_BLOQUE11_P002.json   banco verbatim, 3 jul 2026
  datos/curado/atribucion_fuentes.json          atribución de fuentes a actores
  datos/curado/verificacion.json                verificación de autorías y de citas
  datos/curado/consolidacion/*.json             banco ciudadano: propuestas consolidadas

Salida:
  datos/generado/banco.json        modelo normalizado (lo usa el sitio)
  datos/generado/*.csv             datos abiertos para investigadores y socios
  datos/generado/informe.txt       validaciones y avisos
  supabase/seed/banco_seed.sql     carga para Supabase

Uso:  python3 scripts/construir_banco.py
Sin dependencias externas. Falla (código 1) si alguna validación crítica no pasa.
"""
import csv
import hashlib
import json
import re
import sys
import unicodedata
from urllib.parse import urlparse
from collections import Counter, defaultdict
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
FUENTE = RAIZ / "datos/fuente/banco_FASE3_BLOQUE11_P002.json"
CURADO = RAIZ / "datos/curado/atribucion_fuentes.json"
VERIF = RAIZ / "datos/curado/verificacion.json"
# Entradas y fuentes añadidas después del banco de origen (p. ej., por la auditoría de cobertura).
# El banco de origen no se edita: lo nuevo y lo corregido vive en archivos curados, con su motivo.
ADIC = RAIZ / "datos/curado/adiciones.json"
CORREC = RAIZ / "datos/curado/correcciones"
ESTADO_DOC = RAIZ / "datos/curado/estado_documentacion.json"
CONSOL = RAIZ / "datos/curado/consolidacion"
GEN = RAIZ / "datos/generado"
PUBLICO = RAIZ / "web/src/data/publico.json"
SEED = RAIZ / "supabase/seed/banco_seed.sql"
AMBITO = "CU"

TIPOS_FUENTE = {"ACAD": "Centro académico o de estudios", "COAL": "Coalición", "ORG": "Organización", "PERS": "Autor individual"}
TIPOS_ENTRADA = {"propuesta", "critica", "reforma_propuesta"}
ESTADOS_CITA = {"Verbatim-primario", "Verbatim-secundario"}
METODOS = {"dominio_oficial", "documento_revisado", "instinct"}
FORMAS_CITA = {"literal", "secundaria", "citada", "parafraseada"}

errores, avisos = [], []


def sin_tildes(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def construir_diccionario_tildes(textos):
    """Mapa palabra-sin-tilde -> forma con tilde más frecuente en el propio banco."""
    formas = defaultdict(Counter)
    for t in textos:
        for w in re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", t):
            lw = w.lower()
            formas[sin_tildes(lw)][lw] += 1
    mapa = {}
    for base, cont in formas.items():
        con_tilde = [(f, n) for f, n in cont.items() if f != base]
        if con_tilde:
            forma, n = max(con_tilde, key=lambda x: x[1])
            # solo si la forma con tilde domina sobre la forma sin tilde
            if n >= cont.get(base, 0):
                mapa[base] = forma
    return mapa


SIGLAS = {"onu", "oea", "ong", "ue", "eeuu", "pcc", "gaesa", "fmi", "bid", "pib", "cdr", "mipymes", "mipyme", "ctc"}
NOMBRES_PROPIOS = {"caribe": "Caribe", "cuba": "Cuba", "habana": "Habana", "varela": "Varela"}


def humanizar(slug: str, mapa) -> str:
    palabras = []
    for w in slug.split("-"):
        if not w:
            continue
        if w in SIGLAS:
            palabras.append(w.upper())
        elif w in NOMBRES_PROPIOS:
            palabras.append(NOMBRES_PROPIOS[w])
        else:
            palabras.append(mapa.get(w, w))
    texto = " ".join(palabras)
    return texto[:1].upper() + texto[1:]


def dominio(u):
    d = urlparse(u or "").netloc.lower()
    return d[4:] if d.startswith("www.") else d


def anio(fecha: str):
    m = re.search(r"(1[89]\d\d|20\d\d)", fecha or "")
    return int(m.group(1)) if m else None


def sql(v):
    if v is None:
        return "null"
    if isinstance(v, bool):
        return "true" if v else "false"
    if isinstance(v, (int, float)):
        return str(v)
    return "'" + str(v).replace("'", "''") + "'"


def main():
    crudo = FUENTE.read_bytes()
    b = json.loads(crudo)
    cur = json.loads(CURADO.read_text(encoding="utf-8"))
    ver = json.loads(VERIF.read_text(encoding="utf-8"))
    sha = hashlib.sha256(crudo).hexdigest()

    P, F, C = b["tabla_propuestas"], b["tabla_fuentes"], b["tabla_categorias"]
    # Adiciones: fuentes y entradas nuevas, en el mismo formato que el banco de origen.
    adic = json.loads(ADIC.read_text(encoding="utf-8")) if ADIC.exists() else {"fuentes": [], "propuestas": []}
    ids_origen = {p["id_propuesta"] for p in P}
    refs_origen = {f["num_referencia"] for f in F}
    for f in adic["fuentes"]:
        if f["num_referencia"] in refs_origen:
            errores.append(f"adiciones.json: la fuente {f['num_referencia']} ya existe en el banco de origen")
        cur["fuentes"][f["num_referencia"]] = {"actor": f.get("actor"), "autor_texto": f.get("autor_texto")}
    for p in adic["propuestas"]:
        if p["id_propuesta"] in ids_origen:
            errores.append(f"adiciones.json: la entrada {p['id_propuesta']} ya existe en el banco de origen")
    P = P + adic["propuestas"]
    F = F + adic["fuentes"]
    # Correcciones por entrada (texto completado, localización, fuente...). Se suman a verificacion.json;
    # cada archivo de datos/curado/correcciones/ documenta su origen.
    for fich in sorted(CORREC.glob("*.json")) if CORREC.exists() else []:
        for pid, campos in json.loads(fich.read_text(encoding="utf-8"))["propuestas"].items():
            ver["propuestas"].setdefault(pid, {}).update(campos)
    estado_doc = json.loads(ESTADO_DOC.read_text(encoding="utf-8")) if ESTADO_DOC.exists() else None
    FUS, NOP = b["fusiones_entre_fuentes_distintas"], b["tabla_no_propuestas"]

    # ---------- categorías ----------
    declaradas = {c["clave_categoria"]: c for c in C}
    uso = Counter(k for p in P for k in p["categorias"])
    categorias = []
    for i, c in enumerate(C):
        categorias.append({"clave": c["clave_categoria"], "nombre": c["nombre_visible"], "fase": c["fase"],
                           "descripcion": c["descripcion"], "declarada": True, "orden": i + 1})
    no_decl = cur["categorias_no_declaradas"]
    for k in sorted(set(uso) - set(declaradas)):
        if k not in no_decl:
            errores.append(f"Categoría usada sin nombre provisional: {k}")
            continue
        categorias.append({"clave": k, "nombre": no_decl[k], "fase": None, "descripcion": None,
                           "declarada": False, "orden": 100 + len(categorias)})
        avisos.append(f"Categoría no declarada en el banco, nombre provisional: {k} -> {no_decl[k]} ({uso[k]} propuestas)")
    for c in categorias:
        c["propuestas"] = uso.get(c["clave"], 0)

    # ---------- actores y fuentes ----------
    actores = [{"id": k, **v} for k, v in cur["actores"].items()]
    ids_actor = {a["id"] for a in actores}
    url_a_ref = {}
    fuentes = []
    for f in F:
        ref = int(f["num_referencia"])
        if f["tipo"] not in TIPOS_FUENTE:
            errores.append(f"Fuente {ref}: tipo desconocido {f['tipo']}")
        at = cur["fuentes"].get(str(ref))
        if at is None:
            errores.append(f"Fuente {ref}: sin entrada en atribucion_fuentes.json")
            at = {"actor": None}
        if at.get("actor") and at["actor"] not in ids_actor:
            errores.append(f"Fuente {ref}: actor inexistente {at['actor']}")
        url = f["url_documento_directo"].strip()
        dup = cur["duplicados"].get(str(ref))
        if url in url_a_ref and not dup:
            dup = str(url_a_ref[url])
            avisos.append(f"Fuente {ref}: mismo enlace que la fuente {dup}; marcada como duplicado")
        url_a_ref.setdefault(url, ref)
        vf = ver["fuentes"].get(str(ref), {})
        actor = vf["actor"] if "actor" in vf else at.get("actor")
        autor = vf["autor_texto"] if "autor_texto" in vf else at.get("autor_texto")
        if actor and actor not in ids_actor:
            errores.append(f"Fuente {ref}: actor inexistente en verificación {actor}")
        web = (cur["actores"].get(actor) or {}).get("web") if actor else None
        metodo = vf.get("metodo") or ("dominio_oficial" if web and dominio(web) == dominio(url) else "instinct")
        if metodo not in METODOS:
            errores.append(f"Fuente {ref}: método de verificación desconocido {metodo}")
        if actor != at.get("actor") or autor != at.get("autor_texto"):
            avisos.append(f"Fuente {ref}: autoría corregida en la verificación -> {actor or autor}")
        fuentes.append({
            "ref": ref, "id_catalogo": f["id_catalogo"], "tipo": f["tipo"],
            "documento": (vf.get("documento") or f["documento"]).strip(),
            "url": url, "actor": actor, "autor_texto": autor,
            "atribucion_verificada": True, "metodo_verificacion": metodo, "nota_verificacion": vf.get("nota"),
            "verificada_en": ver["fecha"], "duplicado_de": int(dup) if dup else None,
            "anio": vf.get("anio"),  # año de publicación del documento, cuando difiere del de sus citas
        })
    refs = {f["ref"] for f in fuentes}

    # ---------- propuestas ----------
    corpus = [p["cita_verbatim"] for p in P] + [p["postura_direccion"] for p in P] + [f["documento"] for f in F]
    corpus += [c["nombre"] for c in categorias] + [c.get("descripcion") or "" for c in categorias]
    mapa = construir_diccionario_tildes(corpus)

    tema_de = {}
    temas = []
    for slug, fu in FUS.items():
        temas.append({"slug": slug, "nombre": humanizar(slug, mapa), "fuentes": sorted(int(x) for x in fu["fuentes"]),
                      "propuestas": fu["propuestas"]})
        for pid in fu["propuestas"]:
            if pid in tema_de:
                avisos.append(f"{pid} aparece en dos temas fusionados: {tema_de[pid]} y {slug}")
            tema_de[pid] = slug

    vistos = set()
    propuestas = []
    for p in P:
        pid = p["id_propuesta"]
        if pid in vistos:
            errores.append(f"ID duplicado {pid}")
        vistos.add(pid)
        if not re.fullmatch(r"P-\d{4}", pid):
            errores.append(f"ID con formato inesperado {pid}")
        if len(p["ref_fuentes"]) != 1:
            errores.append(f"{pid}: se esperaba una sola fuente, hay {len(p['ref_fuentes'])}")
        ref = int(ver["propuestas"].get(pid, {}).get("fuente", p["ref_fuentes"][0]))
        if ref not in refs:
            errores.append(f"{pid}: fuente inexistente {ref}")
        if p["tipo_entrada"] not in TIPOS_ENTRADA:
            errores.append(f"{pid}: tipo_entrada desconocido {p['tipo_entrada']}")
        if p["estado_cita"] not in ESTADOS_CITA:
            errores.append(f"{pid}: estado_cita desconocido {p['estado_cita']}")
        if not p["cita_verbatim"].strip():
            errores.append(f"{pid}: cita vacía")
        if "�" in p["cita_verbatim"]:
            errores.append(f"{pid}: carácter corrupto en la cita")
        propuestas.append({
            "id": pid, "cita": (ver["propuestas"].get(pid, {}).get("cita") or p["cita_verbatim"]).strip(),
            "localizacion": (ver["propuestas"].get(pid, {}).get("localizacion") or p["localizacion_exacta"]).strip(),
            "categorias": p["categorias"], "tema_fino": p["tema_fino"], "titular": humanizar(p["tema_fino"], mapa),
            "resumen": p["postura_direccion"].strip(), "fuente": ref,
            # La verificación puede corregir la fecha del inventario (p. ej., fecha real de publicación).
            "fecha_texto": ver["propuestas"].get(pid, {}).get("fecha", p["fecha"]),
            "anio": anio(ver["propuestas"].get(pid, {}).get("fecha", p["fecha"])),
            "estado_cita": p["estado_cita"], "tipo": p["tipo_entrada"], "gremio": p["gremio"] or None,
            "tema": tema_de.get(pid),
            "estado": ver["propuestas"].get(pid, {}).get("estado", "publicada"),
            "motivo_estado": ver["propuestas"].get(pid, {}).get("motivo"),
            "forma_cita": ver["propuestas"].get(pid, {}).get(
                "forma_cita", "literal" if p["estado_cita"] == "Verbatim-primario" else "secundaria"),
        })
        vp = ver["propuestas"].get(pid, {})
        if "cita" in vp and not vp["cita"].strip().startswith(p["cita_verbatim"].strip()[:40]):
            avisos.append(f"{pid}: la cita corregida no empieza como la original; revisar")
        propuestas[-1]["correccion"] = vp.get("nota")
        if propuestas[-1]["forma_cita"] not in FORMAS_CITA:
            errores.append(f"{pid}: forma_cita desconocida")
        if propuestas[-1]["estado"] not in {"publicada", "en_revision", "retirada"}:
            errores.append(f"{pid}: estado desconocido")
    for t in temas:
        for pid in t["propuestas"]:
            if pid not in vistos:
                errores.append(f"Tema {t['slug']}: propuesta inexistente {pid}")
    for pid in ver["propuestas"]:
        if pid not in vistos:
            errores.append(f"verificacion.json: propuesta inexistente {pid}")

    # ---------- banco ciudadano: propuestas consolidadas ----------
    consolidadas, cuestiones, solo_archivo = [], [], []
    for fich in sorted(CONSOL.glob("*.json")):
        d = json.loads(fich.read_text(encoding="utf-8"))
        consolidadas += d["propuestas"]
        cuestiones += d.get("cuestiones", [])
        solo_archivo += d.get("solo_archivo", [])
    por_id = {p["id"]: p for p in propuestas}
    claves_cat = {c["clave"] for c in categorias}
    ids_cons = Counter(c["id"] for c in consolidadas)
    for k, n in ids_cons.items():
        if n > 1:
            errores.append(f"Propuesta consolidada duplicada: {k}")
    usadas = defaultdict(list)
    for orden, c in enumerate(consolidadas, 1):
        c["orden"] = orden
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", c["id"]):
            errores.append(f"Consolidada {c['id']}: id no válido")
        if c["categoria"] not in claves_cat:
            errores.append(f"Consolidada {c['id']}: categoría inexistente {c['categoria']}")
        if not c.get("respaldo"):
            errores.append(f"Consolidada {c['id']}: sin respaldo")
        for campo in ("titulo", "texto"):
            if not (c.get(campo) or "").strip():
                errores.append(f"Consolidada {c['id']}: falta {campo}")
        c.setdefault("incisos", []); c.setdefault("variantes", []); c.setdefault("diagnostico", [])
        refs_rol = [("respaldo", None, x) for x in c["respaldo"]] + [("diagnostico", None, x) for x in c["diagnostico"]]
        for i, inc in enumerate(c["incisos"]):
            inc["letra"] = "abcdefghijklmnopqrstuvwxyz"[i]
            refs_rol += [("inciso", i, x) for x in inc["fuentes"]]
        for i, var in enumerate(c["variantes"]):
            refs_rol += [("variante", i, x) for x in var["fuentes"]]
        for rol, i, x in refs_rol:
            if x not in por_id:
                errores.append(f"Consolidada {c['id']}: entrada inexistente {x}")
                continue
            if por_id[x]["estado"] != "publicada":
                errores.append(f"Consolidada {c['id']}: usa {x}, que no está publicada")
            usadas[x].append(c["id"])
        entradas = sorted({x for _, _, x in refs_rol if x in por_id})
        c["entradas"] = entradas
        c["fuentes"] = sorted({por_id[x]["fuente"] for x in entradas})
        cats = Counter(k for x in c["respaldo"] if x in por_id for k in por_id[x]["categorias"])
        c["categorias"] = [c["categoria"]] + [k for k, _ in cats.most_common() if k != c["categoria"]]
    for s_ in solo_archivo:
        if s_["id"] not in por_id:
            errores.append(f"solo_archivo: entrada inexistente {s_['id']}")
        usadas[s_["id"]]
    for p in propuestas:
        if p["id"] not in usadas:
            errores.append(f"{p['id']}: no está en ninguna propuesta consolidada ni en solo_archivo")
        if p["estado"] != "publicada" and p["id"] not in {s_["id"] for s_ in solo_archivo}:
            errores.append(f"{p['id']}: no publicada y no figura en solo_archivo")
        p["consolidadas"] = sorted(set(usadas.get(p["id"], [])))
    nombres = {c["id"] for c in consolidadas}
    for q in cuestiones:
        for o in q["opciones"]:
            if o not in nombres:
                errores.append(f"Cuestión {q['id']}: opción inexistente {o}")

    no_propuestas = [{
        "id": n["id_propuesta"], "cita": n["cita_verbatim"], "localizacion": n["localizacion_exacta"],
        "fuente": int(n["ref_fuentes"][0]), "tipo": n["tipo_no_propuesta"], "motivo": n["motivo_exclusion"],
    } for n in NOP]

    # conteos (solo entradas publicadas)
    pub = [p for p in propuestas if p["estado"] == "publicada"]
    uso_pub = Counter(k for p in pub for k in p["categorias"])
    uso_cons = Counter(c["categoria"] for c in consolidadas)
    for c in categorias:
        c["propuestas"] = uso_pub.get(c["clave"], 0)
        c["consolidadas"] = uso_cons.get(c["clave"], 0)
    por_fuente = Counter(p["fuente"] for p in pub)
    for f in fuentes:
        f["propuestas"] = por_fuente.get(f["ref"], 0)
        if f["propuestas"] == 0:
            avisos.append(f"Fuente {f['ref']} sin propuestas")
    act_de = {f["ref"]: f["actor"] for f in fuentes}
    por_actor = Counter(act_de[p["fuente"]] for p in pub if act_de[p["fuente"]])
    for a in actores:
        a["propuestas"] = por_actor.get(a["id"], 0)
    for a in [a for a in actores if a["propuestas"] == 0]:
        avisos.append(f"Actor {a['id']} sin propuestas tras la verificación; se omite")
    actores = [a for a in actores if a["propuestas"] > 0]
    for a in actores:
        a["verificado"] = all(f["atribucion_verificada"] for f in fuentes if f["actor"] == a["id"])
    sin_actor = sum(1 for p in pub if not act_de[p["fuente"]])
    avisos.append(f"{sin_actor} propuestas vienen de autores individuales o declaraciones sin organización propia")

    if errores:
        print("ERRORES:\n  " + "\n  ".join(errores))
        sys.exit(1)

    meta = {"banco": b["banco"], "origen": FUENTE.name, "sha256_origen": sha, "ambito": AMBITO,
            "totales": {"propuestas": len(propuestas), "fuentes": len(fuentes), "actores": len(actores),
                        "categorias": len(categorias), "temas": len(temas), "no_propuestas": len(no_propuestas),
                        "citas_secundarias": sum(1 for p in propuestas if p["estado_cita"] == "Verbatim-secundario"),
                        "en_revision": sum(1 for p in propuestas if p["estado"] != "publicada"),
                        "parafraseadas": sum(1 for p in propuestas if p["forma_cita"] == "parafraseada"),
                        "consolidadas": len(consolidadas), "cuestiones": len(cuestiones),
                        "solo_archivo": len(solo_archivo), "adiciones": len(adic["propuestas"]),
                        "fuentes_añadidas": len(adic["fuentes"]),
                        "corregidas": sum(1 for v in ver["propuestas"].values() if {"cita", "fuente", "localizacion"} & set(v))},
            "verificacion": ver["fecha"], "metodos_verificacion": ver["metodos"]}
    salida = {"meta": meta, "categorias": categorias, "actores": actores, "fuentes": fuentes,
              "temas": temas, "propuestas": propuestas, "no_propuestas": no_propuestas,
              "consolidadas": consolidadas, "cuestiones": cuestiones, "solo_archivo": solo_archivo}

    GEN.mkdir(parents=True, exist_ok=True)
    (GEN / "banco.json").write_text(json.dumps(salida, ensure_ascii=False, indent=1), encoding="utf-8")

    # ---------- exportación pública ----------
    # El banco (citas, localizaciones, clasificación, verificación) es el back end privado de ENTRE TODOS.
    # Al sitio, a socios como elTOQUE y a cualquier descarga solo llega esta capa: propuestas combinadas,
    # incisos, variantes, cuestiones, quién propone cada cosa y el enlace a su documento original.
    fuente_de = {f["ref"]: f for f in fuentes}
    actor_de = {a["id"]: a for a in actores}
    anios_doc = defaultdict(Counter)
    for p in pub:
        if p["anio"]:
            anios_doc[p["fuente"]][p["anio"]] += 1

    def autoria_doc(f):
        if f["actor"] and f["actor"] in actor_de:
            return actor_de[f["actor"]]["nombre"]
        return f.get("autor_texto") or "Autoría por confirmar"

    def docs(ids):
        vistos_, out = set(), []
        for x in ids:
            r = por_id[x]["fuente"]
            if r not in vistos_:
                vistos_.add(r)
                out.append(r)
        return out

    q_de = defaultdict(list)
    for q in cuestiones:
        for o in q["opciones"]:
            q_de[o].append(q["id"])
    pub_props, usados = [], set()
    for c in consolidadas:
        centrales = docs(c["respaldo"])
        incs = [{"letra": i["letra"], "texto": i["texto"], "documentos": docs(i["fuentes"])} for i in c["incisos"]]
        vars_ = [{"texto": v["texto"], "documentos": docs(v["fuentes"])} for v in c["variantes"]]
        todos = docs(c["respaldo"] + [x for i in c["incisos"] for x in i["fuentes"]]
                     + [x for v in c["variantes"] for x in v["fuentes"]] + c["diagnostico"])
        analizan = [r for r in docs(c["diagnostico"]) if r not in set(centrales)]
        usados.update(todos)
        pub_props.append({"id": c["id"], "categoria": c["categoria"], "titulo": c["titulo"], "texto": c["texto"],
                          "nota": c.get("nota"), "orden": c["orden"], "documentos": centrales, "incisos": incs,
                          "variantes": vars_, "analizan": analizan, "total_documentos": len(todos),
                          "cuestiones": q_de.get(c["id"], [])})
    pub_docs = []
    for r in sorted(usados):
        f = fuente_de[r]
        pub_docs.append({"id": r, "titulo": f["documento"], "autoria": autoria_doc(f),
                         "actor": f["actor"] if f["actor"] in actor_de else None,
                         "anio": f["anio"] or (anios_doc[r].most_common(1)[0][0] if anios_doc[r] else None),
                         "url": f["url"], "tipo": f["tipo"]})
    doc_actor = {d["id"]: d["actor"] for d in pub_docs}
    por_actor_pub = Counter()
    for pp in pub_props:
        for a in {doc_actor[r] for r in [*pp["documentos"], *(r for i in pp["incisos"] for r in i["documentos"]),
                                         *(r for v in pp["variantes"] for r in v["documentos"])] if doc_actor[r]}:
            por_actor_pub[a] += 1
    publico = {
        "meta": {"actualizado": ver["fecha"],
                 "totales": {"propuestas": len(pub_props), "documentos": len(pub_docs),
                             "autorias": len({d["autoria"] for d in pub_docs}), "cuestiones": len(cuestiones),
                             "citas_analizadas": len(pub)},
                 "verificacion": dict(Counter(fuente_de[r]["metodo_verificacion"] for r in usados)),
                 "estado_documentacion": estado_doc},
        "categorias": [{k: c.get(k) for k in ("clave", "nombre", "descripcion", "fase", "orden")} | {"propuestas": c["consolidadas"]}
                       for c in categorias if c["consolidadas"] > 0],
        "actores": [{"id": a["id"], "nombre": a["nombre"], "tipo": a["tipo"], "web": a.get("web"),
                     "propuestas": por_actor_pub.get(a["id"], 0)} for a in actores if por_actor_pub.get(a["id"])],
        "documentos": pub_docs,
        "propuestas": pub_props,
        "cuestiones": [{k: q.get(k) for k in ("id", "pregunta", "texto", "opciones", "excluyentes")} for q in cuestiones],
    }
    texto_pub = json.dumps(publico, ensure_ascii=False)
    # Salvaguarda: la capa pública no lleva identificadores del archivo ni campos del banco.
    # (El texto de una propuesta puede coincidir con la redacción de su fuente: es lo buscado.)
    if re.search(r"P-\d{4}", texto_pub):
        errores.append("La exportación pública contiene identificadores del archivo (P-XXXX)")
    for campo in ('"cita"', '"localizacion"', '"tema_fino"', '"estado_cita"', '"resumen"', '"respaldo"'):
        if campo in texto_pub:
            errores.append(f"La exportación pública contiene el campo {campo}")
    if errores:
        print("ERRORES:\n  " + "\n  ".join(errores))
        sys.exit(1)
    PUBLICO.parent.mkdir(parents=True, exist_ok=True)
    PUBLICO.write_text(json.dumps(publico, ensure_ascii=False, indent=1), encoding="utf-8")

    def escribir_csv(nombre, filas, campos):
        with open(GEN / nombre, "w", newline="", encoding="utf-8") as fh:
            w = csv.DictWriter(fh, fieldnames=campos, extrasaction="ignore")
            w.writeheader()
            for r in filas:
                w.writerow({k: ("|".join(v) if isinstance(v, list) else v) for k, v in r.items()})

    escribir_csv("propuestas.csv", propuestas, ["id", "titular", "cita", "localizacion", "categorias", "tema", "tema_fino",
                                               "resumen", "fuente", "fecha_texto", "anio", "estado_cita", "forma_cita",
                                               "tipo", "estado", "consolidadas"])
    escribir_csv("fuentes.csv", fuentes, ["ref", "id_catalogo", "tipo", "documento", "url", "actor", "autor_texto",
                                         "atribucion_verificada", "metodo_verificacion", "nota_verificacion",
                                         "verificada_en", "duplicado_de", "propuestas"])
    escribir_csv("consolidadas.csv", [{**c, "incisos": [f"{i['letra']}) {i['texto']} [{', '.join(i['fuentes'])}]" for i in c["incisos"]],
                                       "variantes": [f"{v['texto']} [{', '.join(v['fuentes'])}]" for v in c["variantes"]],
                                       "fuentes": [str(x) for x in c["fuentes"]]} for c in consolidadas],
                 ["id", "categoria", "titulo", "texto", "respaldo", "incisos", "variantes", "diagnostico", "nota",
                  "entradas", "fuentes"])
    filas = []
    for c in consolidadas:
        filas += [{"consolidada": c["id"], "entrada": x, "rol": "respaldo", "inciso": ""} for x in c["respaldo"]]
        for i in c["incisos"]:
            filas += [{"consolidada": c["id"], "entrada": x, "rol": "inciso", "inciso": i["letra"]} for x in i["fuentes"]]
        for n, v in enumerate(c["variantes"], 1):
            filas += [{"consolidada": c["id"], "entrada": x, "rol": "variante", "inciso": str(n)} for x in v["fuentes"]]
        filas += [{"consolidada": c["id"], "entrada": x, "rol": "diagnostico", "inciso": ""} for x in c["diagnostico"]]
    escribir_csv("consolidada_entradas.csv", filas, ["consolidada", "entrada", "rol", "inciso"])
    escribir_csv("cuestiones.csv", cuestiones, ["id", "pregunta", "texto", "opciones", "excluyentes"])
    escribir_csv("actores.csv", actores, ["id", "nombre", "tipo", "web", "verificado", "propuestas"])
    escribir_csv("categorias.csv", categorias, ["clave", "nombre", "fase", "descripcion", "declarada", "propuestas", "consolidadas"])
    escribir_csv("temas.csv", [{**t, "fuentes": [str(x) for x in t["fuentes"]]} for t in temas],
                 ["slug", "nombre", "fuentes", "propuestas"])

    # ---------- seed SQL (idempotente: se puede volver a ejecutar) ----------
    L = ["-- Generado por scripts/construir_banco.py. No editar a mano.",
         f"-- Origen: {FUENTE.name} sha256 {sha}",
         "-- Idempotente: inserta o actualiza. Si una propuesta cambia, el trigger guarda la versión anterior.",
         "begin;",
         f"set local banco.motivo_cambio = {sql('Carga desde ' + FUENTE.name)};",
         f"insert into banco.ambito (codigo, nombre) values ('{AMBITO}', 'Cuba') on conflict (codigo) do nothing;"]
    for c in categorias:
        L.append("insert into banco.categoria (clave, nombre, fase, descripcion, declarada, orden) values "
                 f"({sql(c['clave'])},{sql(c['nombre'])},{sql(c['fase'])},{sql(c['descripcion'])},{sql(c['declarada'])},{c['orden']}) "
                 "on conflict (clave) do update set nombre = excluded.nombre, fase = excluded.fase, "
                 "descripcion = excluded.descripcion, declarada = excluded.declarada, orden = excluded.orden;")
    for a in actores:
        L.append("insert into banco.actor (id, nombre, tipo, web, verificado) values "
                 f"({sql(a['id'])},{sql(a['nombre'])},{sql(a['tipo'])},{sql(a['web'])},{sql(a['verificado'])}) "
                 "on conflict (id) do update set nombre = excluded.nombre, tipo = excluded.tipo, web = excluded.web, "
                 "verificado = excluded.verificado;")
    for f in sorted(fuentes, key=lambda x: (x["duplicado_de"] is not None, x["ref"])):
        L.append("insert into banco.fuente (ref, id_catalogo, tipo, documento, url, actor_id, autor_texto, duplicado_de, "
                 "atribucion_verificada, metodo_verificacion, nota_verificacion, verificada_en) values "
                 f"({f['ref']},{sql(f['id_catalogo'])},{sql(f['tipo'])},{sql(f['documento'])},{sql(f['url'])},"
                 f"{sql(f['actor'])},{sql(f['autor_texto'])},{sql(f['duplicado_de'])},{sql(f['atribucion_verificada'])},"
                 f"{sql(f['metodo_verificacion'])},{sql(f['nota_verificacion'])},{sql(f['verificada_en'])}) "
                 "on conflict (ref) do update set id_catalogo = excluded.id_catalogo, tipo = excluded.tipo, "
                 "documento = excluded.documento, url = excluded.url, actor_id = excluded.actor_id, "
                 "autor_texto = excluded.autor_texto, duplicado_de = excluded.duplicado_de, "
                 "atribucion_verificada = excluded.atribucion_verificada, metodo_verificacion = excluded.metodo_verificacion, "
                 "nota_verificacion = excluded.nota_verificacion, verificada_en = excluded.verificada_en;")
    for t in temas:
        L.append(f"insert into banco.tema (slug, nombre) values ({sql(t['slug'])},{sql(t['nombre'])}) "
                 "on conflict (slug) do update set nombre = excluded.nombre;")
    for p in propuestas:
        L.append("insert into banco.propuesta (id, ambito, cita, localizacion, tema_fino, titular, resumen, fuente_ref, "
                 "fecha_texto, anio, estado_cita, forma_cita, tipo, gremio, estado, motivo_estado) values "
                 f"({sql(p['id'])},'{AMBITO}',{sql(p['cita'])},{sql(p['localizacion'])},{sql(p['tema_fino'])},"
                 f"{sql(p['titular'])},{sql(p['resumen'])},{p['fuente']},{sql(p['fecha_texto'])},{sql(p['anio'])},"
                 f"{sql(p['estado_cita'])},{sql(p['forma_cita'])},{sql(p['tipo'])},{sql(p['gremio'])},"
                 f"{sql(p['estado'])},{sql(p['motivo_estado'])}) "
                 "on conflict (id) do update set cita = excluded.cita, localizacion = excluded.localizacion, "
                 "tema_fino = excluded.tema_fino, titular = excluded.titular, resumen = excluded.resumen, "
                 "fuente_ref = excluded.fuente_ref, fecha_texto = excluded.fecha_texto, anio = excluded.anio, "
                 "estado_cita = excluded.estado_cita, forma_cita = excluded.forma_cita, tipo = excluded.tipo, "
                 "gremio = excluded.gremio, estado = excluded.estado, motivo_estado = excluded.motivo_estado;")
    L.append("delete from banco.propuesta_categoria;")
    for p in propuestas:
        for i, c in enumerate(p["categorias"]):
            L.append(f"insert into banco.propuesta_categoria (propuesta_id, categoria_clave, orden) values ({sql(p['id'])},{sql(c)},{i});")
    L.append("delete from banco.tema_propuesta;")
    for t in temas:
        for pid in t["propuestas"]:
            L.append(f"insert into banco.tema_propuesta (tema_slug, propuesta_id) values ({sql(t['slug'])},{sql(pid)});")
    for n in no_propuestas:
        L.append("insert into banco.no_propuesta (id, cita, localizacion, fuente_ref, tipo, motivo) values "
                 f"({sql(n['id'])},{sql(n['cita'])},{sql(n['localizacion'])},{n['fuente']},{sql(n['tipo'])},{sql(n['motivo'])}) "
                 "on conflict (id) do update set cita = excluded.cita, localizacion = excluded.localizacion, "
                 "fuente_ref = excluded.fuente_ref, tipo = excluded.tipo, motivo = excluded.motivo;")
    # banco ciudadano
    L.append("delete from banco.cuestion_opcion; delete from banco.cuestion;")
    L.append("delete from banco.consolidada_entrada; delete from banco.consolidada_inciso;")
    for c in consolidadas:
        L.append("insert into banco.consolidada (id, ambito, categoria_clave, titulo, texto, nota, orden) values "
                 f"({sql(c['id'])},'{AMBITO}',{sql(c['categoria'])},{sql(c['titulo'])},{sql(c['texto'])},"
                 f"{sql(c.get('nota'))},{c['orden']}) on conflict (id) do update set categoria_clave = excluded.categoria_clave, "
                 "titulo = excluded.titulo, texto = excluded.texto, nota = excluded.nota, orden = excluded.orden, "
                 "estado = 'publicada';")
        for x in c["respaldo"]:
            L.append("insert into banco.consolidada_entrada (consolidada_id, propuesta_id, rol) values "
                     f"({sql(c['id'])},{sql(x)},'respaldo') on conflict do nothing;")
        for x in c["diagnostico"]:
            L.append("insert into banco.consolidada_entrada (consolidada_id, propuesta_id, rol) values "
                     f"({sql(c['id'])},{sql(x)},'diagnostico') on conflict do nothing;")
        for tipo, lista in (("inciso", c["incisos"]), ("variante", c["variantes"])):
            for n, inc in enumerate(lista, 1):
                L.append("insert into banco.consolidada_inciso (consolidada_id, tipo, orden, texto, fuentes) values "
                         f"({sql(c['id'])},'{tipo}',{n},{sql(inc['texto'])},array[{','.join(sql(x) for x in inc['fuentes'])}]);")
                for x in inc["fuentes"]:
                    L.append("insert into banco.consolidada_entrada (consolidada_id, propuesta_id, rol) values "
                             f"({sql(c['id'])},{sql(x)},'{tipo}') on conflict do nothing;")
    vivas = ",".join(sql(c["id"]) for c in consolidadas)
    # Una propuesta que desaparece de la consolidación se retira (no se borra): conserva valoraciones y enlaces.
    L.append(f"update banco.consolidada set estado = 'retirada' where id not in ({vivas}) and estado <> 'retirada';")
    for n, q in enumerate(cuestiones, 1):
        L.append("insert into banco.cuestion (id, pregunta, texto, excluyentes, orden) values "
                 f"({sql(q['id'])},{sql(q['pregunta'])},{sql(q['texto'])},{sql(q['excluyentes'])},{n});")
        for m, o in enumerate(q["opciones"], 1):
            L.append(f"insert into banco.cuestion_opcion (cuestion_id, consolidada_id, orden) values ({sql(q['id'])},{sql(o)},{m});")
    L.append("commit;")
    SEED.parent.mkdir(parents=True, exist_ok=True)
    SEED.write_text("\n".join(L) + "\n", encoding="utf-8")

    informe = ["BANCO DE PROPUESTAS - informe de construcción", f"Origen: {FUENTE.name}", f"sha256: {sha}", ""]
    informe += [f"{k}: {v}" for k, v in meta["totales"].items()]
    informe += ["", "AVISOS"] + [f"- {a}" for a in avisos]
    (GEN / "informe.txt").write_text("\n".join(informe) + "\n", encoding="utf-8")
    print("\n".join(informe))


if __name__ == "__main__":
    main()
