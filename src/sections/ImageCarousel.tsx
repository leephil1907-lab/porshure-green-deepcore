import { createElement, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, FileCheck2, FolderCheck, ShieldCheck } from 'lucide-react';

const slides = [
  { src: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1800&q=85', fallback: '/images/hero-main.jpg', eyebrow: 'Document preparation', title: 'Every detail, thoughtfully organized', copy: 'Clear, careful document support that helps you move forward with confidence.', icon: FileCheck2 },
  { src: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=85', fallback: '/images/hero-main.jpg', eyebrow: 'Personal support', title: 'A smoother way to handle paperwork', copy: 'Practical help with preparing, formatting and organizing important documents.', icon: FolderCheck },
  { src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85', fallback: '/images/hero-main.jpg', eyebrow: 'A dependable process', title: 'Clarity from the first step to the last', copy: 'Know what is needed, what happens next and where your request stands.', icon: ShieldCheck },
];

export default function ImageCarousel() {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<number[]>([]);
  useEffect(() => {
    const timer = window.setInterval(() => setActive(value => (value + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);
  const ordered = useMemo(() => slides.map((_, offset) => (active + offset) % slides.length), [active]);
  const current = slides[active];
  const move = (direction: number) => setActive(value => (value + direction + slides.length) % slides.length);
  const imageFor = (index: number) => failed.includes(index) ? slides[index].fallback : slides[index].src;

  return (
    <section className="container-brand min-w-0 py-7 md:py-12" aria-label="Porshure Green service highlights">
      <div className="mb-5 flex min-w-0 flex-col gap-2 sm:flex-row sm:items-end sm:justify-between md:mb-7">
        <div className="min-w-0"><p className="brand-label mb-2">A closer look</p><h2 className="brand-heading-lg">Good work starts with clarity.</h2></div>
        <p className="max-w-sm text-sm leading-6 text-[#68766C]">Thoughtful document support, shown through the details that matter.</p>
      </div>
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.7fr)_minmax(220px,.8fr)]">
        <div className="relative isolate min-h-[320px] min-w-0 overflow-hidden rounded-[22px] bg-[#173B2B] shadow-[0_24px_60px_rgba(23,59,43,.13)] sm:min-h-[360px] md:min-h-[430px]">
          <img src={imageFor(active)} onError={() => setFailed(values => values.includes(active) ? values : [...values, active])} alt={current.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy"/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#10271D]/90 via-[#10271D]/55 to-[#10271D]/10"/>
          <div key={active} className="relative z-10 flex min-h-[320px] max-w-2xl flex-col justify-end px-5 pb-7 pt-12 text-white motion-safe:animate-[fadeIn_.5s_ease-out] sm:min-h-[360px] sm:px-7 sm:pb-9 md:min-h-[430px] md:px-12 md:pb-12">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em]">{createElement(current.icon, { size: 14 })}{current.eyebrow}</span>
            <h3 className="max-w-xl break-words font-[Manrope] text-[clamp(1.65rem,6vw,2.8rem)] font-extrabold leading-[1.08] tracking-[-.05em]">{current.title}</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/75 md:mt-4 md:text-base md:leading-7">{current.copy}</p>
            <div className="mt-6 flex items-center gap-2.5">
              <button type="button" aria-label="Previous highlight" onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"><ArrowLeft size={17}/></button>
              <button type="button" aria-label="Next highlight" onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"><ArrowRight size={17}/></button>
              <span className="ml-2 text-xs font-semibold tracking-wider text-white/70">{String(active + 1).padStart(2,'0')} / {String(slides.length).padStart(2,'0')}</span>
            </div>
          </div>
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-3 lg:grid-cols-1">
          {ordered.slice(1).map((index) => {
            const item = slides[index];
            const Icon = item.icon;
            return <button key={item.src} type="button" onClick={() => setActive(index)} className="group relative min-h-[150px] min-w-0 overflow-hidden rounded-2xl bg-[#173B2B] text-left sm:min-h-[170px] lg:min-h-0">
              <img src={imageFor(index)} onError={() => setFailed(values => values.includes(index) ? values : [...values,index])} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/>
              <div className="absolute inset-0 bg-gradient-to-t from-[#10271D]/90 via-[#10271D]/25 to-transparent"/>
              <div className="relative flex h-full min-h-[150px] flex-col justify-end p-4 text-white sm:min-h-[170px] lg:min-h-[208px]">
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/25 bg-white/10"><Icon size={15}/></span>
                <span className="text-xs font-bold leading-snug sm:text-sm">{item.eyebrow}</span>
                <span className="mt-1 hidden text-xs leading-5 text-white/70 sm:block">{item.title}</span>
              </div>
            </button>;
          })}
        </div>
      </div>
    </section>
  );
}
