# Votación de propuestas: credencial de documento

Acordado con Mitch el 21 oct 2026. No volver a la sesión anónima del navegador.

- Se vota con documento: carné de identidad cubano o pasaporte/otro documento (dentro y fuera de Cuba).
- El número nunca se guarda: SHA-256 en el navegador + `privado.cifrar_credencial` (clave secreta en el servidor), igual que la consulta «Continuidad o cambio».
- Un documento = un voto por propuesta. Se puede cambiar el voto, no duplicarlo.
- Continuidad entre dispositivos: el titular elige un PIN la primera vez. Documento + PIN en cualquier dispositivo recupera sus votos.
- Suplantación: si alguien usa el mismo documento sin el PIN correcto (o el titular reclama), los votos de esa credencial quedan invalidados (suspendidos) y se pide prueba de identidad. Resuelve el equipo a mano; tras verificar, la credencial pasa al titular con PIN nuevo.
- Sin conflicto, se mantiene un voto por documento.
- Derechos fundamentales (web/src/data/derechos.js, banco.consolidada.votable = false): no se votan.
- Se mantiene Cloudflare Turnstile contra bots.
