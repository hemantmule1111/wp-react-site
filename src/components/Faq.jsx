import { useState } from 'react';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {items.map(([q, a], i) => (
        <div key={q} className="overflow-hidden rounded-xl border border-line bg-white">
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-medium text-slate-900"
            aria-expanded={open === i}
          >
            {q}
            <span className={`gradient-text text-xl transition-transform ${open === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {open === i && <p className="px-5 pb-5 text-sm leading-relaxed">{a}</p>}
        </div>
      ))}
    </div>
  );
}
