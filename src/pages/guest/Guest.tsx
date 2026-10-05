import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
export function GuestLanding() {
  const { data: s, trip, base } = useTripContext();
  const [name, setName] = useState(s.guest?.name ?? '');
  const [phone, setPhone] = useState(s.guest?.phone ?? '');
  const navigate = useNavigate();
  if (!trip) return <Missing />;
  if (s.appInstalled) return <Navigate to={`/app/trips/${trip.id}`} replace />;
  return (
    <>
      <div className="public-address">
        <Globe size={14} />
        {window.location.host}
        {base}
      </div>
      <div className="guest-welcome">
        <Pill>Hành trình được chia sẻ</Pill>
        <h1>
          Chào bạn,
          <br />
          cùng đi thật thảnh thơi.
        </h1>
        <p>
          Xem hành trình và đặt món trước,
          <br />
          sẵn sàng khi xe đến trạm.
        </p>
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
        <h2>Bạn muốn được gọi là gì?</h2>
        <p>Thông tin giúp cửa hàng chuẩn bị và bàn giao đúng món cho bạn.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!name.trim()) return notify('Vui lòng nhập họ tên của bạn.');
            s.setGuest(name.trim(), phone.trim());
            navigate(`${base}/journey`);
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
            Tiếp tục xem hành trình <ArrowRight size={18} />
          </button>
        </form>
        <p className="fine-print center">Không cần tài khoản hoặc tải ứng dụng.</p>
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
  return (
    <>
      <Back title="Hành trình của bạn" to={base} />
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
          <span className="eyebrow">{arrived ? 'ĐANG DỪNG TẠI' : 'ĐIỂM DỪNG TIẾP THEO'}</span>
          <Pill>{arrived ? 'Đã đến' : `Còn ${etaMinutes(s.demoTime, stop.arrivalAt)} phút`}</Pill>
        </div>
        <h2>{stop.name}</h2>
        <p>
          <MapPin size={16} />
          Dự kiến {clock(stop.arrivalAt)} · Nghỉ {stop.restMinutes} phút
        </p>
        {stop.stationId && (
          <Link className="button full" to={`${base}/station/${stop.stationId}`}>
            Xem trạm dừng <ArrowRight size={17} />
          </Link>
        )}
      </Card>
      <div className="section-heading">
        <h2>Sổ tay hành trình</h2>
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
