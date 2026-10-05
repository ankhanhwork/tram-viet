import { useEffect, useRef, type ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bus, Check, MapPin, X } from 'lucide-react';
import { create } from 'zustand';
import logo from '../../assets/brand/tram-viet-logo.svg';
import { clock, dateLabel, statusLabels } from '../lib/rules';
import type { OrderStatus, Trip } from '../types';
const useNotice = create<{ message: string; show: (message: string) => void }>((set) => ({
  message: '',
  show: (message) => set({ message }),
}));
export const notify = (message: string) => useNotice.getState().show(message);
export function Toast() {
  const message = useNotice((s) => s.message);
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => useNotice.setState({ message: '' }), 4500);
    return () => clearTimeout(id);
  }, [message]);
  return message ? (
    <div className="toast" role="status">
      <Check size={19} />
      {message}
      <button aria-label="Đóng thông báo" onClick={() => useNotice.setState({ message: '' })}>
        <X size={16} />
      </button>
    </div>
  ) : null;
}
export function Brand({ small = false }: { small?: boolean }) {
  return (
    <img
      className={small ? 'brand small' : 'brand'}
      src={logo}
      alt="Trạm Việt — Bạn đồng hành xuyên Việt"
    />
  );
}
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}
export function Pill({ children, tone = 'blue' }: { children: ReactNode; tone?: string }) {
  return <span className={`pill ${tone}`}>{children}</span>;
}
export function Status({ status }: { status: OrderStatus }) {
  return (
    <Pill
      tone={
        status === 'PICKED_UP' || status === 'READY'
          ? 'green'
          : status === 'REJECTED'
            ? 'red'
            : status === 'PREPARING'
              ? 'amber'
              : 'blue'
      }
    >
      {statusLabels[status]}
    </Pill>
  );
}
export function Title({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function Back({ title, to }: { title: string; to?: string }) {
  const navigate = useNavigate();
  return (
    <div className="page-back">
      {to ? (
        <Link aria-label="Quay lại" className="icon-button" to={to}>
          <ArrowLeft size={20} />
        </Link>
      ) : (
        <button aria-label="Quay lại" className="icon-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </button>
      )}
      <h1>{title}</h1>
    </div>
  );
}
export function Empty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Card className="empty">
      <MapPin size={32} />
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </Card>
  );
}
export function Missing() {
  return (
    <Empty
      title="Không tìm thấy nội dung"
      description="Đường dẫn này không thuộc dữ liệu hiện tại."
      action={
        <Link className="button" to="/">
          Về trang
        </Link>
      }
    />
  );
}
export function Modal({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog ref={ref} onCancel={close} className="modal">
      <div className="modal-heading">
        <h2>{title}</h2>
        <button aria-label="Đóng" className="icon-button" onClick={close}>
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Metric({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: ReactNode;
  detail?: string;
  icon?: ReactNode;
}) {
  return (
    <Card className="metric">
      {icon && <span className="metric-icon">{icon}</span>}
      <p>{label}</p>
      <strong>{value}</strong>
      {detail && <small>{detail}</small>}
    </Card>
  );
}
export function Timeline({ trip }: { trip: Trip }) {
  const location = useLocation();
  const base = location.pathname.startsWith('/t/')
    ? `/t/${trip.publicTripCode}`
    : `/app/trips/${trip.id}`;
  return (
    <ol className="timeline">
      {trip.stops.map((stop, i) => (
        <li
          key={stop.id}
          className={stop.checkedInAt || i === 0 ? 'done' : stop.stationId ? 'station-stop' : ''}
        >
          <span className="timeline-dot">
            {stop.checkedInAt || i === 0 ? <Check size={13} /> : <MapPin size={13} />}
          </span>
          <div>
            {(i === 0 || dateLabel(stop.arrivalAt) !== dateLabel(trip.stops[i - 1].arrivalAt)) && (
              <span className="day-heading">{dateLabel(stop.arrivalAt)}</span>
            )}
            {trip.id === 'preview' ? (
              <strong>{stop.name}</strong>
            ) : (
              <Link className="place-link" to={`${base}/places/${stop.id}`}>
                {stop.name} <ArrowRight size={14} />
              </Link>
            )}
            <p>
              {clock(stop.arrivalAt)}
              {stop.restMinutes > 0 && ` · Nghỉ ${stop.restMinutes} phút`}
            </p>
            {stop.note && <small>{stop.note}</small>}
            {stop.checkedInAt && (
              <Pill tone="green">Đã check-in lúc {clock(stop.checkedInAt)}</Pill>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
export function RouteArt({
  arrived = false,
  progress = 0.66,
  origin = 'Hà Nội',
  destination = 'Ninh Bình',
}: {
  arrived?: boolean;
  progress?: number;
  origin?: string;
  destination?: string;
}) {
  const path = useRef<SVGPathElement>(null);
  const vehicle = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!path.current || !vehicle.current) return;
    const point = path.current.getPointAtLength(
      path.current.getTotalLength() * (arrived ? 1 : Math.max(0, Math.min(1, progress))),
    );
    vehicle.current.style.left = `${(point.x / 420) * 100}%`;
    vehicle.current.style.top = `${(point.y / 200) * 100}%`;
  }, [progress, arrived]);
  return (
    <div className="route-art" aria-label="Minh họa tuyến đường, vị trí xe là">
      <div className="mountain one" />
      <div className="mountain two" />
      <svg
        viewBox="0 0 420 200"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${origin} đến ${destination}`}
      >
        <path
          ref={path}
          d="M107 118 C189 131 145 50 236 70 C260 75 270 88 290 99"
          fill="none"
          stroke="transparent"
        />
        <path
          d="M-10 168 C55 168 25 105 107 118 S145 50 236 70 S278 155 433 20"
          fill="none"
          stroke="white"
          strokeWidth="19"
        />
        <path
          d="M-10 168 C55 168 25 105 107 118 S145 50 236 70 S278 155 433 20"
          fill="none"
          stroke="#1769e0"
          strokeWidth="4"
          strokeDasharray="7 6"
        />
        <circle cx="107" cy="118" r="8" fill="#1769e0" stroke="white" strokeWidth="4" />
        <circle cx="290" cy="99" r="8" fill="#1769e0" stroke="white" strokeWidth="4" />
      </svg>
      <span ref={vehicle} className={`map-bus ${arrived ? 'arrived' : ''}`}>
        <Bus size={22} />
      </span>
      <span className="map-city origin">{origin}</span>
      <span className="map-city destination">{destination}</span>
      <span className="map-tag">Lộ trình</span>
    </div>
  );
}
export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={16} />
    </Link>
  );
}
