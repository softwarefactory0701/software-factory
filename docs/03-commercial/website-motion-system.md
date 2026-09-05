# Website Motion System

## Principios

El movimiento es lento, intencional y funcional. Refuerza jerarquía y profundidad sin distraer de la propuesta.

## Timing y easing

- Entrada de sección: 800 ms.
- Stagger: 60–140 ms.
- Hover y controles: 250–400 ms.
- Easing: `cubic-bezier(.22, 1, .36, 1)`.

## Patrones

- `Reveal`: fade y desplazamiento vertical de 24 px al entrar al viewport.
- Hover lift: máximo 2–4 px.
- Link arrow: desplazamiento diagonal de 3 px.
- Navbar: superficie, borde y blur después del scroll.
- Menú mobile: superficie fullscreen limpia.

Con `prefers-reduced-motion: reduce`, se desactivan scroll suave y transformaciones de entrada. El contenido nunca depende de animación.

## Evitar

Bounce, springs exagerados, zoom agresivo, rotación continua, parallax intenso, scroll hijacking, cursor personalizado, botones magnéticos y WebGL sin fallback.

## SF-WEB-003

Motion se utiliza en el Image Stream, morph de verticales, Background Paths, progreso del proceso, reveals y Velaris. Los movimientos principales usan la curva `[.22, 1, .36, 1]`; las animaciones ambientales duran entre 7 y 22 segundos.

Velaris usa gradientes CSS animados y grain SVG embebido, no WebGL. Esto conserva el render inicial, evita un runtime gráfico adicional y ofrece fallback inmediato. Reduced motion congela blobs, paths, stream y progreso sin ocultar contenido.
