import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const labelRef = useRef<HTMLSpanElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.fromTo(labelRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 })
      .fromTo(line1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .fromTo(line2Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, 0.65)
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7 }, 0.9)
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.1);
    return () => { tl.kill(); };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', background: 'linear-gradient(145deg, #0D1C16 0%, #122920 40%, #0D1C16 100%)' }}>
      <HeroCarousel />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{
        height: '55%',
        background: 'linear-gradient(to top, rgba(13,28,22,0.97) 0%, rgba(13,28,22,0.75) 35%, transparent 100%)',
        zIndex: 0,
      }} />
      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end" style={{ padding: '0 0 100px clamp(24px, 6vw, 80px)', zIndex: 1 }}>
        <div className="max-w-2xl">
          <span ref={labelRef} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(74,168,130,0.15)] border border-[rgba(74,168,130,0.25)] mb-6 opacity-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4AA882] animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-[2.5px] text-[#4AA882]">Reduce processing time by 85%</span>
          </span>
          <h1 className="font-bold text-white" style={{ fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.05, letterSpacing: '-1.5px' }}>
            <span ref={line1Ref} className="block opacity-0">Professional document</span>
            <span ref={line2Ref} className="block opacity-0">processing <span className="text-[#4AA882]">instantly ready</span></span>
          </h1>
          <p ref={subtitleRef} className="mt-6 opacity-0 text-[16px] font-light leading-[1.7] text-[#9BABA4] max-w-[520px]">
            Secure, polished document support for people who need clean files, organized records, and a smoother paperwork process driven by intelligent routing.
          </p>
          <div ref={ctaRef} className="mt-8 flex items-center gap-5 opacity-0">
            <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-[1.5px] bg-[#4AA882] text-white hover:bg-[#3D8F6D] transition-all duration-300 shadow-lg shadow-[rgba(74,168,130,0.3)]">
              Start Uploading
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#security" onClick={(e) => { e.preventDefault(); document.querySelector('#security')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-[1.5px] border border-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300">
              See Features
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
