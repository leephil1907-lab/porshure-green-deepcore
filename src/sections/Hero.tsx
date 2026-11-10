import { ArrowRight, Shield, Clock, FileCheck } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { Link } from 'react-router';
import HeroImage from './HeroImage';

export default function Hero() {
  const { data: siteContent } = trpc.content.get.useQuery();

  return (
    <section
      className="relative overflow-hidden pb-4 md:pb-6 lg:pb-8"
      style={{ backgroundColor: '#FFF9F0' }}
    >
      <div className="container-brand pt-24 md:pt-28 pb-8 md:pb-10 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 md:gap-9 lg:gap-11 items-center">
          <div className="max-w-2xl lg:max-w-xl mx-auto lg:mx-0 w-full">
            <div className="stamp-mark mb-5 inline-flex items-center">
              <Shield size={12} />
              <span className="text-xs md:text-sm">Secure Document Support</span>
            </div>

            <h1
              className="brand-heading-xl mb-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ color: '#1D3328' }}
            >
              {siteContent?.heroHeadline || 'Organized with clarity'}
            </h1>

            <p
              className="brand-body mb-7 md:mb-8 max-w-lg text-base md:text-lg leading-relaxed"
              style={{ color: '#66736A' }}
            >
              {siteContent?.heroSubtitle || 'Premium document preparation, formatting, and submission services. From paperwork to peace of mind — fast, confidential, and professional.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-7 md:mb-8">
              <Link to="/services" className="brand-green-btn justify-center md:justify-start text-xs md:text-sm px-5 md:px-6 py-3 md:py-4">Explore Services <ArrowRight size={16} /></Link>
              <Link to="/services#process" className="brand-outline-btn justify-center md:justify-start text-xs md:text-sm px-5 md:px-6 py-3 md:py-4">See How It Works</Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 flex-wrap">
              {[
                { icon: FileCheck, text: 'Careful document handling' },
                { icon: Clock, text: 'Clear turnaround updates' },
                { icon: Shield, text: 'Confidential support' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon size={14} style={{ color: '#66816E' }} strokeWidth={2.5} />
                  <span
                    className="text-xs md:text-[11px] font-medium leading-tight"
                    style={{ color: '#66736A', letterSpacing: '0.02em' }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <div
              className="relative h-[300px] sm:h-[360px] md:h-[430px] w-full overflow-hidden rounded-2xl bg-[#EAF1E8] shadow-2xl"
              style={{ boxShadow: '0 24px 64px rgba(29,51,40,0.12)' }}
            >
              <HeroImage />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14231D]/75 via-[#14231D]/20 to-transparent px-6 pb-6 pt-20">
                <p className="text-white text-sm md:text-base font-medium tracking-wide">
                  Professional support, handled with care.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden md:block h-20 w-20 rounded-2xl border border-[#66816E]/20 bg-[#FFF9F0]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
