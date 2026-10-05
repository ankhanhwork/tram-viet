import type { DemoData, MerchantOrder, OrderStatus, Trip } from '../types';
export const statusLabels: Record<OrderStatus, string> = {
  NEW: 'Mới',
  ACCEPTED: 'Đã nhận',
  PREPARING: 'Đang làm',
  READY: 'Sẵn sàng',
  PICKED_UP: 'Đã bàn giao',
  REJECTED: 'Từ chối',
};
export const nextStatus: Partial<Record<OrderStatus, OrderStatus>> = {
  NEW: 'ACCEPTED',
  ACCEPTED: 'PREPARING',
  PREPARING: 'READY',
  READY: 'PICKED_UP',
};
export function canTransition(from: OrderStatus, to: OrderStatus) {
  return nextStatus[from] === to || (from === 'NEW' && to === 'REJECTED');
}
export function tripStop(data: Pick<DemoData, 'trips'>, part: MerchantOrder) {
  return data.trips.find((t) => t.id === part.tripId)?.stops.find((s) => s.id === part.tripStopId);
}
export function etaMinutes(time: string, arrivalAt: string) {
  return Math.max(0, Math.ceil((Date.parse(arrivalAt) - Date.parse(time)) / 60000));
}
export function preparation(data: Pick<DemoData, 'trips' | 'demoTime'>, part: MerchantOrder) {
  const stop = tripStop(data, part);
  const eta = stop?.checkedInAt ? 0 : etaMinutes(data.demoTime, stop?.arrivalAt ?? data.demoTime);
  return {
    eta,
    startIn: Math.max(0, eta - part.prepMinutes - part.bufferMinutes),
    late:
      !stop?.checkedInAt &&
      eta < part.prepMinutes &&
      part.status !== 'READY' &&
      part.status !== 'PICKED_UP',
  };
}
export function metrics(parts: MerchantOrder[]) {
  const active = parts.filter((p) => p.status !== 'REJECTED');
  const completed = active.filter((p) => p.status === 'PICKED_UP').reduce((s, p) => s + p.total, 0);
  const total = active.reduce((s, p) => s + p.total, 0);
  return {
    customers: new Set(active.map((p) => p.orderId)).size,
    portions: active.length,
    total,
    pending: total - completed,
    completed,
    ready: active.filter((p) => p.status === 'READY').length,
  };
}
export function commission(
  data: Pick<DemoData, 'users' | 'trips' | 'merchantOrders'>,
  ownerId?: string,
) {
  const eligible = data.merchantOrders.filter((p) => {
    const trip = data.trips.find((t) => t.id === p.tripId);
    const owner = data.users.find((u) => u.id === trip?.ownerId);
    return (
      trip?.partnerTrip &&
      trip.commissionEligible &&
      owner?.partnerStatus === 'approved' &&
      (!ownerId || ownerId === trip.ownerId)
    );
  });
  const m = metrics(eligible);
  return { ...m, earned: Math.round(m.completed * 0.05), expected: Math.round(m.pending * 0.05) };
}
export function orderLabel(parts: MerchantOrder[]) {
  if (!parts.length) return 'Không có phần đơn';
  if (parts.every((p) => p.status === 'REJECTED')) return 'Đã từ chối';
  const active = parts.filter((p) => p.status !== 'REJECTED');
  if (active.every((p) => p.status === 'PICKED_UP'))
    return parts.some((p) => p.status === 'REJECTED')
      ? 'Hoàn tất · có phần bị từ chối'
      : 'Hoàn tất';
  if (active.every((p) => ['READY', 'PICKED_UP'].includes(p.status))) return 'Sẵn sàng nhận';
  return `${active.filter((p) => p.status === 'PICKED_UP').length}/${active.length} quầy đã bàn giao`;
}
export function currentStop(trip: Trip) {
  if (trip.status === 'ARRIVED') return trip.stops.at(-1)!;
  if (trip.status === 'AT_STATION') {
    const checked = trip.stops.filter((s) => s.checkedInAt).at(-1);
    if (checked) return checked;
  }
  return trip.stops.find((s) => s.stationId && !s.checkedInAt) ?? trip.stops.at(-1)!;
}
export function segmentProgress(trip: Trip, demoTime: string) {
  if (trip.status === 'READY') return 0;
  if (trip.status === 'AT_STATION' || trip.status === 'ARRIVED') return 1;
  const stop = currentStop(trip);
  const previous = trip.stops[Math.max(0, trip.stops.findIndex((s) => s.id === stop.id) - 1)];
  const duration = Date.parse(stop.arrivalAt) - Date.parse(previous.arrivalAt);
  return duration > 0
    ? Math.max(0, Math.min(1, (Date.parse(demoTime) - Date.parse(previous.arrivalAt)) / duration))
    : 0;
}
export const money = (value: number) =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
export const clock = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(value));
export const dateLabel = (value: string) =>
  new Intl.DateTimeFormat('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(new Date(value));
