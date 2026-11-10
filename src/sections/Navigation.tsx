import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { trpc } from '@/providers/trpc';
import BrandLogo from './BrandLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { data: siteContent } = trpc.content.get.useQuery();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMobileOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed inset-x-0 top-0 z-[1000] border-b transition-all duration-300 ${isScrolled ? 'border-[#e8e9df] bg-[#FFF9F0]/95 shadow-[0_5px_24px_rgba(25,50,35,.06)] backdrop-blur-xl' : 'border-transparent bg-[#FFF9F0]/96'}`}>
      {siteContent?.announcement && <div className="bg-[#173B2B] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-[#D8E8D8]">{siteContent.announcement}</div>}
      <div className="container-brand flex h-[76px] items-center justify-between">
        <BrandLogo />
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => <Link key={link.href} to={link.href} className={`text-[13px] font-semibold transition-colors hover:text-[#43845F] ${location.pathname === link.href ? 'text-[#285B3C]' : 'text-[#657269]'}`}>{link.label}</Link>)}
        </nav>
        <Link to="/contact" className="hidden min-h-11 items-center gap-2 rounded-full bg-[#244D36] px-5 text-[12px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#326648] md:inline-flex">Get in touch <ArrowUpRight size={15}/></Link>
        <button type="button" aria-label={isMobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileOpen} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6dc] text-[#234331] md:hidden" onClick={() => setIsMobileOpen(!isMobileOpen)}>{isMobileOpen ? <X size={20}/> : <Menu size={20}/>}</button>
      </div>
      {isMobileOpen && <nav aria-label="Mobile navigation" className="border-t border-[#e8e9df] bg-[#FFF9F0] px-5 pb-6 pt-3 shadow-xl md:hidden">
        {navLinks.map((link) => <Link key={link.href} to={link.href} className="block border-b border-[#e9ece4] py-4 text-[15px] font-medium text-[#294536]">{link.label}</Link>)}
        <Link to="/contact" className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#244D36] text-sm font-semibold text-white">Get in touch <ArrowUpRight size={16}/></Link>
      </nav>}
    </header>
  );
}
