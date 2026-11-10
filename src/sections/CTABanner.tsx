import { ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router';
import { trpc } from '@/providers/trpc';
import WhatsAppIcon from './WhatsAppIcon';

export default function CTABanner() {
  const { data } = trpc.content.get.useQuery();
  const whatsapp = data?.whatsappPhone?.trim() || data?.contactPhone?.trim() || '+1 (814) 791-5478';
  const digits = whatsapp.replace(/\\D/g, '') || '18147915478';
  return (
    <section className="bg-[#1B3B2A] py-12 md:py-14">
      <div className="container-brand grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
        <div className="max-w-2xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#A9D2B2]">Ready when you are</p>
          <h2 className="font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.05em] text-white md:text-4xl">Let's get your documents in order.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">Tell us what you need. We’ll help you choose the right service and make the next step clear.</p>
          <div className="mt-5 flex flex-wrap gap-5 text-[11px] font-medium text-white/65"><span className="inline-flex items-center gap-2"><ShieldCheck size={14}/> Careful handling</span><span className="inline-flex items-center gap-2"><Clock size={14}/> Clear turnaround</span></div>
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Link to="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#D7E9D8] px-6 text-sm font-bold text-[#1B3B2A] transition hover:-translate-y-0.5 hover:bg-white">Get in touch <ArrowRight size={16}/></Link>
          <a href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp chat" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white transition hover:bg-white/10"><WhatsAppIcon size={18}/> WhatsApp</a>
        </div>
      </div>
    </section>
  );
}