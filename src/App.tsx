import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ContactFloat from './sections/ContactFloat';

/** Restores scroll position between routes and honours in-page anchors. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const id = hash.replace('#', '');
    if (!id) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    // The target may mount after the page transition finishes, so keep looking
    // for it on the next frames instead of silently scrolling to the top.
    let cancelled = false;
    let attempts = 0;
    const findAndScroll = () => {
      if (cancelled) return;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 90) window.requestAnimationFrame(findAndScroll);
    };
    window.requestAnimationFrame(findAndScroll);
    return () => { cancelled = true; };
  }, [pathname, hash]);

  return null;
}

const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] as const },
};

export default function App() {
  const location = useLocation();
  const showContactFloat = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/login');

  return (
    <>
      <ScrollManager />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={location.pathname} {...pageTransition}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {showContactFloat && <ContactFloat />}
    </>
  );
}
