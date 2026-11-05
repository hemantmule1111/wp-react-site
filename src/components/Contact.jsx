import { useRef, useState } from 'react';
import Section from './Section.jsx';
import { sendContact } from '../lib/wp.js';
import { contact } from '../data/content.js';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' }); // "website" is the honeypot
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const openedAt = useRef(Date.now());
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    try {
      await sendContact({ ...form, elapsed: Date.now() - openedAt.current });
      setForm({ name: '', email: '', message: '', website: '' });
      openedAt.current = Date.now();
      setStatus({ state: 'done', message: 'Thank you! Your message has been sent. We will get back to you soon.' });
    } catch (err) {
      setStatus({ state: 'error', message: `${err.message} You can also email us at ${contact.emails.join(' / ')}.` });
    }
  };

  const field = 'w-full rounded-lg border border-line bg-panel px-4 py-3 text-slate-900 outline-none focus:border-brand-400';

  return (
    <Section id="contact" eyebrow="contact" title="Have a project in mind? Let's build it.">
      <form onSubmit={submit} className="grid max-w-2xl gap-4">
        <input className={field} placeholder="Your name" value={form.name} onChange={set('name')} maxLength={100} required />
        <input className={field} type="email" placeholder="Email" value={form.email} onChange={set('email')} required />
        <textarea className={field} rows="5" placeholder="Tell us about your project" value={form.message} onChange={set('message')} minLength={10} maxLength={5000} required />
        {/* Honeypot: hidden from people, bots fill it in and get silently dropped */}
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}>
          <label>Leave this field empty<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set('website')} /></label>
        </div>
        <button className="btn-primary w-fit disabled:opacity-60" disabled={status.state === 'sending'}>
          {status.state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        {status.message && (
          <p role="status" className={status.state === 'done' ? 'font-medium text-green-700' : 'font-medium text-red-600'}>{status.message}</p>
        )}
      </form>
    </Section>
  );
}
