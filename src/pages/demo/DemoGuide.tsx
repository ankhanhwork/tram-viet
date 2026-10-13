import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/useDemoStore';

const steps = [
  { route: '/app', eyebrow: '1 · TÀI XẾ', title: 'Bắt đầu tạo hành trình', tap: 'Nhập lịch trình · Ảnh, PDF hoặc văn bản.', result: 'Mở hai cách nhập: tự điền hoặc tạo nhanh bằng AI.' },
  { route: '/app/trips/new?mode=import', eyebrow: '2 · TÀI XẾ', title: 'Chọn cách nhập AI', tap: 'Tự tạo bằng AI.', result: 'Khung nhập tự động xuất hiện để tạo tuyến mẫu.' },
  { route: '/app/trips/new?mode=import', eyebrow: '3 · TÀI XẾ', title: 'Tạo tuyến demo', tap: 'Tạo lịch Hà Nội → Quảng Bình.', result: 'Hệ thống điền sẵn 6 điểm lớn: Hà Nội, Ninh Bình, Thanh Hóa, Vinh, Hà Tĩnh và Đồng Hới.' },
  { route: '/app/trips/trip-hn-qb/share', eyebrow: '4 · TÀI XẾ', title: 'Gửi trải nghiệm cho khách', tap: 'Chia sẻ chuyến, rồi dùng QR hoặc nút Sao chép liên kết.', result: 'Khách mở đúng trang mobile và tự thấy hướng dẫn chạm từng bước.' },
  { route: '/t/HN-QB-A8K29?guide=1', eyebrow: '5 · HÀNH KHÁCH', title: 'Khách bắt đầu trên điện thoại', tap: 'Chọn ngôn ngữ, nhập tên, rồi chạm Tiếp tục xem hành trình.', result: 'Hướng dẫn riêng trên điện thoại sẽ tiếp tục chỉ từng nút ở các màn sau.' },
  { route: '/merchant/orders', eyebrow: '6 · MERCHANT', title: 'Xử lý đơn vừa đến', tap: 'Mở tab Mới, chạm đơn ở đầu danh sách rồi bấm Nhận đơn.', result: 'Đơn chuyển sang Đã nhận; tiếp tục cập nhật Sẵn sàng khi hoàn tất.' },
  { route: '/merchant/orders', eyebrow: '7 · MERCHANT', title: 'Giao hàng tại quầy', tap: 'Chạm Quét QR để đối chiếu mã khách.', result: 'Nhân viên giao nhanh, không phải tìm đơn thủ công.' },
  { route: '/station', eyebrow: '8 · QUẢN LÝ TRẠM', title: 'Xem nhịp vận hành trạm', tap: 'Mở Tổng quan.', result: 'Thấy ngay số xe và khách đã tiếp nhận, cùng lượt sắp đến.' },
  { route: '/station/vehicles', eyebrow: '9 · QUẢN LÝ TRẠM', title: 'Ưu tiên xe sắp tới', tap: 'Mở Xe sắp đến, sau đó dùng bộ lọc Số khách hoặc Giá trị đặt trước.', result: 'Danh sách được ưu tiên theo nhu cầu vận hành thực tế.' },
  { route: '/station/partners', eyebrow: '10 · QUẢN LÝ TRẠM', title: 'Theo dõi đối tác', tap: 'Mở Đối tác, đổi cách xếp hạng hoặc nhập % commission riêng.', result: 'Commission chỉ có ở màn quản lý trạm; không hiển thị trên giao diện tài xế.' },
];

export function DemoGuide() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  if (!s.demoGuideEnabled || location.pathname.startsWith('/t/')) return null;
  const index = Math.min(s.demoGuideStep, steps.length - 1);
  const step = steps[index];
  const onStepRoute = `${location.pathname}${location.search}` === step.route;
  const go = (nextIndex: number) => {
    s.setDemoGuideStep(nextIndex);
    navigate(steps[nextIndex].route);
  };
  return (
    <aside className={`demo-guide ${expanded ? 'expanded' : ''}`} aria-live="polite">
      <div className="row">
        <button className="demo-guide-toggle" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
          <span className="eyebrow">Demo {index + 1}/{steps.length}</span>
          <strong>{step.title}</strong>
        </button>
        <button className="icon-button" aria-label="Tắt hướng dẫn" onClick={() => s.setDemoGuide(false)}><X size={17} /></button>
      </div>
      {expanded && <>
        <p><b>Chạm:</b> {step.tap}</p>
        <small><b>Kết quả:</b> {step.result}</small>
        {!onStepRoute && <button className="link-button" onClick={() => navigate(step.route)}>Mở đúng giao diện</button>}
        <div className="demo-guide-actions">
          <button className="button secondary" disabled={!index} onClick={() => go(index - 1)}><ChevronLeft size={17} /> Trước</button>
          <button className="button" onClick={() => index === steps.length - 1 ? s.setDemoGuide(false) : go(index + 1)}>{index === steps.length - 1 ? 'Kết thúc' : 'Tiếp'} <ChevronRight size={17} /></button>
        </div>
        <small>{index + 1} / {steps.length} · Bạn luôn có thể thao tác hoặc bỏ qua một bước.</small>
      </>}
    </aside>
  );
}
