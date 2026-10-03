# TRẠM VIỆT – BẠN ĐỒNG HÀNH XUYÊN VIỆT

## Project Specification – Interactive Product Demo

**Tên sản phẩm:** Trạm Việt  
**Tagline:** Bạn đồng hành xuyên Việt  
**Loại sản phẩm:** Webapp responsive, ưu tiên trải nghiệm mobile cho người đi đường và desktop/tablet cho trạm dừng  
**Mục tiêu hiện tại:** Xây dựng interactive product demo phục vụ pitching, chưa phải sản phẩm production  
**Nguyên tắc triển khai:** Frontend-first, không phụ thuộc backend, không cần API thật, không cần thanh toán thật, nhưng toàn bộ flow chính phải có thể bấm và trải nghiệm được như một sản phẩm hoàn chỉnh.

---

# 1. MỤC TIÊU DỰ ÁN

Trạm Việt là nền tảng hỗ trợ người dùng lên kế hoạch hành trình đường dài, xác định điểm dừng phù hợp, theo dõi lịch trình, chia sẻ chuyến đi và đặt đồ ăn/dịch vụ trước tại các trạm dừng chân.

Sản phẩm phục vụ nhiều nhóm người dùng trong cùng một app:

- Hành khách / người đi du lịch.
- Người tự lái xe cá nhân.
- Tài xế tự do.
- Tài xế xe tải.
- Tài xế xe du lịch / xe khách.

Mọi người dùng đều có thể:

- Tạo chuyến đi.
- Lên lịch trình.
- Chọn điểm dừng.
- Xem các trạm dừng trên tuyến.
- Xem thời gian dự kiến tới từng điểm.
- Chia sẻ chuyến đi cho người khác.
- Tham gia chuyến đi được chia sẻ.
- Xem menu tại trạm.
- Đặt đồ ăn trước.
- Theo dõi đơn hàng.

Riêng **Tài xế đối tác** được mở thêm các chức năng:

- Theo dõi doanh thu phát sinh từ hành khách trong chuyến.
- Theo dõi commission.
- Xem các đơn hàng được attribution về chuyến của mình.
- Xem lịch sử thu nhập.

Điểm khác biệt quan trọng:

> Tài xế không phải là một app riêng. Tất cả người dùng sử dụng cùng một Travel App. “Tài xế đối tác” chỉ là một user được mở thêm Partner Capabilities và Commission.

---

# 2. MỤC TIÊU CỦA BẢN DEMO

Bản hiện tại **không nhằm chứng minh backend, thanh toán, GPS, AI hay camera thực sự hoạt động**.

Bản demo nhằm giúp khách hàng nhìn thấy và hiểu được:

1. Người dùng sẽ sử dụng Trạm Việt như thế nào trong một hành trình thực tế.
2. Tài xế có thể tạo và chia sẻ chuyến đi như thế nào.
3. Hành khách có thể tham gia chuyến và đặt đồ trước như thế nào.
4. Trạm dừng có thể biết trước xe nào sắp đến, có bao nhiêu hành khách và bao nhiêu đơn đặt trước.
5. Trạm có thể vận hành order trước khi xe đến.
6. Tài xế đối tác nhận commission như thế nào.
7. Trạm Việt tạo ra một hệ sinh thái kết nối Người đi đường – Tài xế – Trạm dừng.

Bản demo phải tạo cảm giác như một sản phẩm đã hoàn thiện ở mức UX/UI.

## 2.1. Tiêu chí quan trọng nhất

- Tất cả các CTA chính phải bấm được.
- Không có nút quan trọng nào bấm vào mà không có phản hồi.
- Các flow phải nối với nhau hợp lý.
- Dữ liệu hiển thị phải đồng nhất giữa các màn hình.
- Khi user thực hiện một hành động, UI phải thay đổi theo rule đã định nghĩa.
- Những feature chưa làm thật vẫn phải được mô phỏng bằng interaction hợp lý.
- Không cần backend thật.
- Không cần database thật.
- Không cần auth thật.
- Không cần payment thật.
- Không cần AI thật.
- Không cần camera thật.
- Không cần GPS realtime thật.
- Không cần Google Maps API hoặc routing API thật.

---

# 3. PRODUCT POSITIONING

## 3.1. Product statement

**Trạm Việt là nền tảng đồng hành trên hành trình đường dài, giúp người dùng lên lịch trình, lựa chọn điểm dừng, chia sẻ chuyến đi và đặt dịch vụ trước tại các trạm dừng chân.**

Đối với trạm dừng, Trạm Việt giúp:

- Biết trước xe nào sắp tới.
- Biết ETA của từng xe.
- Biết trước số hành khách.
- Nhận order trước khi khách tới.
- Chuẩn bị hàng trước.
- Theo dõi doanh thu theo từng chuyến.
- Theo dõi commission cho tài xế đối tác.
- Tạo incentive để nhiều xe lựa chọn dừng tại trạm.

## 3.2. Value proposition theo actor

### Người đi đường

- Lên kế hoạch chuyến đi dễ hơn.
- Biết các điểm dừng sắp tới.
- Không phải tìm trạm thủ công.
- Có thể đặt đồ ăn trước.
- Giảm thời gian chờ tại trạm.
- Có thể đi cùng một itinerary được người khác chia sẻ.

### Tài xế / Người tạo chuyến

- Tạo itinerary rõ ràng.
- Chia sẻ hành trình bằng link hoặc QR.
- Theo dõi lịch dừng.
- Theo dõi ETA.
- Điều chỉnh chuyến.

### Tài xế đối tác

Có toàn bộ quyền của user bình thường và thêm:

- Commission.
- Revenue generated.
- Order attribution.
- Partner status.
- Earnings history.

### Trạm dừng

- Nhìn thấy demand trước khi xe tới.
- Nhận pre-order.
- Chuẩn bị món trước.
- Theo dõi incoming vehicles.
- Theo dõi revenue theo chuyến.
- Quản lý commission tài xế.

---

# 4. CẤU TRÚC SẢN PHẨM

Bản demo gồm 2 sản phẩm chính:

## 4.1. Travel App

Dành cho:

- Traveler.
- Car driver.
- Independent driver.
- Truck driver.
- Tourist / coach driver.
- Partner driver.

Travel App ưu tiên giao diện mobile-first.

Navigation mặc định:

1. Home
2. Trips
3. Orders
4. Profile

Nếu user là Partner Driver:

1. Home
2. Trips
3. Orders
4. Earnings
5. Profile

## 4.2. Station Portal

Dành cho:

- Chủ trạm.
- Quản lý trạm.
- Nhân viên vận hành.

Station Portal ưu tiên desktop/tablet.

Navigation:

1. Overview
2. Incoming Vehicles
3. Orders
4. Sales
5. Partners
6. Settings

---

# 5. USER TYPE VÀ CAPABILITY

## 5.1. User types

Khi onboarding, hỏi:

**“Bạn thường sử dụng Trạm Việt theo hình thức nào?”**

Các lựa chọn:

1. Đi du lịch / di chuyển cá nhân.
2. Tài xế tự do / xe cá nhân.
3. Tài xế xe tải.
4. Tài xế xe du lịch / xe khách.

Không được thiết kế app theo logic “Passenger vs Driver”.

Một user có thể hôm nay tham gia chuyến của người khác, ngày mai tự tạo chuyến mới.

## 5.2. Partner Driver

Nếu user chọn “Tài xế xe du lịch / xe khách”, giao diện cho phép đăng ký Partner Program.

Thông tin demo:

- Tên nhà xe / công ty.
- Biển số xe.
- Loại xe.
- Sức chứa.
- Số điện thoại.
- Partner status.

Partner status giả lập:

- Not Applied.
- Pending.
- Approved.

Chỉ user có:

`partner_status = approved`

mới có:

`commission_eligible = true`

Không tự động nhận commission chỉ vì khai mình là tài xế xe khách.

---

# 6. CONCEPT TRUNG TÂM: TRIP

Trip là object trung tâm của toàn bộ Travel App.

Mọi user đều có thể:

- Create Trip.
- Join Trip.
- Share Trip.
- View Trip.
- Leave Trip.
- Order from Trip.

Một Trip có thể do:

- Traveler tạo.
- Tài xế xe tải tạo.
- Người tự lái xe tạo.
- Tài xế xe khách tạo.

Trip không được gọi là “Driver Trip”.

## 6.1. Trip fields dùng trong demo

```ts
interface Trip {
  id: string
  title: string
  ownerUserId: string
  origin: LocationPoint
  destination: LocationPoint
  departureTime: string
  estimatedArrivalTime: string
  vehicleType?: string
  vehiclePlate?: string
  passengerCount?: number
  status: TripStatus
  shareCode: string
  partnerTrip: boolean
  commissionEligible: boolean
  stops: TripStop[]
  members: TripMember[]
}
```

---

# 7. DEMO-FIRST ARCHITECTURE

## 7.1. Không backend

Không xây:

- Backend server.
- Database production.
- Authentication service.
- Payment gateway.
- AI service.
- Camera service.
- GPS service.
- Realtime server.

Toàn bộ app chạy bằng frontend state và demo data.

## 7.2. Data layer

Dữ liệu nằm trong code:

```text
src/demo/
  users.ts
  trips.ts
  stations.ts
  products.ts
  orders.ts
  commissions.ts
  routeData.ts
  demoScenario.ts
```

Có thể dùng Zustand để quản lý state runtime.

Có thể dùng localStorage để giữ state khi refresh.

Phải có nút Reset Demo để đưa app về trạng thái ban đầu.

## 7.3. Không phụ thuộc API ngoài để demo flow chính

Không gọi API để:

- Routing.
- ETA.
- Geocoding.
- Traffic.
- GPS.
- AI parsing.

Route coordinates, ETA và recommendation được lưu sẵn trong demo data.

Nếu sử dụng Leaflet/OpenStreetMap cho visual map thì app vẫn phải có fallback UI nếu map tile không load.

---

# 8. DEMO SCENARIO CHÍNH

Phải có ít nhất một scenario hoàn chỉnh để pitch.

## Scenario: Hà Nội → Đà Nẵng

### Tài xế đối tác

Tên: Nguyễn Văn Minh  
Loại user: Tài xế xe du lịch  
Nhà xe: Hoàng Long Express  
Biển số: 29B-123.45  
Sức chứa: 42 khách  
Partner status: Approved  
Commission rate: 5%

### Trip

Tên chuyến:

**Hà Nội → Đà Nẵng – Hoàng Long Express**

Lịch trình:

| Thứ tự | Điểm | Giờ dự kiến | Nghỉ |
|---|---|---:|---:|
| 1 | Hà Nội | 07:00 | - |
| 2 | Trạm Việt Ninh Bình | 09:15 | 20 phút |
| 3 | Thanh Hóa | 11:45 | - |
| 4 | Trạm Việt Nghệ An | 14:30 | 30 phút |
| 5 | Huế | 17:30 | - |
| 6 | Đà Nẵng | 20:00 | - |

### Current demo state

Khi mở demo mặc định:

- Trip status: EN_ROUTE.
- Xe đã rời Hà Nội.
- Điểm tiếp theo: Trạm Việt Ninh Bình.
- ETA: 42 phút.
- Hành khách: 42.
- Pre-orders: 17.
- Expected pre-order revenue: 1.840.000đ.

---

# 9. DEMO STATE MACHINE

Trip states:

```text
DRAFT
↓
READY
↓
DEPARTED
↓
EN_ROUTE
↓
APPROACHING_STATION
↓
AT_STATION
↓
DEPARTED_STATION
↓
EN_ROUTE
↓
ARRIVED
```

UI phải thay đổi dựa trên state.

Ví dụ:

### EN_ROUTE

- Hiển thị Current Location.
- Next Stop.
- ETA.
- Upcoming stops.

### APPROACHING_STATION

- Badge “Sắp đến trạm”.
- Countdown nổi bật.
- Station Portal đưa xe lên đầu danh sách.

### AT_STATION

- Hiển thị Rest countdown.
- Station Portal hiển thị “Đã đến”.
- Order có thể chuyển Ready → Fulfilled.

### DEPARTED_STATION

- Next Stop thay đổi.
- Timeline đánh dấu trạm vừa đi qua là completed.

---

# 10. DEMO CONTROLLER

Tạo một route ẩn hoặc route phục vụ demo:

`/demo-control`

Màn hình này không cần xuất hiện trong navigation chính.

Chức năng:

```text
DEMO CONTROL

Trip State
[ Ready ]
[ En Route ]
[ Approaching Station ]
[ At Station ]
[ Departed Station ]
[ Arrived ]

Time
[ +10 minutes ]
[ -10 minutes ]

Orders
[ Add demo order ]
[ Move order to Preparing ]
[ Move order to Ready ]
[ Complete order ]

Vehicle
[ Simulate arrival ]
[ Simulate departure ]

Camera
[ Simulate plate detected ]

Traffic
[ Add 20-minute delay ]

[ Reset Demo ]
```

Demo Controller cập nhật cùng store với Travel App và Station Portal.

---

# 11. TRAVEL APP – SCREEN MAP

## U01 – Welcome / Login

Mục tiêu:

- Tạo entry point đẹp.
- Không cần auth thật.

UI:

- Logo Trạm Việt.
- Tagline “Bạn đồng hành xuyên Việt”.
- Email.
- Password.
- Sign in.
- Create account.
- Demo account selector nhỏ ở dưới nếu cần.

Interaction:

- Bấm Sign in → vào Home.
- Không validation backend.

---

## U02 – Registration

Fields:

- Họ tên.
- Email.
- Số điện thoại.
- Password.

CTA:

- Continue.

Interaction:

- Lưu state local.
- Chuyển U03.

---

## U03 – Travel Profile Setup

Question:

**Bạn thường sử dụng Trạm Việt theo hình thức nào?**

Options:

- Đi du lịch / di chuyển cá nhân.
- Tài xế tự do / xe cá nhân.
- Tài xế xe tải.
- Tài xế xe du lịch / xe khách.

Nếu chọn tài xế xe du lịch:

Hiển thị thêm:

- Tên nhà xe.
- Biển số.
- Loại xe.
- Sức chứa.

CTA:

- Hoàn tất.

Optional:

- Checkbox “Tôi muốn tham gia chương trình đối tác Trạm Việt”.

---

## U04 – Home

Phải là màn hình consumer-first.

Components:

### Search / Planner

- Điểm xuất phát.
- Điểm đến.
- Date.
- CTA “Lên lịch trình”.

### Current Trip

Nếu có trip đang diễn ra:

- Route title.
- Vehicle / owner.
- Next stop.
- ETA.
- Progress.
- CTA “Xem hành trình”.

### Quick Actions

- Tạo chuyến.
- Tham gia chuyến.
- Quét QR.
- Xem đơn hàng.

### Recommended Stations

Card một vài trạm demo.

---

## U05 – Create Trip

Fields:

- Tên chuyến.
- Điểm xuất phát.
- Điểm đến.
- Ngày.
- Giờ xuất phát.
- Loại phương tiện.
- Số người dự kiến.

Optional demo feature:

**Upload itinerary**

Khi upload bất kỳ file demo nào:

Hiển thị simulated AI parsing:

```text
Đang đọc lịch trình...
✓ Xác định điểm xuất phát
✓ Xác định điểm đến
✓ Xác định các điểm dừng
✓ Tạo lịch trình đề xuất
```

Sau đó auto-fill data đã định nghĩa sẵn.

Không gọi AI thật.

---

## U06 – Route Planning

Components:

- Map / route visualization.
- Origin.
- Destination.
- Waypoints.
- Estimated distance.
- Estimated duration.

Question:

**Bạn có dự định dừng nghỉ trên hành trình không?**

Options multi-select:

- Nghỉ ăn uống.
- Nghỉ vệ sinh.
- Nghỉ ngắn 15–30 phút.
- Nghỉ dài.
- Đổ nhiên liệu.
- Mua sắm.

CTA:

- Xem trạm phù hợp.

Route data dùng static coordinates.

---

## U07 – Recommended Stops

Danh sách trạm nằm trên route.

Mỗi station card:

- Tên.
- Ảnh.
- Khoảng cách lệch khỏi route.
- ETA.
- Rating demo.
- Facilities.
- Food available.
- Partner badge.
- Recommended badge.

Ví dụ:

```text
Trạm Việt Ninh Bình
Cách tuyến: 0.8 km
ETA: 09:15

✓ Nhà hàng
✓ WC
✓ Cà phê
✓ Đỗ xe lớn

ĐỀ XUẤT
```

Interaction:

- Select / deselect station.
- View station.
- Continue.

Rule recommendation demo:

Không dùng ML.

Các trạm được rank sẵn theo:

- Route proximity.
- Timing suitability.
- Facilities.
- Partner priority.

---

## U08 – Trip Review

Hiển thị toàn bộ itinerary dạng timeline.

Components:

- Route summary.
- Start.
- Stops.
- Rest time.
- ETA.
- Final destination.

CTA:

- Confirm Trip.

Sau confirm:

- Trip được thêm vào My Trips.
- Hiển thị success screen/toast.

---

## U09 – My Trips

Tabs:

- Current.
- Upcoming.
- Past.

Card trip hiển thị:

- Route.
- Date.
- Time.
- Owner.
- Badge Created by you / Shared with you.
- Partner Trip badge nếu có.

Ví dụ:

```text
CURRENT

Hà Nội → Đà Nẵng
Hoàng Long Express

Điểm tiếp theo
Trạm Việt Ninh Bình
ETA 42 phút

[ Xem hành trình ]
```

---

## U10 – Trip Detail

Đây là một screen quan trọng nhất.

Components:

### Header

- Route.
- Trip owner.
- Trip status.

### Live Summary

- Current position.
- Next stop.
- ETA.
- Distance remaining.

### Route Progress

Timeline:

- Completed stops.
- Current segment.
- Upcoming stops.

### Upcoming Stop Card

- Station.
- ETA.
- Rest duration.
- Food available.
- CTA Pre-order.

### Owner-only actions

Nếu current user là owner:

- Edit Trip.
- Share.
- Start Trip.
- Update Schedule.

### Partner Driver-only section

Nếu trip owner là Partner Driver:

- Orders generated.
- Revenue generated.
- Commission earned.

---

## U11 – Live Journey

Map-focused screen.

Hiển thị:

- Route.
- Animated vehicle marker.
- Current segment.
- Current location label.
- Next station.
- ETA.

Không dùng GPS thật.

Vehicle position được tính từ `demoProgress` trên static polyline.

---

## U12 – Share Trip

Hiển thị:

- Trip title.
- Share link.
- QR thật được generate client-side.
- Copy Link.
- Share.

QR chứa URL dạng:

`/join/HN-DN-001`

Vì trip data nằm trong app static nên URL vẫn mở được trên thiết bị khác nếu app đã deploy.

---

## U13 – Join Shared Trip

Khi user mở shared link:

```text
Nguyễn Văn Minh đã chia sẻ một chuyến đi

HÀ NỘI → ĐÀ NẴNG
03/10/2026
07:00 – 20:00

Hoàng Long Express
29B-123.45

[ Tham gia chuyến ]
```

Sau khi Join:

- Add trip vào My Trips.
- Navigate Trip Detail.

---

## U14 – Station Detail

Components:

- Hero image.
- Station name.
- Location.
- ETA from current route.
- Facilities.
- Opening hours demo.
- Rating demo.
- Menu preview.
- Promotions.

CTA:

- View Menu.
- Add to Trip.

---

## U15 – Menu

Categories:

- Món ăn.
- Đồ uống.
- Ăn nhanh.
- Đặc sản.

Product card:

- Image.
- Name.
- Price.
- Prep time.
- Popular badge.

Example products:

- Phở bò – 65.000đ.
- Cơm gà – 75.000đ.
- Bánh mì – 35.000đ.
- Cà phê sữa – 30.000đ.
- Nước suối – 15.000đ.

---

## U16 – Product Detail

- Product image.
- Name.
- Price.
- Description.
- Quantity.
- Notes.
- Add to Cart.

---

## U17 – Cart

Hiển thị:

- Station.
- Upcoming arrival.
- Items.
- Quantity.
- Subtotal.
- Total.

Thông báo:

**Đơn hàng sẽ được chuẩn bị trước khi bạn đến trạm.**

CTA:

- Checkout.

---

## U18 – Checkout

Fields/UI:

- Pickup station.
- Estimated arrival.
- Order summary.
- Payment method.

Payment methods UI-only:

- MoMo.
- VNPay.
- Cash.
- Credit Card.

CTA:

`Thanh toán 180.000đ`

Khi bấm:

- Simulate 1–2 step loading.
- Show success.
- Create order in Zustand/local state.
- Update order counters.
- Update station revenue.
- Nếu trip commission eligible → update driver commission.

Không gọi payment gateway.

---

## U19 – Order Detail

Status timeline:

```text
Order placed
↓
Confirmed
↓
Preparing
↓
Ready for pickup
↓
Completed
```

Hiển thị:

- Order ID.
- Station.
- Items.
- Total.
- ETA to station.

---

## U20 – Orders

Tabs:

- Active.
- Completed.

Order card:

- Station.
- Status.
- Total.
- Pickup ETA.

---

## U21 – Profile

Common user:

- Avatar.
- Name.
- Travel profile.
- Trips created.
- Trips joined.
- Order history.

CTA:

- Edit Profile.
- Become a Partner Driver.

Partner driver:

Hiển thị thêm:

- Company.
- Vehicle.
- Partner status.
- Commission rate.
- Earnings.

---

## U22 – Partner Driver

Screen mô phỏng onboarding partner.

Sections:

- Driver information.
- Company information.
- Vehicle information.
- Verification checklist.

Demo state Approved:

```text
Partner verification

✓ Driver information
✓ Vehicle information
✓ Company information

Status: APPROVED

Commission rate: 5%
```

---

## U23 – Earnings

Chỉ xuất hiện với Partner Driver.

KPIs:

- Total earnings.
- This trip.
- This month.
- Orders generated.
- Revenue generated.

Chart demo:

- Commission over time.

Trip table:

- Trip.
- Orders.
- Revenue.
- Commission.
- Settlement status.

---

# 12. STATION PORTAL – SCREEN MAP

## S01 – Station Login

Không auth thật.

Demo credentials hoặc button:

`Vào Station Demo`

---

## S02 – Overview

Đây là màn hình quan trọng nhất khi pitch chủ trạm.

KPI cards:

- Incoming buses.
- Expected passengers.
- Pre-orders.
- Pre-order revenue.
- Average order value.

Section:

### Next 2 Hours

```text
11:20
Hoàng Long Express
42 passengers
18 orders
1.840.000đ

11:45
Mai Linh Travel
36 passengers
9 orders
920.000đ

12:05
FUTA Charter
44 passengers
21 orders
2.150.000đ
```

Section:

### Revenue Generated Before Arrival

Đây phải là card/visual nổi bật.

Mục đích:

Chứng minh Trạm Việt giúp trạm tạo doanh thu trước khi khách bước xuống xe.

---

## S03 – Incoming Vehicles

Table/cards:

- Vehicle plate.
- Company.
- ETA.
- Passenger count.
- Pre-orders.
- Expected revenue.
- Status.

Statuses:

- En route.
- Approaching.
- Arrived.
- Departed.

Filters:

- All.
- Approaching.
- Arrived.

---

## S04 – Vehicle Detail

Components:

- Vehicle.
- Driver.
- Company.
- Route.
- ETA.
- Passenger count.
- Planned rest time.
- Number of orders.
- Revenue.

Section:

Orders for this vehicle.

CTA:

- Confirm Arrival.

---

## S05 – Vehicle Check-in

Mô phỏng camera recognition.

UI:

```text
Vehicle Detection

Camera Gate 01

Scanning...

29B-123.45 detected

Expected vehicle
29B-123.45

MATCHED ✓

Driver: Nguyễn Văn Minh
Passengers: 42
Orders: 18

[ Confirm Check-in ]
```

Không camera thật.

Có animation scanning.

---

## S06 – Order Management

Kanban hoặc tabs:

- New.
- Preparing.
- Ready.
- Completed.

Mỗi order card:

- Order ID.
- Vehicle.
- ETA.
- Items.
- Total.

Interaction:

- New → Preparing.
- Preparing → Ready.
- Ready → Completed.

Khi update:

- UI counters update.
- Station Overview update.
- User Order Detail update trong cùng demo state.

---

## S07 – Order Detail

- Passenger/demo customer.
- Vehicle/trip.
- ETA.
- Items.
- Notes.
- Total.
- Status.

CTA:

- Start Preparing.
- Mark Ready.
- Complete Order.

---

## S08 – Sales Analytics

KPIs:

- Pre-order revenue.
- Total orders.
- Average order value.
- Orders by vehicle.
- Revenue by time.

Charts chỉ dùng demo data.

Có thể dùng Recharts.

Không cần analytics backend.

---

## S09 – Driver Partners / Commission

Table:

- Driver.
- Company.
- Trips.
- Orders generated.
- Revenue generated.
- Commission.
- Settlement status.

Detail panel:

```text
Nguyễn Văn Minh
Hoàng Long Express

Revenue generated: 2.300.000đ
Commission rate: 5%
Commission: 115.000đ

Settlement: Pending
```

Settlement chỉ là UI.

---

# 13. BUSINESS RULES

## BR01 – Universal Trip Creation

Mọi user đều có quyền tạo Trip.

Không yêu cầu user phải là driver.

## BR02 – Universal Trip Sharing

Mọi owner đều có thể share trip.

## BR03 – Universal Join

Mọi user đều có thể join trip qua link/QR.

## BR04 – Universal Ordering

Mọi user đang có trip có station trong itinerary đều có thể đặt hàng.

## BR05 – Commission Eligibility

Commission chỉ phát sinh khi:

```text
trip.partnerTrip = true
AND
trip.commissionEligible = true
AND
trip.owner.partnerStatus = approved
```

## BR06 – Commission Calculation

Demo commission rate mặc định:

`5%`

Formula:

```text
commission = fulfilled order total × commission rate
```

Chỉ tính demo trên order completed/fulfilled hoặc có thể hiển thị pending commission cho order chưa fulfilled.

## BR07 – Non-partner Driver

Tài xế xe tải, tài xế tự do, người tự lái vẫn dùng toàn bộ trip/order feature nhưng:

`commission = 0`

## BR08 – Trip Attribution

Order được tạo trong context của trip phải chứa `tripId`.

Nếu trip commission eligible thì order được attribution cho owner của trip.

## BR09 – Station Recommendation

Không dùng AI/ML thật.

Recommendation list lấy từ seed data theo score đã định nghĩa sẵn.

## BR10 – ETA

ETA là demo value.

Không gọi traffic/routing service.

Khi bấm `+10 minutes` trong Demo Controller:

- Current time tăng.
- ETA giảm hoặc thay đổi theo scenario.
- Progress route tăng.

---

# 14. INTERACTION RULES

## IR01 – Không có dead CTA

Mọi primary CTA phải:

- Navigate.
- Open modal.
- Update state.
- Show feedback.

Không có primary button không làm gì.

## IR02 – Loading simulation

Các feature mang tính “intelligent” có thể dùng simulated loading 600–1500ms để tạo cảm giác thật:

- AI itinerary parsing.
- Route generation.
- Payment.
- Camera scanning.

Không được quá chậm.

## IR03 – Success feedback

Sau action quan trọng phải có:

- Toast.
- Success state.
- State update.

## IR04 – Cross-screen consistency

Ví dụ passenger tạo order mới:

- Cart reset.
- Orders tăng.
- Station Portal orders tăng.
- Station expected revenue tăng.
- Nếu partner trip: driver commission tăng.

Tất cả dùng cùng state store.

---

# 15. DEMO DATA

## 15.1. Users

### User A – Partner Driver

```text
Nguyễn Văn Minh
Tour Driver
Hoàng Long Express
29B-123.45
Partner: Approved
Commission: 5%
```

### User B – Traveler

```text
Trần Anh
Traveler
Trips created: 3
Trips joined: 8
```

### User C – Truck Driver

```text
Lê Hoàng
Truck Driver
51C-456.78
Partner: No
Commission: 0%
```

---

## 15.2. Stations

Tạo ít nhất 4 station demo.

### Trạm Việt Ninh Bình

- Partner station.
- Restaurant.
- Coffee.
- WC.
- Large parking.
- Souvenir store.

### Trạm Việt Thanh Hóa

- Partner station.
- Restaurant.
- Fuel.
- WC.
- Convenience store.

### Trạm Việt Nghệ An

- Partner station.
- Restaurant.
- Coffee.
- Local specialties.
- Large parking.

### Trạm Huế Gateway

- Non-partner station.
- Restaurant.
- WC.

---

# 16. VISUAL DESIGN DIRECTION

## 16.1. Brand character

Trạm Việt cần tạo cảm giác:

- Tin cậy.
- Hiện đại.
- Việt Nam.
- Thân thiện khi đi đường.
- Có tính công nghệ nhưng không quá “tech”.

## 16.2. Style

- Clean.
- Professional.
- Light theme.
- Mobile-first.
- Card-based UI.
- Map + timeline là visual motif chính.

## 16.3. Branding

Tên:

**Trạm Việt**

Tagline:

**Bạn đồng hành xuyên Việt**

Logo có thể dùng placeholder text logo trước.

Không mất thời gian tạo branding phức tạp ở phase đầu.

## 16.4. Iconography

Dùng Lucide icons.

Icons gợi ý:

- MapPin.
- Route.
- Bus.
- Car.
- Truck.
- Utensils.
- Coffee.
- ShoppingBag.
- Clock.
- Wallet.
- QrCode.
- Users.

---

# 17. RESPONSIVE RULES

## Travel App

Ưu tiên:

- 375px mobile.
- 390px mobile.
- 430px mobile.

Desktop vẫn sử dụng được nhưng không phải ưu tiên chính.

Bottom navigation trên mobile.

## Station Portal

Ưu tiên:

- 1280px.
- 1440px.
- Tablet landscape.

Sidebar navigation.

---

# 18. TECH STACK

Ưu tiên đơn giản, dễ để Codex duy trì.

```text
React
Vite
TypeScript
Tailwind CSS
shadcn/ui
React Router
Zustand
localStorage
Lucide React
Recharts
Leaflet / React Leaflet (optional)
qrcode
Framer Motion
Zod
Vitest
Playwright
```

## Không thêm nếu không cần

- Next.js.
- Express.
- NestJS.
- Supabase.
- Firebase.
- Redux.
- Docker.
- Redis.
- GraphQL.
- Payment SDK.
- Google Maps API.

Không cài package mới nếu requirement có thể giải quyết bằng stack hiện tại.

---

# 19. RECOMMENDED PROJECT STRUCTURE

```text
tram-viet/
│
├── AGENTS.md
├── README.md
├── package.json
│
├── docs/
│   └── project-spec.md
│
├── public/
│   └── demo-assets/
│
├── src/
│   ├── app/
│   │   ├── router.tsx
│   │   └── App.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── trip/
│   │   ├── station/
│   │   ├── order/
│   │   └── map/
│   │
│   ├── features/
│   │   ├── onboarding/
│   │   ├── trips/
│   │   ├── stations/
│   │   ├── ordering/
│   │   ├── partner/
│   │   ├── earnings/
│   │   └── station-portal/
│   │
│   ├── demo/
│   │   ├── users.ts
│   │   ├── trips.ts
│   │   ├── stations.ts
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   ├── routeData.ts
│   │   └── demoScenario.ts
│   │
│   ├── store/
│   │   └── useDemoStore.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── lib/
│   │   ├── commission.ts
│   │   ├── demoTime.ts
│   │   └── format.ts
│   │
│   └── pages/
│       ├── travel/
│       ├── station/
│       └── demo/
│
└── tests/
    ├── unit/
    └── e2e/
```

---

# 20. CENTRAL DEMO STORE

Tạo một Zustand store duy nhất cho demo state quan trọng.

Ví dụ:

```ts
interface DemoStore {
  currentUserId: string
  activeTripId: string
  demoTime: string
  tripState: TripStatus
  tripProgress: number
  users: User[]
  trips: Trip[]
  stations: Station[]
  orders: Order[]
  commissions: Commission[]

  joinTrip: (tripId: string) => void
  createOrder: (...) => void
  updateOrderStatus: (...) => void
  advanceTrip: (...) => void
  setTripState: (...) => void
  simulateArrival: () => void
  resetDemo: () => void
}
```

Không phân tán business state vào nhiều component local state nếu các screen cần dùng chung.

---

# 21. FEATURE SIMULATION MATRIX

| Feature | Cách demo |
|---|---|
| Login | Fake/local |
| Registration | Local state |
| User type | Functional local state |
| Create Trip | Functional |
| Route | Static data |
| Map | Static coordinates |
| Stop Recommendation | Predefined rules/data |
| ETA | Simulated |
| Live GPS | Animated route progress |
| QR | QR thật client-side |
| Join Trip | Functional local state |
| My Trips | Functional |
| Station Detail | Functional |
| Menu | Functional |
| Cart | Functional |
| Checkout | Functional |
| Payment | UI simulation |
| Order | Functional local state |
| Station Orders | Functional local state |
| Commission | Functional calculation |
| AI itinerary import | Simulated |
| Camera recognition | Simulated |
| Notifications | UI simulation |
| Settlement | UI only |
| Analytics | Demo data |

---

# 22. IMPLEMENTATION ORDER

Codex không được build toàn bộ project trong một prompt lớn.

Implement theo phase.

## Phase 1 – Foundation

- Create Vite React TypeScript project.
- Tailwind.
- shadcn/ui.
- Routing.
- Shared layouts.
- Brand header.
- Travel bottom navigation.
- Station sidebar.

## Phase 2 – Demo Data & State

- Types.
- Seed data.
- Zustand demo store.
- Reset Demo.
- Demo Controller skeleton.

## Phase 3 – Travel App Core

- U04 Home.
- U09 My Trips.
- U10 Trip Detail.
- U11 Live Journey.
- U12 Share Trip.
- U13 Join Trip.

Đây là vertical slice đầu tiên phải hoàn thiện.

## Phase 4 – Trip Creation

- U05 Create Trip.
- U06 Route Planning.
- U07 Recommended Stops.
- U08 Review.
- Simulated itinerary upload.

## Phase 5 – Ordering

- U14 Station Detail.
- U15 Menu.
- U16 Product Detail.
- U17 Cart.
- U18 Checkout.
- U19 Order Detail.
- U20 Orders.

## Phase 6 – Partner Driver

- U21 Profile.
- U22 Partner Driver.
- U23 Earnings.
- Commission rules.

## Phase 7 – Station Portal

- S02 Overview.
- S03 Incoming Vehicles.
- S04 Vehicle Detail.
- S05 Check-in.
- S06 Orders.
- S07 Order Detail.
- S08 Analytics.
- S09 Commission.

## Phase 8 – Cross-App Demo Logic

Đảm bảo:

- Passenger order → Station order tăng.
- Revenue tăng.
- Commission tăng.
- Status order đồng bộ.
- Trip state đồng bộ.

## Phase 9 – Polish

- Motion.
- Loading states.
- Empty states.
- Error states.
- Skeletons.
- Responsive.
- Visual consistency.

## Phase 10 – E2E Demo Test

Test complete pitch flow bằng Playwright.

---

# 23. MAIN E2E DEMO FLOW

Playwright phải test được flow này:

## Flow A – Passenger experience

1. Open app.
2. Enter Home.
3. Open shared trip.
4. Join trip.
5. Open My Trips.
6. Open Hà Nội → Đà Nẵng.
7. View next stop.
8. Open station.
9. Open menu.
10. Add Cơm gà.
11. Add Cà phê.
12. Open cart.
13. Checkout.
14. Select MoMo.
15. Pay.
16. See payment success.
17. Open Order Detail.

## Flow B – Station experience

1. Open Station Portal.
2. See incoming Hoàng Long bus.
3. Open vehicle.
4. See passenger/order information.
5. Open Orders.
6. Find new order.
7. Move to Preparing.
8. Move to Ready.
9. Simulate bus arrival.
10. Complete order.

## Flow C – Driver commission

1. Switch to Partner Driver demo user.
2. Open Earnings.
3. Confirm revenue generated increased.
4. Confirm commission increased.
5. Open trip earnings detail.

---

# 24. ACCEPTANCE CRITERIA

## Product

- Travel App và Station Portal đều truy cập được.
- Flow pitch chính hoàn chỉnh.
- Không cần backend để sử dụng demo.
- Refresh không làm app crash.
- Reset Demo hoạt động.

## Travel App

- User bình thường tạo trip được.
- User bình thường join trip được.
- User bình thường share trip được.
- User bình thường đặt đồ được.
- Truck driver dùng được cùng flow.
- Partner Driver có thêm Earnings.

## Commission

- Non-partner order không tạo commission.
- Partner trip order tạo commission.
- Commission = eligible order total × rate.

## Station Portal

- Incoming vehicle hiển thị ETA.
- Vehicle Detail có passenger count và orders.
- Orders đổi status được.
- Overview cập nhật metrics theo demo state.

## Demo polish

- Không dead button ở happy path.
- Không console error nghiêm trọng.
- Không broken layout ở mobile target.
- Không broken layout ở desktop station target.

---

# 25. OUT OF SCOPE CHO PHASE HIỆN TẠI

Không implement thật:

- Backend.
- Database.
- Authentication.
- OTP.
- Email verification.
- Payment gateway.
- Refund.
- Bank settlement.
- GPS realtime.
- Google Maps routing.
- Traffic realtime.
- AI model.
- File parsing thật.
- Camera thật.
- License plate recognition thật.
- Push notification thật.
- SMS.
- Inventory management thật.
- Accounting integration.
- POS integration.

Có thể tạo UI mô phỏng nếu cần cho pitch.

---

# 26. CODEX WORKING RULES

Codex phải tuân thủ các rule sau trong suốt project.

## Trước khi implement

1. Đọc `docs/project-spec.md`.
2. Xác định screen / feature đang được yêu cầu.
3. Xác định demo state liên quan.
4. Xác định component hiện có có thể reuse.
5. Không thay đổi feature ngoài scope nếu không cần.

## Trong khi implement

1. TypeScript strict.
2. Không sử dụng `any` nếu tránh được.
3. Reuse components.
4. Business rule không copy/paste giữa nhiều component.
5. Commission calculation nằm trong utility dùng chung.
6. Demo data nằm trong `src/demo`.
7. Shared state nằm trong Zustand store.
8. Không introduce backend.
9. Không tự ý thêm package lớn.
10. Không tự ý đổi product rule.

## Sau khi implement

Luôn chạy:

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Nếu feature có user flow thì chạy Playwright tương ứng.

Không coi task hoàn thành nếu build lỗi.

---

# 27. UI IMPLEMENTATION RULES CHO CODEX

1. Ưu tiên shadcn/ui component trước khi tự build primitive mới.
2. Travel App mobile-first.
3. Station Portal desktop-first.
4. Không tạo quá nhiều modal nếu có thể dùng page/drawer rõ ràng hơn.
5. Primary CTA trên mobile phải dễ bấm bằng ngón tay.
6. Timeline của trip phải dễ scan.
7. ETA và next stop phải nổi bật hơn data phụ.
8. Station Dashboard ưu tiên operational information.
9. Không nhồi quá nhiều chart.
10. Dashboard phải giúp người xem hiểu value trong dưới 10 giây.

---

# 28. PITCH PRIORITY

Nếu phải ưu tiên chất lượng UI, thứ tự ưu tiên là:

1. Station Overview.
2. Trip Detail.
3. Live Journey.
4. Share / Join Trip.
5. Station Menu.
6. Checkout.
7. Station Order Management.
8. Driver Earnings.
9. Create Trip.
10. Onboarding.

Lý do:

Khách hàng pitch chính là chủ chuỗi trạm dừng.

Station Portal phải thể hiện rõ nhất business value:

- More incoming traffic.
- Demand visibility.
- Pre-order revenue.
- Operational readiness.
- Driver incentive.

---

# 29. PRODUCT STORY ĐỂ DEMO

Bản demo cuối nên có thể kể câu chuyện sau trong một flow liên tục:

### 1. Một tài xế tạo chuyến

Hà Nội → Đà Nẵng.

Trạm Việt hiển thị route và đề xuất các trạm phù hợp.

### 2. Tài xế chọn trạm

Trạm Việt Ninh Bình và Trạm Việt Nghệ An được thêm vào itinerary.

### 3. Tài xế chia sẻ QR

Hành khách scan QR và tham gia chuyến.

### 4. Hành khách xem chuyến

App hiển thị:

- Xe đang ở đâu.
- Điểm tiếp theo.
- ETA.
- Lịch trình.

### 5. Hành khách xem trạm sắp tới

Mở Trạm Việt Ninh Bình.

Xem amenities và menu.

### 6. Hành khách đặt đồ

Order 180.000đ.

Payment success được mô phỏng.

### 7. Station Portal thay đổi

- Orders tăng.
- Revenue tăng.
- Xe Hoàng Long đang approaching.
- ETA còn 32 phút.

### 8. Trạm chuẩn bị món

Order chuyển:

New → Preparing → Ready.

### 9. Xe tới

Camera check-in được mô phỏng.

Biển số match.

### 10. Order hoàn thành

Order chuyển Completed.

### 11. Driver Earnings cập nhật

Driver thấy:

- Revenue generated.
- Commission earned.

### 12. Kết thúc pitch

Station owner thấy được vòng giá trị hoàn chỉnh:

```text
Better route planning
→
More partner vehicles
→
More passengers
→
Pre-orders before arrival
→
Better station preparation
→
More revenue
→
Driver commission
→
More incentive to return
```

---

# 30. DEFINITION OF DONE CHO BẢN DEMO ĐẦU TIÊN

Bản demo đầu tiên được xem là đủ tốt khi:

- Có landing/login entry đẹp.
- Có Travel App mobile hoàn chỉnh cho happy path.
- Có Station Portal desktop hoàn chỉnh cho happy path.
- Có một demo trip Hà Nội → Đà Nẵng.
- QR/share flow hoạt động.
- Join trip hoạt động.
- My Trips hoạt động.
- Trip timeline hoạt động.
- Live trip được simulate.
- Station detail/menu/cart/checkout hoạt động.
- Order được tạo trong local state.
- Station nhìn thấy order.
- Station đổi order status được.
- Commission được tính theo rule.
- Driver Earnings phản ánh commission.
- Demo Controller hoạt động.
- Reset Demo hoạt động.
- Không cần backend.
- Không cần secret/API key để demo.
- App build thành công.
- Happy path chạy được bằng Playwright.

---

# 31. NGUYÊN TẮC CUỐI CÙNG

Trong phase hiện tại, ưu tiên tuyệt đối:

> **Một demo đẹp, logic, nhất quán, bấm được và kể được toàn bộ câu chuyện sản phẩm.**

Không tối ưu cho production.

Không over-engineer.

Không xây backend trước.

Không xây integration thật nếu integration đó không làm tăng chất lượng pitch.

Nếu một feature có thể được mô phỏng thuyết phục bằng frontend state, hãy mô phỏng bằng frontend state.

Toàn bộ code và UX phải phục vụ mục tiêu giúp người xem hiểu rõ giá trị của **Trạm Việt – Bạn đồng hành xuyên Việt** trong một lần trải nghiệm ngắn.
