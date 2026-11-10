import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { trpc } from '@/providers/trpc';

const footerLinks = {
  Services: [{ label: 'Document Processing', href: '#services' }, { label: 'PDF Conversion', href: '#services' }, { label: 'Document Merging', href: '#services' }, { label: 'Digital Signatures', href: '#services' }],
  Explore: [{ label: 'About Us', href: '#about' }, { label: 'How It Works', href: '#process' }, { label: 'Reviews', href: '#reviews' }, { label: 'FAQs', href: '#faq' }],
  Information: [{ label: 'Security', href: '#security' }, { label: 'FAQs', href: '#faq' }, { label: 'Contact', href: '#contact' }],
};

export default function Footer() {
  const { data } = trpc.content.get.useQuery();
  const phone = data?.contactPhone?.trim() || '';
  const whatsapp = data?.whatsappPhone?.trim() || '';
  const email = data?.contactEmail || 'porshuregreen@gmail.com';
  const contacts = [
    ...(whatsapp ? [{ icon: MessageCircle, label: 'WhatsApp', value: whatsapp, href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`, color: '#25D366' }] : []),
    { icon: Mail, label: 'Email', value: email, href: `mailto:${email}`, color: '#3DDC84' },
    ...(phone ? [{ icon: Phone, label: 'Call', value: phone, href: `tel:${phone.replace(/[^+\d]/g, '')}`, color: '#3DDC84' }] : []),
  ];
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#14231D] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 15% 0%, rgba(61,220,132,.22), transparent 35%), radial-gradient(circle at 90% 80%, rgba(108,143,90,.2), transparent 32%)' }} />
      <div className="relative container-brand py-16 md:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="/" className="mb-5 inline-flex items-center gap-3"><img src="/images/logo.png" alt="" className="h-11 w-11 rounded-xl object-contain" /><span className="font-semibold tracking-tight">Porshure Green</span></a>
            <p className="mb-7 max-w-xs text-sm leading-7 text-white/60">{data?.footerDescription || 'Secure document support, organized with clarity. Professional preparation, formatting, and submission services you can trust.'}</p>
            <div className="flex flex-wrap gap-3">{contacts.map((contact) => <a key={contact.label} href={contact.href} target={contact.label === 'WhatsApp' ? '_blank' : undefined} rel="noreferrer" aria-label={contact.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#3DDC84]/60 hover:bg-[#3DDC84]/10"><contact.icon size={16} color={contact.color} /></a>)}</div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => <div key={heading}><h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-[#8FE4B4]">{heading}</h3><ul className="space-y-3">{links.map((link) => <li key={link.label}><a href={link.href} className="group inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white">{link.label}<ArrowUpRight size={12} className="opacity-0 transition group-hover:opacity-100" /></a></li>)}</ul></div>)}
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Porshure Green. All rights reserved.</span><span>Thoughtful document support. Delivered with care.</span></div>
      </div>
    </footer>
  );
}
