import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageHeader from '../components/PageHeader.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { allVideos, categories, channelUrl, channelName } from '../data/youtube.js';

const thumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function YoutubePage() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(null); // video being played in the lightbox

  const list = useMemo(
    () =>
      allVideos.filter(
        (v) =>
          (cat === 'All' || v.category === cat) &&
          v.full.toLowerCase().includes(q.trim().toLowerCase())
      ),
    [cat, q]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <PageHeader title="YouTube" subtitle={`Tutorials from the ${channelName} channel: WordPress, Shopify, Photoshop and HTML/CSS.`} />

      <section className="py-10">
        <div className="container-x">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    cat === c
                      ? 'border-transparent bg-gradient-to-r from-violet-600 to-orange-400 text-white shadow-md'
                      : 'border-line bg-panel text-slate-700 hover:border-fuchsia-300'
                  }`}
                >
                  {c}
                  <span className="ml-1.5 text-xs opacity-70">
                    {c === 'All' ? allVideos.length : allVideos.filter((v) => v.category === c).length}
                  </span>
                </button>
              ))}
            </div>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search videos…"
              className="w-full rounded-full border border-line bg-panel px-5 py-2 text-sm outline-none focus:border-fuchsia-400 md:w-72"
            />
          </div>

          {/* Grid */}
          <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((v) => (
                <motion.button
                  layout
                  key={v.id}
                  type="button"
                  onClick={() => setOpen(v)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group card !p-0 text-left"
                >
                  <span className="relative block aspect-video overflow-hidden bg-slate-200">
                    <img src={thumb(v.id)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-xl transition group-hover:scale-110">
                      <PlayIcon className="h-6 w-6 translate-x-px" />
                    </span>
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-semibold text-violet-700">{v.category}</span>
                  </span>
                  <span className="block p-4 font-semibold leading-snug text-slate-900">{v.title}</span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>

          {list.length === 0 && <p className="mt-10 text-center">No videos match your search.</p>}

          <div className="mt-12 text-center">
            <a href={channelUrl} target="_blank" rel="noreferrer" className="btn-primary">
              See every video on YouTube →
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.div
              className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${open.id}?autoplay=1&rel=0`}
                  title={open.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-4">
                <h3 className="font-semibold text-slate-900">{open.full}</h3>
                <button type="button" onClick={() => setOpen(null)} className="shrink-0 rounded-full border border-line px-3 py-1 text-sm hover:border-fuchsia-300">
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CtaBand />
    </>
  );
}
