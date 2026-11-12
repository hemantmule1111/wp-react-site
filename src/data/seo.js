// Central SEO settings. Pure data, so both the React app and the build script (scripts/seo-build.mjs) use it.
// Keep titles under ~60 characters and descriptions under ~155 so Google doesn't cut them off.
export const SITE = {
  name: 'WPArt',
  url: 'https://wpart.co.in/en', // no trailing slash
  image: 'https://wpart.co.in/en/images/og-image.jpg', // 1200x630, used when sharing links
  locale: 'en_IN',
};

export const pageSeo = {
  '/': {
    title: 'WPArt | Website, App & Custom Software Development Company',
    description:
      'WPArt builds websites, web & mobile apps, ERP/CRM and custom software for businesses worldwide. 20+ years of experience, 550+ websites delivered. Get a free quote.',
    priority: '1.0',
  },
  '/about': {
    title: 'About WPArt | Custom Software Development & Design',
    description:
      'Meet WPArt, a software development agency in Navi Mumbai designing and building websites, web apps, mobile apps and enterprise software for clients in 15+ countries.',
    priority: '0.8',
  },
  '/services': {
    title: 'Software Development Services | WPArt',
    description:
      'Website, web app, mobile app, e-commerce, ERP, CRM, API and UI/UX development, plus testing and support. Explore all WPArt software services.',
    priority: '0.9',
  },
  '/projects': {
    title: 'Our Projects & Case Studies | WPArt',
    description: 'See how WPArt delivers successful WordPress websites and custom software projects for businesses.',
    priority: '0.7',
  },
  '/workpilot': {
    title: 'WorkPilot HR Software | Free for 5 Logins | WPArt',
    description:
      'WorkPilot is HR management software for attendance, leave, payroll and recruitment. Free for up to 5 email logins, then simple monthly plans.',
    priority: '0.8',
  },
  '/youtube': {
    title: 'YouTube Video Tutorials | WordPress, Shopify, Photoshop | WPArt',
    description:
      'Free video tutorials on WordPress, Advanced Custom Fields, Shopify, Photoshop to HTML and more from the WPArt YouTube channel.',
    priority: '0.6',
  },
  '/blog': {
    title: 'Latest News & Articles | WPArt',
    description: 'News, tips and articles on web development, WordPress, software and design from the WPArt team.',
    priority: '0.7',
  },
  '/contact': {
    title: 'Contact WPArt | Get a Free Quote for Your Project',
    description:
      'Tell us about your website, app or software project and get a free consultation and quote. Call 8097 370 227 or send an enquiry.',
    priority: '0.8',
  },
};

// Business details used for structured data (JSON-LD). Keep in sync with the footer.
export const business = {
  name: 'WPArt',
  legalName: 'WPArt',
  url: 'https://wpart.co.in/',
  logo: 'https://wpart.co.in/en/images/logo.jpg',
  phone: '+91 8097 370 227',
  email: 'info@wpart.co.in',
  address: {
    streetAddress: 'B/6, Mangalmurti apartment chs. Service Road, Sector 30A, Vashi',
    addressLocality: 'Navi Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400705',
    addressCountry: 'IN',
  },
  sameAs: ['https://www.youtube.com/@mulehemant'],
};

export const orgJsonLd = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': 'https://wpart.co.in/#organization',
      name: business.name,
      legalName: business.legalName,
      url: business.url,
      logo: business.logo,
      image: SITE.image,
      telephone: business.phone,
      email: business.email,
      description: pageSeo['/'].description,
      address: { '@type': 'PostalAddress', ...business.address },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '19:00',
      },
      sameAs: business.sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': 'https://wpart.co.in/#website',
      url: `${SITE.url}/`,
      name: SITE.name,
      publisher: { '@id': 'https://wpart.co.in/#organization' },
    },
  ],
});

export const canonical = (path) => (path === '/' || path === '' ? `${SITE.url}/` : `${SITE.url}${path}`);

export const breadcrumbJsonLd = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: canonical(path),
  })),
});

export const serviceMeta = (s) => ({
  title: `${s.title} Services | WPArt`,
  description: `${s.tagline} ${s.overview}`.replace(/\s+/g, ' ').slice(0, 155).replace(/\s\S*$/, '') + '…',
});

export const serviceJsonLd = (s) => {
  const graph = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.title,
      serviceType: s.title,
      description: s.overview,
      url: canonical(`/services/${s.slug}`),
      provider: { '@id': 'https://wpart.co.in/#organization' },
      areaServed: 'Worldwide',
    },
    breadcrumbJsonLd([['Home', '/'], ['Services', '/services'], [s.title, `/services/${s.slug}`]]),
  ];
  if (s.faqs?.length) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: s.faqs.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }
  return graph;
};
