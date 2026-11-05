import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { portfolio } from '../data/portfolio.js';

// Hover (or keyboard focus / tap) reveals the description and a link.
// Effects repeat in this order, one per column on a 5-wide row: slide left, top, right, bottom, then flip.
const EFFECTS = [
  'flip-card--slide flip-card--left',
  'flip-card--slide flip-card--top',
  'flip-card--slide flip-card--right',
  'flip-card--slide flip-card--bottom',
  '',
];

function FlipCard({ item, effect }) {
  return (
    <div className={`flip-card group ${effect}`} tabIndex={0}>
      <div className="flip-card__inner">
        <div className="flip-card__face overflow-hidden">
          <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div className="flip-card__face flip-card__back flex flex-col items-center justify-center gap-2 bg-[#172a52] p-4 text-center text-slate-200">
          <h3 style={{ color: '#fff' }} className="text-base font-bold">{item.name}</h3>
          <p className="line-clamp-5 text-xs leading-relaxed">{item.text}</p>
          {item.url && (
            <a href={item.url} target="_blank" rel="noreferrer" className="btn-primary !px-4 !py-2 !text-xs text-white">{item.cta}</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="projects" title="Websites We Have Delivered">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
        {portfolio.map((item, i) => (
          <Reveal key={item.image} delay={(i % 5) * 0.06}>
            <h4 className="mb-2 truncate text-center text-sm font-bold" title={item.name}>{item.name}</h4>
            <FlipCard item={item} effect={EFFECTS[i % EFFECTS.length]} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
