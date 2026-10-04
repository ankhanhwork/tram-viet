# Trạm Việt Screen Concepts

These concept sheets are organized by actor and the pitch journey. The story is: a coach driver shares a QR code, a passenger opens a mobile web journey without installing an app, places a pre-order, the driver checks in at the station, and the merchant hands the order over.

## Pitch Journey

```text
Driver plans the trip and shares QR
  -> Guest opens QR web and views the itinerary
  -> Guest selects the next station and pre-orders
  -> Merchant prepares against ETA
  -> Driver checks in on the Driver App
  -> Station Portal receives the check-in event
  -> Merchant hands over READY orders
  -> Completed revenue and driver commission update
```

## `driver/` — Logged-in Driver App

The driver can plan/edit a trip, share its QR, check in, and view trip-attributed earnings. These are screens of the shared logged-in Travel App, not a separate driver app.

1. `D01-D04-entry-home.png` — Existing entry and home concepts retained as reference.
2. `D05-D08-trip-planning.png` — Route planning, stop selection, and itinerary review.
3. `D09-D12-live-journey-share.png` — My trips, trip detail, live journey, and QR sharing. QR copy must say "Xem hành trình và đặt món trước", not "join trip".
4. `D13-D15-check-in.png` — New flow: arrival prompt, confirmation with vehicle/station data, then check-in success with rest countdown and order readiness.
5. `U21-U23-profile-partner-earnings.png` — Driver profile, approved partner details, and commission/earnings. U21 is the common profile; U22–U23 are partner-only extensions. The approved demo state should not invite the driver to become a partner again.

## `guest-qr/` — Passenger QR Mobile Web

This is a no-login, no-install browser journey. It has no profile, bottom navigation, passenger list, or driver controls.

The presentation sheets are in `guest-qr/`, with 2–3 screens per sheet at near-native screen resolution. `guest-qr/screens/` contains the individual full-resolution sources for zooming and future edits.

1. `Q01-Q03-qr-itinerary-next-stop.png` — QR landing, full itinerary, and upcoming station. Q01 visibly shows `tramviet.vn/t/HN-DN-A8K29` in the browser address bar.
2. `Q04-Q06-station-catalog-food.png` — Station detail with visible browser address bar, shopping catalog, and Cơm gà food detail. The catalog still includes food, drinks, regional specialties, and travel essentials.
3. `Q07-Q08-cart-checkout.png` — Cart grouped by merchant/counter and combined checkout summary.
4. `Q09-Q10-order-arrival.png` — Simplified order success and post-check-in tracking. Each counter retains its own readiness and pickup code; the C01 portion still waits for preparation after the vehicle arrives.

## `merchant-pos/` — Merchant Mobile/POS

Each merchant is bound to its own account and sees only its own orders and menu.

1. `M01-M03-login-orders.png` — Merchant login, queue, and initial order detail.
2. `M03-check-in-gate.png` — New fulfillment rule: a READY order waits for driver check-in; only then can the merchant verify the pickup code and hand over.
3. `M03-M05-ready-menu-today.png` — Ready/pickup reference, menu availability, and daily summary.

## `station-portal/` — Station Operations

1. `S01-login.png` and `S02-overview.png` — Portal entry and operating KPIs.
2. `S03-S05-driver-check-in-flow.png` — Updated arrival and check-in model. Driver App check-in is authoritative; camera recognition is optional verification only.
3. `S03-incoming-vehicles.png` through `S09-driver-partners-commission.png` — Existing detailed references. Statuses should follow: `Sắp đến` -> `Tài xế đã check-in` -> `Đang phục vụ` -> `Đã rời trạm`.

## `archive/`

The repository-root `archive/` preserves earlier concepts. The old U13-U20 concepts must not be used for the guest QR flow because they assume a joined/logged-in Travel App and include mismatched rail wording.

## Implementation Notes

- Guest QR routes use a public trip code, for example `/t/HN-DN-A8K29`.
- Guests view the itinerary before ordering; the next scheduled station is the default order context.
- The catalog includes food, drinks, regional specialties, and travel essentials. The retail counter is named **Siêu thị Trạm Việt · Quầy C01**. A guest can combine goods from multiple merchants in one customer order. Each merchant receives only its own portion and uses its own pickup code/counter. The whole order is complete only after every portion is fulfilled.
- A frontend-only pitch can use seed state in one browser session. A multi-device pilot requires a shared backend for orders and check-in events.
- Driver check-in changes the trip to `AT_STATION`, unlocks merchant handover, and updates the guest tracking screen and Station Portal.
