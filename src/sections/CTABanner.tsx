import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Send, CheckCircle } from 'lucide-react';
import { trpc } from '@/providers/trpc';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', email: '', serviceNeeded: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const createInquiry = trpc.inquiry.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({ fullName: '', email: '', serviceNeeded: '', message: '' });
      setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
    },
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const els = sectionRef.current?.querySelectorAll('.cta-animate');
      if (els && els.length > 0) gsap.from(els, { opacity: 0, y: 30, stagger: 0.15, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) return;
    createInquiry.mutate(formData);
  };

  return (
    <>
      <section ref={sectionRef} className="w-full py-24" style={{ background: 'linear-gradient(135deg, #4AA882 0%, #3D8F6D 50%, #2D7A5A 100%)' }}>
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <h2 className="cta-animate text-[clamp(28px,4vw,42px)] font-bold text-white leading-[1.2] tracking-tight mb-5">
            Ready to Go Paperless?
          </h2>
          <p className="cta-animate text-[16px] font-light text-[rgba(255,255,255,0.85)] max-w-[560px] mx-auto leading-relaxed mb-10">
            Join 500+ organizations that have transformed their document workflows with Porshure Green. Get started in minutes, not days.
          </p>
          <button onClick={() => setShowForm(true)}
            className="cta-animate inline-flex items-center gap-2 px-10 py-4 rounded-full text-[13px] font-semibold uppercase tracking-[1.5px] bg-white text-[#2D7A5A hover:bg-[#F8FAF9] transition-all duration-300 shadow-xl">
            Start Your Transformation
            <Send size={14} />
          </button>
        </div>
      </section>

      {/* Contact Slide-out Panel */}
      {showForm && (
        <div className="fixed inset-0 z-[2000] flex justify-end">
          <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-[22px] font-bold text-[#1A2E28]">Contact Us</h3>
                  <p className="text-[13px] text-[#5A7A6E] mt-1">We typically respond within 2 hours</p>
                </div>
                <button onClick={() => setShowForm(false)} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#F8FAF9] transition-colors">
                  <X size={20} color="#1A2E28" />
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle size={56} color="#4AA882" className="mb-4" />
                  <h4 className="text-[20px] font-semibold text-[#1A2E28] mb-2">Inquiry Sent!</h4>
                  <p className="text-[14px] text-[#5A7A6E]">We'll get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-[#5A7A6E] mb-2">Full Name</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(26,46,40,0.12)] text-[14px] text-[#1A2E28] placeholder:text-[#9BABA4] focus:outline-none focus:border-[#4AA882] focus:ring-2 focus:ring-[rgba(74,168,130,0.15)] transition-all"
                      placeholder="Jane Doe" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-[#5A7A6E] mb-2">Email Address</label>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(26,46,40,0.12)] text-[14px] text-[#1A2E28] placeholder:text-[#9BABA4] focus:outline-none focus:border-[#4AA882] focus:ring-2 focus:ring-[rgba(74,168,130,0.15)] transition-all"
                      placeholder="jane@example.com" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-[#5A7A6E] mb-2">Service Needed</label>
                    <select value={formData.serviceNeeded} onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(26,46,40,0.12)] text-[14px] text-[#1A2E28] focus:outline-none focus:border-[#4AA882] focus:ring-2 focus:ring-[rgba(74,168,130,0.15)] transition-all bg-white">
                      <option value="">Select a service...</option>
                      <option value="Document Processing">Document Processing</option>
                      <option value="PDF Conversion">PDF Conversion</option>
                      <option value="Document Merging">Document Merging</option>
                      <option value="Digital Signature">Digital Signature Setup</option>
                      <option value="Editing & Formatting">Editing & Formatting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1.5px] text-[#5A7A6E] mb-2">Message</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[rgba(26,46,40,0.12)] text-[14px] text-[#1A2E28] placeholder:text-[#9BABA4] focus:outline-none focus:border-[#4AA882] focus:ring-2 focus:ring-[rgba(74,168,130,0.15)] transition-all resize-none"
                      rows={4} placeholder="How can we help you?" required />
                  </div>
                  <button type="submit" disabled={createInquiry.isPending}
                    className="w-full py-3.5 rounded-xl text-[13px] font-semibold uppercase tracking-[1px] bg-[#4AA882] text-white hover:bg-[#3D8F6D] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                    {createInquiry.isPending ? 'Sending...' : 'Send Inquiry'}
                    <Send size={14} />
                  </button>
                  <p className="text-[11px] text-[#9BABA4] text-center">By submitting this form, you agree to our privacy policy.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
