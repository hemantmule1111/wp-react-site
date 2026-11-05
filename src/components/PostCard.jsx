import { Link } from 'react-router-dom';
import { featuredImage, formatDate, stripHtml } from '../lib/wp.js';
import ServiceArt from './ServiceArt.jsx';

// Software-themed illustrations used when a post has no featured image
const artSlugs = ['website-development', 'web-application-development', 'api-development-integration', 'cloud-application-development', 'ai-machine-learning', 'devops-ci-cd'];

export default function PostCard({ post }) {
  const img = featuredImage(post);
  return (
    <Link to={`/blog/${post.slug}`} className="card block overflow-hidden !p-0">
      {img ? (
        <img src={img} alt="" className="h-44 w-full object-cover" loading="lazy" />
      ) : (
        <ServiceArt slug={artSlugs[post.id % artSlugs.length]} index={post.id} className="h-44 w-full" />
      )}
      <div className="p-6">
        <p className="font-mono text-xs text-accent">{formatDate(post.date)}</p>
        <h3 className="mt-2 font-semibold text-slate-900" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <p className="mt-2 line-clamp-3 text-sm">{stripHtml(post.excerpt.rendered)}</p>
      </div>
    </Link>
  );
}
