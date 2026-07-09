import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Shield, Clock, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: Leaf, label: 'Carbon Neutral Certified' },
  { icon: Shield, label: 'SOC 2 Type II' },
  { icon: Clock, label: '24/7 Support' },
  { icon: Users, label: '120+ Experts' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, { opacity: 0, x: -50, scale: 0.95, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (textRef.current) {
        gsap.from(textRef.current.children, { opacity: 0, x: 30, stagger: 0.1, duration: 0.6, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={imageRef}>
          <div className="relative rounded-3xl overflow-hidden">
            <img src="/images/31583.jpg" alt="Porshure Green Platform" className="w-full h-auto rounded-3xl object-cover shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,28,22,0.6)] to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-3">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <span key={h.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)]">
                      <Icon size={12} color="#4AA882" />
                      <span className="text-[11px] font-medium text-white">{h.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div ref={textRef}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-[#4AA882] mb-4">About Us</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1A2E28] leading-[1.15] tracking-tight mb-6">
            Rooted in Innovation,<br />Committed to Sustainability
          </h2>
          <p className="text-[16px] font-light text-[#5A7A6E] leading-[1.7] mb-5">
            Founded in 2018, Porshure Green was born from a simple belief: document management shouldn't cost the earth. We've helped over 500 organizations eliminate paper waste, reduce storage costs by 70%, and reclaim thousands of hours previously lost to manual document handling.
          </p>
          <p className="text-[16px] font-light text-[#5A7A6E] leading-[1.7] mb-8">
            Our team of 120+ experts combines deep expertise in document management, AI/ML, information security, and environmental sustainability. We're proud to be carbon-neutral certified and maintain SOC 2 Type II compliance.
          </p>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-[1.5px] border-2 border-[#4AA882] text-[#4AA882] hover:bg-[#4AA882] hover:text-white transition-all duration-300">
            Meet Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
