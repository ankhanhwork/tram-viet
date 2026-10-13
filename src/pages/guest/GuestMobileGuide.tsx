import { useEffect, useState } from 'react';
import { ChevronDown, CircleHelp, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const guideKey = 'tram-viet-guest-guide';

type GuideStep = { title: string; tap: string; result: string };

function stepFor(path: string): [number, GuideStep] {
  if (path.endsWith('/journey'))
    return [2, { title: 'Xem điểm dừng kế tiếp', tap: 'Chạm “Xem trạm dừng” trên thẻ Điểm dừng tiếp theo.', result: 'Bạn sẽ thấy tiện ích, quầy và món có thể đặt trước.' }];
  if (path.includes('/catalog'))
    return [3, { title: 'Chọn món hoặc đặc sản', tap: 'Chạm “Thêm …” ngay trên món bạn muốn; dùng “Xem giỏ” khi đã chọn xong.', result: 'Giỏ hiển thị giá, quầy nhận và thời gian chuẩn bị.' }];
  if (path.includes('/products/'))
    return [3, { title: 'Xem kỹ trước khi thêm', tap: 'Chọn số lượng, thêm ghi chú nếu cần, rồi chạm “Thêm vào giỏ”.', result: 'Món được giữ trong giỏ để thanh toán một lần.' }];
  if (path.includes('/cart'))
    return [4, { title: 'Kiểm tra giỏ và thanh toán', tap: 'Chạm “Tiếp tục thanh toán”, chọn QR ngân hàng, ZaloPay, Visa/Mastercard hoặc Apple Pay.', result: 'Thanh toán trong demo được mô phỏng; không phát sinh giao dịch thật.' }];
  if (path.includes('/orders/'))
    return [5, { title: 'Đưa QR tại quầy', tap: 'Lưu hoặc mở mã QR nhận hàng và đưa cho nhân viên khi xe đã đến trạm.', result: 'Merchant quét QR để xác nhận đúng món, đúng khách.' }];
  if (path.includes('/station/'))
    return [3, { title: 'Khám phá trạm dừng', tap: 'Chạm “Khám phá sản phẩm” để xem đồ ăn, đồ uống, đặc sản và tiện ích.', result: 'Bạn vẫn có thể quay lại hành trình bất cứ lúc nào.' }];
  return [1, { title: 'Bắt đầu sau khi quét QR', tap: 'Chọn ngôn ngữ ở phía trên, nhập họ tên, rồi chạm “Tiếp tục xem hành trình”.', result: 'Không cần tải app, tạo tài khoản hay cung cấp số điện thoại.' }];
}

export function GuestMobileGuide() {
  const location = useLocation();
  const navigate = useNavigate();
  const [shown, setShown] = useState(() => sessionStorage.getItem(guideKey) === 'on');
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    if (new URLSearchParams(location.search).get('guide') === '1') {
      sessionStorage.setItem(guideKey, 'on');
      setShown(true);
    }
  }, [location.search]);
  if (!shown) return null;
  const [number, step] = stepFor(location.pathname);
  const dismiss = () => {
    sessionStorage.removeItem(guideKey);
    setShown(false);
    if (location.search) navigate(location.pathname, { replace: true });
  };
  return (
    <aside className={`guest-mobile-guide ${expanded ? 'expanded' : ''}`} aria-live="polite">
      <div className="guest-guide-heading">
        <button
          className="guest-guide-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          <CircleHelp size={16} />
          <span>Demo {number}/5</span>
          <strong>{step.title}</strong>
          <ChevronDown size={16} />
        </button>
        <button className="icon-button" aria-label="Tắt hướng dẫn khách" onClick={dismiss}><X size={18} /></button>
      </div>
      {expanded && (
        <div className="guest-guide-copy">
          <span className="eyebrow">BƯỚC {number} / 5</span>
          <p><b>Chạm:</b> {step.tap}</p>
          <small><b>Sau đó:</b> {step.result}</small>
        </div>
      )}
    </aside>
  );
}
