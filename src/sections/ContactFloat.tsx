import { useEffect, useState } from 'react';
import { trpc } from '@/providers/trpc';
import WhatsAppIcon from './WhatsAppIcon';

export default function ContactFloat() {
  const [visible, setVisible] = useState(false);
  const { data } = trpc.content.get.useQuery();
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const rawWhatsapp = data?.whatsappPhone?.trim() || '';
  const whatsappDigits = rawWhatsapp.replace(/\D/g, '') || '18147915478';
  return <a
    href={`https://wa.me/${whatsappDigits}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Porshure Green on WhatsApp"
    title="Chat with us on WhatsApp"
    className={`fixed bottom-6 right-6 z-[999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#20BD5A] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-10 opacity-0'}`}
  ><WhatsAppIcon size={25}/></a>;
}
