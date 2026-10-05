# Hướng dẫn trình diễn prototype

## Tài khoản demo

Travel: dùng `minh@demo.vn` (Partner Driver), `anh@demo.vn` (Traveler), `hoang@demo.vn` (Truck Driver). Mật khẩu trên UI chỉ mô phỏng, ví dụ `demo123`. Có thể tạo tài khoản và hồ sơ mới.

Merchant: mỗi email gắn cố định với một quầy, mật khẩu `demo123`:

| Email | Cửa hàng | Quầy |
| --- | --- | --- |
| comviet@demo.vn | Cơm Việt | A12 |
| phoviet@demo.vn | Phở Việt | A01 |
| cafeviet@demo.vn | Cà phê Việt | B02 |
| sieuthi@demo.vn | Siêu thị Trạm Việt | C01 |

Station: nút “Vào quản lý trạm”. Không có auth backend.

## Pitch flow 180.000đ

1. Mở `/demo-control`, Reset Demo. Thời gian 08:33 ngày 03/10/2026; ETA Ninh Bình 42 phút.
2. Đăng nhập Travel bằng minh@demo.vn (mặc định sau reset là Anh chưa có chuyến) → hành trình Hà Nội → Đà Nẵng → Chia sẻ. QR thật mở `/t/HN-DN-A8K29` trên domain đang chạy.
3. Mở link guest **trong cùng trình duyệt** để dữ liệu liên thông. Nhập họ tên, tiếp tục xem timeline → xem trạm → khám phá sản phẩm.
4. Mở Cơm gà của Cơm Việt, chọn 2 suất, ghi chú tùy chọn. Thêm 1 Cà phê sữa của Cơm Việt. Giỏ = 180.000đ, một quầy A12.
5. Checkout với MoMo mô phỏng. Có mã đơn và QR nhận hàng; lưu ảnh QR. Chuyến Hoàng Long tăng 17 → 18 đơn, 1.840.000đ → 2.020.000đ; pending commission tăng 9.000đ, earned chưa tăng.
6. Station xem xe Hoàng Long, đơn mới và mức sẵn sàng của từng quầy.
7. Merchant đăng nhập Cơm Việt → phần đơn mới → Nhận đơn. Phiếu tự in mô phỏng nếu bật auto-print.
8. Controller đặt ETA 32 phút. Merchant thấy “Nên bắt đầu sau 17 phút” (12 phút làm + 3 phút đệm).
9. Controller +17 phút → Merchant Bắt đầu làm. Controller +12 phút → Merchant Đã làm xong. ETA còn 3 phút; bàn giao vẫn bị khóa.
10. Travel của Nguyễn Văn Minh → Check-in tại trạm → Tôi đã đến trạm. Guest, Merchant và Station cùng nhận trạng thái.
11. Merchant → Quét QR & bàn giao → chọn ảnh QR đã lưu → kiểm tra khách/món → Xác nhận bàn giao. Doanh thu hoàn tất tăng 180.000đ, earned commission tăng 9.000đ.
12. In lại, refresh, xem Sales/Earnings: không tăng tiền lần hai.

Tổng trạm ban đầu gồm ba xe seed: 47 đơn, 4.910.000đ. KPI 17 → 18 là riêng chuyến Hoàng Long.

## Các nhánh khác

- **Giỏ hai quầy:** Reset trước. Đặt 2 Cơm gà + 1 Cà phê sữa (180.000đ ở A12), 1 Cơm cháy + 1 Khăn giấy (80.000đ ở C01). Một đơn khách 260.000đ, hai phần đơn và một QR khách dùng tại cả hai quầy. Bàn giao một quầy chưa hoàn tất toàn đơn. Có nút fixture tương ứng trong Controller.
- **Hết món:** Merchant → Thực đơn → tắt Cơm gà. Guest không thêm được, checkout kiểm tra lại món đã nằm trong giỏ.
- **Từ chối:** chỉ đơn NEW được từ chối với lý do. Guest thấy phản hồi; phần từ chối loại khỏi giá trị và commission.
- **Xe trễ:** Controller thêm 20 phút. ACCEPTED tính lại giờ bắt đầu; PREPARING giữ trạng thái.
- **Lỗi in:** Controller bật lỗi in, in phiếu → FAILED. Tắt lỗi và in lại. Không đổi trạng thái/tiền.
- **Người dùng thường:** Controller chọn Traveler/Truck Driver hoặc đăng nhập bằng email demo. Vẫn tạo, tham gia, chia sẻ và đặt hàng; không có Thu nhập đối tác.
- **Onboarding đối tác:** tạo tài khoản coach, đăng ký đối tác → pending. Station có thể duyệt hồ sơ. Chuyến đối tác tạo sau khi duyệt đủ điều kiện; không cộng commission hồi tố cho chuyến không đủ điều kiện.
- **Nhánh đã có app:** Controller bật mô phỏng đã cài Travel App; mở lại QR URL sẽ vào Trip Detail trong Travel. Đây là mô phỏng web, chưa có app native.

Thiết bị khác quét QR vẫn xem được seed và tự đặt hàng local; dữ liệu không truyền về máy pitch. Để pilot đa thiết bị cần backend chung.
