import { motion } from 'framer-motion';
import { FileText, Shield, Clock, CheckCircle2, Briefcase, GraduationCap, Home, Heart, Plane, Stethoscope } from 'lucide-react';

const documents = [
  { icon: Briefcase, title: 'Articles of Incorporation', category: 'Business', color: '#43845F' },
  { icon: GraduationCap, title: 'Academic Transcripts', category: 'Education', color: '#66816E' },
  { icon: Plane, title: 'Visa Application Packet', category: 'Immigration', color: '#3B8FD9' },
  { icon: Home, title: 'Property Deed Transfer', category: 'Housing', color: '#D4943A' },
  { icon: Stethoscope, title: 'Medical Records Request', category: 'Health', color: '#E74C3C' },
  { icon: Heart, title: 'Power of Attorney', category: 'Family', color: '#9B6DD1' },
  { icon: FileText, title: 'PDF Conversion Bundle', category: 'General', color: '#1D3328' },
  { icon: Shield, title: 'Digital Signature Setup', category: 'Legal', color: '#43845F' },
];

const highlights = [
  { icon: FileText, label: 'Scope confirmed first', color: '#43845F' },
  { icon: Clock, label: 'Timeline agreed upfront', color: '#66816E' },
  { icon: Shield, label: 'Careful document handling', color: '#3B8FD9' },
];

/**
 * Document gallery.
 *
 * Previously the cards were absolutely positioned at hand-tuned x/y offsets with
 * rotation and scale, which made them overlap so titles and category tags were
 * clipped, and left ~400px of dead space above the pile. They now sit in a plain
 * responsive grid: every title is readable at every breakpoint.
 */
export default function DocumentShowcase() {
  return (
    <section className="relative overflow-hidden section-padding" style={{ backgroundColor: '#FFF9F0' }}>
      <div className="absolute inset-0 grid-bg opacity-50" aria-hidden="true" />

      <div className="container-brand relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="brand-label mb-4 inline-block">Document Gallery</span>
          <h2 className="brand-heading-lg mb-4">
            Documents We <span style={{ color: '#43845F' }}>Process</span>
          </h2>
          <p className="brand-body max-w-lg mx-auto">
            Examples of document categories and file-preparation tasks we may be able to support, subject to reviewing your request.
          </p>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {documents.map((doc) => (
            <motion.li
              key={doc.title}
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
              }}
              whileHover={{ y: -4 }}
              className="rounded-xl p-4 transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(29,51,40,0.10)]"
              style={{ background: 'white', border: '1px solid rgba(29,51,40,0.06)', borderTop: `3px solid ${doc.color}` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${doc.color}12` }}>
                <doc.icon size={18} color={doc.color} strokeWidth={1.5} />
              </div>
              <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: `${doc.color}10`, color: doc.color }}>
                {doc.category}
              </span>
              <h3 className="mt-2 text-[13px] font-semibold leading-snug" style={{ color: '#1D3328' }}>{doc.title}</h3>
              <div className="mt-3 flex items-center gap-1.5">
                <CheckCircle2 size={11} color="#43845F" />
                <span className="text-[10px] font-medium" style={{ color: '#66816E' }}>Ready to process</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {highlights.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(29,51,40,0.06)' }}
            >
              <item.icon size={16} color={item.color} strokeWidth={1.5} />
              <span className="text-[12px] font-semibold" style={{ color: '#1D3328' }}>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
