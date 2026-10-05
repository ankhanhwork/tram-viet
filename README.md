# Trạm Việt — Bạn đồng hành xuyên Việt

Prototype tương tác phục vụ pitching, chạy bằng frontend và dữ liệu demo. Ba giao diện Travel / Merchant / Station cùng một luồng Guest QR công khai, chia sẻ trạng thái trong cùng trình duyệt.

## Chạy trên máy

Yêu cầu Node.js 22.12+ (khuyến nghị Node.js 24) và npm.

```bash
npm ci
npm run dev
```

Mở `http://localhost:5173`. Trang đầu cho phép chọn giao diện.

| Đường dẫn | Trải nghiệm |
| --- | --- |
| `/app` | Travel App mobile: tạo, tham gia, chia sẻ, theo dõi chuyến, đặt hàng, hồ sơ / earnings |
| `/t/HN-DN-A8K29` | Guest QR: nhận diện khách, hành trình, trạm, catalog, giỏ nhiều quầy, checkout / nhận hàng |
| `/merchant` | Merchant POS: login gắn một merchant, nhận / làm / sẵn sàng / bàn giao, phiếu in, thực đơn, hôm nay |
| `/station` | Station Portal: xe sắp đến, đơn toàn trạm, readiness, doanh thu / merchant performance, đối tác |
| `/demo-control` | Đổi người dùng, advance thời gian, delay ETA, fixture đơn, lỗi in và Reset Demo |

## Lịch trình và sổ tay mới

Travel mở với tài khoản Anh chưa có chuyến. Nhập ảnh/PDF/văn bản hoặc tự lên lịch, thêm nhiều điểm, gợi ý nghỉ trạm 15 phút và so sánh giờ đến cuối. Có mẫu Hà Nội → Đà Nẵng 3 ngày, sổ tay địa điểm dùng chung cho khách tham gia, ảnh món/trạm và QR nhận hàng.

PDF có văn bản đọc tại trình duyệt; ảnh/PDF scan cần nhập mốc giờ hoặc chỉnh lịch gợi ý. Xem [chi tiết cập nhật](docs/journey-update.md) và [nguồn ảnh/prompt](docs/asset-prompts.md).

## Luồng chính đã triển khai

Chuyến Hà Nội → Đà Nẵng của Hoàng Long Express có 17 đơn seed trị giá 1.840.000đ. Khách đặt 2 Cơm gà + 1 Cà phê sữa tại A12 (180.000đ) → Merchant nhận và chuẩn bị theo ETA → tài xế check-in → Merchant đọc QR / bàn giao → earned commission tăng 9.000đ. Một đơn nhiều quầy tách thành phần đơn độc lập; in lại không tăng doanh thu.

Travel phục vụ người đi đường và mọi nhóm tài xế trong cùng app. Merchant trên desktop vẫn nằm trong khung mobile/POS. Station là giao diện quản lý desktop/tablet và không thay cửa hàng thao tác fulfillment.

## Kiểm tra

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Kiểm tra luồng bằng Playwright:

```bash
npx playwright install chromium
npm run test:e2e
```

Có thể dùng Edge đã cài trên Windows:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

Chạy `npm run format` để định dạng source. Build tạo thư mục `dist`; `npm run preview` xem bản production tại `http://localhost:4173`.

## Deploy Vercel

Import repo GitHub, Framework **Vite**, Root Directory **thư mục gốc**, Build **npm run build**, Output **dist**, Node **24.x**. Không cần biến môi trường hay secret. `vercel.json` đã có SPA rewrite cho deep links và refresh.

Xem [hướng dẫn deploy](docs/deploy-vercel.md) và [kịch bản pitch / tài khoản demo](docs/demo-guide.md).

## Cấu trúc và tài liệu

- [Đặc tả sản phẩm](docs/project-spec.md): nguồn quy tắc, screen map và acceptance criteria.
- [Kiến trúc frontend](docs/architecture.md): cấu trúc source, dữ liệu và giới hạn mô phỏng.
- [Hướng dẫn tác nhân](AGENTS.md): quy ước triển khai.
- [Ảnh tham khảo](screen/): màu sắc và tinh thần hình ảnh.

Stack: React, Vite, TypeScript strict, React Router, Zustand, Tailwind CSS, Lucide và QR client-side. Các thành phần UI dùng HTML semantic; dialog hỗ trợ focus và Escape.

State giữ ở localStorage và đồng bộ các tab cùng origin qua storage event. Auth, thanh toán, GPS/ETA, camera, máy in và nhánh app đã cài là mô phỏng. QR hành trình dùng URL thật của deployment; QR nhận hàng có token riêng và đọc ảnh thật bằng jsQR. Prototype chưa có app native; thiết bị khác và domain khác không đồng bộ đơn / check-in khi chưa có backend chung. Danh mục đặt trước hiện tập trung ở Ninh Bình; ảnh sản phẩm/trạm và bản đồ được tạo riêng, tối ưu WebP.
