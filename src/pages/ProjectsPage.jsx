import { useSeo } from '../lib/seo.js';
import { pageSeo } from '../data/seo.js';
import PageHeader from '../components/PageHeader.jsx';
import Projects from '../components/Projects.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function ProjectsPage() {
  useSeo({ ...pageSeo['/projects'], path: '/projects' });
  return (
    <>
      <PageHeader title="Projects" subtitle="How we deliver successful WordPress websites." />
      <Projects />
      <CtaBand />
    </>
  );
}
