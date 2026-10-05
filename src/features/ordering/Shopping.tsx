import { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Coffee,
  Utensils,
  SquareParking,
  Bath,
} from 'lucide-react';
import { Back, Card, Empty, Missing, Pill, Status, Title, notify } from '../../components/ui';
import { useDemoStore } from '../../store/useDemoStore';
import { useTripContext } from '../../lib/hooks';
import { clock, etaMinutes, money, orderLabel, statusLabels, tripStop } from '../../lib/rules';
import type { Category, MerchantOrder, Product } from '../../types';
import { OrderQr } from '../../components/OrderQr';
import { pickupEstimate } from '../../lib/journey';
const productImages: Record<string, string> = {
  'com-ga': 'chicken-rice',
  'pho-bo': 'beef-pho',
  'cafe-sua': 'coffee',
  'com-cafe': 'coffee',
  'banh-mi': 'banh-mi',
  'com-nuoc': 'water',
  'pho-nuoc': 'water',
  'com-chay': 'rice-crackers',
};
const categories: Record<Category, string> = {
  FOOD: 'Món ăn',
  DRINK: 'Đồ uống',
  SPECIALTY: 'Đặc sản',
  CONVENIENCE: 'Tiện ích',
};
export function ProductArt({ product, large = false }: { product: Product; large?: boolean }) {
  return (
    <div className={`product-art ${product.category.toLowerCase()} ${large ? 'large' : ''}`}>
      {productImages[product.id] ? (
        <img
          src={`/images/${productImages[product.id]}.webp`}
          alt={product.name}
          loading={large ? 'eager' : 'lazy'}
        />
      ) : (
        <span aria-hidden="true">{product.illustration}</span>
      )}
      {!large && (
        <span className={`availability ${product.available ? 'in-stock' : 'out-stock'}`}>
          {product.available ? 'Còn hàng' : 'Hết món'}
        </span>
      )}
    </div>
  );
}
export function StationDetail() {
  const { data: s, station, trip, base, guest } = useTripContext();
  if (!trip || !station) return <Missing />;
  if (guest && !s.guest) return <Navigate to={base} replace />;
  const stop = trip.stops.find((p) => p.stationId === station.id);
  const catalog = `${base}/station/${station.id}/catalog`;
  return (
    <>
      <Back title="Khám phá trạm dừng" to={guest ? `${base}/journey` : base} />
      <div className="station-cover">
        <img
          src="/images/station-ninh-binh.webp"
          alt="Khu nhà hàng tại trạm dừng giữa cảnh quan núi đá"
        />
        <Pill tone="green">{station.partner ? 'Trạm đối tác' : 'Điểm dừng tham khảo'}</Pill>
      </div>
      <Title title={station.name} description={station.address} />
      <p>{station.description}</p>
      {stop && (
        <Card className="blue-card">
          <div className="row">
            <span>
              <Clock size={17} />
              Dự kiến đến {clock(stop.arrivalAt)}
            </span>
            <strong>
              {stop.checkedInAt ? 'Đã check-in' : `${etaMinutes(s.demoTime, stop.arrivalAt)} phút`}
            </strong>
          </div>
          <small>Nghỉ {stop.restMinutes} phút · Chuẩn bị trước khi xe tới</small>
        </Card>
      )}
      <div className="facility-grid">
        {station.facilities.map((f) => {
          const Icon = f.includes('WC')
            ? Bath
            : f.includes('phê')
              ? Coffee
              : f.includes('đỗ')
                ? SquareParking
                : Utensils;
          return (
            <div key={f}>
              <Icon size={25} />
              <strong>{f}</strong>
            </div>
          );
        })}
      </div>
      <div className="section-heading">
        <h2>Thực đơn nổi bật</h2>
        <Link className="text-link" to={catalog}>
          Xem thực đơn
        </Link>
      </div>
      <div className="featured-food">
        {s.products
          .filter((p) => p.stationId === station.id && p.available && productImages[p.id])
          .slice(0, 4)
          .map((p) => (
            <Link key={p.id} to={`${base}/station/${station.id}/products/${p.id}`}>
              <ProductArt product={p} />
              <strong>{p.name}</strong>
              <small>{money(p.price)}</small>
            </Link>
          ))}
      </div>
      <div className="section-heading">
        <h2>Các cửa hàng tại trạm</h2>
      </div>
      {s.merchants
        .filter((m) => m.stationId === station.id)
        .map((m) => (
          <Card className="merchant-summary" key={m.id}>
            <span className="metric-icon">
              <Store size={22} />
            </span>
            <div>
              <h3>{m.name}</h3>
              <p>
                Quầy {m.counter} · {m.acceptingOrders ? 'Đang nhận đơn' : 'Tạm nghỉ'}
              </p>
            </div>
            <Link
              className="icon-button"
              to={`${catalog}?merchant=${m.id}`}
              aria-label={`Xem sản phẩm ${m.name}`}
            >
              <ArrowRight size={19} />
            </Link>
          </Card>
        ))}
      {!s.merchants.some((m) => m.stationId === station.id) ? (
        <Card>
          <p>Trạm có trong lịch trình. Cửa hàng tại đây chưa mở nhận đơn trực tuyến.</p>
          {!stop && (
            <p>Trạm này chưa nằm trong chuyến. Bạn có thể thêm khi tạo hoặc sửa lịch trình.</p>
          )}
        </Card>
      ) : stop ? (
        <Link className="button full" to={catalog}>
          Khám phá sản phẩm <ShoppingBag size={17} />
        </Link>
      ) : (
        <Card>
          <p>Thêm trạm vào lịch trình trước khi đặt món.</p>
          <Link
            className="button secondary full"
            to={trip.ownerId === s.currentUserId ? `${base}/edit` : '/app/trips/new'}
          >
            Điều chỉnh lịch trình
          </Link>
        </Card>
      )}
    </>
  );
}
export function Catalog() {
  const { data: s, trip, station, base, guest } = useTripContext();
  const [category, setCategory] = useState<Category | 'ALL'>('ALL');
  const [query, setQuery] = useState('');
  const [merchant, setMerchant] = useState(
    new URLSearchParams(window.location.search).get('merchant') ?? 'ALL',
  );
  if (!trip || !station) return <Missing />;
  if (guest && !s.guest) return <Navigate to={base} replace />;
  const url = `${base}/station/${station.id}`;
  const products = s.products.filter(
    (p) =>
      p.stationId === station.id &&
      (category === 'ALL' || p.category === category) &&
      (merchant === 'ALL' || p.merchantId === merchant) &&
      p.name.toLocaleLowerCase('vi').includes(query.toLocaleLowerCase('vi')),
  );
  const cart = s.cartTripId === trip.id && s.cartStationId === station.id ? s.cart : [];
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const stop = trip.stops.find((st) => st.stationId === station.id);
  return (
    <>
      <Back title="Chọn món cho điểm dừng" to={url} />
      <div className="catalog-context">
        <MapPin size={17} />
        <strong>{station.name}</strong>
        <small>
          {stop?.checkedInAt
            ? 'Xe đã đến'
            : stop
              ? `Còn ${etaMinutes(s.demoTime, stop.arrivalAt)} phút`
              : 'Chưa có trong lịch trình'}
        </small>
      </div>
      <label className="sr-only" htmlFor="catalog-search">
        Tìm sản phẩm
      </label>
      <input
        id="catalog-search"
        type="search"
        placeholder="Bạn muốn ăn hay mua gì?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="tabs category-tabs">
        <button className={category === 'ALL' ? 'active' : ''} onClick={() => setCategory('ALL')}>
          Tất cả
        </button>
        {Object.entries(categories).map(([id, label]) => (
          <button
            className={category === id ? 'active' : ''}
            key={id}
            onClick={() => setCategory(id as Category)}
          >
            {label}
          </button>
        ))}
      </div>
      <label className="compact-label">
        Cửa hàng
        <select value={merchant} onChange={(e) => setMerchant(e.target.value)}>
          <option value="ALL">Tất cả các quầy</option>
          {s.merchants
            .filter((m) => m.stationId === station.id)
            .map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} · {m.counter}
              </option>
            ))}
        </select>
      </label>
      {s.merchants
        .filter((m) => products.some((p) => p.merchantId === m.id))
        .map((group) => (
          <section className="menu-group" key={group.id}>
            <div className="section-heading">
              <h2>{group.name}</h2>
              <Pill>Quầy {group.counter}</Pill>
            </div>
            <div className="product-grid">
              {products
                .filter((p) => p.merchantId === group.id)
                .map((p) => {
                  const m = s.merchants.find((m) => m.id === p.merchantId)!;
                  const enabled = p.available && m.acceptingOrders && Boolean(stop);
                  return (
                    <Card className={`product-card ${!enabled ? 'unavailable' : ''}`} key={p.id}>
                      <Link
                        to={`${url}/products/${p.id}`}
                        aria-label={`Xem ${p.name} tại ${m.name}`}
                      >
                        <ProductArt product={p} />
                        <div className="product-card-content">
                          <h3>{p.name}</h3>
                          <small>
                            {m.name} · {m.counter}
                          </small>
                          <p>
                            <Clock size={13} />
                            {p.prepMinutes} phút chuẩn bị
                          </p>
                        </div>
                      </Link>
                      <div className="product-bottom">
                        <strong>{money(p.price)}</strong>
                        <button
                          disabled={!enabled}
                          className="icon-button add-button"
                          aria-label={`Thêm ${p.name} tại ${m.name}`}
                          onClick={() => {
                            const error = s.addCart(trip.id, station.id, {
                              productId: p.id,
                              quantity: 1,
                              note: '',
                            });
                            notify(error ?? `Đã thêm ${p.name} vào giỏ.`);
                          }}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                      {!enabled && (
                        <small className="unavailable-label">
                          {!p.available
                            ? 'Hết món'
                            : !m.acceptingOrders
                              ? 'Quầy tạm nghỉ'
                              : 'Trạm chưa trong lịch trình'}
                        </small>
                      )}
                    </Card>
                  );
                })}
            </div>
          </section>
        ))}
      {!products.length && (
        <Empty
          title="Chưa tìm thấy sản phẩm"
          description="Thử đổi danh mục, cửa hàng hoặc từ khóa tìm kiếm."
        />
      )}
      {count > 0 && (
        <Link className="button cart-bar" to={`${url}/cart`}>
          <span>
            <ShoppingBag size={19} />
            {count} sản phẩm
          </span>
          <span>
            Xem giỏ <ArrowRight size={17} />
          </span>
        </Link>
      )}
    </>
  );
}
export function ProductDetail() {
  const { data: s, trip, station, base, guest } = useTripContext();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const navigate = useNavigate();
  const product = s.products.find((p) => p.id === productId && p.stationId === station?.id);
  if (!trip || !station || !product) return <Missing />;
  if (guest && !s.guest) return <Navigate to={base} replace />;
  const merchant = s.merchants.find((m) => m.id === product.merchantId)!;
  const url = `${base}/station/${station.id}`;
  const available = product.available && merchant.acceptingOrders;
  return (
    <>
      <Back title="Chi tiết sản phẩm" to={`${url}/catalog`} />
      <ProductArt product={product} large />
      <div className="section-heading">
        <div>
          <h1>{product.name}</h1>
          <p>
            {merchant.name} · Quầy {merchant.counter}
          </p>
        </div>
        <strong className="price">{money(product.price)}</strong>
      </div>
      <Pill tone={available ? 'green' : 'orange'}>{available ? 'Còn hàng' : 'Tạm hết món'}</Pill>
      <p>{product.description}</p>
      <Card className="blue-card">
        <div className="row">
          <span>
            <Clock size={17} />
            Chuẩn bị / đóng gói
          </span>
          <strong>{product.prepMinutes} phút</strong>
        </div>
        <div className="row">
          <span>
            <MapPin size={17} />
            Nhận tại quầy
          </span>
          <strong>{merchant.counter}</strong>
        </div>
      </Card>
      <Card>
        <div className="row">
          <h3>Số lượng</h3>
          <Quantity
            quantity={quantity}
            decrease={() => setQuantity(Math.max(1, quantity - 1))}
            increase={() => setQuantity(quantity + 1)}
          />
        </div>
        <label>
          Ghi chú cho cửa hàng
          <textarea
            placeholder="Ví dụ: không hành, ít đá…"
            value={note}
            maxLength={200}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>
      </Card>
      <button
        className="button full"
        disabled={!available}
        onClick={() => {
          const error = s.addCart(trip.id, station.id, { productId: product.id, quantity, note });
          if (error) return notify(error);
          notify('Đã thêm sản phẩm vào giỏ.');
          navigate(`${url}/catalog`);
        }}
      >
        {available
          ? `Thêm vào giỏ · ${money(product.price * quantity)}`
          : 'Sản phẩm đang ngừng bán'}{' '}
        <ShoppingBag size={17} />
      </button>
    </>
  );
}
function Quantity({
  quantity,
  decrease,
  increase,
}: {
  quantity: number;
  decrease: () => void;
  increase: () => void;
}) {
  return (
    <div className="quantity">
      <button aria-label="Giảm số lượng" onClick={decrease}>
        <Minus size={15} />
      </button>
      <strong>{quantity}</strong>
      <button aria-label="Tăng số lượng" onClick={increase}>
        <Plus size={15} />
      </button>
    </div>
  );
}
export function Cart({ checkout = false }: { checkout?: boolean }) {
  const { data: s, trip, station, base, guest } = useTripContext();
  const navigate = useNavigate();
  const [name, setName] = useState(
    guest ? (s.guest?.name ?? '') : (s.users.find((u) => u.id === s.currentUserId)?.name ?? ''),
  );
  const [payment, setPayment] = useState('MoMo');
  const [loading, setLoading] = useState(false);
  if (!trip || !station) return <Missing />;
  if (guest && !s.guest) return <Navigate to={base} replace />;
  const url = `${base}/station/${station.id}`;
  const cart = s.cartTripId === trip.id && s.cartStationId === station.id ? s.cart : [];
  const total = cart.reduce(
    (sum, i) => sum + (s.products.find((p) => p.id === i.productId)?.price ?? 0) * i.quantity,
    0,
  );
  const merchants = s.merchants.filter((m) =>
    cart.some((i) => s.products.find((p) => p.id === i.productId)?.merchantId === m.id),
  );
  const unavailable = cart.some((i) => {
    const p = s.products.find((p) => p.id === i.productId);
    return !p?.available || !s.merchants.find((m) => m.id === p.merchantId)?.acceptingOrders;
  });
  const stop = trip.stops.find((st) => st.stationId === station.id);
  const estimate = stop ? pickupEstimate(trip, stop, s.demoTime) : null;
  async function pay() {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 850));
    const result = useDemoStore.getState().checkout(trip!.id, station!.id, name, payment, guest);
    setLoading(false);
    if (result.error) return notify(result.error);
    notify('Thanh toán thành công.');
    navigate(
      guest ? `${base}/orders/${result.id}?success=1` : `/app/orders/${result.id}?success=1`,
    );
  }
  return (
    <>
      <Back
        title={checkout ? 'Xác nhận đặt trước' : 'Giỏ hàng của bạn'}
        to={checkout ? `${url}/cart` : `${url}/catalog`}
      />
      {!cart.length ? (
        <Empty
          title="Giỏ hàng đang trống"
          description="Chọn món ăn, đồ uống hoặc đặc sản để nhận tại điểm dừng."
          action={
            <Link className="button" to={`${url}/catalog`}>
              Khám phá sản phẩm
            </Link>
          }
        />
      ) : (
        <>
          <Card className="blue-card">
            <h3>{station.name}</h3>
            <p>
              {stop?.checkedInAt
                ? 'Xe đã đến trạm'
                : `Dự kiến ${stop ? clock(estimate?.arrivalAt ?? stop.arrivalAt) : '—'}`}{' '}
              · Nhận tại {merchants.length} quầy
            </p>
            <p>
              {estimate &&
                !stop?.checkedInAt &&
                `Còn khoảng ${estimate.distance} km · ${estimate.minutes} phút di chuyển`}
            </p>
          </Card>
          {merchants.map((m) => (
            <Card key={m.id}>
              <div className="row">
                <h3>{m.name}</h3>
                <Pill>Quầy {m.counter}</Pill>
              </div>
              {cart
                .filter((i) => s.products.find((p) => p.id === i.productId)?.merchantId === m.id)
                .map((i) => {
                  const p = s.products.find((p) => p.id === i.productId)!;
                  return (
                    <div className="cart-item" key={i.productId}>
                      <div className="cart-photo">
                        <ProductArt product={p} />
                      </div>
                      <div>
                        <strong>{p.name}</strong>
                        <small>
                          {money(p.price)}
                          {i.note && ` · ${i.note}`}
                        </small>
                        {(!p.available || !m.acceptingOrders) && (
                          <small className="error-text">Đã ngừng bán. Vui lòng bỏ món.</small>
                        )}
                        <Quantity
                          quantity={i.quantity}
                          decrease={() => s.setCartQuantity(i.productId, i.quantity - 1)}
                          increase={() => s.setCartQuantity(i.productId, i.quantity + 1)}
                        />
                      </div>
                      <strong>{money(p.price * i.quantity)}</strong>
                    </div>
                  );
                })}
            </Card>
          ))}
          {unavailable && (
            <div className="alert warning">
              Có món hoặc quầy ngừng bán. Bỏ món đó khỏi giỏ để tiếp tục.
            </div>
          )}
          {checkout && (
            <Card>
              <h2>Thông tin nhận hàng</h2>
              <label>
                Họ tên người nhận
                <input required value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <h3>Thanh toán</h3>
              {['MoMo', 'VNPay', 'Thẻ ngân hàng'].map((p) => (
                <label className="selection-card" key={p}>
                  <input
                    type="radio"
                    name="payment"
                    value={p}
                    checked={payment === p}
                    onChange={() => setPayment(p)}
                  />
                  <span>{p}</span>
                </label>
              ))}
              <p className="fine-print">Nhận món tại từng quầy bằng QR của đơn hàng.</p>
            </Card>
          )}
          <Card>
            <div className="row">
              <span>Tạm tính</span>
              <strong>{money(total)}</strong>
            </div>
            <div className="row">
              <span>Phí dịch vụ</span>
              <strong>0 ₫</strong>
            </div>
            <div className="row total-row">
              <h3>Tổng thanh toán</h3>
              <strong>{money(total)}</strong>
            </div>
          </Card>
          {checkout ? (
            <button
              className="button full"
              disabled={unavailable || loading || !name.trim()}
              onClick={() => void pay()}
            >
              {loading ? 'Đang thanh toán…' : `Thanh toán · ${money(total)}`}
            </button>
          ) : (
            <>
              <Link
                className={`button full ${unavailable ? 'disabled-link' : ''}`}
                aria-disabled={unavailable}
                onClick={(e) => {
                  if (unavailable) e.preventDefault();
                }}
                to={`${url}/checkout`}
              >
                Tiếp tục thanh toán <ArrowRight size={17} />
              </Link>
              <Link className="text-link center" to={`${url}/catalog`}>
                Thêm sản phẩm khác
              </Link>
            </>
          )}
        </>
      )}
    </>
  );
}
export function CustomerOrders() {
  const s = useDemoStore();
  const orders = s.orders.filter((o) => o.customerUserId === s.currentUserId);
  return (
    <>
      <Title title="Đơn hàng của tôi" description="Theo dõi món và mã nhận riêng tại từng quầy." />
      {orders.length === 0 && (
        <Empty
          title="Chưa có đơn đặt trước"
          description="Món ngon sẽ sẵn sàng khi bạn đến điểm dừng."
          action={
            <Link
              className="button"
              to={`/app/trips/${s.trips[0].id}/station/${s.stations[0].id}/catalog`}
            >
              Chọn món ngay
            </Link>
          }
        />
      )}{' '}
      {orders.map((o) => (
        <Link className="card order-list-card" key={o.id} to={`/app/orders/${o.id}`}>
          <div className="row">
            <h3>{o.publicOrderCode}</h3>
            <Pill>{orderLabel(s.merchantOrders.filter((p) => p.orderId === o.id))}</Pill>
          </div>
          <p>{s.stations.find((st) => st.id === o.stationId)?.name}</p>
          <div className="row">
            <span>
              {o.merchantOrderIds.length} quầy · {clock(o.createdAt)}
            </span>
            <strong>{money(o.total)}</strong>
          </div>
        </Link>
      ))}
    </>
  );
}
export function OrderTracking() {
  const { data: s, guest, trip, base } = useTripContext();
  const { orderId } = useParams();
  const order = s.orders.find((o) => o.id === orderId || o.publicOrderCode === orderId);
  const permitted =
    order &&
    (guest
      ? order.tripId === trip?.id &&
        (order.guestSessionId === s.guest?.id || order.publicOrderCode === orderId)
      : order.customerUserId === s.currentUserId);
  if (!order || !permitted) return <Missing />;
  const parts = s.merchantOrders.filter((p) => p.orderId === order.id);
  const success = new URLSearchParams(window.location.search).has('success');
  return (
    <>
      <Back title="Theo dõi đơn hàng" to={guest ? `${base}/journey` : '/app/orders'} />
      {success && (
        <div className="order-success">
          <CheckCircle2 size={44} />
          <h1>Đặt trước thành công!</h1>
          <p>Món của bạn đang được chuyển tới cửa hàng.</p>
        </div>
      )}
      <Card>
        <div className="row">
          <h2>{order.publicOrderCode}</h2>
          <Pill tone="green">Đã thanh toán</Pill>
        </div>
        <p>
          {order.customerName} · {clock(order.createdAt)}
        </p>
        <p>{s.stations.find((st) => st.id === order.stationId)?.name}</p>
        <div className="row">
          <span>{orderLabel(parts)}</span>
          <strong>{money(order.total)}</strong>
        </div>
      </Card>
      <OrderQr order={order} />
      <div className="alert">
        <MapPin size={19} />
        <span>
          {parts.some((p) => tripStop(s, p)?.checkedInAt)
            ? 'Xe đã check-in. Đến đúng quầy khi món sẵn sàng và đưa mã nhận.'
            : 'Cửa hàng chuẩn bị món theo giờ xe đến. Bạn sẽ nhận món khi xe đến trạm.'}
        </span>
      </div>
      {parts.map((p) => (
        <CustomerPortion key={p.id} part={p} />
      ))}
      <p className="fine-print">
        Nếu một quầy từ chối, bạn sẽ thấy lý do ở phần đơn của quầy đó. Liên hệ cửa hàng để được hỗ
        trợ.
      </p>
    </>
  );
}
function CustomerPortion({ part: p }: { part: MerchantOrder }) {
  const s = useDemoStore();
  const m = s.merchants.find((m) => m.id === p.merchantId)!;
  const stop = tripStop(s, p);
  return (
    <Card className="customer-portion">
      <div className="row">
        <div>
          <h2>{m.name}</h2>
          <p>Quầy {m.counter}</p>
        </div>
        <Status status={p.status} />
      </div>
      {p.items.map((i) => (
        <div className="row line-item" key={i.productId}>
          <span>
            {i.quantity} × {i.name}
            {i.note && <small>{i.note}</small>}
          </span>
          <strong>{money(i.price * i.quantity)}</strong>
        </div>
      ))}
      <div className="pickup-code">
        <span>Đưa QR nhận hàng tại quầy</span>
        <strong>{m.counter}</strong>
      </div>
      {p.status === 'READY' && (
        <p className="success-text">
          <Check size={16} />
          {stop?.checkedInAt
            ? 'Món đã sẵn sàng. Mời bạn đến quầy nhận.'
            : 'Món đã sẵn sàng, chờ xe đến trạm.'}
        </p>
      )}
      {p.status === 'REJECTED' && (
        <div className="alert warning">
          Lý do: {p.rejectionReason}. Phần thanh toán {money(p.total)} sẽ được hoàn tiền.
        </div>
      )}
      <details>
        <summary>Lịch sử xử lý</summary>
        <ul className="history-list">
          {p.history.map((h, i) => (
            <li key={i}>
              {statusLabels[h.status]}
              <span>{clock(h.at)}</span>
            </li>
          ))}
        </ul>
      </details>
    </Card>
  );
}
export function LookupOrder() {
  const { trip, base } = useTripContext();
  const [code, setCode] = useState('');
  const s = useDemoStore();
  const navigate = useNavigate();
  if (!trip) return <Missing />;
  return (
    <>
      <Back title="Tra cứu đơn hàng" to={`${base}/journey`} />
      <Card>
        <h2>Nhập mã đơn của bạn</h2>
        <p>Mã bắt đầu bằng TV-, hiển thị sau khi thanh toán.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const order = s.orders.find(
              (o) => o.publicOrderCode === code.trim().toUpperCase() && o.tripId === trip.id,
            );
            if (!order) return notify('Chưa tìm thấy mã đơn trong chuyến này.');
            navigate(`${base}/orders/${order.publicOrderCode}`);
          }}
        >
          <label>
            Mã đơn
            <input
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="TV-…"
            />
          </label>
          <button className="button full">Tra cứu đơn</button>
        </form>
      </Card>
    </>
  );
}
