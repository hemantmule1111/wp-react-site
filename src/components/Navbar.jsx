import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brand, helpfulLinks } from '../data/content.js';
import { services } from '../data/services.js';
import Logo from './Logo.jsx';

const links = helpfulLinks.filter((l) => l.label !== 'Contact');
const linkClass = ({ isActive }) =>
  `transition hover:text-slate-900 ${isActive ? 'font-semibold text-fuchsia-600' : ''}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-white/90 backdrop-blur before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-violet-600 before:via-fuchsia-500 before:to-orange-400">
      <div className="container-x flex h-16 items-center justify-between">
        <Link to="/" aria-label={brand}><Logo /></Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) =>
            l.label === 'Services' ? (
              <div key={l.label} className="group relative py-5">
                <NavLink to={l.to} className={linkClass}>Services ▾</NavLink>
                {/* Mega dropdown */}
                <div className="invisible absolute left-1/2 top-full w-[640px] -translate-x-1/2 translate-y-2 rounded-2xl border border-line bg-white p-4 opacity-0 shadow-2xl shadow-fuchsia-500/10 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/services/${s.slug}`} className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-slate-700 hover:bg-fuchsia-50 hover:text-fuchsia-600">
                          <span>{s.icon}</span>{s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink key={l.label} to={l.to} end={l.to === '/'} className={linkClass}>{l.label}</NavLink>
            )
          )}
          <Link to="/contact" className="btn-primary !py-2">Contact</Link>
        </nav>
        <button className="md:hidden text-2xl text-slate-900" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? '✕' : '☰'}
        </button>
      </div>
      {open && (
        <nav className="container-x flex flex-col gap-4 pb-6 md:hidden">
          {links.map((l) => (
            <NavLink key={l.label} to={l.to} end={l.to === '/'} onClick={() => setOpen(false)} className={linkClass}>{l.label}</NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-fit">Contact</Link>
        </nav>
      )}
    </header>
  );
}
