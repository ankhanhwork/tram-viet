import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  Bus,
  ChartNoAxesCombined,
  ChevronLeft,
  ClipboardList,
  Home,
  LayoutDashboard,
  Map,
  Settings,
  Store,
  UserRound,
  Wallet,
} from 'lucide-react';
import { useDemoStore } from '../store/useDemoStore';
import { Brand, Toast } from './ui';
import { clock, dateLabel } from '../lib/rules';
export function RootLayout() {
  return (
    <>
      <Outlet />
      <Toast />
    </>
  );
}
export function MobileLayout({ guest = false }: { guest?: boolean }) {
  const s = useDemoStore();
  const user = s.users.find((u) => u.id === s.currentUserId)!;
  return (
    <div className="mobile-stage">
      <div className="preview-label">
        {guest ? 'Guest QR Web · Trình duyệt mobile' : 'Travel App · Trải nghiệm mobile'}
        <Link to="/">
          Các giao diện <ChevronLeft size={13} />
        </Link>
      </div>
      <div className={`mobile-shell ${guest ? 'guest-shell' : ''}`}>
        <header className="mobile-header">
          <Link to={guest ? '/' : '/app'}>
            <Brand small />
          </Link>
        </header>
        <main className="mobile-content">
          <Outlet />
        </main>
        {!guest && (
          <nav className="bottom-nav" aria-label="Travel App">
            <NavLink to="/app" end>
              <Home size={20} />
              Trang chủ
            </NavLink>
            <NavLink to="/app/trips">
              <Map size={20} />
              Chuyến đi
            </NavLink>
            <NavLink to="/app/orders">
              <ClipboardList size={20} />
              Đơn hàng
            </NavLink>
            {user.partnerStatus === 'approved' && (
              <NavLink to="/app/earnings">
                <Wallet size={20} />
                Thu nhập
              </NavLink>
            )}
            <NavLink to="/app/profile">
              <UserRound size={20} />
              Hồ sơ
            </NavLink>
          </nav>
        )}
      </div>
    </div>
  );
}
export function MerchantLayout() {
  const s = useDemoStore();
  if (!s.merchantSessionId) return <Navigate to="/merchant/login" replace />;
  const m = s.merchants.find((m) => m.id === s.merchantSessionId)!;
  return (
    <div className="mobile-stage pos-stage">
      <div className="preview-label">
        Merchant · Terminal POS<Link to="/">Các giao diện</Link>
      </div>
      <div className="mobile-shell pos-shell">
        <header className="pos-header">
          <div>
            <span className="eyebrow">TRẠM VIỆT MERCHANT</span>
            <h2>{m.name}</h2>
            <p>Quầy {m.counter} · Ninh Bình</p>
            <small>{m.username}</small>
          </div>
          <button className="link-button" onClick={s.logoutMerchant}>
            Đăng xuất
          </button>
        </header>
        <div className="pos-status">
          <button
            onClick={s.toggleAccepting}
            className={`pill ${m.acceptingOrders ? 'green' : 'amber'}`}
          >
            {m.acceptingOrders ? '● Đang nhận đơn' : '● Tạm nghỉ'}
          </button>
          <span>
            {clock(s.demoTime)} · {dateLabel(s.demoTime)}
          </span>
        </div>
        <main className="mobile-content">
          <Outlet />
        </main>
        <nav className="bottom-nav" aria-label="Merchant">
          <NavLink to="/merchant/orders">
            <ClipboardList size={21} />
            Đơn hàng
          </NavLink>
          <NavLink to="/merchant/menu">
            <Store size={21} />
            Thực đơn
          </NavLink>
          <NavLink to="/merchant/today">
            <ChartNoAxesCombined size={21} />
            Hôm nay
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
const stationLinks = [
  ['', 'Tổng quan', LayoutDashboard],
  ['vehicles', 'Xe sắp đến', Bus],
  ['orders', 'Đơn đặt trước', ClipboardList],
  ['sales', 'Doanh thu', ChartNoAxesCombined],
  ['partners', 'Đối tác', UserRound],
  ['settings', 'Cài đặt', Settings],
] as const;
export function StationLayout() {
  const s = useDemoStore();
  const location = useLocation();
  if (!s.stationLoggedIn)
    return <Navigate to="/station/login" state={{ from: location.pathname }} replace />;
  return (
    <div className="station-shell">
      <aside className="station-sidebar">
        <Link to="/">
          <Brand />
        </Link>
        <span className="sidebar-label">STATION PORTAL</span>
        <nav aria-label="Station Portal">
          {stationLinks.map(([path, label, Icon]) => (
            <NavLink key={path} to={`/station${path ? `/${path}` : ''}`} end={!path}>
              <Icon size={21} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <p>
            Kết nối hành trình.
            <br />
            Lan tỏa giá trị Việt.
          </p>
          <Link to="/">← Các giao diện</Link>
        </div>
      </aside>
      <div className="station-body">
        <header className="station-header">
          <span>
            <Store size={19} /> Trạm Việt Ninh Bình
          </span>
          <div>
            <span className="avatar">NT</span>
            <div>
              <strong>Nguyễn Thanh Tùng</strong>
              <small>Quản lý trạm</small>
            </div>
          </div>
        </header>
        <main className="station-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
