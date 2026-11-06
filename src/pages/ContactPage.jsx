import { useSeo } from '../lib/seo.js';
import { pageSeo } from '../data/seo.js';
import PageHeader from '../components/PageHeader.jsx';
import Contact from '../components/Contact.jsx';

export default function ContactPage() {
  useSeo({ ...pageSeo['/contact'], path: '/contact' });
  return (
    <>
      <PageHeader title="Contact" subtitle="Tell us about your project and we'll get back to you." />
      <Contact />
    </>
  );
}
