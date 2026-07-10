
import { motion } from 'framer-motion';
import { Building2, Landmark, GraduationCap, HeartPulse, Plane, Home } from 'lucide-react';

const clients = [
  { name: 'Vertex Law Group', icon: Landmark, industry: 'Legal' },
  { name: 'Summit University', icon: GraduationCap, industry: 'Education' },
  { name: 'Aurora Health Systems', icon: HeartPulse, industry: 'Healthcare' },
  { name: 'Nimbus Realty', icon: Home, industry: 'Real Estate' },
  { name: 'Global Visa Services', icon: Plane, industry: 'Immigration' },
  { name: 'Pinnacle Financial', icon: Building2, industry: 'Finance' },
];

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
};

export default function TrustedBy() {
  return (
    <div className="w-full py-12" style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(26,26,46,0.06)' }}>
      <div className="container-brand">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-8 text-[11px] font-semibold uppercase tracking-[2.5px]"
          style={{ color: '#C9C9C9' }}
        >
          Trusted by professionals across industries
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {clients.map((client) => (
            <motion.div
              key={client.name}
              variants={item}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2.5 cursor-default group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(61,220,132,0.1)]"
                style={{ background: 'rgba(26,26,46,0.04)' }}>
                <client.icon size={15} className="transition-colors duration-300" style={{ color: '#C9C9C9' }}
                  strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-semibold transition-colors duration-300 group-hover:text-[#3DDC84]"
                  style={{ color: '#9BA1AD', letterSpacing: '-0.01em' }}>
                  {client.name}
                </span>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: '#C9C9C9' }}>{client.industry}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-10 pt-8"
          style={{ borderTop: '1px solid rgba(26,26,46,0.04)' }}
        >
          {[
            { value: '500+', label: 'Documents Processed' },
            { value: '50+', label: 'Document Types' },
            { value: '99.9%', label: 'Accuracy Rate' },
            { value: '<2hrs', label: 'Avg Turnaround' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-[20px] font-bold" style={{ color: '#1A1A2E', fontFamily: 'Playfair Display' }}>{stat.value}</span>
              <span className="block text-[9px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: '#C9C9C9' }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
