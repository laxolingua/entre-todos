# CONSTITUYENTE — WORKPLAN OPERATIVO (para Mitch + Claude)

Fecha: 2026-04-03
Estado: En progreso

## 1) Estado actual confirmado

- Fuente documental cargada: **Constituciones_de_Cuba_1869-2019** (292 páginas, 9 constituciones).
- Se completó inserción masiva desde **Constitución de 1940**.
- Total propuestas en constituyente: **84** (banner ya corregido a 84).
- Nuevas propuestas desde C1940: **+30** con `refs:[35]`.
- ORGS y ORG_LINKS de C1940 añadidos correctamente.

### Distribución por bloque (antes vs después)
- A — Fundamentos: 6 → 8 (+2)
- B — Derechos individuales: 8 → 16 (+8)
- C — Derechos sociales: 5 → 10 (+5)
- D — Derechos políticos: 5 → 8 (+3)
- E — Organización del Estado: 5 → 6 (+1)
- F — Poderes del Estado: 4 → 7 (+3)
- G — Economía y propiedad: 10 → 13 (+3)
- H — Internacional: 3 → 5 (+2)
- I — Reforma constitucional: 2 → 3 (+1)
- J — Innovaciones: 6 → 8 (+2)

## 2) Decisión de trabajo ya tomada

Orden acordado por Mitch:
1. Terminar **Sostenibilismo**
2. Luego **Disclaimer IA / Honestidad**
3. Luego **actualizar handover**
4. Después continuar con inserción del resto de constituciones históricas

## 3) Pendientes priorizados (ejecución)

## P0 — Sostenibilismo (completar primero)
- Re-extraer propuestas de oposición no integradas aún.
- Consolidar en estructura actual por bloques A–J.
- Marcar origen, refs y no duplicar propuestas ya incluidas por C1940.

**Entregable P0:**
- lista de inserciones por bloque
- diffs de propuestas agregadas
- conteo nuevo total

## P1 — Disclaimer IA (transparencia académica y cívica)
Integrar en constituyente:
- Modelo IC + IA
- Etiquetado obligatorio de propuestas IA
- Regla de inclusión igualitaria (IC/IA con mismo umbral)
- Trazabilidad por artículo (IC/IA/mixto)
- Rol IA como detector/síntesis de contradicciones
- Cláusula: IA asiste, ciudadanía decide

**Entregable P1:**
- bloque HTML integrado en constituyente
- texto corto público para UI

## P2 — Handover completo
Actualizar HANDOVER con:
- estado exacto por bloque
- decisiones de diseño ya aprobadas
- pendientes técnicos (DB, QA, enlaces)
- próximos pasos concretos

**Entregable P2:**
- HANDOVER final legible en 2-3 minutos

## P3 — Inserción de constituciones restantes (post-1940)
Objetivo: cubrir histórico hasta presente sin sobrecargar ni duplicar.

### Método recomendado por constitución
1. mapear artículos únicos no cubiertos
2. clasificar por bloques A–J
3. insertar como propuestas nuevas con refs
4. registrar conflicto/solapamiento con propuestas existentes

**Entregable P3:**
- tabla por constitución: propuestas candidatas / insertadas / descartadas
- trazabilidad completa de refs

## 4) Reglas para no romper el trabajo

- No rehacer bloques completos si solo toca insertar nuevas propuestas.
- Mantener IDs y anclas estables para no romper navegación/JS.
- Cualquier ajuste de contador/banner debe recalcularse automáticamente.
- Cada lote de inserción = commit separado.

## 5) QA mínimo después de cada lote

- Conteo total de propuestas coincide con banner.
- Navegación por bloques A–J intacta.
- refs visibles y correctas.
- Sin duplicados literales o semánticos obvios.
- Sin regressions en app-mode.

## 6) Checklist corto para retomar en próximo chat

- [ ] Terminar Sostenibilismo
- [ ] Integrar Disclaimer IA (v1.1)
- [ ] Actualizar HANDOVER
- [ ] Seguir constituciones restantes
- [ ] QA + commit hash por cada lote

---

## Nota de contexto
Este documento es el puente operativo cuando Claude/Max no tiene memoria de sesión. Leer primero y ejecutar en orden P0→P3.
