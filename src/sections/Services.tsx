import { useReveal } from '@/hooks/useReveal';
import { motion } from 'framer-motion';
import { FileText, Merge, PenTool, Signature, ArrowUpRight, ClipboardCheck, MessageCircle, FolderCheck } from 'lucide-react';

const services = [
  {
    icon: FileText,
    title: 'Convert to PDF',
    desc: 'Convert supported Word files, images and scans into clean, easy-to-share PDFs. We confirm file requirements before starting.',
    features: ['PDF conversion', 'File review', 'Output checks'],
    color: '#43845F',
    bg: 'rgba(67,132,95, 0.06)',
  },
  {
    icon: Merge,
    title: 'Merge Documents',
    desc: 'Combine multiple files into one clearly ordered document, with page arrangement based on your instructions.',
    features: ['File arrangement', 'Page order', 'Combined PDF'],
    color: '#66816E',
    bg: 'rgba(102,129,110, 0.06)',
  },
  {
    icon: PenTool,
    title: 'Editor Tools',
    desc: 'Improve document layout, consistency and readability through formatting and agreed editing tasks.',
    features: ['Layout formatting', 'Text cleanup', 'Readability review'],
    color: '#1D3328',
    bg: 'rgba(29,51,40, 0.04)',
  },
  {
    icon: Signature,
    title: 'Digital Signature Setup',
    desc: 'Prepare signature-ready files and organize the documents needed for your chosen signing process. Legal validity and signing requirements depend on the platform and jurisdiction.',
    features: ['Signature-ready layout', 'Field placement', 'File organization'],
    color: '#43845F',
    bg: 'rgba(67,132,95, 0.06)',
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
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="services" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFF9F0' }}>
      <div className="container-brand">
        <div className="services-header text-center mb-16 reveal">
          <span className="brand-label mb-4 inline-block">What We Do</span>
          <h2 className="brand-heading-lg mb-4">Document Services, <span style={{ color: '#43845F' }}>Refined</span></h2>
          <p className="brand-body max-w-lg mx-auto">
            Practical document preparation and file organization for personal, professional and business needs.
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
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#66736A' }}>{service.desc}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((f) => (
                  <span key={f} className="px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide"
                    style={{ background: service.bg, color: service.color === '#1D3328' ? '#66736A' : service.color }}>
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
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFF9F0]/80 via-transparent to-[#FFF9F0]/80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="brand-label mb-2 inline-block">Every Document Matters</span>
              <p className="text-[13px]" style={{ color: '#66736A' }}>Precision handling for files of any complexity</p>
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
            { icon: ClipboardCheck, title: 'Clear scope', desc: 'We confirm the requested work before it begins', color: '#43845F' },
            { icon: FolderCheck, title: 'Organized delivery', desc: 'Files arranged to match the agreed requirements', color: '#66816E' },
            { icon: MessageCircle, title: 'Direct communication', desc: 'Updates through your agreed contact channel', color: '#3B8FD9' },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(29,51,40,0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(29,51,40,0.06)' }}
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}10` }}>
                <item.icon size={20} color={item.color} strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: '#1D3328' }}>{item.title}</div>
                <div className="text-[11px]" style={{ color: '#66736A' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
