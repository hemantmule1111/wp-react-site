// Options for the enquiry form on /contact.
// Edit the lists below to change what visitors can pick.
export const serviceCategories = [
  {
    key: 'web',
    title: 'Web & Apps',
    gradient: 'from-violet-600 to-fuchsia-500',
    services: [
      { icon: '🌐', title: 'Website Development' },
      { icon: '🧩', title: 'Web Application Development' },
      { icon: '📱', title: 'Mobile App Development' },
      { icon: '🛒', title: 'E-commerce Development' },
      { icon: '🖥️', title: 'Desktop Application Development' },
    ],
  },
  {
    key: 'enterprise',
    title: 'Business Software',
    gradient: 'from-fuchsia-500 to-orange-400',
    services: [
      { icon: '🛠️', title: 'Custom Software Development' },
      { icon: '🏢', title: 'ERP Software Development' },
      { icon: '🤝', title: 'CRM Software Development' },
    ],
  },
  {
    key: 'design',
    title: 'Design & Integration',
    gradient: 'from-sky-500 to-violet-500',
    services: [
      { icon: '🎨', title: 'UI/UX Design & Development' },
      { icon: '🔌', title: 'API Development & Integration' },
      { icon: '💳', title: 'Payment Gateway Integration' },
    ],
  },
  {
    key: 'quality',
    title: 'Quality & Support',
    gradient: 'from-emerald-500 to-sky-500',
    services: [
      { icon: '🧪', title: 'Software Testing & QA' },
      { icon: '🔧', title: 'Maintenance & Support' },
    ],
  },
];

export const budgets = ['Under $500', '$500 – $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Not sure yet'];
export const timelines = ['As soon as possible', '1 – 3 months', '3 – 6 months', 'Just exploring'];
export const allServices = serviceCategories.flatMap((c) => c.services.map((s) => s.title));
