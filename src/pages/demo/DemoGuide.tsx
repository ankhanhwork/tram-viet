import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDemoStore } from '../../store/useDemoStore';
import { DemoSpotlight } from '../../components/DemoSpotlight';
import { DemoGuidePanel } from '../../components/DemoGuidePanel';

const steps = [
  { route: '/app', eyebrow: 'BƯỚC 1 · TÀI XẾ', title: 'Tạo lịch trình', tap: 'Chạm “Lên lịch trình”.', selector: '[data-demo-target="planner-start"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 2 · TÀI XẾ', title: 'Chọn AI', tap: 'Chạm “Tự tạo bằng AI”.', selector: '[data-demo-target="planner-ai-mode"]' },
  { route: '/app/trips/new?mode=import', eyebrow: 'BƯỚC 3 · TÀI XẾ', title: 'Nạp lịch mẫu', tap: 'Chạm “Bắt đầu với lịch trình mẫu”.', selector: '[data-demo-target="planner-demo-itinerary"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 4 · TÀI XẾ', title: 'Xem lại lịch thủ công', tap: 'Có thể sửa điểm; xong chạm “Xem lịch trình cân bằng”.', selector: '[data-demo-target="planner-review-next"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 5 · TÀI XẾ', title: 'Xem trạm đề xuất', tap: 'Chạm “Chi tiết” ở trạm được làm sáng.', selector: '[data-demo-target="planner-rest-detail"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 6 · TÀI XẾ', title: 'Thêm trạm nghỉ', tap: 'Chạm “Thêm trạm vào hành trình”.', selector: '[data-demo-target="planner-add-station"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 7 · TÀI XẾ', title: 'Xác nhận điểm nghỉ', tap: 'Chạm “Tiếp tục với điểm nghỉ”.', selector: '[data-demo-target="planner-rest-continue"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 8 · TÀI XẾ', title: 'Thông tin chuyến', tap: 'Chạm “Xem lại hành trình”.', selector: '[data-demo-target="planner-info-next"]' },
  { route: '/app/trips/new?mode=manual', eyebrow: 'BƯỚC 9 · TÀI XẾ', title: 'Tạo hành trình', tap: 'Chạm “Tạo hành trình & sổ tay”.', selector: '[data-demo-target="planner-save"]' },
  { route: '/app/trips/trip-hn-qb/share', eyebrow: 'BƯỚC 10 · TÀI XẾ', title: 'Mở trải nghiệm khách', tap: 'Quét QR hoặc chạm “Trải nghiệm như hành khách”.', selector: '[data-demo-target="driver-share"]' },
  { route: '/t/HN-QB-A8K29?guide=1', eyebrow: 'BƯỚC 11 · HÀNH KHÁCH', title: 'Khách bắt đầu', tap: 'Chạm “Tiếp tục xem hành trình”.', selector: '[data-demo-target="guest-start"]' },
  { route: '/merchant/orders', eyebrow: 'BƯỚC 12 · MERCHANT', title: 'Nhận đơn mới', tap: 'Chạm đơn mới được làm sáng.', selector: '[data-demo-target="merchant-new-order"]' },
  { route: '/merchant/orders', eyebrow: 'BƯỚC 13 · MERCHANT', title: 'Bắt đầu làm món', tap: 'Chạm “Bắt đầu làm”.', selector: '[data-demo-target="merchant-start-prep"]' },
  { route: '/merchant/orders', eyebrow: 'BƯỚC 14 · MERCHANT', title: 'Món đã sẵn sàng', tap: 'Chạm “Đã làm xong”.', selector: '[data-demo-target="merchant-finish-prep"]' },
  { route: '/station', eyebrow: 'BƯỚC 15 · QUẢN LÝ TRẠM', title: 'Xem nhu cầu trạm', tap: 'Xem nhóm KPI được làm sáng.', selector: '[data-demo-target="station-kpis"]' },
  { route: '/station/vehicles', eyebrow: 'BƯỚC 16 · QUẢN LÝ TRẠM', title: 'Xem xe sắp đến', tap: 'Chạm bộ lọc “Sắp đến”.', selector: '[data-demo-target="station-vehicle-filter"]' },
  { route: '/station/partners', eyebrow: 'BƯỚC 17 · QUẢN LÝ TRẠM', title: 'Xếp hạng đối tác', tap: 'Đổi tiêu chí xếp hạng tại đây.', selector: '[data-demo-target="station-partner-ranking"]' },
];

export function DemoGuide() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/app' && s.demoGuideStep >= 4) s.setDemoGuideStep(0);
    if (s.demoGuideEnabled && s.demoGuideStep === 0 && !location.pathname.startsWith('/t/') && location.pathname !== '/app') {
      navigate('/app', { replace: true });
    }
  }, [location.pathname, navigate, s]);
  if (!s.demoGuideEnabled || location.pathname.startsWith('/t/')) return null;
  const index = Math.min(s.demoGuideStep, steps.length - 1);
  const step = steps[index];
  const merchantDetail = location.pathname.startsWith('/merchant/orders/');
  const plannerRoute = location.pathname === '/app/trips/new' && index >= 1 && index <= 8;
  const onStepRoute = `${location.pathname}${location.search}` === step.route || plannerRoute || (merchantDetail && index >= 11 && index <= 13);
  const selector = !onStepRoute
    ? '[data-demo-target="demo-guide-panel"]'
    : merchantDetail && index === 11
      ? '[data-demo-target="merchant-accept-order"]'
    : step.selector;
  const instruction = merchantDetail && index === 11 ? 'Chạm “Nhận đơn”.' : step.tap;
  const previous = steps[index - 1];
  const next = steps[index + 1];
  const go = (nextIndex: number) => {
    s.setDemoGuideStep(nextIndex);
    navigate(nextIndex >= 12 && nextIndex <= 13 && merchantDetail ? location.pathname + location.search : steps[nextIndex].route);
  };
  return (
    <>
      <DemoSpotlight selector={selector} />
      <DemoGuidePanel
        className="demo-guide"
        step={index + 1}
        total={steps.length}
        title={step.title}
        instruction={onStepRoute ? instruction : 'Chạm “Mở bước này” để mở đúng màn.'}
        previousLabel={previous ? `Trước: ${previous.title}` : 'Trước'}
        nextLabel={!onStepRoute ? 'Mở bước này' : next ? `Tiếp: ${next.title}` : 'Kết thúc'}
        onPrevious={index ? () => go(index - 1) : undefined}
        onNext={() => !onStepRoute ? navigate(step.route) : index === steps.length - 1 ? s.setDemoGuide(false) : go(index + 1)}
        onClose={index === steps.length - 1 ? () => s.setDemoGuide(false) : undefined}
      />
    </>
  );
}
