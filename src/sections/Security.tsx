import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Timer, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Lock, title: 'Thoughtful handling', desc: 'We ask you to share only the files and information needed for the agreed document task.' },
  { icon: Timer, title: 'Clear expectations', desc: 'We confirm the expected turnaround and deliverables with you before work begins.' },
  { icon: ShieldCheck, title: 'Respect for privacy', desc: 'Your documents are treated with care. Contact us before sharing highly sensitive records so we can explain the handling process.' },
];

export default function Security() {
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
    <section id="security" ref={sectionRef} className="w-full py-24" style={{ background: 'linear-gradient(180deg, #0D1C16 0%, #122920 100%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(74,168,130,0.12)] border border-[rgba(74,168,130,0.2)] mb-5">
            <ShieldCheck size={12} color="#4AA882" />
            <span className="text-[11px] font-semibold uppercase tracking-[2px] text-[#4AA882]">Our approach</span>
          </span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-white leading-[1.15] tracking-tight">Careful Document Handling</h2>
          <p className="mt-4 text-[16px] font-light text-[#7A9A8E] max-w-[600px] mx-auto leading-relaxed">
            Your documents may contain personal or business information. We focus on clear communication, careful handling and requesting only the information needed for the agreed work.
          </p>
        </div>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] border border-[rgba(74,168,130,0.12)] hover:border-[rgba(74,168,130,0.3)] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-[rgba(74,168,130,0.12)] flex items-center justify-center mb-5">
                  <Icon size={22} color="#4AA882" strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-[13px] font-light text-[#7A9A8E] leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
