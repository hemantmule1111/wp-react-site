import { useState } from 'react';
import { Link } from 'react-router-dom';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import ServiceArt from './ServiceArt.jsx';
import { services, categories } from '../data/services.js';

// limit: show only the first N services (home page). showFilter: category chips (services page).
export default function Services({ limit, showFilter = false }) {
  const [cat, setCat] = useState('All');
  const list = services.filter((s) => cat === 'All' || s.category === cat).slice(0, limit ?? services.length);

  return (
    <Section id="services" eyebrow="our services" title="Software Development Services We Offer">
      {showFilter && (
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition ${
                cat === c
                  ? 'border-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 text-white shadow-md shadow-fuchsia-500/30'
                  : 'border-fuchsia-100 text-slate-600 hover:border-fuchsia-400'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((s) => (
          <Reveal key={s.slug}>
            <div className="card group flex h-full flex-col !p-0">
              <Link to={`/services/${s.slug}`} className="relative block h-40 overflow-hidden" aria-label={s.title}>
                {s.image ? (
                  <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                ) : (
                  <ServiceArt slug={s.slug} index={services.indexOf(s)} className="h-full w-full transition duration-500 group-hover:scale-110" />
                )}
                {/* Corner ribbon: 45° band across the top-right corner, clipped by the square wrapper */}
                <div className="pointer-events-none absolute -right-[15px] -top-[15px] h-36 w-36 overflow-hidden">
                  <span className="absolute right-[-50px] top-[39px] w-[200px] rotate-45 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 py-1 text-center font-mono text-[10px] font-semibold text-white shadow-md shadow-fuchsia-900/30">
                    {s.category}
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-semibold text-slate-900">
                  <Link to={`/services/${s.slug}`} className="hover:text-fuchsia-600">{s.icon} {s.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed">{s.text}</p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <Link to={`/services/${s.slug}`} className="gradient-text text-sm font-semibold">Learn more →</Link>
                  <Link
                    to="/contact#contact"
                    state={{ service: s.title }}
                    className="rounded-full bg-[#ff8c00] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-[#e67e00]"
                  >
                    Get a free quote
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {limit && <Link to="/services" className="btn-ghost">View all {services.length} services</Link>}
        <Link to="/contact#contact" className="btn-primary">Get a free quote</Link>
      </div>
    </Section>
  );
}
