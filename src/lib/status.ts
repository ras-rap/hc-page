import type { Service, ServiceStatus } from '../types';

export const STATUS_LABEL: Record<ServiceStatus, string> = {
  operational: 'Operational',
  degraded: 'Degraded',
  maintenance: 'Under maintenance',
  outage: 'Outage',
};

export type BannerLevel = 'operational' | 'degraded' | 'outage';

export interface Overall {
  level: BannerLevel;
  headline: string;
  detail?: string;
}

function count(services: Service[], status: ServiceStatus): number {
  return services.filter((s) => s.status === status).length;
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`;
}

/** Roll every service up into the single line the banner shows. */
export function overallStatus(services: Service[]): Overall {
  const outages = count(services, 'outage');
  const degraded = count(services, 'degraded');
  const maintenance = count(services, 'maintenance');

  if (outages > 0) {
    return {
      level: 'outage',
      headline: 'Major outage',
      detail: `${plural(outages, 'service is', 'services are')} down.`,
    };
  }
  if (degraded > 0) {
    return {
      level: 'degraded',
      headline: 'Partial degradation',
      detail: `${plural(degraded, 'service is', 'services are')} running with known issues.`,
    };
  }
  return {
    level: 'operational',
    headline: 'All systems operational',
    detail:
      maintenance > 0
        ? `${plural(maintenance, 'service is', 'services are')} under maintenance.`
        : undefined,
  };
}
