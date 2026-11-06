import { useSeo } from '../lib/seo.js';
import { pageSeo } from '../data/seo.js';
import PageHeader from '../components/PageHeader.jsx';
import Section from '../components/Section.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import StatsBand from '../components/StatsBand.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import WhyUs from '../components/WhyUs.jsx';
import WorkShowcase from '../components/WorkShowcase.jsx';
import TechMarquee from '../components/TechMarquee.jsx';
import { quote, aboutText } from '../data/content.js';

const facts = [
  { n: '20+', t: 'Software services under one roof', gradient: 'from-violet-600 to-fuchsia-500' },
  { n: 'UI/UX', t: 'Intuitive design in everything we build', gradient: 'from-fuchsia-500 to-orange-400' },
  { n: '100%', t: 'Custom-built, secure and scalable', gradient: 'from-sky-500 to-violet-500' },
];

const pillars = [
  {
    icon: '🎯',
    title: 'Our mission',
    text: 'To turn your ideas into dependable software that fits how your business really works, and to keep it working as you grow.',
    gradient: 'from-violet-600 to-fuchsia-500',
  },
  {
    icon: '🔭',
    title: 'Our vision',
    text: 'To be the software partner businesses trust first, from a first website to enterprise platforms, wherever they are in the world.',
    gradient: 'from-fuchsia-500 to-orange-400',
  },
  {
    icon: '💎',
    title: 'Our values',
    text: 'Honest estimates, clean code, clear communication and a design that people enjoy using. We stay with you after launch.',
    gradient: 'from-sky-500 to-violet-500',
  },
];

export default function About() {
  useSeo({ ...pageSeo['/about'], path: '/about' });
  return (
    <>
      <PageHeader title="About" subtitle="Crafting dynamic digital experiences with WordPress." />

      {/* 1. Who we are: white, with soft decorative blobs */}
      <div className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-200/50 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-orange-200/50 blur-[90px]" />
        <div className="relative">
          <Section compact id="who" eyebrow="who we are" title="WPArt: custom software development & design">
            <div className="grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4 leading-relaxed">
                {aboutText.map((p, i) => (
                  <p key={p} className={i === 0 ? 'text-lg font-medium text-slate-800' : 'text-sm'}>{p}</p>
                ))}
                <div className="flex flex-wrap gap-3 pt-2">
                  {facts.map((f) => (
                    <span key={f.n} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm shadow-sm">
                      <b className={`bg-gradient-to-r bg-clip-text font-extrabold text-transparent ${f.gradient}`}>{f.n}</b>
                      <span className="text-slate-600">{f.t}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote with a gradient frame */}
              <Reveal delay={0.1}>
                <div className="rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 p-[2px] shadow-xl shadow-fuchsia-500/20">
                  <blockquote className="rounded-[calc(1.5rem-2px)] bg-white p-7 text-lg italic leading-relaxed text-slate-800">
                    <span className="gradient-text block text-6xl font-serif leading-none">“</span>
                    {quote}
                  </blockquote>
                </div>
              </Reveal>
            </div>
          </Section>
        </div>
      </div>

      {/* 2. Numbers: the same colourful stats band as the home page */}
      <StatsBand />

      {/* 3. Mission, vision, values: lavender to peach */}
      <div className="border-y border-violet-100 bg-gradient-to-br from-violet-100/80 via-fuchsia-50 to-orange-50 py-6">
        <Section id="purpose" eyebrow="what drives us" title="Built on purpose, not just code">
          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="group relative h-full rounded-2xl border border-white bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-fuchsia-500/10">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl shadow-lg transition group-hover:rotate-6 group-hover:scale-110 ${p.gradient}`}>{p.icon}</span>
                  <h3 className="mt-5 text-xl font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed">{p.text}</p>
                  <span className={`absolute inset-x-7 bottom-0 h-1 rounded-t bg-gradient-to-r ${p.gradient}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      {/* 4. Our work: white */}
      <WorkShowcase />

      {/* 5. Why us: lavender (its own background) */}
      <WhyUs />

      {/* 6. Process: light blue */}
      <div className="border-y border-sky-100 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 py-6">
        <ProcessTimeline />
      </div>

      {/* 7. Technologies */}
      <TechMarquee />

      <CtaBand />
    </>
  );
}
