import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export default function CtaBand() {
  return (
    <section className="py-10">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 rounded-[15px] border border-b-[5px] border-[#ff8c00] px-6 py-5 sm:flex-row sm:items-center sm:px-8">
            <div>
              <h2 className="text-xl font-bold sm:text-2xl">Have a project in mind?</h2>
              <p className="mt-1 text-slate-600">Let's build great software together.</p>
            </div>
            <Link to="/contact" className="btn-primary shrink-0">Contact us</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
