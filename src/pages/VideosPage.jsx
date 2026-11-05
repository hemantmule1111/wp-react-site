import PageHeader from '../components/PageHeader.jsx';
import Videos from '../components/Videos.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function VideosPage() {
  return (
    <>
      <PageHeader title="Videos" subtitle="Tutorials on WordPress, ACF, Photoshop and Shopify." />
      <Videos />
      <CtaBand />
    </>
  );
}
