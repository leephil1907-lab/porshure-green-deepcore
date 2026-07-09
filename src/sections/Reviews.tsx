import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Liaa Dussè', avatar: 'LD', color: '#3DDC84', rating: 5,
    date: 'June 2026', source: 'Email',
    text: "Yess ma'am, everything looks great thank you so much I will be working with you again. Porshure Green made the whole process so smooth!",
  },
  {
    name: 'Joya Lacy', avatar: 'JL', color: '#6C8F5A', rating: 5,
    date: 'Verified Customer', source: 'Facebook',
    text: "Thank you for your help and patience. If anyone is looking for a fast turn around on your documents, I recommend you send a message right now to Ms. Green. Professional and reliable!",
  },
  {
    name: 'Ma-Lik MightyEast', avatar: 'MM', color: '#1A1A2E', rating: 5,
    date: 'Verified Customer', source: 'Facebook',
    text: "Once again thank you ms Porshure Green the documents have been approved. Get in tune with this woman for any documentation you may need — great prices and work quick as hell!",
  },
  {
    name: 'Johári Green', avatar: 'JG', color: '#D4943A', rating: 5,
    date: 'Verified Customer', source: 'Facebook',
    text: "Thank you so much for helping me out! You definitely did what needed to be done I appreciate it. The documents came back perfect and on time.",
  },
  {
    name: 'Ashley McRae', avatar: 'AM', color: '#9B6DD1', rating: 5,
    date: 'Verified Customer', source: 'WhatsApp',
    text: "You are the GOAT!!! I will not play about you! Thank you very much #MsMakeItHappen. Fast, accurate, and so easy to work with. Five stars every time!",
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from('.reviews-header', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' } });
      gsap.from('.reviews-main', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.reviews-main', start: 'top 85%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const next = () => setActiveIndex((prev) => (prev + 1) % reviews.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section id="reviews" ref={sectionRef} className="section-padding" style={{ backgroundColor: '#FFF8ED' }}>
      <div className="container-brand">
        <div className="reviews-header text-center mb-14">
          <span className="brand-label mb-4 inline-block">Testimonials</span>
          <h2 className="brand-heading-lg mb-4">What Our <span style={{ color: '#3DDC84' }}>Clients</span> Say</h2>
          <p className="brand-body max-w-md mx-auto">
            Real reviews from real people who trust Porshure Green with their most important documents.
          </p>
        </div>

        <div className="reviews-main grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured Review */}
          <div className="lg:col-span-3">
            <div className="paper-card !p-8 lg:!p-10 relative overflow-hidden" style={{ minHeight: '320px' }}>
              <Quote size={64} className="absolute top-6 right-6" style={{ color: 'rgba(61,220,132,0.08)' }} />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: reviews[activeIndex].color }}>
                  {reviews[activeIndex].avatar}
                </div>
                <div>
                  <h4 className="text-[16px] font-semibold" style={{ color: '#1A1A2E', fontFamily: 'Inter' }}>{reviews[activeIndex].name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex gap-0.5">
                      {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                        <Star key={i} size={13} color="#D4943A" fill="#D4943A" />
                      ))}
                    </div>
                    <span className="text-[11px]" style={{ color: '#C9C9C9' }}>via {reviews[activeIndex].source}</span>
                  </div>
                </div>
              </div>

              <p className="text-[17px] lg:text-[19px] font-light leading-relaxed italic mb-8" style={{ color: '#6E7480', fontFamily: 'Playfair Display' }}>
                "{reviews[activeIndex].text}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {reviews.map((_, i) => (
                    <button key={i} onClick={() => setActiveIndex(i)}
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ width: i === activeIndex ? '24px' : '8px', background: i === activeIndex ? '#3DDC84' : '#C9C9C9' }} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all hover:border-[#3DDC84] hover:text-[#3DDC84]"
                    style={{ borderColor: '#C9C9C9', color: '#6E7480' }}><ChevronLeft size={16} /></button>
                  <button onClick={next} className="w-9 h-9 rounded-lg border flex items-center justify-center transition-all hover:border-[#3DDC84] hover:text-[#3DDC84]"
                    style={{ borderColor: '#C9C9C9', color: '#6E7480' }}><ChevronRight size={16} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Review List */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {reviews.map((review, i) => (
              <button key={i} onClick={() => setActiveIndex(i)}
                className="flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full"
                style={{
                  background: i === activeIndex ? 'rgba(61,220,132,0.06)' : 'white',
                  border: `1px solid ${i === activeIndex ? 'rgba(61,220,132,0.2)' : 'rgba(26,26,46,0.06)'}`,
                  boxShadow: i === activeIndex ? '0 2px 8px rgba(61,220,132,0.08)' : 'none',
                }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                  style={{ background: review.color }}>{review.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-semibold truncate" style={{ color: '#1A1A2E' }}>{review.name}</span>
                    <span className="text-[10px] flex-shrink-0" style={{ color: '#C9C9C9' }}>{review.source}</span>
                  </div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={10} color="#D4943A" fill="#D4943A" />
                    ))}
                  </div>
                </div>
              </button>
            ))}

            {/* CTA in sidebar */}
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="mt-2 flex items-center justify-center gap-2 py-3 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all"
              style={{ background: '#1A1A2E', color: 'white' }}>
              <MessageCircle size={14} /> Share Your Experience
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
