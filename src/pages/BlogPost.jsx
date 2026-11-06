import { Link, useParams } from 'react-router-dom';
import useAsync from '../lib/useAsync.js';
import { getPostBySlug, featuredImage, formatDate, stripHtml } from '../lib/wp.js';
import { useSeo } from '../lib/seo.js';
import NotFound from './NotFound.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, error, loading } = useAsync(() => getPostBySlug(slug), [slug]);

  useSeo({
    title: post ? `${stripHtml(post.title.rendered)} | WPArt` : 'Blog | WPArt',
    description: post ? stripHtml(post.excerpt?.rendered || '').slice(0, 155) : undefined,
    path: `/blog/${slug}`,
    image: post ? featuredImage(post) || undefined : undefined,
    type: 'article',
    noindex: !loading && !post,
  });

  if (loading) return <p className="container-x pt-32 font-mono text-sm">loading…</p>;
  if (error) return <p className="container-x pt-32 text-red-400">Couldn't load this post.</p>;
  if (!post) return <NotFound />;

  const img = featuredImage(post);
  return (
    <article className="container-x max-w-3xl pt-32 pb-24">
      <Link to="/blog" className="font-mono text-sm text-accent">← back to blog</Link>
      <h1 className="mt-4 text-4xl font-extrabold text-slate-900" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <p className="mt-3 font-mono text-xs text-slate-500">{formatDate(post.date)}</p>
      {img && <img src={img} alt={stripHtml(post.title.rendered)} className="mt-8 w-full rounded-2xl" />}
      {/* HTML comes from your own WordPress; it is trusted content. */}
      <div className="wp-content mt-8" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
