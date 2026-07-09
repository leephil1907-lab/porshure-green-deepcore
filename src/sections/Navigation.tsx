import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Security', href: '#security' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

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
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
      isScrolled
        ? 'bg-[rgba(13,28,22,0.95)] backdrop-blur-xl border-b border-[rgba(74,168,130,0.15)]'
        : 'bg-transparent'
    }`}>
      <div className="max-w-[1280px] mx-auto h-16 flex items-center justify-between px-6">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center gap-2.5">
          <img src="/images/logo.png" alt="Porshure Green" className="w-8 h-8 object-contain" />
          <div className="flex flex-col">
            <span className="font-bold text-[15px] tracking-tight text-white leading-tight">Porshure Green</span>
            <span className="text-[9px] uppercase tracking-[3px] text-[#4AA882] leading-tight">Documents</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className="text-[13px] font-medium text-[#9BABA4] hover:text-[#4AA882] transition-colors duration-300 tracking-wide">
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <a href="/admin" className="text-[13px] font-medium text-[#FFD700] hover:text-[#FFE44D] transition-colors duration-300 tracking-wide">
              Dashboard
            </a>
          )}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[#9BABA4]">{user?.name}</span>
              <button onClick={logout} className="text-[12px] font-medium text-[#9BABA4] hover:text-white transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <a href="/login" className="px-5 py-2 rounded-full text-[12px] font-semibold uppercase tracking-[1px] bg-[#4AA882] text-white hover:bg-[#3D8F6D] transition-all duration-300">
              Upload
            </a>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setIsMobileOpen(!isMobileOpen)} aria-label="Toggle menu">
          {isMobileOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
      </div>

      {isMobileOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 py-6 px-6 flex flex-col gap-4 bg-[rgba(13,28,22,0.98)] backdrop-blur-xl border-b border-[rgba(74,168,130,0.15)]">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className="text-base font-medium text-[#9BABA4] hover:text-[#4AA882] py-2 transition-colors">
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <a href="/admin" className="text-base font-medium text-[#FFD700] py-2">Dashboard</a>
          )}
        </div>
      )}
    </nav>
  );
}
