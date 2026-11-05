import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

function Counter({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    // Timer-based (not requestAnimationFrame) so it also runs in throttled / background tabs
    const start = Date.now();
    const duration = 1600;
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setVal(Math.round(to * (1 - (1 - p) ** 3))); // ease-out cubic
      if (p === 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// Outline icons (24x24 grid, stroke only)
const icons = {
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="3" />
      <path d="M8 2.5v4M16 2.5v4M3 9.5h18M8.5 14.5l2.5 2.5 4.5-4.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" />
    </>
  ),
  layers: (
    <>
      <path d="M5 9l2-4.5h10L19 9" />
      <rect x="3" y="9" width="18" height="3" rx="1.5" />
      <path d="M3.5 15.5h17M5 19.5h14" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16" />,
  devices: (
    <>
      <path d="M17 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h6M8 20h4M10 16v4" />
      <rect x="14" y="9" width="7" height="12" rx="1.8" />
    </>
  ),
  world: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M5 6c3 0 4 2 6 2s1 3-1 4-1 4 1 5M15 3.5c-1 2 0 3 2 3s3 2 2.5 4-2 2-3 3" />
    </>
  ),
};

// Each column gets its own light-blue background gradient and a colourful number gradient
const stats = [
  { icon: 'calendar', n: 20, suffix: '+', label: 'Years of Experience', bg: 'from-sky-100 to-blue-200', num: 'from-violet-600 to-fuchsia-500' },
  { icon: 'globe', n: 200, suffix: '+', label: 'Websites Delivered', bg: 'from-blue-100 to-indigo-200', num: 'from-blue-600 to-cyan-500' },
  { icon: 'layers', n: 20, suffix: '+', label: 'Enterprise Projects', bg: 'from-cyan-100 to-sky-200', num: 'from-fuchsia-600 to-orange-500' },
  { icon: 'code', n: 10, suffix: '+', label: 'Software Services', bg: 'from-indigo-100 to-violet-200', num: 'from-indigo-600 to-sky-500' },
  { icon: 'devices', n: 4, suffix: '', label: 'Platforms Supported', bg: 'from-sky-100 to-cyan-200', num: 'from-[#1d4ed8] to-[#0ea5e9]' },
  { icon: 'world', n: 5, suffix: '+', label: 'Countries Served', bg: 'from-blue-100 to-sky-200', num: 'from-orange-500 to-rose-500' },
];

export default function StatsBand() {
  return (
    <section className="relative z-0">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`group relative flex cursor-default flex-col items-center bg-gradient-to-br px-4 py-6 text-center transition-all duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-400/40 hover:brightness-105 ${s.bg}`}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[1.8rem] w-[1.8rem] text-[#4a7fd0] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-125 group-hover:-rotate-6 group-hover:text-[#2f63c4]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {icons[s.icon]}
            </svg>
            <p className={`mt-4 bg-gradient-to-r bg-clip-text text-[2.079rem] font-extrabold leading-none text-transparent transition-transform duration-300 group-hover:scale-110 sm:text-[2.772rem] ${s.num}`}>
              <Counter to={s.n} suffix={s.suffix} />
            </p>
            <p className="mt-2 max-w-[10rem] text-[0.875rem] font-medium leading-snug text-slate-700 transition-colors duration-300 group-hover:text-slate-900">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
