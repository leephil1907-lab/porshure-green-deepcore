import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Shield, Clock, FileCheck } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-label', { opacity: 0, y: 20, duration: 0.6 }, 0.2)
        .from('.hero-title', { opacity: 0, y: 40, duration: 0.9 }, 0.35)
        .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.7 }, 0.55)
        .from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6 }, 0.7)
        .from('.hero-trust', { opacity: 0, y: 15, duration: 0.5 }, 0.85)
        .from('.hero-image', { opacity: 0, scale: 0.95, x: 40, duration: 1 }, 0.4)
        .from('.hero-stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, 0.9);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden grid-bg" style={{ backgroundColor: '#FFF8ED' }}>
      {/* Decorative paper layers */}
      <div className="absolute top-20 right-[10%] w-32 h-40 bg-white rounded-lg shadow-lg opacity-40 rotate-6 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-32 right-[15%] w-28 h-36 bg-white rounded-lg shadow-md opacity-30 rotate-[-3deg] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-[8%] w-24 h-32 bg-white rounded-lg shadow-md opacity-25 rotate-[4deg] animate-float" style={{ animationDelay: '4s' }} />

      {/* Subtle grid accent lines */}
      <div className="absolute top-0 left-[45%] w-px h-full opacity-[0.04]" style={{ background: 'linear-gradient(to bottom, transparent, #1A1A2E, transparent)' }} />
      <div className="absolute top-[60%] left-0 w-full h-px opacity-[0.03]" style={{ background: 'linear-gradient(to right, transparent, #1A1A2E, transparent)' }} />

      <div className="container-brand pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="hero-label stamp-mark mb-6">
              <Shield size={12} />
              <span>Secure Document Support</span>
            </div>

            <h1 className="hero-title brand-heading-xl mb-6">
              Organized with{' '}
              <span className="relative inline-block">
                <span style={{ color: '#3DDC84' }}>clarity</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="#3DDC84" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/></svg>
              </span>
            </h1>

            <p className="hero-subtitle brand-body mb-8 max-w-md">
              Premium document preparation, formatting, and submission services.
              From paperwork to peace of mind — fast, confidential, and professional.
            </p>

            <div className="hero-buttons flex flex-wrap gap-4 mb-10">
              <a href="#services" onClick={(e) => { e.preventDefault(); document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="brand-green-btn">
                Explore Services
                <ArrowRight size={16} />
              </a>
              <a href="#process" onClick={(e) => { e.preventDefault(); document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="brand-outline-btn">
                See How It Works
              </a>
            </div>

            {/* Trust micro-bar */}
            <div className="hero-trust flex items-center gap-6 flex-wrap">
              {[
                { icon: FileCheck, text: '500+ Documents Processed' },
                { icon: Clock, text: 'Under 2 Hour Turnaround' },
                { icon: Shield, text: '100% Confidential' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon size={14} style={{ color: '#6C8F5A' }} strokeWidth={2} />
                  <span className="text-[11px] font-medium" style={{ color: '#6E7480', letterSpacing: '0.02em' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ boxShadow: '0 24px 64px rgba(26,26,46,0.12)' }}>
              <img src="/images/hero-main.jpg" alt="Organized documents on cream desk" className="w-full h-auto object-cover" />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF8ED]/20 to-transparent" />

              {/* Floating stats card */}
              <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                {[
                  { label: 'Accuracy', value: '99.9%' },
                  { label: 'Turnaround', value: '<2hrs' },
                  { label: 'Satisfaction', value: '5.0★' },
                ].map((stat) => (
                  <div key={stat.label} className="hero-stat flex-1 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg"
                    style={{ border: '1px solid rgba(26,26,46,0.06)' }}>
                    <div className="text-[18px] font-bold" style={{ color: '#1A1A2E', fontFamily: 'Playfair Display' }}>{stat.value}</div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#6E7480' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative seal */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
              style={{ background: 'linear-gradient(135deg, #3DDC84, #6C8F5A)', border: '3px solid #FFF8ED' }}>
              <div className="text-center">
                <div className="text-white font-bold text-[10px] leading-tight">PG</div>
                <div className="text-white/80 text-[6px] uppercase tracking-wider">Seal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
