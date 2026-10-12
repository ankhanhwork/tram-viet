import { useEffect, useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bus,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Map,
  MapPin,
  Navigation,
  Plus,
  QrCode,
  Share2,
  ShoppingBag,
  Users,
} from 'lucide-react';
import QRCode from 'qrcode';
import {
  Back,
  Card,
  Empty,
  Missing,
  Modal,
  Pill,
  RouteArt,
  TextLink,
  Timeline,
  Title,
  notify,
} from '../../components/ui';

import { useDemoStore } from '../../store/useDemoStore';
import {
  clock,
  currentStop,
  dateLabel,
  etaMinutes,
  metrics,
  money,
  segmentProgress,
} from '../../lib/rules';
import { useTripContext } from '../../lib/hooks';
import type { User } from '../../types';
const roleLabels: Record<User['role'], string> = {
  traveler: 'Đi du lịch / di chuyển cá nhân',
  car: 'Tài xế tự do / xe cá nhân',
  truck: 'Tài xế xe tải',
  coach: 'Tài xế xe du lịch / xe khách',
};
export function TravelHome() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const user = s.users.find((u) => u.id === s.currentUserId)!;
  const [homeTab, setHomeTab] = useState<'plan' | 'nearby'>('plan');
  const [origin, setOrigin] = useState('Hà Nội');
  const [destination, setDestination] = useState('Đồng Hới · Quảng Bình');
  const defaultDate = new Date(Date.parse(s.demoTime) + 7 * 3600000)
    .toISOString()
    .slice(0, 10);
  const [departureDate, setDepartureDate] = useState(defaultDate);
  const trip = s.trips.find(
    (t) => (t.ownerId === user.id || t.members.includes(user.id)) && t.status !== 'ARRIVED',
  );
  const suggestedStation = s.stations.find((station) => station.id === 'station-ninh-binh');
  const stationTrip = suggestedStation
    ? s.trips.find((t) => t.stops.some((stop) => stop.stationId === suggestedStation.id))
    : undefined;
  const stationDistance = '2,1 km';

  function startPlanning(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new URLSearchParams({
      mode: 'manual',
      from: origin.trim(),
      to: destination.trim(),
      date: departureDate,
    });
    navigate(`/app/trips/new?${query.toString()}`);
  }

  return (
    <>
      <div className="welcome home-welcome">
        <div>
          <p>Xin chào,</p>
          <h1>{user.name}</h1>
          <span>Chúc bạn có một hành trình an toàn!</span>
        </div>
        <Link className="home-avatar" to="/app/profile" aria-label="Mở hồ sơ">
          {user.name.split(' ').at(-1)?.slice(0, 1)}
        </Link>
      </div>
      <Card className="home-planner">
        <div className="home-tabs" role="tablist" aria-label="Tìm hành trình hoặc trạm">
          <button
            type="button"
            role="tab"
            aria-selected={homeTab === 'plan'}
            className={homeTab === 'plan' ? 'active' : ''}
            onClick={() => setHomeTab('plan')}
          >
            <MapPin size={18} /> Lên lịch trình
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={homeTab === 'nearby'}
            className={homeTab === 'nearby' ? 'active' : ''}
            onClick={() => setHomeTab('nearby')}
          >
            <Map size={18} /> Tìm trạm gần bạn
          </button>
        </div>
        {homeTab === 'plan' ? (
          <form className="home-plan-form" onSubmit={startPlanning}>
            <label className="home-route-input">
              <span>Từ</span>
              <i className="home-route-dot origin-dot" aria-hidden="true" />
              <input
                required
                aria-label="Điểm xuất phát"
                value={origin}
                onChange={(event) => setOrigin(event.target.value)}
                placeholder="Điểm xuất phát"
              />
              <button
                type="button"
                className="home-swap"
                aria-label="Đổi điểm đi và điểm đến"
                onClick={() => {
                  setOrigin(destination);
                  setDestination(origin);
                }}
              >
                ↕
              </button>
            </label>
            <label className="home-route-input">
              <span>Đến</span>
              <i className="home-route-dot destination-dot" aria-hidden="true" />
              <input
                required
                aria-label="Điểm đến"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Điểm đến"
              />
              <span className="home-route-spacer" />
            </label>
            <label className="home-date-input">
              <span>Ngày đi</span>
              <CalendarDays size={18} />
              <input
                aria-label="Ngày khởi hành"
                type="date"
                required
                value={departureDate}
                onChange={(event) => setDepartureDate(event.target.value)}
              />
            </label>
            <button className="button full home-plan-submit">
              Lên lịch trình <ArrowRight size={18} />
            </button>
          </form>
        ) : (
          <div className="home-nearby-panel">
            <div className="home-demo-location">
              <Navigation size={17} />
              <span>
                Vị trí mô phỏng <strong>Ninh Bình</strong>
              </span>
              <Pill>Demo</Pill>
            </div>
            {suggestedStation && (
              <Link
                className="home-station-card"
                to={stationTrip ? `/app/trips/${stationTrip.id}/station/${suggestedStation.id}` : '/app/trips/new'}
              >
                <img src="/images/station-ninh-binh.webp" alt="Trạm Việt Ninh Bình" />
                <div className="home-station-copy">
                  <strong>{suggestedStation.name}</strong>
                  <small>{stationDistance} · {suggestedStation.address}</small>
                  <span className="home-facilities">Ẩm thực · WC · Nghỉ ngơi · Mua sắm</span>
                </div>
                <ChevronRight size={19} />
              </Link>
            )}
            <p className="home-demo-note">Khoảng cách minh họa; ứng dụng không truy cập GPS.</p>
          </div>
        )}
      </Card>

      <div className="section-heading home-section-heading">
        <h2>{trip ? 'Chuyến đi đang diễn ra' : 'Hành trình của bạn'}</h2>
        <TextLink to="/app/trips">Xem tất cả <ChevronRight size={15} /></TextLink>
      </div>
      {trip ? (
        <Link className="card home-live-trip" to={`/app/trips/${trip.id}`}>
          <div className="home-live-topline">
            <span className="home-company-mark">{trip.company?.slice(0, 2).toUpperCase() ?? 'TV'}</span>
            <div className="home-live-company">
              <strong>{trip.company ?? user.name}</strong>
              <small>{trip.origin} → {trip.destination}</small>
            </div>
            <Pill tone={trip.status === 'READY' ? 'blue' : 'green'}>
              {trip.status === 'READY' ? 'Sắp khởi hành' : 'Đang di chuyển'}
            </Pill>
          </div>
          <div className="home-route-progress" aria-label={`Hành trình ${trip.origin} đến ${trip.destination}`}>
            <span className="progress-origin"><i /></span>
            <span className="progress-current"><Bus size={13} /></span>
            <span className="progress-destination"><i /></span>
          </div>
          <div className="home-route-labels">
            <span>{trip.origin}<small>Đã khởi hành</small></span>
            <span className="home-next-stop">
              {trip.stops.find((stop) => stop.stationId)?.name.replace('Trạm Việt ', '') ?? trip.destination}
              <small>Điểm dừng tiếp theo</small>
            </span>
            <span>{trip.destination}<small>Dự kiến</small></span>
          </div>
          <div className="home-trip-footer">
            <span><MapPin size={17} /> {trip.stops.find((stop) => stop.stationId)?.name ?? trip.destination}</span>
            <strong>{trip.plate ?? 'Chuyến cá nhân'}</strong>
            <ChevronRight size={18} />
          </div>
        </Link>
      ) : (
        <Card className="home-empty-trip">
          <div className="home-empty-icon"><Bus size={22} /></div>
          <div>
            <h3>Chưa có chuyến đi đang diễn ra</h3>
            <p>Tạo hành trình mới hoặc tham gia chuyến được chia sẻ.</p>
          </div>
          <Link className="home-inline-link" to="/app/trips">Xem chuyến đi <ChevronRight size={15} /></Link>
        </Card>
      )}

      <div className="section-heading home-section-heading">
        <h2>Tiện ích nhanh</h2>
      </div>
      <div className="quick-actions">
        <Link to="/app/trips/new?mode=manual">
          <Plus />
          Tạo chuyến
        </Link>
        <Link to="/app/trips/join">
          <Users />
          Tham gia
        </Link>
        <Link to={trip ? `/app/trips/${trip.id}/share` : '/app/trips'}>
          <QrCode />
          QR chuyến đi
        </Link>
        <Link to="/app/orders">
          <ShoppingBag />
          Đơn hàng
        </Link>
      </div>
      {suggestedStation && (
        <>
          <div className="section-heading home-section-heading home-station-heading">
            <h2>Trạm gợi ý cho bạn</h2>
            <button className="link-button" onClick={() => setHomeTab('nearby')}>
              Xem thêm <ChevronRight size={15} />
            </button>
          </div>
          <Link
            className="card home-featured-station"
            to={stationTrip ? `/app/trips/${stationTrip.id}/station/${suggestedStation.id}` : '/app/trips/new'}
          >
            <img src="/images/station-ninh-binh.webp" alt="Trạm Việt Ninh Bình" />
            <div>
              <strong>{suggestedStation.name}</strong>
              <small>{stationDistance} · {suggestedStation.address}</small>
              <span className="home-rating"><span aria-hidden="true">★</span> 4.8 <small>(320 đánh giá)</small></span>
            </div>
            <ChevronRight size={19} />
          </Link>
        </>
      )}
    </>
  );
}
export function MyTrips() {
  const s = useDemoStore();
  const [tab, setTab] = useState('current');
  const mine = s.trips.filter(
    (t) => t.ownerId === s.currentUserId || t.members.includes(s.currentUserId),
  );
  const filtered = mine.filter((t) =>
    tab === 'current'
      ? !['READY', 'ARRIVED'].includes(t.status)
      : tab === 'upcoming'
        ? t.status === 'READY'
        : t.status === 'ARRIVED',
  );
  return (
    <>
      <Title
        title="Chuyến đi của tôi"
        description="Những hành trình bạn tạo và cùng tham gia."
        action={
          <Link className="icon-button" to="/app/trips/new" aria-label="Tạo chuyến">
            <Plus />
          </Link>
        }
      />
      <Link className="button secondary full" to="/app/trips/new?mode=import">
        Nhập lịch trình · Ảnh, PDF hoặc văn bản <Plus size={17} />
      </Link>
      <div className="tabs">
        {[
          ['current', 'Đang đi'],
          ['upcoming', 'Sắp tới'],
          ['past', 'Đã đi'],
        ].map(([id, label]) => (
          <button className={tab === id ? 'active' : ''} key={id} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>
      {filtered.map((t) => (
        <Link className="card trip-list-card" key={t.id} to={`/app/trips/${t.id}`}>
          <div>
            <Pill>{t.ownerId === s.currentUserId ? 'Bạn tạo' : 'Được chia sẻ'}</Pill>
            {t.partnerTrip && <Pill tone="green">Chuyến đối tác</Pill>}
          </div>
          <h2>{t.title}</h2>
          <p>{t.company ?? s.users.find((u) => u.id === t.ownerId)?.name}</p>
          <div className="row">
            <span>
              <Clock size={15} />
              {dateLabel(t.stops[0].arrivalAt)}
            </span>
            <ArrowRight size={18} />
          </div>
        </Link>
      ))}
      {!filtered.length && (
        <Empty
          title="Chưa có chuyến ở mục này"
          description="Lên lịch cho hành trình tiếp theo hoặc tham gia chuyến được chia sẻ."
          action={
            <Link className="button" to="/app/trips/new">
              Tạo chuyến mới
            </Link>
          }
        />
      )}
      <Link className="button secondary full" to="/app/trips/join">
        Tham gia bằng mã chuyến
      </Link>
    </>
  );
}
export function JoinTrip() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const [code, setCode] = useState('HN-QB-A8K29');
  return (
    <>
      <Back title="Tham gia chuyến đi" to="/app/trips" />
      <Card>
        <h2>Cùng nhau trên một hành trình</h2>
        <p>Nhập mã được chủ chuyến chia sẻ để lưu chuyến vào danh sách của bạn.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const trip = s.trips.find((t) => t.publicTripCode === code.trim().toUpperCase());
            if (!trip) return notify('Mã chuyến chưa đúng.');
            s.joinTrip(trip.id);
            notify('Đã lưu chuyến vào Chuyến đi của tôi.');
            navigate(`/app/trips/${trip.id}`);
          }}
        >
          <label>
            Mã chuyến
            <input required value={code} onChange={(e) => setCode(e.target.value)} />
          </label>
          <button className="button full">Xem và tham gia chuyến</button>
        </form>
      </Card>
    </>
  );
}
export function TripDetail({ live = false }: { live?: boolean }) {
  const { data: s, trip, base } = useTripContext();
  const [checkIn, setCheckIn] = useState(false);
  if (!trip) return <Missing />;
  const owner = s.users.find((u) => u.id === trip.ownerId);
  const own = trip.ownerId === s.currentUserId;
  const stop = currentStop(trip);
  const m = metrics(s.merchantOrders.filter((p) => p.tripId === trip.id));
  const arrived = trip.status === 'AT_STATION';
  const resting = stop.checkedInAt
    ? Math.max(
        0,
        stop.restMinutes -
          Math.floor((Date.parse(s.demoTime) - Date.parse(stop.checkedInAt)) / 60000),
      )
    : 0;
  return (
    <>
      <Back
        title={live ? 'Hành trình trực tiếp' : 'Chi tiết chuyến đi'}
        to={live ? base : '/app/trips'}
      />
      <div className="trip-heading">
        <Pill tone={arrived ? 'green' : 'blue'}>
          {arrived
            ? 'Đã check-in tại trạm'
            : trip.status === 'READY'
              ? 'Sẵn sàng khởi hành'
              : trip.status === 'ARRIVED'
                ? 'Đã đến nơi'
                : 'Đang trên đường'}
        </Pill>
        <h1>{trip.title}</h1>
        <p>
          {owner?.name} · {trip.company ?? 'Chuyến cá nhân'}
        </p>
        <small>
          {trip.plate ?? 'Không có biển số'} · {trip.passengerCount} người
        </small>
      </div>
      <RouteArt
        arrived={arrived}
        progress={segmentProgress(trip, s.demoTime)}
        origin={trip.origin}
        destination={stop.name.replace('Trạm Việt ', '')}
      />
      <div className="section-heading">
        <h2>Lịch trình chuyến đi</h2>
      </div>
      <Card>
        <Timeline trip={trip} />
      </Card>
      <Card className="next-station-card">
        <div className="row">
          <span className="eyebrow">{arrived ? 'XE ĐÃ ĐẾN' : 'ĐIỂM DỪNG TIẾP THEO'}</span>
          <Pill tone={arrived ? 'green' : 'blue'}>
            {arrived
              ? `Nghỉ còn ${resting} phút`
              : `Còn ${etaMinutes(s.demoTime, stop.arrivalAt)} phút`}
          </Pill>
        </div>
        <h2>{stop.name}</h2>
        <p>
          Dự kiến {clock(stop.arrivalAt)} · Nghỉ {stop.restMinutes} phút
        </p>
        {stop.stationId && (
          <Link className="button full" to={`${base}/station/${stop.stationId}`}>
            Xem trạm & đặt trước <ShoppingBag size={17} />
          </Link>
        )}
        {own && ['EN_ROUTE', 'APPROACHING_STATION'].includes(trip.status) && stop.stationId && (
          <button className="button secondary full" onClick={() => setCheckIn(true)}>
            Check-in tại trạm <MapPin size={17} />
          </button>
        )}
        {own && arrived && (
          <button
            className="button secondary full"
            onClick={() => {
              s.setTripStatus(trip.id, 'DEPARTED_STATION');
              notify('Đã rời trạm. Hành trình tiếp tục.');
            }}
          >
            Tiếp tục hành trình
          </button>
        )}
        {own && trip.status === 'READY' && (
          <button
            className="button full"
            onClick={() => {
              s.setTripStatus(trip.id, 'EN_ROUTE');
              notify('Chuyến đi đã khởi hành.');
            }}
          >
            Bắt đầu chuyến đi
          </button>
        )}
      </Card>
      {!live && (
        <div className="action-row">
          <Link className="button secondary" to={`${base}/live`}>
            <Bus size={17} />
            Trực tiếp
          </Link>
          <Link className="button secondary" to={`${base}/share`}>
            <Share2 size={17} />
            Chia sẻ
          </Link>
          {own && (
            <Link className="button secondary" to={`${base}/edit`}>
              Sửa lịch
            </Link>
          )}
        </div>
      )}
      {own && (
        <Card className="blue-card">
          <span className="eyebrow">ĐƠN KHÁCH TRÊN XE</span>
          <div className="mini-metrics">
            <div>
              <strong>{m.customers}</strong>
              <small>Đơn khách</small>
            </div>
            <div>
              <strong>{money(m.total)}</strong>
              <small>Giá trị đặt trước</small>
            </div>
          </div>
          <p className="fine-print">Tổng giá trị giúp bạn theo dõi nhu cầu hành khách trong chuyến.</p>
        </Card>
      )}
      {!own && (
        <button
          className="link-button full"
          onClick={() => {
            const joined = trip.members.includes(s.currentUserId);
            s.joinTrip(trip.id, joined);
            notify(joined ? 'Đã rời chuyến.' : 'Đã lưu chuyến.');
          }}
        >
          {trip.members.includes(s.currentUserId)
            ? 'Rời chuyến đã lưu'
            : 'Lưu chuyến vào Chuyến đi của tôi'}
        </button>
      )}
      {checkIn && (
        <Modal title="Xác nhận xe đã đến trạm" close={() => setCheckIn(false)}>
          <p>Chỉ xác nhận khi bạn đã đến đúng điểm dừng.</p>
          <Card>
            <h3>{stop.name}</h3>
            <p>
              {trip.company ?? owner?.name} · {trip.plate ?? 'Chuyến cá nhân'}
            </p>
            <p>{trip.title}</p>
          </Card>
          <button
            className="button full"
            onClick={() => {
              const error = s.checkIn(trip.id, stop.stationId!);
              notify(error ?? 'Check-in thành công. Cửa hàng đã có thể bàn giao món sẵn sàng.');
              setCheckIn(false);
            }}
          >
            Tôi đã đến trạm <Check size={17} />
          </button>
        </Modal>
      )}
    </>
  );
}
export function ShareTrip() {
  const { trip, base } = useTripContext();
  const [qr, setQr] = useState('');
  const url = trip ? `${window.location.origin}/t/${trip.publicTripCode}?guide=1` : '';
  useEffect(() => {
    let active = true;
    if (url)
      void QRCode.toDataURL(url, {
        width: 260,
        margin: 2,
        color: { dark: '#102a43', light: '#ffffff' },
      })
        .then((value) => {
          if (active) setQr(value);
        })
        .catch(() => notify('Không tạo được QR. Bạn vẫn có thể dùng link chuyến.'));
    return () => {
      active = false;
    };
  }, [url]);
  if (!trip) return <Missing />;
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      notify('Đã sao chép link hành trình.');
    } catch {
      notify('Chọn và sao chép đường dẫn bên dưới.');
    }
  }
  return (
    <>
      <Back title="Chia sẻ hành trình" to={base} />
      <Card className="share-card">
        <Pill>Khách trên xe</Pill>
        <h2>
          Xem hành trình
          <br />
          và đặt món trước
        </h2>
        <p>
          {trip.title} · {trip.company ?? 'Trạm Việt'}
        </p>
        {qr ? (
          <img className="qr-image" src={qr} alt={`QR mở hành trình ${trip.title}`} />
        ) : (
          <p>Đang tạo mã QR…</p>
        )}
        <p>
          Quét QR bằng camera điện thoại.
          <br />
          Không cần tải app hoặc đăng nhập.
        </p>
        <label className="sr-only" htmlFor="share-url">
          Link công khai
        </label>
        <input id="share-url" readOnly value={url} onFocus={(e) => e.target.select()} />
        <button className="button full" onClick={() => void copy()}>
          <Copy size={17} />
          Sao chép link
        </button>
        <button
          className="button secondary full"
          onClick={() => {
            if (navigator.share)
              void navigator
                .share({ title: trip.title, text: 'Xem hành trình và đặt món trước', url })
                .catch(() => {});
            else void copy();
          }}
        >
          <Share2 size={17} />
          Chia sẻ
        </button>
        <Link className="text-link center" to={`/t/${trip.publicTripCode}?guide=1`}>
          Trải nghiệm như hành khách <ArrowRight size={16} />
        </Link>
      </Card>
    </>
  );
}
export { TripPlanner as TripEditor } from '../../features/trips/TripPlanner';
export function TravelLogin({ register = false }: { register?: boolean }) {
  const s = useDemoStore();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [email, setEmail] = useState(register ? '' : 'minh@demo.vn');
  const [name, setName] = useState('');
  const [role, setRole] = useState<User['role']>('traveler');
  const [partner, setPartner] = useState(false);
  const [company, setCompany] = useState('');
  const [plate, setPlate] = useState('');
  const next = search.get('next');
  const redirect = next?.startsWith('/app/') ? next : '/app';
  return (
    <>
      <Back title={register ? 'Tạo tài khoản' : 'Đăng nhập Travel App'} to="/" />
      <Card>
        <h2>{register ? 'Hành trình bắt đầu từ bạn' : 'Chào mừng trở lại'}</h2>
        <p>Đăng nhập để lưu và chia sẻ hành trình.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (register) {
              if (!name.trim()) return notify('Vui lòng nhập họ tên.');
              if (s.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase()))
                return notify('Email đã có tài khoản. Hãy đăng nhập hoặc dùng email khác.');
              s.saveUser({
                id: crypto.randomUUID(),
                name: name.trim(),
                email: email.trim(),
                role,
                partnerStatus: role === 'coach' && partner ? 'pending' : 'none',
                company,
                plate,
              });
              notify('Hồ sơ đã được tạo.');
            } else {
              const user = s.users.find((u) => u.email === email.trim());
              if (!user)
                return notify(
                  'Không tìm thấy tài khoản. Hãy tạo tài khoản hoặc dùng minh@demo.vn.',
                );
              s.setUser(user.id);
            }
            navigate(redirect);
          }}
        >
          {register && (
            <label>
              Họ tên
              <input required value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          )}
          <label>
            Email
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Mật khẩu
            <input type="password" required defaultValue="demo123" minLength={6} />
          </label>
          {register && (
            <>
              <label>
                Bạn thường sử dụng Trạm Việt theo hình thức nào?
                <select value={role} onChange={(e) => setRole(e.target.value as User['role'])}>
                  {Object.entries(roleLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              {role === 'coach' && (
                <>
                  <label>
                    Nhà xe / công ty
                    <input value={company} onChange={(e) => setCompany(e.target.value)} />
                  </label>
                  <label>
                    Biển số
                    <input value={plate} onChange={(e) => setPlate(e.target.value)} />
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={partner}
                      onChange={(e) => setPartner(e.target.checked)}
                    />
                    Đăng ký chương trình đối tác
                  </label>
                </>
              )}
            </>
          )}
          <button className="button full">{register ? 'Hoàn tất hồ sơ' : 'Đăng nhập'}</button>
        </form>
        <Link
          className="text-link center"
          to={
            register
              ? `/app/login${next ? `?next=${encodeURIComponent(next)}` : ''}`
              : `/app/register${next ? `?next=${encodeURIComponent(next)}` : ''}`
          }
        >
          {register ? 'Đã có tài khoản? Đăng nhập' : 'Tạo tài khoản mới'}
        </Link>
      </Card>
    </>
  );
}
export function Profile({ partner = false }: { partner?: boolean }) {
  const s = useDemoStore();
  const u = s.users.find((u) => u.id === s.currentUserId)!;
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(u.name);
  const [company, setCompany] = useState(u.company ?? '');
  const [plate, setPlate] = useState(u.plate ?? '');
  return (
    <>
      <Title title={partner ? 'Hồ sơ đối tác' : 'Hồ sơ của tôi'} />
      <Card className="profile-card">
        <span className="avatar large">{u.name.split(' ').at(-1)?.[0]}</span>
        <h2>{u.name}</h2>
        <p>{roleLabels[u.role]}</p>
        {u.partnerStatus === 'approved' && <Pill tone="green">Đối tác đã được duyệt</Pill>}
        {u.partnerStatus === 'pending' && <Pill tone="amber">Hồ sơ đối tác đang chờ duyệt</Pill>}
        <button className="button secondary" onClick={() => setEdit(true)}>
          Chỉnh sửa hồ sơ
        </button>
      </Card>
      {partner ? (
        <Card>
          <h2>Thông tin hợp tác</h2>
          <dl className="details-list">
            <div>
              <dt>Nhà xe</dt>
              <dd>{u.company || 'Chưa cập nhật'}</dd>
            </div>
            <div>
              <dt>Biển số</dt>
              <dd>{u.plate || 'Chưa cập nhật'}</dd>
            </div>
            <div>
              <dt>Trạng thái</dt>
              <dd>
                {u.partnerStatus === 'approved'
                  ? 'Đã duyệt'
                  : u.partnerStatus === 'pending'
                    ? 'Chờ duyệt'
                    : 'Chưa đăng ký'}
              </dd>
            </div>
          </dl>
          {u.partnerStatus === 'approved' ? (
            <>
              <p className="success-text">
                <Check size={17} />
                Thông tin tài xế, nhà xe và phương tiện đã xác minh.
              </p>
              <p className="success-text"><Check size={17} />Thông tin nhà xe và phương tiện đã xác minh.</p>
            </>
          ) : u.role === 'coach' && u.partnerStatus === 'none' ? (
            <button
              className="button full"
              onClick={() => {
                s.saveUser({ ...u, partnerStatus: 'pending' });
                notify('Đã gửi hồ sơ. Chờ trạm duyệt.');
              }}
            >
              Gửi đăng ký đối tác
            </button>
          ) : (
            <p>
              {u.partnerStatus === 'pending'
                ? 'Quản lý trạm có thể duyệt hồ sơ trong mục Đối tác.'
                : 'Chương trình dành cho tài xế xe du lịch / xe khách.'}
            </p>
          )}
        </Card>
      ) : (
        <>
          <Card>
            <div className="mini-metrics">
              <div>
                <strong>{s.trips.filter((t) => t.ownerId === u.id).length}</strong>
                <small>Chuyến đã tạo</small>
              </div>
              <div>
                <strong>{s.trips.filter((t) => t.members.includes(u.id)).length}</strong>
                <small>Chuyến đã tham gia</small>
              </div>
            </div>
            <TextLink to="/app/orders">Lịch sử đơn hàng</TextLink>
          </Card>
          {(u.role === 'coach' || u.partnerStatus === 'approved') && (
            <Card className="blue-card">
              <h2>
                {u.partnerStatus === 'approved'
                  ? 'Đối tác Trạm Việt'
                  : 'Cùng phát triển hành trình'}
              </h2>
              <p>
                {u.partnerStatus === 'approved'
                  ? 'Theo dõi hồ sơ hợp tác, nhà xe và phương tiện của bạn.'
                  : 'Đăng ký hợp tác để trạm xác minh nhà xe và phương tiện.'}
              </p>
              <TextLink to="/app/partner">
                {u.partnerStatus === 'approved' ? 'Xem hồ sơ đối tác' : 'Chương trình đối tác'}
              </TextLink>
            </Card>
          )}
          <Link className="button secondary full" to="/app/login">
            Đổi tài khoản / đăng nhập
          </Link>
        </>
      )}
      {edit && (
        <Modal title="Chỉnh sửa hồ sơ" close={() => setEdit(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              s.saveUser({ ...u, name: name.trim(), company, plate });
              setEdit(false);
              notify('Đã lưu hồ sơ.');
            }}
          >
            <label>
              Họ tên
              <input required value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            {u.role !== 'traveler' && (
              <>
                <label>
                  Nhà xe
                  <input value={company} onChange={(e) => setCompany(e.target.value)} />
                </label>
                <label>
                  Biển số
                  <input value={plate} onChange={(e) => setPlate(e.target.value)} />
                </label>
              </>
            )}
            <button className="button full">Lưu thay đổi</button>
          </form>
        </Modal>
      )}
    </>
  );
}
export function Earnings() {
  return <Navigate to="/app/profile" replace />;
}
