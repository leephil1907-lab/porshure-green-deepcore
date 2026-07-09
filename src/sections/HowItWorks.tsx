import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Upload, Cpu, ClipboardCheck, Send, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Upload Your Files',
    desc: 'Securely upload your documents via our encrypted portal. We accept all major formats — PDFs, images, Word docs, scans, and more. No file size limits.',
    details: ['Drag & drop interface', 'Bank-level encryption', 'All formats accepted'],
  },
  {
    number: '02',
    icon: Cpu,
    title: 'We Process & Review',
    desc: 'Our team examines every page, extracts data, validates content, and applies your specified formatting requirements. Quality checks at every stage.',
    details: ['Expert document review', 'Data validation', 'Format standardization'],
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'Quality Assurance',
    desc: 'Before delivery, each document undergoes a thorough QA check. We verify accuracy, completeness, and compliance with your requirements.',
    details: ['Double-check system', 'Compliance verification', 'Error correction'],
  },
  {
    number: '04',
    icon: Send,
    title: 'Delivered Securely',
    desc: 'Receive your finalized documents via secure download link. All originals are automatically purged from our servers after 14 days for your privacy.',
    details: ['Secure download link', 'Auto-deletion after 14 days', 'Delivery confirmation'],
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.process-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.process-step', { opacity: 0, x: -30, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-steps', start: 'top 80%' } });
      gsap.from('.process-image', { opacity: 0, x: 30, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-steps', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="section-padding grid-bg" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        <div className="process-header text-center mb-16">
          <span className="brand-label mb-4 inline-block">The Process</span>
          <h2 className="brand-heading-lg mb-4">Four Steps to <span style={{ color: '#3DDC84' }}>Completion</span></h2>
          <p className="brand-body max-w-md mx-auto">
            A streamlined workflow designed for speed, security, and precision.
            From upload to delivery, every step is transparent.
          </p>
        </div>

        <div className="process-steps grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Steps Column */}
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div key={step.number} className="process-step flex gap-5 group">
                {/* Number + Line */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ background: i % 2 === 0 ? 'rgba(61,220,132,0.1)' : 'rgba(108,143,90,0.1)', border: `1px solid ${i % 2 === 0 ? 'rgba(61,220,132,0.2)' : 'rgba(108,143,90,0.2)'}` }}>
                    <step.icon size={20} color={i % 2 === 0 ? '#3DDC84' : '#6C8F5A'} strokeWidth={1.5} />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-[2rem] my-2" style={{ background: 'linear-gradient(to bottom, rgba(61,220,132,0.2), transparent)' }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[11px] font-semibold" style={{ color: '#C9C9C9' }}>{step.number}</span>
                    <h3 className="brand-heading-md text-lg">{step.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed mb-3" style={{ color: '#6E7480' }}>{step.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.details.map((d) => (
                      <span key={d} className="flex items-center gap-1 text-[11px] font-medium" style={{ color: '#6C8F5A' }}>
                        <FileCheck size={10} /> {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image Column */}
          <div className="process-image sticky top-28">
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ boxShadow: '0 20px 60px rgba(26,26,46,0.1)' }}>
              <img src="/images/workflow-desk.jpg" alt="Document workflow" className="w-full h-auto object-cover" />
            </div>
            {/* Floating trust badge */}
            <div className="mt-6 paper-card !py-5 !px-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(61,220,132,0.1)' }}>
                <ClipboardCheck size={22} color="#3DDC84" />
              </div>
              <div>
                <div className="text-[14px] font-semibold" style={{ color: '#1A1A2E' }}>Quality Guaranteed</div>
                <div className="text-[12px]" style={{ color: '#6E7480' }}>Every document is double-checked before delivery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
