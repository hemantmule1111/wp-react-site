import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { processSteps } from '../data/process.js';

export default function ProcessTimeline({ id = 'process', title = 'From idea to launch in five clear steps' }) {
  return (
    <Section id={id} eyebrow="how we work" title={title}>
      <div className="relative grid gap-8 md:grid-cols-5">
        <div className="absolute left-0 right-0 top-7 hidden h-1 rounded bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-400 opacity-30 md:block" />
        {processSteps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div className="relative text-center md:text-left">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#e5e5e5] bg-[#fffefe] text-2xl shadow-lg shadow-fuchsia-500/30 md:mx-0">
                {s.icon}
              </div>
              <p className="gradient-text mt-4 font-mono text-sm font-bold">{s.n}</p>
              <h3 className="font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
