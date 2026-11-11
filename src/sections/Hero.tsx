import { ArrowRight, Shield, Clock, FileCheck, Mail, Phone, Star } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';
import { trpc } from '@/providers/trpc';
import { Link } from 'react-router';
import HeroCarousel from './HeroCarousel';

export default function Hero() {
  const { data: siteContent } = trpc.content.get.useQuery();

  // Contact details are editable from the admin dashboard — never hardcode them.
  const phone = siteContent?.contactPhone?.trim() || '+1 (814) 791-5478';
  const email = siteContent?.contactEmail?.trim() || 'porshuregreen@gmail.com';
  const whatsappDigits = siteContent?.whatsappPhone?.replace(/\D/g, '') || '18147915478';
  const whatsappMessage = encodeURIComponent("Hello Porshure Green, I'd like to ask about your document services.");
  return <section className="relative overflow-hidden bg-[#FFF9F0] pb-5 md:pb-8">
    <div className="container-brand pt-24 pb-7 md:pt-28 md:pb-10">
      <div className="grid min-w-0 grid-cols-1 items-center gap-7 md:gap-9 lg:grid-cols-2 lg:gap-11">
        <div className="hero-stagger mx-auto w-full min-w-0 max-w-2xl lg:mx-0 lg:max-w-xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#DCE6D8] bg-white px-3 py-1.5 shadow-sm">
              <span className="flex gap-1" aria-hidden="true">
                {[
                  { initials: 'LD', color: '#43845F' },
                  { initials: 'KP', color: '#D4943A' },
                  { initials: 'BR', color: '#9B6DD1' },
                ].map((person) => (
                  <span
                    key={person.initials}
                    className="flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold leading-none text-white ring-1 ring-white/70"
                    style={{ background: person.color }}
                  >
                    {person.initials}
                  </span>
                ))}
              </span>
              <span className="flex items-center gap-1 text-[11.5px] font-semibold text-[#3D5247]">
                <Star size={12} fill="#D4943A" stroke="#D4943A" />
                <Star size={12} fill="#D4943A" stroke="#D4943A" />
                <Star size={12} fill="#D4943A" stroke="#D4943A" />
                <Star size={12} fill="#D4943A" stroke="#D4943A" />
                <Star size={12} fill="#D4943A" stroke="#D4943A" />
                <span className="ml-1 text-[#52675A]">Loved by clients</span>
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EFF4EC] px-3 py-1.5 text-[11px] font-semibold text-[#3D6B4E]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#43845F] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#43845F]" />
              </span>
              Accepting new requests
            </span>
          </div>
          <h1 className="brand-heading-xl mb-5 text-[clamp(2.15rem,9vw,3rem)] md:text-5xl lg:text-6xl" style={{color:'#1D3328'}}>{siteContent?.heroHeadline || 'Professional Document Preparation, Formatting & Submission—Without the Stress.'}</h1>
          <p className="brand-body mb-7 max-w-lg text-base leading-relaxed md:mb-8 md:text-lg" style={{color:'#59695F'}}>{siteContent?.heroSubtitle || 'Porshure Green helps individuals, professionals, students, and businesses worldwide prepare polished, accurate, submission-ready documents with careful handling and dependable support.'}</p>
          <div className="mb-7 flex min-w-0 flex-col gap-3 sm:flex-row md:mb-8 md:gap-4">
            <Link to="/contact" className="brand-green-btn w-full justify-center px-5 py-3 text-xs sm:w-auto md:px-6 md:py-4 md:text-sm">Get a Free Quote <ArrowRight size={16}/></Link>
            <a href={`https://wa.me/${whatsappDigits}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className="brand-outline-btn w-full justify-center px-5 py-3 text-xs sm:w-auto md:px-6 md:py-4 md:text-sm"><WhatsAppIcon size={16}/> WhatsApp Us</a>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#E4E9E1] pt-5 text-sm text-[#52675A]">
            <a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:text-[#238A58]"><WhatsAppIcon size={17}/> WhatsApp</a>
            <a href={`mailto:${email}`} className="inline-flex items-center gap-2 font-semibold hover:text-[#238A58]"><Mail size={16}/> {email}</a>
            <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 font-semibold hover:text-[#238A58]"><Phone size={16}/> {phone}</a>
          </div>
          <div className="mt-5 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
            {[{icon:FileCheck,text:'Careful document handling'},{icon:Clock,text:'Clear turnaround updates'},{icon:Shield,text:'Confidential support'}].map(item=><div key={item.text} className="flex min-w-0 items-center gap-2"><item.icon size={15} className="shrink-0" style={{color:'#52745D'}} strokeWidth={2.5}/><span className="text-[13px] font-medium leading-snug text-[#59695F]">{item.text}</span></div>)}
          </div>
        </div>
        <div className="relative z-0 min-w-0 w-full">
          <HeroCarousel />
        </div>
      </div>
    </div>
  </section>;
}
