import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Shield, Clock, FileCheck } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const { data: siteContent } = trpc.content.get.useQuery();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Enhanced staggered animations
      tl.from('.hero-label', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'back.out(1.5)',
      }, 0.1)
        .from('.hero-title', {
          opacity: 0,
          y: 50,
          duration: 1.2,
          ease: 'elastic.out(1, 0.8)',
        }, 0.2)
        .from('.hero-title-underline', {
          scaleX: 0,
          transformOrigin: 'left',
          duration: 0.8,
          ease: 'power4.out',
        }, 0.9)
        .from('.hero-subtitle', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.7)
        .from('.hero-buttons', {
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.95)
        .from('.hero-trust', {
          opacity: 0,
          y: 15,
          duration: 0.6,
          ease: 'power3.out',
        }, 1.1)
        .from('.hero-image', {
          opacity: 0,
          scale: 0.85,
          x: 60,
          duration: 1.1,
          ease: 'back.out(1.2)',
        }, 0.4)
        .from('.hero-stat', {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
        }, 0.95);

      // Continuous motion effects
      gsap.to('.hero-title', {
        y: -5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Decorative papers continuous animation
      gsap.to('.floating-paper', {
        y: -15,
        x: 5,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden grid-bg pb-8 md:pb-12 lg:pb-20"
      style={{ backgroundColor: '#FFF8ED' }}
    >
      {/* Enhanced Decorative paper layers with motion */}
      <div
        className="floating-paper absolute top-16 md:top-20 right-[5%] md:right-[10%] w-24 md:w-32 h-32 md:h-40 bg-white rounded-lg shadow-lg opacity-40 rotate-6 animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="floating-paper absolute top-24 md:top-32 right-[8%] md:right-[15%] w-20 md:w-28 h-28 md:h-36 bg-white rounded-lg shadow-md opacity-30 rotate-[-3deg] animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="floating-paper absolute bottom-32 md:bottom-40 left-[5%] md:left-[8%] w-16 md:w-24 h-24 md:h-32 bg-white rounded-lg shadow-md opacity-25 rotate-[4deg] animate-float"
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle animated grid accent lines */}
      <div
        className="absolute top-0 left-[45%] w-px h-full opacity-[0.04]"
        style={{ background: 'linear-gradient(to bottom, transparent, #1A1A2E, transparent)' }}
      />
      <div
        className="absolute top-[60%] left-0 w-full h-px opacity-[0.03]"
        style={{ background: 'linear-gradient(to right, transparent, #1A1A2E, transparent)' }}
      />

      {/* Main Content Container - Responsive Padding */}
      <div className="container-brand pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content Section */}
          <div className="max-w-2xl lg:max-w-xl mx-auto lg:mx-0 w-full">
            {/* Label with animation */}
            <div className="hero-label stamp-mark mb-4 md:mb-6 inline-block">
              <Shield size={12} />
              <span className="text-xs md:text-sm">Secure Document Support</span>
            </div>

            {/* Bold Animated Title */}
            <div className="relative mb-4 md:mb-6">
              <h1
                ref={titleRef}
                className="hero-title brand-heading-xl text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: '#1A1A2E', fontFamily: 'Cormorant Garamond' }}
              >
                {siteContent?.heroHeadline || 'Organized with clarity'}
              </h1>
            </div>

            {/* Subtitle - Responsive Typography */}
            <p
              className="hero-subtitle brand-body mb-6 md:mb-8 max-w-md text-base md:text-lg leading-relaxed"
              style={{ color: '#6E7480', fontFamily: 'Inter' }}
            >
              {siteContent?.heroSubtitle || 'Premium document preparation, formatting, and submission services. From paperwork to peace of mind — fast, confidential, and professional.'}
            </p>

            {/* CTA Buttons - Responsive Layout */}
            <div className="hero-buttons flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-10">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="brand-green-btn justify-center md:justify-start text-xs md:text-sm px-4 md:px-6 py-3 md:py-4 hover:shadow-xl transition-all duration-300 active:scale-95"
              >
                Explore Services
                <ArrowRight size={16} />
              </a>
              <a
                href="#process"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="brand-outline-btn justify-center md:justify-start text-xs md:text-sm px-4 md:px-6 py-3 md:py-4 hover:shadow-lg transition-all duration-300"
              >
                See How It Works
              </a>
            </div>

            {/* Trust Micro-bar - Mobile Optimized */}
            <div className="hero-trust flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 flex-wrap">
              {[
                { icon: FileCheck, text: '500+ Documents' },
                { icon: Clock, text: '<2 Hour Turnaround' },
                { icon: Shield, text: '100% Confidential' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon size={14} style={{ color: '#6C8F5A' }} strokeWidth={2.5} />
                  <span
                    className="text-xs md:text-[11px] font-medium leading-tight"
                    style={{ color: '#6E7480', letterSpacing: '0.02em' }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Section - Mobile Hidden, Desktop Visible */}
          <div className="hero-image relative hidden lg:block">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500"
              style={{ boxShadow: '0 24px 64px rgba(26,26,46,0.12)' }}
            >
              <div className="relative h-[340px] md:h-[430px] w-full overflow-hidden rounded-2xl bg-[#E8F0E9]"><HeroCarousel /></div>
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF8ED]/20 to-transparent" />

              {/* Floating stats card - Mobile optimized */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex gap-2 md:gap-3">
                {[
                  { label: 'Accuracy', value: '99.9%' },
                  { label: 'Turnaround', value: '<2hrs' },
                  { label: 'Satisfaction', value: '5.0★' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="hero-stat flex-1 bg-white/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-4 py-2 md:py-3 shadow-lg transition-all duration-300 hover:scale-105"
                    style={{ border: '1px solid rgba(26,26,46,0.06)' }}
                  >
                    <div
                      className="text-sm md:text-[18px] font-bold leading-tight"
                      style={{ color: '#1A1A2E', fontFamily: 'Playfair Display' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-[8px] md:text-[10px] font-semibold uppercase tracking-wider mt-1"
                      style={{ color: '#6E7480' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative seal - Mobile optimized */}
            <div
              className="absolute -top-2 md:-top-4 -right-2 md:-right-4 w-16 md:w-20 h-16 md:h-20 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110"
              style={{
                background: 'linear-gradient(135deg, #3DDC84, #6C8F5A)',
                border: '3px solid #FFF8ED',
              }}
            >
              <div className="text-center">
                <div className="text-white font-bold text-[9px] md:text-[10px] leading-tight">
                  PG
                </div>
                <div className="text-white/80 text-[5px] md:text-[6px] uppercase tracking-wider">
                  Seal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
