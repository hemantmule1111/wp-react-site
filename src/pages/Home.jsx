import { useSeo } from '../lib/seo.js';
import { pageSeo } from '../data/seo.js';
import Hero from '../components/Hero.jsx';
import StatsBand from '../components/StatsBand.jsx';
import Services from '../components/Services.jsx';
import WhyUs from '../components/WhyUs.jsx';
import ProcessTimeline from '../components/ProcessTimeline.jsx';
import TechMarquee from '../components/TechMarquee.jsx';
import Promo from '../components/Promo.jsx';
import LatestPosts from '../components/LatestPosts.jsx';
import YoutubeGallery from '../components/YoutubeGallery.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <Services limit={8} />
      <WhyUs />
      <ProcessTimeline />
      <TechMarquee />
      <Promo />
      <YoutubeGallery />
      <LatestPosts />
      <CtaBand />
    </>
  );
}
