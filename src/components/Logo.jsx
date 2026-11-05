import { useState } from 'react';
import { brand } from '../data/content.js';

// Put your logo at: react-site/public/images/logo.jpg  (or change LOGO_SRC below, e.g. /logo.svg)
const LOGO_SRC = `${import.meta.env.BASE_URL}images/logo.jpg`;

export default function Logo({ className = 'h-12' }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    // Text fallback until a logo file exists
    return (
      <span className="font-mono text-lg font-bold text-slate-900">
        <span className="text-brand-400">&lt;</span>{brand}<span className="text-accent"> /&gt;</span>
      </span>
    );
  }
  return <img src={LOGO_SRC} alt={brand} className={`${className} w-auto`} onError={() => setMissing(true)} />;
}
