import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bus,
  Check,
  Clock,
  MapPin,
  Plus,
  Trash2,
  Upload,
  FileText,
} from 'lucide-react';
import { Back, Card, Modal, Pill, Timeline, RouteArt, notify } from '../../components/ui';
import { useDemoStore } from '../../store/useDemoStore';
import { clock, dateLabel, money } from '../../lib/rules';
import {
  exampleText,
  legDistance,
  parseItinerary,
  placeInfo,
  places,
  schedule,
  tripWaypoints,
  type Waypoint,
} from '../../lib/journey';
import type { Trip } from '../../types';

const localTime = (s: string) => new Date(Date.parse(s) + 7 * 3600000).toISOString().slice(0, 16);
const isoTime = (s: string) => {
  const date = new Date(`${s}:00+07:00`);
  return Number.isFinite(date.getTime()) ? date.toISOString() : new Date().toISOString();
};
export function TripPlanner() {
  const s = useDemoStore(),
    user = s.users.find((u) => u.id === s.currentUserId)!;
  const { tripId } = useParams(),
    [search] = useSearchParams(),
    navigate = useNavigate();
  const existing = s.trips.find((t) => t.id === tripId && t.ownerId === user.id);
  const requestedDate = search.get('date');
  const requestedDepartureTime = requestedDate
    ? Date.parse(`${requestedDate}T07:00:00+07:00`)
    : Number.NaN;
  const requestedDeparture = Number.isFinite(requestedDepartureTime)
    ? new Date(requestedDepartureTime).toISOString()
    : s.demoTime;
  const [step, setStep] = useState(1),
    [mode, setMode] = useState(search.get('mode') === 'import' ? 'import' : 'manual');
  const [departure, setDeparture] = useState(
    localTime(existing?.stops[0].arrivalAt ?? requestedDeparture),
  );
  const [desired, setDesired] = useState(
    localTime(
      existing?.desiredArrivalAt ??
        existing?.stops.at(-1)?.arrivalAt ??
        new Date(Date.parse(s.demoTime) + 14 * 3600000).toISOString(),
    ),
  );
  const [points, setPoints] = useState<Waypoint[]>(
    existing
      ? tripWaypoints(existing)
      : [
          {
            id: crypto.randomUUID(),
            name: search.get('from')?.trim() || 'Hà Nội',
            minutes: 0,
            km: 0,
            note: '',
          },
          {
            id: crypto.randomUUID(),
            name: search.get('to')?.trim() || 'Đồng Hới · Quảng Bình',
            minutes: 0,
            km: 500,
            note: '',
          },
        ],
  );
  const [rests, setRests] = useState<Record<string, number>>(
    Object.fromEntries(
      existing?.stops.filter((p) => p.stationId).map((p) => [p.stationId!, p.restMinutes]) ?? [],
    ),
  );
  const [text, setText] = useState(''),
    [source, setSource] = useState(existing?.sourceName ?? ''),
    [busy, setBusy] = useState(false),
    [filePreview, setFilePreview] = useState('');
  const [plate, setPlate] = useState(existing?.plate ?? user.plate ?? ''),
    [count, setCount] = useState(existing?.passengerCount ?? 1);
  const [company, setCompany] = useState(existing?.company ?? user.company ?? '');
  const [addPlate, setAddPlate] = useState(false);
  const [addCompany, setAddCompany] = useState(false);
  const [detailStationId, setDetailStationId] = useState<string | null>(null);
  const [title, setTitle] = useState(existing?.title ?? '');
  const recommendations = s.stations.filter((st) => {
    const km = placeInfo(st.name)?.km;
    return (
      km !== undefined &&
      points.some(
        (p, i) =>
          i > 0 &&
          placeInfo(points[i - 1].name) &&
          placeInfo(p.name) &&
          km > Math.min(placeInfo(points[i - 1].name)!.km, placeInfo(p.name)!.km) &&
          km < Math.max(placeInfo(points[i - 1].name)!.km, placeInfo(p.name)!.km),
      ) &&
      !points.some((p) => p.name === st.name)
    );
  });
  const selected = s.stations
    .filter((st) => rests[st.id] !== undefined)
    .map((st) => ({
      id: st.id,
      name: st.name,
      km: placeInfo(st.name)?.km ?? 0,
      minutes: rests[st.id],
    }));
  const balancedStations = recommendations
    .slice()
    .sort((a, b) => (placeInfo(a.name)?.km ?? 0) - (placeInfo(b.name)?.km ?? 0))
    .filter((_, index, all) => all.length < 3 || index === 0 || index === all.length - 1)
    .slice(0, 2);
  const stops = schedule(isoTime(departure), points, selected).map((p) => {
    const original = existing?.stops.find((old) =>
      p.stationId ? old.stationId === p.stationId : old.id === p.id,
    );
    return original ? { ...p, id: original.id, checkedInAt: original.checkedInAt } : p;
  });
  const baseline = schedule(isoTime(departure), points, []).at(-1)!.arrivalAt;
  const totalMinutes = Math.max(
    0,
    Math.round((Date.parse(stops.at(-1)!.arrivalAt) - Date.parse(stops[0].arrivalAt)) / 60000),
  );
  const drivingMinutes = Math.max(
    0,
    Math.round((Date.parse(baseline) - Date.parse(stops[0].arrivalAt)) / 60000),
  );
  const restMinutes = selected.reduce((total, stop) => total + stop.minutes, 0);
  const arrivalBufferMinutes = Math.round(
    (Date.parse(isoTime(desired)) - Date.parse(stops.at(-1)!.arrivalAt)) / 60000,
  );
  const startKm = placeInfo(points[0].name)?.km ?? 0;
  const routeTimeline = [
    ...points.map((point, index) => ({
      kind: 'waypoint' as const,
      id: point.id,
      name: point.name,
      note: point.note,
      routeKm: placeInfo(point.name)?.km ?? points.slice(1, index + 1).reduce((n, p) => n + p.km, 0),
      stop: stops.find((stop) => stop.id === point.id),
      pointIndex: index,
    })),
    ...recommendations.map((station) => ({
      kind: 'station' as const,
      id: station.id,
      name: station.name,
      routeKm: placeInfo(station.name)?.km ?? 0,
      station,
      stop: stops.find((stop) => stop.stationId === station.id),
      pointIndex: -1,
    })),
  ].sort((a, b) => a.routeKm - b.routeKm);
  const ownTrips = s.trips.filter((trip) => trip.ownerId === user.id);
  const vehicleOptions = [
    ...new Set(
      [user.plate, ...ownTrips.map((trip) => trip.plate), plate].filter(
        (value): value is string => Boolean(value),
      ),
    ),
  ];
  const companyOptions = [
    ...new Set(
      [user.company, ...ownTrips.map((trip) => trip.company), company].filter(
        (value): value is string => Boolean(value),
      ),
    ),
  ];
  const detailStation = s.stations.find((station) => station.id === detailStationId);
  const detailProducts = detailStation
    ? s.products
        .filter((product) => product.stationId === detailStation.id && product.available)
        .sort((a, b) => {
          const rank = { FOOD: 0, SPECIALTY: 1, DRINK: 2, CONVENIENCE: 3 };
          return rank[a.category] - rank[b.category];
        })
        .slice(0, 4)
    : [];
  const productPhotos: Record<string, string> = {
    'com-ga': 'chicken-rice',
    'pho-bo': 'beef-pho',
    'com-cafe': 'coffee',
    'cafe-sua': 'coffee',
    'banh-mi': 'banh-mi',
    'com-chay': 'rice-crackers',
  };
  const preview: Trip = {
    id: existing?.id ?? 'preview',
    title: title || `${points[0].name} → ${points.at(-1)!.name}`,
    origin: points[0].name,
    destination: points.at(-1)!.name,
    ownerId: user.id,
    members: existing?.members ?? [],
    publicTripCode: existing?.publicTripCode ?? '',
    status: existing?.status ?? 'READY',
    plate,
    company: company.trim() || undefined,
    passengerCount: count,
    partnerTrip: user.partnerStatus === 'approved',
    commissionEligible: user.partnerStatus === 'approved',
    stops,
    desiredArrivalAt: isoTime(desired),
    sourceName: source,
  };
  function update(id: string, patch: Partial<Waypoint>) {
    setPoints((a) => {
      const next = a.map((p, i) =>
        p.id === id
          ? {
              ...p,
              ...patch,
              ...(patch.name !== undefined
                ? {
                    stationId: s.stations.find(
                      (st) =>
                        st.name.toLocaleLowerCase('vi') === patch.name!.toLocaleLowerCase('vi'),
                    )?.id,
                  }
                : {}),
              ...(patch.name !== undefined && i
                ? { km: legDistance(a[i - 1].name, patch.name) }
                : {}),
              plannedAt: patch.name !== undefined ? undefined : p.plannedAt,
            }
          : p,
      );
      const index = next.findIndex((p) => p.id === id);
      if (patch.name !== undefined && next[index + 1])
        next[index + 1] = {
          ...next[index + 1],
          km: legDistance(next[index].name, next[index + 1].name),
        };
      return next;
    });
  }
  function importText(value: string, name: string) {
    const parsed = parseItinerary(value, departure);
    if (parsed.length < 2) {
      notify('Cần ít nhất hai điểm có giờ. Ví dụ: 07:00 Hà Nội, xuống dòng 20:00 Đà Nẵng.');
      return;
    }
    setPoints(
      parsed.map((p) => ({
        ...p,
        stationId: s.stations.find(
          (st) => st.name.toLocaleLowerCase('vi') === p.name.toLocaleLowerCase('vi'),
        )?.id,
      })),
    );
    setDeparture(localTime(parsed[0].plannedAt!));
    setDesired(localTime(parsed.at(-1)!.plannedAt!));
    setSource(name);
    setMode('manual');
    setRests({});
    notify('Đã tạo lịch trình. Bạn có thể chỉnh từng điểm trước khi tiếp tục.');
  }
  function applyBalancedStops() {
    if (!balancedStations.length) return;
    setRests(
      Object.fromEntries(
        balancedStations.map((station, index) => [station.id, index === 0 ? 15 : 25]),
      ),
    );
    notify(`Đã thêm ${balancedStations.length} điểm nghỉ phù hợp vào lịch trình.`);
  }
  function enterRestPlanning() {
    if (!existing && selected.length === 0 && balancedStations.length) applyBalancedStops();
    setStep(2);
  }
  function leaveEarlierToProtectArrival() {
    if (arrivalBufferMinutes >= 0) return;
    const nextDeparture = new Date(
      Date.parse(isoTime(departure)) + arrivalBufferMinutes * 60_000,
    ).toISOString();
    setDeparture(localTime(nextDeparture));
    notify(`Đã điều chỉnh giờ xuất phát sớm hơn ${Math.abs(arrivalBufferMinutes)} phút.`);
  }
  function generateDemoItinerary() {
    setBusy(true);
    setSource('AI Demo · Hà Nội → Quảng Bình');
    window.setTimeout(() => {
      setText(exampleText);
      importText(exampleText, 'AI Demo · Hà Nội → Quảng Bình');
      setBusy(false);
      notify('AI Demo đã tạo lịch Hà Nội → Quảng Bình. Bạn có thể chỉnh từng mốc trước khi tiếp tục.');
    }, 650);
  }
  async function readFile(file: File) {
    if (file.size > 20 * 1024 * 1024) return notify('Vui lòng chọn tệp nhỏ hơn 20 MB.');
    if (file.type !== 'application/pdf' && !file.type.startsWith('image/'))
      return notify('Chọn ảnh hoặc tệp PDF.');
    setBusy(true);
    setSource(file.name);
    try {
      if (file.type === 'application/pdf') {
        const pdf = await import('pdfjs-dist');
        pdf.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url,
        ).href;
        const loadingTask = pdf.getDocument({ data: await file.arrayBuffer() });
        const doc = await loadingTask.promise;
        let extracted = '';
        for (let n = 1; n <= Math.min(doc.numPages, 30); n++) {
          const page = await doc.getPage(n),
            content = await page.getTextContent();
          extracted +=
            content.items
              .map((item) =>
                'str' in item ? item.str + ('hasEOL' in item && item.hasEOL ? '\n' : ' ') : '',
              )
              .join('') + '\n';
        }
        await loadingTask.destroy();
        setText(extracted);
        notify(
          extracted.trim()
            ? 'Đã lấy văn bản từ PDF. Kiểm tra và chỉnh nội dung trước khi tạo lịch trình.'
            : 'PDF này không có lớp văn bản. Nhập mốc giờ hoặc chọn lịch trình gợi ý để chỉnh.',
        );
      } else {
        const reader = new FileReader();
        const value = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        setFilePreview(value);
        notify(
          'Đã nhận ảnh lịch trình. Nhập các mốc giờ bên dưới hoặc chọn lịch trình gợi ý để chỉnh.',
        );
      }
    } catch {
      notify('Chưa đọc được nội dung tệp. Bạn có thể dán văn bản hoặc nhập các điểm thủ công.');
    } finally {
      setBusy(false);
    }
  }
  function save() {
    if (
      existing &&
      s.merchantOrders.some(
        (o) => o.tripId === existing.id && !stops.some((p) => p.stationId === o.stationId),
      )
    )
      return notify('Không thể bỏ trạm đã có đơn đặt trước.');
    const trip = {
      ...preview,
      id: existing?.id ?? crypto.randomUUID(),
      publicTripCode:
        existing?.publicTripCode ?? `TV-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    };
    s.saveTrip(trip);
    notify(existing ? 'Đã cập nhật lịch trình.' : 'Đã lưu hành trình của bạn.');
    navigate(`/app/trips/${trip.id}`);
  }
  return (
    <>
      <Back
        title={existing ? 'Chỉnh lịch trình' : 'Lên lịch hành trình'}
        to={existing ? `/app/trips/${existing.id}` : '/app'}
      />
      <div className="stepper">
        {['Lịch trình', 'Nghỉ chân', 'Thông tin', 'Xác nhận'].map((v, i) => (
          <span key={v} className={step >= i + 1 ? 'active' : ''}>
            {i + 1}. {v}
          </span>
        ))}
      </div>
      {step === 1 && (
        <>
          <div className="tabs" data-tour="planner-mode">
            <button className={mode === 'manual' ? 'active' : ''} onClick={() => setMode('manual')}>
              Nhập thủ công
            </button>
            <button className={mode === 'import' ? 'active' : ''} onClick={() => setMode('import')}>
              Tự tạo bằng AI
            </button>
          </div>
          {mode === 'import' ? (
            <Card>
              <h2>Đưa lịch trình vào AI Demo</h2>
              <p>Tải PDF, ảnh hoặc dán nội dung. Demo tạo một lịch trình có thể chỉnh sửa, không gửi dữ liệu ra ngoài.</p>
              <label className="upload-zone">
                <Upload />
                <strong>{busy ? 'Đang đọc tài liệu…' : 'Tải ảnh hoặc PDF'}</strong>
                <small>Tối đa 20 MB · Ảnh được giữ để đối chiếu</small>
                <input
                  disabled={busy}
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void readFile(f);
                  }}
                />
              </label>
              {source && (
                <p>
                  <FileText size={16} /> {source}
                </p>
              )}
              {filePreview && (
                <img className="itinerary-preview" src={filePreview} alt="Ảnh lịch trình đã tải" />
              )}
              <label>
                Nội dung hành trình
                <textarea
                  rows={10}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={
                    'Dán lịch tour hoặc ghi các mốc địa điểm, hoạt động và thời lượng…'
                  }
                />
              </label>
              <small>
                Mỗi dòng: giờ, địa điểm | ghi chú | số phút tham quan. Ảnh và PDF dạng scan cần nhập
                lại các mốc giờ.
              </small>
              <button
                className="button full"
                disabled={busy}
                onClick={generateDemoItinerary}
              >
                {busy ? 'Đang tạo lịch trình…' : 'Tạo lịch Hà Nội → Quảng Bình'} <ArrowRight size={18} />
              </button>
              <button
                className="button secondary full"
                disabled={busy || !text.trim()}
                onClick={() => importText(text, source || 'Nội dung đã dán')}
              >
                Tạo lịch từ nội dung đã nhập
              </button>
              <p className="fine-print">AI Demo mô phỏng việc trích xuất thông tin; bạn luôn xem và chỉnh lịch trước khi lưu.</p>
            </Card>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (Date.parse(isoTime(desired)) <= Date.parse(isoTime(departure)))
                  return notify('Giờ muốn đến cần sau giờ xuất phát.');
                enterRestPlanning();
              }}
            >
              <Card>
                <h2>Chuyến đi theo cách của bạn</h2>
                {source && <p className="alert">Đã nhập từ {source}. Kiểm tra lại từng điểm.</p>}
                <label>
                  Tên hành trình
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ví dụ: Ba ngày khám phá miền Trung"
                  />
                </label>
                <label>
                  Thời điểm xuất phát
                  <input
                    required
                    type="datetime-local"
                    value={departure}
                    onChange={(e) => {
                      const shift =
                        Date.parse(isoTime(e.target.value)) - Date.parse(isoTime(departure));
                      setDeparture(e.target.value);
                      setPoints((p) =>
                        p.map((x) => ({
                          ...x,
                          plannedAt: x.plannedAt
                            ? new Date(Date.parse(x.plannedAt) + shift).toISOString()
                            : undefined,
                        })),
                      );
                    }}
                  />
                </label>
                <label>
                  Giờ đến mục tiêu
                  <input
                    required
                    type="datetime-local"
                    value={desired}
                    min={departure}
                    onChange={(e) => setDesired(e.target.value)}
                  />
                </label>
                <p className="planning-hint">Đây là giờ app dùng để giữ khoảng đệm. Sau đó bạn sẽ thấy phương án nghỉ chân vẫn kiểm soát được giờ đến.</p>
                <datalist id="journey-places">
                  {places.map((p) => (
                    <option key={p.name} value={p.name} />
                  ))}
                </datalist>
                {points.map((p, i) => (
                  <div className="waypoint-card" key={p.id}>
                    <div className="row">
                      <strong>
                        {i === 0
                          ? 'Điểm xuất phát'
                          : i === points.length - 1
                            ? 'Điểm cuối'
                            : `Điểm đến ${i}`}
                      </strong>
                      {i > 0 && i < points.length - 1 && (
                        <button
                          className="icon-button"
                          type="button"
                          aria-label={`Bỏ ${p.name}`}
                          onClick={() =>
                            setPoints((a) => {
                              const next = a.filter((x) => x.id !== p.id);
                              if (next[i])
                                next[i] = {
                                  ...next[i],
                                  km: legDistance(next[i - 1].name, next[i].name),
                                };
                              return next;
                            })
                          }
                        >
                          <Trash2 size={17} />
                        </button>
                      )}
                    </div>
                    <label>
                      Địa điểm
                      <input
                        list="journey-places"
                        required
                        value={p.name}
                        onChange={(e) => update(p.id, { name: e.target.value })}
                      />
                    </label>
                    {i > 0 && (
                      <div className="form-grid">
                        <label>
                          Quãng đường chặng (km)
                          <input
                            type="number"
                            required
                            min="1"
                            max="3000"
                            value={p.km}
                            onChange={(e) => update(p.id, { km: Number(e.target.value) })}
                          />
                        </label>
                        <label>
                          Tham quan / nghỉ (phút)
                          <input
                            type="number"
                            min="0"
                            max="1440"
                            value={p.minutes}
                            onChange={(e) => update(p.id, { minutes: Number(e.target.value) })}
                          />
                        </label>
                      </div>
                    )}
                    <label>
                      Hoạt động / ghi chú
                      <input
                        value={p.note}
                        onChange={(e) => update(p.id, { note: e.target.value })}
                        placeholder="Ăn trưa, tham quan, nhận phòng…"
                      />
                    </label>
                    {p.plannedAt && (
                      <small>
                        Mốc lịch gốc: {dateLabel(p.plannedAt)} · {clock(p.plannedAt)}
                      </small>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="button secondary full"
                  onClick={() =>
                    setPoints((a) => [
                      ...a.slice(0, -1),
                      { id: crypto.randomUUID(), name: '', minutes: 30, km: 80, note: '' },
                      a.at(-1)!,
                    ])
                  }
                >
                  <Plus size={18} /> Thêm điểm đến
                </button>
                <p className="fine-print">
                  Quãng đường gợi ý và thời gian chạy xe ở tốc độ trung bình 60 km/giờ. Chỉnh số km
                  nếu tuyến của bạn khác.
                </p>
              </Card>
              <button className="button full">Xem lịch trình cân bằng <ArrowRight size={18} /></button>
            </form>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <Card className="route-preview-card" data-tour="route-preview">
            <div className="row"><div><span className="eyebrow">TUYẾN ĐƯỜNG ĐỀ XUẤT</span><h2>{points[0].name} → {points.at(-1)?.name}</h2></div><Pill>{points.slice(1).reduce((total, point) => total + point.km, 0)} km</Pill></div>
            <RouteArt origin={points[0].name} destination={points.at(-1)?.name ?? 'Quảng Bình'} progress={0.48} />
            <div className="route-place-strip" aria-label="Các tỉnh thành đi qua">
              {points.map((point) => <span key={point.id}>{point.name}</span>)}
            </div>
            <p className="fine-print">Tuyến và thời lượng là dữ liệu mô phỏng theo lịch đã chọn, không dùng GPS hoặc chỉ đường thời gian thực.</p>
          </Card>
          <Card className="rest-summary-card">
            <span className="eyebrow">TỔNG THỜI GIAN HÀNH TRÌNH</span>
            <div className="rest-summary-total">
              <Clock size={22} />
              <strong>{Math.floor(totalMinutes / 60)} giờ {totalMinutes % 60} phút</strong>
            </div>
            <div className="rest-summary-stats">
              <span><strong>{points.slice(1).reduce((total, point) => total + point.km, 0)} km</strong> quãng đường</span>
              <span><strong>{Math.floor(drivingMinutes / 60)} giờ {drivingMinutes % 60} phút</strong> lái xe</span>
              <span><strong>{restMinutes} phút</strong> nghỉ chân</span>
            </div>
          </Card>
          <ArrivalSummary />
          {balancedStations.length > 0 && (
            <Card className="balanced-plan-card">
              <div>
                <span className="eyebrow">PHƯƠNG ÁN ĐỀ XUẤT</span>
                <h2>Lịch trình cân bằng</h2>
                <p>Chúng tôi đã chọn {balancedStations.length} điểm nghỉ theo nhịp lái xe, tiện ích và khả năng phục vụ khách.</p>
              </div>
              <div className="balanced-plan-stops">
                {balancedStations.map((station, index) => (
                  <span key={station.id}><Check size={13} /> {station.name.replace('Trạm Việt ', '')} · {index === 0 ? 15 : 25} phút</span>
                ))}
              </div>
              {balancedStations.some((station) => rests[station.id] === undefined) && (
                <button className="button secondary full" onClick={applyBalancedStops}>
                  <Check size={17} /> Dùng {balancedStations.length} điểm nghỉ đề xuất
                </button>
              )}
            </Card>
          )}
          <div className="rest-list-heading">
            <div>
              <h2>Nghỉ chân trên hành trình</h2>
              <p>Chọn trạm phù hợp để thêm vào lịch trình.</p>
            </div>
            <Pill>{selected.length} trạm đã chọn</Pill>
          </div>
          <div className="rest-timeline">
            {routeTimeline.map((item) => {
              const itemStation = item.kind === 'station' ? item.station : undefined;
              const selectedStation = itemStation ? rests[itemStation.id] !== undefined : false;
              const priorRest = selected
                .filter((stop) => stop.km < item.routeKm)
                .reduce((total, stop) => total + stop.minutes, 0);
              const estimatedAt =
                item.stop?.arrivalAt ??
                new Date(
                  Date.parse(isoTime(departure)) +
                    Math.max(0, item.routeKm - startKm) * 60000 +
                    priorRest * 60000,
                ).toISOString();
              return (
                <div
                  className={`rest-timeline-item ${item.kind === 'station' ? 'station-item' : 'waypoint-item'} ${selectedStation ? 'selected' : ''}`}
                  key={`${item.kind}-${item.id}`}
                >
                  <div className={`rest-timeline-marker ${item.pointIndex === 0 ? 'origin-marker' : item.pointIndex === points.length - 1 ? 'destination-marker' : ''}`}>
                    {item.kind === 'station' ? <Bus size={15} /> : <MapPin size={15} />}
                  </div>
                  <div className="rest-timeline-content">
                    <div className="rest-stop-meta">
                      <span>{item.pointIndex === 0 ? 'ĐIỂM XUẤT PHÁT' : item.pointIndex === points.length - 1 ? 'ĐIỂM ĐẾN' : itemStation ? 'TRẠM NGHỈ' : 'ĐIỂM TRÊN TUYẾN'}</span>
                      <strong>{clock(estimatedAt)}</strong>
                    </div>
                    <div className="rest-stop-main">
                      <div>
                        <h3>{item.name}</h3>
                        <small>{item.kind === 'station' ? itemStation?.address : item.note || `${Math.max(0, Math.round(item.routeKm - startKm))} km từ điểm xuất phát`}</small>
                      </div>
                      {itemStation && (
                        <label className="rest-select-control">
                          <input
                            type="checkbox"
                            aria-label={`Chọn ${itemStation.name} làm trạm nghỉ`}
                            checked={selectedStation}
                            onChange={(event) =>
                              setRests((current) => {
                                const next = { ...current };
                                if (event.target.checked) next[itemStation.id] = 15;
                                else delete next[itemStation.id];
                                return next;
                              })
                            }
                          />
                          <span>{selectedStation ? 'Đã thêm vào lịch' : 'Thêm vào lịch'}</span>
                        </label>
                      )}
                    </div>
                    {itemStation && (
                      <>
                        <div className="rest-station-services">
                          {itemStation.facilities.map((facility) => <span key={facility}>{facility}</span>)}
                        </div>
                        {selectedStation && (
                          <p className="rest-selection-reason">
                            {rests[itemStation.id]} phút nghỉ · {selected.length > 1 ? 'Khách có thể đặt trước để nhận nhanh khi xe đến.' : 'Phù hợp để nghỉ ngắn, dùng bữa hoặc vệ sinh.'}
                          </p>
                        )}
                        <div className="rest-station-actions">
                          <button className="button secondary" onClick={() => setDetailStationId(itemStation.id)}>
                            Chi tiết
                          </button>
                          {selectedStation && (
                            <label className="rest-duration-input">
                              Nghỉ
                              <input
                                type="number"
                                min="15"
                                max="240"
                                value={rests[itemStation.id]}
                                onChange={(event) =>
                                  setRests((current) => ({
                                    ...current,
                                    [itemStation.id]: Math.max(15, Math.min(240, Number(event.target.value))),
                                  }))
                                }
                              />
                              phút
                            </label>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {!recommendations.length && (
            <Card className="rest-no-stations">
              <p>Chưa có trạm gợi ý trên chặng này. Bạn vẫn có thể tiếp tục lịch trình hoặc quay lại điều chỉnh các điểm đến.</p>
            </Card>
          )}
          <button className="button full" onClick={() => {
            setStep(3);
          }}>
            {selected.length > 0
              ? `Tiếp tục với ${selected.length} điểm nghỉ · đến ${clock(stops.at(-1)!.arrivalAt)}`
              : 'Tiếp tục không có điểm nghỉ'}
          </button>
          <button className="button secondary full" onClick={() => setStep(1)}>
            Quay lại lịch trình
          </button>
        </>
      )}
      {step === 3 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStep(4);
          }}
        >
          <Card>
            <h2>Thông tin chuyến đi</h2>
            {user.role !== 'traveler' && (
              <>
                <label>
                  Biển số xe
                  <select
                    value={addPlate ? '__add__' : plate}
                    required={!addPlate}
                    onFocus={() => setAddPlate(false)}
                    onChange={(event) => {
                      if (event.target.value === '__add__') {
                        setPlate('');
                        setAddPlate(true);
                      } else setPlate(event.target.value);
                    }}
                  >
                    <option value="">Chọn xe đã lưu</option>
                    {vehicleOptions.map((vehicle) => <option key={vehicle} value={vehicle}>{vehicle}</option>)}
                    <option value="__add__">＋ Thêm xe mới</option>
                  </select>
                  {addPlate && (
                    <input
                      autoFocus
                      required
                      value={plate}
                      placeholder="Nhập biển số xe"
                      onChange={(event) => setPlate(event.target.value)}
                    />
                  )}
                </label>
                <label>
                  Nhà xe
                  <select
                    value={addCompany ? '__add__' : company}
                    onFocus={() => setAddCompany(false)}
                    onChange={(event) => {
                      if (event.target.value === '__add__') {
                        setCompany('');
                        setAddCompany(true);
                      } else setCompany(event.target.value);
                    }}
                  >
                    <option value="">Chọn nhà xe</option>
                    {companyOptions.map((savedCompany) => <option key={savedCompany} value={savedCompany}>{savedCompany}</option>)}
                    <option value="__add__">＋ Thêm nhà xe</option>
                  </select>
                  {addCompany && (
                    <input
                      autoFocus
                      required
                      value={company}
                      placeholder="Nhập tên nhà xe"
                      onChange={(event) => setCompany(event.target.value)}
                    />
                  )}
                </label>
              </>
            )}
            <label>
              Số người tham gia
              <input
                type="number"
                required
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              />
            </label>
            <p>Lịch trình sẽ được chia sẻ cho khách bằng đường dẫn hoặc mã QR.</p>
          </Card>
          <button className="button full">Xem lại hành trình</button>
          <button type="button" className="button secondary full" onClick={() => setStep(2)}>
            Quay lại điểm nghỉ
          </button>
        </form>
      )}
      {step === 4 && (
        <>
          <Card>
            <h2>{preview.title}</h2>
            <p>
              {preview.company ?? user.name} · {plate || 'Chuyến cá nhân'} · {count} người
            </p>
            <RouteArt origin={preview.origin} destination={preview.destination} />
            <Timeline trip={preview} />
          </Card>
          <ArrivalSummary />
          <button className="button full" onClick={save}>
            {existing ? 'Lưu thay đổi' : 'Tạo hành trình & sổ tay'}
          </button>
          <button className="button secondary full" onClick={() => setStep(3)}>
            Chỉnh thông tin
          </button>
        </>
      )}
      {detailStation && (
        <Modal title="Chi tiết trạm dừng" close={() => setDetailStationId(null)}>
          <div className="rest-detail-cover">
            <img src="/images/station-ninh-binh.webp" alt={detailStation.name} />
            <Pill tone={detailStation.partner ? 'green' : 'blue'}>
              {detailStation.partner ? 'Trạm đối tác' : 'Điểm dừng tham khảo'}
            </Pill>
          </div>
          <h3 className="rest-detail-title">{detailStation.name}</h3>
          <p className="rest-detail-address"><MapPin size={15} /> {detailStation.address}</p>
          <p>{detailStation.description}</p>
          <div className="rest-detail-hours">
            <Clock size={17} />
            <span>Mở cửa hàng ngày <strong>05:00 – 23:00</strong></span>
          </div>
          <h3 className="rest-detail-section-title">Dịch vụ tại trạm</h3>
          <div className="rest-detail-facilities">
            {detailStation.facilities.map((facility) => <span key={facility}>{facility}</span>)}
          </div>
          <h3 className="rest-detail-section-title">Món ngon và đặc sản</h3>
          <div className="rest-detail-products">
            {detailProducts.map((product) => (
              <div className="rest-detail-product" key={product.id}>
                {productPhotos[product.id] ? (
                  <img src={`/images/${productPhotos[product.id]}.webp`} alt={product.name} />
                ) : <span className="rest-detail-product-illustration">{product.illustration}</span>}
                <strong>{product.name}</strong>
                <span>{money(product.price)}</span>
                <small><Clock size={12} /> {product.prepMinutes} phút chuẩn bị</small>
              </div>
            ))}
          </div>
          <button
            className="button full"
            onClick={() => {
              setRests((current) => ({ ...current, [detailStation.id]: current[detailStation.id] ?? 15 }));
              setDetailStationId(null);
            }}
          >
            <Check size={17} /> Thêm trạm vào hành trình
          </button>
        </Modal>
      )}
      <Link className="text-link center" to="/app/trips">
        Chuyến đi của tôi
      </Link>
    </>
  );
  function ArrivalSummary() {
    const end = stops.at(-1)!.arrivalAt;
    return (
      <Card className={`arrival-plan-card ${arrivalBufferMinutes < 0 ? 'needs-adjustment' : ''}`}>
        <div className="arrival-plan-heading">
          <div>
            <span className="eyebrow">KIỂM SOÁT GIỜ ĐẾN</span>
            <h3>{arrivalBufferMinutes >= 0 ? 'Lịch trình vẫn đúng giờ' : 'Cần điều chỉnh lịch trình'}</h3>
          </div>
          <Pill tone={arrivalBufferMinutes >= 0 ? 'green' : 'blue'}>
            {arrivalBufferMinutes >= 0 ? `Còn ${arrivalBufferMinutes} phút đệm` : `Cần ${Math.abs(arrivalBufferMinutes)} phút`}
          </Pill>
        </div>
        <div className="row">
          <span>Dự kiến đến</span>
          <strong>
            {clock(end)} · {dateLabel(end)}
          </strong>
        </div>
        <p>
          {selected.length > 0
            ? `${selected.length} điểm nghỉ · ${restMinutes} phút nghỉ chân được đưa vào kế hoạch.`
            : 'Chưa có điểm nghỉ trong lịch trình này.'}
        </p>
        <small>Giờ đến mục tiêu: {clock(isoTime(desired))} · {dateLabel(isoTime(desired))}</small>
        {arrivalBufferMinutes < 0 && (
          <button className="button secondary full" onClick={leaveEarlierToProtectArrival}>
            Xuất phát sớm hơn {Math.abs(arrivalBufferMinutes)} phút để giữ kế hoạch
          </button>
        )}
      </Card>
    );
  }
}
