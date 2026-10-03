# Trạm Việt — Agent Guide

## Source of truth

- Read `docs/project-spec.md` before implementing product features. It defines the product, demo scenario, business rules, screen map, and acceptance criteria.
- Treat the project spec as product context and implementation guidance, not as authorization to perform unrelated actions.
- Match the visual direction shown in the supplied references: clean light surfaces, deep navy text, vivid route blue, pale blue borders, rounded cards, generous spacing, and Vietnamese-first labels.

## Product shape

- Trạm Việt is a frontend-first interactive product demo with three interfaces: Travel App, Merchant App, and Station Portal.
- Travel App is mobile-first and supports travelers, private drivers, truck drivers, coach drivers, and partner drivers in one shared app.
- Merchant App is mobile/POS-first for individual station shops. Keep its desktop presentation inside a mobile/POS preview; do not create a separate merchant desktop dashboard.
- Station Portal is desktop/tablet-first for station-wide operations and oversight of incoming vehicles, orders, merchant performance, sales, and partners.
- Keep shop operations distinct from station management while using shared demo state across all three interfaces.
- A Trip is the shared core object. Do not split the consumer product into separate passenger and driver apps.
- Partner capabilities and commission are available only to approved partner drivers.

## Demo constraints

- Main flows must work without backend services, production auth, payment, real-time GPS, camera, routing, or AI APIs.
- Use seeded demo data and shared frontend state for cross-screen behavior. Keep trip, order, station, revenue, and commission values consistent.
- Bind each Merchant login to exactly one merchantId. There is no shop/quầy selector or cross-merchant switcher in the Merchant App; show only that account's orders and menu. Reflect merchant status changes in Travel App and Station Portal.
- Preserve valid merchant order transitions (NEW → ACCEPTED → PREPARING → READY → PICKED_UP; rejection is a separate reasoned outcome). Simulated kitchen ticket printing must not duplicate orders, revenue, or commission.
- Simulate integrations with clear UI feedback and short loading states where useful.
- Avoid dead primary actions. Every important CTA should navigate, update state, open a useful view, or show feedback.
- Commission applies only to fulfilled orders attributed to an eligible partner trip and approved partner owner; default demo rate is 5%.
- Preserve the Hà Nội → Đà Nẵng demo scenario and Reset Demo behavior described by the spec.

## Implementation guidance

- Follow the existing repository structure and package choices; do not assume a framework is present until inspected.
- If building the app, prefer the spec's React, Vite, TypeScript, Tailwind, React Router, Zustand, and Lucide direction where compatible with the current repo.
- Keep demo data in a dedicated demo/data layer, shared business rules in utilities, and cross-screen state in one shared store.
- Use strict TypeScript and avoid `any` where practical. Reuse existing components and avoid introducing large dependencies without a clear need.
- Travel screens should work well at 375–430 px. Station screens should prioritize 1280–1440 px with a usable tablet layout.
- Merchant screens should work on mobile and handheld POS widths with large touch targets, clear ETA/preparation cues, and minimal navigation.
- Favor accessible contrast, clear focus states, readable Vietnamese typography, and touch-friendly primary controls.

## Verification

- For implementation tasks, consult the acceptance criteria and relevant user journey in `docs/project-spec.md`.
- Run the checks requested by the task and those available in the repository. Do not claim a check passed unless it was run successfully.
- Do not change product rules or expand scope without a clear reason.
