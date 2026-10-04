# Screen concepts

AI-generated visual references following `docs/project-spec.md` and the supplied blue-and-white brand references. Each concept sheet contains no more than four app screens.

## User / Travel App

All 23 screens U01–U23 are represented across these six ordered sheets:

1. `user/U01-U04-entry-home.png` — Welcome/Login, Registration, Travel Profile Setup, Home.
2. `user/U05-U08-trip-planning.png` — Create Trip, Route Planning, Recommended Stops, Trip Review.
3. `user/U09-U12-trips-share.png` — My Trips, Trip Detail, Live Journey, Share Trip.
4. `user/U13-U16-discover-menu.png` — Join Shared Trip, Station Detail, Menu, Product Detail.
5. `user/U17-U20-ordering.png` — Cart, Checkout, Order Detail, Orders.
6. `user/U21-U23-profile-partner-earnings.png` — Profile, Partner Driver, Earnings.

## Station Portal

Each file contains one desktop screen, matching the requested desktop presentation:

1. `station/S01-login.png` — Station Login.
2. `station/S02-overview.png` — Overview and station-wide KPIs.
3. `station/S03-incoming-vehicles.png` — Incoming Vehicles.
4. `station/S04-vehicle-detail.png` — Vehicle Detail.
5. `station/S05-vehicle-checkin.png` — Simulated Vehicle Check-in.
6. `station/S06-order-management.png` — Station-wide order monitoring.
7. `station/S07-order-detail.png` — Read-only Order Detail.
8. `station/S08-sales-analytics.png` — Sales Analytics and Merchant Performance.
9. `station/S09-driver-partners-commission.png` — Driver Partners and Commission.

## Merchant App

Each concept sheet contains three mobile/POS screens. M03 is repeated to show its in-progress and ready-for-pickup states:

1. `merchant/M01-M03-login-orders.png` — M01 private shop login, M02 the logged-in shop's order queue, and M03 order detail/kitchen ticket while preparing.
2. `merchant/M03-M05-ready-menu-today.png` — M03 ready/pickup and reprint state, M04 menu availability, and M05 today's shop summary.

Merchant accounts are independent: each login is bound to one merchant and opens directly into that shop. The concepts do not provide a shop/quầy selector or cross-shop navigation.

All images are AI-generated concept sheets, not separate production screen assets. Use `docs/project-spec.md` for exact behavior. Station Portal manages the whole station and monitors shop readiness; Merchant handles only its own orders and menu. Their operational data is shared across the demo interfaces.
