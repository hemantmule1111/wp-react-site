import { Link } from 'react-router-dom';
import Section from './Section.jsx';
import PostCard from './PostCard.jsx';
import useAsync from '../lib/useAsync.js';
import { getPosts } from '../lib/wp.js';
import { fallbackArticles, homeImg } from '../data/content.js';

export default function LatestPosts() {
  const { data, error, loading } = useAsync(() => getPosts({ perPage: 6 }), []);
  const hasPosts = data && data.length > 0;

  return (
    <Section id="articles" eyebrow="news" title="Latest News">
      {loading && <p className="font-mono text-sm">loading posts…</p>}
      {hasPosts && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      )}
      {!loading && !hasPosts && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fallbackArticles.map((a) => (
            <div key={a.title} className="card overflow-hidden !p-0">
              <div className="relative h-36 overflow-hidden">
                <img src={homeImg(a.image)} alt={a.title} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-fuchsia-600 shadow">{a.tag}</span>
              </div>
              <h3 className="p-5 font-semibold text-slate-900">{a.title}</h3>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-4 font-mono text-xs text-slate-500">Showing sample articles (WordPress not connected).</p>}
      <Link to="/blog" className="btn-ghost mt-10">All articles →</Link>
    </Section>
  );
}
