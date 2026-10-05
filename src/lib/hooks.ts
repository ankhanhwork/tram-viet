import { useLocation, useParams } from 'react-router-dom';
import { useDemoStore } from '../store/useDemoStore';
export function useTripContext() {
  const { tripId, code, stationId } = useParams();
  const location = useLocation();
  const data = useDemoStore();
  const guest = location.pathname.startsWith('/t/') || location.pathname.startsWith('/qr/');
  const trip = data.trips.find((t) =>
    guest ? t.publicTripCode === code || t.id === tripId : t.id === tripId,
  );
  const base = trip ? (guest ? `/t/${trip.publicTripCode}` : `/app/trips/${trip.id}`) : '/app';
  const station = data.stations.find((s) => s.id === stationId);
  return { data, guest, trip, base, station };
}
