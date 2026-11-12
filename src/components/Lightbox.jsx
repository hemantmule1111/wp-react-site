import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Full-screen image viewer with previous / next. `images` = [{ src, label }]; `start` = index to open on.
export default function Lightbox({ images, start = 0, onClose }) {
  const [i, setI] = useState(start);
  const n = images.length;
  const go = (d) => setI((v) => (v + d + n) % n);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, onClose]);

  const btn = 'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-slate-800 shadow-lg transition hover:bg-white';
  const cur = images[i];

  // Portal to <body>: the page's animated wrappers use transforms, which would trap a fixed overlay.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={cur.label}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/85 p-3 sm:p-8"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-slate-800 hover:bg-white">✕</button>
      {n > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${btn} left-3 sm:left-6`}>‹</button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${btn} right-3 sm:right-6`}>›</button>
        </>
      )}
      <figure className="flex max-h-full max-w-6xl flex-col items-center">
        <img src={cur.src} alt={cur.label} className="max-h-[80vh] w-auto max-w-full rounded-xl bg-white object-contain shadow-2xl" />
        <figcaption className="mt-3 text-center text-sm text-white">
          <span className="font-semibold">{cur.label}</span>
          {n > 1 && <span className="ml-2 text-white/70">{i + 1} / {n}</span>}
        </figcaption>
      </figure>
    </div>,
    document.body
  );
}
