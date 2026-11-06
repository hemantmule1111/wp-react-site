import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { whyUs } from '../data/process.js';

export default function WhyUs() {
  return (
    <section className="border-y border-violet-100 bg-gradient-to-br from-violet-100/80 via-fuchsia-50 to-orange-50 py-6">
      <Section id="why" eyebrow="why choose us" title="Software partners who care about your outcome">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => (
            <Reveal key={w.title} delay={(i % 3) * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-white bg-white p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-500/10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-orange-100 text-2xl">{w.icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed">{w.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </section>
  );
}
