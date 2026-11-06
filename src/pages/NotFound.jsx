import { useSeo } from '../lib/seo.js';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useSeo({ title: 'Page not found | WPArt', description: 'This page could not be found.', path: '/404', noindex: true });
  return (
    <div className="container-x pt-40 pb-24 text-center">
      <p className="gradient-text font-mono text-7xl font-bold">404</p>
      <p className="mt-4 text-slate-900">Page not found.</p>
      <Link to="/" className="btn-primary mt-8">Back home</Link>
    </div>
  );
}
