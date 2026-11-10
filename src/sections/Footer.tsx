import { Mail, Phone, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router';
import { trpc } from '@/providers/trpc';
import BrandLogo from './BrandLogo';

export default function Footer() {
  const { data } = trpc.content.get.useQuery();
  const phone = data?.contactPhone?.trim() || '+1 (814) 791-5478';
  const whatsapp = data?.whatsappPhone?.trim() || '+1 (814) 791-5478';
  const email = data?.contactEmail?.trim() || 'porshuregreen@gmail.com';
  const contacts = [
    { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/${whatsapp.replace(/\\D/g, '')}`, color: '#31C879' },
    { label: 'Email', icon: Mail, href: `mailto:${email}`, color: '#B9DCC2' },
    { label: 'Call', icon: Phone, href: `tel:${phone.replace(/[^+\\d]/g, '')}`, color: '#B9DCC2' },
  ];
  return (
    <footer className="bg-[#142F23] text-white">
      <div className="container-brand grid gap-12 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:py-16">
        <div className="max-w-sm">
          <div className="inline-flex rounded-xl bg-white p-2"><BrandLogo inverse /></div>
          <p className="mt-5 max-w-xs text-sm leading-7 text-white/65">{data?.footerDescription || 'Careful document preparation, formatting and support — with clarity at every step.'}</p>
          <div className="mt-6 flex gap-2.5">{contacts.map((item) => <a key={item.label} href={item.href} target={item.label === 'WhatsApp' ? '_blank' : undefined} rel="noreferrer" aria-label={item.label} title={item.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:bg-white/10"><item.icon size={17} color={item.color}/></a>)}</div>
        </div>
        <div><h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[.2em] text-[#A9D2B2]">Explore</h3><div className="space-y-3">{[['Home','/'],['Services','/services'],['About us','/about'],['Contact','/contact']].map(([label,href])=><Link key={href} to={href} className="block text-sm text-white/65 transition hover:text-white">{label}</Link>)}</div></div>
        <div><h3 className="mb-5 text-[11px] font-semibold uppercase tracking-[.2em] text-[#A9D2B2]">Start a conversation</h3><p className="max-w-xs text-sm leading-6 text-white/65">Have a document task in mind? Tell us what you need and we’ll help you find the right next step.</p><Link to="/contact" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#D1E6D5] hover:text-white">Contact our team <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="border-t border-white/10"><div className="container-brand flex flex-col gap-2 py-5 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Porshure Green. All rights reserved.</span><span>Thoughtful document support. Delivered with care.</span></div></div>
    </footer>
  );
}
