import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Timer, ShieldCheck, EyeOff, Fingerprint, Trash2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    desc: 'All files are protected with TLS 1.3 in transit and AES-256 at rest. Your documents are never exposed to unauthorized access.',
  },
  {
    icon: Timer,
    title: 'Auto-Destruction',
    desc: 'Once your service is complete, all original and processed files are permanently purged from our servers within 14 days. No traces left.',
  },
  {
    icon: ShieldCheck,
    title: 'Strict Compliance',
    desc: 'Our workflows adhere to data protection regulations. Your personal and business records are handled with full legal compliance.',
  },
  {
    icon: EyeOff,
    title: 'Zero-Trust Access',
    desc: 'No single employee has full access to your documents. Multi-layer authentication and role-based permissions protect every file.',
  },
  {
    icon: Fingerprint,
    title: 'Identity Verification',
    desc: 'We verify sender identity on every submission to prevent unauthorized document processing and ensure chain of custody.',
  },
  {
    icon: Trash2,
    title: 'No Data Retention',
    desc: 'We do not sell, share, or retain your data beyond the service period. Your privacy is our binding commitment.',
  },
];

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.trust-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.trust-card', { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: '.trust-grid', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="security" ref={sectionRef} className="section-padding relative overflow-hidden" style={{ backgroundColor: '#1A1A2E' }}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-brand relative z-10">
        <div className="trust-header grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="brand-label mb-4 inline-block" style={{ color: '#3DDC84' }}>Security First</span>
            <h2 className="brand-heading-lg text-white mb-4">Uncompromising <span style={{ color: '#3DDC84' }}>Privacy</span></h2>
            <p className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Your documents contain sensitive, personal information. Our entire infrastructure is designed
              around one principle: your data belongs to you alone.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img src="/images/trust-seal.jpg" alt="Document security seal" className="w-full h-auto object-cover" />
          </div>
        </div>

        {/* Security Pillars Grid */}
        <div className="trust-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="trust-card p-6 rounded-xl transition-all duration-400 hover:translate-y-[-2px]"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(61,220,132,0.1)' }}>
                <pillar.icon size={20} color="#3DDC84" strokeWidth={1.5} />
              </div>
              <h3 className="text-[16px] font-semibold text-white mb-2" style={{ fontFamily: 'Inter' }}>{pillar.title}</h3>
              <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom trust bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 py-6 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          {['SOC 2 Compliant', 'GDPR Ready', 'HIPAA Aware', '256-bit SSL'].map((badge) => (
            <span key={badge} className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
              <ShieldCheck size={14} color="#3DDC84" /> {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
