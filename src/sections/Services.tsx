import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FileText, Merge, PenTool, Signature, ArrowUpRight, Zap, Shield, Clock } from 'lucide-react';

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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardMotion = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80, damping: 14 } },
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.services-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        <div className="services-header text-center mb-16">
          <span className="brand-label mb-4 inline-block">What We Do</span>
          <h2 className="brand-heading-lg mb-4">Document Services, <span style={{ color: '#3DDC84' }}>Refined</span></h2>
          <p className="brand-body max-w-lg mx-auto">
            Four core capabilities designed to handle every aspect of your document workflow —
            from conversion to compliance-ready delivery.
          </p>
        </div>

        {/* Services Grid with Framer Motion */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardMotion}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="paper-card paper-tab-left group cursor-default"
            >
              <div className="flex items-start justify-between mb-5">
                <motion.div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ background: service.bg, border: `1px solid ${service.color}20` }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <service.icon size={24} color={service.color} strokeWidth={1.5} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -5 }}
                  whileHover={{ opacity: 1, x: 0 }}
                >
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: service.color }} />
                </motion.div>
              </div>

              <h3 className="brand-heading-md text-xl mb-3" style={{ fontSize: '1.375rem' }}>{service.title}</h3>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#6E7480' }}>{service.desc}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide"
                    style={{ background: service.bg, color: service.color === '#1A1A2E' ? '#6E7480' : service.color }}>
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-16 rounded-2xl overflow-hidden shadow-lg relative"
        >
          <img src="/images/paper-texture.jpg" alt="Premium paper layers" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF8ED]/80 via-transparent to-[#FFF8ED]/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="brand-label mb-2 inline-block">Every Document Matters</span>
              <p className="text-[13px]" style={{ color: '#6E7480' }}>Precision handling for files of any complexity</p>
            </div>
          </div>
        </motion.div>

        {/* Service highlights row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { icon: Zap, title: 'Lightning Fast', desc: 'Under 2-hour turnaround on most documents', color: '#3DDC84' },
            { icon: Shield, title: 'Bank-Level Security', desc: 'AES-256 encryption for all file transfers', color: '#6C8F5A' },
            { icon: Clock, title: 'Always Available', desc: '24/7 support via WhatsApp, Email & iMessage', color: '#3B8FD9' },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(26,26,46,0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(26,26,46,0.06)' }}
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}10` }}>
                <item.icon size={20} color={item.color} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: '#1A1A2E' }}>{item.title}</div>
                <div className="text-[11px]" style={{ color: '#6E7480' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
