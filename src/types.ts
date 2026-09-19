export type ServiceStatus = 'operational' | 'degraded' | 'maintenance' | 'outage';

export interface Service {
  id: string;
  name: string;
  /** ISO date when the project was first created. */
  created: string;
  status: ServiceStatus;
  /** One plain sentence about what it is. */
  blurb: string;
  stack?: string[];
  repo?: string;
  live?: string;
  /** Path inside /public, e.g. "screenshots/keyboard-pcb.png" */
  screenshot?: string;
}

export interface Incident {
  /** ISO date, YYYY-MM-DD */
  date: string;
  title: string;
  resolved: boolean;
  body: string;
}

export interface ContactLink {
  label: string;
  href: string;
}
