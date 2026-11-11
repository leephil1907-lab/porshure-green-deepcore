import { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown, Workflow, FileStack, BadgeDollarSign, HelpCircle, Layers, LayoutGrid } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { trpc } from '@/providers/trpc';
import BrandLogo from './BrandLogo';

const serviceMenu = [
  { label: 'All services', detail: 'Everything we prepare and format', href: '/services#services', icon: Layers },
  { label: 'How it works', detail: 'Our four-step handling process', href: '/services#process', icon: Workflow },
  { label: 'Sample documents', detail: 'See finished deliverables by category', href: '/services#samples', icon: FileStack },
  { label: 'Pricing & quotes', detail: 'Clear quotes confirmed before we start', href: '/services#pricing', icon: BadgeDollarSign },
  { label: 'Common questions', detail: 'Turnaround, privacy and revisions', href: '/services#faq', icon: HelpCircle },
  { label: 'Full services page', detail: 'Open the complete overview', href: '/services', icon: LayoutGrid },
];

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services', hasMenu: true },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const location = useLocation();
  const { data: siteContent } = trpc.content.get.useQuery();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // close menus on navigation
  useEffect(() => {
    setIsMobileOpen(false);
    setIsServiceOpen(false);
    setMobileServiceOpen(false);
  }, [location.pathname, location.hash]);

  // close the desktop dropdown on Escape
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setIsServiceOpen(false); setIsMobileOpen(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const openServices = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setIsServiceOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = window.setTimeout(() => setIsServiceOpen(false), 140);
  };

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-all duration-300 ${
        isScrolled
          ? 'border-[#e8e9df] bg-[#FFF9F0]/95 shadow-[0_5px_24px_rgba(25,50,35,.06)] backdrop-blur-xl'
          : 'border-transparent bg-[#FFF9F0]/96'
      }`}
    >
      {siteContent?.announcement && (
        <div className="bg-[#173B2B] px-4 py-2 text-center text-[11px] font-medium tracking-wide text-[#D8E8D8]">
          {siteContent.announcement}
        </div>
      )}

      <div className="container-brand flex h-[76px] items-center justify-between">
        <BrandLogo />

        <nav aria-label="Main navigation" className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) =>
            link.hasMenu ? (
              <div key={link.href} className="relative" onMouseEnter={openServices} onMouseLeave={closeServices}>
                <Link
                  to={link.href}
                  aria-haspopup="true"
                  aria-expanded={isServiceOpen}
                  onFocus={openServices}
                  className={`inline-flex items-center gap-1 text-[14px] font-semibold transition-colors hover:text-[#43845F] ${
                    isActive(link.href) ? 'text-[#285B3C]' : 'text-[#657269]'
                  }`}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isServiceOpen ? 'rotate-180' : ''}`} />
                </Link>

                <AnimatePresence>
                  {isServiceOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute left-1/2 top-[calc(100%+14px)] w-[420px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[#e4e8de] bg-white p-2 shadow-[0_20px_50px_rgba(25,50,35,.14)]"
                    >
                      {serviceMenu.map((item) => (
                        <Link
                          key={item.label}
                          to={item.href}
                          onClick={() => setIsServiceOpen(false)}
                          className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-[#F4F7F1]"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EAF3EC] text-[#43845F]">
                            <item.icon size={16} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[13px] font-semibold text-[#1D3328]">{item.label}</span>
                            <span className="mt-0.5 block truncate text-[11.5px] text-[#6E7A70]">{item.detail}</span>
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`relative text-[14px] font-semibold transition-colors hover:text-[#43845F] ${
                  isActive(link.href) ? 'text-[#285B3C]' : 'text-[#657269]'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-[9px] left-0 right-0 h-[2px] rounded-full bg-[#43845F]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ),
          )}
        </nav>

        <Link
          to="/contact"
          className="group hidden min-h-11 items-center gap-2 rounded-full bg-[#244D36] px-5 text-[13px] font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#326648] hover:shadow-md md:inline-flex"
        >
          Get in touch
          <ArrowUpRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>

        <button
          type="button"
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe6dc] text-[#234331] transition-colors hover:bg-[#EFF4EC] md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMobileOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* scroll progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="h-[2px] origin-left bg-gradient-to-r from-[#43845F] via-[#2E6A48] to-[#43845F]"
      />

      <AnimatePresence>
        {isMobileOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="max-h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain border-t border-[#e8e9df] bg-[#FFF9F0] px-5 pb-6 pt-2 shadow-xl md:hidden"
          >
            {navLinks.map((link) =>
              link.hasMenu ? (
                <div key={link.href} className="border-b border-[#e9ece4]">
                  <button
                    type="button"
                    onClick={() => setMobileServiceOpen((open) => !open)}
                    aria-expanded={mobileServiceOpen}
                    className="flex w-full items-center justify-between py-4 text-[16px] font-medium text-[#294536]"
                  >
                    Services
                    <ChevronDown size={18} className={`transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {mobileServiceOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        {serviceMenu.map((item) => (
                          <Link key={item.label} to={item.href} className="flex items-center gap-2 pb-3 pl-1 text-[13.5px] text-[#4E6455]">
                            <item.icon size={14} className="text-[#43845F]" />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.href} to={link.href} className="block border-b border-[#e9ece4] py-4 text-[16px] font-medium text-[#294536]">
                  {link.label}
                </Link>
              ),
            )}
            <Link to="/contact" className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#244D36] text-sm font-semibold text-white">
              Get in touch <ArrowUpRight size={16} />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
