import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileText, Merge, PenTool, Signature, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: FileText,
    title: 'Convert to PDF',
    desc: 'Transform any document format into clean, universally compatible PDFs. We handle scans, images, Word files, and more — delivering perfectly formatted outputs every time.',
    features: ['Multi-format input', 'OCR text extraction', 'Compressed output'],
    color: '#3DDC84',
    bg: 'rgba(61, 220, 132, 0.06)',
  },
  {
    icon: Merge,
    title: 'Merge Documents',
    desc: 'Combine multiple files into a single, organized master document. We add bookmarks, table of contents, and proper page numbering for seamless navigation.',
    features: ['Smart ordering', 'Auto bookmarks', 'Page numbering'],
    color: '#6C8F5A',
    bg: 'rgba(108, 143, 90, 0.06)',
  },
  {
    icon: PenTool,
    title: 'Editor Tools',
    desc: 'Clean up, format, and polish your documents. We redact sensitive info, adjust layouts, add annotations, and ensure every page meets professional standards.',
    features: ['Redaction', 'Layout formatting', 'Annotation cleanup'],
    color: '#1A1A2E',
    bg: 'rgba(26, 26, 46, 0.04)',
  },
  {
    icon: Signature,
    title: 'Digital Signature Setup',
    desc: 'Prepare documents for legally binding digital execution. We configure signature fields, routing workflows, and compliance-ready document packages.',
    features: ['Signature fields', 'Routing setup', 'Legal compliance'],
    color: '#3DDC84',
    bg: 'rgba(61, 220, 132, 0.06)',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.services-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.service-card', { opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.services-grid', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        {/* Section Header */}
        <div className="services-header text-center mb-16">
          <span className="brand-label mb-4 inline-block">What We Do</span>
          <h2 className="brand-heading-lg mb-4">Document Services, <span style={{ color: '#3DDC84' }}>Refined</span></h2>
          <p className="brand-body max-w-lg mx-auto">
            Four core capabilities designed to handle every aspect of your document workflow —
            from conversion to compliance-ready delivery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div key={service.title} className="service-card paper-card paper-tab-left group cursor-default">
              <div className="flex items-start justify-between mb-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                  style={{ background: service.bg, border: `1px solid ${service.color}20` }}>
                  <service.icon size={24} color={service.color} strokeWidth={1.5} />
                </div>
                <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: service.color }} />
              </div>

              <h3 className="brand-heading-md text-xl mb-3" style={{ fontSize: '1.375rem' }}>{service.title}</h3>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#6E7480' }}>{service.desc}</p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide"
                    style={{ background: service.bg, color: service.color === '#1A1A2E' ? '#6E7480' : service.color }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom image strip */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-lg relative">
          <img src="/images/paper-texture.jpg" alt="Premium paper layers" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED]/80 via-transparent to-[#FFF8ED]/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="brand-label mb-2 inline-block">Every Document Matters</span>
              <p className="text-[13px]" style={{ color: '#6E7480' }}>Precision handling for files of any complexity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
