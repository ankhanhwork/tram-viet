# Cấu trúc prototype Trạm Việt

Prototype dùng **một React SPA, một repo và một Vercel project**. React Router phân chia các giao diện; Zustand giữ dữ liệu chung. Không cần biến môi trường hay API key.

```text
src/
  app/router.tsx           Đường dẫn của các giao diện
  components/             Layout, card, modal, timeline, minh họa tuyến
  demo/data.ts            Người dùng, chuyến, trạm, quầy, sản phẩm, đơn seed
  features/ordering/      Danh mục, giỏ, checkout, theo dõi đơn dùng chung
  features/trips/         Nhập/tạo lịch trình và chi tiết địa điểm
  pages/travel/           Trang chủ, tạo/tham gia/chia sẻ chuyến, hồ sơ, thu nhập
  pages/guest/            QR landing, hành trình công khai
  pages/merchant/         Login, phần đơn, thực đơn, phiếu bếp, hôm nay
  pages/station/          Tổng quan, xe, đơn, doanh thu, đối tác
  pages/demo/             Trang chọn giao diện và Demo Controller
  store/useDemoStore.ts   Các action và lưu/khôi phục state
  lib/rules.ts            Trạng thái, ETA, metrics, commission, định dạng
  lib/journey.ts          Parser, lịch nhiều ngày, khoảng cách và sổ tay địa điểm
  types/index.ts          Kiểu dữ liệu TypeScript
  styles/index.css        Tailwind và CSS responsive
tests/
  unit/                   Quy tắc tiền, trạng thái và ownership
  e2e/                    Hành trình qua các giao diện, responsive, nhiều tab
```

## Dữ liệu và quy tắc

- `Trip` là đối tượng chung. Travel App phục vụ tất cả nhóm người dùng. Đối tác được duyệt có thêm Thu nhập.
- Checkout tạo một `Order` khách và một `MerchantOrder` cho mỗi cửa hàng. Món lưu giá, số lượng và ghi chú tại lúc checkout.
- Merchant login gắn đúng một merchantId; thao tác store kiểm tra phần đơn/món thuộc phiên đó.
- Merchant xử lý `NEW → ACCEPTED → PREPARING → READY → PICKED_UP`; chỉ NEW được từ chối với lý do. PICKED_UP cần đúng mã nhận và check-in ở TripStop tương ứng.
- Station chỉ đọc tiến độ. CTA mở Merchant demo thiết lập tài khoản demo tương ứng để trình diễn thao tác tại quầy.
- Metrics tính từ phần đơn; đơn khách đếm Order ID duy nhất. REJECTED không tính vào tiền hoặc commission.
- Hoa hồng 5% chỉ cho partnerTrip + commissionEligible + owner approved. Pending là phần đang chờ, earned là phần PICKED_UP.
- ETA và lịch chuẩn bị tính từ `demoTime` và `TripStop.arrivalAt`. Không tự chuyển trạng thái món khi thời gian tới hạn.
- In phiếu là tác vụ riêng, có lỗi/in lại/khôi phục sau refresh. Không làm thay đổi tiền hoặc số đơn.

## Lưu state và phạm vi mô phỏng

State lưu ở localStorage với key `tram-viet-demo-v1`. Các tab cùng origin cập nhật bằng storage event. Đây là demo tuần tự: các thao tác đồng thời từ nhiều tab có thể ghi đè nhau; thiết bị, profile trình duyệt hoặc subdomain khác có state độc lập.

Auth, thanh toán, camera, trạng thái đã cài Travel App, check-in trong controller, đối soát và máy in đều là mô phỏng. QR thực sự chứa link public của deployment. Toggle “đã cài Travel App” trong controller mô phỏng nhánh mở chuyến trong Travel; chưa có app native hay Universal/App Links thực tế.

Tuyến và ETA gợi ý dùng dữ liệu tĩnh theo Hà Nội → Đà Nẵng. Bốn trạm có thông tin để khám phá; danh mục và đơn đặt trước của phiên prototype tập trung tại Ninh Bình. Hình sản phẩm là minh họa, có thể thay bằng ảnh trong `ProductArt`.

Reset Demo khôi phục seed và phiên đăng nhập; mặc định Anh chưa có chuyến. Xem journey-update.md cho nhập PDF, sổ tay, giờ nghỉ, ảnh và QR nhận hàng. State version 2 dùng key cũ để migrate dữ liệu.
