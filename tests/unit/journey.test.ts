import { describe, expect, it } from 'vitest';
import { createSeed } from '../../src/demo/data';
import {
  exampleText,
  legDistance,
  parseItinerary,
  pickupEstimate,
  schedule,
  tripWaypoints,
  type Waypoint,
} from '../../src/lib/journey';
describe('Travel planning and handbook', () => {
  it('keeps rest minutes and route distance consistent when opening an itinerary for editing', () => {
    const points = parseItinerary(exampleText, '2026-10-03T07:00');
    const rests = [{ id: 'station-ninh-binh', name: 'Trạm Việt Ninh Bình', km: 95, minutes: 15 }];
    const first = schedule(points[0].plannedAt!, points, rests);
    const trip = { ...createSeed().trips[0], stops: first };
    const restored = tripWaypoints(trip),
      second = schedule(first[0].arrivalAt, restored, rests);
    expect(second.at(-1)?.arrivalAt).toBe(first.at(-1)?.arrivalAt);
    expect(second.reduce((n, p) => n + (p.distanceKm ?? 0), 0)).toBe(
      first.reduce((n, p) => n + (p.distanceKm ?? 0), 0),
    );
  });
  it('matches destination names with or without Vietnamese accents', () => {
    expect(legDistance('Ninh Bình', 'Da Nang')).toBe(680);
    expect(legDistance('Ha Noi', 'Đà Nẵng')).toBe(785);
  });
  it('starts with no trip for the initial traveler while keeping station operations', () => {
    const s = createSeed();
    expect(s.currentUserId).toBe('user-anh');
    expect(
      s.trips.filter((t) => t.ownerId === s.currentUserId || t.members.includes(s.currentUserId)),
    ).toHaveLength(0);
    expect(s.merchantOrders).toHaveLength(47);
  });
  it('imports the complete three day journey and keeps notes', () => {
    const points = parseItinerary(exampleText, '2026-10-03T07:00');
    expect(points).toHaveLength(11);
    expect(points.at(-1)?.plannedAt).toBe('2026-10-05T05:00:00.000Z');
    expect(points.some((p) => p.name === 'Đại Nội Huế' && p.note.includes('cung đình'))).toBe(true);
    expect(parseItinerary('Không có giờ hoặc địa điểm', '2026-10-03T07:00')).toHaveLength(0);
  });
  it('adds rest to arrival exactly and does not count distance twice', () => {
    const points: Waypoint[] = [
      { id: 'a', name: 'Hà Nội', km: 0, minutes: 0, note: '' },
      { id: 'b', name: 'Đà Nẵng', km: 785, minutes: 0, note: '' },
    ];
    const base = schedule('2026-10-03T00:00:00Z', points, []);
    const rests = [{ id: 'station-ninh-binh', name: 'Trạm Việt Ninh Bình', km: 95, minutes: 15 }];
    const next = schedule('2026-10-03T00:00:00Z', points, rests);
    expect(Date.parse(next.at(-1)!.arrivalAt) - Date.parse(base.at(-1)!.arrivalAt)).toBe(
      15 * 60000,
    );
    expect(next.reduce((sum, p) => sum + (p.distanceKm ?? 0), 0)).toBe(785);
    rests[0].minutes = 45;
    const longer = schedule('2026-10-03T00:00:00Z', points, rests);
    expect(Date.parse(longer.at(-1)!.arrivalAt) - Date.parse(next.at(-1)!.arrivalAt)).toBe(
      30 * 60000,
    );
  });
  it('adds a rest to the last imported day instead of hiding it in waiting time', () => {
    const p = parseItinerary(exampleText, '2026-10-03T07:00');
    const a = schedule(p[0].plannedAt!, p, []),
      b = schedule(p[0].plannedAt!, p, [
        { id: 'station-ninh-binh', name: 'Trạm Việt Ninh Bình', km: 95, minutes: 15 },
      ]);
    expect(Date.parse(b.at(-1)!.arrivalAt) - Date.parse(a.at(-1)!.arrivalAt)).toBe(900000);
  });
  it('uses remaining distance and saved journey speed for pickup', () => {
    const s = createSeed(),
      t = s.trips[0],
      stop = t.stops[1];
    const a = pickupEstimate(t, stop, s.demoTime);
    expect(a.minutes).toBe(42);
    expect(a.distance).toBe(30);
    expect(a.arrivalAt).toBe(new Date(stop.arrivalAt).toISOString());
    const b = pickupEstimate(t, stop, new Date(Date.parse(s.demoTime) + 20 * 60000).toISOString());
    expect(b.distance).toBeLessThan(a.distance);
    expect(b.minutes).toBe(22);
  });
});
