# Software Factory

Monorepo para construir demos comerciales navegables de software verticalizado. Las demos usan datos ficticios y acciones simuladas; no son aplicaciones de producción.

> Demo ≠ Producción

## Requisitos

- Node.js 20.19 o superior
- Corepack habilitado, o pnpm 11.25 instalado

## Instalación

```bash
corepack enable
pnpm install
```

Si `corepack enable` requiere permisos de administrador, ejecútalo una vez desde una terminal elevada o instala la versión de pnpm declarada en `package.json`. Turborepo necesita que el binario `pnpm` sea accesible desde `PATH`.

## Desarrollo

Ejecutar todo el monorepo:

```bash
pnpm dev
```

Ejecutar una app individual:

```bash
pnpm dev:website
pnpm dev:demos
```

- Website: http://localhost:3000
- Demos: http://localhost:3001
- Beauty: http://localhost:3001/beauty

## Validación

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## Cómo entender el monorepo

- `apps/website`: presencia institucional.
- `apps/demos`: catálogo y futuro host de demos.
- `packages/ui`: primitivas visuales sin dominio.
- `packages/demo-shell`: navegación y marco visual común.
- `packages/booking-core`: contratos, estado demo y agenda diaria reutilizable.
- `packages/stock-core` y `packages/crm-core`: placeholders no funcionales.
- `packages/mock-data`: utilidades para datos explícitamente ficticios.
- `packages/verticals`: contrato común y espacio de cada industria.
- `docs`: visión, decisiones técnicas y documentación futura.

Consulta [la visión](docs/00-vision/software-factory-vision.md) y [la arquitectura técnica](docs/05-technical/architecture.md) antes de crear una vertical.

## Reglas de desarrollo

- En una demo solamente desarrollamos aquello que ayuda a vender.
- Ninguna demo procesa datos o acciones reales.
- Los cores son neutrales; las verticales aportan lenguaje, tema, datos y módulos propios.
- No se agregan dependencias sin un caso de uso concreto.
- Una venta inicia un proyecto de producción independiente.

## Estado

- SF-001A: foundation aprobada.
- SF-001B: demo Beauty disponible bajo `/beauty` con datos ficticios y acciones simuladas.

Consulta el [blueprint comercial de Beauty](docs/02-products/beauty.md) para conocer el escenario y sus límites.
