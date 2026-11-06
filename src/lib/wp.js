// Thin client for the WordPress REST API (headless mode).
const BASE = (import.meta.env.VITE_WP_URL || '').replace(/\/$/, '');
const API = `${BASE}/wp-json/wp/v2`;

async function request(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`WordPress request failed (${res.status})`);
  return res.json();
}

export const getPosts = ({ page = 1, perPage = 9 } = {}) =>
  request(`/posts?_embed&page=${page}&per_page=${perPage}`);

export const getPostBySlug = async (slug) => {
  const posts = await request(`/posts?_embed&slug=${encodeURIComponent(slug)}`);
  return posts[0] ?? null;
};

export const featuredImage = (post) =>
  post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null;

export const stripHtml = (html = '') => html.replace(/<[^>]+>/g, '').trim();

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

// Visitor counter (public/visitors.php, deployed next to index.html).
// Counts a visit once per browser session; otherwise only reads the total.
export async function getVisitorCount() {
  const url = `${import.meta.env.BASE_URL}visitors.php`;
  let counted = false;
  try { counted = sessionStorage.getItem('wpart_visit_counted') === '1'; } catch { /* storage blocked */ }
  const res = await fetch(url, { method: counted ? 'GET' : 'POST' });
  if (!res.ok) throw new Error(`Visitor counter failed (${res.status})`);
  try { sessionStorage.setItem('wpart_visit_counted', '1'); } catch { /* storage blocked */ }
  return (await res.json()).count;
}

// Contact form: posts to public/contact.php (deployed next to index.html), which emails the enquiry.
export async function sendContact(payload) {
  const res = await fetch(`${import.meta.env.BASE_URL}contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) throw new Error(data.message || `Could not send your message (server replied ${res.status}). Please try again.`);
}
