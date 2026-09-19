import type { Incident } from '../types';
import { formatDay, parseDay } from '../lib/format';

export function Incidents({ incidents }: { incidents: Incident[] }) {
  return (
    <section className="section" aria-labelledby="incidents-heading">
      <h2 id="incidents-heading">Past incidents</h2>
      <ol className="incident-list">
        {incidents.map((incident) => (
          <li key={incident.date + incident.title} className="incident">
            <time className="incident-date" dateTime={incident.date}>
              {formatDay(parseDay(incident.date))}
            </time>
            <p className="incident-title">
              {incident.title}
              {incident.resolved && <span className="incident-resolved">Resolved</span>}
            </p>
            <p className="incident-body">{incident.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
