import { useState, useEffect } from 'react';
import { Mail, Phone, X } from 'lucide-react';

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.1.55 4.15 1.6 5.96L.1 24l6.32-1.66a11.9 11.9 0 0 0 5.66 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.45-8.42ZM12.09 21.76a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.75.98 1-3.65-.24-.38a9.83 9.83 0 0 1-1.51-5.25c0-5.44 4.43-9.87 9.88-9.87 2.63 0 5.11 1.03 6.97 2.89a9.8 9.8 0 0 1 2.89 6.98c0 5.44-4.43 9.88-9.86 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>;
}
import { trpc } from '@/providers/trpc';

export default function ContactFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { data } = trpc.content.get.useQuery();
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const phone = data?.contactPhone?.trim() || '';
  const whatsapp = data?.whatsappPhone?.trim() || '';
  const contacts = [
    ...(whatsapp ? [{ id: 'whatsapp', icon: WhatsAppIcon, label: 'WhatsApp', color: '#25D366', href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` }] : []),
    { id: 'email', icon: Mail, label: 'Email', color: '#3DDC84', href: `mailto:${data?.contactEmail || 'porshuregreen@gmail.com'}` },
    ...(phone ? [{ id: 'phone', icon: Phone, label: 'Call', color: '#3DDC84', href: `tel:${phone.replace(/[^+\d]/g, '')}` }] : []),
  ];
  return <div className={`fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}>
    {isOpen && <div className="mb-1 flex flex-col gap-2.5">{contacts.map((contact) => <a key={contact.id} href={contact.href} target={contact.id === 'whatsapp' ? '_blank' : undefined} rel="noreferrer" onClick={() => setIsOpen(false)} className="group flex items-center gap-3 pr-2"><span className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-[#14231D] opacity-0 shadow-md transition group-hover:opacity-100">{contact.label}</span><span className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-110" style={{ background: contact.color }}><contact.icon size={20} color="white" /></span></a>)}</div>}
    <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close contact options' : 'Open contact options'} className="flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition hover:scale-105" style={{ background: isOpen ? '#14231D' : 'linear-gradient(135deg,#3DDC84,#6C8F5A)' }}>{isOpen ? <X size={22} color="white" /> : <WhatsAppIcon size={22} />}</button>
  </div>;
}
