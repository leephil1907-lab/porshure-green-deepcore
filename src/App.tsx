import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import ContactFloat from './sections/ContactFloat'

export default function App() {
  const { pathname } = useLocation();
  const showContactFloat = !pathname.startsWith('/admin') && !pathname.startsWith('/login');
  return (<>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    {showContactFloat && <ContactFloat />}
  </>)
}
