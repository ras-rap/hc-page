import { useEffect, useState } from 'react';
import { Contact } from './components/Contact';
import { FallingText } from './components/FallingText';
import { Incidents } from './components/Incidents';
import { ServiceRow } from './components/ServiceRow';
import { StatusBanner } from './components/StatusBanner';
import { incidents, profile, services } from './data';

export default function App() {
  const [displayedServices, setDisplayedServices] = useState(services);
  const [outageAnimationKey, setOutageAnimationKey] = useState(0);

  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    let outageTimer: number | undefined;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === konamiCode[konamiIndex]) {
        konamiIndex += 1;
        if (konamiIndex === konamiCode.length) {

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

          konamiIndex = 0;
        }
      } else {
        konamiIndex = event.key === konamiCode[0] ? 1 : 0;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (outageTimer !== undefined) window.clearInterval(outageTimer);
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
    </div>
  );
}
