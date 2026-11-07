import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';
import { promo, homeImg } from '../data/content.js';

export default function Promo() {
  return (
    <section className="py-12">
      <div className="container-x">
        <Reveal>
          <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-violet-100 via-fuchsia-50 to-orange-100 p-8 sm:p-12 md:grid-cols-[18rem_1fr_auto]">
            <div className="overflow-hidden rounded-2xl shadow-xl shadow-fuchsia-500/25">
              <img src={homeImg(promo.image)} alt={promo.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            </div>
            <div>
              <span className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-3 py-1 font-mono text-xs font-semibold text-white">{promo.badge}</span>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">{promo.title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed">{promo.text}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="gradient-text text-5xl font-extrabold">{promo.price}</p>
              <p className="mb-5 font-mono text-sm">{promo.per}</p>
              <Link to="/contact#contact" className="btn-primary">{promo.cta}</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
