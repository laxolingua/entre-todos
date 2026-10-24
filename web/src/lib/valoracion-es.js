// Valoración de las propuestas publicadas en España (VOTO): cinco niveles de acuerdo, sesión anónima, solo totales.
// Ver supabase/migrations/20261024130000_valoracion_espana.sql.
import { sb, sesion, ACTIVA } from './participacion.js';

const NIVELES = ['Muy en contra', 'En contra', 'Neutral', 'A favor', 'Muy a favor'];

export async function iniciarValoracionEs(raiz) {
  const cajas = [...raiz.querySelectorAll('[data-valorar]')];
  if (!cajas.length) return;
  const mios = new Map();
  const resumen = new Map();

  const texto = (id) => {
    const r = resumen.get(id);
    if (!r || !Number(r.total)) return 'Sin valoraciones todavía.';
    const t = Number(r.total), favor = Number(r.v4) + Number(r.v5), contra = Number(r.v1) + Number(r.v2);
    return `${t} ${t === 1 ? 'valoración' : 'valoraciones'} · ${Math.round((favor / t) * 100)} % a favor · ${Math.round((contra / t) * 100)} % en contra`;
  };
  const pintar = (caja) => {
    const id = caja.dataset.valorar, v = mios.get(id) || 0;
    caja.querySelector('.escala').classList.toggle('elegida', v > 0);
    caja.querySelectorAll('button[data-v]').forEach((b) => { const on = Number(b.dataset.v) === v; b.classList.toggle('on', on); b.setAttribute('aria-checked', String(on)); });
    caja.querySelector('[data-total]').textContent = texto(id);
  };

  cajas.forEach((caja) => {
    caja.innerHTML = `
      <p class="dato-titulo">¿Cuánto apoyas esta propuesta?</p>
      <div class="escala" role="radiogroup" aria-label="Tu nivel de acuerdo con esta propuesta">
        ${NIVELES.map((t, k) => `<button type="button" data-v="${k + 1}" role="radio" aria-checked="false" ${ACTIVA ? '' : 'disabled'}>${t}</button>`).join('')}
      </div>
      <p class="discreto" data-total>${ACTIVA ? '' : 'La valoración está desactivada en esta versión del sitio.'}</p>`;
    caja.addEventListener('click', async (e) => {
      const b = e.target.closest('button[data-v]');
      if (!b) return;
      const id = caja.dataset.valorar, v = Number(b.dataset.v), antes = mios.get(id);
      mios.set(id, v); pintar(caja);
      try {
        const c = await sesion();
        const { error } = await c.rpc('es_valorar', { p_id: id, p_valor: v });
        if (error) throw error;
        const { data } = await c.rpc('es_valoraciones_resumen', { p_ids: [id] });
        if (data && data[0]) resumen.set(id, data[0]);
        pintar(caja);
      } catch {
        antes ? mios.set(id, antes) : mios.delete(id);
        pintar(caja);
        caja.querySelector('[data-total]').textContent = 'No se pudo guardar tu valoración. Inténtalo de nuevo.';
      }
    });
  });
  if (!ACTIVA) return;

  try {
    const c = await sb();
    const { data } = await c.rpc('es_valoraciones_resumen', { p_ids: cajas.map((x) => x.dataset.valorar) });
    (data || []).forEach((r) => resumen.set(r.id, r));
    const { data: s } = await c.auth.getSession();
    if (s.session) {
      const { data: m } = await c.rpc('es_mis_valoraciones');
      (m || []).forEach((r) => mios.set(r.id, Number(r.valor)));
    }
  } catch {}
  cajas.forEach(pintar);
}
