import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createSeed, DEFAULT_MERCHANT, MAIN_STATION, MAIN_TRIP } from '../../src/demo/data';
import {
  canTransition,
  commission,
  currentStop,
  etaMinutes,
  metrics,
  orderLabel,
  preparation,
} from '../../src/lib/rules';
const storage = new Map<string, string>();
vi.stubGlobal('localStorage', {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
});
const { useDemoStore } = await import('../../src/store/useDemoStore');
beforeEach(() => {
  useDemoStore.getState().resetDemo();
  useDemoStore.getState().setUser('user-minh');
});
const state = () => useDemoStore.getState();
function checkout(multi = false) {
  state().setGuest('Trần Hà', '');
  const items: [string, number][] = multi
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
  for (const [productId, quantity] of items)
    expect(
      state().addCart(MAIN_TRIP, MAIN_STATION, { productId, quantity, note: 'Không hành' }),
    ).toBeNull();
  const result = state().checkout(MAIN_TRIP, MAIN_STATION, 'Trần Hà', 'MoMo', true);
  expect(result.error).toBeUndefined();
  return state().merchantOrders.filter((p) => p.orderId === result.id);
}
describe('Demo data and accounting', () => {
  it('seeds exact trip and station totals from line items', () => {
    const s = createSeed();
    const main = metrics(s.merchantOrders.filter((p) => p.tripId === MAIN_TRIP));
    expect(main.customers).toBe(17);
    expect(main.total).toBe(1840000);
    expect(metrics(s.merchantOrders).total).toBe(4910000);
    expect(metrics(s.merchantOrders).customers).toBe(47);
    for (const o of s.orders)
      expect(
        s.merchantOrders
          .filter((p) => p.orderId === o.id)
          .reduce((sum, p) => sum + p.items.reduce((v, i) => v + i.price * i.quantity, 0), 0),
      ).toBe(o.total);
    expect(commission(s).earned).toBe(0);
    expect(etaMinutes(s.demoTime, s.trips[0].stops[1].arrivalAt)).toBe(42);
  });
  it('counts a multi-merchant checkout once and waits for each portion', () => {
    const parts = checkout(true);
    expect(parts).toHaveLength(2);
    expect(parts.map((p) => p.total).sort((a, b) => a - b)).toEqual([80000, 180000]);
    const main = metrics(state().merchantOrders.filter((p) => p.tripId === MAIN_TRIP));
    expect(main.customers).toBe(18);
    expect(main.total).toBe(2100000);
    expect(
      orderLabel([
        { ...parts[0], status: 'PICKED_UP' },
        { ...parts[1], status: 'ACCEPTED' },
      ]),
    ).not.toContain('Hoàn tất');
    expect(state().checkout(MAIN_TRIP, MAIN_STATION, 'Trần Hà', 'MoMo', true).error).toBeDefined();
  });
  it('does not commission unapproved owners or non-partner trips', () => {
    const s = createSeed();
    s.merchantOrders[0].status = 'PICKED_UP';
    expect(commission(s, 'user-minh').earned).toBe(5250);
    s.users[0].partnerStatus = 'pending';
    expect(commission(s, 'user-minh').earned).toBe(0);
    s.users[0].partnerStatus = 'approved';
    s.trips[0].commissionEligible = false;
    expect(commission(s, 'user-minh').earned).toBe(0);
  });
});
describe('Merchant capability and fulfillment', () => {
  it('validates order QR, merchant, readiness and check-in before handing over once', () => {
    const [p] = checkout();
    const o = state().orders.find((o) => o.id === p.orderId)!;
    const qr = `tramviet:pickup:${o.id}:${o.pickupToken}`;
    expect(o.pickupToken).toBeTruthy();
    expect(state().confirmPickupQr(p.id, qr)).toBeTruthy();
    state().loginMerchant('comviet@demo.vn', 'demo123');
    expect(state().confirmPickupQr(p.id, qr)).toBeTruthy();
    state().transition(p.id, 'ACCEPTED');
    state().transition(p.id, 'PREPARING');
    state().transition(p.id, 'READY');
    expect(state().confirmPickupQr(p.id, qr)).toBeTruthy();
    state().checkIn(MAIN_TRIP, MAIN_STATION);
    expect(state().confirmPickupQr(p.id, 'tramviet:pickup:wrong:token')).toBeTruthy();
    expect(state().confirmPickupQr(p.id, qr)).toBeNull();
    expect(state().confirmPickupQr(p.id, qr)).toBeTruthy();
    expect(commission(state(), 'user-minh').earned).toBe(9000);
  });
  it('enforces transitions, account ownership, reason and check-in code', () => {
    const [p] = checkout();
    expect(state().transition(p.id, 'ACCEPTED')).toBeTruthy();
    expect(state().loginMerchant('phoviet@demo.vn', 'demo123')).toBe(true);
    expect(state().transition(p.id, 'ACCEPTED')).toBeTruthy();
    state().loginMerchant('comviet@demo.vn', 'demo123');
    expect(state().transition(p.id, 'READY')).toBeTruthy();
    expect(state().transition(p.id, 'REJECTED', '')).toBeTruthy();
    expect(state().transition(p.id, 'ACCEPTED')).toBeNull();
    expect(state().transition(p.id, 'PREPARING')).toBeNull();
    expect(state().transition(p.id, 'READY')).toBeNull();
    expect(state().transition(p.id, 'PICKED_UP', undefined, p.pickupCode)).toBeTruthy();
    expect(state().checkIn(MAIN_TRIP, MAIN_STATION)).toBeNull();
    expect(currentStop(state().trips[0]).stationId).toBe(MAIN_STATION);
    expect(state().transition(p.id, 'PICKED_UP', undefined, 'wrong')).toBeTruthy();
    expect(state().transition(p.id, 'PICKED_UP', undefined, p.pickupCode)).toBeNull();
    expect(commission(state(), 'user-minh').earned).toBe(9000);
    expect(state().transition(p.id, 'PICKED_UP', undefined, p.pickupCode)).toBeTruthy();
    expect(state().checkIn(MAIN_TRIP, MAIN_STATION)).toBeNull();
    expect(commission(state(), 'user-minh').earned).toBe(9000);
  });
  it('requires owner check-in and retains merchant binding', () => {
    state().setUser('user-anh');
    expect(state().checkIn(MAIN_TRIP, MAIN_STATION)).toBeTruthy();
    expect(state().loginMerchant('comviet@demo.vn', 'wrong')).toBe(false);
    expect(state().merchantSessionId).toBeNull();
    state().loginMerchant('comviet@demo.vn', 'demo123');
    expect(state().merchantSessionId).toBe(DEFAULT_MERCHANT);
    state().setAvailability('pho-bo', false);
    expect(state().products.find((p) => p.id === 'pho-bo')!.available).toBe(true);
  });
  it('validates availability again at checkout and preserves accepted snapshots', () => {
    const [p] = checkout();
    state().loginMerchant('comviet@demo.vn', 'demo123');
    state().addCart(MAIN_TRIP, MAIN_STATION, { productId: 'com-ga', quantity: 1, note: '' });
    state().setAvailability('com-ga', false);
    expect(state().checkout(MAIN_TRIP, MAIN_STATION, 'Khách', 'MoMo', true).error).toContain(
      'ngừng bán',
    );
    expect(state().transition(p.id, 'ACCEPTED')).toBeNull();
    expect(state().merchantOrders.find((part) => part.id === p.id)!.total).toBe(180000);
  });
  it('recomputes preparation from one clock and ETA without auto-transitions', () => {
    const [p] = checkout();
    state().loginMerchant('comviet@demo.vn', 'demo123');
    state().transition(p.id, 'ACCEPTED');
    state().advanceTime(10);
    expect(preparation(state(), p).eta).toBe(32);
    expect(preparation(state(), p).startIn).toBe(17);
    state().advanceTime(17);
    expect(preparation(state(), p).startIn).toBe(0);
    expect(state().merchantOrders.find((part) => part.id === p.id)!.status).toBe('ACCEPTED');
    state().delayTrip(MAIN_TRIP, 20);
    expect(preparation(state(), p).startIn).toBe(20);
  });
  it('rejects only NEW, removes rejected value, and leaves printing independent', async () => {
    vi.useFakeTimers();
    const [p] = checkout();
    state().loginMerchant('comviet@demo.vn', 'demo123');
    const before = commission(state(), 'user-minh');
    state().setOption('printError', true);
    const printing = state().printTicket(p.id);
    await vi.advanceTimersByTimeAsync(700);
    await printing;
    expect(state().kitchenTickets[0].status).toBe('FAILED');
    expect(commission(state(), 'user-minh')).toEqual(before);
    state().setOption('printError', false);
    const retry = state().printTicket(p.id);
    await vi.advanceTimersByTimeAsync(700);
    await retry;
    expect(state().kitchenTickets[0].reprintCount).toBe(1);
    expect(state().orders).toHaveLength(48);
    expect(state().transition(p.id, 'REJECTED', 'Hết món')).toBeNull();
    expect(metrics(state().merchantOrders.filter((part) => part.tripId === MAIN_TRIP)).total).toBe(
      1840000,
    );
    expect(state().transition(p.id, 'ACCEPTED')).toBeTruthy();
    vi.useRealTimers();
  });
  it('never permits state skipping or backward movement', () => {
    expect(canTransition('NEW', 'READY')).toBe(false);
    expect(canTransition('READY', 'NEW')).toBe(false);
    expect(canTransition('PICKED_UP', 'PICKED_UP')).toBe(false);
    expect(canTransition('NEW', 'REJECTED')).toBe(true);
  });
});
