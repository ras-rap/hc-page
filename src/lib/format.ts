/** Parse an ISO date (YYYY-MM-DD) as local midnight so it never shifts a day. */
export function parseDay(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function formatDay(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
