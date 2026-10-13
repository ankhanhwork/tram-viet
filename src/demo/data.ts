import type { DemoData, MerchantOrder, Order, Product, Trip } from '../types';
export const DEMO_TIME = '2026-10-03T08:33:00+07:00';
export const MAIN_TRIP = 'trip-hn-qb';
export const MAIN_STATION = 'station-ninh-binh';
export const DEFAULT_MERCHANT = 'merchant-com-viet';
const at = (time: string) => `2026-10-03T${time}:00+07:00`;
const products: Product[] = [
  {
    id: 'com-ga',
    merchantId: DEFAULT_MERCHANT,
    stationId: MAIN_STATION,
    name: 'Cơm gà',
    description:
      'Gà mềm thơm, cơm dẻo và rau theo mùa. Một bữa trưa đầy năng lượng cho hành trình dài.',
    category: 'FOOD',
    price: 75000,
    prepMinutes: 12,
    available: true,
    illustration: '🍗',
  },
  {
    id: 'com-cafe',
    merchantId: DEFAULT_MERCHANT,
    stationId: MAIN_STATION,
    name: 'Cà phê sữa',
    description: 'Cà phê phin đậm vị, sữa đặc béo nhẹ. Có thể chọn ít đá trong ghi chú.',
    category: 'DRINK',
    price: 30000,
    prepMinutes: 4,
    available: true,
    illustration: '☕',
  },
  {
    id: 'com-nuoc',
    merchantId: DEFAULT_MERCHANT,
    stationId: MAIN_STATION,
    name: 'Nước suối',
    description: 'Nước suối đóng chai 500 ml.',
    category: 'DRINK',
    price: 15000,
    prepMinutes: 1,
    available: true,
    illustration: '💧',
  },
  {
    id: 'com-suon',
    merchantId: DEFAULT_MERCHANT,
    stationId: MAIN_STATION,
    name: 'Cơm sườn',
    description: 'Sườn nướng và cơm nóng.',
    category: 'FOOD',
    price: 75000,
    prepMinutes: 12,
    available: false,
    illustration: '🍱',
  },
  {
    id: 'pho-bo',
    merchantId: 'merchant-pho-viet',
    stationId: MAIN_STATION,
    name: 'Phở bò',
    description: 'Nước dùng thanh, thịt bò mềm và bánh phở tươi.',
    category: 'FOOD',
    price: 65000,
    prepMinutes: 10,
    available: true,
    illustration: '🍜',
  },
  {
    id: 'pho-nuoc',
    merchantId: 'merchant-pho-viet',
    stationId: MAIN_STATION,
    name: 'Nước suối',
    description: 'Nước suối đóng chai 500 ml.',
    category: 'DRINK',
    price: 15000,
    prepMinutes: 1,
    available: true,
    illustration: '💧',
  },
  {
    id: 'cafe-sua',
    merchantId: 'merchant-cafe-viet',
    stationId: MAIN_STATION,
    name: 'Cà phê sữa',
    description: 'Cà phê rang xay, pha phin tại quầy.',
    category: 'DRINK',
    price: 30000,
    prepMinutes: 4,
    available: true,
    illustration: '☕',
  },
  {
    id: 'banh-mi',
    merchantId: 'merchant-cafe-viet',
    stationId: MAIN_STATION,
    name: 'Bánh mì',
    description: 'Bánh mì giòn với thịt, rau và sốt đặc trưng.',
    category: 'FOOD',
    price: 35000,
    prepMinutes: 7,
    available: true,
    illustration: '🥖',
  },
  {
    id: 'com-chay',
    merchantId: 'merchant-sieu-thi',
    stationId: MAIN_STATION,
    name: 'Cơm cháy Ninh Bình',
    description: 'Đặc sản địa phương đóng gói, món quà nhỏ mang theo hành trình.',
    category: 'SPECIALTY',
    price: 65000,
    prepMinutes: 2,
    available: true,
    illustration: '🌾',
  },
  {
    id: 'khan-giay',
    merchantId: 'merchant-sieu-thi',
    stationId: MAIN_STATION,
    name: 'Khăn giấy',
    description: 'Gói khăn giấy bỏ túi tiện dụng khi đi đường.',
    category: 'CONVENIENCE',
    price: 15000,
    prepMinutes: 1,
    available: true,
    illustration: '🧻',
  },
];
export function createSeed(): DemoData {
  const main: Trip = {
    id: MAIN_TRIP,
    title: 'Hà Nội → Quảng Bình',
    origin: 'Hà Nội',
    destination: 'Đồng Hới · Quảng Bình',
    ownerId: 'user-minh',
    members: [],
    publicTripCode: 'HN-QB-A8K29',
    status: 'EN_ROUTE',
    plate: '29B-123.45',
    company: 'Hoàng Long Express',
    passengerCount: 42,
    partnerTrip: true,
    commissionEligible: true,
    stops: [
      { id: 'stop-origin', name: 'Hà Nội', arrivalAt: at('07:00'), restMinutes: 0 },
      {
        id: 'stop-nb',
        name: 'Ninh Bình',
        stationId: MAIN_STATION,
        arrivalAt: at('09:15'),
        restMinutes: 20,
      },
      {
        id: 'stop-th',
        name: 'Thanh Hóa',
        arrivalAt: at('11:30'),
        restMinutes: 0,
      },
      {
        id: 'stop-na',
        name: 'Vinh · Nghệ An',
        arrivalAt: at('14:00'),
        restMinutes: 0,
      },
      {
        id: 'stop-ht',
        name: 'Hà Tĩnh',
        arrivalAt: at('15:45'),
        restMinutes: 0,
      },
      {
        id: 'stop-qb',
        name: 'Đồng Hới · Quảng Bình',
        arrivalAt: at('18:00'),
        restMinutes: 0,
        note: 'Nhận phòng, khám phá Phong Nha – Kẻ Bàng và biển Nhật Lệ.',
      },
    ],
  };
  const trips: Trip[] = [
    main,
    {
      ...main,
      id: 'trip-mai-linh',
      title: 'Hà Nội → Vinh',
      destination: 'Vinh',
      ownerId: 'user-mai',
      members: [],
      company: 'Mai Linh Travel',
      plate: '36B-678.90',
      passengerCount: 36,
      publicTripCode: 'HN-VINH-M9K21',
      stops: [{ ...main.stops[1], id: 'stop-ml-nb', arrivalAt: at('10:00') }],
    },
    {
      ...main,
      id: 'trip-futa',
      title: 'Hà Nội → Quảng Bình',
      destination: 'Đồng Hới · Quảng Bình',
      ownerId: 'user-futa',
      members: [],
      company: 'FUTA Charter',
      plate: '51B-246.80',
      passengerCount: 44,
      partnerTrip: false,
      commissionEligible: false,
      publicTripCode: 'HN-QB-F2K73',
      stops: [{ ...main.stops[1], id: 'stop-futa-nb', arrivalAt: at('10:15') }],
    },
  ];
  const orders: Order[] = [];
  const merchantOrders: MerchantOrder[] = [];
  function seedOrder(trip: Trip, entries: [string, number][], index: number) {
    const items = entries.map(([id, quantity]) => {
      const p = products.find((p) => p.id === id)!;
      return { productId: id, name: p.name, price: p.price, quantity, note: '' };
    });
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const id = `seed-${trip.id}-${index}`;
    const partId = `${id}-part`;
    const merchantId = products.find((p) => p.id === entries[0][0])!.merchantId;
    const status = (['ACCEPTED', 'PREPARING', 'READY', 'PICKED_UP'] as const)[index % 4];
    orders.push({
      id,
      publicOrderCode: `TV-${trip.id === MAIN_TRIP ? 'NB' : trip.id === 'trip-mai-linh' ? 'ML' : 'FT'}-${String(index + 1).padStart(3, '0')}`,
      customerName: `Hành khách ${index + 1}`,
      guestSessionId: `seed-guest-${id}`,
      tripId: trip.id,
      stationId: MAIN_STATION,
      merchantOrderIds: [partId],
      total,
      paymentMethod: 'MoMo',
      paymentStatus: 'PAID',
      createdAt: at('08:00'),
    });
    const sequence = ['NEW', 'ACCEPTED', 'PREPARING', 'READY', 'PICKED_UP'] as const;
    merchantOrders.push({
      id: partId,
      orderId: id,
      merchantId,
      tripId: trip.id,
      stationId: MAIN_STATION,
      tripStopId: trip.stops.find((s) => s.stationId === MAIN_STATION)!.id,
      pickupCode: `${index + 1}${trip.id === MAIN_TRIP ? '128' : trip.id === 'trip-mai-linh' ? '256' : '384'}`,
      status,
      items,
      total,
      prepMinutes: Math.max(
        ...entries.map(([pid]) => products.find((p) => p.id === pid)!.prepMinutes),
      ),
      bufferMinutes: 3,
      history: sequence
        .slice(0, sequence.indexOf(status) + 1)
        .map((s, n) => ({ status: s, at: at(`08:${String(n * 4).padStart(2, '0')}`) })),
    });
  }
  for (let i = 0; i < 17; i++)
    seedOrder(
      main,
      i < 8
        ? [
            ['com-ga', 1],
            ['com-cafe', 1],
          ]
        : i < 13
          ? [['pho-bo', 2]]
          : i < 16
            ? [
                ['com-chay', 1],
                ['khan-giay', 1],
              ]
            : [
                ['pho-bo', 1],
                ['pho-nuoc', 3],
              ],
      i,
    );
  for (let i = 0; i < 9; i++)
    seedOrder(
      trips[1],
      i < 8
        ? [
            ['com-ga', 1],
            ['com-cafe', 1],
          ]
        : [
            ['com-chay', 1],
            ['khan-giay', 1],
          ],
      i,
    );
  for (let i = 0; i < 21; i++)
    seedOrder(
      trips[2],
      i < 10
        ? [
            ['com-ga', 1],
            ['com-cafe', 1],
          ]
        : i < 20
          ? [
              ['cafe-sua', 2],
              ['banh-mi', 1],
            ]
          : [['com-ga', 2]],
      i,
    );
  return {
    users: [
      {
        id: 'user-minh',
        name: 'Nguyễn Văn Minh',
        email: 'minh@demo.vn',
        role: 'coach',
        partnerStatus: 'approved',
        commissionRate: 5,
        company: 'Hoàng Long Express',
        plate: '29B-123.45',
      },
      {
        id: 'user-anh',
        name: 'Trần Anh',
        email: 'anh@demo.vn',
        role: 'traveler',
        partnerStatus: 'none',
      },
      {
        id: 'user-hoang',
        name: 'Lê Hoàng',
        email: 'hoang@demo.vn',
        role: 'truck',
        partnerStatus: 'none',
        plate: '51C-456.78',
      },
      {
        id: 'user-mai',
        name: 'Lê Thị Mai',
        email: 'mai@demo.vn',
        role: 'coach',
        partnerStatus: 'approved',
        commissionRate: 4,
      },
      {
        id: 'user-futa',
        name: 'Trần Đức Nam',
        email: 'nam@demo.vn',
        role: 'coach',
        partnerStatus: 'none',
      },
    ],
    trips,
    stations: [
      {
        id: MAIN_STATION,
        name: 'Trạm Việt Ninh Bình',
        address: 'Cao tốc Bắc – Nam · Ninh Bình',
        description:
          'Dừng chân thư thái. Thưởng thức món ngon và mang theo một chút hương vị Ninh Bình.',
        facilities: ['Ẩm thực', 'Cà phê', 'WC sạch', 'Bãi đỗ xe', 'Đặc sản'],
        partner: true,
      },
      {
        id: 'station-thanh-hoa',
        name: 'Trạm Việt Thanh Hóa',
        address: 'Quốc lộ 1A · Thanh Hóa',
        description: 'Điểm dừng thuận tiện với khu ăn uống và nhiên liệu.',
        facilities: ['Ẩm thực', 'Nhiên liệu', 'WC sạch', 'Siêu thị'],
        partner: true,
      },
      {
        id: 'station-nghe-an',
        name: 'Trạm Việt Nghệ An',
        address: 'Cao tốc Bắc – Nam · Nghệ An',
        description: 'Không gian rộng rãi, đặc sản xứ Nghệ và cà phê.',
        facilities: ['Ẩm thực', 'Cà phê', 'Đặc sản', 'Bãi đỗ xe'],
        partner: true,
      },
      {
        id: 'station-ha-tinh',
        name: 'Trạm Việt Hà Tĩnh',
        address: 'Cao tốc Bắc – Nam · Hà Tĩnh',
        description: 'Trạm nghỉ đề xuất trước khi vào Quảng Bình.',
        facilities: ['Ẩm thực', 'WC sạch', 'Cà phê', 'Bãi đỗ xe'],
        partner: true,
      },
      {
        id: 'station-hue',
        name: 'Huế Gateway',
        address: 'Quốc lộ 1A · Huế',
        description: 'Điểm nghỉ trước khi tiếp tục hành trình về miền Trung.',
        facilities: ['Ẩm thực', 'WC sạch'],
        partner: false,
      },
    ],
    merchants: [
      {
        id: DEFAULT_MERCHANT,
        stationId: MAIN_STATION,
        name: 'Cơm Việt',
        counter: 'A12',
        acceptingOrders: true,
        username: 'comviet@demo.vn',
        password: 'demo123',
      },
      {
        id: 'merchant-pho-viet',
        stationId: MAIN_STATION,
        name: 'Phở Việt',
        counter: 'A01',
        acceptingOrders: true,
        username: 'phoviet@demo.vn',
        password: 'demo123',
      },
      {
        id: 'merchant-cafe-viet',
        stationId: MAIN_STATION,
        name: 'Cà phê Việt',
        counter: 'B02',
        acceptingOrders: true,
        username: 'cafeviet@demo.vn',
        password: 'demo123',
      },
      {
        id: 'merchant-sieu-thi',
        stationId: MAIN_STATION,
        name: 'Siêu thị Trạm Việt',
        counter: 'C01',
        acceptingOrders: true,
        username: 'sieuthi@demo.vn',
        password: 'demo123',
      },
      {
        id: 'merchant-thanh-hoa',
        stationId: 'station-thanh-hoa',
        name: 'Đặc sản Xứ Thanh',
        counter: 'A01',
        acceptingOrders: true,
        username: 'xuthanh@demo.vn',
        password: 'demo123',
      },
      {
        id: 'merchant-nghe-an',
        stationId: 'station-nghe-an',
        name: 'Ẩm thực Xứ Nghệ',
        counter: 'A01',
        acceptingOrders: true,
        username: 'xunghe@demo.vn',
        password: 'demo123',
      },
      {
        id: 'merchant-hue',
        stationId: 'station-hue',
        name: 'Bếp Cố đô',
        counter: 'A01',
        acceptingOrders: true,
        username: 'bepcodohue@demo.vn',
        password: 'demo123',
      },
    ],
    products: [
      ...structuredClone(products),
      {
        id: 'nem-chua-thanh-hoa',
        merchantId: 'merchant-thanh-hoa',
        stationId: 'station-thanh-hoa',
        name: 'Nem chua Thanh Hóa',
        description: 'Nem chua vị chua dịu, gói riêng tiện mang theo hành trình.',
        category: 'SPECIALTY',
        price: 45000,
        prepMinutes: 3,
        available: true,
        illustration: '🌶️',
      },
      {
        id: 'che-lam-thanh-hoa',
        merchantId: 'merchant-thanh-hoa',
        stationId: 'station-thanh-hoa',
        name: 'Chè lam Phủ Quảng',
        description: 'Đặc sản dẻo thơm gừng, đóng gói sẵn để làm quà.',
        category: 'SPECIALTY',
        price: 55000,
        prepMinutes: 2,
        available: true,
        illustration: '🍘',
      },
      {
        id: 'chao-luon-nghe-an',
        merchantId: 'merchant-nghe-an',
        stationId: 'station-nghe-an',
        name: 'Cháo lươn xứ Nghệ',
        description: 'Cháo nóng thơm tiêu, lươn đồng đậm vị Nghệ An.',
        category: 'FOOD',
        price: 65000,
        prepMinutes: 12,
        available: true,
        illustration: '🍲',
      },
      {
        id: 'nuoc-che-nghe-an',
        merchantId: 'merchant-nghe-an',
        stationId: 'station-nghe-an',
        name: 'Nước chè xanh',
        description: 'Chè xanh xứ Nghệ pha mới, phục vụ nóng hoặc thêm đá.',
        category: 'DRINK',
        price: 15000,
        prepMinutes: 3,
        available: true,
        illustration: '🍵',
      },
      {
        id: 'bun-bo-hue',
        merchantId: 'merchant-hue',
        stationId: 'station-hue',
        name: 'Bún bò Huế',
        description: 'Nước dùng đậm đà, thịt bò mềm và rau ăn kèm.',
        category: 'FOOD',
        price: 70000,
        prepMinutes: 14,
        available: true,
        illustration: '🍜',
      },
      {
        id: 'me-xung-hue',
        merchantId: 'merchant-hue',
        stationId: 'station-hue',
        name: 'Mè xửng Huế',
        description: 'Kẹo mè xửng dẻo thơm, đóng gói sẵn làm quà.',
        category: 'SPECIALTY',
        price: 50000,
        prepMinutes: 2,
        available: true,
        illustration: '🍬',
      },
    ],
    orders,
    merchantOrders,
    kitchenTickets: [],
    demoTime: DEMO_TIME,
    currentUserId: 'user-anh',
    merchantSessionId: null,
    stationLoggedIn: false,
    guest: null,
    cart: [],
    cartTripId: null,
    cartStationId: null,
    printError: false,
    autoPrint: true,
    sound: false,
    appInstalled: false,
    demoGuideEnabled: true,
    demoGuideStep: 0,
    guestLanguage: 'vi',
  };
}
