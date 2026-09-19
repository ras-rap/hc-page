import { useEffect, useRef, useState } from 'react';
import { Contact } from './components/Contact';
import { FallingText } from './components/FallingText';
import { Incidents } from './components/Incidents';
import { ServiceRow } from './components/ServiceRow';
import { StatusBanner } from './components/StatusBanner';
import { Terminal } from './components/Terminal';
import { incidents, profile, services } from './data';
import type { ServiceStatus } from './types';

export default function App() {
  const [displayedServices, setDisplayedServices] = useState(services);
  const [outageAnimationKey, setOutageAnimationKey] = useState(0);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const konamiIndex = useRef(0);

  function resetStatuses() {
    setOutageAnimationKey(0);
    setDisplayedServices(services);
  }

  function activateKonami() {
    setOutageAnimationKey((currentKey) => currentKey + 1);
    setDisplayedServices((currentServices) =>
      currentServices.map((service) => ({ ...service, status: 'outage' })),
    );
  }

  function resetKonami() {
    konamiIndex.current = 0;
    setOutageAnimationKey(0);
    resetStatuses();
  }

  // Konami code listener.
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let outageTimer: number | undefined;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === konamiCode[konamiIndex.current]) {
        konamiIndex.current += 1;
        if (konamiIndex.current === konamiCode.length) {

          if (outageTimer !== undefined) window.clearInterval(outageTimer);
          setOutageAnimationKey((currentKey) => currentKey + 1);

          let outageIndex = 0;
          outageTimer = window.setInterval(() => {
            const currentOutageIndex = outageIndex;
            setDisplayedServices((currentServices) =>
              currentServices.map((service, index) =>
                index === currentOutageIndex ? { ...service, status: 'outage' } : service,
              ),
            );
            outageIndex += 1;
            if (outageIndex === services.length) {
              window.clearInterval(outageTimer);
              outageTimer = undefined;
            }
          }, 500);

          konamiIndex.current = 0;
        }
      } else {
        konamiIndex.current = event.key === konamiCode[0] ? 1 : 0;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (outageTimer !== undefined) window.clearInterval(outageTimer);
    };
  }, []);

  // Terminal open/close listener.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      if (!isTyping && (event.key === '`' || event.key === '~' || event.key === '/')) {
        event.preventDefault();
        setTerminalOpen(true);
      }
      if (event.key === 'Escape') setTerminalOpen(false);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="page" data-outage={outageAnimationKey > 0 ? 'active' : undefined}>
      <header className="masthead">
        <h1 className="handle">{profile.handle}</h1>
        <p className="tagline">
          <FallingText text={profile.tagline} active={outageAnimationKey > 0} />
        </p>
      </header>

      <main>
        <StatusBanner services={displayedServices} lastUpdated={profile.lastUpdated} />

        <section className="section" aria-labelledby="services-heading">
          <h2 id="services-heading">Services</h2>
          <ul className="service-list">
            {displayedServices.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                today={profile.lastUpdated}
                outageAnimationKey={outageAnimationKey}
                outageActive={outageAnimationKey > 0}
              />
            ))}
          </ul>
        </section>

        <Incidents incidents={incidents} />
        <Contact links={profile.contacts} />
      </main>

      <footer className="footer">
        <p>
          Built with React and TypeScript.{' '}
          <a href={profile.repo} target="_blank" rel="noreferrer">
            Source on GitHub
          </a>
          .
        </p>
      </footer>

      {terminalOpen && (
        <Terminal
          services={displayedServices}
          konamiActive={outageAnimationKey > 0}
          onStatusChange={(serviceId, status: ServiceStatus) => {
            setDisplayedServices((currentServices) =>
              currentServices.map((service) => (service.id === serviceId ? { ...service, status } : service)),
            );
          }}
          onResetStatuses={resetStatuses}
          onActivateKonami={activateKonami}
          onResetKonami={resetKonami}
          onClose={() => setTerminalOpen(false)}
        />
      )}
    </div>
  );
}
