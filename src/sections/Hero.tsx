import { ArrowRight, Shield, Clock, FileCheck } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import { Link } from 'react-router';
import HeroImage from './HeroImage';

export default function Hero() {
  const { data: siteContent } = trpc.content.get.useQuery();
  return <section className="relative overflow-hidden bg-[#FFF9F0] pb-5 md:pb-8">
    <div className="container-brand pt-24 pb-7 md:pt-28 md:pb-10">
      <div className="grid min-w-0 grid-cols-1 items-center gap-7 md:gap-9 lg:grid-cols-2 lg:gap-11">
        <div className="mx-auto w-full min-w-0 max-w-2xl lg:mx-0 lg:max-w-xl">
          <div className="stamp-mark mb-5 inline-flex items-center"><Shield size={12}/><span className="text-xs md:text-sm">Secure Document Support</span></div>
          <h1 className="brand-heading-xl mb-5 text-[clamp(2.15rem,9vw,3rem)] md:text-5xl lg:text-6xl" style={{color:'#1D3328'}}>{siteContent?.heroHeadline || 'Organized with clarity'}</h1>
          <p className="brand-body mb-7 max-w-lg text-base leading-relaxed md:mb-8 md:text-lg" style={{color:'#66736A'}}>{siteContent?.heroSubtitle || 'Premium document preparation, formatting, and submission services. From paperwork to peace of mind — fast, confidential, and professional.'}</p>
          <div className="mb-7 flex min-w-0 flex-col gap-3 sm:flex-row md:mb-8 md:gap-4">
            <Link to="/services" className="brand-green-btn w-full justify-center px-5 py-3 text-xs sm:w-auto md:px-6 md:py-4 md:text-sm">Explore Services <ArrowRight size={16}/></Link>
            <Link to="/services#process" className="brand-outline-btn w-full justify-center px-5 py-3 text-xs sm:w-auto md:px-6 md:py-4 md:text-sm">See How It Works</Link>
          </div>
          <div className="flex min-w-0 flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-3">
            {[{icon:FileCheck,text:'Careful document handling'},{icon:Clock,text:'Clear turnaround updates'},{icon:Shield,text:'Confidential support'}].map(item=><div key={item.text} className="flex min-w-0 items-center gap-2"><item.icon size={14} className="shrink-0" style={{color:'#66816E'}} strokeWidth={2.5}/><span className="text-xs font-medium leading-tight text-[#66736A]">{item.text}</span></div>)}
          </div>
        </div>
        <div className="relative min-w-0 w-full">
          <div className="relative h-[260px] w-full overflow-hidden rounded-2xl bg-[#EAF1E8] shadow-2xl sm:h-[340px] md:h-[430px]" style={{boxShadow:'0 24px 64px rgba(29,51,40,0.12)'}}><HeroImage/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14231D]/75 via-[#14231D]/20 to-transparent px-5 pb-5 pt-16 md:px-6 md:pb-6 md:pt-20"><p className="text-sm font-medium tracking-wide text-white md:text-base">Professional support, handled with care.</p></div></div>
          <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-2xl border border-[#66816E]/20 bg-[#FFF9F0] md:block" aria-hidden="true"/>
        </div>
      </div>
    </div>
  </section>;
}