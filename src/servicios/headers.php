<?php
header("X-Content-Type-Options: nosniff");
// Evita que el navegador adivine o cambie el tipo de contenido de los recursos (como CSS o JavaScript). 
// Esto reduce ataques como XSS (Cross-Site Scripting).

header("X-Frame-Options: DENY");
// Impide que la página sea cargada dentro de un iframe. Protege contra ataques de "clickjacking".

header("Content-Security-Policy: default-src 'self';");
// Restringe los recursos (scripts, imágenes, estilos, etc.) que el navegador puede cargar. 
// Aquí solo se permiten recursos del mismo origen ('self').

header("Referrer-Policy: no-referrer");
// Evita que la información del encabezado `Referer` se envíe al hacer solicitudes. 
// Esto protege información sensible como rutas de páginas internas.

header("Strict-Transport-Security: max-age=31536000; includeSubDomains; preload");
// Obliga a usar HTTPS durante un año (31536000 segundos). 
// `includeSubDomains` aplica la política a todos los subdominios. 
// `preload` permite que los navegadores carguen esta configuración previamente si tu dominio está en una lista de pre-carga.

?>