import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Services: ['Document Processing', 'PDF Conversion', 'Document Merging', 'Digital Signatures', 'Editing & Formatting'],
  Company: ['About Us', 'How It Works', 'Reviews', 'FAQ', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'],
};

const contactMethods = [
  { icon: MessageCircle, label: 'WhatsApp', value: '+1 (415) 534-5986', href: 'https://wa.me/14155345986', color: '#25D366' },
  { icon: Mail, label: 'Email', value: 'porshuregreen@gmail.com', href: 'mailto:porshuregreen@gmail.com', color: '#EA4335' },
  { icon: Phone, label: 'Call', value: '+1 (415) 534-5986', href: 'tel:+14155345986', color: '#3DDC84' },
];

export default function Footer() {
  return (
    <footer id="contact" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Contact Banner */}
      <div className="py-16" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container-brand">
          <div className="text-center mb-12">
            <span className="brand-label mb-4 inline-block" style={{ color: '#3DDC84' }}>Get In Touch</span>
            <h2 className="text-white mb-4" style={{ fontFamily: 'Playfair Display', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600, lineHeight: 1.2 }}>
              Ready to start? <span style={{ color: '#3DDC84' }}>Reach out.</span>
            </h2>
            <p className="text-[15px] font-light max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Choose your preferred method. We respond to all inquiries within 2 hours during business hours.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            {contactMethods.map((method) => (
              <a key={method.label} href={method.href} target={method.label === 'WhatsApp' ? '_blank' : undefined} rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-6 rounded-xl transition-all duration-300 hover:translate-y-[-2px] group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${method.color}15` }}>
                  <method.icon size={20} color={method.color} />
                </div>
                <span className="text-[13px] font-semibold text-white">{method.label}</span>
                <span className="text-[12px] text-center" style={{ color: 'rgba(255,255,255,0.5)' }}>{method.value}</span>
              </a>
            ))}
          </div>

          {/* iMessage note */}
          <div className="text-center">
            <a href="sms:porshuregreen@gmail.com"
              className="inline-flex items-center gap-2 text-[13px] transition-colors hover:text-[#34B7F1]"
              style={{ color: 'rgba(255,255,255,0.4)' }}>
              <MessageCircle size={14} />
              Also available on iMessage: porshuregreen@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-14">
        <div className="container-brand">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #3DDC84, #6C8F5A)' }}>
                  <span className="text-white font-bold text-sm">PG</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[15px] text-white leading-tight">Porshure Green</span>
                  <span className="text-[8px] uppercase tracking-[3px] leading-tight" style={{ color: '#6C8F5A' }}>Documents</span>
                </div>
              </div>
              <p className="text-[13px] leading-relaxed mb-6 max-w-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
                Secure document support, organized with clarity. Professional preparation,
                formatting, and submission services you can trust.
              </p>
              <div className="flex flex-col gap-2.5">
                {contactMethods.slice(0, 2).map((c) => (
                  <a key={c.label} href={c.href} className="flex items-center gap-2.5 text-[12px] transition-colors hover:text-[#3DDC84]"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <c.icon size={13} color="#3DDC84" /> {c.value}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white mb-5">{title}</h4>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[12px] transition-colors duration-300 hover:text-[#3DDC84] flex items-center gap-1 group"
                        style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {link}
                        <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              2025 Porshure Green. All rights reserved.
            </span>
            <div className="flex items-center gap-1">
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>Crafted with</span>
              <span style={{ color: '#E74C3C' }}>♥</span>
              <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.25)' }}>for a paperless world</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
