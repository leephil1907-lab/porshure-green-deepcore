import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

type Slide = {
  src: string;
  tag: string;
  caption: string;
  alt: string;
};

const slides: Slide[] = [
  {
    src: '/images/hands-docs.jpg',
    tag: 'Document preparation',
    caption: 'Careful, confidential handling from the first page.',
    alt: 'Hands sorting printed documents on a desk',
  },
  {
    src: '/images/hero-main.jpg',
    tag: 'Formatting',
    caption: 'Clean layouts, consistent fonts, submission-ready files.',
    alt: 'Notepad and pen beside a prepared document',
  },
  {
    src: '/images/workflow-desk.jpg',
    tag: 'File organisation',
    caption: 'Every page in the right order, every packet complete.',
    alt: 'Organised file folders and a laptop on a desk',
  },
  {
    src: '/images/trust-seal.jpg',
    tag: 'Final review',
    caption: 'Checked against your requirements before it reaches you.',
    alt: 'Sealed document envelope with a green wax seal',
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement | null>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const play = !isPaused;

  useEffect(() => {
    if (!play) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % slides.length), 5600);
    return () => window.clearInterval(timer);
  }, [play]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); go(index + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); go(index - 1); }
  };

  const slide = slides[index];

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Document support highlights"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(delta) > 44) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
      className="relative isolate w-full overflow-hidden rounded-[26px] bg-[#EAF1E8] shadow-[0_26px_70px_rgba(29,51,40,0.16)] ring-1 ring-[#1D3328]/10 outline-none focus-visible:ring-2 focus-visible:ring-[#43845F]"
    >
      {/* frame */}
      <div className="relative h-[280px] w-full overflow-hidden sm:h-[360px] md:h-[452px]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
            width={1344}
            height={768}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#10221A]/92 via-[#10221A]/25 to-transparent" />

        {/* corner marks give the frame a deliberate, designed feel */}
        <span className="pointer-events-none absolute left-3 top-3 h-8 w-8 rounded-tl-xl border-l-2 border-t-2 border-white/45" />
        <span className="pointer-events-none absolute right-3 top-3 h-8 w-8 rounded-tr-xl border-r-2 border-t-2 border-white/45" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-5 md:px-6 md:pb-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={slide.caption}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white backdrop-blur">
                {slide.tag}
              </span>
              <p className="mt-2 max-w-[34ch] text-[15px] font-medium leading-snug text-white md:text-base">
                {slide.caption}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5" role="tab-list" aria-label="Choose a slide">
              {slides.map((item, i) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}: ${item.tag}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-7 bg-white' : 'w-3 bg-white/45 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPaused((paused) => !paused)}
                aria-label={isPaused ? 'Play slideshow' : 'Pause slideshow'}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <span className="sr-only" aria-live="polite">
        Slide {index + 1} of {slides.length}: {slide.tag}
      </span>
    </div>
  );
}
