import { Contact } from './components/Contact';
import { Incidents } from './components/Incidents';
import { ServiceRow } from './components/ServiceRow';
import { StatusBanner } from './components/StatusBanner';
import { incidents, profile, services } from './data';

export default function App() {
  return (
    <div className="page">
      <header className="masthead">
        <h1 className="handle">{profile.handle}</h1>
        <p className="tagline">{profile.tagline}</p>
      </header>

      <main>
        <StatusBanner services={services} lastUpdated={profile.lastUpdated} />

        <section className="section" aria-labelledby="services-heading">
          <h2 id="services-heading">Services</h2>
          <ul className="service-list">
            {services.map((service) => (
              <ServiceRow key={service.id} service={service} today={profile.lastUpdated} />
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
