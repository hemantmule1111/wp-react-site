import Reveal from './Reveal.jsx';

// compact: tighter spacing and a smaller heading, for short intro blocks
export default function Section({ id, eyebrow, title, children, compact = false }) {
  return (
    <section id={id} className={`scroll-mt-20 ${compact ? 'py-4' : 'py-8'}`}>
      <div className="container-x">
        <Reveal>
          <p className="font-mono text-sm text-accent">// {eyebrow}</p>
          <h2 className={`mt-2 font-bold ${compact ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'}`}>{title}</h2>
        </Reveal>
        <div className={compact ? 'mt-5' : 'mt-12'}>{children}</div>
      </div>
    </section>
  );
}
