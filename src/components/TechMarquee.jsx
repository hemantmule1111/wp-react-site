import { techStack } from '../data/process.js';

export default function TechMarquee() {
  const row = [...techStack, ...techStack]; // duplicated for a seamless loop
  return (
    <section className="overflow-hidden border-y border-fuchsia-100 bg-white py-8">
      <p className="mb-5 text-center font-mono text-sm text-accent">// technologies we work with</p>
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="whitespace-nowrap rounded-full border-2 border-fuchsia-100 bg-white px-5 py-2 font-mono text-sm text-slate-700 shadow-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
