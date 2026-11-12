import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo.js';
import { pageSeo } from '../data/seo.js';
import { detectCurrency } from '../data/enquiry.js';
import { HR_APP, plans, extraLogin, planFaqs } from '../data/workpilot.js';
import { spotlight, featureGroups } from '../data/workpilotFeatures.js';
import ScreenshotFrame from '../components/ScreenshotFrame.jsx';
import PlanModal from '../components/PlanModal.jsx';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';

const symbol = { INR: '₹', USD: '$' };
const money = (n, c) => `${symbol[c]}${n.toLocaleString(c === 'INR' ? 'en-IN' : 'en-US')}`;

function Toggle({ options, value, onChange, label }) {
  return (
    <div role="group" aria-label={label} className="inline-flex overflow-hidden rounded-full border border-line text-sm">
      {options.map(([v, text]) => (
        <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}
          className={`px-4 py-1.5 transition ${value === v ? 'bg-[#ff8c00] text-white' : 'bg-white text-slate-600 hover:bg-orange-50'}`}>{text}</button>
      ))}
    </div>
  );
}

export default function WorkPilotPage() {
  useSeo({ ...pageSeo['/workpilot'], path: '/workpilot' });
  const [currency, setCurrency] = useState(detectCurrency);
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PageHeader title="WorkPilot HR Software" subtitle={`${HR_APP.tagline}. Free for up to ${HR_APP.freeLogins} email logins.`} />

      {/* Hero */}
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-300/25 blur-[90px]" />
        <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">Attendance · Leave · Payroll · Letters · Chat</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
              Run HR for your whole company from <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">one place</span>
            </h2>
            <p className="mt-3 text-slate-600">
              WorkPilot is a web-based HR system for companies of about 50 to 250 people. Free for up to {HR_APP.freeLogins} email logins, with simple yearly plans after that.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={HR_APP.loginUrl} className="btn-primary" target="_blank" rel="noopener noreferrer">Login / Start free</a>
              <a href="#plans" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-orange-50">See plans</a>
              <a href="#all-features" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold hover:bg-orange-50">All features</a>
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 text-center">
              {[['7', 'built-in roles'], ['14', 'feature areas'], ['2-step', 'secure sign-in']].map(([n, l]) => (
                <div key={l} className="rounded-xl border border-line px-2 py-3">
                  <dt className="text-xl font-extrabold text-fuchsia-600">{n}</dt>
                  <dd className="text-xs text-slate-600">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Reveal>
            <ScreenshotFrame group="hero" alt="WorkPilot HR software" priority className="lg:-rotate-1" />
          </Reveal>
        </div>
      </section>

      {/* Spotlight rows: alternate screenshot left / right */}
      <section className="bg-slate-50 py-12">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold sm:text-3xl">What you get</h2>
          <p className="mt-1 text-slate-600">Everything your HR team and employees use every day.</p>
          <div className="mt-10 space-y-16">
            {spotlight.map((f, i) => (
              <Reveal key={f.shot}>
                <div className="grid items-center gap-8 lg:grid-cols-2">
                  <div className={i % 2 ? 'lg:order-2' : ''}>
                    <span className="text-3xl" aria-hidden="true">{f.icon}</span>
                    <h3 className="mt-2 text-xl font-extrabold sm:text-2xl">{f.title}</h3>
                    <p className="mt-2 text-slate-600">{f.text}</p>
                    <ul className="mt-4 space-y-2 text-sm">
                      {f.points.map((pt) => <li key={pt} className="flex gap-2"><span className="text-green-600">✓</span>{pt}</li>)}
                    </ul>
                  </div>
                  <ScreenshotFrame group={f.shot} alt={f.title} offset={(i % 4) * 500} className={i % 2 ? 'lg:order-1' : ''} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Complete feature list */}
      <section id="all-features" className="py-12">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Complete feature list</h2>
          <p className="mt-1 text-slate-600">Every module in WorkPilot, grouped by area.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featureGroups.map((g) => (
              <div key={g.title} className="rounded-2xl border border-line p-5">
                <h3 className="font-bold"><span aria-hidden="true">{g.icon}</span> {g.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {g.items.map((it) => <li key={it} className="flex gap-2"><span className="text-green-600">✓</span>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="bg-slate-50 py-12">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Membership plans</h2>
          <p className="mt-1 text-slate-600">Priced by number of email logins. Start free, upgrade when your team grows.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Toggle label="Currency" value={currency} onChange={setCurrency} options={[['INR', '₹ INR'], ['USD', '$ USD']]} />
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((p) => {
              const amount = p.price && p.price[currency];
              return (
                <div key={p.id} className={`relative flex flex-col rounded-2xl border bg-white p-6 ${p.popular ? 'border-[#ff8c00] shadow-lg shadow-orange-200/60' : 'border-line'}`}>
                  {p.popular && <span className="absolute -top-3 left-6 rounded-full bg-[#ff8c00] px-3 py-0.5 text-xs font-bold text-white">Most popular</span>}
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <p className="mt-1 min-h-[40px] text-sm text-slate-600">{p.blurb}</p>
                  <p className="mt-4">
                    {p.price ? (
                      <>
                        <span className="text-3xl font-extrabold">{amount === 0 ? 'Free' : money(amount, currency)}</span>
                        {amount > 0 && <span className="text-sm text-slate-500"> /month</span>}
                      </>
                    ) : (
                      <span className="text-3xl font-extrabold">Custom</span>
                    )}
                  </p>
                  {amount > 0 && <p className="text-xs text-slate-500">Billed yearly: {money(amount * 12, currency)}/year</p>}
                  <p className="mt-1 text-sm font-semibold text-fuchsia-600">{p.logins ? `Up to ${p.logins} email logins` : 'Unlimited email logins'}</p>
                  <ul className="mt-4 flex-1 space-y-2 text-sm">
                    {p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-green-600">✓</span>{f}</li>)}
                  </ul>
                  <button type="button" className="btn-primary mt-6 text-center"
                    onClick={() => setSelected({
                      name: p.name,
                      billing: 'yearly',
                      priceText: !p.price ? 'Custom pricing' : amount === 0 ? 'Free' : `${money(amount, currency)}/month, billed yearly (${money(amount * 12, currency)}/year)`,
                    })}>{p.cta}</button>
                </div>
              );
            })}
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Need more than your plan includes? Extra logins are {money(extraLogin[currency], currency)} per login per month. More than 100 logins? <Link to="/contact#contact" className="font-semibold text-fuchsia-600 underline">Contact us</Link> for a custom plan. Prices exclude applicable taxes.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container-x max-w-3xl">
          <h2 className="text-2xl font-extrabold">Questions</h2>
          <div className="mt-4 space-y-3">
            {planFaqs.map((f) => (
              <details key={f.q} className="rounded-xl border border-line p-4">
                <summary className="cursor-pointer font-semibold">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {selected && <PlanModal plan={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
