import { useId, useState } from 'react';
import type { Service } from '../types';
import { StatusPill } from './StatusPill';
import { UptimeBar } from './UptimeBar';

interface Props {
  service: Service;
  today: string;
}

export function ServiceRow({ service, today }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const { name, status, blurb, stack, repo, live, screenshot } = service;

  const hasDetails = Boolean(stack?.length || repo || live || screenshot);

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
        <p className="service-blurb">{blurb}</p>
        <UptimeBar id={service.id} status={status} today={today} />
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
