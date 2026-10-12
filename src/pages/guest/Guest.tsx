import { useState } from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Bus, Globe, MapPin } from 'lucide-react';
import {
  Back,
  Card,
  Missing,
  Pill,
  RouteArt,
  TextLink,
  Timeline,
  notify,
} from '../../components/ui';
import { useTripContext } from '../../lib/hooks';
import { clock, currentStop, etaMinutes, segmentProgress } from '../../lib/rules';
import { useDemoStore } from '../../store/useDemoStore';

const copy = {
  vi: { language: 'Ngôn ngữ', shared: 'Hành trình được chia sẻ', welcome: 'Chào bạn,\ncùng đi thật thảnh thơi.', intro: 'Xem hành trình và đặt món trước,\nsẵn sàng khi xe đến trạm.', name: 'Bạn muốn được gọi là gì?', next: 'Tiếp tục xem hành trình', nextStop: 'ĐIỂM DỪNG TIẾP THEO', stop: 'Xem trạm dừng', guide: 'Sổ tay hành trình' },
  en: { language: 'Language', shared: 'Shared journey', welcome: 'Welcome,\ntravel with ease.', intro: 'See the route and pre-order ahead,\nready when the coach arrives.', name: 'What should we call you?', next: 'Continue to itinerary', nextStop: 'NEXT STOP', stop: 'View rest stop', guide: 'Journey guide' },
  zh: { language: '语言', shared: '共享行程', welcome: '您好，\n轻松同行。', intro: '查看行程并提前预订，\n车辆抵达时即可取餐。', name: '我们如何称呼您？', next: '继续查看行程', nextStop: '下一站', stop: '查看休息站', guide: '行程手册' },
} as const;

function LanguagePicker() {
  const s = useDemoStore();
  const t = copy[s.guestLanguage];
  return <label className="language-picker"><Globe size={15} /><span>{t.language}</span><select value={s.guestLanguage} onChange={(e) => s.setGuestLanguage(e.target.value as keyof typeof copy)} aria-label={t.language}><option value="vi">Tiếng Việt</option><option value="en">English</option><option value="zh">中文</option></select></label>;
}
export function GuestLanding() {
  const { data: s, trip, base } = useTripContext();
  const [name, setName] = useState(s.guest?.name ?? '');
  const [phone, setPhone] = useState(s.guest?.phone ?? '');
  const navigate = useNavigate();
  const location = useLocation();
  const t = copy[s.guestLanguage];
  if (!trip) return <Missing />;
  if (s.appInstalled) return <Navigate to={`/app/trips/${trip.id}`} replace />;
  return (
    <>
      <div className="public-address">
        <Globe size={14} />
        {window.location.host}
        {base}
      </div>
      <LanguagePicker />
      <div className="guest-welcome">
        <Pill>{t.shared}</Pill>
        <h1>{t.welcome.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h1>
        <p>{t.intro.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</p>
      </div>
      <RouteArt />
      <Card>
        <h2>{trip.title}</h2>
        <p>
          <Bus size={16} />
          {trip.company ?? s.users.find((u) => u.id === trip.ownerId)?.name}
        </p>
        <small>
          {trip.plate ?? 'Chuyến cá nhân'} · Khởi hành {clock(trip.stops[0].arrivalAt)}
        </small>
      </Card>
      <Card>
        <h2>{t.name}</h2>
        <p>Thông tin giúp cửa hàng chuẩn bị và bàn giao đúng món cho bạn.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return notify('Vui lòng nhập họ tên của bạn.');
            s.setGuest(name.trim(), phone.trim());
            navigate(`${base}/journey${new URLSearchParams(location.search).get('guide') === '1' ? '?guide=1' : ''}`);
          }}
        >
          <label>
            Họ tên <span className="required">*</span>
            <input
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập họ tên của bạn"
            />
          </label>
          <label>
            Số điện thoại <small>(không bắt buộc)</small>
            <input
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Để cửa hàng dễ liên hệ"
            />
          </label>
          <button className="button full">
            {t.next} <ArrowRight size={18} />
          </button>
        </form>
        <p className="fine-print center">Không cần tài khoản hoặc tải ứng dụng.</p>
        {!new URLSearchParams(location.search).get('guide') && <Link className="text-link" to={`${base}?guide=1`}>Hướng dẫn trải nghiệm trên điện thoại <ArrowRight size={16} /></Link>}
        <TextLink to={`/app/login?next=${encodeURIComponent(`/app/trips/${trip.id}`)}`}>
          Đã có tài khoản? Đăng nhập
        </TextLink>
      </Card>
    </>
  );
}
export function GuestJourney() {
  const { data: s, trip, base } = useTripContext();
  if (!trip) return <Missing />;
  if (!s.guest) return <Navigate to={base} replace />;
  const stop = currentStop(trip);
  const arrived = trip.status === 'AT_STATION';
  const orders = s.orders.filter((o) => o.guestSessionId === s.guest?.id && o.tripId === trip.id);
  const t = copy[s.guestLanguage];
  return (
    <>
      <Back title="Hành trình của bạn" to={base} />
      <LanguagePicker />
      <div className="trip-heading">
        <Pill tone={arrived ? 'green' : 'blue'}>
          {arrived ? 'Xe đã đến trạm' : 'Đang trên đường'}
        </Pill>
        <h1>{trip.title}</h1>
        <p>
          {trip.company ?? 'Chuyến được chia sẻ'} · {trip.plate ?? 'Chuyến cá nhân'}
        </p>
        <small>Tài xế: {s.users.find((u) => u.id === trip.ownerId)?.name}</small>
      </div>
      <RouteArt
        arrived={arrived}
        progress={segmentProgress(trip, s.demoTime)}
        origin={trip.origin}
        destination={stop.name.replace('Trạm Việt ', '')}
      />
      <Card className="next-station-card">
        <div className="row">
          <span className="eyebrow">{arrived ? 'ĐANG DỪNG TẠI' : t.nextStop}</span>
          <Pill>{arrived ? 'Đã đến' : `Còn ${etaMinutes(s.demoTime, stop.arrivalAt)} phút`}</Pill>
        </div>
        <h2>{stop.name}</h2>
        <p>
          <MapPin size={16} />
          Dự kiến {clock(stop.arrivalAt)} · Nghỉ {stop.restMinutes} phút
        </p>
        {stop.stationId && (
          <Link className="button full" to={`${base}/station/${stop.stationId}`}>
            {t.stop} <ArrowRight size={17} />
          </Link>
        )}
      </Card>
      <div className="section-heading">
        <h2>{t.guide}</h2>
      </div>
      <Card>
        <Timeline trip={trip} />
      </Card>
      {orders.length > 0 && (
        <Card>
          <h2>Đơn của {s.guest.name}</h2>
          {orders.map((o) => (
            <TextLink key={o.id} to={`${base}/orders/${o.id}`}>
              {o.publicOrderCode} · Theo dõi nhận món
            </TextLink>
          ))}
        </Card>
      )}
      <Link className="button secondary full" to={`${base}/lookup`}>
        Tra cứu bằng mã đơn
      </Link>
    </>
  );
}
