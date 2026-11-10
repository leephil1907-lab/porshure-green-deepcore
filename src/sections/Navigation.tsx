import { useState, useEffect } from 'react';
import { Menu, X, LogOut, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'Samples', href: '#samples' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { data: siteContent } = trpc.content.get.useQuery();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    setIsMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      isScrolled
        ? 'bg-[#FFF8ED]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(26,26,46,0.06)]'
        : 'bg-transparent'
    }`}>
      {siteContent?.announcement && <div className="bg-[#14231D] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-[#A8EAC4]">{siteContent.announcement}</div>}
      <div className="container-brand h-18 flex items-center justify-between" style={{ height: '72px' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #3DDC84 0%, #6C8F5A 100%)' }}>
            <span className="text-white font-bold text-sm tracking-tight">PG</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] tracking-tight leading-tight" style={{ color: '#1A1A2E', fontFamily: 'Inter' }}>Porshure Green</span>
            <span className="text-[8px] uppercase tracking-[3px] leading-tight" style={{ color: '#6C8F5A', fontFamily: 'Inter', fontWeight: 500 }}>Documents</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13px] font-medium transition-colors duration-300 tracking-wide"
              style={{ color: '#6E7480', fontFamily: 'Inter' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#3DDC84')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6E7480')}>
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <a href="/admin" className="flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-300"
              style={{ color: '#1A1A2E' }}>
              <Shield size={14} style={{ color: '#3DDC84' }} />
              Dashboard
            </a>
          )}
          {isAuthenticated ? (
            <button onClick={logout} className="flex items-center gap-1.5 text-[12px] font-medium transition-colors" style={{ color: '#6E7480' }}>
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <a href="/login" className="brand-green-btn text-[11px] !py-2.5 !px-5">Admin</a>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X size={22} color="#1A1A2E" /> : <Menu size={22} color="#1A1A2E" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden absolute top-[72px] left-0 right-0 py-6 px-6 flex flex-col gap-1"
          style={{ background: 'rgba(255,248,237,0.98)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(26,26,46,0.06)' }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className="text-[15px] font-medium py-3 px-2 rounded-lg transition-colors" style={{ color: '#6E7480' }}>
              {link.label}
            </a>
          ))}
          {isAdmin && <a href="/admin" className="flex items-center gap-2 text-[15px] font-semibold py-3 px-2" style={{ color: '#1A1A2E' }}><LayoutDashboard size={16} /> Dashboard</a>}
        </div>
      )}
    </nav>
  );
}
