import { useSeo } from '../lib/seo.js';
import { pageSeo } from '../data/seo.js';
import { useState } from 'react';
import PostCard from '../components/PostCard.jsx';
import useAsync from '../lib/useAsync.js';
import { getPosts } from '../lib/wp.js';

const PER_PAGE = 9;

export default function BlogList() {
  useSeo({ ...pageSeo['/blog'], path: '/blog' });
  const [page, setPage] = useState(1);
  const { data, error, loading } = useAsync(() => getPosts({ page, perPage: PER_PAGE }), [page]);

  return (
    <div className="container-x pt-32 pb-24">
      <h1 className="text-4xl font-extrabold text-slate-900">Blog</h1>
      {loading && <p className="mt-8 font-mono text-sm">loading…</p>}
      {error && <p className="mt-8 text-red-400">Couldn't load posts from WordPress.</p>}
      {data && (
        <>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
          <div className="mt-10 flex gap-3">
            {page > 1 && <button className="btn-ghost" onClick={() => setPage(page - 1)}>← Newer</button>}
            {data.length === PER_PAGE && <button className="btn-ghost" onClick={() => setPage(page + 1)}>Older →</button>}
          </div>
        </>
      )}
    </div>
  );
}
