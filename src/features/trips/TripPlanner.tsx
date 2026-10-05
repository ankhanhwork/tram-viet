import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Plus, Trash2, Upload, FileText, ArrowRight } from 'lucide-react';
import { Back, Card, Timeline, RouteArt, notify } from '../../components/ui';
import { useDemoStore } from '../../store/useDemoStore';
import { clock, dateLabel } from '../../lib/rules';
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
  const [step, setStep] = useState(1),
    [mode, setMode] = useState(search.get('mode') === 'import' ? 'import' : 'manual');
  const [departure, setDeparture] = useState(localTime(existing?.stops[0].arrivalAt ?? s.demoTime));
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
          { id: crypto.randomUUID(), name: 'Hà Nội', minutes: 0, km: 0, note: '' },
          { id: crypto.randomUUID(), name: 'Đà Nẵng', minutes: 0, km: 785, note: '' },
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
  const stops = schedule(isoTime(departure), points, selected).map((p) => {
    const original = existing?.stops.find((old) =>
      p.stationId ? old.stationId === p.stationId : old.id === p.id,
    );
    return original ? { ...p, id: original.id, checkedInAt: original.checkedInAt } : p;
  });
  const baseline = schedule(isoTime(departure), points, []).at(-1)!.arrivalAt;
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
    company: user.role === 'coach' ? user.company : undefined,
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
          <div className="tabs">
            <button className={mode === 'manual' ? 'active' : ''} onClick={() => setMode('manual')}>
              Tự lên lịch
            </button>
            <button className={mode === 'import' ? 'active' : ''} onClick={() => setMode('import')}>
              Nhập lịch trình
            </button>
          </div>
          {mode === 'import' ? (
            <Card>
              <h2>Đưa lịch trình vào sổ tay</h2>
              <p>Tải ảnh, PDF hoặc dán nội dung chuyến đi của bạn.</p>
              <label className="upload-zone">
                <Upload />
                <strong>{busy ? 'Đang đọc tệp…' : 'Chọn ảnh hoặc PDF'}</strong>
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
                Nội dung lịch trình
                <textarea
                  rows={10}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={
                    'Ngày 1\n07:00 Hà Nội | Khởi hành | 0\n10:00 Ninh Bình | Tham quan | 60\nNgày 2\n17:00 Đà Nẵng | Kết thúc | 0'
                  }
                />
              </label>
              <small>
                Mỗi dòng: giờ, địa điểm | ghi chú | số phút tham quan. Ảnh và PDF dạng scan cần nhập
                lại các mốc giờ.
              </small>
              <button
                className="button full"
                disabled={busy || !text.trim()}
                onClick={() => importText(text, source || 'Nội dung đã dán')}
              >
                Tạo lịch từ nội dung <ArrowRight size={18} />
              </button>
              <button
                className="button secondary full"
                onClick={() => {
                  setText(exampleText);
                  notify('Đã điền lịch trình gợi ý 3 ngày. Bạn có thể sửa trước khi tạo.');
                }}
              >
                Xem gợi ý Hà Nội → Đà Nẵng · 3 ngày
              </button>
            </Card>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (Date.parse(isoTime(desired)) <= Date.parse(isoTime(departure)))
                  return notify('Giờ muốn đến cần sau giờ xuất phát.');
                setStep(2);
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
                  Thời điểm mong muốn đến
                  <input
                    required
                    type="datetime-local"
                    value={desired}
                    min={departure}
                    onChange={(e) => setDesired(e.target.value)}
                  />
                </label>
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
              <button className="button full">Tiếp tục · Chọn nơi nghỉ chân</button>
            </form>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <Card>
            <h2>Nghỉ một chút, đi xa hơn</h2>
            <p>
              Các trạm trên chặng chưa có điểm nghỉ. Chọn trạm phù hợp; mỗi lần dừng mặc định 15
              phút.
            </p>
            {!recommendations.length && (
              <p>
                Chưa có trạm phù hợp giữa các điểm này. Bạn vẫn có thể thêm điểm nghỉ trong lịch
                trình.
              </p>
            )}
            {recommendations.map((st) => (
              <div className="rest-option" key={st.id}>
                <img src="/images/station-ninh-binh.webp" alt={st.name} />
                <label className="selection-card">
                  <input
                    type="checkbox"
                    checked={rests[st.id] !== undefined}
                    onChange={(e) =>
                      setRests((a) => {
                        const next = { ...a };
                        if (e.target.checked) next[st.id] = 15;
                        else delete next[st.id];
                        return next;
                      })
                    }
                  />
                  <span>
                    <strong>{st.name}</strong>
                    <small>{st.facilities.join(' · ')}</small>
                  </span>
                </label>
                {rests[st.id] !== undefined && (
                  <label>
                    Thời gian nghỉ (phút)
                    <input
                      type="number"
                      min="15"
                      max="240"
                      value={rests[st.id]}
                      onChange={(e) =>
                        setRests((a) => ({
                          ...a,
                          [st.id]: Math.max(15, Math.min(240, Number(e.target.value))),
                        }))
                      }
                    />
                  </label>
                )}
              </div>
            ))}
          </Card>
          <ArrivalSummary />
          <button className="button full" onClick={() => setStep(3)}>
            Tiếp tục · Thông tin chuyến đi
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
            <label>
              Biển số xe
              <input
                value={plate}
                required={user.role !== 'traveler'}
                placeholder="Ví dụ: 29B-123.45"
                onChange={(e) => setPlate(e.target.value)}
              />
            </label>
            {user.role === 'coach' && user.company && (
              <div className="alert">
                <strong>Nhà xe: {user.company}</strong>
                <small>Thông tin từ tài khoản tài xế đã đăng ký.</small>
              </div>
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
      <Link className="text-link center" to="/app/trips">
        Chuyến đi của tôi
      </Link>
    </>
  );
  function ArrivalSummary() {
    const end = stops.at(-1)!.arrivalAt,
      added = Math.round((Date.parse(end) - Date.parse(baseline)) / 60000),
      late = Math.max(0, Math.round((Date.parse(end) - Date.parse(isoTime(desired))) / 60000));
    return (
      <Card className="blue-card">
        <h3>Giờ đến điểm cuối</h3>
        <div className="row">
          <span>Dự kiến đến</span>
          <strong>
            {clock(end)} · {dateLabel(end)}
          </strong>
        </div>
        <p>Thêm {added} phút nghỉ chân vào lịch trình.</p>
        <small>
          Mong muốn: {clock(isoTime(desired))} · {dateLabel(isoTime(desired))}
        </small>
        {late > 0 && (
          <p className="error-text">
            Muộn hơn mong muốn {late} phút. Cân nhắc xuất phát sớm hơn hoặc rút ngắn thời gian tham
            quan.
          </p>
        )}
      </Card>
    );
  }
}
