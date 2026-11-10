import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, Crown, Building } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  { name: 'Single Document', icon: Zap, price: 'Quote', period: 'based on scope', color: '#6C8F5A', description: 'For one document or a focused file-preparation task.', features: ['Document formatting', 'PDF conversion or cleanup', 'Scope confirmed before work'], cta: 'Request a Quote', popular: false },
  { name: 'Document Project', icon: Crown, price: 'Quote', period: 'based on scope', color: '#3DDC84', description: 'For multiple files or a more involved document package.', features: ['Multiple document support', 'File organization and merging', 'Agreed deliverables and timeline'], cta: 'Request a Quote', popular: true },
  { name: 'Business Support', icon: Building, price: 'Quote', period: 'based on scope', color: '#1A1A2E', description: 'For recurring or business-related document requirements.', features: ['Discuss your workflow', 'Confirm volume and requirements', 'Custom scope and quote'], cta: 'Contact Us', popular: false },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.pricing-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.pricing-card', { opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing-grid', start: 'top 80%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="section-padding grid-bg" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        <div className="pricing-header text-center mb-16">
          <span className="brand-label mb-4 inline-block">Pricing by Request</span>
          <h2 className="brand-heading-lg mb-4">A Clear Quote Before Work Begins</h2>
          <p className="brand-body max-w-lg mx-auto">
            Every request is different. We review the document type, volume and requirements, then confirm the price and expected turnaround before you approve the work.
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name}
              className="pricing-card relative rounded-2xl p-8 transition-all duration-400 hover:translate-y-[-4px]"
              style={{
                background: plan.popular ? 'white' : 'rgba(255,255,255,0.7)',
                border: `2px solid ${plan.popular ? plan.color + '50' : 'rgba(26,26,46,0.06)'}`,
                boxShadow: plan.popular ? `0 8px 32px ${plan.color}18` : '0 2px 8px rgba(26,26,46,0.04)',
              }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ background: plan.color }}>
                  Most Popular
                </div>
              )}

              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${plan.color}12` }}>
                  <plan.icon size={18} color={plan.color} strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold" style={{ color: '#1A1A2E', fontFamily: 'Inter' }}>{plan.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-[36px] font-bold" style={{ color: '#1A1A2E', fontFamily: 'Playfair Display' }}>{plan.price}</span>
                <span className="text-[12px] ml-2" style={{ color: '#6E7480' }}>{plan.period}</span>
              </div>

              <p className="text-[13px] leading-relaxed mb-6" style={{ color: '#6E7480' }}>{plan.description}</p>

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-[12px]" style={{ color: '#6E7480' }}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href="/contact"
                className={`block w-full text-center py-3 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 ${
                  plan.popular
                    ? 'text-white hover:shadow-lg'
                    : 'border hover:shadow-md'
                }`}
                style={{
                  background: plan.popular ? plan.color : 'transparent',
                  borderColor: plan.popular ? 'transparent' : 'rgba(26,26,46,0.12)',
                  color: plan.popular ? '#1A1A2E' : '#1A1A2E',
                }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Payment methods note */}
        <div className="mt-12 text-center">
          <p className="text-[12px]" style={{ color: '#6E7480' }}>
            Payment options and any applicable fees are confirmed with your quote.
          </p>
        </div>
      </div>
    </section>
  );
}
