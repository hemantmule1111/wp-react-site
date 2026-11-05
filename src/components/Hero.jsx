import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroSlides } from '../data/content.js';

const INTERVAL = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = heroSlides.length;
  const slide = heroSlides[index];

  const go = (i) => setIndex((i + count) % count);

  // Auto-rotate; restarts whenever the slide changes, pauses on hover
  useEffect(() => {
    if (paused) return undefined;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, count]);

  return (
    <section
      id="about"
      className="relative z-10 scroll-mt-20 overflow-hidden border-b border-fuchsia-100 bg-white pt-24 pb-4 shadow-[0_12px_30px_-12px_rgba(217,70,239,0.35)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-400/40 via-fuchsia-400/40 to-orange-300/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-sky-300/40 blur-[110px]" />

      {/* Full-height image flush with the slider's top, right and bottom edges */}
      <AnimatePresence mode="wait">
        {slide.image && (
          <motion.img
            key={`img-${index}`}
            src={slide.image}
            alt={slide.title}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none absolute bottom-0 right-0 top-16 hidden w-1/2 object-contain object-right lg:block"
          />
        )}
      </AnimatePresence>

      <div className="container-x relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5 }}
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <div>
              <p className="mb-0 font-mono text-sm text-accent">{slide.eyebrow}</p>
              <h1 className="text-[clamp(1.75rem,6vw,2.5rem)] font-extrabold leading-none text-slate-900 sm:text-[clamp(2.25rem,5vw,3rem)] lg:text-[clamp(1.875rem,2.3vw,2.25rem)]">
                {slide.title}{slide.breakHighlight ? <br /> : ' '}<span className="gradient-text">{slide.highlight}</span>
              </h1>
              <p className="mt-4 max-w-xl border-l-4 border-fuchsia-500 pl-4 text-base italic lg:text-[clamp(1rem,1.4vw,1.125rem)]">“{slide.text}”</p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link to={slide.cta.to} className="btn-primary">{slide.cta.label}</Link>
                <Link to="/contact" className="btn-ghost">Contact us</Link>
              </div>
            </div>

            {slide.image ? (
              <img src={slide.image} alt="" className="mx-auto w-full max-w-xl object-contain lg:hidden" />
            ) : (
            <div className="animate-float rounded-2xl border border-line bg-panel shadow-2xl shadow-fuchsia-500/20">
              <div className="flex gap-2 border-b border-line px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <span className="ml-3 font-mono text-xs text-slate-500">{slide.file}</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-sm leading-6">
                {slide.code.map(([a, b, c, d], i) => (
                  <div key={i}>
                    <span className="text-brand-400">{a}</span>
                    <span className="text-slate-800">{b}</span>
                    <span className="text-accent">{c}</span>
                    <span className="text-amber-600">{d}</span>
                  </div>
                ))}
              </pre>
            </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-4 flex items-center gap-4">
          <button onClick={() => go(index - 1)} aria-label="Previous slide" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-fuchsia-200 text-slate-700 transition hover:border-fuchsia-500 hover:bg-fuchsia-50">←</button>
          <div className="flex gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.eyebrow}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${i === index ? 'w-8 bg-gradient-to-r from-violet-600 to-fuchsia-500' : 'w-2.5 bg-slate-300 hover:bg-fuchsia-300'}`}
              />
            ))}
          </div>
          <button onClick={() => go(index + 1)} aria-label="Next slide" className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-fuchsia-200 text-slate-700 transition hover:border-fuchsia-500 hover:bg-fuchsia-50">→</button>
        </div>
      </div>
    </section>
  );
}
