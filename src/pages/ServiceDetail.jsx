import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal.jsx';
import Faq from '../components/Faq.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ServiceArt from '../components/ServiceArt.jsx';
import NotFound from './NotFound.jsx';
import { services, bySlug } from '../data/services.js';
import { processSteps } from '../data/process.js';

function Block({ eyebrow, title, children }) {
  return (
    <Reveal className="mt-16 first:mt-0">
      <section>
        <p className="font-mono text-sm text-accent">// {eyebrow}</p>
        <h2 className="mb-6 mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = bySlug(slug);
  if (!service) return <NotFound />;

  const i = services.indexOf(service);
  const prev = services[(i - 1 + services.length) % services.length];
  const next = services[(i + 1) % services.length];
  const related = services.filter((s) => s.category === service.category && s.slug !== slug).slice(0, 3);
  const facts = [
    { n: service.features.length, l: 'Core deliverables' },
    { n: service.tech.length, l: 'Technologies' },
    { n: '5', l: 'Step delivery process' },
    { n: '24/7', l: 'Support options' },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-100 via-fuchsia-50 to-orange-100 pt-28 pb-16">
        <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-violet-300/40 blur-[100px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-300/40 blur-[100px]" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-mono text-sm text-accent">
              <Link to="/" className="hover:underline">Home</Link> / <Link to="/services" className="hover:underline">Services</Link> / {service.title}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-fuchsia-600 shadow-sm">
              {service.icon} {service.category}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">{service.title}</h1>
            <p className="mt-4 max-w-xl text-lg">{service.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">Get a free quote</Link>
              <a href="#details" className="btn-ghost bg-white/60">Explore details ↓</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {service.tech.slice(0, 4).map((t) => (
                <span key={t} className="rounded-full bg-white/80 px-3 py-1 font-mono text-xs text-slate-700 shadow-sm">{t}</span>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative">
            <div className="overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-fuchsia-500/30">
              {service.image ? (
                <img src={service.image} alt={service.title} className="block h-auto w-full" />
              ) : (
                <ServiceArt slug={service.slug} index={i} className="block aspect-[4/3] w-full" />
              )}
            </div>
            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl bg-white px-5 py-3 shadow-xl sm:block">
              <p className="gradient-text text-2xl font-extrabold">{service.features.length}+</p>
              <p className="text-xs">deliverables included</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <div className="container-x -mt-1">
        <div className="grid grid-cols-2 divide-x divide-line overflow-hidden rounded-b-3xl border border-t-0 border-line bg-white shadow-sm md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.l} className="p-5 text-center">
              <p className="gradient-text text-3xl font-extrabold">{f.n}</p>
              <p className="mt-1 text-xs">{f.l}</p>
            </div>
          ))}
        </div>
      </div>

      <div id="details" className="container-x grid scroll-mt-20 gap-12 py-16 lg:grid-cols-[1fr_320px]">
        <article>
          <Block eyebrow="overview" title={`Why ${service.title}?`}>
            <p className="border-l-4 border-fuchsia-500 pl-5 text-lg leading-relaxed">{service.overview}</p>
          </Block>

          <Block eyebrow="what you get" title="What we deliver">
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.features.map((f, n) => (
                <li key={f} className="card flex items-start gap-4 !p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-mono text-sm font-bold text-white shadow-md shadow-fuchsia-500/30">
                    {String(n + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-1.5 text-sm font-medium text-slate-800">{f}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block eyebrow="our toolbox" title="Technologies we use">
            <div className="flex flex-wrap gap-3">
              {service.tech.map((t, n) => (
                <span key={t} className={`rounded-xl px-5 py-2.5 font-mono text-sm font-medium shadow-sm ${
                  ['bg-violet-50 text-violet-700', 'bg-fuchsia-50 text-fuchsia-700', 'bg-orange-50 text-orange-700', 'bg-sky-50 text-sky-700'][n % 4]
                }`}>{t}</span>
              ))}
            </div>
          </Block>

          <Block eyebrow="results" title="Benefits for your business">
            <div className="grid gap-4 sm:grid-cols-3">
              {service.benefits.map((b, n) => (
                <div key={b} className={`rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg ${
                  ['from-violet-600 to-fuchsia-500', 'from-fuchsia-500 to-orange-400', 'from-sky-500 to-violet-600'][n % 3]
                }`}>
                  <p className="font-mono text-3xl font-extrabold opacity-80">{String(n + 1).padStart(2, '0')}</p>
                  <p className="mt-3 font-semibold leading-snug">{b}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block eyebrow="our process" title="How we work">
            <ol className="relative space-y-6 border-l-2 border-dashed border-fuchsia-200 pl-8">
              {processSteps.map((s) => (
                <li key={s.n} className="relative">
                  <span className="absolute -left-[50px] flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 text-lg shadow-lg shadow-fuchsia-500/30">{s.icon}</span>
                  <h3 className="font-semibold text-slate-900"><span className="gradient-text font-mono">{s.n}</span> {s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </Block>

          <Block eyebrow="good to know" title="Frequently asked questions">
            <Faq items={service.faqs} />
          </Block>

          <div className="mt-16 grid gap-4 sm:grid-cols-2">
            {[[prev, '← Previous'], [next, 'Next →']].map(([s, label]) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="card group !p-0">
                <div className="h-36 overflow-hidden">
                  {s.image ? (
                    <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                  ) : (
                    <ServiceArt slug={s.slug} index={services.indexOf(s)} className="h-full w-full transition duration-500 group-hover:scale-110" />
                  )}
                </div>
                <div className="p-4"><p className="font-mono text-xs text-accent">{label}</p><p className="mt-1 font-semibold text-slate-900">{s.title}</p></div>
              </Link>
            ))}
          </div>
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 p-6 text-white shadow-xl shadow-fuchsia-500/30">
            <p className="text-3xl">{service.icon}</p>
            <h3 className="mt-2 text-xl font-bold text-white">Need {service.title}?</h3>
            <p className="mt-2 text-sm text-white/90">Tell us about your project and get a free consultation and quote.</p>
            <Link to="/contact" className="btn mt-5 bg-white text-fuchsia-600 hover:bg-fuchsia-50">Get a free quote</Link>
          </div>

          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-semibold text-slate-900">All services</h3>
            <ul className="max-h-80 space-y-1 overflow-y-auto pr-1 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className={`block rounded-lg px-3 py-1.5 transition ${s.slug === slug ? 'bg-fuchsia-50 font-semibold text-fuchsia-600' : 'hover:bg-slate-50 hover:text-slate-900'}`}>
                    {s.icon} {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <h3 className="mb-3 font-semibold text-slate-900">Related services</h3>
              <ul className="space-y-3">
                {related.map((s) => (
                  <li key={s.slug}>
                    <Link to={`/services/${s.slug}`} className="group flex items-center gap-3">
                      <span className="h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                        {s.image ? (
                          <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-110" />
                        ) : (
                          <ServiceArt slug={s.slug} index={services.indexOf(s)} className="h-full w-full transition group-hover:scale-110" />
                        )}
                      </span>
                      <span className="text-sm font-medium text-slate-800 group-hover:text-fuchsia-600">{s.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
      <CtaBand />
    </>
  );
}
