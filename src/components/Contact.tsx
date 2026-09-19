import type { ContactLink } from '../types';

export function Contact({ links }: { links: ContactLink[] }) {
  return (
    <section className="section" aria-labelledby="contact-heading">
      <h2 id="contact-heading">Contact</h2>
      <p className="contact-intro">Something broken, or want to build something together? Reach me here.</p>
      <ul className="contact-list">
        {links.map((link) => (
          <li key={link.href}>
            <a className="contact-link" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
