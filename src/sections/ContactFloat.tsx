import { useState, useEffect } from 'react';
import { MessageCircle, Mail, Phone, X } from 'lucide-react';
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
    ...(whatsapp ? [{ id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: '#25D366', href: `https://wa.me/${whatsapp.replace(/\D/g, '')}` }] : []),
    { id: 'email', icon: Mail, label: 'Email', color: '#3DDC84', href: `mailto:${data?.contactEmail || 'porshuregreen@gmail.com'}` },
    ...(phone ? [{ id: 'phone', icon: Phone, label: 'Call', color: '#3DDC84', href: `tel:${phone.replace(/[^+\d]/g, '')}` }] : []),
  ];
  return <div className={`fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 transition-all duration-500 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}>
    {isOpen && <div className="mb-1 flex flex-col gap-2.5">{contacts.map((contact) => <a key={contact.id} href={contact.href} target={contact.id === 'whatsapp' ? '_blank' : undefined} rel="noreferrer" onClick={() => setIsOpen(false)} className="group flex items-center gap-3 pr-2"><span className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-[#14231D] opacity-0 shadow-md transition group-hover:opacity-100">{contact.label}</span><span className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-110" style={{ background: contact.color }}><contact.icon size={20} color="white" /></span></a>)}</div>}
    <button onClick={() => setIsOpen(!isOpen)} aria-label={isOpen ? 'Close contact options' : 'Open contact options'} className="flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition hover:scale-105" style={{ background: isOpen ? '#14231D' : 'linear-gradient(135deg,#3DDC84,#6C8F5A)' }}>{isOpen ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}</button>
  </div>;
}
