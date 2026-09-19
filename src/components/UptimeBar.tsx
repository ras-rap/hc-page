import { useMemo } from 'react';
import type { ServiceStatus } from '../types';
import { formatDay, parseDay } from '../lib/format';

const DAYS = 90;

type Tick = 'up' | 'degraded' | 'down' | 'maintenance';

const TICK_LABEL: Record<Tick, string> = {
  up: 'No incidents',
  degraded: 'Degraded',
  down: 'Outage',
  maintenance: 'Maintenance',
};

/** How the most recent days reflect the service's current status. */
const RECENT: Record<ServiceStatus, [days: number, tick: Tick] | null> = {
  operational: null,
  degraded: [2, 'degraded'],
  maintenance: [5, 'maintenance'],
  outage: [1, 'down'],
};

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small seeded PRNG so a service always gets the same history. */
function mulberry32(seed: number): () => number {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTicks(id: string, status: ServiceStatus): Tick[] {
  const rand = mulberry32(hash(id));
  const ticks: Tick[] = Array.from({ length: DAYS }, () => (rand() < 0.015 ? 'degraded' : 'up'));
  const recent = RECENT[status];
  if (recent) {
    const [days, tick] = recent;
    for (let i = 0; i < days; i++) ticks[DAYS - 1 - i] = tick;
  }
  return ticks;
}

interface Props {
  id: string;
  status: ServiceStatus;
  /** ISO date treated as "today" (the last tick). */
  today: string;
}

/** Decorative: the history is generated, not measured. */
export function UptimeBar({ id, status, today }: Props) {
  const { ticks, uptime, incidentDays } = useMemo(() => {
    const ticks = buildTicks(id, status);
    const incidentDays = ticks.filter((t) => t === 'degraded' || t === 'down').length;
    const uptime = (((DAYS - incidentDays) / DAYS) * 100).toFixed(1);
    return { ticks, uptime, incidentDays };
  }, [id, status]);

  const end = parseDay(today);

  return (
    <div className="uptime">
      <div
        className="uptime-bar"
        role="img"
        aria-label={`Last ${DAYS} days: ${uptime}% uptime, ${incidentDays} days with incidents`}
      >
        {ticks.map((tick, i) => {
          const day = new Date(end);
          day.setDate(end.getDate() - (DAYS - 1 - i));
          return (
            <span
              key={i}
              className="tick"
              data-tick={tick}
              title={`${formatDay(day)}: ${TICK_LABEL[tick]}`}
            />
          );
        })}
      </div>
      <div className="uptime-meta" aria-hidden="true">
        <span>{DAYS} days ago</span>
        <span>{uptime}% uptime</span>
        <span>Today</span>
      </div>
    </div>
  );
}
