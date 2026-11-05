import { useState } from 'react';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { groups, hostOf, totalSites, tutorial } from '../data/work.js';

function SiteCard({ site, gradient }) {
  const host = hostOf(site.url);
  const [failed, setFailed] = useState(false);
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noreferrer"
      className="group card flex items-center gap-4 !p-4"
    >
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-lg font-bold uppercase text-white`}>
        {failed ? (
          host[0]
        ) : (
          <img
            src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
            alt=""
            loading="lazy"
            className="h-7 w-7 rounded bg-white p-0.5"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold text-slate-900">{host}</span>
        <span className="block truncate text-xs">{site.note ?? 'Visit live site'}</span>
      </span>
      <span className="text-fuchsia-500 transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true">↗</span>
    </a>
  );
}

export default function WorkShowcase() {
  const [active, setActive] = useState('all');
  const shown = active === 'all' ? groups : groups.filter((g) => g.key === active);

  return (
    <Section id="work" eyebrow="our work" title="Websites we have built">
      <p className="-mt-6 mb-8 max-w-2xl">
        {totalSites} live websites across WordPress, Elementor, WooCommerce and hand-coded HTML. Click any card to visit the site.
      </p>

      <div className="mb-10 flex flex-wrap gap-2">
        {[{ key: 'all', title: 'All' }, ...groups].map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setActive(g.key)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              active === g.key
                ? 'border-transparent bg-gradient-to-r from-violet-600 to-orange-400 text-white shadow-md'
                : 'border-line bg-panel text-slate-700 hover:border-fuchsia-300'
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {shown.map((g) => (
          <div key={g.key}>
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${g.gradient} text-xl shadow-lg`}>{g.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {g.title} <span className="ml-1 font-mono text-sm font-normal text-accent">{g.sites.length}</span>
                  </h3>
                  <p className="text-sm">{g.blurb}</p>
                </div>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.sites.map((s, i) => (
                <Reveal key={s.url} delay={(i % 3) * 0.06}>
                  <SiteCard site={s} gradient={g.gradient} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>

      {active === 'all' && (
        <Reveal>
          <a
            href={`https://www.youtube.com/watch?v=${tutorial.id}`}
            target="_blank"
            rel="noreferrer"
            className="group card mt-14 grid items-center gap-6 !p-0 md:grid-cols-[1fr_1.2fr]"
          >
            <span className="relative block aspect-video overflow-hidden bg-slate-200">
              <img src={`https://i.ytimg.com/vi/${tutorial.id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-xl transition group-hover:scale-110">▶</span>
            </span>
            <span className="block p-6 md:pl-0">
              <span className="font-mono text-sm text-accent">// {tutorial.label}</span>
              <span className="mt-2 block text-2xl font-bold text-slate-900">{tutorial.title}</span>
              <span className="btn-primary mt-5 inline-flex">Watch on YouTube →</span>
            </span>
          </a>
        </Reveal>
      )}
    </Section>
  );
}
