import { useEffect, useRef } from 'react';
import { trpc } from '@/providers/trpc';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileCheck, Clock, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const { data: siteContent } = trpc.content.get.useQuery();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.cta-content > *', { opacity: 0, y: 25, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #3DDC84 0%, #6C8F5A 100%)',
    }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full opacity-10" style={{ background: 'white' }} />
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full opacity-10" style={{ background: 'white' }} />

      <div className="container-brand relative z-10">
        <div className="cta-content text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <FileCheck size={13} color="white" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white">Ready When You Are</span>
          </span>

          <h2 className="text-white mb-5" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em' }}>
            Let's Get Your Documents <em>Sorted</em>
          </h2>

          <p className="text-[16px] font-light mb-10" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
            Upload your files today and experience the difference professional document handling makes.
            Fast turnaround, secure processing, and results you can trust.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-xl"
              style={{ background: '#1A1A2E', color: 'white' }}>
              Start Your Upload
              <ArrowRight size={15} />
            </a>
            <a href={siteContent?.whatsappPhone ? `https://wa.me/${siteContent.whatsappPhone.replace(/\D/g, "")}` : "#contact"} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-xl"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
              WhatsApp Us
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { icon: FileCheck, text: 'Free consultation' },
              { icon: Clock, text: 'Under 2 hour turnaround' },
              { icon: Shield, text: '100% confidential' },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-2 text-[12px] font-medium text-white/80">
                <item.icon size={13} /> {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
