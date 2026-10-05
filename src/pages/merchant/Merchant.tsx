import { PickupScanner } from '../../components/OrderQr';
import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Bell, Clock, Printer, Volume2 } from 'lucide-react';
import {
  Back,
  Brand,
  Card,
  Empty,
  Metric,
  Missing,
  Modal,
  Pill,
  Status,
  TextLink,
  Title,
  notify,
} from '../../components/ui';
import { ProductArt } from '../../features/ordering/Shopping';
import { useDemoStore } from '../../store/useDemoStore';
import {
  clock,
  dateLabel,
  metrics,
  money,
  preparation,
  statusLabels,
  tripStop,
} from '../../lib/rules';
import type { MerchantOrder, OrderStatus } from '../../types';
const actions: Partial<Record<OrderStatus, string>> = {
  NEW: 'Nhận đơn',
  ACCEPTED: 'Bắt đầu làm',
  PREPARING: 'Đã làm xong',
  READY: 'Quét QR & bàn giao',
};
const tabs: [string, string][] = [
  ['NEW', 'Mới'],
  ['ACCEPTED', 'Đã nhận'],
  ['PREPARING', 'Đang làm'],
  ['READY', 'Sẵn sàng'],
  ['HISTORY', 'Lịch sử'],
];
export function MerchantLogin() {
  const s = useDemoStore();
  const [email, setEmail] = useState('comviet@demo.vn');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  if (s.merchantSessionId) return <Navigate to="/merchant/orders" replace />;
  return (
    <div className="mobile-stage pos-stage">
      <div className="preview-label">
        Merchant · Đăng nhập<Link to="/">Các giao diện</Link>
      </div>
      <div className="login-shell">
        <Brand />
        <div className="login-icon">🏪</div>
        <span className="eyebrow">TRẠM VIỆT MERCHANT</span>
        <h1>
          Sẵn sàng phục vụ,
          <br />
          trước khi khách đến.
        </h1>
        <p>Đăng nhập tài khoản được cấp riêng cho cửa hàng của bạn.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!s.loginMerchant(email, password))
              return setError('Tài khoản hoặc mật khẩu chưa đúng.');
            navigate('/merchant/orders');
          }}
        >
          <label>
            Email cửa hàng
            <input
              required
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Mật khẩu
            <input
              required
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {error && (
            <p role="alert" className="error-text">
              {error}
            </p>
          )}
          <button className="button full">Đăng nhập</button>
        </form>
        <div className="alert">
          <span>
            Cơm Việt · Quầy A12
            <br />
            <strong>comviet@demo.vn</strong>
          </span>
        </div>
        <p className="fine-print">Tài khoản gắn cố định với một cửa hàng.</p>
      </div>
    </div>
  );
}
function beep() {
  try {
    const context = new AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.connect(gain);
    gain.connect(context.destination);
    gain.gain.setValueAtTime(0.07, context.currentTime);
    oscillator.frequency.setValueAtTime(720, context.currentTime);
    oscillator.start();
    oscillator.stop(context.currentTime + 0.12);
    oscillator.onended = () => {
      void context.close();
    };
  } catch {
    notify('Âm báo chưa được trình duyệt cho phép. Đơn mới vẫn có thông báo trên màn hình.');
  }
}
export function MerchantOrders() {
  const s = useDemoStore();
  const [tab, setTab] = useState('NEW');
  const parts = s.merchantOrders.filter((p) => p.merchantId === s.merchantSessionId);
  const newCount = parts.filter((p) => p.status === 'NEW').length;
  const previous = useRef(newCount);
  useEffect(() => {
    if (newCount > previous.current && s.sound) beep();
    previous.current = newCount;
  }, [newCount, s.sound]);
  const list = parts.filter((p) =>
    tab === 'HISTORY' ? ['PICKED_UP', 'REJECTED'].includes(p.status) : p.status === tab,
  );
  return (
    <>
      <Title title="Đơn hàng tại quầy" description="Chuẩn bị đúng lúc, bàn giao đúng khách." />
      <div className="pos-options">
        <button
          className={s.sound ? 'active' : ''}
          onClick={() => {
            s.setOption('sound', !s.sound);
            if (!s.sound) beep();
            notify(s.sound ? 'Đã tắt âm báo.' : 'Đã bật âm báo.');
          }}
        >
          <Volume2 size={16} />
          {s.sound ? 'Âm báo bật' : 'Âm báo tắt'}
        </button>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={s.autoPrint}
            onChange={(e) => s.setOption('autoPrint', e.target.checked)}
          />
          Tự in phiếu
        </label>
      </div>
      {newCount > 0 && (
        <div className="alert">
          <Bell size={18} />
          <span>
            <strong>{newCount} phần đơn mới</strong> đang chờ cửa hàng nhận.
          </span>
        </div>
      )}
      <div className="tabs merchant-tabs">
        {tabs.map(([id, label]) => (
          <button className={tab === id ? 'active' : ''} onClick={() => setTab(id)} key={id}>
            {label}
            <span>
              {
                parts.filter((p) =>
                  id === 'HISTORY' ? ['PICKED_UP', 'REJECTED'].includes(p.status) : p.status === id,
                ).length
              }
            </span>
          </button>
        ))}
      </div>
      {list.map((p) => (
        <MerchantOrderCard key={p.id} part={p} />
      ))}
      {!list.length && (
        <Empty
          title="Không có đơn ở trạng thái này"
          description="Đơn mới sẽ xuất hiện tại đây sau khi khách thanh toán."
        />
      )}
    </>
  );
}
function MerchantOrderCard({ part: p }: { part: MerchantOrder }) {
  const s = useDemoStore();
  const o = s.orders.find((o) => o.id === p.orderId)!;
  const t = s.trips.find((t) => t.id === p.tripId)!;
  const prep = preparation(s, p);
  return (
    <Link className="card merchant-order-card" to={`/merchant/orders/${p.id}`}>
      <div className="row">
        <h3>{o.publicOrderCode}</h3>
        <Status status={p.status} />
      </div>
      <small>
        {p.id.slice(0, 8)} · {o.customerName}
      </small>
      <p className="merchant-items">
        {p.items.map((i) => `${i.quantity} × ${i.name}`).join(' · ')}
      </p>
      <div className="row">
        <span>{t.company ?? t.title}</span>
        <strong>{money(p.total)}</strong>
      </div>
      <div className="prep-strip">
        <Clock size={16} />
        <span>
          Xe đến sau {prep.eta} phút · Làm {p.prepMinutes} phút
          {p.status === 'ACCEPTED' && (
            <strong>
              {prep.startIn > 0 ? `Nên bắt đầu sau ${prep.startIn} phút` : 'Đến giờ chuẩn bị'}
            </strong>
          )}
        </span>
      </div>
      <div className="row">
        <span>Nhận hàng bằng QR</span>
        <span className="text-link">{actions[p.status] ?? 'Xem chi tiết'} →</span>
      </div>
    </Link>
  );
}
export function MerchantOrderDetail() {
  const s = useDemoStore();
  const { partId } = useParams();
  const p = s.merchantOrders.find((p) => p.id === partId && p.merchantId === s.merchantSessionId);
  const [modal, setModal] = useState<'reject' | 'pickup' | 'print' | null>(null);
  const [reason, setReason] = useState('Hết món');

  if (!p) return <Missing />;
  const o = s.orders.find((o) => o.id === p.orderId)!;
  const merchant = s.merchants.find((m) => m.id === p.merchantId)!;
  const t = s.trips.find((t) => t.id === p.tripId)!;
  const stop = tripStop(s, p)!;
  const prep = preparation(s, p);
  const ticket = s.kitchenTickets.find((ticket) => ticket.merchantOrderId === p.id);
  const next = (
    { NEW: 'ACCEPTED', ACCEPTED: 'PREPARING', PREPARING: 'READY', READY: 'PICKED_UP' } as const
  )[p.status as 'NEW' | 'ACCEPTED' | 'PREPARING' | 'READY'];
  function move(status: OrderStatus, rejectReason?: string, pickup?: string) {
    const error = s.transition(p!.id, status, rejectReason, pickup);
    if (error) return notify(error);
    notify(`Đơn ${o.publicOrderCode}: ${statusLabels[status]}.`);
    setModal(null);
  }
  return (
    <>
      <Back title="Chi tiết phần đơn" to="/merchant/orders" />
      <Card>
        <div className="row">
          <h2>{o.publicOrderCode}</h2>
          <Status status={p.status} />
        </div>
        <small>Mã phần đơn: {p.id.slice(0, 8)}</small>
        <h3>{o.customerName}</h3>
        <p>
          {t.title}
          <br />
          {t.company ?? 'Chuyến cá nhân'} · {t.plate ?? 'Không có biển số'}
        </p>
        <div className="pickup-code">
          <span>Nhận tại quầy {merchant.counter}</span>
          <strong>{o.publicOrderCode}</strong>
        </div>
      </Card>
      <Card className={prep.late ? 'warning-card' : 'blue-card'}>
        <div className="mini-metrics">
          <div>
            <strong>{prep.eta} phút</strong>
            <small>Dự kiến đến xe đến</small>
          </div>
          <div>
            <strong>{p.prepMinutes} phút</strong>
            <small>Thời gian làm món</small>
          </div>
        </div>
        {p.status === 'ACCEPTED' && (
          <p className={prep.startIn === 0 ? 'success-text' : ''}>
            {prep.startIn > 0
              ? `Nên bắt đầu sau ${prep.startIn} phút · đệm ${p.bufferMinutes} phút`
              : 'Đến giờ chuẩn bị. Bấm Bắt đầu làm khi quầy sẵn sàng.'}
          </p>
        )}
        {prep.late && (
          <p className="error-text">
            Nguy cơ chậm món: thời gian đến còn ít hơn thời gian chuẩn bị.
          </p>
        )}
        {p.status === 'PREPARING' &&
          ticket &&
          Date.parse(stop.arrivalAt) > Date.parse(ticket.arrivalAtSnapshot) && (
            <p>Xe đến muộn. Món đang làm giữ nguyên trạng thái.</p>
          )}
        <small>
          Dự kiến đến {clock(stop.arrivalAt)} · Thời gian {clock(s.demoTime)}
        </small>
      </Card>
      <Card>
        <h2>Món cần chuẩn bị</h2>
        {p.items.map((i) => (
          <div className="row line-item" key={i.productId}>
            <span>
              <strong>
                {i.quantity} × {i.name}
              </strong>
              {i.note && <small>Ghi chú: {i.note}</small>}
            </span>
            <span>{money(i.price * i.quantity)}</span>
          </div>
        ))}
        <div className="row total-row">
          <strong>Tổng phần đơn</strong>
          <strong>{money(p.total)}</strong>
        </div>
      </Card>
      {p.status === 'READY' && (
        <div className={`alert ${stop.checkedInAt ? '' : 'warning'}`}>
          {stop.checkedInAt
            ? `Tài xế đã check-in lúc ${clock(stop.checkedInAt)}. Quét QR của khách trước khi bàn giao.`
            : 'Món sẵn sàng. Chờ tài xế check-in để bàn giao.'}
        </div>
      )}
      {actions[p.status] && (
        <button
          className="button full"
          disabled={p.status === 'READY' && !stop.checkedInAt}
          onClick={() => (p.status === 'READY' ? setModal('pickup') : move(next))}
        >
          {actions[p.status]}
        </button>
      )}
      {p.status === 'NEW' && (
        <button className="button danger secondary full" onClick={() => setModal('reject')}>
          Từ chối đơn
        </button>
      )}
      {p.status === 'REJECTED' && (
        <div className="alert warning">Đã từ chối: {p.rejectionReason}</div>
      )}
      <button className="button secondary full" onClick={() => setModal('print')}>
        <Printer size={18} />
        {ticket ? 'Xem phiếu / in lại' : 'Xem & in phiếu bếp'}
      </button>
      {ticket && (
        <p className={`fine-print ${ticket.status === 'FAILED' ? 'error-text' : ''}`}>
          {ticket.status === 'PRINTING'
            ? 'Đang in…'
            : ticket.status === 'FAILED'
              ? 'In lỗi. Bạn có thể in lại phiếu.'
              : `Đã in phiếu · In lại ${ticket.reprintCount} lần`}
        </p>
      )}
      <Card>
        <h3>Lịch sử xử lý</h3>
        <ul className="history-list">
          {p.history.map((h, i) => (
            <li key={i}>
              {statusLabels[h.status]}
              <span>{clock(h.at)}</span>
            </li>
          ))}
        </ul>
      </Card>
      {modal === 'reject' && (
        <Modal title="Lý do từ chối đơn" close={() => setModal(null)}>
          <p>Khách sẽ nhận phản hồi; phần đơn bị từ chối không tính vào doanh thu và hoa hồng.</p>
          <label>
            Lý do
            <select value={reason} onChange={(e) => setReason(e.target.value)}>
              {['Hết món', 'Quầy quá tải', 'Quầy tạm nghỉ'].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>
          <button className="button danger full" onClick={() => move('REJECTED', reason)}>
            Xác nhận từ chối
          </button>
        </Modal>
      )}
      {modal === 'pickup' && (
        <Modal title="Quét QR nhận món" close={() => setModal(null)}>
          <PickupScanner partId={p.id} close={() => setModal(null)} />
        </Modal>
      )}
      {modal === 'print' && (
        <Modal title="Phiếu bếp" close={() => setModal(null)}>
          <div className="kitchen-ticket">
            <strong>TRẠM VIỆT · PHIẾU BẾP</strong>
            <p>
              Ninh Bình · {merchant.name} · {merchant.counter}
            </p>
            <hr />
            <h3>
              {o.publicOrderCode} / {p.id.slice(0, 8)}
            </h3>
            <p>
              {dateLabel(s.demoTime)} · {clock(s.demoTime)}
              <br />
              {t.title}
              <br />
              {t.plate ?? 'Không biển số'} · Dự kiến đến{' '}
              {clock(ticket?.arrivalAtSnapshot ?? stop.arrivalAt)}
            </p>
            {ticket && ticket.arrivalAtSnapshot !== stop.arrivalAt && (
              <strong>Cập nhật Dự kiến đến mới: {clock(stop.arrivalAt)}</strong>
            )}
            <hr />
            {p.items.map((i) => (
              <p key={i.productId}>
                <strong>
                  {i.quantity} × {i.name}
                </strong>
                {i.note && (
                  <>
                    <br />↳ {i.note}
                  </>
                )}
              </p>
            ))}
            <hr />
            <h2>Mã nhận {p.pickupCode}</h2>
            <p>Nhận tại {merchant.counter} · Không phải hóa đơn thuế</p>
          </div>
          {ticket && (
            <div className={`alert ${ticket.status === 'FAILED' ? 'warning' : ''}`}>
              {ticket.status === 'PRINTING'
                ? 'Đang in phiếu…'
                : ticket.status === 'FAILED'
                  ? 'Không in được. Kiểm tra máy in và thử lại.'
                  : `Đã in thành công · In lại ${ticket.reprintCount} lần`}
            </div>
          )}
          <button
            className="button full"
            disabled={ticket?.status === 'PRINTING'}
            onClick={() => {
              void s.printTicket(p.id).then(() => {
                const printed = useDemoStore
                  .getState()
                  .kitchenTickets.find((t) => t.merchantOrderId === p.id);
                notify(
                  printed?.status === 'FAILED'
                    ? 'In phiếu thất bại. Trạng thái đơn không đổi.'
                    : 'Đã in phiếu.',
                );
              });
            }}
          >
            <Printer size={18} />
            {ticket ? 'In lại phiếu' : 'In phiếu'}
          </button>
        </Modal>
      )}
    </>
  );
}
export function MerchantMenu() {
  const s = useDemoStore();
  const products = s.products.filter((p) => p.merchantId === s.merchantSessionId);
  return (
    <>
      <Title
        title="Thực đơn của cửa hàng"
        description="Trạng thái bán cập nhật sang Travel và Guest QR."
      />
      {products.map((p) => (
        <Card className="menu-item" key={p.id}>
          <ProductArt product={p} />
          <div>
            <h3>{p.name}</h3>
            <p>{money(p.price)}</p>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={p.available}
                onChange={(e) => {
                  s.setAvailability(p.id, e.target.checked);
                  notify(`${p.name}: ${e.target.checked ? 'Còn bán' : 'Hết món'}.`);
                }}
              />
              {p.available ? 'Còn bán' : 'Hết món'}
            </label>
            <label className="compact-label">
              Thời gian làm
              <select
                value={p.prepMinutes}
                onChange={(e) => s.setPrepTime(p.id, Number(e.target.value))}
              >
                {[1, 2, 4, 7, 10, 12, 15, 20].map((n) => (
                  <option key={n} value={n}>
                    {n} phút
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Card>
      ))}
    </>
  );
}
export function MerchantToday() {
  const s = useDemoStore();
  const parts = s.merchantOrders.filter(
    (p) =>
      p.merchantId === s.merchantSessionId &&
      s.orders.some((o) => o.id === p.orderId && dateLabel(o.createdAt) === dateLabel(s.demoTime)),
  );
  const m = metrics(parts);
  const accepted = parts
    .filter((p) => p.status === 'ACCEPTED')
    .sort((a, b) => preparation(s, a).startIn - preparation(s, b).startIn);
  return (
    <>
      <Title
        title="Hôm nay tại cửa hàng"
        description={`${dateLabel(s.demoTime)} · Tính từ các phần đơn thuộc cửa hàng này.`}
      />
      <div className="two-col">
        <Metric label="Phần đơn nhận được" value={parts.length} />
        <Metric label="Đã bàn giao" value={parts.filter((p) => p.status === 'PICKED_UP').length} />
        <Metric label="Giá trị đang chờ" value={money(m.pending)} />
        <Metric label="Doanh thu hoàn tất" value={money(m.completed)} />
      </div>
      <Card>
        <div className="row">
          <h3>Đơn cần làm tiếp</h3>
          <strong>
            {parts.filter((p) => ['NEW', 'ACCEPTED', 'PREPARING'].includes(p.status)).length}
          </strong>
        </div>
      </Card>
      <div className="section-heading">
        <h2>Lịch chuẩn bị sắp tới</h2>
      </div>
      {accepted.slice(0, 5).map((p) => (
        <Card key={p.id}>
          <div className="row">
            <strong>{s.orders.find((o) => o.id === p.orderId)?.publicOrderCode}</strong>
            <Pill tone={preparation(s, p).startIn ? 'blue' : 'amber'}>
              {preparation(s, p).startIn ? `Sau ${preparation(s, p).startIn} phút` : 'Đến giờ làm'}
            </Pill>
          </div>
          <p>
            {s.trips.find((t) => t.id === p.tripId)?.company} · Dự kiến đến {preparation(s, p).eta}{' '}
            phút
          </p>
          <TextLink to={`/merchant/orders/${p.id}`}>Mở chi tiết phần đơn</TextLink>
        </Card>
      ))}
      {!accepted.length && (
        <Empty
          title="Chưa có đơn chờ bắt đầu"
          description="Lịch chuẩn bị xuất hiện sau khi cửa hàng nhận đơn."
        />
      )}
    </>
  );
}
