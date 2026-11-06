import { useEffect } from 'react';
import { SITE, canonical } from '../data/seo.js';

function setTag(selector, create, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(create);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

/**
 * Sets the page title, description, canonical URL, Open Graph / Twitter tags and
 * (optionally) page-level JSON-LD. Call it once at the top of every page component.
 *   path:   route path without the /en base, e.g. '/about' ('/' for home)
 *   jsonLd: an object or array of objects
 */
export function useSeo({ title, description, path = '/', image = SITE.image, type = 'website', noindex = false, jsonLd }) {
  const ld = jsonLd ? JSON.stringify(jsonLd) : '';
  useEffect(() => {
    if (title) document.title = title;
    const url = canonical(path);
    if (description) setTag('meta[name="description"]', 'meta', { name: 'description', content: description });
    setTag('meta[name="robots"]', 'meta', {
      name: 'robots',
      content: noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1',
    });
    setTag('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });

    const og = { 'og:title': title, 'og:description': description, 'og:url': url, 'og:image': image, 'og:type': type, 'og:site_name': SITE.name, 'og:locale': SITE.locale };
    Object.entries(og).forEach(([p, c]) => c && setTag(`meta[property="${p}"]`, 'meta', { property: p, content: c }));
    const tw = { 'twitter:card': 'summary_large_image', 'twitter:title': title, 'twitter:description': description, 'twitter:image': image };
    Object.entries(tw).forEach(([n, c]) => c && setTag(`meta[name="${n}"]`, 'meta', { name: n, content: c }));

    let script = document.getElementById('page-jsonld');
    if (ld) {
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'page-jsonld';
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else if (script) {
      script.remove();
    }
  }, [title, description, path, image, type, noindex, ld]);
}
