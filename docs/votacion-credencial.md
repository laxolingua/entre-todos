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

## Referencia: Encuesta Cuba 2026 (elTOQUE y coalición de medios)
Metodología en docs/referencias. Sin verificación de identidad. Siete capas antibots: restricción de origen,
token de un solo uso, campo trampa, tiempo mínimo de 20 s, Cloudflare Turnstile, marca de sesión en el navegador
(admiten que la navegación privada o varios navegadores la sortean) y 5 respuestas/día por IP fuera de Cuba.
42.263 respuestas, 40.375 válidas tras depurar. Adoptar de ahí: token de un solo uso, campo trampa y tiempo mínimo,
además de la credencial de documento, que es lo que ellos no tenían.
