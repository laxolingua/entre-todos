var e={mejora:`Mejora`,objecion:`Objeción`,inciso:`Inciso`,evidencia:`Evidencia`},t=e=>{try{return localStorage.getItem(e)}catch{return null}};function n(e,n){e.innerHTML=`
    <p class="dato-titulo">¿Cuánto apoyas esta propuesta?</p>
    <div class="estrellas" role="group" aria-label="Valoración de 1 a 5">
      ${[1,2,3,4,5].map(e=>`<button type="button" data-n="${e}" aria-pressed="false" aria-label="${e} de 5" disabled><i class="fi fi-br-star" aria-hidden="true"></i></button>`).join(``)}
    </div>
    <p class="discreto" data-estado></p>
    <p class="discreto">La valoración se activa cuando el banco se publique con su base de datos. Será anónima y solo se publicarán totales.</p>`;let r=[...e.querySelectorAll(`button[data-n]`)],i=e=>r.forEach(t=>{t.setAttribute(`aria-pressed`,String(Number(t.dataset.n)===e)),t.classList.toggle(`llena`,Number(t.dataset.n)<=e)});return i(Number(t(`et-val-${n}`))||0),{botones:r,marcar:i,estado:e.querySelector(`[data-estado]`)}}async function r(e){let t=e.dataset.propuesta,{botones:r,marcar:i,estado:a}=n(e,t)}function i(t){return`
    <form class="aporte-form" data-form>
      <label class="dato-titulo" for="aporte-tipo">Tu aporte</label>
      <div class="fila">
        <select id="aporte-tipo" name="tipo" ${t?`disabled`:``}>
          ${Object.entries(e).map(([e,t])=>`<option value="${e}">${t}</option>`).join(``)}
        </select>
      </div>
      <label for="aporte-texto" class="oculto">Texto del aporte</label>
      <textarea id="aporte-texto" name="texto" rows="4" minlength="10" maxlength="2000" required
        placeholder="Dirigido a la propuesta, no a personas. Si aportas una evidencia, incluye el enlace." ${t?`disabled`:``}></textarea>
      <button class="boton primario" type="submit" ${t?`disabled`:``}>Enviar para moderación</button>
      <p class="discreto" data-aviso>${t?`Los aportes se activan cuando el banco se publique con su base de datos.`:``}</p>
    </form>`}async function a(e){e.dataset.propuesta;let t=e.querySelector(`[data-aportes]`);t.innerHTML=i(!0)}function o(){let e=document.getElementById(`valoracion`);e&&r(e);let t=document.getElementById(`aportes`);t&&a(t)}export{o as iniciarParticipacion};