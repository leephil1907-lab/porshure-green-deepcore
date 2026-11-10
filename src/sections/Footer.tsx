import { Mail, Phone, ArrowUpRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router';
import { trpc } from '@/providers/trpc';
import BrandLogo from './BrandLogo';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer() {
  const { data } = trpc.content.get.useQuery();
  const phone = data?.contactPhone?.trim() || '+1 (814) 791-5478';
  const rawWhatsapp = data?.whatsappPhone?.trim() || '';
  const whatsappDigits = rawWhatsapp.replace(/\D/g, '') || '18147915478';
  const email = data?.contactEmail?.trim() || 'porshuregreen@gmail.com';
  const contacts = [
    { label: 'WhatsApp', href: `https://wa.me/${whatsappDigits}`, icon: WhatsAppIcon, brand: true },
    { label: 'Email', href: `mailto:${email}`, icon: Mail },
    { label: 'Call', href: `tel:${phone.replace(/[^+\d]/g, '')}`, icon: Phone },
  ];
  return <footer className="relative overflow-hidden bg-[#142F23] text-white">
    <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full border border-white/[.06]" />
    <div className="pointer-events-none absolute -right-10 -top-14 h-52 w-52 rounded-full border border-white/[.06]" />
    <div className="container-brand relative grid gap-12 py-14 md:grid-cols-[1.35fr_.8fr_1fr] md:py-[68px]">
      <div className="max-w-sm">
        <div className="inline-flex rounded-2xl bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,.12)]"><BrandLogo inverse /></div>
        <p className="mt-6 text-sm leading-7 text-white/65">{data?.footerDescription || 'Thoughtful document preparation, formatting and support — with clarity at every step.'}</p>
        <div className="mt-6 flex items-center gap-2.5">{contacts.map(item=><a key={item.label} href={item.href} target={item.label==='WhatsApp'?'_blank':undefined} rel="noopener noreferrer" aria-label={item.label} title={item.label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[.06] text-[#D9EBDD] transition duration-200 hover:-translate-y-1 hover:border-[#9CCBA8] hover:bg-white/15">{item.brand?<item.icon size={18}/>:<item.icon size={18}/>}</a>)}</div>
      </div>
      <div><p className="mb-5 text-[10px] font-bold uppercase tracking-[.22em] text-[#A9D2B2]">Navigate</p><div className="space-y-3.5">{[['Home','/'],['Our services','/services'],['About Porshure Green','/about'],['Contact us','/contact']].map(([label,href])=><Link key={href} to={href} className="group flex w-fit items-center gap-2 text-sm text-white/65 transition hover:text-white">{label}<ArrowUpRight size={13} className="opacity-0 transition group-hover:opacity-100"/></Link>)}</div></div>
      <div className="rounded-2xl border border-white/10 bg-white/[.055] p-6"><p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#A9D2B2]">We’re here to help</p><h3 className="mt-3 font-[Manrope] text-xl font-bold leading-snug">Have a document task in mind?</h3><p className="mt-3 text-sm leading-6 text-white/60">Tell us what you need and we’ll help you understand the next step.</p><Link to="/contact" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#D9EBDD] px-5 text-xs font-bold text-[#173B2B] transition hover:bg-white">Get in touch <ArrowUpRight size={15}/></Link><div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs text-white/55"><p className="flex items-center gap-2"><Mail size={14}/> {email}</p><p className="flex items-center gap-2"><Clock3 size={14}/> Replies during business hours</p></div></div>
    </div>
    <div className="border-t border-white/10"><div className="container-brand flex flex-col gap-2 py-5 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Porshure Green. All rights reserved.</span><span>Professional document support, delivered with care.</span></div></div>
  </footer>;
}