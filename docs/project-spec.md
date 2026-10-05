# TRẠM VIỆT – BẠN ĐỒNG HÀNH XUYÊN VIỆT

## Project Specification – Interactive Product Demo

**Tên sản phẩm:** Trạm Việt  
**Tagline:** Bạn đồng hành xuyên Việt  
**Loại sản phẩm:** Webapp responsive, ưu tiên trải nghiệm mobile cho người đi đường và mobile/POS cho cửa hàng và desktop/tablet cho quản lý trạm dừng  
**Mục tiêu hiện tại:** Xây dựng interactive product demo phục vụ pitching, chưa phải sản phẩm production  
**Nguyên tắc triển khai:** Frontend-first, không phụ thuộc backend, không cần API thật, không cần thanh toán thật, nhưng toàn bộ flow chính phải có thể bấm và trải nghiệm được như một sản phẩm hoàn chỉnh.

---

# 1. MỤC TIÊU DỰ ÁN

Trạm Việt là nền tảng hỗ trợ người dùng lên kế hoạch hành trình đường dài, xác định điểm dừng phù hợp, theo dõi lịch trình và chia sẻ chuyến đi. Hành khách trên xe có thể quét QR để mở hành trình bằng web mobile và đặt trước đồ ăn, đồ uống, đặc sản hoặc đồ dùng tiện ích tại trạm mà không cần tải app hay đăng nhập.

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
- Tham gia chuyến đi được chia sẻ khi dùng Travel App có tài khoản; việc quét QR để xem chuyến và đặt hàng không yêu cầu bước này.
- Xem danh mục sản phẩm tại trạm.
- Đặt trước đồ ăn, đồ uống, đặc sản và đồ dùng tiện ích.
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
3. Hành khách quét QR trên xe, xem hành trình và đặt hàng trước trên web mobile như thế nào.
4. Trạm dừng có thể biết trước xe nào sắp đến, có bao nhiêu hành khách và bao nhiêu đơn đặt trước.
5. Cửa hàng trong trạm nhận đơn, chuẩn bị món theo ETA và bàn giao khi khách tới.
6. Tài xế đối tác nhận commission như thế nào.
7. Trạm Việt tạo ra một hệ sinh thái kết nối Người đi đường – Tài xế – Cửa hàng – Trạm dừng.

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
- Có thể xem hành trình từ QR và đặt trước đồ ăn, đồ uống, đặc sản hoặc đồ dùng tiện ích mà không cần cài app.
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

### Cửa hàng / quầy thuê trong trạm

- Nhận đúng đơn của cửa hàng mình.
- Xem ETA xe, thời gian chuẩn bị và thời điểm nên bắt đầu làm món.
- Một chạm nhận đơn, bắt đầu làm, báo món sẵn sàng và bàn giao.
- In phiếu bếp mô phỏng.
- Bật/tắt món còn bán và xem kết quả trong ngày.

### Trạm dừng

- Nhìn thấy demand trước khi xe tới.
- Nhận pre-order.
- Chuẩn bị món trước.
- Theo dõi incoming vehicles.
- Theo dõi revenue theo chuyến.
- Quản lý commission tài xế.

---

# 4. CẤU TRÚC SẢN PHẨM

Bản demo gồm **3 giao diện vận hành/Travel trong cùng một frontend** và **1 luồng Guest QR Web** mở trực tiếp trên trình duyệt:

| Giao diện | Người dùng | Thiết bị ưu tiên | Trách nhiệm |
|---|---|---|---|
| Trạm Việt App / Travel App | Người có tài khoản: người đi đường, người tự lái, mọi loại tài xế | Mobile | Tạo/theo dõi/chia sẻ trip; chủ chuyến check-in tại trạm; Partner Driver có thêm commission |
| Guest QR Web | Hành khách quét QR trên xe | Mobile browser | Khi chưa có app: xem chuyến được chia sẻ, cung cấp họ tên và tùy chọn số điện thoại, sau đó đặt trước và theo dõi/nhận hàng |
| Trạm Việt Merchant | Cửa hàng/quầy thuê trong trạm | Mobile / POS cầm tay | Nhận đơn, chuẩn bị, bàn giao, in phiếu mô phỏng |
| Trạm Việt Station / Station Portal | Chủ/quản lý trạm, quản lý chuỗi | Desktop/tablet landscape | Incoming vehicles, giám sát đơn, hiệu suất cửa hàng, doanh thu và commission |

Travel App vẫn là **một app chung** cho người dùng có tài khoản, bao gồm hành khách và tài xế. Guest QR Web là lối vào công khai theo chuyến cho hành khách không có tài khoản, không phải một app cần cài. Merchant là giao diện vận hành của cửa hàng. Station Portal là giao diện quản lý toàn trạm.

## 4.1. Travel App

Dành cho:

- Traveler.
- Car driver.
- Independent driver.
- Truck driver.
- Tourist / coach driver.
- Partner driver.

Travel App ưu tiên giao diện mobile-first.

Chủ chuyến/tài xế chia sẻ QR và có CTA check-in khi xe đến điểm dừng. Quyền sửa chuyến, check-in và xem commission không xuất hiện trên Guest QR Web.

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

Station Portal có thêm bảng Merchant Performance và bộ lọc cửa hàng trong các màn hình Orders/Sales. Không thêm một POS desktop riêng cho cửa hàng ở phase này.

## 4.3. Merchant App

Dành cho nhân viên quầy/cửa hàng thuê trong trạm. Mobile-first, hình dung như màn hình Android smart POS có máy in nhiệt tích hợp. Demo chạy trong trình duyệt trên điện thoại hoặc khung terminal; không yêu cầu thiết bị thật.

Navigation tối giản:

1. Đơn hàng.
2. Thực đơn.
3. Hôm nay.

Mỗi cửa hàng là một merchant độc lập, có tài khoản đăng nhập riêng được gắn cố định với đúng merchantId. Sau khi đăng nhập, nhân viên đi thẳng vào không gian vận hành của cửa hàng đó. Không có màn chọn cửa hàng/quầy, không hiển thị danh sách cửa hàng khác, và không cho đổi merchant trong phiên Merchant. Header luôn hiển thị danh tính tài khoản, tên cửa hàng, trạm/quầy và trạng thái đang nhận đơn. Desktop chỉ trình bày giao diện này trong khung mobile/POS; không xây dashboard desktop Merchant riêng.

Demo login dùng tài khoản/mật khẩu giả lập riêng cho từng cửa hàng; không có auth/backend thật. Mỗi bộ thông tin đăng nhập ánh xạ tới đúng một merchantId. Phiên Merchant giữ merchantId từ danh tính đăng nhập; logout mới kết thúc phiên. Việc đổi actor trong Demo Controller chỉ vào lại một tài khoản demo xác định trước, không tạo bộ chọn cửa hàng trong Merchant App.

## 4.4. Guest QR Web

QR trên xe mở URL công khai dạng `/t/{publicTripCode}`, ví dụ `tramviet.vn/t/HN-DN-A8K29`. Khi thiết bị đã cài Travel App, URL/QR mở chuyến tương ứng trực tiếp trong app (deep link); không tạo screen riêng cho bước điều hướng này. Nếu chưa có app, Guest QR Web mở trang đầu tiên nhận diện tên chuyến được chia sẻ, có trường họ tên và số điện thoại tùy chọn. Người đã có tài khoản có thể chọn đăng nhập tại đây; sau đăng nhập, họ trở về luồng Travel App thông thường với chuyến được chia sẻ. Khách tiếp tục ở web có thể xem timeline, ETA và trạm sắp tới, chọn sản phẩm từ nhiều quầy trong một giỏ, thanh toán mô phỏng một lần, nhận mã theo từng quầy và theo dõi trạng thái từng phần đơn. Không yêu cầu cài app hoặc tham gia chuyến để checkout.

Khách chỉ được xem dữ liệu công khai của chuyến và đơn phát sinh trong phiên/link của mình. Guest QR Web không cho sửa hành trình, check-in, xem danh sách hành khách hay xem commission. MVP frontend-only chứng minh flow trong cùng phiên trình duyệt; đồng bộ đơn và check-in giữa các thiết bị độc lập cần backend ở giai đoạn pilot.

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
  merchants.ts
  products.ts
  orders.ts
  commissions.ts
  kitchenTickets.ts
  routeData.ts
  demoScenario.ts
```

Có thể dùng Zustand để quản lý state runtime.

Có thể dùng localStorage để giữ state khi refresh.

Phải có nút Reset Demo để đưa app về trạng thái ban đầu.

Cả Travel App, Guest QR Web, Merchant App và Station Portal sử dụng cùng Zustand store trong phiên demo. Chuyển actor bằng demo selector giữ nguyên dữ liệu chuyến và đơn. Merchant session lấy merchantId từ tài khoản đã đăng nhập, không cho nhân viên chọn hoặc chuyển sang merchant khác trong giao diện Merchant.

Đồng bộ bắt buộc trong cùng một phiên trình duyệt. Nếu mở nhiều tab cùng origin, có thể dùng storage event/BroadcastChannel và kiểm tra trước khi pitch. Thiết bị khác mở QR chỉ tải được trip seed và có state local riêng; không hứa đồng bộ đơn/check-in realtime giữa các thiết bị khi chưa có backend. Giai đoạn pilot đa thiết bị cần API và nơi lưu trạng thái chung; không thay đổi flow QR của khách.

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
- Merchant mặc định: Cơm Việt – quầy A12, Trạm Việt Ninh Bình.
- Cửa hàng demo khác: Phở Việt – A01, Cà phê Việt – B02, Siêu thị Trạm Việt – C01 (đặc sản và đồ dùng tiện ích).
- 17 đơn khách seed được phân bổ về các cửa hàng. Tổng tiền các đơn seed phải đúng 1.840.000đ; số KPI lấy từ dữ liệu, không hard-code riêng ở từng screen.
- Order 180.000đ trong pitch: 2 × Cơm gà (75.000đ) + 1 × Cà phê sữa (30.000đ), cùng cửa hàng Cơm Việt.
- Sau order mới: 18 đơn khách, giá trị đặt trước dự kiến 2.020.000đ. Commission dự kiến riêng của đơn mới là 9.000đ; chỉ chuyển thành đã kiếm được sau khi bàn giao thành công.

Mockup Q05–Q10 còn có **fixture nhiều danh mục** để chứng minh giỏ hai quầy: 2 × Cơm gà (150.000đ) + 1 × Cà phê sữa (30.000đ) ở Cơm Việt A12, 1 × Cơm cháy Ninh Bình (65.000đ) + 1 × Khăn giấy (15.000đ) ở Siêu thị Trạm Việt C01. Một Order khách trị giá 260.000đ tách thành hai MerchantOrder 180.000đ và 80.000đ, mỗi quầy có mã nhận riêng. Fixture này là kịch bản thay thế để kiểm thử giỏ nhiều quầy, không được cộng đồng thời vào KPI 17 → 18 đơn / 1.840.000đ → 2.020.000đ của pitch flow 180.000đ. Nếu dùng fixture 260.000đ thay thế, KPI tương ứng là 18 đơn / 2.100.000đ và pending commission của order mới là 13.000đ.

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
- Travel App của chủ chuyến/tài xế hiển thị CTA “Check-in tại trạm”; bước xác nhận chỉ hoàn thành khi xe đã dừng ở trạm.

### AT_STATION

- Hiển thị Rest countdown.
- Sau khi chủ chuyến/tài xế bấm “Tôi đã đến trạm” và xác nhận, lưu `checkedInAt` cho TripStop; Station Portal hiển thị “Tài xế đã check-in”.
- Guest QR Web hiển thị xe đã đến và hướng dẫn đến đúng quầy khi phần đơn READY.
- Merchant chỉ có thể xác nhận mã nhận và chuyển phần đơn READY → PICKED_UP sau check-in của chuyến tại trạm đó. Check-in không tự động hoàn tất đơn hoặc ghi nhận doanh thu/commission.

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
[ Driver check-in / Simulate arrival ]
[ Simulate departure ]

Camera
[ Simulate plate detected (verification only) ]

Traffic
[ Add 20-minute delay ]

[ Reset Demo ]
```

Bổ sung controls:

- Chuyển giữa Traveler, Partner Driver, Merchant và Station Manager.
- Chọn actor demo. Khi vào actor Merchant, dùng danh tính demo được gán sẵn; không có merchant switcher trong Merchant App.
- Thêm đơn mới vào merchant demo đã đăng nhập.
- Nhận đơn / Từ chối đơn kèm lý do.
- Đến giờ chuẩn bị / Bắt đầu làm / Đã làm xong / Đã bàn giao.
- Mô phỏng in phiếu thành công hoặc lỗi; in lại.
- Bật/tắt âm báo và bật/tắt tự in khi nhận đơn.
- Thay đổi ETA để chứng minh lịch chuẩn bị được tính lại.
- Mô phỏng thao tác check-in của chủ chuyến/tài xế bằng cùng store action với CTA trong Travel App; việc quét biển số chỉ thêm tín hiệu đối soát.

Demo Controller cập nhật cùng store với Travel App, Merchant App và Station Portal. Controls cũng phải tuân thủ transition hợp lệ; không skip từ NEW sang READY. Reset khôi phục cả món còn bán, đơn, phiếu in, demoTime, actor và commission.

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

`/t/HN-DN-A8K29`

Đây là URL HTTPS public của chuyến. Nếu đã cài Travel App, mở chuyến tương ứng trong app; nếu chưa có, mở Guest QR Web. Trang đầu Guest QR Web hiển thị tên chuyến được chia sẻ, họ tên và số điện thoại tùy chọn, cùng lối đăng nhập cho người đã có tài khoản. Đăng nhập đưa người dùng về luồng Travel App thông thường. Khách tiếp tục dưới dạng guest vẫn xem hành trình và đặt hàng mà không cần cài app hoặc tham gia chuyến.

---

## D13–D15 – Driver check-in trong Travel App

- D13: Trip Detail của tài xế hiển thị trạm sắp tới, ETA và nút **Check-in tại trạm** khi chuyến đủ điều kiện.
- D14: Xác nhận đúng trạm/xe/chuyến; bấm check-in ghi `TripStop.checkedInAt` một lần và chuyển trip sang `AT_STATION`.
- D15: Thành công hiển thị giờ check-in; khách QR, Merchant và Station Portal nhận cùng trạng thái. Bấm lại không tạo sự kiện/doanh thu/commission trùng.

Station Portal chỉ quan sát và đối soát check-in. Camera nhận diện biển số là minh họa/kiểm tra phụ, không phải điều kiện hoặc thao tác xác nhận chính.

---

## Q01–Q10 – Guest QR Web screen map

QR public được định tuyến theo thiết bị: nếu có Travel App thì mở chuyến trong app; nếu chưa có thì vào Guest QR Web. Q01 là trang chào theo chuyến, hiển thị tên chuyến được chia sẻ, trường họ tên, số điện thoại tùy chọn và lời nhắc/lối đăng nhập cho người đã có tài khoản. Đăng nhập tiếp tục trong luồng Travel App thông thường. Guest có thể xem hành trình trước khi đặt hàng mà không cần đăng nhập hoặc bấm Join Trip. Thông tin nhận diện guest có thể dùng lại ở checkout; link đơn/mã nhận hàng cho phép quay lại.

| Màn | Nội dung và hành động chính |
|---|---|
| Q01 QR landing | Tên miền HTTPS rõ ràng, tên chuyến được chia sẻ, trường họ tên, số điện thoại tùy chọn, lối đăng nhập cho tài khoản hiện có và CTA tiếp tục xem hành trình. |
| Q02 Tổng quan hành trình | Tuyến, xe, tài xế, trạm dừng sắp tới, ETA; CTA Xem trạm. |
| Q03 Chi tiết chặng/trạm | Thời gian đến dự kiến, vị trí trạm, tiện ích và CTA Khám phá sản phẩm. |
| Q04 Trạm dừng | Thông tin trạm, các quầy và khu **Siêu thị Trạm Việt**; chuyển vào danh mục. |
| Q05 Danh mục | Món ăn, đồ uống, đặc sản và hàng tiện ích/đồ khác; thẻ sản phẩm có ảnh, giá, quầy, trạng thái và thời gian chuẩn bị/đóng gói. |
| Q06 Chi tiết món ăn | Ảnh **Cơm gà** của Cơm Việt · A12, 75.000đ, số lượng, ghi chú, thời gian chuẩn bị, nút thêm giỏ. Không dùng ảnh đặc sản ở Q06. |
| Q07 Giỏ hàng | Nhóm sản phẩm theo quầy; một giỏ có thể gồm cả món ăn, đồ uống, đặc sản, hàng tiện ích. |
| Q08 Checkout | Trạm lấy, ETA, thông tin nhận tối giản, tổng tiền và phương thức thanh toán mô phỏng. |
| Q09 Đặt hàng thành công | Mã đơn, thông tin trạm/quầy, hướng dẫn chờ check-in và nhận hàng. |
| Q10 Theo dõi/nhận hàng | Trạng thái theo từng quầy, mã nhận hàng; chỉ bàn giao sau check-in của tài xế. |

Checkout tạo **một Order khách** và **một MerchantOrder cho mỗi quầy**. Với giỏ chuẩn 2 Cơm gà + 1 Cà phê sữa tại A12, tổng là 180.000đ; đây là flow pitch chính. Fixture nhiều quầy 260.000đ ở mục 8 dùng để kiểm thử riêng. Thanh toán chỉ là UI simulation, không gọi cổng thanh toán. Checkout tăng giá trị đặt trước/commission dự kiến; chỉ `PICKED_UP` tăng doanh thu hoàn tất/commission đã kiếm.

---

## U21–U23 – Hồ sơ và quyền đối tác trong Travel App của tài xế

Ba màn U21–U23 thuộc **cùng Travel App đăng nhập của tài xế**, tham chiếu mockup `screen/driver/U21-U23-profile-partner-earnings.png`. Đây không phải màn Guest QR Web, Merchant hay Station Portal. U21 là hồ sơ chung; U22–U23 là phần mở rộng dành cho tài xế đối tác. Không tạo app tài xế thứ hai chỉ vì nhóm màn này.

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
- Become a Partner Driver **chỉ khi chưa là đối tác được duyệt**; tài xế `APPROVED` thấy CTA quản lý/xem hồ sơ đối tác thay vì lời mời đăng ký lại.

Partner driver:

Hiển thị thêm:

- Company.
- Vehicle.
- Partner status.
- Commission rate.
- Earnings.

---

## U22 – Partner Driver

Màn hồ sơ và trạng thái hợp tác của tài xế trong Travel App. Nhánh chưa được duyệt có thể mô phỏng onboarding; fixture pitch của Nguyễn Văn Minh là `APPROVED` nên hiển thị thông tin tài xế/nhà xe và hồ sơ xác minh, không bắt đầu onboarding lại.

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

Chỉ xuất hiện với Partner Driver `APPROVED` trong Travel App; vào từ U21/U22 hoặc mục earnings của chuyến. Không hiển thị cho khách Guest QR hay tài xế chưa được duyệt.

KPIs:

- Earned commission (đã bàn giao).
- Pending commission (dự kiến, đang chờ).
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
09:15
Hoàng Long Express
42 passengers
17 orders
1.840.000đ

10:00
Mai Linh Travel
36 passengers
9 orders
920.000đ

10:15
FUTA Charter
44 passengers
21 orders
2.150.000đ
```

Section:

### Giá trị đặt trước trước khi xe tới

Đây phải là card/visual nổi bật.

Mục đích:

Chứng minh Trạm Việt giúp trạm nhìn thấy giá trị đặt trước khi khách bước xuống xe. Phân biệt giá trị đang chờ và doanh thu đã bàn giao. Ví dụ Next 2 Hours là seed minh họa; render từ selectors. Trip chính tăng 17 → 18 đơn, 1.840.000đ → 2.020.000đ sau checkout mới.

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

- Xem trạng thái check-in của tài xế.

---

## S05 – Vehicle Check-in

Màn đối soát sự kiện check-in từ Travel App của tài xế; Station không xác nhận xe đến thay tài xế.

UI:

```text
Driver check-in received

29B-123.45 · Trạm Việt Ninh Bình

CHECKED IN ✓

Driver: Nguyễn Văn Minh
Passengers: 42
Orders: 18

[ Xem đơn chờ nhận ]
```

Camera/biển số có thể hiển thị như tín hiệu kiểm tra phụ mô phỏng; không tạo check-in thứ hai. Giờ check-in lấy từ `TripStop.checkedInAt`.

---

## S06 – Order Management

Màn hình giám sát đơn toàn trạm, có bộ lọc cửa hàng và tabs:

- Mới.
- Đã nhận.
- Đang làm.
- Sẵn sàng.
- Hoàn tất / Từ chối.

Station Manager theo dõi; Merchant thực hiện nhận đơn, làm món và bàn giao.

Mỗi order card:

- Order ID.
- Vehicle.
- ETA.
- Items.
- Total.

Interaction:

- Lọc theo merchant, xe/chuyến, trạng thái.
- Mở chi tiết đơn và từng phần thuộc cửa hàng.
- Xem món sắp đến giờ làm, đã sẵn sàng, chậm chuẩn bị.
- CTA “Mở Merchant demo” chuyển sang đúng cửa hàng để trình diễn thao tác; không trực tiếp đổi status tại dashboard quản lý trạm.

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

- Xem các phần đơn theo cửa hàng và lịch sử xử lý.
- Mở Merchant demo tương ứng.
- Trạng thái chỉ đọc ở Station Portal, tự cập nhật khi Merchant thao tác.

---

## S08 – Sales Analytics

Thêm bảng Merchant Performance: tên cửa hàng, đơn khách liên quan, số phần đơn cửa hàng, giá trị đặt trước, doanh thu hoàn tất, đơn đang làm, tỷ lệ bàn giao. Có filter cửa hàng và xem danh sách đơn liên quan.

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

# 12A. MERCHANT APP – SCREEN MAP VÀ VẬN HÀNH

Bổ sung **5 màn hình M01–M05**. Guest QR Web Q01–Q10 và Driver check-in D13–D15 là các flow riêng; không dùng tổng số màn cũ để kiểm scope. Modal chi tiết phiếu in là state trong M03, không cần screen mới.

## M01 – Merchant Login

- Logo Trạm Việt Merchant, thông điệp đăng nhập dành cho nhân viên cửa hàng.
- Trường tên đăng nhập/email và mật khẩu; CTA “Đăng nhập”.
- Tài khoản demo mặc định được cấp sẵn cho Cơm Việt – quầy A12, Trạm Việt Ninh Bình; có thể hiển thị gợi ý thông tin đăng nhập cho buổi demo nhưng không cung cấp danh sách/bộ chọn merchant.
- Mỗi tài khoản Merchant ánh xạ cố định tới đúng một merchantId và sau đăng nhập chuyển thẳng vào M02 của cửa hàng đó.
- Không có lựa chọn Cơm Việt/Phở Việt/Cà phê Việt/Siêu thị Trạm Việt, không có chuyển quầy/cửa hàng từ header hoặc profile. Các cửa hàng khác chỉ truy cập bằng thông tin đăng nhập riêng của chính họ.
- Login được mô phỏng local, không auth/backend thật. Đăng xuất quay lại M01; đăng nhập không thay đổi dữ liệu đơn.

## M02 – Orders / Màn hình terminal chính

Ưu tiên scan nhanh, luôn bật tại quầy. Không gian chỉ thuộc merchant của phiên đăng nhập. Header cố định: tên cửa hàng, trạm/quầy, số đơn mới, âm báo, auto-print và đăng xuất. Bottom navigation: Đơn hàng / Thực đơn / Hôm nay.

Tabs: **Mới / Đã nhận / Đang làm / Sẵn sàng / Lịch sử**. Lịch sử gồm đã bàn giao và từ chối. Mọi danh sách chỉ lấy MerchantOrder thuộc activeMerchantId.

Mỗi card có:

- Mã đơn khách + mã phần đơn cửa hàng.
- Món, số lượng, ghi chú; tổng tiền phần thuộc quầy.
- Chuyến, biển số (nếu có), mã nhận món và quầy.
- ETA xe/khách, thời gian chuẩn bị, thời điểm bắt đầu được đề xuất.
- Trạng thái và một primary CTA theo trạng thái hiện tại.

| Trạng thái | CTA | Kết quả |
|---|---|---|
| NEW | Nhận đơn | ACCEPTED; tạo phiếu in mô phỏng nếu auto-print bật |
| NEW | Từ chối | Modal chọn lý do → REJECTED; khách thấy phản hồi |
| ACCEPTED | Bắt đầu làm | PREPARING; lưu thời điểm bắt đầu |
| PREPARING | Đã làm xong | READY; khách thấy quầy và mã nhận món |
| READY | Đã bàn giao | Chỉ bật sau driver check-in đúng trạm; xác nhận mã nhận hàng → PICKED_UP |
| PICKED_UP / REJECTED | Xem chi tiết | Chỉ đọc lịch sử; có thể xem/in lại phiếu |

Đơn mới hiện banner và badge. Âm báo mô phỏng chỉ chạy sau thao tác người dùng bật âm; nếu browser chặn, vẫn có phản hồi trực quan. Không cần push notification thật.

## M03 – Order Detail & Kitchen Ticket

Hiển thị thông tin trong card, chi tiết món và ghi chú, timeline xử lý, ETA, prep time, mã nhận món, quầy lấy món. Các CTA dùng đúng rule M02.

“In phiếu” mở preview phiếu giấy và animation 600–1500ms, sau đó báo “Đã in phiếu mô phỏng”. Có trạng thái lỗi được bật từ Demo Controller và CTA “In lại”. Không gọi printer SDK/Bluetooth/Wi-Fi, không cần thiết bị thật.

Phiếu bếp chứa:

- Trạm Việt, tên trạm, cửa hàng, mã quầy.
- Mã đơn khách / MerchantOrder, ngày giờ demo.
- Chuyến, biển số nếu có, ETA tại thời điểm in.
- Món, số lượng, ghi chú (ví dụ “không hành”).
- Mã nhận món, nơi nhận; nhãn “PHIẾU BẾP – DEMO”.

Phiếu bếp phục vụ chuẩn bị món; không mô phỏng hóa đơn thuế. In lại cùng đơn tăng reprintCount nhưng không tạo đơn, không tăng doanh thu/commission. Lỗi in không thay đổi status của món. Nếu ETA đổi sau khi in, UI dùng ETA mới và cho in lại có nhãn “Cập nhật ETA”.

## M04 – Menu Availability

Danh sách món của đúng cửa hàng: ảnh nhỏ, tên, giá, thời gian làm, toggle “Còn bán / Hết món”. Có thể chỉnh prep time bằng giá trị preset trong demo.

- Toggle cập nhật product.available trong shared store.
- Travel Menu/Product Detail phản ánh ngay; món hết hàng không thêm vào giỏ được.
- Checkout kiểm tra lại availability; nếu món trong giỏ vừa hết, thông báo và yêu cầu bỏ món trước khi tiếp tục.
- Tắt món không tự hủy đơn đã nhận; các đơn hiện hữu vẫn xử lý theo status.
- Không xây tồn kho nguyên liệu, kế toán hay POS bán hàng đầy đủ.

## M05 – Today Summary

Ngày lấy từ demoTime. KPIs của riêng cửa hàng: số phần đơn nhận được, số bàn giao, giá trị đặt trước đang chờ, doanh thu đã bàn giao, đơn cần làm tiếp, xe kế tiếp và ETA. Danh sách đơn sắp đến giờ chuẩn bị có CTA mở M03.

Không dùng số walk-in trang trí khi không có seed. Nếu demo có walk-in, seed phải ghi source riêng và được tính từ dữ liệu.

## 12A.1. Chuẩn bị theo ETA

Mọi countdown dùng demoTime và arrivalAt của TripStop, không dùng timer độc lập giữa các screen.

```text
prepMinutes = thời gian món lâu nhất trong phần đơn của cửa hàng
bufferMinutes = 3 phút (preset demo)
suggestedStartAt = arrivalAt - prepMinutes - bufferMinutes
startInMinutes = max(0, suggestedStartAt - demoTime)
etaMinutes = max(0, arrivalAt - demoTime)
```

Quy ước max prep time giả định làm song song các món trong demo; không xây bài toán tối ưu công suất bếp.

Ví dụ phần đơn Cơm Việt: ETA 32 phút, món lâu nhất 12 phút, buffer 3 phút → “Nên bắt đầu sau 17 phút”. Khi advance thêm 17 phút: ETA còn 15 phút, banner “Đến giờ chuẩn bị”. Bấm bắt đầu → PREPARING, advance 12 phút và bấm xong → READY, ETA còn 3 phút.

- Chỉ ACCEPTED mới hiện nhắc bắt đầu làm. Đến giờ không tự động đổi sang PREPARING.
- Cho phép bắt đầu sớm bằng thao tác của Merchant.
- ETA trễ 20 phút tính lại suggestedStartAt cho đơn ACCEPTED; đơn đang làm giữ status và hiện cảnh báo “Xe đến muộn”.
- ETA đến sớm mà chưa đủ thời gian làm: badge “Nguy cơ chậm món”.
- Trip tới trạm: ETA 0; không tự nhận đơn, không tự báo xong/bàn giao.
- Hành khách/người tự lái không có biển số vẫn đặt được; dùng tên chuyến, ETA và mã nhận món.

## 12A.2. Order state machine thống nhất

```text
NEW → ACCEPTED → PREPARING → READY → PICKED_UP
NEW → REJECTED
```

PICKED_UP tương ứng nhãn “Hoàn tất” trên Travel/Station. Không tạo thêm các status COMPLETED/FULFILLED có ý nghĩa trùng lặp trong code. REJECTED bắt buộc có lý do preset: hết món, quầy quá tải, quầy tạm nghỉ.

Không chuyển lùi, không skip state. Đơn đã nhận không có flow hủy trong phase này. Các transition nằm trong store action dùng chung, không viết riêng từng screen.

## 12A.3. Giỏ nhiều cửa hàng và mô hình dữ liệu

Một lần checkout tạo **1 Order khách**, chứa **1 MerchantOrder cho mỗi cửa hàng**. Khách trả một lần mô phỏng và nhận món tại từng quầy. Merchant chỉ thấy phần của mình. Station xem toàn bộ và breakdown theo merchant.

```ts
type MerchantOrderStatus =
  | 'NEW' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'PICKED_UP' | 'REJECTED'

interface Merchant {
  id: string
  stationId: string
  name: string
  counterCode: string
  acceptingOrders: boolean
}

interface MerchantOrder {
  id: string
  orderId: string
  merchantId: string
  stationId: string
  tripId: string
  tripStopId: string
  pickupCode: string
  status: MerchantOrderStatus
  items: OrderItemSnapshot[]
  total: number // VND nguyên, không gồm phần của merchant khác
  prepMinutes: number
  bufferMinutes: number
  acceptedAt?: string
  startedAt?: string
  readyAt?: string
  pickedUpAt?: string
  rejectedAt?: string
  rejectionReason?: string
}

interface KitchenTicket {
  id: string
  merchantOrderId: string
  status: 'PRINTING' | 'PRINTED' | 'FAILED'
  printedAt?: string
  arrivalAtSnapshot: string
  reprintCount: number
}
```

Product bổ sung merchantId, stationId, category (`FOOD`/`DRINK`/`SPECIALTY`/`CONVENIENCE`/`OTHER`), prepMinutes hoặc packingMinutes và available. Order khách có merchantOrderIds, tripId, stationId, `customerUserId?` (có tài khoản) hoặc `guestSessionId?` (QR web), publicOrderCode, total và paymentStatus mô phỏng. OrderItemSnapshot lưu tên sản phẩm, giá, số lượng, ghi chú tại checkout; chỉnh catalog không làm đổi đơn cũ.

Trip có `publicTripCode` cho QR URL. TripStop cần có id, stationId (nếu là trạm), arrivalAt (ISO datetime), restMinutes và `checkedInAt?`. Khi khởi tạo scenario, demoTime là 08:33 ngày 03/10/2026 theo Asia/Ho_Chi_Minh; arrivalAt trạm Ninh Bình là 09:15 cùng ngày, ETA 42 phút.

ETA lấy từ TripStop, không lưu nhiều bản ETA độc lập trên Order/MerchantOrder. Status tổng hợp của Order lấy từ các phần: nếu mọi phần REJECTED → bị từ chối; nếu mọi phần PICKED_UP/REJECTED và ít nhất một phần PICKED_UP → hoàn tất (ghi rõ phần bị từ chối); nếu các phần còn hiệu lực đều READY/PICKED_UP → sẵn sàng; các tổ hợp khác hiện tiến độ theo từng quầy, không giả định tất cả đã xong.

## 12A.4. Phân tách quyền và metrics

- Merchant lấy activeMerchantId từ tài khoản đã đăng nhập và chỉ đọc/xử lý đơn/món của mình; UI không cho tự sửa merchantId hoặc chuyển cửa hàng. Đây là capability mô phỏng trong frontend, không phải bảo mật production.
- Station nhìn mọi cửa hàng thuộc trạm đang chọn; đọc trạng thái và aggregate dữ liệu.
- Travel user xem đơn của mình; Partner Driver xem aggregate attribution/commission của trip mình, không được thao tác đơn quầy.
- Tổng đơn khách đếm Order ID riêng biệt. Tổng phần đơn quầy đếm MerchantOrder ID. Labels phải thể hiện rõ hai đơn vị.
- Expected value lấy từ phần đơn chưa REJECTED và chưa PICKED_UP; completed revenue chỉ cộng PICKED_UP. Nếu hiển thị tổng giá trị đặt trước, cộng cả pending và completed rồi ghi rõ nhãn.
- Commission pending = tổng phần đơn eligible đang chờ × 5%; earned = tổng phần PICKED_UP eligible × 5%. REJECTED = 0. Khi bàn giao, chuyển pending sang earned, không cộng lần hai.
- Dùng selectors tính tổng từ đơn hiện tại. Thao tác nhận đơn, in phiếu, check-in xe hoặc refresh không được tăng tiền. Việc phát sinh mới chỉ do checkout, việc ghi nhận chỉ do PICKED_UP.

---

# 13. BUSINESS RULES

## BR01 – Universal Trip Creation

Mọi user đều có quyền tạo Trip.

Không yêu cầu user phải là driver.

## BR02 – Universal Trip Sharing

Mọi owner đều có thể share trip.

## BR03 – Guest QR access và optional Join

QR/link public mở trực tiếp chuyến trong Travel App nếu thiết bị đã cài app. Nếu chưa cài, mở Guest QR Web và Q01 thu họ tên cùng số điện thoại tùy chọn trước khi tiếp tục. Người có tài khoản có thể đăng nhập từ Q01; sau đăng nhập trở về luồng Travel App thông thường với chuyến được chia sẻ. Guest tiếp tục bằng browser vẫn xem hành trình và đặt hàng không cần Join. Lưu/Join trip vào My Trips là nhánh tùy chọn.

## BR04 – Universal Ordering

Khách QR hoặc user trong Travel App đều có thể đặt trước tại trạm thuộc itinerary. Danh mục bao gồm FOOD, DRINK, SPECIALTY và CONVENIENCE/OTHER; checkout nhiều quầy vẫn là một Order khách.

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
commission = eligible PICKED_UP MerchantOrder total × commission rate
```

Đã kiếm được chỉ tính trên phần đơn PICKED_UP. Phần đơn chưa bàn giao hiển thị commission dự kiến; REJECTED không có commission. Tổng hợp lên Order/trip theo mục 12A.4.

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

## BR11 – Merchant Ownership

Mỗi product/MerchantOrder thuộc đúng một merchant và station. Merchant không xem/xử lý đơn cửa hàng khác. Station quản lý tổng thể, không thay thế nhân viên quầy.

## BR12 – Preparation Schedule

Lịch làm món lấy từ ETA của TripStop và prep time của phần đơn. Đổi demoTime/ETA cập nhật toàn bộ giao diện; nhắc làm món không tự đổi trạng thái.

## BR13 – Fulfillment & Print

MerchantOrder tuân thủ NEW → ACCEPTED → PREPARING → READY → PICKED_UP; chỉ NEW được REJECTED. `READY` chỉ được `PICKED_UP` sau khi tài xế check-in tại đúng TripStop và Merchant xác nhận mã nhận hàng. In phiếu độc lập với fulfillment, không có printer integration thật.

## BR14 – Availability & Accounting

Sản phẩm hết hàng không được checkout; đơn đã nhận giữ nguyên. Metrics và commission lấy từ shared selectors, đếm đơn khách và phần đơn quầy riêng, không tăng tiền do in lại hoặc lặp thao tác.

## BR15 – Driver check-in

Chỉ tài xế/owner chuyến hợp lệ bấm check-in ở Travel App khi tới đúng trạm. Thao tác ghi `checkedInAt`, đổi trip sang `AT_STATION` và đồng bộ Guest QR, Merchant, Station. Lặp lại là idempotent; check-in không tự hoàn tất đơn hay ghi nhận doanh thu/commission. Camera Station chỉ đối soát.

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
- Merchant thấy phần đơn NEW của mình; Station Portal thấy Order và breakdown.
- Station expected pre-order value tăng.
- Nếu partner trip: pending commission tăng.
- Merchant xử lý → Travel theo dõi trạng thái, Station thấy readiness.
- Merchant bàn giao → completed revenue/earned commission tăng, pending giảm tương ứng.
- Mọi action lặp lại ở status cũ đều không tạo ghi nhận mới.

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

## 15.3. Merchants, Products & Orders

Seed tại Trạm Việt Ninh Bình:

| ID | Cửa hàng | Quầy | Món mẫu |
|---|---|---|---|
| merchant-com-viet | Cơm Việt | A12 | Cơm gà 75.000đ (12 phút), cà phê sữa 30.000đ (4 phút), nước suối 15.000đ (1 phút) |
| merchant-pho-viet | Phở Việt | A01 | Phở bò 65.000đ (10 phút), nước suối 15.000đ (1 phút) |
| merchant-cafe-viet | Cà phê Việt | B02 | Cà phê sữa 30.000đ (4 phút), bánh mì 35.000đ (7 phút) |
| merchant-sieu-thi-tram-viet | Siêu thị Trạm Việt | C01 | Cơm cháy 65.000đ (đặc sản, đóng gói 2 phút), khăn giấy 15.000đ (hàng tiện ích, 1 phút) |

Đây là dữ liệu hư cấu phục vụ demo. Product IDs riêng theo cửa hàng kể cả khi tên món giống nhau. Mỗi món mặc định available=true; có một món hết hàng bổ sung để trình diễn M04. Cửa hàng acceptingOrders=false không nhận checkout mới.

Seed có 17 Order khách với tổng 1.840.000đ cho trip chính; dùng NEW/ACCEPTED/PREPARING/READY để chưa ghi earned revenue cho các đơn này. Có fixture nhiều merchant để kiểm tra split. Nếu cần lịch sử hoàn tất, seed sang trip trước và không gộp vào 17 đơn của trip chính. Snapshot item totals phải khớp Order/MerchantOrder, không tạo KPI giả độc lập.

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

## Merchant App

- Test 375px, 390px, 430px; tối ưu terminal khoảng 400–500px.
- Nút cao tối thiểu 48px, cỡ chữ món/ETA dễ đọc, không phụ thuộc hover.
- Header và tabs cố định, danh sách cuộn; badge dùng chữ + màu để phân biệt trạng thái.
- CTA quan trọng dễ chạm, tránh bấm nhầm “Từ chối” và “Nhận đơn”.
- Desktop preview giữ khung terminal có padding, không kéo thành dashboard rộng.
- In phiếu mở drawer/modal có preview giấy trắng; không cần mô phỏng vỏ thiết bị phức tạp.

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
│   │   ├── merchant/
│   │   └── station-portal/
│   │
│   ├── demo/
│   │   ├── users.ts
│   │   ├── trips.ts
│   │   ├── stations.ts
│   │   ├── merchants.ts
│   │   ├── kitchenTickets.ts
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
│   │   ├── merchantOrders.ts
│   │   ├── preparation.ts
│   │   ├── demoTime.ts
│   │   └── format.ts
│   │
│   └── pages/
│       ├── travel/
│       ├── station/
│       ├── merchant/
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
  currentActor: 'travel' | 'guest-qr' | 'merchant' | 'station'
  activeMerchantId: string
  activeStationId: string
  activeTripId: string
  demoTime: string
  tripState: TripStatus
  tripProgress: number
  users: User[]
  trips: Trip[]
  stations: Station[]
  orders: Order[]
  merchants: Merchant[]
  products: Product[]
  merchantOrders: MerchantOrder[]
  kitchenTickets: KitchenTicket[]
  commissions: Commission[]

  joinTrip: (tripId: string) => void
  checkInTripStop: (tripId: string, stationId: string) => void
  getGuestOrder: (publicOrderCode: string) => Order | undefined
  createOrder: (...) => void
  updateMerchantOrderStatus: (...) => void
  setProductAvailability: (...) => void
  printKitchenTicket: (...) => void
  updateStopArrivalAt: (...) => void
  advanceTrip: (...) => void
  setTripState: (...) => void
  simulateArrival: () => void // Demo Controller kích hoạt cùng action check-in của tài xế
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
| QR guest web | QR thật tới URL HTTPS public `/t/{publicTripCode}`, hành trình trước danh mục |
| Guest access | Không cài app/đăng nhập; session/link đơn tối giản |
| Join Trip | Nhánh tài khoản tùy chọn, không chặn guest order |
| My Trips | Functional |
| Station Detail | Functional |
| Catalog | FOOD, DRINK, SPECIALTY, CONVENIENCE/OTHER; trạng thái theo quầy |
| Cart | Functional |
| Checkout | Functional |
| Payment | UI simulation |
| Order | Functional local state |
| Station Orders | Giám sát + aggregate shared state |
| Merchant Login | Local demo credentials, each account maps to one fixed merchant |
| Merchant Orders | Functional, lọc merchantId; nhận/làm/xong/bàn giao |
| Preparation countdown | Tính từ demoTime + TripStop ETA + prep time |
| Kitchen ticket printing | Preview, animation, lỗi/in lại mô phỏng |
| Product availability | Shared state, Guest QR/Travel catalog và checkout cập nhật |
| Merchant Today Summary | Selectors từ đơn và ngày demo |
| Commission | Functional calculation |
| AI itinerary import | Simulated |
| Driver check-in | Travel App action idempotent, đồng bộ các bề mặt |
| Camera recognition | Đối soát phụ mô phỏng tại Station |
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
- Merchant terminal layout và navigation.

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
- D13–D15 Driver check-in.
- Q01–Q03 QR landing và hành trình guest web.

Đây là vertical slice đầu tiên phải hoàn thiện.

## Phase 4 – Trip Creation

- U05 Create Trip.
- U06 Route Planning.
- U07 Recommended Stops.
- U08 Review.
- Simulated itinerary upload.

## Phase 5 – Ordering

- Q04–Q10 trạm, catalog đủ nhóm hàng, món ăn Q06, giỏ, checkout và theo dõi đơn.

## Phase 6 – Partner Driver

- U21 Profile.
- U22 Partner Driver.
- U23 Earnings.
- Commission rules.

## Phase 7 – Merchant Operations

- M01 Login/demo selector.
- M02 Orders.
- M03 Detail, phiếu bếp và in mô phỏng.
- M04 Menu Availability.
- M05 Today Summary.
- ETA preparation schedule, notification và transition rules.

## Phase 8 – Station Portal

- S02 Overview.
- S03 Incoming Vehicles.
- S04 Vehicle Detail.
- S05 Check-in.
- S06 Orders.
- S07 Order Detail.
- S08 Analytics.
- S09 Commission.

## Phase 9 – Cross-App Demo Logic

Đảm bảo:

- Passenger checkout → Merchant phần đơn NEW + Station đơn khách tăng.
- Merchant accept/prepare/ready/pickup → Travel và Station phản ánh cùng status.
- Expected value và pending commission tại checkout; earned revenue/commission tại pickup.
- Merchant availability → Guest QR catalog/checkout và Travel catalog cập nhật.
- Driver check-in → Guest, Merchant, Station cùng nhận trạng thái; Merchant READY mới được bàn giao.
- ETA schedule và printing không tạo ghi nhận tiền trùng.
- Status order đồng bộ.
- Trip state đồng bộ.

## Phase 10 – Polish

- Motion.
- Loading states.
- Empty states.
- Error states.
- Skeletons.
- Responsive.
- Visual consistency.

## Phase 11 – E2E Demo Test

Test complete pitch flow bằng Playwright.

---

# 23. MAIN E2E DEMO FLOW

Playwright phải test được flow này:

## Flow A – Passenger experience

1. Tài xế chia sẻ QR/link HTTPS của chuyến Hà Nội → Đà Nẵng.
2. Khách quét QR: nếu có Travel App thì chuyến mở trong app; nếu chưa có thì Q01 trên browser hiển thị tên chuyến và yêu cầu họ tên, số điện thoại là tùy chọn. Người có tài khoản có thể đăng nhập để vào luồng Travel App thông thường.
3. Guest tiếp tục trên web, xem tổng quan hành trình và trạm sắp tới trước khi vào mua hàng.
4. Mở trạm và catalog gồm món ăn, đồ uống, đặc sản và hàng tiện ích.
5. Mở Q06 chi tiết Cơm gà tại Cơm Việt · A12.
6. Xem ETA và quầy nhận.
7. Chọn số lượng.
8. Thêm vào giỏ.
9. Tiếp tục xem catalog.
10. Add 2 × Cơm gà tại Cơm Việt.
11. Add 1 × Cà phê sữa tại Cơm Việt; tổng 180.000đ.
12. Open cart.
13. Checkout.
14. Select MoMo.
15. Pay.
16. See payment success.
17. Open Order Detail.

## Flow B – Merchant experience

1. M01 đăng nhập bằng tài khoản riêng của Cơm Việt, tự động vào M02 của Cơm Việt.
2. Thấy phần đơn 180.000đ vừa checkout; cửa hàng khác không thấy phần này.
3. Nhận đơn → ACCEPTED; preview/in phiếu mô phỏng.
4. Demo Controller đặt ETA còn 32 phút; prep 12 phút + buffer 3 → nhắc bắt đầu sau 17 phút.
5. Advance 17 phút; thấy banner đến giờ, bấm Bắt đầu làm → PREPARING.
6. Advance 12 phút; bấm Đã làm xong → READY, ETA còn 3 phút.
7. Travel thấy món sẵn sàng/quầy A12; Station thấy readiness.
8. Tài xế bấm Check-in trong Travel App; sau đó Merchant xác nhận mã nhận hàng rồi Đã bàn giao → PICKED_UP.
9. In lại không tăng đơn, doanh thu hay commission.

## Flow C – Station experience

1. Open Station Portal, thấy incoming Hoàng Long và ETA.
2. Open vehicle, xem passenger/order và breakdown cửa hàng.
3. Open Orders, tìm đơn vừa tạo, quan sát status do Merchant cập nhật.
4. Quan sát sự kiện driver check-in trên Station Portal; camera nếu có chỉ đối soát, không tự hoàn tất đơn.
5. Sau Merchant pickup, kiểm tra Sales/Merchant Performance và completed revenue.

## Flow D – Driver commission

1. Switch to Partner Driver demo user.
2. Open Earnings.
3. Kiểm tra pending commission tại checkout, earned chưa tăng.
4. Sau pickup đơn 180.000đ, earned commission tăng 9.000đ; pending giảm tương ứng.
5. Open trip earnings detail.

---

## Flow E – Availability & exceptions

1. Merchant đánh dấu Cơm gà hết món; Guest QR và Travel không thêm/checkout món đó được.
2. Bật lại, tạo đơn NEW, từ chối kèm lý do; Travel thấy phản hồi, expected value/pending commission loại phần bị từ chối.
3. Đổi ETA trễ 20 phút: đơn ACCEPTED tính lại giờ bắt đầu; đơn PREPARING giữ trạng thái.
4. Bật lỗi in, thử in lại; status đơn và tiền không đổi.
5. Fixture giỏ 2 cửa hàng: 2 Cơm gà + Cà phê sữa (A12, 180.000đ) và Cơm cháy + khăn giấy (C01, 80.000đ), tổng 260.000đ; mỗi Merchant chỉ thấy phần mình; 1 Order khách, 2 MerchantOrder; bàn giao một quầy chưa hoàn tất toàn Order. Fixture này tách khỏi flow pitch 180.000đ.
6. Reset Demo khôi phục seed, thời gian, availability, phiếu in và commission.

---

# 24. ACCEPTANCE CRITERIA

## Product

- Travel App, Guest QR Web, Merchant App và Station Portal đều truy cập được theo screen map tương ứng.
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
- Tài xế check-in đúng trạm một lần; Station/Guest/Merchant đồng bộ trạng thái.
- Partner Driver có thêm Earnings.

## Guest QR Web

- QR mở chuyến trong app nếu đã cài; nếu chưa, mở URL HTTPS Guest QR Web có tên miền rõ. Q01 nhận họ tên, số điện thoại tùy chọn và hỗ trợ đăng nhập tài khoản; guest vẫn vào hành trình và đặt hàng không cần cài app, đăng nhập hoặc Join.
- Q06 chi tiết Cơm gà của A12; các nhóm hàng khác vẫn mua được trong cùng giỏ.
- Checkout tạo một Order khách, chia MerchantOrder theo quầy; khách tra cứu trạng thái/mã nhận hàng bằng link hoặc mã đơn.

## Commission

- Non-partner order không tạo commission.
- Partner trip order tạo pending commission; PICKED_UP tạo earned commission.
- Commission = eligible phần đơn × rate theo status; không ghi nhận trùng.

## Station Portal

- Incoming vehicle hiển thị ETA.
- Vehicle Detail có passenger count và orders.
- Orders phản ánh status do Merchant thay đổi.
- S05 nhận check-in từ tài xế; camera nếu có chỉ đối soát.
- Overview và Merchant Performance cập nhật từ demo state.
- Phân biệt số Order khách / MerchantOrder và expected value / completed revenue.

## Merchant App

- M01–M05 bấm được trên mobile/POS preview.
- Chỉ thấy đúng đơn/món của merchant gắn với tài khoản đã đăng nhập; không có merchant selector.
- CTA tuân thủ state machine; từ chối có lý do.
- Nhắc chuẩn bị đúng demoTime và ETA, cập nhật khi ETA thay đổi.
- Auto-print, print preview, lỗi và in lại được mô phỏng; không đổi tiền/status.
- Availability phản ánh tới Guest QR và Travel, checkout kiểm tra lại.
- READY không thể bàn giao trước check-in của tài xế.
- Pickup cập nhật Travel/Station và earned commission đúng một lần.
- Today Summary lấy từ đơn thuộc merchant và ngày demo.

## Demo polish

- Không dead button ở happy path.
- Không console error nghiêm trọng.
- Không broken layout ở mobile target.
- Không broken layout ở desktop station target.
- Không broken layout ở mobile/POS merchant và Guest QR target; kiểm tra screenshot cả bốn bề mặt.

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
- Printer SDK, Bluetooth/Wi-Fi printer connection.
- Hóa đơn thuế/e-invoice.
- POS kế toán, tồn kho nguyên liệu đầy đủ.

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
3. Station Portal desktop-first; Merchant mobile/POS-first, không làm Merchant desktop dashboard riêng.
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
4. Share QR / Guest itinerary.
5. Guest catalog đa nhóm hàng.
6. Checkout.
7. Merchant Orders + ETA preparation + kitchen ticket.
8. Station Order Monitoring + Merchant Performance.
9. Driver Earnings.
10. Create Trip.
11. Onboarding.

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

Hành khách scan QR, mở trang HTTPS trên trình duyệt mà không tải app hoặc đăng nhập.

### 4. Hành khách xem chuyến

Guest QR Web hiển thị trước khi vào đặt hàng:

- Xe đang ở đâu.
- Điểm tiếp theo.
- ETA.
- Lịch trình.

### 5. Hành khách xem trạm sắp tới

Mở Trạm Việt Ninh Bình.

Xem tiện ích, các quầy và catalog gồm món ăn, đồ uống, đặc sản, hàng tiện ích.

### 6. Hành khách đặt đồ

2 × Cơm gà + 1 × Cà phê sữa, tổng 180.000đ tại Cơm Việt.

Payment success được mô phỏng.

### 7. Station Portal thay đổi

- Orders tăng.
- Giá trị đặt trước tăng từ 1.840.000đ lên 2.020.000đ; 17 → 18 đơn khách.
- Xe Hoàng Long đang approaching.
- ETA còn 32 phút.

### 8. Merchant nhận đơn và chuẩn bị món

Chuyển sang terminal Cơm Việt. Đơn NEW xuất hiện, nhận đơn → ACCEPTED, phiếu bếp in mô phỏng.

ETA 32 phút, prep 12 phút, buffer 3 phút → bắt đầu sau 17 phút. Advance demoTime, Merchant bấm Bắt đầu làm → PREPARING; làm xong → READY. Station theo dõi toàn trạm; khách thấy quầy nhận món.

### 9. Xe tới

Tài xế bấm **Check-in tại trạm** trong Travel App. Guest QR, Merchant và Station đồng bộ trạng thái; camera/biển số ở Station nếu có chỉ là đối soát mô phỏng.

### 10. Order hoàn thành

Merchant xác nhận mã nhận món, bấm Đã bàn giao → PICKED_UP. Nếu nhiều quầy, mỗi quầy bàn giao riêng.

### 11. Driver Earnings cập nhật

Driver thấy:

- Revenue generated.
- Commission earned tăng 9.000đ cho đơn 180.000đ vừa bàn giao.

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
ETA-based merchant preparation
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
- Có Travel App mobile hoàn chỉnh cho tài xế, gồm QR share và check-in.
- QR mở chuyến trong Travel App nếu đã cài; nếu chưa có app, Guest QR Web mở bằng HTTPS với Q01 thu họ tên, số điện thoại tùy chọn và lối đăng nhập tài khoản; guest vẫn xem hành trình và đặt hàng không cần cài app/đăng nhập.
- Có Station Portal desktop hoàn chỉnh cho happy path.
- Có Merchant terminal mobile/POS M01–M05 hoàn chỉnh cho happy path.
- Có một demo trip Hà Nội → Đà Nẵng.
- QR/share flow public hoạt động và hiện rõ tên miền trên Q01.
- Join trip cho tài khoản là tùy chọn; guest order không phụ thuộc Join.
- My Trips hoạt động.
- Trip timeline hoạt động.
- Live trip được simulate.
- Station detail/catalog đa nhóm hàng/cart/checkout hoạt động; Q06 là chi tiết Cơm gà.
- Order được tạo trong local state.
- Station nhìn thấy order.
- Merchant nhận/làm/xong; chỉ bàn giao sau driver check-in, Station giám sát status.
- ETA nhắc chuẩn bị, availability và phiếu bếp mô phỏng hoạt động.
- Giỏ nhiều cửa hàng chia phần đơn đúng; metrics không đếm trùng.
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
