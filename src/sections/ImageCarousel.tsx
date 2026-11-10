import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, FileCheck2, FolderCheck, ShieldCheck } from 'lucide-react';

const slides = [
  { src: '/images/hero-main.jpg', eyebrow: 'Document preparation', title: 'Every detail, thoughtfully organized', copy: 'Clear, careful document support that helps you move forward with confidence.', icon: FileCheck2 },
  { src: '/images/hands-docs.jpg', eyebrow: 'Personal support', title: 'A smoother way to handle paperwork', copy: 'Practical help with preparing, formatting and organizing important documents.', icon: FolderCheck },
  { src: '/images/workflow-desk.jpg', eyebrow: 'A dependable process', title: 'Clarity from the first step to the last', copy: 'Know what is needed, what happens next and where your request stands.', icon: ShieldCheck },
];

export default function ImageCarousel() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, []);
  const slide = slides[active];
  const Icon = slide.icon;
  const move = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);
  return (
    <section className="container-brand py-8 md:py-12">
      <div className="relative isolate min-h-[330px] overflow-hidden rounded-[26px] bg-[#173B2B] shadow-[0_24px_70px_rgba(23,59,43,.16)] md:min-h-[390px]">
        {slides.map((item, index) => <img key={item.src} src={item.src} alt={item.title} loading="lazy" className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === active ? 'opacity-55' : 'opacity-0'}`} />)}
        <div className="absolute inset-0 bg-gradient-to-r from-[#10271D]/95 via-[#10271D]/75 to-[#10271D]/10" />
        <div key={active} className="relative z-10 flex min-h-[330px] max-w-2xl flex-col justify-center px-7 py-12 text-white motion-safe:animate-[fadeIn_.5s_ease-out] md:min-h-[390px] md:px-14">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.18em]"><Icon size={14}/>{slide.eyebrow}</span>
          <h2 className="max-w-xl font-[Manrope] text-3xl font-extrabold leading-[1.08] tracking-[-.05em] md:text-5xl">{slide.title}</h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/75 md:text-base">{slide.copy}</p>
          <div className="mt-8 flex items-center gap-3">
            <button type="button" aria-label="Previous image" onClick={() => move(-1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"><ArrowLeft size={17}/></button>
            <button type="button" aria-label="Next image" onClick={() => move(1)} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white/20"><ArrowRight size={17}/></button>
            <div className="ml-2 flex items-center gap-2" aria-label={`Slide ${active + 1} of ${slides.length}`}>{slides.map((item,index)=><button key={item.src} type="button" onClick={()=>setActive(index)} aria-label={`Show slide ${index+1}`} className={`h-1.5 rounded-full transition-all ${index===active?'w-8 bg-white':'w-3 bg-white/40'}`}/>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
