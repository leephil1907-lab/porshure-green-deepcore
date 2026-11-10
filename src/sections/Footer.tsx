import { Mail, Phone, ArrowUpRight } from 'lucide-react';

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.1.55 4.15 1.6 5.96L.1 24l6.32-1.66a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.45-8.42ZM12.09 21.76a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.75.98 1-3.65-.24-.38a9.83 9.83 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.11 1.03 6.97 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.88-9.86 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>;
}
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
    ...(whatsapp ? [{ icon: WhatsAppIcon, label: 'WhatsApp', href: `https://wa.me/${whatsapp.replace(/\D/g, '')}`, color: '#25D366' }] : []),
    { icon: Mail, label: 'Email', href: `mailto:${email}`, color: '#3DDC84' },
    ...(phone ? [{ icon: Phone, label: 'Call', href: `tel:${phone.replace(/[^+\d]/g, '')}`, color: '#3DDC84' }] : []),
  ];
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#14231D] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: 'radial-gradient(circle at 15% 0%, rgba(61,220,132,.22), transparent 35%), radial-gradient(circle at 90% 80%, rgba(108,143,90,.2), transparent 32%)' }} />
      <div className="relative container-brand py-16 md:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="/" className="mb-5 inline-flex items-center gap-3"><img src="/images/logo.png" alt="" className="h-11 w-11 rounded-xl object-contain" /><span className="font-semibold tracking-tight">Porshure Green</span></a>
            <p className="mb-7 max-w-xs text-sm leading-7 text-white/60">{data?.footerDescription || 'Secure document support, organized with clarity. Professional preparation, formatting, and submission services you can trust.'}</p>
            <div className="flex flex-wrap gap-3">{contacts.map((contact) => <a key={contact.label} href={contact.href} target={contact.label === 'WhatsApp' ? '_blank' : undefined} rel="noreferrer" aria-label={contact.label} title={contact.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-[#3DDC84]/60 hover:bg-[#3DDC84]/10"><contact.icon size={16} color={contact.color} /></a>)}</div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => <div key={heading}><h3 className="mb-5 text-xs font-semibold uppercase tracking-[.18em] text-[#8FE4B4]">{heading}</h3><ul className="space-y-3">{links.map((link) => <li key={link.label}><a href={link.href} className="group inline-flex items-center gap-1 text-sm text-white/60 transition hover:text-white">{link.label}<ArrowUpRight size={12} className="opacity-0 transition group-hover:opacity-100" /></a></li>)}</ul></div>)}
        </div>
        <div className="flex flex-col gap-3 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Porshure Green. All rights reserved.</span><span>Thoughtful document support. Delivered with care.</span></div>
      </div>
    </footer>
  );
}
