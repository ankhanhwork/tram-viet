# Trạm Việt

**Bạn đồng hành xuyên Việt** — a frontend-first interactive demo connecting long-distance travelers, drivers, and roadside rest stations.

## Product

Trạm Việt helps people plan long-distance trips, discover suitable stops, share and join itineraries, and order food or services before arriving. Its Station Portal gives station teams visibility into incoming vehicles, passenger demand, pre-orders, and trip-attributed revenue. Approved partner drivers can also view their attributed orders and commission.

The project is a pitch/demo experience. Core flows are intended to run on seeded frontend data without production backend, authentication, payment, GPS, camera, or AI integrations.

## Project documents

- [Project specification](docs/project-spec.md): product requirements, screen inventory, demo scenario, business rules, and acceptance criteria.
- [Agent guide](AGENTS.md): working conventions for implementation and future coding agents.
- [Screen concepts](screen/): generated visual references for the Travel App and Station Portal.

## Demo story

The primary scenario follows an approved partner coach on a Hà Nội → Đà Nẵng trip. Travelers join the shared trip and pre-order at Trạm Việt Ninh Bình. Station staff see the approaching vehicle and prepare the order; after fulfillment, eligible trip revenue contributes to the driver's 5% commission.

## Product surfaces

### Travel App — mobile first

Home, trip planning and detail, live journey, share/join, station discovery, menu and checkout, orders, profile, and partner earnings.

### Station Portal — desktop/tablet first

Overview, incoming vehicles and check-in, order management, sales analytics, driver partners and commission, and settings.

## Visual direction

Use the supplied references as the visual baseline: bright white backgrounds, deep navy typography, vivid blue primary actions, pale blue outlines, rounded cards, and a calm, trustworthy road-travel aesthetic. Keep Vietnamese as the primary interface language.

## Repository status

This workspace currently contains the project specification and initial project guidance. No application source code or package scripts are present yet. Follow the phased implementation plan in the spec when starting the interactive demo.
