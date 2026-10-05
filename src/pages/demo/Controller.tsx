import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Clock, RotateCcw } from 'lucide-react';
import { Brand, Card, Pill, Title, notify } from '../../components/ui';
import { DEFAULT_MERCHANT, MAIN_STATION, MAIN_TRIP } from '../../demo/data';
import { useDemoStore } from '../../store/useDemoStore';
import { clock, commission, dateLabel, etaMinutes, metrics } from '../../lib/rules';
export default function Controller() {
  const s = useDemoStore();
  const navigate = useNavigate();
  const trip = s.trips.find((t) => t.id === MAIN_TRIP)!;
  const stop = trip.stops.find((p) => p.stationId === MAIN_STATION)!;
  const m = metrics(s.merchantOrders.filter((p) => p.tripId === MAIN_TRIP));
  const c = commission(s, trip.ownerId);
  function fixture(multiple = false) {
    s.clearCart();
    const entries: [string, number][] = multiple
      ? [
          ['com-ga', 2],
          ['com-cafe', 1],
          ['com-chay', 1],
          ['khan-giay', 1],
        ]
      : [
          ['com-ga', 2],
          ['com-cafe', 1],
        ];
    for (const [id, quantity] of entries) {
      const error = s.addCart(MAIN_TRIP, MAIN_STATION, {
        productId: id,
        quantity,
        note: id === 'com-ga' ? 'Không hành' : '',
      });
      if (error) return notify(error);
    }
    s.setGuest(s.guest?.name ?? 'Khách demo', '');
    const result = useDemoStore
      .getState()
      .checkout(MAIN_TRIP, MAIN_STATION, s.guest?.name ?? 'Khách demo', 'MoMo', true);
    notify(result.error ?? `Đã tạo fixture ${multiple ? '260.000đ / hai quầy' : '180.000đ'}.`);
  }
  return (
    <div className="controller">
      <header className="landing-header">
        <Brand />
        <Link className="button secondary" to="/">
          Các giao diện
        </Link>
      </header>
      <Title
        title="Demo Controller"
        description="Công cụ trình diễn. Các thay đổi cập nhật cùng store với bốn giao diện."
      />
      <div className="controller-grid">
        <Card>
          <h2>
            <Clock size={22} />
            Thời gian & ETA
          </h2>
          <h1>{clock(s.demoTime)}</h1>
          <p>
            {dateLabel(s.demoTime)} · Xe Hoàng Long còn{' '}
            {stop.checkedInAt ? 0 : etaMinutes(s.demoTime, stop.arrivalAt)} phút
          </p>
          <div className="action-row">
            <button className="button secondary" onClick={() => s.advanceTime(-10)}>
              −10 phút
            </button>
            <button className="button" onClick={() => s.advanceTime(10)}>
              +10 phút
            </button>
            <button className="button secondary" onClick={() => s.advanceTime(17)}>
              +17 phút
            </button>
            <button className="button secondary" onClick={() => s.advanceTime(12)}>
              +12 phút
            </button>
          </div>
          <button
            disabled={Boolean(stop.checkedInAt)}
            className="button secondary full"
            onClick={() => {
              s.delayTrip(MAIN_TRIP, 32 - etaMinutes(s.demoTime, stop.arrivalAt));
              notify('ETA đặt về 32 phút.');
            }}
          >
            Đặt ETA còn 32 phút
          </button>
          <button
            disabled={Boolean(stop.checkedInAt)}
            className="button secondary full"
            onClick={() => {
              s.delayTrip(MAIN_TRIP, 20);
              notify('Đã mô phỏng xe trễ 20 phút.');
            }}
          >
            Thêm trễ 20 phút
          </button>
        </Card>
        <Card>
          <h2>Chuyến & check-in</h2>
          <Pill tone={stop.checkedInAt ? 'green' : 'blue'}>{trip.status}</Pill>
          <p>Check-in: {stop.checkedInAt ? clock(stop.checkedInAt) : 'Chưa nhận'}</p>
          <div className="action-row">
            <button
              className="button secondary"
              onClick={() => s.setTripStatus(MAIN_TRIP, 'APPROACHING_STATION')}
              disabled={Boolean(stop.checkedInAt)}
            >
              Xe sắp đến
            </button>
            <button
              className="button"
              onClick={() => {
                const error = s.checkIn(MAIN_TRIP, MAIN_STATION, true);
                notify(error ?? 'Đã mô phỏng cùng thao tác check-in của tài xế.');
              }}
            >
              Mô phỏng driver check-in
            </button>
            <button
              className="button secondary"
              disabled={!stop.checkedInAt}
              onClick={() => s.setTripStatus(MAIN_TRIP, 'DEPARTED_STATION')}
            >
              Rời trạm
            </button>
            <button
              className="button secondary"
              onClick={() => s.setTripStatus(MAIN_TRIP, 'ARRIVED')}
            >
              Đã đến Đà Nẵng
            </button>
          </div>
          <p className="fine-print">
            Check-in không tự bàn giao món. Reset để trình diễn lại từ đầu.
          </p>
        </Card>
        <Card>
          <h2>Đơn & fixture</h2>
          <p>
            {m.customers} đơn khách · {m.portions} phần đơn
          </p>
          <button className="button full" onClick={() => fixture()}>
            Thêm đơn pitch 180.000đ
          </button>
          <button className="button secondary full" onClick={() => fixture(true)}>
            Thêm fixture hai quầy 260.000đ
          </button>
          <p className="fine-print">
            Hai fixture là kịch bản thay thế. Reset trước khi đổi kịch bản để giữ KPI 17 → 18 đơn.
          </p>
          <div className="mini-metrics">
            <div>
              <strong>{c.earned.toLocaleString('vi-VN')}đ</strong>
              <small>Hoa hồng đã kiếm</small>
            </div>
            <div>
              <strong>{c.expected.toLocaleString('vi-VN')}đ</strong>
              <small>Hoa hồng dự kiến</small>
            </div>
          </div>
        </Card>
        <Card>
          <h2>In phiếu mô phỏng</h2>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={s.printError}
              onChange={(e) => s.setOption('printError', e.target.checked)}
            />
            Bật lỗi in phiếu
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={s.autoPrint}
              onChange={(e) => s.setOption('autoPrint', e.target.checked)}
            />
            Tự in khi nhận đơn
          </label>
          <p>In và in lại không đổi số đơn, doanh thu hoặc hoa hồng.</p>
          <Link className="text-link" to="/merchant/orders">
            Đi tới cửa hàng <ArrowRight size={17} />
          </Link>
        </Card>
        <Card>
          <h2>Chọn người dùng Travel</h2>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={s.appInstalled}
              onChange={(e) => s.setOption('appInstalled', e.target.checked)}
            />
            Mô phỏng thiết bị đã cài Travel App (QR mở chuyến trong app)
          </label>
          <label>
            Danh tính demo
            <select
              value={s.currentUserId}
              onChange={(e) => {
                s.setUser(e.target.value);
                notify('Đã đổi người dùng Travel. Dữ liệu chuyến và đơn được giữ.');
              }}
            >
              {s.users
                .filter(
                  (u) =>
                    ['user-minh', 'user-anh', 'user-hoang'].includes(u.id) ||
                    !u.id.startsWith('user-'),
                )
                .map((u) => (
                  <option value={u.id} key={u.id}>
                    {u.name} ·{' '}
                    {u.partnerStatus === 'approved'
                      ? 'Partner Driver'
                      : u.role === 'truck'
                        ? 'Truck Driver'
                        : 'Traveler'}
                  </option>
                ))}
            </select>
          </label>
          <div className="action-row">
            <Link className="button" to="/app">
              Travel App
            </Link>
            <Link className="button secondary" to={`/t/${trip.publicTripCode}`}>
              Guest QR
            </Link>
            <button
              className="button secondary"
              onClick={() => {
                s.openMerchantDemo(DEFAULT_MERCHANT);
                navigate('/merchant/orders');
              }}
            >
              Cơm Việt POS
            </button>
            <button
              className="button secondary"
              onClick={() => {
                s.loginStation();
                navigate('/station');
              }}
            >
              Station Portal
            </button>
          </div>
        </Card>
        <Card className="reset-card">
          <h2>Khôi phục demo</h2>
          <p>Đưa về 08:33, 17 đơn chính, giá trị 1.840.000đ; xóa giỏ và phiên đăng nhập demo.</p>
          <button
            className="button danger"
            onClick={() => {
              s.resetDemo();
              notify('Đã Reset Demo về dữ liệu ban đầu.');
            }}
          >
            <RotateCcw size={17} />
            Reset Demo
          </button>
          <p className="fine-print">
            Dữ liệu chia sẻ giữa các tab cùng origin. Thiết bị khác hoặc subdomain khác có state độc
            lập.
          </p>
        </Card>
      </div>
    </div>
  );
}
