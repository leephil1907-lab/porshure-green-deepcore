import { useState, useEffect } from 'react';
import { MessageCircle, Mail, MessageSquare, Phone, X } from 'lucide-react';

const CONTACTS = [
  {
    id: 'whatsapp', icon: MessageCircle, label: 'WhatsApp', color: '#25D366',
    href: 'https://wa.me/14155345986', desc: '+1 (415) 534-5986',
  },
  {
    id: 'email', icon: Mail, label: 'Email', color: '#EA4335',
    href: 'mailto:porshuregreen@gmail.com', desc: 'porshuregreen@gmail.com',
  },
  {
    id: 'imessage', icon: MessageSquare, label: 'iMessage', color: '#34B7F1',
    href: 'sms:porshuregreen@gmail.com', desc: 'porshuregreen@gmail.com',
  },
  {
    id: 'phone', icon: Phone, label: 'Call', color: '#3DDC84',
    href: 'tel:+14155345986', desc: '+1 (415) 534-5986',
  },
];

export default function ContactFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 transition-all duration-500 ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    }`}>
      {isOpen && (
        <div className="flex flex-col gap-2.5 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {CONTACTS.map((contact) => {
            const Icon = contact.icon;
            return (
              <a key={contact.id} href={contact.href} target={contact.id === 'whatsapp' ? '_blank' : undefined}
                rel={contact.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                onClick={() => setIsOpen(false)}
                className="group flex items-center gap-3 pr-2 transition-all duration-300">
                <span className="text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap"
                  style={{ background: 'white', color: '#1A1A2E', fontFamily: 'Inter' }}>
                  {contact.label}
                </span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                  style={{ background: contact.color }}>
                  <Icon size={20} color="white" strokeWidth={2} />
                </div>
              </a>
            );
          })}
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
        style={{ background: isOpen ? '#1A1A2E' : 'linear-gradient(135deg, #3DDC84, #6C8F5A)' }}>
        {isOpen ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
      </button>
    </div>
  );
}
