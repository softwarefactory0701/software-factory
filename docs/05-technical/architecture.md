# Arquitectura técnica inicial

## Estado

- Fase: SF-001A — Software Factory Foundation
- Tipo: monorepo frontend
- Runtime: Node.js 20.19 o superior
- Gestor de paquetes: pnpm
- Orquestación: Turborepo
- Aplicaciones: Next.js con App Router
- Lenguaje: TypeScript estricto
- Estilos: Tailwind CSS

## Estructura

```text
software-factory/
├── apps/
│   ├── website/          # Sitio institucional
│   └── demos/            # Catálogo y futuro host de demos
├── packages/
│   ├── ui/               # Primitivas visuales
│   ├── demo-shell/       # Marco común de una demo
│   ├── booking-core/     # Contratos neutrales de reservas
│   ├── stock-core/       # Placeholder
│   ├── crm-core/         # Placeholder
│   ├── mock-data/        # Contratos para datos ficticios
│   └── verticals/        # Contrato y carpetas por vertical
├── docs/
└── scripts/
```

## Límites y dependencias

El sentido permitido de las dependencias es:

```text
apps ──> verticals ──> cores ──> ui
  └──────────> demo-shell ─────> ui
  └──────────> mock-data
```

En SF-001A las apps todavía no consumen configuraciones concretas de vertical. Los contratos existen para habilitarlo en la siguiente fase.

Reglas:

- `ui` no conoce demos, cores ni industrias.
- `demo-shell` solo conoce estructura de navegación y presentación.
- Un core no importa una vertical.
- Una vertical puede configurar y extender uno o más cores.
- Los datos ficticios no se mezclan con definiciones de componentes.
- Las apps ensamblan las capas y definen las rutas.

## Aplicaciones

### website

Sitio institucional de Software Factory. Explica la propuesta y el principio Demo ≠ Producción. No aloja lógica de una vertical.

### demos

Catálogo de demostraciones y futuro punto de entrada a cada vertical. En SF-001A muestra únicamente estados planificados para evitar representar una vertical como implementada.

## Paquetes compartidos

### ui

Primitivas accesibles, pequeñas y sin lógica de negocio. Inicialmente incluye `Badge`, `Button` y `Card`. Se amplía solamente cuando una pantalla real lo necesite.

### demo-shell

Layout reutilizable con sidebar de escritorio, header, breadcrumb simple, navegación móvil, perfil y distintivo DEMO. Recibe navegación y contenido mediante propiedades; no decide términos ni módulos.

Las tablas, charts y modales se incorporarán como componentes o slots cuando una vertical los requiera. No se incluyen bibliotecas de charts ni modales en Foundation.

### booking-core

Define contratos neutrales, escenarios deterministas, estado local reseteable y la composición visual diaria de reservas. No implementa disponibilidad, persistencia ni reglas operativas.

### stock-core y crm-core

Paquetes placeholder compilables. No exponen aún modelos funcionales. Crear sus APIs antes de tener casos de uso reales sería sobrearquitectura.

### mock-data

Marca datasets como exclusivos para demo y expone el aviso estándar. En fases siguientes contendrá escenarios deterministas por vertical.

### verticals

Expone `VerticalDefinition`, que reúne identidad, terminología, navegación, módulos, tema, configuración y clave de datos ficticios. Las subcarpetas reservan el espacio de cada vertical, pero ninguna está implementada en SF-001A.

## TypeScript y compilación

`tsconfig.base.json` habilita modo estricto y controles adicionales. Los paquetes exportan TypeScript fuente y las aplicaciones Next.js los transpilan mediante `transpilePackages`. Es una opción sencilla para un monorepo privado y evita agregar un bundler de librerías antes de necesitar publicación independiente.

Turborepo coordina `dev`, `build`, `lint` y `typecheck`. El lockfile de pnpm fija el grafo completo de dependencias.

## Tailwind CSS

Cada aplicación mantiene su hoja global y declara como fuentes los paquetes visuales que consume. Esto preserva el aislamiento entre apps y asegura que Tailwind genere las clases usadas dentro del workspace.

## Seguridad y datos

No hay secretos, variables de entorno, base de datos, autenticación, pagos ni integraciones. No existe backend de aplicación. Cualquier interacción añadida a una demo deberá indicar su carácter simulado y restablecerse de forma determinista.

## Criterio para nuevas abstracciones

Una pieza se mueve a un paquete compartido cuando tiene un consumidor real y una expectativa clara de reutilización. Hasta entonces permanece cerca de la vertical que la necesita. Esta regla protege al proyecto de abstracciones especulativas.

## Evolución SF-001B

Beauty se ensambla en `apps/demos/app/beauty` y consume dos entradas explícitas:

- `@software-factory/verticals/beauty`: identidad, términos, navegación, módulos, tema y metadata;
- `@software-factory/mock-data/beauty`: escenario determinista de AURA Beauty Studio.

`DemoShell` admite ahora tema por propiedades CSS, iconos de navegación e identidad de marca. Continúa sin importar Next.js ni conocer conceptos de Beauty; una pequeña capa cliente dentro de la app adapta `usePathname` y la configuración vertical.

Los primitives `StatCard`, `StatusBadge`, `SectionHeader`, `ProgressBar` y tabla se extrajeron a `ui` después de aparecer en más de una pantalla. Los paneles, avatares, iconografía y composición de agenda permanecen dentro de Beauty porque todavía expresan decisiones específicas del vertical.

## Booking Core v1 — SF-001C

Booking Core incorpora contratos neutrales, un `BookingScenario` determinista, helpers de composición, un reducer de estado demo y tres componentes de agenda ya validados por Beauty. La dependencia permitida sigue el sentido `booking-core → ui`.

Los datos Beauty adaptan sus entidades a `BookingScenario` desde `mock-data/beauty`; Booking Core nunca importa Beauty ni `verticals`. Para consumidores no visuales se exponen subpaths `@software-factory/booking-core/types` y `@software-factory/booking-core/scenario`, evitando cargar exports React en paquetes de datos.

El estado se mantiene en memoria mediante reducer. Su snapshot inicial permite `Reset demo` sin almacenamiento local ni infraestructura. Las mutaciones son de presentación y no expresan reglas de dominio productivas.

La vista diaria y el drawer se comparten. Beauty conserva la vista semanal, el modal comercial de creación, labels, metadata enriquecida y presentación de estados. Esta frontera deberá validarse con un segundo vertical antes de extraer más composición.
