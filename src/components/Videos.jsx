import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { videos } from '../data/content.js';

const tiles = [
  'from-violet-400 to-fuchsia-400',
  'from-fuchsia-400 to-orange-300',
  'from-sky-400 to-violet-400',
];

export default function Videos() {
  return (
    <Section id="videos" eyebrow="watch & learn" title={videos.title}>
      <div className="grid gap-6 md:grid-cols-3">
        {videos.items.map((v, i) => (
          <Reveal key={v} delay={i * 0.1}>
            <article className="group card overflow-hidden !p-0">
              <div className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${tiles[i % tiles.length]}`}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-lg transition group-hover:scale-110">▶</span>
              </div>
              <h3 className="p-5 font-semibold text-slate-900">{v}</h3>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-10 max-w-3xl text-sm leading-relaxed">{videos.text}</p>
      <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-primary mt-6">{videos.cta}</a>
    </Section>
  );
}
