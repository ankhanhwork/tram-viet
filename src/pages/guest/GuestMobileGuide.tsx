import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DemoGuidePanel } from '../../components/DemoGuidePanel';
import { DemoSpotlight } from '../../components/DemoSpotlight';
import { useDemoStore } from '../../store/useDemoStore';

const guideKey = 'tram-viet-guest-guide';
const guideDismissedKey = 'tram-viet-guest-guide-dismissed';
type GuideStep = { title: string; instruction: string; selector: string; path: string };

export function GuestMobileGuide() {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = useParams();
  const s = useDemoStore();
  const [shown, setShown] = useState(
    () => sessionStorage.getItem(guideKey) === 'on' && sessionStorage.getItem(guideDismissedKey) !== 'on',
  );
  const trip = s.trips.find((item) => item.publicTripCode === code);
  const stationId = trip?.stops.find((stop) => stop.stationId)?.stationId ?? 'station-ninh-binh';
  const base = `/t/${code}`;
  const steps = useMemo<GuideStep[]>(() => [
    { title: 'Bắt đầu', instruction: 'Chạm “Tiếp tục xem hành trình”.', selector: '[data-demo-target="guest-start"]', path: base },
    { title: 'Xem điểm dừng', instruction: 'Chạm “Xem trạm dừng”.', selector: '[data-demo-target="guest-next-stop"]', path: `${base}/journey` },
    { title: 'Chọn món', instruction: 'Chạm “Khám phá sản phẩm”.', selector: '[data-demo-target="guest-catalog"]', path: `${base}/station/${stationId}` },
    { title: 'Xem giỏ', instruction: 'Chạm dấu + trên món được làm sáng.', selector: '[data-demo-target="guest-add-product"]', path: `${base}/station/${stationId}/catalog` },
    { title: 'Thanh toán', instruction: 'Chạm “Tiếp tục thanh toán”.', selector: '[data-demo-target="guest-checkout"]', path: `${base}/station/${stationId}/cart` },
    { title: 'Hoàn tất đơn', instruction: 'Chạm nút “Thanh toán”.', selector: '[data-demo-target="guest-pay-demo"]', path: `${base}/station/${stationId}/checkout` },
  ], [base, stationId]);
  const orderPath = location.pathname.includes('/orders/');
  const index = orderPath ? steps.length : Math.max(0, steps.findIndex((step) => location.pathname === step.path));
  const step = orderPath
    ? { title: 'Gửi đơn tới quầy', instruction: 'Chạm “Xem quầy nhận đơn”.', selector: '[data-demo-target="guest-order-handoff"]', path: location.pathname }
    : steps[index] ?? steps[0];

  useEffect(() => {
    if (!s.demoGuideEnabled) {
      sessionStorage.removeItem(guideKey);
      setShown(false);
      return;
    }
    const query = new URLSearchParams(location.search);
    const restartGuide = query.get('restartGuide') === '1';
    if (restartGuide) sessionStorage.removeItem(guideDismissedKey);
    if (query.get('guide') === '1' && sessionStorage.getItem(guideDismissedKey) !== 'on') {
      sessionStorage.setItem(guideKey, 'on');
      setShown(true);
    }
  }, [location.search, s.demoGuideEnabled]);
  if (!s.demoGuideEnabled || !shown || !trip) return null;

  const withGuide = (path: string) => `${path}?guide=1`;
  const dismiss = () => {
    sessionStorage.removeItem(guideKey);
    sessionStorage.setItem(guideDismissedKey, 'on');
    setShown(false);
    navigate(location.pathname, { replace: true });
  };
  const next = () => {
    if (index === 0) {
      s.setGuest(s.guest?.name ?? 'Khách demo', s.guest?.phone ?? '');
      navigate(withGuide(steps[1].path));
    } else if (index === 1) navigate(withGuide(steps[2].path));
    else if (index === 2) navigate(withGuide(steps[3].path));
    else if (index === 3) {
      const product = s.products.find((item) => item.stationId === stationId && item.available);
      if (product) s.addCart(trip.id, stationId, { productId: product.id, quantity: 1, note: '' });
      navigate(withGuide(steps[4].path));
    } else if (index === 4) navigate(withGuide(steps[5].path));
    else if (index === 5) {
      const result = s.checkout(trip.id, stationId, s.guest?.name ?? 'Khách demo', 'QR ngân hàng', true);
      if (!result.error) navigate(`${base}/orders/${result.id}?success=1`);
    } else {
      const order = s.orders.filter((item) => item.tripId === trip.id && item.guestSessionId === s.guest?.id).at(-1);
      const part = order && s.merchantOrders.find((item) => item.orderId === order.id);
      if (!part) return;
      sessionStorage.removeItem(guideKey);
      setShown(false);
      s.openMerchantDemo(part.merchantId);
      s.setDemoGuide(true);
      s.setDemoGuideStep(11);
      navigate(`/merchant/orders/${part.id}?demo=1`);
    }
  };
  return (
    <>
      <DemoSpotlight selector={step.selector} />
      <DemoGuidePanel
        className="guest-mobile-guide"
        step={index + 1}
        total={steps.length + 1}
        title={step.title}
        instruction={step.instruction}
        previousLabel="Trước"
        nextLabel={index === steps.length - 1 ? 'Thanh toán mẫu' : orderPath ? 'Mở quầy demo' : 'Tiếp'}
        onPrevious={index ? () => navigate(withGuide(steps[index - 1].path)) : undefined}
        onNext={next}
        onClose={dismiss}
      />
    </>
  );
}
