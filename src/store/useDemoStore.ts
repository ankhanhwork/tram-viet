import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createSeed, MAIN_TRIP } from '../demo/data';
import { canTransition, currentStop, tripStop } from '../lib/rules';
import type {
  CartItem,
  DemoData,
  GuestSession,
  MerchantOrder,
  Order,
  OrderStatus,
  Trip,
  User,
} from '../types';
interface Actions {
  setUser: (id: string) => void;
  saveUser: (user: User) => void;
  setGuest: (name: string, phone: string) => void;
  loginMerchant: (username: string, password: string) => boolean;
  logoutMerchant: () => void;
  loginStation: () => void;
  joinTrip: (id: string, leave?: boolean) => void;
  saveTrip: (trip: Trip) => void;
  checkIn: (tripId: string, stationId: string, controller?: boolean) => string | null;
  setTripStatus: (id: string, status: Trip['status']) => void;
  advanceTime: (minutes: number) => void;
  delayTrip: (id: string, minutes: number) => void;
  addCart: (tripId: string, stationId: string, item: CartItem) => string | null;
  setCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: (
    tripId: string,
    stationId: string,
    name: string,
    paymentMethod: string,
    guest: boolean,
  ) => { id?: string; error?: string };
  transition: (id: string, status: OrderStatus, reason?: string, code?: string) => string | null;
  confirmPickupQr: (id: string, payload: string) => string | null;
  setAvailability: (id: string, available: boolean) => void;
  setPrepTime: (id: string, minutes: number) => void;
  toggleAccepting: () => void;
  printTicket: (id: string) => Promise<void>;
  setOption: (key: 'autoPrint' | 'printError' | 'sound' | 'appInstalled', value: boolean) => void;
  resetDemo: () => void;
  openMerchantDemo: (id: string) => void;
}
export type DemoStore = DemoData & Actions;
const newId = () => crypto.randomUUID();
const printTasks = new Map<string, Promise<void>>();
export const useDemoStore = create<DemoStore>()(
  persist(
    (set, get) => ({
      ...createSeed(),
      setUser: (id) => {
        if (get().users.some((u) => u.id === id))
          set({ currentUserId: id, cart: [], cartTripId: null, cartStationId: null });
      },
      saveUser: (user) =>
        set((s) => ({
          users: [...s.users.filter((u) => u.id !== user.id), user],
          currentUserId: user.id,
        })),
      setGuest: (name, phone) => {
        const guest: GuestSession = { id: get().guest?.id ?? newId(), name, phone };
        set({ guest });
      },
      loginMerchant: (username, password) => {
        const merchant = get().merchants.find(
          (m) => m.username === username.trim() && m.password === password,
        );
        if (!merchant) return false;
        set({ merchantSessionId: merchant.id });
        return true;
      },
      logoutMerchant: () => set({ merchantSessionId: null }),
      loginStation: () => set({ stationLoggedIn: true }),
      openMerchantDemo: (id) => {
        if (get().merchants.some((m) => m.id === id)) set({ merchantSessionId: id });
      },
      joinTrip: (id, leave = false) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === id && t.ownerId !== s.currentUserId
              ? {
                  ...t,
                  members: leave
                    ? t.members.filter((m) => m !== s.currentUserId)
                    : [...new Set([...t.members, s.currentUserId])],
                }
              : t,
          ),
        })),
      saveTrip: (trip) =>
        set((s) => ({ trips: [...s.trips.filter((t) => t.id !== trip.id), trip] })),
      checkIn: (tripId, stationId, controller = false) => {
        const s = get();
        const trip = s.trips.find((t) => t.id === tripId);
        const stop = trip?.stops.find((p) => p.stationId === stationId);
        if (!trip || !stop) return 'Không tìm thấy điểm dừng.';
        if (!controller && trip.ownerId !== s.currentUserId) return 'Chỉ chủ chuyến được check-in.';
        if (stop.checkedInAt) return null;
        if (!['EN_ROUTE', 'APPROACHING_STATION'].includes(trip.status))
          return 'Chuyến chưa ở trạng thái có thể check-in.';
        if (currentStop(trip).id !== stop.id) return 'Vui lòng check-in đúng điểm dừng tiếp theo.';
        set({
          trips: s.trips.map((t) =>
            t.id === tripId
              ? {
                  ...t,
                  status: 'AT_STATION',
                  stops: t.stops.map((p) =>
                    p.id === stop.id ? { ...p, checkedInAt: s.demoTime } : p,
                  ),
                }
              : t,
          ),
        });
        return null;
      },
      setTripStatus: (id, status) => {
        if (status === 'AT_STATION') {
          const trip = get().trips.find((t) => t.id === id);
          if (trip) get().checkIn(id, currentStop(trip).stationId ?? '', true);
          return;
        }
        set((s) => ({ trips: s.trips.map((t) => (t.id === id ? { ...t, status } : t)) }));
      },
      advanceTime: (minutes) =>
        set((s) => ({
          demoTime: new Date(Date.parse(s.demoTime) + minutes * 60000).toISOString(),
        })),
      delayTrip: (id, minutes) =>
        set((s) => ({
          trips: s.trips.map((t) =>
            t.id === id
              ? {
                  ...t,
                  stops: t.stops.map((p) =>
                    p.stationId && !p.checkedInAt
                      ? {
                          ...p,
                          arrivalAt: new Date(
                            Date.parse(p.arrivalAt) + minutes * 60000,
                          ).toISOString(),
                        }
                      : p,
                  ),
                }
              : t,
          ),
        })),
      addCart: (tripId, stationId, item) => {
        const s = get();
        const p = s.products.find((p) => p.id === item.productId);
        if (!p?.available || !s.merchants.find((m) => m.id === p.merchantId)?.acceptingOrders)
          return 'Sản phẩm hoặc cửa hàng đang tạm ngừng bán.';
        if (
          p.stationId !== stationId ||
          !s.trips.find((t) => t.id === tripId)?.stops.some((stop) => stop.stationId === stationId)
        )
          return 'Sản phẩm không thuộc trạm trong hành trình.';
        if (item.quantity < 1 || !Number.isInteger(item.quantity)) return 'Số lượng không hợp lệ.';
        const cart =
          s.cartTripId === tripId && s.cartStationId === stationId
            ? s.cart.map((i) => ({ ...i }))
            : [];
        const existing = cart.find((i) => i.productId === item.productId);
        if (existing) {
          existing.quantity += item.quantity;
          existing.note = item.note;
        } else cart.push(item);
        set({ cart, cartTripId: tripId, cartStationId: stationId });
        return null;
      },
      setCartQuantity: (productId, quantity) => {
        if (!Number.isInteger(quantity)) return;
        set((s) => ({
          cart: s.cart
            .map((i) => (i.productId === productId ? { ...i, quantity: Math.max(0, quantity) } : i))
            .filter((i) => i.quantity > 0),
        }));
      },
      clearCart: () => set({ cart: [], cartTripId: null, cartStationId: null }),
      checkout: (tripId, stationId, name, paymentMethod, isGuest) => {
        const s = get();
        if (!name.trim()) return { error: 'Vui lòng nhập họ tên người nhận.' };
        if (isGuest && !s.guest) return { error: 'Vui lòng cung cấp thông tin khách trước.' };
        if (!s.cart.length || s.cartTripId !== tripId || s.cartStationId !== stationId)
          return { error: 'Giỏ hàng chưa có sản phẩm cho chuyến này.' };
        const trip = s.trips.find((t) => t.id === tripId);
        const stop = trip?.stops.find((p) => p.stationId === stationId);
        if (!stop) return { error: 'Trạm không thuộc hành trình.' };
        for (const item of s.cart) {
          const p = s.products.find((p) => p.id === item.productId);
          if (
            !p?.available ||
            !s.merchants.find((m) => m.id === p.merchantId)?.acceptingOrders ||
            p.stationId !== stationId
          )
            return { error: `${p?.name ?? 'Sản phẩm'} đã ngừng bán. Hãy bỏ món khỏi giỏ.` };
        }
        const id = newId();
        const publicOrderCode = `TV-${id.slice(0, 6).toUpperCase()}`;
        const groups = new Map<string, CartItem[]>();
        for (const item of s.cart) {
          const merchantId = s.products.find((p) => p.id === item.productId)!.merchantId;
          groups.set(merchantId, [...(groups.get(merchantId) ?? []), item]);
        }
        const usedPickupCodes = new Set(s.merchantOrders.map((p) => p.pickupCode));
        function pickupCode() {
          let code: string;
          do {
            code = String(1000 + (crypto.getRandomValues(new Uint32Array(1))[0] % 9000));
          } while (usedPickupCodes.has(code));
          usedPickupCodes.add(code);
          return code;
        }
        const parts: MerchantOrder[] = [...groups].map(([merchantId, cart]) => {
          const items = cart.map((i) => {
            const p = s.products.find((p) => p.id === i.productId)!;
            return {
              productId: p.id,
              name: p.name,
              price: p.price,
              quantity: i.quantity,
              note: i.note,
            };
          });
          return {
            id: newId(),
            orderId: id,
            merchantId,
            tripId,
            stationId,
            tripStopId: stop.id,
            pickupCode: pickupCode(),
            status: 'NEW',
            items,
            total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
            prepMinutes: Math.max(
              ...cart.map((i) => s.products.find((p) => p.id === i.productId)!.prepMinutes),
            ),
            bufferMinutes: 3,
            history: [{ status: 'NEW', at: s.demoTime }],
          };
        });
        const order: Order = {
          pickupToken: newId(),
          id,
          publicOrderCode,
          customerName: name.trim(),
          customerUserId: isGuest ? undefined : s.currentUserId,
          guestSessionId: isGuest ? s.guest!.id : undefined,
          tripId,
          stationId,
          merchantOrderIds: parts.map((p) => p.id),
          total: parts.reduce((sum, p) => sum + p.total, 0),
          paymentMethod,
          paymentStatus: 'PAID',
          createdAt: s.demoTime,
        };
        set({
          orders: [order, ...s.orders],
          merchantOrders: [...parts, ...s.merchantOrders],
          cart: [],
          cartTripId: null,
          cartStationId: null,
        });
        return { id };
      },
      confirmPickupQr: (id, payload) => {
        const s = get(),
          part = s.merchantOrders.find((p) => p.id === id && p.merchantId === s.merchantSessionId);
        const order = s.orders.find((o) => o.id === part?.orderId);
        if (!part || !order) return 'Phiên này không có quyền nhận đơn.';
        if (payload.trim() !== `tramviet:pickup:${order.id}:${order.pickupToken ?? order.id}`)
          return 'QR không thuộc đơn này.';
        return s.transition(id, 'PICKED_UP', undefined, part.pickupCode);
      },
      transition: (id, status, reason, code) => {
        const s = get();
        const part = s.merchantOrders.find((p) => p.id === id);
        if (!part || part.merchantId !== s.merchantSessionId)
          return 'Phiên này không có quyền xử lý phần đơn.';
        if (!canTransition(part.status, status)) return 'Không thể bỏ qua hoặc lặp bước xử lý đơn.';
        if (status === 'REJECTED' && !reason?.trim()) return 'Hãy chọn lý do từ chối.';
        if (status === 'PICKED_UP' && !tripStop(s, part)?.checkedInAt)
          return 'Chờ tài xế check-in tại đúng trạm.';
        if (status === 'PICKED_UP' && code?.trim() !== part.pickupCode)
          return 'Mã nhận món chưa đúng.';
        set({
          merchantOrders: s.merchantOrders.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status,
                  rejectionReason: reason,
                  history: [...p.history, { status, at: s.demoTime }],
                }
              : p,
          ),
        });
        if (status === 'ACCEPTED' && s.autoPrint) void get().printTicket(id);
        return null;
      },
      setAvailability: (id, available) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id && p.merchantId === s.merchantSessionId ? { ...p, available } : p,
          ),
        })),
      setPrepTime: (id, minutes) =>
        set((s) => ({
          products: s.products.map((p) =>
            p.id === id && p.merchantId === s.merchantSessionId
              ? { ...p, prepMinutes: minutes }
              : p,
          ),
        })),
      toggleAccepting: () =>
        set((s) => ({
          merchants: s.merchants.map((m) =>
            m.id === s.merchantSessionId ? { ...m, acceptingOrders: !m.acceptingOrders } : m,
          ),
        })),
      printTicket: async (id) => {
        const s = get();
        const part = s.merchantOrders.find((p) => p.id === id);
        if (!part || part.merchantId !== s.merchantSessionId) return;
        const previous = s.kitchenTickets.find((t) => t.merchantOrderId === id);
        if (previous?.status === 'PRINTING') return;
        const ticketId = previous?.id ?? newId();
        const ticket = {
          id: ticketId,
          merchantOrderId: id,
          status: 'PRINTING' as const,
          arrivalAtSnapshot: tripStop(s, part)?.arrivalAt ?? s.demoTime,
          reprintCount: previous ? previous.reprintCount + 1 : 0,
        };
        set({
          kitchenTickets: [...s.kitchenTickets.filter((t) => t.merchantOrderId !== id), ticket],
        });
        await finishPrint(ticketId);
      },
      setOption: (key, value) => set({ [key]: value }),
      resetDemo: () => set(createSeed()),
    }),
    {
      name: 'tram-viet-demo-v1',
      version: 2,
      migrate: (old) => {
        const data = old as DemoData;
        return {
          ...data,
          currentUserId: 'user-anh',
          trips: data.trips.map((t) =>
            t.id === MAIN_TRIP ? { ...t, members: t.members.filter((id) => id !== 'user-anh') } : t,
          ),
        };
      },
      storage: createJSONStorage(() => localStorage),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([, value]) => typeof value !== 'function'),
        ) as DemoData,
    },
  ),
);
// Resume interrupted simulated printing after refresh without duplicating orders.
function finishPrint(ticketId: string): Promise<void> {
  const pending = printTasks.get(ticketId);
  if (pending) return pending;
  const task = new Promise<void>((resolve) => setTimeout(resolve, 700))
    .then(() => {
      if (
        !useDemoStore
          .getState()
          .kitchenTickets.some((t) => t.id === ticketId && t.status === 'PRINTING')
      )
        return;
      useDemoStore.setState((s) => ({
        kitchenTickets: s.kitchenTickets.map((t) =>
          t.id === ticketId
            ? {
                ...t,
                status: s.printError ? 'FAILED' : 'PRINTED',
                printedAt: s.printError ? undefined : s.demoTime,
              }
            : t,
        ),
      }));
    })
    .finally(() => {
      printTasks.delete(ticketId);
    });
  printTasks.set(ticketId, task);
  return task;
}
function resumePrints() {
  for (const ticket of useDemoStore.getState().kitchenTickets)
    if (ticket.status === 'PRINTING') void finishPrint(ticket.id);
}
resumePrints();
if (typeof window !== 'undefined')
  window.addEventListener('storage', (event) => {
    if (event.key === 'tram-viet-demo-v1')
      void Promise.resolve(useDemoStore.persist.rehydrate()).then(resumePrints);
  });
export const mainTrip = () => useDemoStore.getState().trips.find((t) => t.id === MAIN_TRIP)!;
