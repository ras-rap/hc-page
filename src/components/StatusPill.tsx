import type { ServiceStatus } from '../types';
import { STATUS_LABEL } from '../lib/status';

export function StatusPill({ status }: { status: ServiceStatus }) {
  return (
    <span className="pill" data-status={status}>
      {STATUS_LABEL[status]}
    </span>
  );
}
