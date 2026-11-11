import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useReveal } from '@/hooks/useReveal';
import AnimatedNumber from '@/components/AnimatedNumber';
import { Link } from 'react-router';
import {
  ArrowRight, ArrowUpRight, Briefcase, GraduationCap, Home, Heart, Plane, Stethoscope, X, Check,
} from 'lucide-react';

const categories = [
  {
    icon: Briefcase,
    title: 'Business & Corporate',
    photo: '/images/docs/business.jpg',
    color: '#43845F',
    variant: 'letter' as const,
    docs: [
      { name: 'Articles of Incorporation', desc: 'Business formation and LLC filing documents prepared and organized for state submission.' },
      { name: 'Operating Agreements', desc: 'Internal business structure documents with proper formatting and legal compliance.' },
      { name: 'Business Licenses & Permits', desc: 'Application packages assembled with all supporting documentation.' },
      { name: 'Annual Reports', desc: 'Year-end compliance documents formatted and ready for regulatory filing.' },
    ],
  },
  {
    icon: GraduationCap,
    title: 'Education & Academic',
    photo: '/images/docs/education.jpg',
    color: '#66816E',
    variant: 'form' as const,
    docs: [
      { name: 'Transcript Requests', desc: 'Official and unofficial transcript processing with proper institutional formatting.' },
      { name: 'Enrollment Documents', desc: 'Admissions packets, course registrations, and enrollment verification forms.' },
      { name: 'Financial Aid Forms', desc: 'FAFSA support documents, scholarship applications, and aid appeal letters.' },
      { name: 'Credential Evaluations', desc: 'International degree evaluation packages for academic and professional recognition.' },
    ],
  },
  {
    icon: Home,
    title: 'Housing & Property',
    photo: '/images/docs/housing.jpg',
    color: '#D4943A',
    variant: 'letter' as const,
    docs: [
      { name: 'Lease Agreements', desc: 'Rental contracts reviewed, annotated, and prepared with all required disclosures.' },
      { name: 'Mortgage Applications', desc: 'Loan document packages organized with income verification and credit support.' },
      { name: 'Property Deeds', desc: 'Title transfers, warranty deeds, and quitclaim documents processed accurately.' },
      { name: 'Housing Assistance', desc: 'Section 8, low-income housing, and emergency shelter application documents.' },
    ],
  },
  {
    icon: Heart,
    title: 'Family & Personal',
    photo: '/images/docs/family.jpg',
    color: '#9B6DD1',
    variant: 'certificate' as const,
    docs: [
      { name: 'Birth & Marriage Certificates', desc: 'Vital records requests, certified copies, and apostille preparation.' },
      { name: 'Power of Attorney', desc: 'POA documents drafted, formatted, and configured for proper legal execution.' },
      { name: 'Wills & Estate Planning', desc: 'Estate document organization, beneficiary forms, and trust paperwork.' },
      { name: 'Name Change Petitions', desc: 'Legal name change document packages prepared for court filing.' },
    ],
  },
  {
    icon: Plane,
    title: 'Immigration & Travel',
    photo: '/images/docs/travel.jpg',
    color: '#3B8FD9',
    variant: 'form' as const,
    docs: [
      { name: 'Visa Applications', desc: 'Tourist, work, and student visa document packages with supporting evidence.' },
      { name: 'Green Card Renewal', desc: 'Permanent resident card renewal forms and biometric appointment documents.' },
      { name: 'Citizenship Applications', desc: 'Naturalization form N-400 packages with required documentation.' },
      { name: 'Passport Services', desc: 'New passport, renewal, and expedited processing document preparation.' },
    ],
  },
  {
    icon: Stethoscope,
    title: 'Medical & Health',
    photo: '/images/docs/medical.jpg',
    color: '#E74C3C',
    variant: 'form' as const,
    docs: [
      { name: 'Medical Records Requests', desc: 'HIPAA-compliant medical record retrieval and organization.' },
      { name: 'Insurance Claims', desc: 'Health insurance claim forms with proper coding and documentation.' },
      { name: 'Disability Applications', desc: 'SSDI and SSI application packages with medical evidence compilation.' },
      { name: 'FMLA Paperwork', desc: 'Family and Medical Leave Act documentation for employer submission.' },
    ],
  },
];

export default function DocumentSamples() {
  const sectionRef = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);

  // Escape closes the preview, and the page behind it must not scroll.
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const current = active === null ? null : categories[active];

  return (
    <section id="samples" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFF9F0' }}>
      <div className="container-brand">
        <div className="samples-header text-center mb-12 reveal">
          <span className="brand-label mb-4 inline-block">Document Library</span>
          <h2 className="brand-heading-lg mb-4">Every Document, <span style={{ color: '#43845F' }}>Handled</span></h2>
          <p className="brand-body max-w-xl mx-auto">
            We process hundreds of document types across six major categories.
            Tap any category to preview a sample — if it is paperwork, we handle it.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {['Business filings', 'School paperwork', 'Housing packets', 'Travel documents', 'Medical records'].map((sticker, i) => (
              <span
                key={sticker}
                className="rounded-full border border-dashed border-[#CFDCC8] bg-white/70 px-3 py-1 text-[11.5px] font-semibold text-[#4C6156] transition-transform duration-200 hover:scale-105"
                style={{ transform: `rotate(${i % 2 === 0 ? -1.4 : 1.2}deg)` }}
              >
                {sticker}
              </span>
            ))}
          </div>
        </div>

        <div className="samples-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <button
              key={cat.title}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Preview ${cat.title} sample documents`}
              className="sample-category paper-card !p-0 overflow-hidden group reveal text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(29,51,40,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#43845F]"
              style={{ borderColor: `${cat.color}26` }}
            >
              <div className="flex items-stretch gap-4 p-5">
                {/* sample preview: lifts slightly on hover like a sheet of paper being picked up */}
                <div className="relative w-[92px] shrink-0">
                  <div className="relative overflow-hidden rounded-lg ring-1 ring-black/5 shadow-[0_10px_22px_rgba(29,51,40,0.16)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-2">
                    <img
                      src={cat.photo}
                      alt={`${cat.title} documents`}
                      className="h-[86px] w-full object-cover"
                      loading="lazy"
                      width={184}
                      height={172}
                    />
                    <span className="absolute inset-0 ring-1 ring-inset ring-white/25" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${cat.color}14` }}>
                      <cat.icon size={15} color={cat.color} strokeWidth={1.8} />
                    </span>
                    <h3 className="truncate text-[15px] font-semibold" style={{ color: '#1D3328' }}>{cat.title}</h3>
                  </div>
                  <p className="text-[11.5px] leading-relaxed" style={{ color: '#66736A' }}>
                    {cat.docs.length} document types, e.g. {cat.docs[0].name.toLowerCase()}
                  </p>
                  <span
                    className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[.12em]"
                    style={{ color: cat.color }}
                  >
                    View samples
                    <ArrowUpRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 border-t px-5 py-3" style={{ borderColor: 'rgba(29,51,40,0.06)' }}>
                {cat.docs.slice(0, 3).map((doc) => (
                  <span key={doc.name} className="inline-flex items-center gap-1 text-[11px]" style={{ color: '#66736A' }}>
                    <Check size={11} style={{ color: cat.color }} />
                    {doc.name}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-wrap items-center justify-center gap-8 rounded-xl px-7 py-5" style={{ background: 'white', border: '1px solid rgba(29,51,40,0.06)' }}>
            {[
              { value: 50, suffix: '+', label: 'Document Types' },
              { value: 6, suffix: '', label: 'Categories' },
              { value: 500, suffix: '+', label: 'Files Processed' },
              { value: 99.9, suffix: '%', decimals: 1, label: 'Accuracy Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedNumber
                  value={stat.value}
                  decimals={stat.decimals ?? 0}
                  suffix={stat.suffix}
                  className="block text-[22px] font-bold"
                />
                <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#66736A' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <Link to="/contact" className="brand-green-btn px-6 py-3 text-xs">
            Not sure where yours fits? Ask us <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Sample preview dialog */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[1200] flex items-end justify-center bg-[#0E1F18]/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${current.title} sample documents`}
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-[#FFFDF8] p-5 shadow-2xl sm:rounded-3xl sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em]" style={{ background: `${current.color}14`, color: current.color }}>
                    <current.icon size={12} /> {current.title}
                  </span>
                  <h3 className="mt-2 text-xl font-semibold" style={{ color: '#1D3328' }}>Sample document pack</h3>
                  <p className="mt-1 text-[13px]" style={{ color: '#66736A' }}>
                    What a finished {current.title.toLowerCase()} file looks like before it reaches you.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close sample preview"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#E2E7DE] text-[#66736A] transition hover:bg-[#F1F5EE]"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-[220px_1fr] sm:gap-7">
                <div className="space-y-3">
                  <img
                    src={current.photo}
                    alt={`${current.title} documents on a desk`}
                    className="h-[150px] w-full rounded-xl object-cover shadow-[0_14px_30px_rgba(29,51,40,0.18)] sm:h-[190px]"
                    loading="lazy"
                  />
                  <p className="text-center text-[11px] font-semibold uppercase tracking-[.14em]" style={{ color: current.color }}>
                    Sample pack
                  </p>
                </div>

                <ul className="space-y-3">
                  {current.docs.map((doc) => (
                    <li key={doc.name} className="flex gap-2.5">
                      <Check size={15} className="mt-0.5 shrink-0" style={{ color: current.color }} />
                      <div>
                        <p className="text-[13px] font-semibold" style={{ color: '#1D3328' }}>{doc.name}</p>
                        <p className="text-[12px] leading-relaxed" style={{ color: '#66736A' }}>{doc.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-[#E9EDE5] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-[#DDE4D8] px-5 py-2.5 text-xs font-semibold text-[#3D5247] transition hover:bg-[#F1F5EE]"
                >
                  Keep browsing
                </button>
                <Link
                  to="/contact"
                  onClick={() => setActive(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#244D36] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2E6A48]"
                >
                  Request this document <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
