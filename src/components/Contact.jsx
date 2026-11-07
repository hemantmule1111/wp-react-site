import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Section from './Section.jsx';
import { sendContact } from '../lib/wp.js';
import { contact } from '../data/content.js';
import { serviceCategories, budgetsUSD, budgetsINR, detectCurrency, timelines, allServices } from '../data/enquiry.js';

const empty = { services: [], budget: '', timeline: '', message: '', name: '', email: '', phone: '', website: '' }; // "website" is the honeypot
const steps = ['Services', 'Project', 'You'];

const field = 'w-full rounded-xl border border-line bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200';

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
        active
          ? 'border-transparent bg-gradient-to-r from-violet-600 to-orange-400 text-white shadow-md'
          : 'border-line bg-white text-slate-700 hover:border-fuchsia-300'
      }`}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const { state: nav } = useLocation();
  // Arriving from a service card's "Get a free quote" button pre-selects that service
  const [form, setForm] = useState(() => ({ ...empty, services: allServices.includes(nav?.service) ? [nav.service] : [] }));
  const [step, setStep] = useState(0);
  const [currency, setCurrency] = useState(detectCurrency);
  const budgets = currency === 'INR' ? budgetsINR : budgetsUSD;
  // Switching currency keeps the same range selected
  const switchCurrency = (c) => {
    if (c === currency) return;
    const from = currency === 'INR' ? budgetsINR : budgetsUSD;
    const to = c === 'INR' ? budgetsINR : budgetsUSD;
    const i = from.indexOf(form.budget);
    setForm((f) => ({ ...f, budget: i >= 0 ? to[i] : '' }));
    setCurrency(c);
  };
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const openedAt = useRef(Date.now());
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const toggle = (title) =>
    setForm((f) => ({
      ...f,
      services: f.services.includes(title) ? f.services.filter((s) => s !== title) : [...f.services, title],
    }));
  const toggleCategory = (cat) =>
    setForm((f) => {
      const titles = cat.services.map((s) => s.title);
      const all = titles.every((t) => f.services.includes(t));
      return { ...f, services: all ? f.services.filter((s) => !titles.includes(s)) : [...new Set([...f.services, ...titles])] };
    });
  const pick = (k, v) => setForm((f) => ({ ...f, [k]: f[k] === v ? '' : v }));

  const canNext = step === 0 ? form.services.length > 0 : step === 1 ? form.message.trim().length >= 10 : true;

  const submit = async (e) => {
    e.preventDefault();
    if (step < 2) {
      if (canNext) setStep(step + 1);
      return;
    }
    setStatus({ state: 'sending', message: '' });
    try {
      await sendContact({ ...form, elapsed: Date.now() - openedAt.current });
      setStatus({ state: 'done', message: '' });
    } catch (err) {
      setStatus({ state: 'error', message: `${err.message} You can also email us at ${contact.emails.join(' / ')}.` });
    }
  };

  const reset = () => {
    setForm(empty);
    setStep(0);
    setStatus({ state: 'idle', message: '' });
    openedAt.current = Date.now();
  };

  return (
    <Section id="contact" eyebrow="start a project" title="Have a project in mind? Let's build it.">
      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Wizard */}
        <div className="card !p-0">
          {status.state === 'done' ? (
            <div className="p-10 text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-orange-400 text-3xl text-white shadow-lg">✓</span>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">Thank you, {form.name.split(' ')[0]}!</h3>
              <p className="mt-2">We have your enquiry about {form.services.length} service{form.services.length > 1 ? 's' : ''} and will get back to you soon.</p>
              <button type="button" onClick={reset} className="btn-primary mt-6">Send another enquiry</button>
            </div>
          ) : (
            <form onSubmit={submit} className="p-6 sm:p-8">
              {/* Progress */}
              <ol className="mb-8 flex items-center gap-3" aria-label="Progress">
                {steps.map((s, i) => (
                  <li key={s} className="flex flex-1 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                        i <= step ? 'bg-gradient-to-br from-violet-600 to-orange-400 text-white' : 'bg-slate-200 text-slate-500'
                      }`}
                      aria-current={i === step ? 'step' : undefined}
                    >
                      {i < step ? '✓' : i + 1}
                    </button>
                    <span className={`hidden text-sm sm:block ${i === step ? 'font-semibold text-slate-900' : ''}`}>{s}</span>
                    {i < steps.length - 1 && <span className={`h-0.5 flex-1 rounded ${i < step ? 'bg-fuchsia-400' : 'bg-slate-200'}`} />}
                  </li>
                ))}
              </ol>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {step === 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">What do you need?</h3>
                      <p className="mt-1 text-sm">Pick as many services as you like.</p>
                      <div className="mt-5 space-y-5">
                        {serviceCategories.map((cat) => {
                          const allOn = cat.services.every((s) => form.services.includes(s.title));
                          return (
                            <div key={cat.key}>
                              <div className="mb-2 flex items-center justify-between">
                                <p className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                                  <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${cat.gradient}`} />
                                  {cat.title}
                                </p>
                                <button type="button" onClick={() => toggleCategory(cat)} className="text-xs text-accent hover:underline">
                                  {allOn ? 'Clear all' : 'Select all'}
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {cat.services.map((s) => (
                                  <Pill key={s.title} active={form.services.includes(s.title)} onClick={() => toggle(s.title)}>
                                    <span className="mr-1.5">{s.icon}</span>{s.title}
                                  </Pill>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-5">
                      <h3 className="text-xl font-bold text-slate-900">Tell us about it</h3>
                      <div>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-slate-900">Estimated budget <span className="font-normal">(optional)</span></p>
                          <div className="inline-flex overflow-hidden rounded-full border border-line text-xs font-semibold" role="group" aria-label="Currency">
                            {[['INR', '₹ INR'], ['USD', '$ USD']].map(([c, label]) => (
                              <button key={c} type="button" onClick={() => switchCurrency(c)} aria-pressed={currency === c}
                                className={`px-3 py-1 transition ${currency === c ? 'bg-[#ff8c00] text-white' : 'bg-white text-slate-600 hover:bg-orange-50'}`}>{label}</button>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {budgets.map((b) => <Pill key={b} active={form.budget === b} onClick={() => pick('budget', b)}>{b}</Pill>)}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-sm font-semibold text-slate-900">When do you need it? <span className="font-normal">(optional)</span></p>
                        <div className="flex flex-wrap gap-2">
                          {timelines.map((t) => <Pill key={t} active={form.timeline === t} onClick={() => pick('timeline', t)}>{t}</Pill>)}
                        </div>
                      </div>
                      <textarea className={field} rows="5" placeholder="Tell us about your project" value={form.message} onChange={set('message')} minLength={10} maxLength={5000} required />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-4">
                      <h3 className="text-xl font-bold text-slate-900">Where do we reach you?</h3>
                      <input className={field} placeholder="Your name" value={form.name} onChange={set('name')} maxLength={100} required />
                      <input className={field} type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
                      <input className={field} type="tel" placeholder="Phone / WhatsApp (optional)" value={form.phone} onChange={set('phone')} maxLength={30} />
                      {/* Honeypot: hidden from people, bots fill it in and get silently dropped */}
                      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
                        <label>Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {status.message && <p role="status" className="mt-5 font-medium text-red-600">{status.message}</p>}

              <div className="mt-8 flex items-center justify-between">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="text-sm font-medium text-slate-600 hover:text-slate-900">← Back</button>
                ) : <span />}
                <button className="btn-primary disabled:cursor-not-allowed disabled:opacity-50" disabled={!canNext || status.state === 'sending'}>
                  {status.state === 'sending' ? 'Sending…' : step < 2 ? 'Next →' : 'Send enquiry'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Live brief + direct contact */}
        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="card">
            <p className="font-mono text-sm text-accent">// your brief</p>
            {form.services.length === 0 ? (
              <p className="mt-3 text-sm">Choose services and your selection appears here.</p>
            ) : (
              <>
                <p className="mt-2 text-3xl font-extrabold"><span className="gradient-text">{form.services.length}</span> <span className="text-base font-semibold text-slate-900">selected</span></p>
                <ul className="mt-3 space-y-1.5 text-sm">
                  {form.services.map((s) => (
                    <li key={s} className="flex items-start justify-between gap-2">
                      <span>✓ {s}</span>
                      <button type="button" onClick={() => toggle(s)} className="text-slate-400 hover:text-red-500" aria-label={`Remove ${s}`}>✕</button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            {(form.budget || form.timeline) && (
              <p className="mt-4 border-t border-line pt-3 text-xs">
                {form.budget && <>Budget: <b className="text-slate-900">{form.budget}</b><br /></>}
                {form.timeline && <>Timeline: <b className="text-slate-900">{form.timeline}</b></>}
              </p>
            )}
          </div>
          <div className="card flex flex-col gap-2 text-sm">
            <p className="font-semibold text-slate-900">Prefer to talk?</p>
            <p>📞 {contact.phone}</p>
            {contact.emails.map((m) => <p key={m}>✉️ <a className="hover:underline" href={`mailto:${m}`}>{m}</a></p>)}
            <p>🕒 {contact.hours}</p>
          </div>
        </aside>
      </div>
    </Section>
  );
}
