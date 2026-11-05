# React site (headless WordPress)

Setup:

1. Install Node.js LTS (https://nodejs.org).
2. `cd react-site`
3. `copy .env.example .env` and set `VITE_WP_URL` to your WordPress URL.
4. `npm install`
5. `npm run dev` (http://localhost:5173)

Edit homepage copy in `src/data/content.js`. Blog posts come from the WordPress REST API.

WordPress notes:
- Permalinks must not be "Plain" (Settings > Permalinks) so `/wp-json/` works.
- If React runs on a different origin, WordPress REST is readable cross-origin by default for GET requests.
- Build for production: `npm run build` (output in `dist/`). Serve `dist/` with SPA fallback to `index.html`.
