# Presentation deployment

Software Factory se despliega desde un solo repositorio como dos proyectos Vercel independientes. Esta etapa es un entorno de presentación interna, no un lanzamiento público.

## Arquitectura y orden

```text
software-factory repository
├── apps/demos   → Vercel Project: Software Factory Demos
└── apps/website → Vercel Project: Software Factory Website
```

Orden obligatorio:

1. Crear y desplegar **Software Factory Demos**.
2. Copiar su URL pública `https://<demos-project>.vercel.app`.
3. Crear **Software Factory Website** y configurar `NEXT_PUBLIC_DEMOS_BASE_URL` con esa URL, sin slash final.
4. Desplegar Website.
5. Ejecutar el checklist online de este documento.

## Configuración Vercel

Usar el mismo repositorio para ambos proyectos. Vercel reconoce el lockfile raíz, `pnpm-workspace.yaml`, Turborepo y `packageManager`.

| Setting | Website | Demos |
| --- | --- | --- |
| Root Directory | `apps/website` | `apps/demos` |
| Framework Preset | Next.js | Next.js |
| Include source files outside Root Directory | Enabled | Enabled |
| Install Command | Automatic | Automatic |
| Build Command | Automatic (`pnpm run build`) | Automatic (`pnpm run build`) |
| Output Directory | Automatic (`.next`) | Automatic (`.next`) |
| Node.js | 20.x or newer compatible | 20.x or newer compatible |
| Environment Variables | `NEXT_PUBLIC_DEMOS_BASE_URL` | None |

No se necesita `vercel.json`. Los paquetes internos están declarados como dependencias `workspace:*`; mantener habilitada la inclusión de archivos externos al Root Directory permite que Vercel resuelva `packages/*` y el lockfile raíz.

## Environments

Local, en `apps/website/.env.local`:

```dotenv
NEXT_PUBLIC_DEMOS_BASE_URL=http://localhost:3001
```

Vercel Website, para Preview y Production:

```dotenv
NEXT_PUBLIC_DEMOS_BASE_URL=https://<demos-project>.vercel.app
```

No configurar esta variable en Demos. Los cambios de `.env.local` requieren reiniciar Next.js; los cambios en Vercel requieren un nuevo deployment. La variable está declarada como input del build de Website en `turbo.json`, por lo que cambiarla invalida la caché correspondiente.

## Noindex y seguridad

Website y Demos publican metadata `noindex, nofollow`. Para el lanzamiento oficial, retirar `robots: { index: false, follow: false }` de ambos `app/layout.tsx`, hacer un nuevo deployment y verificar el HTML y los headers resultantes.

`.env.local` y variantes `.env.*` están ignorados por Git; solo `.env.example` puede versionarse. No incorporar credenciales al repositorio ni usar variables `NEXT_PUBLIC_*` para secretos: esas variables se incluyen en el cliente.

Los Preview Deployments y los Production Deployments son entornos distintos. Para esta presentación pueden compartirse URLs `*.vercel.app`; configurar la misma URL de Demos en los ambientes de Website que se vayan a presentar. No se configura dominio personalizado en esta fase.

## QA online posterior al deploy

- [ ] Website carga sin errores.
- [ ] El HTML de Website y Demos contiene `noindex, nofollow`.
- [ ] Navbar, Hero y Solutions funcionan.
- [ ] El carrusel infinito inicia en AURA.
- [ ] COVERA → AURA funciona sin salto visible.
- [ ] AURA ← COVERA funciona sin salto visible.
- [ ] Los ocho enlaces abren la demo correcta.
- [ ] Pricing conserva los cuatro planes y transporta contexto a Contact.
- [ ] Contact valida campos y muestra el success state demostrativo.
- [ ] El formulario declara que no envía ni almacena información.
- [ ] Mobile menu, carrusel, pricing y contact funcionan.
- [ ] Cada ruta directa abre y recarga correctamente: `/beauty/dashboard`, `/taller/dashboard`, `/consultorio/dashboard`, `/stock/dashboard`, `/autoparts/dashboard`, `/inmobiliaria/dashboard`, `/sales/dashboard`, `/insurance/dashboard`.
- [ ] Consola sin errores ni hydration warnings.
- [ ] No existen assets 404.
- [ ] Ningún enlace publicado contiene `localhost`.
- [ ] No existe overflow horizontal.

Cuando termine el QA, compartir la URL de Preview o Production elegida con el socio. No promover ni conectar un dominio hasta decidir el lanzamiento comercial.
