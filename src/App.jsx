import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import WorkPilotPage from './pages/WorkPilotPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import YoutubePage from './pages/YoutubePage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import BlogList from './pages/BlogList.jsx';
import BlogPost from './pages/BlogPost.jsx';
import NotFound from './pages/NotFound.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!hash) return;
    // Jump to the element named in the URL (e.g. /contact#contact), waiting for the page to render it
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    let timer;
    const tick = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start' });
      else if (tries++ < 20) timer = setTimeout(tick, 50);
    };
    tick();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/workpilot" element={<WorkPilotPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/videos" element={<YoutubePage />} />
          <Route path="/youtube" element={<YoutubePage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
