import { useState, useEffect } from 'react';
import { MessageCircle, Mail, MessageSquare, X, Phone } from 'lucide-react';

const CONTACTS = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    color: '#25D366',
    bgColor: '#DCF8C6',
    href: 'https://wa.me/14155345986',
    desc: '+1 (415) 534-5986',
    hoverBg: '#25D366',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    color: '#EA4335',
    bgColor: '#FCE8E6',
    href: 'mailto:porshuregreen@gmail.com',
    desc: 'porshuregreen@gmail.com',
    hoverBg: '#EA4335',
  },
  {
    id: 'imessage',
    icon: MessageSquare,
    label: 'iMessage',
    color: '#34B7F1',
    bgColor: '#E3F2FD',
    href: 'sms:porshuregreen@gmail.com',
    desc: 'porshuregreen@gmail.com',
    hoverBg: '#34B7F1',
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Call',
    color: '#4AA882',
    bgColor: '#E8F5EF',
    href: 'tel:+14155345986',
    desc: '+1 (415) 534-5986',
    hoverBg: '#4AA882',
  },
];

export default function ContactFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      {/* Contact Options */}
      {isOpen && (
        <div className="flex flex-col gap-2.5 mb-1 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {CONTACTS.map((contact) => {
            const Icon = contact.icon;
            return (
              <a key={contact.id} href={contact.href} target={contact.id === 'whatsapp' ? '_blank' : undefined} rel={contact.id === 'whatsapp' ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-3 pr-2 transition-all duration-300"
                onClick={() => setIsOpen(false)}>
                <span className="text-[12px] font-medium text-[#1A2E28] bg-white px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {contact.label}
                </span>
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                  style={{ backgroundColor: contact.color }}>
                  <Icon size={20} color="white" />
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105"
        style={{ background: isOpen ? '#1A2E28' : 'linear-gradient(135deg, #4AA882 0%, #3D8F6D 100%)' }}>
        {isOpen ? <X size={22} color="white" /> : <MessageCircle size={22} color="white" />}
      </button>
    </div>
  );
}
