import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 99.97, suffix: '%', label: 'Processing Accuracy', decimals: 2 },
  { value: 10, suffix: 'M+', label: 'Documents Monthly', decimals: 0 },
  { value: 500, suffix: '+', label: 'Happy Clients', decimals: 0 },
  { value: 2, suffix: 'min', label: 'Average Turnaround', decimals: 0, prefix: '< ' },
];

export default function Insights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (statsRef.current) {
        statsRef.current.querySelectorAll('.stat-item').forEach((item, i) => {
          const numberEl = item.querySelector('.stat-number');
          const stat = stats[i];
          if (!numberEl || !stat) return;
          const obj = { val: 0 };
          gsap.to(obj, { val: stat.value, duration: 1.8, delay: i * 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            onUpdate: () => {
              const formatted = stat.decimals === 2 ? obj.val.toFixed(2) : Math.round(obj.val).toString();
              numberEl.textContent = `${stat.prefix || ''}${formatted}${stat.suffix}`;
            },
          });
          gsap.from(item, { opacity: 0, y: 20, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          });
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="insights" ref={sectionRef} className="w-full bg-[#F8FAF9] py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div ref={headerRef} className="text-center mb-14">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-[#4AA882] mb-4">Insights</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1A2E28] leading-[1.15] tracking-tight">Data-Driven Intelligence</h2>
          <p className="mt-4 text-[16px] font-light text-[#5A7A6E] max-w-[580px] mx-auto leading-relaxed">
            Turn your document repository into a strategic asset. Our analytics platform surfaces patterns, identifies risks, and ensures compliance across your entire organization.
          </p>
        </div>
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center p-6 rounded-2xl bg-white border border-[rgba(26,46,40,0.06)]">
              <span className="stat-number block mb-2 font-mono text-[clamp(32px,4vw,48px)] font-medium text-[#4AA882] leading-tight">
                {stat.prefix || ''}0{stat.suffix}
              </span>
              <span className="text-[13px] font-medium text-[#5A7A6E]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
