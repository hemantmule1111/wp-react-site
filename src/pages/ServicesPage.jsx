import PageHeader from '../components/PageHeader.jsx';
import Services from '../components/Services.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import TechMarquee from '../components/TechMarquee.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Services" subtitle="End-to-end software development, from websites and apps to AI, cloud and ongoing support." />
      <Services showFilter />
      <ProcessTimeline />
      <TechMarquee />
      <CtaBand />
    </>
  );
}
