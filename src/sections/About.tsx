import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FileCheck, Shield, MessageCircle, FolderCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { icon: FileCheck, label: 'Document preparation' },
  { icon: Shield, label: 'Careful handling' },
  { icon: MessageCircle, label: 'Direct communication' },
  { icon: FolderCheck, label: 'Organized files' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, { opacity: 0, x: -50, scale: 0.95, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (textRef.current) {
        gsap.from(textRef.current.children, { opacity: 0, x: 30, stagger: 0.1, duration: 0.6, delay: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div ref={imageRef}>
          <div className="relative rounded-3xl overflow-hidden">
            <img src="/images/31583.jpg" alt="Porshure Green Platform" className="w-full h-auto rounded-3xl object-cover shadow-2xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,28,22,0.6)] to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex flex-wrap gap-3">
                {highlights.map((h) => {
                  const Icon = h.icon;
                  return (
                    <span key={h.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.15)] backdrop-blur-sm border border-[rgba(255,255,255,0.2)]">
                      <Icon size={12} color="#4AA882" />
                      <span className="text-[11px] font-medium text-white">{h.label}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div ref={textRef}>
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-[#4AA882] mb-4">About Us</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-[#1A2E28] leading-[1.15] tracking-tight mb-6">
            Document Support Built Around Clarity
          </h2>
          <p className="text-[16px] font-light text-[#5A7A6E] leading-[1.7] mb-5">
            Porshure Green helps individuals, professionals and businesses worldwide prepare, format and organize important documents. Our focus is practical support: understanding the task, agreeing the scope and returning clear, usable files.
          </p>
          <p className="text-[16px] font-light text-[#5A7A6E] leading-[1.7] mb-8">
            Every request is different. We communicate what is included, what information is needed and the expected turnaround before work begins. For tasks that require official approval or third-party submission, we make the limits of our role clear.
          </p>
          <a href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[13px] font-semibold uppercase tracking-[1.5px] border-2 border-[#4AA882] text-[#4AA882] hover:bg-[#4AA882] hover:text-white transition-all duration-300">
            Contact Porshure Green
          </a>
        </div>
      </div>
    </section>
  );
}
