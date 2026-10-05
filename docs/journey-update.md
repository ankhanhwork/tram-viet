# Lịch trình và sổ tay hành trình

Bổ sung yêu cầu mới của người dùng cho project-spec.md: Travel mở như tài khoản mới, nhập lịch, theo dõi mọi địa điểm, gợi ý trạm và QR nhận hàng.

## Trải nghiệm

- Mặc định là Anh, chưa tạo/tham gia chuyến. Seed Hoàng Long và dữ liệu trạm giữ nguyên. Đăng nhập tài xế Minh hoặc đổi người dùng ở Controller để chạy kịch bản cũ.
- Trang chủ và danh sách chuyến có nhập ảnh/PDF/văn bản. Tự lên lịch với giờ xuất phát, giờ mong muốn đến, nút + thêm điểm, số km từng chặng, thời gian tham quan và ghi chú.
- PDF có văn bản đọc cục bộ bằng pdfjs-dist. Ảnh/PDF scan làm tài liệu đối chiếu; nhập mốc giờ hoặc chọn lịch gợi ý rồi chỉnh. Chưa có OCR/AI.
- Mỗi dòng văn bản: `07:00 Hà Nội | Khởi hành | 0`; nhóm bằng `Ngày 1`, `Ngày 2`… Số cuối là phút ở địa điểm. Luôn kiểm tra đề xuất trước khi lưu.
- Mẫu riêng 3 ngày: Hà Nội → Tràng An → Thanh Hóa → Đại Nội Huế → Thiên Mụ → Lăng Cô → Đà Nẵng → Cầu Rồng → Mỹ Khê → Ngũ Hành Sơn → Đà Nẵng.
- Trạm nghỉ được đề xuất giữa các điểm đã biết, bỏ qua điểm đã có trong lịch. Mặc định 15 phút, chỉnh 15–240 phút. Cộng giờ nghỉ vào cả ngày cuối, so sánh với giờ mong muốn.
- Bước thông tin có biển số, số người, nhà xe từ hồ sơ tài xế xe khách đã đăng ký.
- Người tạo và khách mở cùng timeline nhiều ngày có giờ/hoạt động; bấm địa điểm xem sổ tay và chuyển điểm trước/sau. Trạm có liên kết đặt món.

## Thời gian và quãng đường

src/lib/journey.ts giữ parser, mô tả địa điểm và tính lịch. Km là ước tính dọc tuyến mẫu; tên chưa biết gợi ý 80 km và cho chỉnh. Tốc độ lên lịch 60 km/giờ, không có routing/GPS/traffic API. Mốc giờ nhập là giới hạn đến sớm nhất; giờ nghỉ dịch các mốc về sau.

Giỏ lấy km còn lại theo tiến độ các chặng và tốc độ suy ra từ lịch đã lưu; không dự đoán nhận sớm hơn giờ xe đến. Các giao diện dùng cùng TripStop và đồng hồ chung. Không dùng chữ ETA trên giao diện sản phẩm.

## QR và đặt món

Thực đơn nhóm theo quầy, lưới hai cột có ảnh/giá/thời gian chuẩn bị; chi tiết món có ảnh lớn, số lượng và ghi chú. Checkout tạo token ngẫu nhiên cho Order. QR chứa `tramviet:pickup:<orderId>:<token>`, không có thông tin cá nhân.

Khách lưu QR đưa tại mỗi quầy. Merchant đọc ảnh bằng jsQR hoặc nhận dữ liệu từ máy quét. confirmPickupQr kiểm tra token/Order/merchant; transition kiểm tra READY, trạm đã check-in và chống bàn giao lặp. Một QR cho các phần đơn nhiều quầy, không hoàn tất phần của quầy khác.

Auth, thanh toán, GPS/check-in và máy in vẫn mô phỏng frontend theo phạm vi dự án; đọc ảnh QR là thật, chưa kết nối camera/POS. Nhãn demo/prototype đã bỏ khỏi giao diện khách và vận hành.

## Ảnh và triển khai

8 ảnh tạo bằng image_gen.imagegen, prompt ở asset-prompts.md. PNG gốc ở assets/generated; WebP ở public/images, khoảng 1,4 MB tổng. Bản đồ là minh họa tuyến; ảnh trạm được tạo cho prototype.

Vercel vẫn build Vite từ root, output dist. Ảnh và PDF worker xuất cùng ứng dụng; không cần API key. State version 2 chuyển seed cũ về Anh và bỏ tham gia sẵn chuyến chính, giữ các đơn/chuyến đã tạo.
