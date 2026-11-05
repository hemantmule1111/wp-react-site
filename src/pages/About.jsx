import PageHeader from '../components/PageHeader.jsx';
import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import WhyUs from '../components/WhyUs.jsx';
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
      <Section id="who" eyebrow="who we are" title="WPArt: custom software development & design">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed">
            {aboutText.map((p) => <p key={p}>{p}</p>)}
          </div>
          <blockquote className="self-start rounded-2xl border border-line bg-panel p-8 text-xl italic text-slate-800 shadow-sm">
            <span className="gradient-text text-5xl font-serif">“</span>
            {quote}
          </blockquote>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {facts.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.1}>
              <div className="card text-center">
                <p className="gradient-text text-4xl font-extrabold">{f.n}</p>
                <p className="mt-2 text-sm">{f.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      <WhyUs />
      <ProcessTimeline />
      <CtaBand />
    </>
  );
}
