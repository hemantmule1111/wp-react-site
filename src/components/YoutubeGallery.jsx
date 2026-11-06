import { useState } from 'react';
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import Section from './Section.jsx';
import Reveal from './Reveal.jsx';
import { youtubeVideos } from '../data/content.js';

const thumb = (id, q = 'hqdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`;

function PlayIcon({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function YoutubeGallery() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const video = youtubeVideos[active];

  const select = (i) => {
    setActive(i);
    setPlaying(false);
  };

  return (
    <div className="border-y border-violet-100 bg-gradient-to-br from-violet-100/80 via-fuchsia-50 to-orange-50 py-6">
    <Section id="youtube" eyebrow="youtube gallery" title="Watch & Learn">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Featured player */}
        <Reveal>
          <div className="card !p-0">
            <div className="relative aspect-video w-full bg-slate-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={video.id + playing}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {playing ? (
                    <iframe
                      className="h-full w-full"
                      src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&start=${video.start}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="group relative h-full w-full"
                      aria-label={`Play ${video.title}`}
                    >
                      <img
                        src={thumb(video.id, 'maxresdefault')}
                        onError={(e) => { e.currentTarget.src = thumb(video.id); }}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-violet-600/20" />
                      <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-fuchsia-600 shadow-2xl transition group-hover:scale-110">
                        <span className="absolute inset-0 animate-ping rounded-full bg-white/40" />
                        <PlayIcon className="relative h-9 w-9 translate-x-0.5" />
                      </span>
                      <span className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-violet-600 to-orange-400 px-3 py-1 text-xs font-semibold text-white">
                        {video.tag}
                      </span>
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{video.title}</h3>
              <p className="mt-2 text-sm leading-relaxed">{video.desc}</p>
            </div>
          </div>
        </Reveal>

        {/* Playlist */}
        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-3">
            {youtubeVideos.map((v, i) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-fuchsia-500/10 ${
                    i === active
                      ? 'border-fuchsia-400 bg-fuchsia-50 shadow-md'
                      : 'border-line bg-panel'
                  }`}
                >
                  <span className="relative block h-20 w-32 shrink-0 overflow-hidden rounded-xl">
                    <img src={thumb(v.id)} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-slate-900/30">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-fuchsia-600">
                        <PlayIcon className="h-4 w-4 translate-x-px" />
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="font-mono text-xs text-accent">0{i + 1} · {v.tag}</span>
                    <span className="mt-1 block font-semibold leading-snug text-slate-900">{v.title}</span>
                  </span>
                </button>
              </li>
            ))}
            <li>
              <Link to="/youtube" className="btn-primary w-full justify-center">
                View All Videos →
              </Link>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
    </div>
  );
}
