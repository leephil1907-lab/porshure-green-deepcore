import { useReveal } from '@/hooks/useReveal';
import { Upload, Cpu, ClipboardCheck, Send, FileCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Tell Us What You Need',
    desc: 'Describe the document task through the enquiry form, email or WhatsApp. We will explain how to share any files needed for the work.',
    details: ['Describe your request', 'Share relevant requirements', 'File instructions provided'],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'We Confirm the Scope',
    desc: 'We review the request, clarify the deliverables and confirm the expected turnaround and quote before work begins.',
    details: ['Request review', 'Agreed deliverables', 'Quote and timing'],
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'We Prepare Your Documents',
    desc: 'Once you approve the scope, we carry out the agreed formatting, conversion, editing or file-organization work.',
    details: ['Agreed document tasks', 'Careful formatting', 'Progress communication'],
  },
  {
    number: '04',
    icon: Send,
    title: 'Receive the Completed Work',
    desc: 'We return the prepared files using the delivery method agreed with you and clarify any included revision arrangements.',
    details: ['Files returned as agreed', 'Completion update', 'Revision terms clarified'],
  },
];

export default function HowItWorks() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="process" ref={sectionRef} className="section-padding grid-bg" style={{ backgroundColor: '#FFF9F0' }}>
      <div className="container-brand">
        <div className="process-header text-center mb-16 reveal">
          <span className="brand-label mb-4 inline-block">The Process</span>
          <h2 className="brand-heading-lg mb-4">Four Steps to <span style={{ color: '#43845F' }}>Completion</span></h2>
          <p className="brand-body max-w-md mx-auto">
            A straightforward process that keeps the scope, price and next steps clear before work begins.
          </p>
        </div>

        <div className="process-steps grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Steps Column */}
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="process-step flex gap-5 group reveal">
                {/* Number + Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: i % 2 === 0 ? 'rgba(67,132,95,0.1)' : 'rgba(102,129,110,0.1)', border: `1px solid ${i % 2 === 0 ? 'rgba(67,132,95,0.2)' : 'rgba(102,129,110,0.2)'}` }}>
                    <step.icon size={20} color={i % 2 === 0 ? '#43845F' : '#66816E'} strokeWidth={1.5} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-[2rem] my-2" style={{ background: 'linear-gradient(to bottom, rgba(67,132,95,0.2), transparent)' }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] font-semibold" style={{ color: '#C9D2C6' }}>{step.number}</span>
                    <h3 className="brand-heading-md text-lg">{step.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed mb-3" style={{ color: '#66736A' }}>{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((d) => (
                      <span key={d} className="flex items-center gap-1 text-[11px] font-medium" style={{ color: '#66816E' }}>
                        <FileCheck size={10} /> {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Column */}
          <div className="process-image sticky top-28 reveal">
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ boxShadow: '0 20px 60px rgba(29,51,40,0.1)' }}>
              <img src="/images/workflow-desk.jpg" alt="Document workflow" className="w-full h-auto object-cover" />
            </div>
            {/* Floating trust badge */}
            <div className="mt-6 paper-card !py-5 !px-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(67,132,95,0.1)' }}>
                <ClipboardCheck size={22} color="#43845F" />
              </div>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: '#1D3328' }}>Careful final review</div>
                <div className="text-[12px]" style={{ color: '#66736A' }}>We review the agreed deliverables before returning them</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
