import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { FileText, Shield, Clock, CheckCircle2, Briefcase, GraduationCap, Home, Heart, Plane, Stethoscope } from 'lucide-react';

const documents = [
  { icon: Briefcase, title: 'Articles of Incorporation', category: 'Business', color: '#3DDC84', rotation: -8, x: -120, y: -60, scale: 1 },
  { icon: GraduationCap, title: 'Academic Transcripts', category: 'Education', color: '#6C8F5A', rotation: 5, x: 140, y: -40, scale: 0.95 },
  { icon: Plane, title: 'Visa Application Packet', category: 'Immigration', color: '#3B8FD9', rotation: -4, x: -80, y: 80, scale: 1.05 },
  { icon: Home, title: 'Property Deed Transfer', category: 'Housing', color: '#D4943A', rotation: 10, x: 100, y: 60, scale: 0.9 },
  { icon: Stethoscope, title: 'Medical Records Request', category: 'Health', color: '#E74C3C', rotation: -6, x: 160, y: -90, scale: 1 },
  { icon: Heart, title: 'Power of Attorney', category: 'Family', color: '#9B6DD1', rotation: 3, x: -140, y: 30, scale: 0.92 },
  { icon: FileText, title: 'PDF Conversion Bundle', category: 'General', color: '#1A1A2E', rotation: 7, x: 60, y: 100, scale: 1.02 },
  { icon: Shield, title: 'Digital Signature Setup', category: 'Legal', color: '#3DDC84', rotation: -3, x: -60, y: -100, scale: 0.88 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 80,
    scale: 0.7,
    rotate: i % 2 === 0 ? -15 : 15,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: documents[i].rotation,
    transition: {
      type: 'spring' as const,
      stiffness: 80,
      damping: 14,
      delay: i * 0.06,
    },
  }),
};

export default function DocumentShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -60]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, 40]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, -30]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 5]);
  const rotate2 = useTransform(smoothProgress, [0, 1], [0, -4]);

  return (
    <section ref={containerRef} className="relative overflow-hidden" style={{ backgroundColor: '#FFF8ED', paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Floating decorative elements */}
      <motion.div style={{ y: y1, rotate: rotate1 }} className="absolute top-12 left-[8%] w-20 h-24 bg-white rounded-lg shadow-lg opacity-30 rotate-[-8deg]" />
      <motion.div style={{ y: y2, rotate: rotate2 }} className="absolute top-24 right-[10%] w-16 h-20 bg-white rounded-lg shadow-md opacity-25 rotate-[5deg]" />
      <motion.div style={{ y: y3 }} className="absolute bottom-20 left-[15%] w-14 h-18 bg-white rounded-lg shadow-sm opacity-20 rotate-[3deg]" />

      <div className="container-brand relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <span className="brand-label mb-4 inline-block">Document Gallery</span>
          <h2 className="brand-heading-lg mb-4">
            Documents We <span style={{ color: '#3DDC84' }}>Process</span>
          </h2>
          <p className="brand-body max-w-lg mx-auto">
            Examples of document categories and file-preparation tasks we may be able to support, subject to reviewing your request.
          </p>
        </motion.div>

        {/* Floating Document Cards */}
        <motion.div
          className="relative mx-auto"
          style={{ maxWidth: '900px', height: '500px' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {documents.map((doc, i) => (
            <motion.div
              key={doc.title}
              custom={i}
              variants={cardVariants}
              className="absolute cursor-pointer"
              style={{
                left: `calc(50% + ${doc.x}px)`,
                top: `calc(50% + ${doc.y}px)`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10 + i,
              }}
              whileHover={{
                scale: 1.15,
                rotate: 0,
                zIndex: 100,
                transition: { type: 'spring', stiffness: 300, damping: 20 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-44 rounded-xl p-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                style={{
                  background: 'white',
                  border: `1.5px solid ${doc.color}25`,
                  borderTop: `3px solid ${doc.color}`,
                  transform: `rotate(${doc.rotation}deg) scale(${doc.scale})`,
                }}
              >
                {/* Document icon */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${doc.color}12` }}>
                  <doc.icon size={18} color={doc.color} strokeWidth={1.5} />
                </div>

                {/* Category tag */}
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${doc.color}10`, color: doc.color }}>
                  {doc.category}
                </span>

                {/* Title */}
                <h4 className="text-[12px] font-semibold mt-2 leading-snug" style={{ color: '#1A1A2E', fontFamily: 'Inter' }}>
                  {doc.title}
                </h4>

                {/* Mini status bar */}
                <div className="flex items-center gap-1.5 mt-3">
                  <CheckCircle2 size={10} color="#3DDC84" />
                  <span className="text-[9px] font-medium" style={{ color: '#6C8F5A' }}>Ready to process</span>
                </div>

                {/* Paper shadow effect */}
                <div className="absolute -bottom-1 left-2 right-2 h-2 rounded-b-lg opacity-20" style={{ background: doc.color }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          {[
            { icon: FileText, label: 'Scope confirmed first', color: '#3DDC84' },
            { icon: Clock, label: 'Timeline agreed upfront', color: '#6C8F5A' },
            { icon: Shield, label: 'Careful document handling', color: '#3B8FD9' },
          ].map((item) => (
            <motion.div
              key={item.label}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl"
              style={{ background: 'white', border: '1px solid rgba(26,26,46,0.06)' }}
              whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(26,26,46,0.08)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <item.icon size={16} color={item.color} strokeWidth={1.5} />
              <span className="text-[12px] font-semibold" style={{ color: '#1A1A2E' }}>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
