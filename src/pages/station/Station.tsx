import { useState } from 'react';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { ArrowRight, Bus, Camera, ClipboardList, MapPin, Store, Users, Wallet } from 'lucide-react';
import {
  Brand,
  Card,
  Metric,
  Missing,
  Modal,
  Pill,
  Status,
  TextLink,
  Title,
  notify,
} from '../../components/ui';
import { MAIN_STATION } from '../../demo/data';
import { useDemoStore } from '../../store/useDemoStore';
import {
  clock,
  commission,
  dateLabel,
  etaMinutes,
  metrics,
  money,
  orderLabel,
  preparation,
  statusLabels,
} from '../../lib/rules';
import type { MerchantOrder, Trip } from '../../types';
export function StationLogin() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const location = useLocation();
  if (s.stationLoggedIn) return <Navigate to="/station" replace />;
  return (
    <div className="station-login">
      <div className="station-login-story">
        <Brand />
        <span className="eyebrow">STATION PORTAL</span>
        <h1>
          Biết trước nhu cầu.
          <br />
          Sẵn sàng đón khách.
        </h1>
        <p>Một góc nhìn xuyên suốt về xe sắp đến, đơn đặt trước và hiệu quả kinh doanh tại trạm.</p>
        <div className="login-route">
          <Bus size={36} />
          <span>Hà Nội</span>
          <span className="route-line" />
          <MapPin size={30} />
          <span>Ninh Bình</span>
        </div>
      </div>
      <div className="station-login-form">
        <Card>
          <Pill>Không gian quản lý trạm</Pill>
          <h1>Chào mừng trở lại</h1>
          <p>
            Trạm Việt Ninh Bình
            <br />
            Nguyễn Thanh Tùng · Quản lý trạm
          </p>
          <button
            className="button full"
            onClick={() => {
              s.loginStation();
              const from = (location.state as { from?: string } | null)?.from;
              navigate(
                from?.startsWith('/station') && from !== '/station/login' ? from : '/station',
              );
            }}
          >
            Vào quản lý trạm <ArrowRight size={18} />
          </button>
          <p className="fine-print">Theo dõi hoạt động tại trạm, các chuyến đến và cửa hàng này.</p>
          <TextLink to="/">Quay về các giao diện</TextLink>
        </Card>
      </div>
    </div>
  );
}
function stationParts(parts: MerchantOrder[]) {
  return parts.filter((p) => p.stationId === MAIN_STATION);
}
function VehicleState({ trip }: { trip: Trip }) {
  return (
    <Pill
      tone={
        trip.status === 'AT_STATION'
          ? 'green'
          : trip.status === 'DEPARTED_STATION' || trip.status === 'ARRIVED'
            ? 'gray'
            : 'blue'
      }
    >
      {trip.status === 'AT_STATION'
        ? 'Tài xế đã check-in'
        : trip.status === 'DEPARTED_STATION'
          ? 'Đã rời trạm'
          : trip.status === 'ARRIVED'
            ? 'Đã đến nơi'
            : trip.status === 'READY'
              ? 'Chưa khởi hành'
              : 'Sắp đến'}
    </Pill>
  );
}
export function StationOverview() {
  const s = useDemoStore();
  const parts = stationParts(s.merchantOrders);
  const m = metrics(parts);
  const trips = s.trips.filter((t) => t.stops.some((stop) => stop.stationId === MAIN_STATION));
  const incoming = trips.filter(
    (t) =>
      ['EN_ROUTE', 'APPROACHING_STATION'].includes(t.status) &&
      etaMinutes(s.demoTime, t.stops.find((stop) => stop.stationId === MAIN_STATION)!.arrivalAt) <=
        120,
  );
  const completedRatio = m.total ? (m.completed / m.total) * 100 : 0;
  return (
    <>
      <Title
        title="Chào mừng bạn trở lại!"
        description="Cùng vận hành trạm hiệu quả, phục vụ hành khách tốt hơn mỗi ngày."
        action={
          <span className="date-chip">
            {dateLabel(s.demoTime)} · {clock(s.demoTime)}
          </span>
        }
      />
      <div className="station-kpis">
        <Metric icon={<Bus />} label="Xe sắp đến trong 2 giờ" value={incoming.length} />
        <Metric
          icon={<Users />}
          label="Hành khách dự kiến"
          value={incoming.reduce((sum, t) => sum + t.passengerCount, 0)}
        />
        <Metric
          icon={<ClipboardList />}
          label="Đơn khách đặt trước"
          value={m.customers}
          detail={`${m.portions} phần đơn quầy`}
        />
        <Metric
          icon={<Wallet />}
          label="Tổng giá trị đặt trước"
          value={money(m.total)}
          detail="Đang chờ + đã bàn giao"
        />
      </div>
      <div className="station-feature-grid">
        <Card className="demand-card">
          <div className="row">
            <div>
              <span className="eyebrow">NHÌN THẤY NHU CẦU TRƯỚC KHI XE TỚI</span>
              <h2>Chủ động chuẩn bị, đón khách thảnh thơi.</h2>
            </div>
            <Bus size={35} />
          </div>
          <h1>{money(m.pending)}</h1>
          <p>Giá trị đặt trước đang chờ bàn giao</p>
          <div className="demand-bottom">
            <div>
              <strong>{m.ready}</strong>
              <span>phần đơn sẵn sàng</span>
            </div>
            <div>
              <strong>{parts.filter((p) => p.status === 'PREPARING').length}</strong>
              <span>phần đơn đang làm</span>
            </div>
            <Link className="button" to="/station/orders">
              Theo dõi đơn <ArrowRight size={17} />
            </Link>
          </div>
        </Card>
        <Card className="revenue-ring-card">
          <h2>Giá trị đặt trước</h2>
          <div
            className="revenue-ring"
            style={{
              background: `conic-gradient(#1769e0 ${completedRatio}%, #deebfb ${completedRatio}% 100%)`,
            }}
          >
            <div>
              <strong>{money(m.total)}</strong>
              <small>Tổng giá trị</small>
            </div>
          </div>
          <div className="row">
            <span>
              <span className="dot blue-dot" />
              Đã bàn giao
            </span>
            <strong>{money(m.completed)}</strong>
          </div>
          <div className="row">
            <span>
              <span className="dot light-dot" />
              Đang chờ
            </span>
            <strong>{money(m.pending)}</strong>
          </div>
        </Card>
      </div>
      <Card>
        <div className="section-heading">
          <h2>
            <Bus size={21} />
            Xe sắp đến & đang phục vụ
          </h2>
          <TextLink to="/station/vehicles">Xem tất cả</TextLink>
        </div>
        <VehicleTable
          trips={trips.filter((t) => !['ARRIVED', 'DEPARTED_STATION', 'READY'].includes(t.status))}
        />
      </Card>
      <Card>
        <div className="section-heading">
          <h2>
            <Store size={21} />
            Hiệu suất cửa hàng
          </h2>
          <TextLink to="/station/sales">Xem doanh thu</TextLink>
        </div>
        <PerformanceTable />
      </Card>
    </>
  );
}
function VehicleTable({ trips }: { trips: Trip[] }) {
  const s = useDemoStore();
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Dự kiến đến</th>
            <th>Nhà xe / chuyến</th>
            <th>Biển số</th>
            <th>Hành khách</th>
            <th>Đơn khách</th>
            <th>Giá trị đặt trước</th>
            <th>Trạng thái</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {trips.map((t) => {
            const m = metrics(
              s.merchantOrders.filter((p) => p.tripId === t.id && p.stationId === MAIN_STATION),
            );
            const stop = t.stops.find((st) => st.stationId === MAIN_STATION)!;
            return (
              <tr key={t.id}>
                <td>
                  <strong>{clock(stop.arrivalAt)}</strong>
                  <small>
                    {stop.checkedInAt
                      ? `Check-in ${clock(stop.checkedInAt)}`
                      : `Còn ${etaMinutes(s.demoTime, stop.arrivalAt)} phút`}
                  </small>
                </td>
                <td>
                  <strong>{t.company ?? s.users.find((u) => u.id === t.ownerId)?.name}</strong>
                  <small>{t.title}</small>
                </td>
                <td>{t.plate ?? '—'}</td>
                <td>{t.passengerCount}</td>
                <td>{m.customers}</td>
                <td>
                  <strong>{money(m.total)}</strong>
                </td>
                <td>
                  <VehicleState trip={t} />
                </td>
                <td>
                  <Link
                    className="icon-button"
                    to={`/station/vehicles/${t.id}`}
                    aria-label={`Xem xe ${t.plate ?? t.title}`}
                  >
                    <ArrowRight size={18} />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {!trips.length && <p className="empty-table">Không có xe phù hợp bộ lọc.</p>}
    </div>
  );
}
export function Vehicles() {
  const s = useDemoStore();
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const trips = s.trips.filter(
    (t) =>
      t.stops.some((st) => st.stationId === MAIN_STATION) &&
      (filter === 'ALL' ||
        (filter === 'INCOMING' && ['EN_ROUTE', 'APPROACHING_STATION'].includes(t.status)) ||
        filter === t.status) &&
      `${t.plate} ${t.company} ${t.title}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <Title
        title="Xe sắp đến"
        description="Theo dõi Dự kiến đến và nhu cầu đặt trước theo từng chuyến."
      />
      <div className="filter-bar">
        <div className="tabs">
          {[
            ['ALL', 'Tất cả'],
            ['INCOMING', 'Sắp đến'],
            ['AT_STATION', 'Đã check-in'],
            ['DEPARTED_STATION', 'Đã rời trạm'],
          ].map(([id, label]) => (
            <button
              className={filter === id ? 'active' : ''}
              key={id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <label>
          <span className="sr-only">Tìm xe</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm nhà xe hoặc biển số"
          />
        </label>
      </div>
      <Card>
        <VehicleTable trips={trips} />
      </Card>
    </>
  );
}
export function VehicleDetail({ checkIn = false }: { checkIn?: boolean }) {
  const s = useDemoStore();
  const { tripId } = useParams();
  const trip = s.trips.find((t) => t.id === tripId);
  const [camera, setCamera] = useState(false);
  if (!trip) return <Missing />;
  const stop = trip.stops.find((p) => p.stationId === MAIN_STATION);
  if (!stop) return <Missing />;
  const parts = s.merchantOrders.filter(
    (p) => p.tripId === trip.id && p.stationId === MAIN_STATION,
  );
  const m = metrics(parts);
  return (
    <>
      <Title
        title={checkIn ? 'Đối soát check-in của tài xế' : (trip.company ?? trip.title)}
        description={`${trip.plate ?? 'Không có biển số'} · ${trip.title}`}
        action={<TextLink to="/station/vehicles">Danh sách xe</TextLink>}
      />
      <div className="station-kpis">
        <Metric label="Hành khách" value={trip.passengerCount} />
        <Metric label="Đơn khách" value={m.customers} />
        <Metric label="Giá trị đặt trước" value={money(m.total)} />
        <Metric
          label="Dự kiến đến / Check-in"
          value={
            stop.checkedInAt
              ? clock(stop.checkedInAt)
              : `${etaMinutes(s.demoTime, stop.arrivalAt)} phút`
          }
        />
      </div>
      <Card className={stop.checkedInAt ? 'green-card' : 'blue-card'}>
        <div className="row">
          <div>
            <VehicleState trip={trip} />
            <h2>{stop.checkedInAt ? 'Đã nhận check-in từ tài xế' : 'Đang chờ tài xế check-in'}</h2>
            <p>
              {s.users.find((u) => u.id === trip.ownerId)?.name} · {stop.name}
            </p>
            <p>
              {stop.checkedInAt
                ? `Check-in lúc ${clock(stop.checkedInAt)} · Nghỉ ${stop.restMinutes} phút`
                : 'Tài xế xác nhận khi đến trạm từ Travel App. Quản lý trạm theo dõi tại đây.'}
            </p>
          </div>
          <MapPin size={38} />
        </div>
        {!checkIn && (
          <Link className="button secondary" to={`/station/vehicles/${trip.id}/check-in`}>
            Xem trạng thái check-in
          </Link>
        )}
        {checkIn && (
          <>
            <button
              className="button secondary"
              onClick={() => {
                setCamera(true);
                notify('Biển số đã đối soát. Check-in vẫn do tài xế xác nhận.');
              }}
            >
              <Camera size={17} />
              Đối soát biển số
            </button>
            {camera && (
              <p>
                Biển số {trip.plate ?? 'không có'} đã được đối soát. Không làm thay đổi chuyến hoặc
                đơn.
              </p>
            )}
          </>
        )}
      </Card>
      <Card>
        <h2>Sẵn sàng theo cửa hàng</h2>
        <div className="merchant-readiness">
          {s.merchants
            .filter((merchant) => parts.some((p) => p.merchantId === merchant.id))
            .map((merchant) => {
              const portions = parts.filter((p) => p.merchantId === merchant.id);
              const ready = portions.filter((p) =>
                ['READY', 'PICKED_UP'].includes(p.status),
              ).length;
              return (
                <div key={merchant.id}>
                  <strong>
                    {merchant.name} · {merchant.counter}
                  </strong>
                  <span>
                    {ready}/{portions.length} phần đơn sẵn sàng / đã bàn giao
                  </span>
                  <div className="progress-track">
                    <span style={{ width: `${(ready / portions.length) * 100}%` }} />
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
      <Card>
        <div className="section-heading">
          <h2>Đơn của chuyến</h2>
          <TextLink to={`/station/orders?trip=${trip.id}`}>Lọc danh sách đơn</TextLink>
        </div>
        <StationOrderTable parts={parts} />
      </Card>
    </>
  );
}
function StationOrderTable({ parts }: { parts: MerchantOrder[] }) {
  const s = useDemoStore();
  const orders = s.orders.filter((o) => parts.some((p) => p.orderId === o.id));
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Mã đơn / khách</th>
            <th>Xe / chuyến</th>
            <th>Cửa hàng</th>
            <th>Trạng thái phần đơn</th>
            <th>Giá trị</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => {
            const portions = parts.filter((p) => p.orderId === o.id);
            return (
              <tr key={o.id}>
                <td>
                  <strong>{o.publicOrderCode}</strong>
                  <small>{o.customerName}</small>
                </td>
                <td>
                  {s.trips.find((t) => t.id === o.tripId)?.plate ?? 'Chuyến cá nhân'}
                  <small>{s.trips.find((t) => t.id === o.tripId)?.company}</small>
                </td>
                <td>
                  {portions.map((p) => (
                    <small key={p.id}>{s.merchants.find((m) => m.id === p.merchantId)?.name}</small>
                  ))}
                </td>
                <td>
                  <div className="status-stack">
                    {portions.map((p) => (
                      <div key={p.id}>
                        <Status status={p.status} />
                        {p.status === 'ACCEPTED' && (
                          <small>
                            {preparation(s, p).startIn > 0
                              ? `Bắt đầu sau ${preparation(s, p).startIn} phút`
                              : 'Đến giờ chuẩn bị'}
                          </small>
                        )}
                        {preparation(s, p).late && (
                          <small className="error-text">Nguy cơ chậm món</small>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <strong>{money(portions.reduce((sum, p) => sum + p.total, 0))}</strong>
                  <small>{portions.length} phần đơn đang hiển thị</small>
                </td>
                <td>
                  <Link className="text-link" to={`/station/orders/${o.id}`}>
                    Chi tiết →
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {orders.length === 0 && <p className="empty-table">Không có đơn phù hợp bộ lọc.</p>}
    </div>
  );
}
export function StationOrders() {
  const s = useDemoStore();
  const [params] = useSearchParams();
  const [merchant, setMerchant] = useState(params.get('merchant') ?? 'ALL');
  const [trip, setTrip] = useState(params.get('trip') ?? 'ALL');
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const parts = stationParts(s.merchantOrders).filter(
    (p) =>
      (merchant === 'ALL' || p.merchantId === merchant) &&
      (trip === 'ALL' || p.tripId === trip) &&
      (status === 'ALL' || p.status === status) &&
      s.orders.some(
        (o) =>
          o.id === p.orderId &&
          `${o.publicOrderCode} ${o.customerName}`
            .toLocaleLowerCase('vi')
            .includes(search.toLocaleLowerCase('vi')),
      ),
  );
  return (
    <>
      <Title
        title="Giám sát đơn đặt trước"
        description="Trạng thái được cập nhật từ cửa hàng. Quản lý trạm xem toàn bộ và theo dõi tiến độ."
      />
      <div className="filter-bar">
        <label>
          Cửa hàng
          <select value={merchant} onChange={(e) => setMerchant(e.target.value)}>
            <option value="ALL">Tất cả cửa hàng</option>
            {s.merchants.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Chuyến
          <select value={trip} onChange={(e) => setTrip(e.target.value)}>
            <option value="ALL">Tất cả xe / chuyến</option>
            {s.trips
              .filter((t) => t.stops.some((st) => st.stationId === MAIN_STATION))
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.company ?? t.title}
                </option>
              ))}
          </select>
        </label>
        <label>
          Trạng thái
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ALL">Tất cả trạng thái</option>
            {Object.entries(statusLabels).map(([id, label]) => (
              <option value={id} key={id}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Tìm đơn
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Mã đơn hoặc tên khách"
          />
        </label>
      </div>
      <p className="result-count">
        {new Set(parts.map((p) => p.orderId)).size} đơn khách · {parts.length} phần đơn quầy
      </p>
      <Card>
        <StationOrderTable parts={parts} />
      </Card>
    </>
  );
}
export function StationOrderDetail() {
  const s = useDemoStore();
  const { orderId } = useParams();
  const navigate = useNavigate();
  const o = s.orders.find((o) => o.id === orderId && o.stationId === MAIN_STATION);
  if (!o) return <Missing />;
  const parts = s.merchantOrders.filter((p) => p.orderId === o.id);
  return (
    <>
      <Title
        title={`Đơn ${o.publicOrderCode}`}
        description={`${o.customerName} · ${dateLabel(o.createdAt)} · ${clock(o.createdAt)}`}
        action={<TextLink to="/station/orders">Danh sách đơn</TextLink>}
      />
      <Card>
        <div className="row">
          <h2>{s.trips.find((t) => t.id === o.tripId)?.title}</h2>
          <strong>{money(o.total)}</strong>
        </div>
        <p>
          {orderLabel(parts)} · {parts.length} phần đơn quầy · Đã thanh toán
        </p>
      </Card>
      <div className="station-portion-grid">
        {parts.map((p) => {
          const m = s.merchants.find((m) => m.id === p.merchantId)!;
          const prep = preparation(s, p);
          return (
            <Card key={p.id}>
              <div className="row">
                <h2>
                  {m.name} · {m.counter}
                </h2>
                <Status status={p.status} />
              </div>
              <p>
                Xe đến sau {prep.eta} phút · Chuẩn bị {p.prepMinutes} phút
              </p>
              {p.items.map((i) => (
                <div className="row line-item" key={i.productId}>
                  <span>
                    {i.quantity} × {i.name}
                    {i.note && <small>{i.note}</small>}
                  </span>
                  <strong>{money(i.quantity * i.price)}</strong>
                </div>
              ))}
              <div className="row total-row">
                <span>Mã nhận {p.pickupCode}</span>
                <strong>{money(p.total)}</strong>
              </div>
              {p.rejectionReason && <p className="error-text">Từ chối: {p.rejectionReason}</p>}
              <ul className="history-list">
                {p.history.map((h, i) => (
                  <li key={i}>
                    {statusLabels[h.status]}
                    <span>{clock(h.at)}</span>
                  </li>
                ))}
              </ul>
              <button
                className="button secondary"
                onClick={() => {
                  s.openMerchantDemo(m.id);
                  navigate(`/merchant/orders/${p.id}`);
                }}
              >
                Mở Merchant <ArrowRight size={17} />
              </button>
            </Card>
          );
        })}
      </div>
    </>
  );
}
function PerformanceTable({ merchant = 'ALL' }: { merchant?: string }) {
  const s = useDemoStore();
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Cửa hàng / quầy</th>
            <th>Đơn khách</th>
            <th>Phần đơn</th>
            <th>Đang chờ</th>
            <th>Đã bàn giao</th>
            <th>Đang làm</th>
            <th>Tỷ lệ bàn giao</th>
          </tr>
        </thead>
        <tbody>
          {s.merchants
            .filter((m) => merchant === 'ALL' || m.id === merchant)
            .map((m) => {
              const parts = s.merchantOrders.filter((p) => p.merchantId === m.id);
              const k = metrics(parts);
              return (
                <tr key={m.id}>
                  <td>
                    <Link className="text-link" to={`/station/orders?merchant=${m.id}`}>
                      {m.name}
                    </Link>
                    <small>
                      Quầy {m.counter} · {m.acceptingOrders ? 'Đang nhận đơn' : 'Tạm nghỉ'}
                    </small>
                  </td>
                  <td>{k.customers}</td>
                  <td>{parts.length}</td>
                  <td>{money(k.pending)}</td>
                  <td>
                    <strong>{money(k.completed)}</strong>
                  </td>
                  <td>{parts.filter((p) => p.status === 'PREPARING').length}</td>
                  <td>
                    {k.portions
                      ? Math.round(
                          (parts.filter((p) => p.status === 'PICKED_UP').length / k.portions) * 100,
                        )
                      : 0}
                    %
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export function StationSales() {
  const s = useDemoStore();
  const [merchant, setMerchant] = useState('ALL');
  const parts = stationParts(s.merchantOrders).filter(
    (p) => merchant === 'ALL' || p.merchantId === merchant,
  );
  const m = metrics(parts);
  return (
    <>
      <Title
        title="Doanh thu & hiệu suất"
        description="Phân biệt giá trị đặt trước đang chờ và doanh thu đã bàn giao."
        action={
          <label>
            Cửa hàng
            <select value={merchant} onChange={(e) => setMerchant(e.target.value)}>
              <option value="ALL">Toàn trạm</option>
              {s.merchants.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </label>
        }
      />
      <div className="station-kpis">
        <Metric label="Tổng giá trị đặt trước" value={money(m.total)} />
        <Metric label="Giá trị đang chờ" value={money(m.pending)} />
        <Metric label="Doanh thu hoàn tất" value={money(m.completed)} />
        <Metric
          label="Trung bình / đơn khách"
          value={money(m.customers ? Math.round(m.total / m.customers) : 0)}
        />
      </div>
      <Card>
        <h2>Giá trị theo cửa hàng</h2>
        <p className="chart-legend">
          <span className="dot light-dot" />
          Đang chờ <span className="dot blue-dot" />
          Đã bàn giao
        </p>
        <div className="bar-chart">
          {s.merchants
            .filter((mer) => merchant === 'ALL' || mer.id === merchant)
            .map((mer) => {
              const k = metrics(parts.filter((p) => p.merchantId === mer.id));
              const max = Math.max(
                1,
                ...s.merchants.map(
                  (item) => metrics(parts.filter((p) => p.merchantId === item.id)).total,
                ),
              );
              return (
                <div className="bar-row" key={mer.id}>
                  <span>{mer.name}</span>
                  <div className="bar-track">
                    <span
                      className="completed-bar"
                      style={{ width: `${(k.completed / max) * 100}%` }}
                    />
                    <span
                      className="pending-bar"
                      style={{ width: `${(k.pending / max) * 100}%` }}
                    />
                  </div>
                  <strong>{money(k.total)}</strong>
                </div>
              );
            })}
        </div>
      </Card>
      <Card>
        <h2>Merchant Performance</h2>
        <p>
          Số đơn khách liên quan có thể xuất hiện tại nhiều quầy; tổng trạm đếm Order ID duy nhất.
        </p>
        <PerformanceTable merchant={merchant} />
      </Card>
      <Card>
        <h2>Giá trị đặt trước theo chuyến</h2>
        <VehicleTable
          trips={s.trips.filter((t) => t.stops.some((p) => p.stationId === MAIN_STATION))}
        />
      </Card>
    </>
  );
}
export function StationPartners() {
  const s = useDemoStore();
  const partners = s.users.filter((u) => ['approved', 'pending'].includes(u.partnerStatus));
  const [selected, setSelected] = useState<string | null>(null);
  const u = s.users.find((u) => u.id === selected);
  return (
    <>
      <Title
        title="Đối tác & hoa hồng"
        description="Hoa hồng chỉ phát sinh từ phần đơn đủ điều kiện. Khoản đã kiếm được vẫn chờ đối soát."
      />
      <Card>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Tài xế / nhà xe</th>
                <th>Trạng thái</th>
                <th>Chuyến</th>
                <th>Đơn khách</th>
                <th>Hoa hồng dự kiến</th>
                <th>Hoa hồng đã kiếm</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {partners.map((p) => {
                const c = commission(s, p.id);
                return (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                      <small>{p.company ?? 'Chưa cập nhật nhà xe'}</small>
                    </td>
                    <td>
                      <Pill tone={p.partnerStatus === 'approved' ? 'green' : 'amber'}>
                        {p.partnerStatus === 'approved' ? 'Đã duyệt' : 'Chờ duyệt'}
                      </Pill>
                    </td>
                    <td>{s.trips.filter((t) => t.ownerId === p.id).length}</td>
                    <td>{c.customers}</td>
                    <td>{money(c.expected)}</td>
                    <td>
                      <strong>{money(c.earned)}</strong>
                    </td>
                    <td>
                      <button className="link-button" onClick={() => setSelected(p.id)}>
                        Xem hồ sơ →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      {u && (
        <Modal title={u.name} close={() => setSelected(null)}>
          <p>
            {u.company ?? 'Chưa có nhà xe'} · {u.plate ?? 'Chưa có biển số'}
          </p>
          <Card>
            <div className="row">
              <span>Doanh thu hoàn tất đủ điều kiện</span>
              <strong>{money(commission(s, u.id).completed)}</strong>
            </div>
            <div className="row">
              <span>Hoa hồng 5%</span>
              <strong>{money(commission(s, u.id).earned)}</strong>
            </div>
            <p>Đối soát: đang chờ</p>
          </Card>
          {u.partnerStatus === 'pending' ? (
            <button
              className="button full"
              onClick={() => {
                useDemoStore.setState((state) => ({
                  users: state.users.map((user) =>
                    user.id === u.id ? { ...user, partnerStatus: 'approved' as const } : user,
                  ),
                }));
                notify('Đã duyệt hồ sơ. Chuyến đối tác tạo mới sẽ đủ điều kiện hoa hồng.');
                setSelected(null);
              }}
            >
              Duyệt hồ sơ
            </button>
          ) : (
            <button
              className="button secondary full"
              onClick={() => notify('Đã ghi nhận yêu cầu đối soát. ')}
            >
              Yêu cầu đối soát
            </button>
          )}
        </Modal>
      )}
    </>
  );
}
export function StationSettings() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  return (
    <>
      <Title title="Cài đặt trạm" description="Thông tin và công cụ cho phiên trình diễn." />
      <Card>
        <h2>Trạm Việt Ninh Bình</h2>
        <p>
          Cao tốc Bắc – Nam · Ninh Bình
          <br />
          {s.merchants.length} cửa hàng · Quản lý: Nguyễn Thanh Tùng
        </p>
        <TextLink to="/demo-control">Điều khiển hành trình</TextLink>
      </Card>
      <Card>
        <h2>Dữ liệu</h2>
        <p>Quản lý thông tin hoạt động của trạm và khôi phục dữ liệu khi cần.</p>
        <button className="button secondary" onClick={() => setReset(true)}>
          Khôi phục dữ liệu
        </button>
        <button
          className="link-button"
          onClick={() => {
            useDemoStore.setState({ stationLoggedIn: false });
            navigate('/station/login');
          }}
        >
          Đăng xuất Station
        </button>
      </Card>
      {reset && (
        <Modal title="Khôi phục dữ liệu?" close={() => setReset(false)}>
          <p>
            Khôi phục đơn mẫu, thời gian 08:33, trạng thái chuyến, món và phiên đăng nhập về ban
            đầu.
          </p>
          <button
            className="button danger full"
            onClick={() => {
              s.resetDemo();
              notify('Đã khôi phục.');
              navigate('/');
            }}
          >
            Xác nhận khôi phục
          </button>
        </Modal>
      )}
    </>
  );
}
