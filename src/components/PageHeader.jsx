import { Link } from 'react-router-dom';

// parent: optional { label, to } shown in the breadcrumb (used by service detail pages)
export default function PageHeader({ title, subtitle, parent }) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-gradient-to-br from-violet-100 via-fuchsia-50 to-orange-100 pt-24 pb-5">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-[90px]" />
      <div className="container-x relative">
        <p className="font-mono text-xs text-accent">
          <Link to="/" className="hover:underline">Home</Link>
          {parent && <> / <Link to={parent.to} className="hover:underline">{parent.label}</Link></>} / {title}
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 max-w-2xl text-base">{subtitle}</p>}
      </div>
    </div>
  );
}
