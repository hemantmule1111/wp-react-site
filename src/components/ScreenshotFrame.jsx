import { useEffect, useRef, useState } from 'react';
import { SHOT_LABELS, shotGroups } from '../data/workpilotShots.js';
import Lightbox from './Lightbox.jsx';

const SHOT_DIR = `${import.meta.env.BASE_URL}images/hr-software/`;
const INTERVAL = 3500; // ms each screenshot stays before the next one fades in

// Browser-window frame that cross-fades through a group of screenshots (see data/workpilotShots.js).
// Pauses on hover, only runs while on screen, and stays still for people who prefer reduced motion.
export default function ScreenshotFrame({ group, alt, priority = false, className = '', offset = 0 }) {
  const shots = shotGroups[group] || [];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState({});
  const [zoom, setZoom] = useState(false);
  const step = (d) => setIndex((i) => (i + d + shots.length) % shots.length);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setVisible(true); return undefined; }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (shots.length < 2 || !visible || paused || zoom || reduce) return undefined;
    // `offset` staggers rows so they don't all change at the same moment
    const t = setTimeout(() => setIndex((i) => (i + 1) % shots.length), INTERVAL + offset);
    return () => clearTimeout(t);
  }, [index, visible, paused, zoom, shots.length, offset]);

  if (!shots.length) return null;
  const label = SHOT_LABELS[shots[index]] || alt;

  return (
    <figure
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`overflow-hidden rounded-2xl border border-line bg-white shadow-xl shadow-violet-500/10 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-line bg-slate-50 px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
        <span className="ml-3 truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-slate-400">hr.wpart.co.in</span>
      </div>

      <div className="relative aspect-[16/10] w-full bg-slate-100">
        {shots.map((name, i) => (
          <img
            key={name}
            src={`${SHOT_DIR}${name}.jpg`}
            alt={i === index ? `${alt}: ${SHOT_LABELS[name] || name}` : ''}
            aria-hidden={i !== index}
            width="1280"
            height="800"
            loading={priority && i === 0 ? 'eager' : 'lazy'}
            onError={() => setFailed((f) => ({ ...f, [name]: true }))}
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ease-in-out ${i === index && !failed[name] ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Click anywhere on the image to open it large */}
        <button type="button" onClick={() => setZoom(true)} aria-label={`Open ${label} full size`} className="absolute inset-0 cursor-zoom-in" />

        {shots.length > 1 && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-slate-800 shadow transition hover:bg-white">‹</button>
            <button type="button" onClick={() => step(1)} aria-label="Next screenshot"
              className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-slate-800 shadow transition hover:bg-white">›</button>
          </>
        )}

        {/* Caption + dots */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-slate-900/70 to-transparent p-3 pt-10">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">{label}</span>
          {shots.length > 1 && (
            <span className="pointer-events-auto flex gap-1.5">
              {shots.map((name, i) => (
                <button
                  key={name}
                  type="button"
                  aria-label={`Show ${SHOT_LABELS[name] || name}`}
                  onClick={() => setIndex(i)}
                  className={`h-2 rounded-full transition-all ${i === index ? 'w-5 bg-white' : 'w-2 bg-white/60 hover:bg-white'}`}
                />
              ))}
            </span>
          )}
        </div>
      </div>
      {zoom && (
        <Lightbox
          images={shots.map((name) => ({ src: `${SHOT_DIR}${name}.jpg`, label: SHOT_LABELS[name] || name }))}
          start={index}
          onClose={() => setZoom(false)}
        />
      )}
    </figure>
  );
}
