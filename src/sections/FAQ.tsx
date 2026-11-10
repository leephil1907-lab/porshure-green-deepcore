import { useEffect, useRef, useState } from 'react';
import { trpc } from '@/providers/trpc';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  { q: 'What types of documents can you help with?', a: 'We support a range of personal and business document tasks, including PDF conversion and merging, document formatting, proofreading and editing, CV and career documents, forms and application packs. If your request is unusual, contact us with the details so we can confirm whether it is within scope.' },
  { q: 'How long will my request take?', a: 'Timing depends on the document type, length, complexity and the information supplied. We confirm an estimated turnaround after reviewing your request; urgent timelines must be agreed before work begins.' },
  { q: 'How is my information handled?', a: 'We treat documents and personal information shared for a request with care, and ask you to provide only what is needed for the agreed work. Please do not send passwords, payment card details or unrelated sensitive information. Ask us about the handling process before sharing highly sensitive records.' },
  { q: 'How much do your services cost?', a: 'Pricing depends on the scope, document length, complexity and turnaround required. Send an enquiry for a quote before approving any work. We will confirm the agreed scope and price with you.' },
  { q: 'How do I send my documents?', a: 'Start by describing the task through the enquiry form, email or WhatsApp. We will explain the appropriate way to provide the files after reviewing what the work involves. Avoid sending sensitive documents in an initial message unless requested.' },
  { q: 'Can you submit documents on my behalf?', a: 'Submission support depends on the destination, process and permissions involved. We can help prepare and organize documents, but we do not claim to represent government agencies, schools, employers or other institutions. Any third-party submission step must be agreed in advance.' },
  { q: 'Can I request revisions?', a: 'Revision arrangements depend on the service and agreed scope. We will confirm what is included in your quote before work starts. If you notice an issue, contact us with the details.' },
  { q: 'What payment methods do you accept?', a: 'Available payment methods and payment instructions are confirmed directly when we provide your quote. Please do not send payment details in the website enquiry form.' },
];

export default function FAQ() {
  const { data: siteContent } = trpc.content.get.useQuery();
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.faq-item', { opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const whatsapp = (siteContent?.whatsappPhone || '').replace(/\\D/g, '') || '18147915478';
  return (
    <section id="faq" ref={sectionRef} className="section-padding grid-bg" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        <div className="faq-header text-center mb-14">
          <span className="brand-label mb-4 inline-block">Common Questions</span>
          <h2 className="brand-heading-lg mb-4">Frequently <span style={{ color: '#3DDC84' }}>Asked</span></h2>
          <p className="brand-body max-w-md mx-auto">Straightforward answers about our document preparation and support services.</p>
        </div>
        <div className="faq-list max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item mb-3">
              <button type="button" aria-expanded={openIndex === i} onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 rounded-xl text-left transition-all duration-300" style={{ background: openIndex === i ? 'white' : 'rgba(255,255,255,0.6)', border: `1px solid ${openIndex === i ? 'rgba(61,220,132,0.2)' : 'rgba(26,26,46,0.06)'}`, boxShadow: openIndex === i ? '0 2px 12px rgba(26,26,46,0.06)' : 'none' }}>
                <span className="flex items-center gap-3"><HelpCircle size={16} style={{ color: openIndex === i ? '#3DDC84' : '#C9C9C9', flexShrink: 0 }} /><span className="text-[14px] font-medium" style={{ color: '#1A1A2E', fontFamily: 'Inter' }}>{faq.q}</span></span>
                <ChevronDown size={16} className="flex-shrink-0 transition-transform duration-300" style={{ color: '#6E7480', transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}><div className="px-5 pb-5 pt-2 pl-12"><p className="text-[13px] leading-relaxed" style={{ color: '#6E7480' }}>{faq.a}</p></div></div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center"><div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-4 rounded-xl" style={{ background: 'white', border: '1px solid rgba(26,26,46,0.06)' }}><span className="text-[13px]" style={{ color: '#6E7480' }}>Still have questions?</span><a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-[13px] font-semibold transition-colors hover:underline" style={{ color: '#238A58' }}>Message us on WhatsApp</a></div></div>
      </div>
    </section>
  );
}
