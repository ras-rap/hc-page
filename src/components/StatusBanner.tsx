import type { Service } from '../types';
import { formatDay, parseDay } from '../lib/format';
import { overallStatus } from '../lib/status';

interface Props {
  services: Service[];
  lastUpdated: string;
}

export function StatusBanner({ services, lastUpdated }: Props) {
  const { level, headline, detail } = overallStatus(services);

  return (
    <section className="banner" data-level={level} aria-label="Overall status">
      <span className="banner-dot" aria-hidden="true" />
      <div className="banner-text">
        <p className="banner-headline">{headline}</p>
        {detail && <p className="banner-detail">{detail}</p>}
      </div>
      <time className="banner-updated" dateTime={lastUpdated}>
        Updated {formatDay(parseDay(lastUpdated))}
      </time>
    </section>
  );
}
