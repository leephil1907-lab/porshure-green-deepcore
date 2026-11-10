import { ArrowRight, Shield, Clock, FileCheck, Mail, Phone } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
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
          <h1 className="brand-heading-xl mb-5 text-[clamp(2.15rem,9vw,3rem)] md:text-5xl lg:text-6xl" style={{color:'#1D3328'}}>{siteContent?.heroHeadline || 'Professional Document Preparation, Formatting & Submission—Without the Stress.'}</h1>
          <p className="brand-body mb-7 max-w-lg text-base leading-relaxed md:mb-8 md:text-lg" style={{color:'#59695F'}}>{siteContent?.heroSubtitle || 'Porshure Green helps individuals, professionals, students, and businesses worldwide prepare polished, accurate, submission-ready documents with careful handling and dependable support.'}</p>
          <div className="mb-7 flex min-w-0 flex-col gap-3 sm:flex-row md:mb-8 md:gap-4">
            <Link to="/contact" className="brand-green-btn w-full justify-center px-5 py-3 text-xs sm:w-auto md:px-6 md:py-4 md:text-sm">Get a Free Quote <ArrowRight size={16}/></Link>
            <a href="https://wa.me/18147915478?text=Hello%20Porshure%20Green%2C%20I%27d%20like%20to%20ask%20about%20your%20document%20services." target="_blank" rel="noopener noreferrer" className="brand-outline-btn w-full justify-center px-5 py-3 text-xs sm:w-auto md:px-6 md:py-4 md:text-sm"><WhatsAppIcon size={16}/> WhatsApp Us</a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#E4E9E1] pt-5 text-sm text-[#52675A]">
            <a href="https://wa.me/18147915478" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-[#238A58]"><WhatsAppIcon size={17}/> WhatsApp</a>
            <a href="mailto:porshuregreen@gmail.com" className="inline-flex items-center gap-2 font-semibold hover:text-[#238A58]"><Mail size={16}/> porshuregreen@gmail.com</a>
            <a href="tel:+18147915478" className="inline-flex items-center gap-2 font-semibold hover:text-[#238A58]"><Phone size={16}/> +1 (814) 791-5478</a>
          </div>
          <div className="mt-5 flex min-w-0 flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center sm:gap-x-5 sm:gap-y-3">
            {[{icon:FileCheck,text:'Careful document handling'},{icon:Clock,text:'Clear turnaround updates'},{icon:Shield,text:'Confidential support'}].map(item=><div key={item.text} className="flex min-w-0 items-center gap-2"><item.icon size={15} className="shrink-0" style={{color:'#52745D'}} strokeWidth={2.5}/><span className="text-sm font-medium leading-snug text-[#59695F]">{item.text}</span></div>)}
          </div>
        </div>
        <div className="relative z-0 min-w-0 w-full">
          <div className="relative isolate h-[260px] w-full overflow-hidden rounded-2xl bg-[#EAF1E8] shadow-2xl sm:h-[340px] md:h-[430px]" style={{boxShadow:'0 24px 64px rgba(29,51,40,0.12)'}}>
            <HeroImage className="relative z-0 block"/>
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#14231D]/90 via-[#14231D]/35 to-transparent px-5 pb-5 pt-20 md:px-6 md:pb-6 md:pt-24">
              <p className="max-w-full text-[15px] font-medium leading-snug tracking-wide text-white md:text-base">Professional support, handled with care.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
