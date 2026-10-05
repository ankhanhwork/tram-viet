import type { Stop, Trip } from '../types';

export const places = [
  {
    name: 'Hà Nội',
    km: 0,
    description:
      'Bắt đầu chuyến đi từ thủ đô. Chuẩn bị hành lý, giấy tờ và kiểm tra phương tiện trước giờ xuất phát.',
    highlights: 'Phố cổ · Hồ Hoàn Kiếm · Ẩm thực Hà Nội',
  },
  {
    name: 'Trạm Việt Ninh Bình',
    km: 95,
    description:
      'Điểm nghỉ giữa chặng với nhà hàng, cà phê, nhà vệ sinh và bãi đỗ xe. Có thể đặt món trước để nhận nhanh khi xe đến.',
    highlights: 'Nhà hàng · WC · Cà phê · Bãi đỗ xe',
  },
  {
    name: 'Tràng An, Ninh Bình',
    km: 110,
    description:
      'Khám phá cảnh quan núi đá vôi và những dòng nước uốn lượn giữa thung lũng. Mang theo mũ, nước uống và giày thuận tiện đi bộ.',
    highlights: 'Đi thuyền · Núi đá vôi · Chụp ảnh',
  },
  {
    name: 'Ninh Bình',
    km: 105,
    description: 'Dành thời gian khám phá cảnh quan và thưởng thức những món ăn địa phương.',
    highlights: 'Tràng An · Tam Cốc · Cơm cháy',
  },
  {
    name: 'Thanh Hóa',
    km: 175,
    description:
      'Điểm nghỉ trên hành trình Bắc Trung Bộ. Kiểm tra thời gian và bổ sung nước trước chặng tiếp theo.',
    highlights: 'Ẩm thực địa phương · Nghỉ ngơi',
  },
  {
    name: 'Trạm Việt Thanh Hóa',
    km: 190,
    description: 'Trạm nghỉ trên tuyến với khu ăn uống, vệ sinh và bãi đỗ xe.',
    highlights: 'Ăn uống · WC · Bãi đỗ xe',
  },
  {
    name: 'Vinh',
    km: 310,
    description: 'Dừng chân tại thành phố Vinh để nghỉ ngơi và thưởng thức món ăn địa phương.',
    highlights: 'Ẩm thực Nghệ An · Nghỉ ngơi',
  },
  {
    name: 'Trạm Việt Nghệ An',
    km: 330,
    description:
      'Nghỉ chân, ăn uống và bổ sung nhiên liệu trước khi tiếp tục hành trình vào miền Trung.',
    highlights: 'Nhà hàng · WC · Tiếp nhiên liệu',
  },
  {
    name: 'Đồng Hới',
    km: 500,
    description:
      'Thành phố ven biển Quảng Bình, phù hợp để dừng ăn trưa hoặc nghỉ qua đêm trên đường đi Huế.',
    highlights: 'Biển Nhật Lệ · Ẩm thực Quảng Bình',
  },
  {
    name: 'Huế',
    km: 670,
    description:
      'Dạo bên sông Hương, khám phá di sản và thưởng thức ẩm thực cố đô. Sắp xếp thời gian nghỉ sau chặng đường dài.',
    highlights: 'Sông Hương · Cầu Trường Tiền · Ẩm thực Huế',
  },
  {
    name: 'Đại Nội Huế',
    km: 674,
    description:
      'Khám phá không gian kiến trúc cung đình và câu chuyện của cố đô. Chuẩn bị giày đi bộ và xem thông tin mở cửa trước khi đến.',
    highlights: 'Kiến trúc cung đình · Văn hóa · Đi bộ',
  },
  {
    name: 'Chùa Thiên Mụ',
    km: 680,
    description:
      'Ghé ngôi chùa bên sông Hương, thưởng thức không gian yên tĩnh. Mặc trang phục lịch sự và giữ trật tự khi tham quan.',
    highlights: 'Sông Hương · Tháp Phước Duyên · Cảnh quan',
  },
  {
    name: 'Lăng Cô',
    km: 730,
    description:
      'Dừng ngắm biển và đầm phá trước khi đi qua khu vực Hải Vân. Theo dõi thời tiết và chuẩn bị nước uống.',
    highlights: 'Bãi biển · Đầm phá · Chụp ảnh',
  },
  {
    name: 'Hải Vân',
    km: 755,
    description:
      'Ngắm cảnh núi và biển giữa Huế và Đà Nẵng. Chọn điểm đỗ xe an toàn khi dừng chụp ảnh.',
    highlights: 'Núi và biển · Cảnh quan trên đường',
  },
  {
    name: 'Đà Nẵng',
    km: 785,
    description:
      'Khép lại hành trình tại thành phố biển. Nhận phòng, nghỉ ngơi và khám phá thành phố theo lịch trình của bạn.',
    highlights: 'Biển Mỹ Khê · Cầu Rồng · Ẩm thực miền Trung',
  },
  {
    name: 'Cầu Rồng',
    km: 788,
    description:
      'Tản bộ bên sông Hàn và ngắm cầu khi thành phố lên đèn. Kiểm tra lịch hoạt động tại địa phương nếu muốn xem sự kiện.',
    highlights: 'Sông Hàn · Ngắm cảnh · Dạo buổi tối',
  },
  {
    name: 'Biển Mỹ Khê',
    km: 792,
    description:
      'Đón bình minh bên biển hoặc thư giãn trên bãi cát. Tuân thủ biển báo và hướng dẫn an toàn khi xuống nước.',
    highlights: 'Bình minh · Bãi biển · Thư giãn',
  },
  {
    name: 'Ngũ Hành Sơn',
    km: 800,
    description:
      'Khám phá cảnh quan núi đá và những không gian văn hóa. Mang giày chắc chân, nước uống và dành thời gian nghỉ giữa các đoạn đi bộ.',
    highlights: 'Cảnh quan · Văn hóa · Đi bộ',
  },
];
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase();
export function placeInfo(name: string) {
  const key = normalize(name);
  return (
    places.find((p) => normalize(p.name) === key) ??
    [...places]
      .sort((a, b) => b.name.length - a.name.length)
      .find((p) => key.includes(normalize(p.name)))
  );
}
export function legDistance(from: string, to: string) {
  const a = placeInfo(from),
    b = placeInfo(to);
  return a && b ? Math.max(3, Math.abs(a.km - b.km)) : 80;
}
export interface Waypoint {
  stationId?: string;
  id: string;
  name: string;
  minutes: number;
  km: number;
  note: string;
  plannedAt?: string;
}
export function tripWaypoints(trip: Trip): Waypoint[] {
  let restBefore = 0;
  let km = 0;
  let previous = trip.stops[0];
  return trip.stops.flatMap((p, i) => {
    if (i) km += p.distanceKm ?? legDistance(previous.name, p.name);
    previous = p;
    if (p.stationId) {
      restBefore += p.restMinutes;
      return [];
    }
    const result = {
      id: p.id,
      name: p.name,
      minutes: p.restMinutes,
      km,
      note: p.note ?? '',
      plannedAt:
        p.plannedAt ?? new Date(Date.parse(p.arrivalAt) - restBefore * 60000).toISOString(),
    };
    km = 0;
    return [result];
  });
}
export function schedule(
  departure: string,
  points: Waypoint[],
  rests: { id: string; name: string; km: number; minutes: number }[],
): Stop[] {
  let time = Date.parse(departure),
    addedRest = 0;
  const output: Stop[] = [];
  points.forEach((p, i) => {
    const prev = points[i - 1];
    let remainingKm = i ? p.km : 0;
    if (prev) {
      const a = placeInfo(prev.name)?.km,
        b = placeInfo(p.name)?.km;
      const between = rests
        .filter(
          (r) =>
            a !== undefined && b !== undefined && r.km > Math.min(a, b) && r.km < Math.max(a, b),
        )
        .sort((x, y) => (a! < b! ? x.km - y.km : y.km - x.km));
      let covered = 0;
      for (const r of between) {
        if (output.some((s) => s.stationId === r.id)) continue;
        const distance = Math.abs(r.km - a!) - covered;
        time += distance * 60_000;
        output.push({
          id: `rest-${r.id}`,
          name: r.name,
          stationId: r.id,
          arrivalAt: new Date(time).toISOString(),
          restMinutes: r.minutes,
          distanceKm: distance,
          note: 'Nghỉ ngơi, dùng bữa và chuẩn bị cho chặng tiếp theo.',
        });
        covered += distance;
        time += r.minutes * 60_000;
        addedRest += r.minutes * 60_000;
      }
      time += Math.max(0, p.km - covered) * 60_000;
      remainingKm = Math.max(0, p.km - covered);
    }
    if (p.plannedAt) time = Math.max(time, Date.parse(p.plannedAt) + addedRest);
    output.push({
      id: p.id,
      name: p.name,
      stationId: p.stationId,
      plannedAt: p.plannedAt,
      arrivalAt: new Date(time).toISOString(),
      restMinutes: p.minutes,
      distanceKm: remainingKm,
      note: p.note,
    });
    time += p.minutes * 60_000;
  });
  return output;
}
export const exampleText = `Ngày 1\n07:00 Hà Nội | Tập trung và khởi hành | 0\n10:00 Tràng An, Ninh Bình | Tham quan cảnh quan, đi thuyền | 120\n14:00 Thanh Hóa | Ăn trưa, nghỉ ngơi | 60\nNgày 2\n08:00 Đại Nội Huế | Tham quan kiến trúc cung đình | 120\n11:00 Chùa Thiên Mụ | Ngắm cảnh bên sông Hương | 60\n14:00 Lăng Cô | Nghỉ ngơi, ngắm biển | 45\n17:00 Đà Nẵng | Nhận phòng và dùng bữa | 90\n20:00 Cầu Rồng | Dạo bên sông Hàn | 60\nNgày 3\n06:00 Biển Mỹ Khê | Đón bình minh | 60\n09:00 Ngũ Hành Sơn | Tham quan, chụp ảnh | 90\n12:00 Đà Nẵng | Kết thúc hành trình | 0`;
export function parseItinerary(text: string, departure: string): Waypoint[] {
  let day = 0;
  const base = departure.slice(0, 10);
  const result: Waypoint[] = [];
  for (const line of text.split(/\r?\n/)) {
    const d = line.match(/ngày\s*(\d+)/i);
    if (d) {
      day = Math.max(0, Number(d[1]) - 1);
      continue;
    }
    const m = line.match(/^\s*(\d{1,2})\s*[:h]\s*(\d{2})\s*[:–-]?\s*(.+)$/i);
    if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) continue;
    const [name, note = '', duration = '30'] = m[3].split('|').map((s) => s.trim());
    if (!name) continue;
    const date = new Date(`${base}T${m[1].padStart(2, '0')}:${m[2]}:00+07:00`);
    date.setUTCDate(date.getUTCDate() + day);
    result.push({
      id: crypto.randomUUID(),
      name,
      note,
      minutes: Math.min(1440, Math.max(0, Number(duration) || 0)),
      km: result.length ? legDistance(result.at(-1)!.name, name) : 0,
      plannedAt: date.toISOString(),
    });
  }
  return result;
}
export function pickupEstimate(trip: Trip, stop: Stop, now: string) {
  const index = trip.stops.findIndex((s) => s.id === stop.id);
  const current = Date.parse(now);
  let distance = 0;
  for (let i = 1; i <= index; i++) {
    const a = trip.stops[i - 1],
      b = trip.stops[i];
    const start = Date.parse(a.arrivalAt) + a.restMinutes * 60000,
      end = Date.parse(b.arrivalAt);
    const fraction =
      trip.status === 'READY'
        ? 1
        : Math.max(0, Math.min(1, (end - current) / Math.max(1, end - start)));
    distance += (b.distanceKm ?? legDistance(a.name, b.name)) * fraction;
  }
  // Driving speed comes from the saved itinerary, so the same schedule is used on every interface.
  let driveMinutes = 0,
    totalKm = 0;
  for (let i = 1; i <= index; i++) {
    const a = trip.stops[i - 1],
      b = trip.stops[i];
    totalKm += b.distanceKm ?? legDistance(a.name, b.name);
    driveMinutes += Math.max(
      1,
      (Date.parse(b.arrivalAt) - Date.parse(a.arrivalAt)) / 60000 - a.restMinutes,
    );
  }
  const speed = (totalKm / Math.max(1, driveMinutes)) * 60;
  const minutes = Math.ceil((distance / Math.max(1, speed)) * 60 - 0.000001);
  return {
    distance: Math.round(distance),
    minutes,
    arrivalAt: new Date(
      Math.max(current, Date.parse(stop.arrivalAt), current + minutes * 60000),
    ).toISOString(),
  };
}
