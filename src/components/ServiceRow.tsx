import { useEffect, useId, useState } from 'react';
import type { Service } from '../types';
import { formatDay, parseDay } from '../lib/format';
import { FallingText } from './FallingText';
import { StatusPill } from './StatusPill';
import { UptimeBar } from './UptimeBar';

interface Props {
  service: Service;
  today: string;
  outageAnimationKey: number;
  outageActive: boolean;
}

export function ServiceRow({ service, today, outageAnimationKey, outageActive }: Props) {
  const [open, setOpen] = useState(false);
  const [outageProgress, setOutageProgress] = useState<number | null>(null);
  const panelId = useId();
  const { name, created, status, blurb, stack, repo, live, screenshot } = service;

  const hasDetails = Boolean(stack?.length || repo || live || screenshot);

  useEffect(() => {
    if (outageAnimationKey === 0 || status !== 'outage') {
      return;
    }

    let progress = 0;
    const timer = window.setInterval(() => {
      progress += 1;
      setOutageProgress(progress);
      if (progress === 90) window.clearInterval(timer);
    }, 40);

    return () => window.clearInterval(timer);
  }, [outageAnimationKey, status]);

  return (
    <li className="service">
      <button
        type="button"
        className="service-head"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        disabled={!hasDetails}
      >
        <span className="service-name">{name}</span>
        <StatusPill status={status} />
        <span className="chevron" data-open={open} aria-hidden="true" />
      </button>

      <div className="service-summary">
        <p className="service-blurb">
          <FallingText text={blurb} active={outageActive} />
        </p>
        <p className="service-created">Created {formatDay(parseDay(created))}</p>
        <UptimeBar id={service.id} status={status} today={today} outageProgress={outageProgress} />
      </div>

      <div className="panel" id={panelId} data-open={open}>
        <div className="panel-inner">
          <div className="panel-content">
            {screenshot && (
              <img
                className="shot"
                src={`${import.meta.env.BASE_URL}${screenshot}`}
                alt={`Screenshot of ${name}`}
                loading="lazy"
              />
            )}
            {stack && stack.length > 0 && <p className="stack">Built with {stack.join(', ')}</p>}
            {(repo || live) && (
              <p className="links">
                {live && (
                  <a href={live} target="_blank" rel="noreferrer">
                    Visit site
                  </a>
                )}
                {repo && (
                  <a href={repo} target="_blank" rel="noreferrer">
                    View source
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
