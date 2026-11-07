import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { brand, social, helpfulLinks, contact } from '../data/content.js';
import { services } from '../data/services.js';
import Logo from './Logo.jsx';
import useAsync from '../lib/useAsync.js';
import { getVisitorCount } from '../lib/wp.js';

// Shows the running total of visits; hidden if the WordPress counter can't be reached
function VisitorCounter() {
  const { data } = useAsync(getVisitorCount, []);
  if (data == null) return null;
  const digits = String(data).padStart(5, '0').split('');
  return (
    <div className="container-x flex items-center justify-center gap-3 pt-4 text-sm text-slate-200">
      <span aria-hidden="true">👁️</span>
      <span>Total Visitors</span>
      <span className="flex gap-1" aria-label={`${data} visitors`}>
        {digits.map((d, i) => (
          <span key={i} className="flex h-7 w-6 items-center justify-center rounded bg-[#264689] font-mono text-sm font-bold text-white">{d}</span>
        ))}
      </span>
    </div>
  );
}

// Round button that appears after scrolling down and smoothly returns to the top
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#ff8c00] text-white shadow-lg shadow-orange-500/40 transition duration-300 hover:-translate-y-1 hover:bg-[#e67e00] ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'}`}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
}

const icons = {
  Facebook: 'M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.9c-.3 0-1.3-.2-2.4-.2-2.5 0-4.1 1.5-4.1 4.2v2.6H7.5v3.3h2.9V22h3.1Z',
  Youtube: 'M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z',
};

const Heading = ({ children }) => (
  <h4 style={{ color: "#fff" }} className="relative mb-5 pb-3 text-base font-bold text-white after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:rounded after:bg-[#ff8c00]">{children}</h4>
);

const linkCls = 'inline-block transition hover:translate-x-1 hover:text-[#ff8c00]';

export default function Footer() {
  return (
    <footer className="bg-[#172a52] pt-14 text-slate-300">
      <div className="container-x grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.3fr]">
        {/* About */}
        <div>
          <div className="inline-block rounded-lg bg-white px-3 py-1.5"><Logo className="h-10" /></div>
          <p className="mt-4 text-sm leading-relaxed">
            We design and build dynamic software modules, web apps and APIs that help your business run faster and grow further.
          </p>
          <div className="mt-5 flex gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ff8c00] text-[#ff8c00] transition hover:bg-[#ff8c00] hover:text-white"
              >
                {s.label === 'Instagram' ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="fill-current" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d={icons[s.label]} /></svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <Heading>Quick Links</Heading>
          <ul className="space-y-2.5 text-sm">
            {helpfulLinks.map((l) => (
              <li key={l.label}><Link to={l.to} className={linkCls}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <Heading>Our Services</Heading>
          <ul className="space-y-2.5 text-sm">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className={linkCls}>{s.title}</Link></li>
            ))}
            <li><Link to="/services" className="font-semibold text-[#ff8c00] hover:underline">View all services →</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <Heading>Contact Us</Heading>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><span aria-hidden="true">📍</span><span>{contact.address}</span></li>
            <li className="flex gap-3"><span aria-hidden="true">📞</span><a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-[#ff8c00]">{contact.phone}</a></li>
            <li className="flex gap-3">
              <span aria-hidden="true">✉️</span>
              <span className="flex flex-col gap-1">
                {contact.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="break-all hover:text-[#ff8c00]">{e}</a>
                ))}
              </span>
            </li>
            <li className="flex gap-3"><span aria-hidden="true">🕒</span><span>{contact.hours}</span></li>
          </ul>
          <Link to="/contact#contact" className="btn-primary mt-5">Get a free quote</Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#07142f]">
        <VisitorCounter />
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {brand}. All rights reserved.</p>
          <p>Website Design and Developed by Article Hub</p>
        </div>
      </div>
      <BackToTop />
    </footer>
  );
}
