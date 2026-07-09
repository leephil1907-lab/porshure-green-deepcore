import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const clients = ['Vertex Labs', 'Nimbus Corp', 'Aurora Health', 'Summit Finance', 'Greenfield Law', 'Pinnacle Edu'];

export default function TrustedBy() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-white py-10 border-b border-[rgba(26,46,40,0.06)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <p className="text-center mb-6 text-[11px] font-semibold uppercase tracking-[2.5px] text-[#8A9A94]">
          Trusted by leading companies worldwide
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
          {clients.map((client) => (
            <span key={client} className="text-[15px] font-semibold text-[#B8C9C1] hover:text-[#4AA882] transition-colors duration-300 cursor-default tracking-tight">
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
