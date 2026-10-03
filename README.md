# Trạm Việt

**Bạn đồng hành xuyên Việt** — a frontend-first interactive demo connecting long-distance travelers, drivers, station shops, and roadside rest stations.

## Product

Trạm Việt helps people plan long-distance trips, discover suitable stops, share and join itineraries, and order food or services before arriving. A dedicated Merchant App helps each shop receive only its own orders, prepare them against vehicle ETA, and hand them over. The Station Portal gives station teams a station-wide view of incoming vehicles, passenger demand, shop readiness, pre-orders, sales, and trip-attributed revenue. Approved partner drivers can view their attributed orders and commission in the shared Travel App.

The project is a pitch/demo experience. Core flows are intended to run on seeded frontend data without production backend, authentication, payment, GPS, camera, or AI integrations.

## Project documents

- [Project specification](docs/project-spec.md): product requirements, screen inventory, demo scenario, business rules, and acceptance criteria.
- [Agent guide](AGENTS.md): working conventions for implementation and future coding agents.
- [Screen concepts](screen/): generated visual references for all three product interfaces.

## Demo story

The primary scenario follows an approved partner coach on a Hà Nội → Đà Nẵng trip. Travelers join the shared trip and pre-order at Trạm Việt Ninh Bình. The selected shop receives its order, uses the ETA-based preparation cue, and marks it ready and handed over. Station staff monitor vehicle and shop readiness; after pickup, eligible trip revenue contributes to the driver's 5% commission.

## Product surfaces

### Travel App — mobile first

Home, trip planning and detail, live journey, share/join, station discovery, menu and checkout, orders, profile, and partner earnings.

### Station Portal — desktop/tablet first

Overview, incoming vehicles and check-in, order management, sales analytics, driver partners and commission, and settings.

### Merchant App — mobile/POS first

Each shop has its own login, bound to that shop's account. After login, staff go directly to their own order queue and cannot choose or switch to another shop. The app includes order detail and kitchen ticket, ETA-based preparation prompts, menu availability, and today's summary. A desktop view should remain inside a handheld POS/mobile preview rather than becoming a separate merchant dashboard.

## Visual direction

Use the supplied references as the visual baseline: bright white backgrounds, deep navy typography, vivid blue primary actions, pale blue outlines, rounded cards, and a calm, trustworthy road-travel aesthetic. Keep Vietnamese as the primary interface language.

## Repository status

This workspace currently contains the project specification and initial project guidance. No application source code or package scripts are present yet. Follow the phased implementation plan in the spec when starting the interactive demo.
