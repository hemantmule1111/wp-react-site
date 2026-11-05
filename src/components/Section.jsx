import Reveal from './Reveal.jsx';

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-20 py-8">
      <div className="container-x">
        <Reveal>
          <p className="font-mono text-sm text-accent">// {eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
