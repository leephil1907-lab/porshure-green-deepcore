import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { Star, ChevronLeft, ChevronRight, Quote, MessageCircle } from 'lucide-react';
import { trpc } from '@/providers/trpc';

const reviews = [
  {
    name: 'Liaa Dussè',
    avatar: 'LD',
    color: '#43845F',
    rating: 5,
    date: 'Email · June',
    source: 'Email',
    text: "Yess ma'am, everything looks great. Thank you so much — I will be working with you again.",
    image: '/images/reviews/liaa-review.jpg',
  },
  {
    name: 'Joya Lacy',
    avatar: 'JL',
    color: '#66816E',
    rating: 5,
    date: 'Facebook recommendation',
    source: 'Facebook',
    text: 'Thank you for your help and patience. If anyone is looking for a fast turn around on your documents, I recommend you send a message right now to Ms. Green.',
    image: '/images/reviews/joya-review.jpg',
  },
  {
    name: 'Ma-Lik MightyEast',
    avatar: 'MM',
    color: '#B4633A',
    rating: 5,
    date: 'Facebook comment',
    source: 'Facebook',
    text: 'Once again thank you ms Porshure Green — the documents have been approved. Get in tune with this woman for any documentation you may need. Great prices and work quick as hell!',
    image: '/images/reviews/malik-review.jpg',
  },
  {
    name: 'Johári Green',
    avatar: 'JG',
    color: '#7A5AA8',
    rating: 5,
    date: 'Facebook recommendation',
    source: 'Facebook',
    text: 'Thank you so much for helping me out! You definitely did what needed to be done — I appreciate it!',
    image: '/images/reviews/johari-review.jpg',
  },
];

// Real screenshots of the messages clients sent us (cropped, PII removed).
const reviewImages: Record<string, string> = {
  'Liaa Dussè': '/images/reviews/liaa-review.jpg',
  'Joya Lacy': '/images/reviews/joya-review.jpg',
  'Ma-Lik MightyEast': '/images/reviews/malik-review.jpg',
  'Johári Green': '/images/reviews/johari-review.jpg',
};

export default function Reviews() {
  const sectionRef = useReveal<HTMLElement>();
  const [zoom, setZoom] = useState<string | null>(null);
  const { data: siteContent } = trpc.content.get.useQuery();
  const whatsappDigits = siteContent?.whatsappPhone?.replace(/\D/g, '') || '18147915478';
  const shareHref = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent("Hello Porshure Green, I'd like to share my experience with your service.")}`;
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

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
      style={{ backgroundColor: '#FFF9F0' }}
    >
      <div className="container-brand">
        {/* Header */}
        <div className="reviews-header text-center mb-12 md:mb-14 reveal">
          <span className="brand-label mb-4 inline-block">Testimonials</span>
          <h2 className="brand-heading-lg mb-4">
            What Our <span style={{ color: '#43845F' }}>Clients</span> Say
          </h2>
          <p className="brand-body max-w-md mx-auto">
            Real reviews from real people who trust Porshure Green with their most important
            documents.
          </p>
        </div>

        {/* Main Reviews Grid - Responsive */}
        <div className="reviews-main grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 reveal">
          {/* Featured Review - Mobile: 100%, Tablet/Desktop: 60% */}
          <div className="lg:col-span-3 w-full">
            <div
              className="paper-card !p-6 md:!p-8 lg:!p-10 relative min-h-[300px] md:min-h-[320px] overflow-hidden transition-all duration-500 ease-out"
            >
              {/* Quote Icon */}
              <Quote
                size={64}
                className="absolute top-6 right-6 md:top-8 md:right-8"
                style={{ color: 'rgba(67,132,95,0.08)' }}
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
                      style={{ color: '#1D3328', fontFamily: "'DM Sans', system-ui, sans-serif" }}
                    >
                      {reviews[activeIndex].name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: reviews[activeIndex].rating }).map((_, i) => (
                          <Star key={i} size={12} color="#D4943A" fill="#D4943A" />
                        ))}
                      </div>
                      <span className="text-[10px] md:text-[11px]" style={{ color: '#C9D2C6' }}>
                        via {reviews[activeIndex].source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Text + real screenshot side by side, so nothing sits empty */}
                <div className="md:flex md:items-start md:gap-6">
                <p
                  className="text-base md:text-lg lg:text-[19px] font-light leading-relaxed italic mb-6 md:mb-0 md:flex-1"
                  style={{ color: '#66736A', fontFamily: "'Manrope', sans-serif" }}
                >
                  "{reviews[activeIndex].text}"
                </p>

                {/* Proof: a real screenshot of the message the client sent */}
                {reviewImages[reviews[activeIndex].name] && (
                  <button
                    type="button"
                    onClick={() => setZoom(reviewImages[reviews[activeIndex].name])}
                    className="group/proof relative mx-auto block w-fit max-w-[min(100%,300px)] shrink-0 overflow-hidden rounded-xl border border-[#E4E9E1] bg-white p-1.5 shadow-[0_10px_24px_rgba(29,51,40,0.10)] transition-shadow hover:shadow-[0_16px_32px_rgba(29,51,40,0.16)]"
                    aria-label={`Open ${reviews[activeIndex].name}'s original message`}
                  >
                    <img
                      src={reviewImages[reviews[activeIndex].name]}
                      alt={`Screenshot of the message ${reviews[activeIndex].name} sent to Porshure Green`}
                      className="block max-h-[290px] w-auto max-w-full rounded-lg transition-transform duration-500 group-hover/proof:scale-[1.015]"
                      loading="lazy"
                      onError={(event) => {
                        const wrapper = event.currentTarget.closest('button');
                        if (wrapper) wrapper.style.display = 'none';
                      }}
                    />
                    <span className="pointer-events-none absolute inset-x-1.5 bottom-1.5 rounded-md bg-white/90 px-2 py-1 text-center text-[9.5px] font-bold uppercase tracking-[.1em] text-[#3D5247] shadow-sm backdrop-blur">
                      Tap to zoom
                    </span>
                  </button>
                )}
                </div>
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
                        background: i === activeIndex ? '#43845F' : '#C9D2C6',
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
                      borderColor: '#C9D2C6',
                      color: '#66736A',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#43845F';
                      (e.currentTarget as HTMLButtonElement).style.color = '#43845F';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9D2C6';
                      (e.currentTarget as HTMLButtonElement).style.color = '#66736A';
                    }}
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{
                      borderColor: '#C9D2C6',
                      color: '#66736A',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#43845F';
                      (e.currentTarget as HTMLButtonElement).style.color = '#43845F';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9D2C6';
                      (e.currentTarget as HTMLButtonElement).style.color = '#66736A';
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
                className="review-item flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-300 w-full hover:shadow-md active:scale-95 reveal"
                style={{
                  background: i === activeIndex ? 'rgba(67,132,95,0.06)' : 'white',
                  border: `1px solid ${i === activeIndex ? 'rgba(67,132,95,0.2)' : 'rgba(29,51,40,0.06)'}`,
                  boxShadow:
                    i === activeIndex ? '0 2px 8px rgba(67,132,95,0.08)' : 'none',
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
                      style={{ color: '#1D3328' }}
                    >
                      {review.name}
                    </span>
                    <span className="text-[10px] flex-shrink-0" style={{ color: '#C9D2C6' }}>
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
              href={shareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
              style={{ background: '#1D3328', color: 'white' }}
            >
              <MessageCircle size={14} /> Share Your Experience
            </a>
          </div>

          {/* Mobile CTA - Visible on mobile only */}
          <div className="lg:hidden">
            <a
              href={shareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-[12px] font-semibold uppercase tracking-wider transition-all duration-300 hover:shadow-lg"
              style={{ background: '#1D3328', color: 'white' }}
            >
              <MessageCircle size={14} /> Share Your Experience
            </a>
          </div>
        </div>

        {/* Review Counter */}
        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: '#66736A' }}>
            Showing review <span style={{ color: '#43845F', fontWeight: 'bold' }}>{activeIndex + 1}</span> of{' '}
            <span style={{ color: '#43845F', fontWeight: 'bold' }}>{reviews.length}</span>
          </p>
        </div>
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Client message"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-[#0E1F18]/70 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] overflow-auto rounded-2xl bg-white p-2 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setZoom(null)}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#3D5247] shadow"
              aria-label="Close"
            >
              ×
            </button>
            <img src={zoom} alt="Full client message" className="max-h-[82vh] w-auto rounded-xl" />
          </div>
        </div>
      )}
    </section>
  );
}
