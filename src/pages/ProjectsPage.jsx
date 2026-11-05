import PageHeader from '../components/PageHeader.jsx';
import Projects from '../components/Projects.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" subtitle="How we deliver successful WordPress websites." />
      <Projects />
      <CtaBand />
    </>
  );
}
