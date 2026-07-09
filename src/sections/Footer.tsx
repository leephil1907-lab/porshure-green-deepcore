import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  { title: 'Services', links: ['Document Processing', 'PDF Conversion', 'Document Merging', 'Digital Signatures', 'Editing & Formatting'] },
  { title: 'Company', links: ['About Us', 'Our Team', 'Careers', 'Blog', 'Contact'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'] },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const grid = footerRef.current?.querySelector('.footer-grid');
      if (grid?.children) gsap.from(Array.from(grid.children), { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer id="contact" ref={footerRef} className="w-full" style={{ background: 'linear-gradient(180deg, #0A1612 0%, #0D1C16 100%)' }}>
      <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-8">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <img src="/images/logo.png" alt="Porshure Green" className="w-9 h-9 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-[16px] text-white leading-tight">Porshure Green</span>
                <span className="text-[9px] uppercase tracking-[3px] text-[#4AA882] leading-tight">Documents</span>
              </div>
            </div>
            <p className="text-[14px] font-light text-[#6A8A7E] leading-relaxed mb-6 max-w-[280px]">
              Transforming documents, preserving nature. Professional document processing services you can trust.
            </p>
            <div className="flex flex-col gap-3">
              <a href="mailto:porshuregreen@gmail.com" className="inline-flex items-center gap-2.5 text-[13px] text-[#7A9A8E] hover:text-[#4AA882] transition-colors">
                <Mail size={15} color="#4AA882" />
                porshuregreen@gmail.com
              </a>
              <a href="tel:+14155345986" className="inline-flex items-center gap-2.5 text-[13px] text-[#7A9A8E] hover:text-[#4AA882] transition-colors">
                <Phone size={15} color="#4AA882" />
                +1 (415) 534-5986
              </a>
              <a href="https://wa.me/14155345986" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 text-[13px] text-[#7A9A8E] hover:text-[#25D366] transition-colors">
                <MessageCircle size={15} color="#25D366" />
                WhatsApp Business
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[1.5px] text-white mb-5">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] font-light text-[#6A8A7E] hover:text-[#4AA882] transition-colors duration-300">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-[12px] font-light text-[#4A6A5E]">2025 Porshure Green. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span className="text-[12px] font-light text-[#4A6A5E]">Made with</span>
            <span className="text-[#E74C3C]">♥</span>
            <span className="text-[12px] font-light text-[#4A6A5E]">for a paperless world</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
