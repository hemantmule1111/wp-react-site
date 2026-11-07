// Edit this file to change the copy on the homepage.
export const brand = 'WPArt';

// Home page images live in public/images/home/
export const homeImg = (name) => `${import.meta.env.BASE_URL}images/home/${name}`;

// Illustrations shown above the "Why choose us" cards
export const whyImages = [
  { src: 'why-cloud.svg', alt: 'Cloud application development' },
  { src: 'why-custom-software.svg', alt: 'Custom software development' },
  { src: 'why-analytics.svg', alt: 'Data analytics dashboards' },
];

export const hero = {
  eyebrow: 'Software Development Agency',
  title: 'We Build Dynamic Software Modules That',
  highlight: 'Power Your Business',
  cta: 'Our Services',
};

// Slides rotated in the home page carousel
export const heroSlides = [
  {
    eyebrow: 'Software Development Agency',
    title: 'We Build Dynamic Software Modules That',
    highlight: 'Power Your Business',
    text: 'Great software is not just code that runs. It is a solution that works for your people, your process and your growth.',
    cta: { label: 'Our Services', to: '/services' },
    code: [['function', ' buildModule', '()', ' {'], ['  return', ' {', '', ''], ['    type:', ' "custom software",', '', ''], ['    status:', ' "shipped",', '', ''], ['  };', '', '', ''], ['}', '', '', '']],
    file: 'module.js',
    image: homeImg('slider-101.png'),
  },
  {
    eyebrow: 'Web & API Development',
    title: 'Fast, Secure Web Apps and',
    highlight: 'Scalable APIs',
    breakHighlight: true,
    text: 'From dashboards to integrations, we design and engineer backends and frontends that stay quick as you grow.',
    cta: { label: 'See Projects', to: '/projects' },
    code: [['app.', 'get', '(', '"/api/orders"'], ['  async', ' (req, res)', ' =>', ' {'], ['    res.', 'json', '(', 'orders);'], ['});', '', '', '']],
    file: 'server.js',
    image: homeImg('slider-102.png'),
  },
  {
    eyebrow: 'UI/UX & WordPress',
    title: 'Beautiful Interfaces Built on',
    highlight: 'WordPress & React',
    text: 'Intuitive, user-friendly design with headless WordPress, Elementor and modern React for a flawless experience.',
    cta: { label: 'Contact Us', to: '/contact#contact' },
    code: [['<Hero', '', '', ''], ['  theme=', '"gradient"', '', ''], ['  cms=', '"WordPress"', '', ''], ['  ui=', '"React"', '', ''], ['/>', '', '', '']],
    file: 'Hero.jsx',
    image: homeImg('slider-103.png'),
  },
];

export const quote ='Great software is not just code that runs. It is a solution that works for your people, your process and your growth.';

// Short intro paragraphs used on the About page
export const aboutText = [
  "We are a software development agency that designs and builds dynamic software modules, from websites and web apps to mobile apps, ERP and AI solutions, tailored to how your business works.",
  "In today's digital landscape, User Interface (UI) and User Experience (UX) design play a crucial role in determining a product's success. Our projects go beyond aesthetics: they focus on creating intuitive, user-friendly, and engaging experiences that meet both user needs and business goals.",
];

export const promo = {
  image: 'promo-elementor.svg',
  title: 'Elementor page builders',
  badge: 'Save 80%',
  price: 'Only $16',
  per: 'per year',
  text: "In today's digital landscape, User Interface (UI) and User Experience (UX) design play a crucial role in determining a product's success. Effective UI/UX projects go beyond aesthetics—they focus on creating intuitive, user-friendly, and engaging experiences that meet both user needs and business goals.",
  cta: 'Buy Elementor Page Builder',
};

export const projects = {
  title: 'Ongoing Website Projects',
  intro: 'To complete a project as a WordPress developer, several key responsibilities are important for the success of a project:',
  items: [
    'Understanding Requirements',
    'WordPress Coding Standards',
    'Security Measures',
    'Performance Optimization',
    'Responsive Fixes',
    'Testing and Debugging',
    'Documentation',
    'Client Training and Support',
    'Compliance and Accessibility',
    'Continuous Learning: stay updated with the latest trends, technologies and best practices in WordPress development',
  ],
};

export const videos = {
  title: 'Our Videos',
  text: "WordPress is the world's most popular content management system (CMS), powering over 40% of all websites. Known for its flexibility, ease of use, and rich ecosystem of themes and plugins, WordPress offers a dynamic platform for creating anything from personal blogs to enterprise-level websites.",
  items: ['Advanced Custom Fields', 'Photoshop Tutorials', 'Create Blocks In Shopify'],
  cta: 'View All Videos',
};

// Shown when WordPress has no posts / can't be reached
export const fallbackArticles = [
  { title: '6 Coding Trends for 2025 and Beyond', tag: 'Trends', image: 'article-trends.svg' },
  { title: 'PHP Hypertext Preprocessor is a free', tag: 'PHP', image: 'article-php.svg' },
  { title: 'Java programming language', tag: 'Java', image: 'article-java.svg' },
  { title: 'Data analyst', tag: 'Data', image: 'article-data.svg' },
  { title: 'Computer Network', tag: 'Networking', image: 'article-network.svg' },
  { title: 'Web development', tag: 'Web', image: 'article-web.svg' },
  { title: 'Internet of things', tag: 'IoT', image: 'article-iot.svg' },
  { title: 'Machine learning', tag: 'AI', image: 'article-ai.svg' },
];

export const social = [
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'Youtube', href: 'https://youtube.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
];

export const helpfulLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'YouTube Gallery', to: '/youtube' },
  { label: 'Latest News', to: '/blog' },
  { label: 'Contact', to: '/contact#contact' },
];

// Shown in the footer. Replace the placeholders with your real details.
export const contact = {
  address: 'B/6, Mangalmurti apartment chs. Service Road, Sector 30A, Vashi, Navi Mumbai, Maharashtra 400705',
  phone: '8097 370 227',
  emails: ['mule.hemant@gmail.com', 'info@wpart.co.in'],
  hours: 'Mon - Sat, 10:00 AM - 7:00 PM',
};

// YouTube gallery (home page). `start` is in seconds.
export const youtubeChannel = 'https://www.youtube.com/@mulehemant/videos';
export const youtubeVideos = [
  { id: 'mmF9E69LBOM', start: 376, title: 'Advanced Custom Fields', desc: 'How to update content in WordPress, including the footer section.', tag: 'WordPress' },
  { id: 'g593_i84JE8', start: 0, title: 'Photoshop Tutorials', desc: 'Photoshop for beginners: the Marquee tool and creating a website with Photoshop.', tag: 'Design' },
  { id: 'qMaPQHUWBdI', start: 16, title: 'Create Blocks In Shopify', desc: 'Shopify store complete setup and development, part 4: creating blocks.', tag: 'Shopify' },
];
