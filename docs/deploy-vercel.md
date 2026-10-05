# Deploy Trạm Việt lên Vercel

## Chuẩn bị

Yêu cầu Node.js 22.12+ hoặc Node.js 24 và npm. Từ thư mục gốc repo:

```bash
npm ci
npm run typecheck
npm run lint
npm test
npm run build
```

Đưa các file source, cấu hình và `package-lock.json` lên GitHub. Không đưa `node_modules`, `.npm-cache`, `dist`, `.vercel` hoặc `test-results` lên Git; đã có `.gitignore`.

## Import trên Vercel

1. Trong Vercel, chọn **Add New → Project** và import repo GitHub này.
2. **Root Directory:** để thư mục gốc repo (`./`).
3. **Framework Preset:** Vite.
4. **Build Command:** `npm run build`.
5. **Output Directory:** `dist`.
6. **Install Command:** mặc định hoặc `npm ci`.
7. **Node.js Version:** 24.x (hoặc 22.x đáp ứng yêu cầu trên).
8. Không cần Environment Variables. Chọn **Deploy**.

`vercel.json` có SPA fallback về `index.html`; mở trực tiếp và refresh các URL lồng nhau vẫn vào React Router. Vite phục vụ CSS, JS, SVG được build và favicon trong public.

## URL sau deploy

Với domain ví dụ `tram-viet.vercel.app`:

| URL | Giao diện |
| --- | --- |
| `/` | Trang chọn trải nghiệm |
| `/app` | Travel App |
| `/t/HN-DN-A8K29` | Guest QR Web |
| `/qr/trip-hn-dn` | Đường dẫn thay thế vào Guest QR |
| `/merchant` | Merchant POS (chưa đăng nhập sẽ tới login) |
| `/station` | Station Portal (chưa đăng nhập sẽ tới login) |
| `/demo-control` | Điều khiển và Reset Demo |

QR/share link lấy từ origin hiện tại, nên tự dùng URL HTTPS của Vercel hoặc custom domain. Để demo đồng bộ, mở các giao diện trên cùng domain và cùng trình duyệt.

Custom domain có thể thêm trong **Project → Settings → Domains**. Nếu muốn ba frontend deploy độc lập về sau, chuyển thành monorepo `apps/travel`, `apps/merchant`, `apps/station`, rồi tạo ba Vercel projects với Root Directory tương ứng. Cần thêm tầng dữ liệu dùng chung để đồng bộ giữa các domain hoặc thiết bị.

## Kiểm tra deployment

- Mở `/app`, `/merchant`, `/station` và URL QR trực tiếp; refresh không bị 404.
- Đặt đơn guest rồi chuyển Merchant trên cùng domain để xử lý.
- Thực hiện driver check-in, bàn giao và kiểm tra earned commission.
- Reset trước khi pitch.

Tài liệu Vercel: [Vite SPA](https://vercel.com/docs/frameworks/frontend/vite), [Monorepos](https://vercel.com/docs/monorepos).
