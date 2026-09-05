# Website commercial flow

## Purpose

The commercial website guides a prospect through a simple path:

`Website → Solutions → Demo → Pricing → Contact → future lead capture`

Commercial Website v1 is ready for internal commercial presentation and visually frozen after SF-WEB-008.

The experience is intentionally commercial and navigable. It is not a SaaS onboarding flow and does not create accounts, charge payments, or persist leads.

## CTA audit

| CTA | Location | Expected action | Implemented action | Status |
| --- | --- | --- | --- | --- |
| Soluciones | Desktop/mobile navbar | Navigate to solutions | `#soluciones` | Active |
| Demos | Desktop/mobile navbar | Navigate to demos | `#demos` | Active |
| Precios | Desktop/mobile navbar | Navigate to pricing | `#precios` | Active |
| Software a medida | Desktop/mobile navbar | Navigate to custom software | `#software-medida` | Active |
| Hablemos | Header/mobile menu | Navigate to contact | `#contacto` | Active |
| Explorar soluciones | Hero | Navigate to solutions | `#soluciones` | Active |
| Ver demos | Hero | Navigate to demos | `#demos` | Active |
| Reservas / Inventario / CRM | Solutions | Change the displayed family | Local accessible tabs | Active |
| Product vertical selectors | Solutions | Change the displayed vertical | Local accessible tabs | Active |
| Explorar product | Solutions | Open selected demo | `NEXT_PUBLIC_DEMOS_BASE_URL + demo path` | Active |
| Abrir demo (8 cards) | Demo carousel | Open the corresponding demo | `NEXT_PUBLIC_DEMOS_BASE_URL + demo path` | Active |
| Consultar plan (4 plans) | Pricing | Go to contact with plan context | `?interest=<plan>#contacto` | Active |
| Quiero hablar sobre mi proyecto | Contact | Validate the commercial enquiry | Frontend-only demo confirmation | Active |
| Hablar sobre mi negocio | Final CTA | Navigate to contact | `#contacto` | Active |
| Explorar demos | Final CTA | Navigate to demos | `#demos` | Active |
| Footer navigation | Footer | Navigate to semantic sections | Section anchors | Active |

## Semantic anchors

- `#soluciones`
- `#demos`
- `#precios`
- `#software-medida`
- `#contacto`

The document uses smooth scrolling and navbar-aware scroll offsets. Direct URLs with hashes resolve to the same sections.

## Demo routes

Demo links are built from `NEXT_PUBLIC_DEMOS_BASE_URL`. The configured base is joined with these paths:

- AURA: `/beauty/dashboard`
- TORQUE: `/taller/dashboard`
- NEXUS: `/consultorio/dashboard`
- PULSE: `/stock/dashboard`
- PARTX: `/autoparts/dashboard`
- NOVA: `/inmobiliaria/dashboard`
- VANTAGE: `/sales/dashboard`
- COVERA: `/insurance/dashboard`

When the environment variable is absent, paths remain same-origin relative links. Local commercial validation should set the variable to the locally running demos origin.

## Current demo behavior

The contact form validates required fields, email/WhatsApp format, carries the selected pricing-plan context, and displays a premium success state. Submission is deliberately local: nothing is sent or stored. The UI states this before submission and in the confirmation.

## Future production integration

A production phase must replace the local submit handler with a secure server endpoint and an approved CRM/email destination. It must define consent, spam protection, observability, retention, privacy handling, error/retry states, and ownership of lead follow-up. None of those integrations exist in the current demo.
