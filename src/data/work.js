// Live client work shown on the About page.
// Dead links were checked on 2026-11-05 and removed. To add a site, append its URL to a group.
export const workGroups = [
  {
    key: 'wordpress',
    title: 'WordPress Sites',
    icon: '🧩',
    blurb: 'Custom themes, ACF-powered pages and business websites built on WordPress.',
    gradient: 'from-violet-600 to-fuchsia-500',
    sites: [
      'https://quasco.in/',
      'https://srcdoors.com/',
      'https://fixensy.com/',
      'https://www.jyothylabs.com/',
      'https://skills2zen.com/',
      'https://notarybyjesse.com/',
      'https://bhagyashreebhati.com/',
      'https://tricona.ca/',
      'https://www.x-ringarchers.com/',
      'https://www.u-wed.com/',
      'https://www.brainstorminternational.co.in/',
      'https://vkweb.fr/',
      'https://www.propanesafetypro.com/',
      'https://thefluidbox.com/',
      'https://goodrichgas.com/',
      { url: 'https://vkweb.eu/', note: 'Blog post site for advertising' },
    ],
  },
  {
    key: 'latest',
    title: 'Latest WordPress Work',
    icon: '✨',
    blurb: 'Our most recent launches.',
    gradient: 'from-fuchsia-500 to-orange-400',
    sites: ['https://www.skylineelitecontractors.com/', 'https://barefootbushcraft.com/'],
  },
  {
    key: 'elementor',
    title: 'Elementor Websites',
    icon: '🎨',
    blurb: 'Visual, page-builder driven sites that clients can edit themselves.',
    gradient: 'from-sky-500 to-violet-500',
    sites: [
      'https://sustainablyyours.in/',
      'https://printerydubai.com/',
      'https://www.golfzoneproshop.com/',
    ],
  },
  {
    key: 'portal',
    title: 'WordPress Mini Portals',
    icon: '🏢',
    blurb: 'Directories, listings and member-style portals on WordPress.',
    gradient: 'from-emerald-500 to-sky-500',
    sites: [
      'https://bdaonline.com.au/',
      'https://franchisingwa.com.au/',
      'https://customfuelapp.com/',
      'https://assamholidays.com/',
    ],
  },
  {
    key: 'woo',
    title: 'WooCommerce Websites',
    icon: '🛒',
    blurb: 'Online stores with products, carts and payments.',
    gradient: 'from-orange-500 to-rose-500',
    sites: ['https://obataimu.com/'],
  },
  {
    key: 'psd',
    title: 'PSD to HTML Websites',
    icon: '📐',
    blurb: 'Pixel-perfect, responsive conversions from Photoshop designs.',
    gradient: 'from-indigo-500 to-fuchsia-500',
    sites: ['https://mumbadevi.org.in/', 'https://anurag.work/'],
  },
];

export const tutorial = {
  title: 'Create a website in WordPress with Advanced Custom Fields',
  label: 'Video tutorial creation',
  id: 'ubQ9xwML76M',
};

const normalise = (s) => (typeof s === 'string' ? { url: s } : s);
export const hostOf = (url) => new URL(url).hostname.replace(/^www\./, '');
export const groups = workGroups.map((g) => ({ ...g, sites: g.sites.map(normalise) }));
export const totalSites = new Set(groups.flatMap((g) => g.sites.map((s) => hostOf(s.url)))).size;
