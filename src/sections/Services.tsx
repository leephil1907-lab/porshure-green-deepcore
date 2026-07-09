import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Merge, PenTool, Signature } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: FileText, title: 'Convert to PDF', desc: 'Instantly transform images, charts, and raw text into universally compatible, perfectly formatted PDF documents.', color: '#4AA882', bg: '#E8F5EF' },
  { icon: Merge, title: 'Merge Documents', desc: 'Combine multiple disjointed files into a single, cohesive master document with organized indexing and bookmarks.', color: '#3B8FD9', bg: '#E8F2FA' },
  { icon: PenTool, title: 'Editor Tools', desc: 'Clean up messy records. We annotate, format, redact, and adjust layouts so your final document is pristine and professional.', color: '#D4943A', bg: '#FDF3E4' },
  { icon: Signature, title: 'Digital Signature Setup', desc: 'We prepare your documents for secure, legally binding digital execution with proper signature fields and routing.', color: '#9B6DD1', bg: '#F2ECFA' },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, { opacity: 0, y: 40, stagger: 0.12, duration: 0.7, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="w-full bg-[#F8FAF9] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-[#4AA882] mb-4">Core Capabilities</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1A2E28] leading-[1.15] tracking-tight">Interactive Document Processing</h2>
          <p className="mt-4 text-[16px] font-light text-[#5A7A6E] max-w-[580px] mx-auto leading-relaxed">
            High-fidelity document operations that go beyond static files. We ensure your records are cleanly converted, merged, edited, and signed with absolute precision.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="group bg-white rounded-2xl p-8 border border-[rgba(26,46,40,0.06)] hover:shadow-xl hover:shadow-[rgba(74,168,130,0.1)] transition-all duration-500 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: service.bg }}>
                  <Icon size={26} color={service.color} strokeWidth={1.5} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#1A2E28] mb-2">{service.title}</h3>
                <p className="text-[14px] font-light text-[#5A7A6E] leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
