import { useReveal } from '@/hooks/useReveal';
import { Check, Zap, Crown, Building } from 'lucide-react';

const plans = [
  { name: 'Single Document', icon: Zap, price: 'Quote', period: 'based on scope', color: '#66816E', description: 'For one document or a focused file-preparation task.', features: ['Document formatting', 'PDF conversion or cleanup', 'Scope confirmed before work'], cta: 'Request a Quote', popular: false },
  { name: 'Document Project', icon: Crown, price: 'Quote', period: 'based on scope', color: '#43845F', description: 'For multiple files or a more involved document package.', features: ['Multiple document support', 'File organization and merging', 'Agreed deliverables and timeline'], cta: 'Request a Quote', popular: true },
  { name: 'Business Support', icon: Building, price: 'Quote', period: 'based on scope', color: '#1D3328', description: 'For recurring or business-related document requirements.', features: ['Discuss your workflow', 'Confirm volume and requirements', 'Custom scope and quote'], cta: 'Contact Us', popular: false },
];

export default function Pricing() {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section id="pricing" ref={sectionRef} className="section-padding grid-bg" style={{ backgroundColor: '#FFF9F0' }}>
      <div className="container-brand">
        <div className="pricing-header text-center mb-16 reveal">
          <span className="brand-label mb-4 inline-block">Pricing by Request</span>
          <h2 className="brand-heading-lg mb-4">A Clear Quote Before Work Begins</h2>
          <p className="brand-body max-w-lg mx-auto">
            Every request is different. We review the document type, volume and requirements, then confirm the price and expected turnaround before you approve the work.
          </p>
        </div>

        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name}
              className="pricing-card relative rounded-2xl p-8 transition-all duration-400 hover:translate-y-[-4px] reveal"
              style={{
                background: plan.popular ? 'white' : 'rgba(255,255,255,0.7)',
                border: `2px solid ${plan.popular ? plan.color + '50' : 'rgba(29,51,40,0.06)'}`,
                boxShadow: plan.popular ? `0 8px 32px ${plan.color}18` : '0 2px 8px rgba(29,51,40,0.04)',
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
                <h3 className="text-[18px] font-semibold" style={{ color: '#1D3328', fontFamily: "'DM Sans', system-ui, sans-serif" }}>{plan.name}</h3>
              </div>

              <div className="mb-4">
                <span className="text-[36px] font-bold" style={{ color: '#1D3328', fontFamily: "'Manrope', sans-serif" }}>{plan.price}</span>
                <span className="text-[12px] ml-2" style={{ color: '#66736A' }}>{plan.period}</span>
              </div>

              <p className="text-[13px] leading-relaxed mb-6" style={{ color: '#66736A' }}>{plan.description}</p>

              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                    <span className="text-[12px]" style={{ color: '#66736A' }}>{f}</span>
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
                  borderColor: plan.popular ? 'transparent' : 'rgba(29,51,40,0.12)',
                  color: plan.popular ? '#1D3328' : '#1D3328',
                }}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Payment methods note */}
        <div className="mt-12 text-center">
          <p className="text-[12px]" style={{ color: '#66736A' }}>
            Payment options and any applicable fees are confirmed with your quote.
          </p>
        </div>
      </div>
    </section>
  );
}
