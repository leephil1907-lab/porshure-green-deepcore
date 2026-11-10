import { useEffect, useRef } from 'react';
import { trpc } from '@/providers/trpc';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileCheck, Clock, Shield } from 'lucide-react';

function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.1.55 4.15 1.6 5.96L.1 24l6.32-1.66a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.45-8.42ZM12.09 21.76a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.75.98 1-3.65-.24-.38a9.83 9.83 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.11 1.03 6.97 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.88-9.86 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>;
}

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
              aria-label="Open Porshure Green on WhatsApp" title="WhatsApp"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-xl"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <WhatsAppIcon size={22} />
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
