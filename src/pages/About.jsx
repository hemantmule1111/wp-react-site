import PageHeader from '../components/PageHeader.jsx';
import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import WhyUs from '../components/WhyUs.jsx';
import WorkShowcase from '../components/WorkShowcase.jsx';
import { quote, aboutText } from '../data/content.js';

const facts = [
  { n: '20+', t: 'Software development services under one roof' },
  { n: 'UI/UX', t: 'Intuitive, user-friendly design in everything we build' },
  { n: '100%', t: 'Custom-built, secure and scalable solutions' },
];

export default function About() {
  return (
    <>
      <PageHeader title="About" subtitle="Crafting dynamic digital experiences with WordPress." />
      <Section compact id="who" eyebrow="who we are" title="WPArt: custom software development & design">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-3 text-sm leading-relaxed">
            {aboutText.map((p) => <p key={p}>{p}</p>)}
          </div>
          <blockquote className="self-start rounded-2xl border border-line bg-panel p-5 text-base italic text-slate-800 shadow-sm">
            <span className="gradient-text mr-1 align-[-0.3em] text-4xl font-serif leading-none">“</span>
            {quote}
          </blockquote>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.1}>
              <div className="card flex items-center gap-4 !p-4">
                <p className="gradient-text shrink-0 text-2xl font-extrabold">{f.n}</p>
                <p className="text-xs leading-snug">{f.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <WorkShowcase />
      <WhyUs />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
