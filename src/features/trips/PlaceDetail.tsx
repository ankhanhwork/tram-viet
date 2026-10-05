import { Link, useParams } from 'react-router-dom';
import { Back, Card, Missing, Pill, RouteArt } from '../../components/ui';
import { useTripContext } from '../../lib/hooks';
import { placeInfo } from '../../lib/journey';
import { clock, dateLabel } from '../../lib/rules';
export function PlaceDetail() {
  const { trip, base, guest } = useTripContext(),
    { stopId } = useParams();
  const stop = trip?.stops.find((p) => p.id === stopId);
  if (!trip || !stop) return <Missing />;
  const info = placeInfo(stop.name),
    index = trip.stops.indexOf(stop);
  return (
    <>
      <Back title="Sổ tay địa điểm" to={guest ? `${base}/journey` : base} />
      <RouteArt origin={trip.origin} destination={stop.name} />
      <Card>
        <Pill>
          Điểm {index + 1} / {trip.stops.length}
        </Pill>
        <h1>{stop.name}</h1>
        <p>
          {dateLabel(stop.arrivalAt)} · Dự kiến đến {clock(stop.arrivalAt)}
        </p>
        <p>{stop.restMinutes ? `Dành ${stop.restMinutes} phút tại đây` : 'Điểm trong lộ trình'}</p>
        {stop.note && <div className="alert">{stop.note}</div>}
        <h2>Khám phá địa điểm</h2>
        <p>
          {info?.description ??
            'Điểm đến trong lịch trình của bạn. Kiểm tra ghi chú và sắp xếp thời gian tham quan, nghỉ ngơi phù hợp.'}
        </p>
        {info && (
          <div className="facility-list">
            {info.highlights.split(' · ').map((h) => (
              <Pill key={h}>{h}</Pill>
            ))}
          </div>
        )}
        <small>Kiểm tra thời tiết, giờ mở cửa và thông tin tại địa phương trước khi đến.</small>
      </Card>
      {stop.stationId && (
        <Link className="button full" to={`${base}/station/${stop.stationId}`}>
          Xem trạm & đặt món trước
        </Link>
      )}
      <div className="row">
        {index > 0 && (
          <Link className="button secondary" to={`${base}/places/${trip.stops[index - 1].id}`}>
            Điểm trước
          </Link>
        )}
        {index < trip.stops.length - 1 && (
          <Link className="button secondary" to={`${base}/places/${trip.stops[index + 1].id}`}>
            Điểm tiếp theo
          </Link>
        )}
      </div>
    </>
  );
}
