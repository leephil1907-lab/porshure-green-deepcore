import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Liaa Dussè',
    avatar: 'L',
    color: '#4AA882',
    rating: 5,
    date: 'June 28, 2026',
    text: "Yess ma'am, everything looks great 😊😊 thank you so much I will be working with you again ❤️",
    source: 'Email',
  },
  {
    name: 'Joya Lacy',
    avatar: 'J',
    color: '#D4943A',
    rating: 5,
    date: 'Verified Customer',
    text: "Thank you for your help and patience. If anyone is looking for a fast turn around on your documents than, I recommend you send a message right now to Ms. Green 💚",
    source: 'Facebook',
  },
  {
    name: 'Ma-Lik MightyEast',
    avatar: 'M',
    color: '#3B8FD9',
    rating: 5,
    date: 'Verified Customer',
    text: "Once again thank you ms Porshure Green the documents have been approved get in tune with this woman for any documentation you may need great prices and work quick as hell!!!!!",
    source: 'Facebook',
  },
  {
    name: 'Johári Green',
    avatar: 'J',
    color: '#9B6DD1',
    rating: 5,
    date: 'Verified Customer',
    text: "Thank you so much for helping me out! You definitely did what needed to be done I appreciate it! 😘",
    source: 'Facebook',
  },
  {
    name: 'Ashley McRae',
    avatar: 'A',
    color: '#E74C3C',
    rating: 5,
    date: 'Verified Customer',
    text: "You are the GOAT!!! I will not play about you! Thank you very much #MsMakeItHappen",
    source: 'WhatsApp',
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.reviews-header');
      const container = sectionRef.current?.querySelector('.reviews-container');
      if (header) gsap.from(header, { opacity: 0, y: 30, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      if (container) gsap.from(container, { opacity: 0, y: 40, duration: 0.8, delay: 0.2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" ref={sectionRef} className="w-full py-24" style={{ background: 'linear-gradient(180deg, #0D1C16 0%, #122920 100%)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="reviews-header text-center mb-16">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-[#4AA882] mb-4">Testimonials</span>
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-white leading-[1.15] tracking-tight">What Our Clients Say</h2>
          <p className="mt-4 text-[16px] font-light text-[#7A9A8E] max-w-[500px] mx-auto">Real reviews from real customers who trust Porshure Green with their important documents.</p>
        </div>

        <div className="reviews-container relative">
          {/* Main Featured Review */}
          <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(74,168,130,0.15)] rounded-3xl p-10 md:p-12 mb-8 relative overflow-hidden">
            <Quote size={48} color="rgba(74,168,130,0.15)" className="absolute top-6 right-6" />
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0" style={{ backgroundColor: reviews[activeIndex].color }}>
                {reviews[activeIndex].avatar}
              </div>
              <div>
                <h4 className="text-[18px] font-semibold text-white">{reviews[activeIndex].name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                      <Star key={i} size={14} color="#FFD700" fill="#FFD700" />
                    ))}
                  </div>
                  <span className="text-[12px] text-[#7A9A8E]">via {reviews[activeIndex].source}</span>
                </div>
              </div>
            </div>
            <p className="text-[18px] md:text-[22px] font-light text-[#C8DDD6] leading-relaxed italic">
              "{reviews[activeIndex].text}"
            </p>
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-[#4AA882] w-6' : 'bg-[rgba(255,255,255,0.2)]'}`} />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.08)] transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-white hover:bg-[rgba(255,255,255,0.08)] transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Review Thumbnails */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {reviews.map((review, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className={`p-4 rounded-xl text-left transition-all duration-300 ${i === activeIndex ? 'bg-[rgba(74,168,130,0.15)] border border-[rgba(74,168,130,0.3)]' : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)]'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style={{ backgroundColor: review.color }}>
                    {review.avatar}
                  </div>
                  <span className={`text-[12px] font-medium truncate ${i === activeIndex ? 'text-[#4AA882]' : 'text-[#7A9A8E]'}`}>{review.name}</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} size={10} color="#FFD700" fill="#FFD700" />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
