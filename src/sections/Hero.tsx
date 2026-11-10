import { ArrowRight, Shield, Clock, FileCheck } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import HeroImage from './HeroImage';

export default function Hero() {
  const { data: siteContent } = trpc.content.get.useQuery();

  return (
    <section
      className="relative overflow-hidden pb-8 md:pb-12 lg:pb-20"
      style={{ backgroundColor: '#FFF8ED' }}
    >
      <div className="container-brand pt-28 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-14 items-center">
          <div className="max-w-2xl lg:max-w-xl mx-auto lg:mx-0 w-full">
            <div className="stamp-mark mb-5 inline-flex items-center">
              <Shield size={12} />
              <span className="text-xs md:text-sm">Secure Document Support</span>
            </div>

            <h1
              className="brand-heading-xl mb-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: '#1A1A2E' }}
            >
              {siteContent?.heroHeadline || 'Organized with clarity'}
            </h1>

            <p
              className="brand-body mb-7 md:mb-8 max-w-lg text-base md:text-lg leading-relaxed"
              style={{ color: '#6E7480' }}
            >
              {siteContent?.heroSubtitle || 'Premium document preparation, formatting, and submission services. From paperwork to peace of mind — fast, confidential, and professional.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-9 md:mb-10">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="brand-green-btn justify-center md:justify-start text-xs md:text-sm px-5 md:px-6 py-3 md:py-4"
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
                className="brand-outline-btn justify-center md:justify-start text-xs md:text-sm px-5 md:px-6 py-3 md:py-4"
              >
                See How It Works
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 flex-wrap">
              {[
                { icon: FileCheck, text: 'Careful document handling' },
                { icon: Clock, text: 'Clear turnaround updates' },
                { icon: Shield, text: 'Confidential support' },
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

          <div className="relative min-w-0">
            <div
              className="relative h-[320px] sm:h-[400px] md:h-[480px] w-full overflow-hidden rounded-2xl bg-[#E8F0E9] shadow-2xl"
              style={{ boxShadow: '0 24px 64px rgba(26,26,46,0.12)' }}
            >
              <HeroImage />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14231D]/75 via-[#14231D]/20 to-transparent px-6 pb-6 pt-20">
                <p className="text-white text-sm md:text-base font-medium tracking-wide">
                  Professional support, handled with care.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden md:block h-20 w-20 rounded-2xl border border-[#6C8F5A]/20 bg-[#FFF8ED]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
