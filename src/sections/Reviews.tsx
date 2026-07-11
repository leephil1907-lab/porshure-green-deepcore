import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: 'Liaa Dussè',
    avatar: 'LD',
    color: '#3DDC84',
    rating: 5,
    date: 'June 2026',
    source: 'WhatsApp',
    text: "Yess ma'am, everything looks great thank you so much I will be working with you again. Porshure Green made the whole process so smooth!",
    image: '/images/reviews/liaa-review.jpg',
  },
  {
    name: 'Kelicia Prossey',
    avatar: 'KP',
    color: '#D4943A',
    rating: 5,
    date: 'Verified Customer',
    source: 'Facebook',
    text: "I highly recommend Porshure Green. She was very professional, friendly, and completed the work much faster than I expected. The quality of her work was excellent, and she paid attention to every detail. She made the entire process easy and stress-free, and I couldn't be happier with the results.",
    image: '/images/reviews/kelicia-review.jpg',
  },
  {
    name: 'Brittany',
    avatar: 'BR',
    color: '#9B6DD1',
    rating: 5,
    date: 'Verified Customer',
    source: 'WhatsApp',
    text: "I got approved! Thank you so much! You are seriously the best. I'm crying real tears of joy. Thank you so much for everything you did for me!",
    image: '/images/reviews/brittany-review.jpg',
  },
  {
    name: 'Joya Lacy',
    avatar: 'JL',
    color: '#6C8F5A',
    rating: 5,
    date: 'Verified Customer',
    source: 'Facebook',
    text: "Thank you for your help and patience. If anyone is looking for a fast turn around on your documents, I recommend you send a message right now to Ms. Green. Professional and reliable!",
  },
  {
    name: 'Ma-Lik MightyEast',
    avatar: 'MM',
    color: '#1A1A2E',
    rating: 5,
    date: 'Verified Customer',
    source: 'Facebook',
    text: "Once again thank you ms Porshure Green the documents have been approved. Get in tune with this woman for any documentation you may need — great prices and work quick as hell!",
  },
  {
    name: 'Johári Green',
    avatar: 'JG',
    color: '#D4943A',
    rating: 5,
    date: 'Verified Customer',
    source: 'Email',
    text: "Thank you so much for helping me out! You definitely did what needed to be done I appreciate it. The documents came back perfect and on time.",
  },
  {
    name: 'Ashley McRae',
    avatar: 'AM',
    color: '#9B6DD1',
    rating: 5,
    date: 'Verified Customer',
    source: 'WhatsApp',
    text: "You are the GOAT!!! I will not play about you! Thank you very much #MsMakeItHappen. Fast, accurate, and so easy to work with. Five stars every time!",
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animations
      gsap.from('.reviews-header', {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });

      // Main card animations
      gsap.from('.reviews-main', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.reviews-main', start: 'top 85%' },
      });

      // Stagger animations for review items
      gsap.from('.review-item', {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.reviews-sidebar', start: 'top 85%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Auto-advance reviews
  useEffect(() => {
    if (!autoPlayEnabled) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [autoPlayEnabled]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 6000);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 6000);
  };

  const handleSelectReview = (index: number) => {
    setActiveIndex(index);
    setAutoPlayEnabled(false);
    setTimeout(() => setAutoPlayEnabled(true), 6000);
  };

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: '#FFF8ED' }}
    >
      <div className="container-brand">
        {/* Header */}
        <div className="reviews-header text-center mb-12 md:mb-14">
          <span className="brand-label mb-4 inline-block">Testimonials</span>
          <h2 className="brand-heading-lg mb-4">
            What Our <span style={{ color: '#3DDC84' }}>Clients</span> Say
          </h2>
          <p className="brand-body max-w-md mx-auto">
            Real reviews from real people who trust Porshure Green with their most important
            documents.
          </p>
        </div>

        {/* Main Reviews Grid - Responsive */}
        <div className="reviews-main grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Featured Review - Mobile: 100%, Tablet/Desktop: 60% */}
          <div className="lg:col-span-3 w-full">
            <div
              className="paper-card !p-6 md:!p-8 lg:!p-10 relative overflow-hidden transition-all duration-500 ease-out"
              style={{ minHeight: '300px', md: '320px' }}
            >
              {/* Quote Icon */}
              <Quote
                size={64}
                className="absolute top-6 right-6 md:top-8 md:right-8"
                style={{ color: 'rgba(61,220,132,0.08)' }}
              />

              {/* Review Content */}
              <div className="relative z-10">
                {/* Avatar & User Info */}
                <div className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0 shadow-lg"
                    style={{ background: reviews[activeIndex].color }}
                  >
                    {reviews[activeIndex].avatar}
                  </div>
                  <div>
                    <h4
                      className="text-sm md:text-base font-semibold truncate"
                      style={{ color: '#1A1A2E', fontFamily: 'Inter' }}
                    >
                      {reviews[activeIndex].name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                          <Star key={i} size={12} color="#D4943A" fill="#D4943A" />
                        ))}
                      </div>
                      <span className="text-[10px] md:text-[11px]" style={{ color: '#C9C9C9' }}>
                        via {reviews[activeIndex].source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p
                  className="text-base md:text-lg lg:text-[19px] font-light leading-relaxed italic mb-6 md:mb-8"
                  style={{ color: '#6E7480', fontFamily: 'Playfair Display' }}
                >
                  "{reviews[activeIndex].text}"
                </p>

                {/* Review Image - if available */}
                {reviews[activeIndex].image && (
                  <div className="mb-6 md:mb-8 rounded-lg overflow-hidden shadow-md max-h-48 md:max-h-64">
                    <img
                      src={reviews[activeIndex].image}
                      alt={`${reviews[activeIndex].name}'s review`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Navigation Controls - Mobile Optimized */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Dots Indicator */}
                <div className="flex gap-1.5 md:gap-2">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelectReview(i)}
                      className="h-2 rounded-full transition-all duration-300 hover:opacity-100"
                      style={{
                        width: i === activeIndex ? '24px' : '8px',
                        background: i === activeIndex ? '#3DDC84' : '#C9C9C9',
                        opacity: i === activeIndex ? 1 : 0.6,
                      }}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: '#C9C9C9',
                      color: '#6E7480',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#3DDC84';
                      (e.currentTarget as HTMLButtonElement).style.color = '#3DDC84';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9C9C9';
                      (e.currentTarget as HTMLButtonElement).style.color = '#6E7480';
                    }}
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: '#C9C9C9',
                      color: '#6E7480',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#3DDC84';
                      (e.currentTarget as HTMLButtonElement).style.color = '#3DDC84';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9C9C9';
                      (e.currentTarget as HTMLButtonElement).style.color = '#6E7480';
                    }}
                    aria-label="Next review"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Sidebar List - Mobile: Hidden, Tablet/Desktop: 40% */}
          <div className="hidden lg:flex lg:col-span-2 flex-col gap-3">
            {reviews.map((review, i) => (
              <button
                key={i}
                onClick={() => handleSelectReview(i)}
                className="review-item flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full hover:shadow-md active:scale-95"
                style={{
                  background: i === activeIndex ? 'rgba(61,220,132,0.06)' : 'white',
                  border: `1px solid ${i === activeIndex ? 'rgba(61,220,132,0.2)' : 'rgba(26,26,46,0.06)'}`,
                  boxShadow:
                    i === activeIndex ? '0 2px 8px rgba(61,220,132,0.08)' : 'none',
                }}
                aria-pressed={i === activeIndex}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0 shadow-md"
                  style={{ background: review.color }}
                >
                  {review.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[13px] font-semibold truncate"
                      style={{ color: '#1A1A2E' }}
                    >
                      {review.name}
                    </span>
                    <span className="text-[10px] flex-shrink-0" style={{ color: '#C9C9C9' }}>
                      {review.source}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} size={10} color="#D4943A" fill="#D4943A" />
                    ))}
                  </div>
                </div>
              </button>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
              style={{ background: '#1A1A2E', color: 'white' }}
            >
              <MessageCircle size={14} /> Share Your Experience
            </a>
          </div>

          {/* Mobile CTA - Visible on mobile only */}
          <div className="lg:hidden">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg"
              style={{ background: '#1A1A2E', color: 'white' }}
            >
              <MessageCircle size={14} /> Share Your Experience
            </a>
          </div>
        </div>

        {/* Review Counter */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: '#6E7480' }}>
            Showing review <span style={{ color: '#3DDC84', fontWeight: 'bold' }}>{activeIndex + 1}</span> of{' '}
            <span style={{ color: '#3DDC84', fontWeight: 'bold' }}>{reviews.length}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
