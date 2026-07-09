import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'What types of documents do you process?',
    a: 'We handle virtually all document types — PDFs, Word documents, scanned images, spreadsheets, presentations, and more. Whether you need conversion, merging, editing, or digital signature setup, we can work with your files.',
  },
  {
    q: 'How long does document processing take?',
    a: 'Most standard jobs are completed within 2 hours. Complex projects involving multiple files, extensive formatting, or digital signature workflows may take up to 24 hours. We always provide an estimated timeline when you submit.',
  },
  {
    q: 'Is my information kept confidential?',
    a: 'Absolutely. We use bank-level AES-256 encryption for all files, both in transit and at rest. Once your service is complete, all originals and working files are permanently deleted from our servers within 14 days. We never share or sell your data.',
  },
  {
    q: 'What is your pricing structure?',
    a: 'Pricing depends on the complexity and volume of your documents. Simple PDF conversions start affordably, while comprehensive document packages with editing, merging, and signature setup are priced based on scope. Contact us for a custom quote.',
  },
  {
    q: 'How do I submit my documents securely?',
    a: 'Upload your files through our encrypted portal or send them via our secure email. All uploads use TLS 1.3 encryption. For highly sensitive documents, we can arrange additional security measures upon request.',
  },
  {
    q: 'Do you offer rush or same-day service?',
    a: 'Yes. Rush processing is available for urgent requests. Select the expedited option when submitting, and we will prioritize your documents. Rush fees may apply depending on the complexity of the work.',
  },
  {
    q: 'Can you handle bulk document processing?',
    a: 'Yes, we specialize in bulk processing for businesses and organizations. Whether you need hundreds of files converted, merged, or organized, our team can handle large volumes efficiently with consistent quality.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, Cash App, Zelle, and Venmo. Payment is processed securely through encrypted channels. Invoices are available for business clients.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.faq-item', { opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="section-padding grid-bg" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        <div className="faq-header text-center mb-14">
          <span className="brand-label mb-4 inline-block">Common Questions</span>
          <h2 className="brand-heading-lg mb-4">Frequently <span style={{ color: '#3DDC84' }}>Asked</span></h2>
          <p className="brand-body max-w-md mx-auto">
            Everything you need to know about our document processing services.
          </p>
        </div>

        <div className="faq-list max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item mb-3">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left transition-all duration-300"
                style={{
                  background: openIndex === i ? 'white' : 'rgba(255,255,255,0.6)',
                  border: `1px solid ${openIndex === i ? 'rgba(61,220,132,0.2)' : 'rgba(26,26,46,0.06)'}`,
                  boxShadow: openIndex === i ? '0 2px 12px rgba(26,26,46,0.06)' : 'none',
                }}>
                <div className="flex items-center gap-3">
                  <HelpCircle size={16} style={{ color: openIndex === i ? '#3DDC84' : '#C9C9C9', flexShrink: 0 }} />
                  <span className="text-[14px] font-medium" style={{ color: '#1A1A2E', fontFamily: 'Inter' }}>{faq.q}</span>
                </div>
                <ChevronDown size={16} className="flex-shrink-0 transition-transform duration-300"
                  style={{ color: '#6E7480', transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <div className={`overflow-hidden transition-all duration-400 ${openIndex === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-5 pb-5 pt-2 pl-12">
                  <p className="text-[13px] leading-relaxed" style={{ color: '#6E7480' }}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
            style={{ background: 'white', border: '1px solid rgba(26,26,46,0.06)' }}>
            <span className="text-[13px]" style={{ color: '#6E7480' }}>Still have questions?</span>
            <a href="https://wa.me/14155345986" target="_blank" rel="noopener noreferrer"
              className="text-[13px] font-semibold transition-colors hover:underline" style={{ color: '#3DDC84' }}>
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
