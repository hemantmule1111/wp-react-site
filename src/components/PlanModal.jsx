import { useEffect, useRef, useState } from 'react';
import { sendPlanEnquiry } from '../lib/wp.js';

const field = 'w-full rounded-xl border border-line bg-white px-4 py-2.5 text-slate-900 outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200';
const blank = { name: '', email: '', phone: '', company: '', message: '', website: '' }; // "website" is the honeypot

// plan: { name, priceText, billing }. Rendered only while a plan is selected.
export default function PlanModal({ plan, onClose }) {
  const [form, setForm] = useState(blank);
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [error, setError] = useState('');
  const openedAt = useRef(Date.now());
  const firstField = useRef(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstField.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setStatus('sending');
    try {
      await sendPlanEnquiry({
        ...form,
        plan: plan.name,
        price: plan.priceText,
        billing: plan.billing,
        elapsed: Date.now() - openedAt.current,
      });
      setStatus('sent');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-labelledby="plan-title" className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
        <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-3 text-2xl text-slate-500 hover:text-slate-900">✕</button>

        {status === 'sent' ? (
          <div className="py-6 text-center">
            <div className="text-4xl">✅</div>
            <h2 id="plan-title" className="mt-2 text-xl font-bold">Thank you!</h2>
            <p className="mt-2 text-slate-600">We received your request for the {plan.name} plan and will email you shortly.</p>
            <button type="button" onClick={onClose} className="btn-primary mt-5">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id="plan-title" className="pr-8 text-xl font-bold">Get the {plan.name} plan</h2>
            <p className="mt-1 text-sm text-slate-600">
              {plan.priceText && <span className="font-semibold text-fuchsia-600">{plan.priceText} </span>}
              Leave your details and we'll email you to get your team set up.
            </p>

            <div className="mt-4 space-y-3">
              <input ref={firstField} className={field} placeholder="Your name *" value={form.name} onChange={set('name')} autoComplete="name" required />
              <input className={field} type="email" placeholder="Work email *" value={form.email} onChange={set('email')} autoComplete="email" required />
              <input className={field} type="tel" placeholder="Phone (optional)" value={form.phone} onChange={set('phone')} autoComplete="tel" />
              <input className={field} placeholder="Company (optional)" value={form.company} onChange={set('company')} autoComplete="organization" />
              <textarea className={field} rows={3} placeholder="Anything we should know? (optional)" value={form.message} onChange={set('message')} />
              {/* Honeypot: hidden from people, bots fill it in */}
              <input type="text" name="website" value={form.website} onChange={set('website')} tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            </div>

            {error && <p role="alert" className="mt-3 text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="btn-primary mt-4 w-full disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send request'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
