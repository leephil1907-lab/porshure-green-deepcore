import { useReveal } from '@/hooks/useReveal';
import { Briefcase, GraduationCap, Home, Heart, Plane, FileCheck, Stethoscope } from 'lucide-react';

const categories = [
  {
    icon: Briefcase,
    title: 'Business & Corporate',
    color: '#43845F',
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
    color: '#66816E',
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
    color: '#D4943A',
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
    color: '#9B6DD1',
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
    color: '#3B8FD9',
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
    color: '#E74C3C',
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

  return (
    <section id="samples" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFF9F0' }}>
      <div className="container-brand">
        <div className="samples-header text-center mb-16 reveal">
          <span className="brand-label mb-4 inline-block">Document Library</span>
          <h2 className="brand-heading-lg mb-4">Every Document, <span style={{ color: '#43845F' }}>Handled</span></h2>
          <p className="brand-body max-w-xl mx-auto">
            We process hundreds of document types across six major categories.
            From business filings to personal records — if it is paperwork, we handle it.
          </p>
        </div>

        <div className="samples-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="sample-category paper-card !p-0 overflow-hidden group reveal">
              {/* Category Header */}
              <div className="p-6 pb-4" style={{ borderBottom: '1px solid rgba(29,51,40,0.06)' }}>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${cat.color}12` }}>
                    <cat.icon size={18} color={cat.color} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[16px] font-semibold" style={{ color: '#1D3328', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{cat.title}</h3>
                </div>
              </div>

              {/* Document List */}
              <div className="p-5 pt-4">
                {cat.docs.map((doc, i) => (
                  <div key={doc.name} className={`py-3 ${i < cat.docs.length - 1 ? 'border-b' : ''}`} style={{ borderColor: 'rgba(29,51,40,0.05)' }}>
                    <div className="flex items-start gap-2.5">
                      <FileCheck size={14} className="mt-0.5 flex-shrink-0" style={{ color: cat.color }} />
                      <div>
                        <div className="text-[13px] font-semibold mb-0.5" style={{ color: '#1D3328' }}>{doc.name}</div>
                        <div className="text-[11px] leading-relaxed" style={{ color: '#66736A' }}>{doc.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-14 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-8 py-5 px-8 rounded-xl" style={{ background: 'white', border: '1px solid rgba(29,51,40,0.06)' }}>
            {[
              { value: '50+', label: 'Document Types' },
              { value: '6', label: 'Categories' },
              { value: '500+', label: 'Files Processed' },
              { value: '99.9%', label: 'Accuracy Rate' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[22px] font-bold" style={{ color: '#1D3328', fontFamily: "'Manrope', sans-serif" }}>{stat.value}</div>
                <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#66736A' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
