import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: '01', title: 'Upload', desc: 'Securely upload your documents via our encrypted portal or email ingestion system.' },
  { number: '02', title: 'Process', desc: 'Our AI-powered engine extracts data, classifies content, and validates against your requirements.' },
  { number: '03', title: 'Review', desc: 'Receive your processed documents for review with tracked changes and quality assurance.' },
  { number: '04', title: 'Deliver', desc: 'Get your finalized documents delivered securely with digital signatures and compliance certification.' },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, { opacity: 0, y: 40, stagger: 0.15, duration: 0.7, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="w-full bg-[#F8FAF9] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-[#4AA882] mb-4">How It Works</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1A2E28] leading-[1.15] tracking-tight">Four Steps to Digital Freedom</h2>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="relative p-8 rounded-2xl bg-white border border-[rgba(26,46,40,0.06)] hover:shadow-lg hover:shadow-[rgba(74,168,130,0.08)] transition-all duration-500 group">
              <span className="block mb-4 font-mono text-[42px] font-medium text-[#4AA882] leading-none">{step.number}</span>
              <h3 className="text-[18px] font-semibold text-[#1A2E28] mb-2">{step.title}</h3>
              <p className="text-[13px] font-light text-[#5A7A6E] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
