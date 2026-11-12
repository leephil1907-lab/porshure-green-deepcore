import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Pause, Play, ShieldCheck, X } from 'lucide-react';

type Proof = {
  src: string;
  job: string;
  caption: string;
  channel: 'WhatsApp' | 'iMessage';
  pos: 'top' | 'center' | 'bottom';
};

/**
 * Real screenshots from the desk: WhatsApp / iMessage threads with documents
 * that were actually prepared and delivered. Client-identifying details on the
 * documents themselves are blurred on purpose.
 */
const proofs: Proof[] = [
  {
    src: '/images/proof/utility-bill.jpg',
    job: 'Utility bill',
    caption: '“Response is quick & prompt! Great turnaround time — I was able to get items same day.”',
    channel: 'WhatsApp',
    pos: 'bottom',
  },
  {
    src: '/images/proof/apartment-approved.jpg',
    job: 'Apartment application',
    caption: '“Hey there, I was approved for the apartment — thank u so so so much.”',
    channel: 'WhatsApp',
    pos: 'center',
  },
  {
    src: '/images/proof/servsafe-certificate.jpg',
    job: 'ServSafe certificate',
    caption: '“Access and give me feedback” … “You did an amazing job.”',
    channel: 'WhatsApp',
    pos: 'center',
  },
  {
    src: '/images/proof/recommend-files.jpg',
    job: 'Payroll files, split',
    caption: '“I appreciate your patience with me, I’ll be sure to recommend you to anyone and everyone.”',
    channel: 'iMessage',
    pos: 'top',
  },
  {
    src: '/images/proof/ged-transcript.jpg',
    job: 'GED transcript',
    caption: '“Thank you so much” … “It looks great!”',
    channel: 'WhatsApp',
    pos: 'center',
  },
  {
    src: '/images/proof/amazon-form.jpg',
    job: 'Amazon accommodation form',
    caption: 'Reformatted to the client’s exact request, then: “Thank you so much!”',
    channel: 'WhatsApp',
    pos: 'center',
  },
  {
    src: '/images/proof/approved-brittany.jpg',
    job: 'Housing approval',
    caption: '“I got approved 😂😂😂” — “Wow, I’m happy for you.”',
    channel: 'WhatsApp',
    pos: 'center',
  },
  {
    src: '/images/proof/work-review.jpg',
    job: 'Same-day paperwork',
    caption: '“It looks great, you did an amazing job 😍😍”',
    channel: 'WhatsApp',
    pos: 'bottom',
  },
  {
    src: '/images/proof/rooms-to-go.jpg',
    job: 'Furniture order confirmation',
    caption: 'Order documents prepared and payment confirmed, same evening.',
    channel: 'WhatsApp',
    pos: 'bottom',
  },
  {
    src: '/images/proof/rating-request.jpg',
    job: 'Follow-up after delivery',
    caption: '“Is there anywhere I can put a rating or review?”',
    channel: 'iMessage',
    pos: 'center',
  },
];

const AUTOPLAY_MS = 3800;

export default function ProofStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<Proof | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    const card = cardRef.current;
    if (!track || !card) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '16') || 16;
    return card.offsetWidth + gap;
  }, []);

  const goTo = useCallback((next: number, behavior: ScrollBehavior = 'smooth') => {
    const track = trackRef.current;
    const size = step();
    if (!track || !size) return;
    const target = ((next % proofs.length) + proofs.length) % proofs.length;
    track.scrollTo({ left: target * size, behavior });
    setIndex(target);
  }, [step]);

  // Keep the dots honest when the visitor swipes or clicks an arrow themselves.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const size = step();
        if (size) setIndex(Math.round(track.scrollLeft / size) % proofs.length);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => { track.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [step]);

  // Only animate while the carousel is actually on screen.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Autoplay: pauses on hover, on focus, while a screenshot is open, when the
  // tab is hidden, and for visitors who prefer reduced motion.
  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !playing || hovering || open || !visible) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      const size = step();
      const track = trackRef.current;
      if (!track || !size) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
      if (atEnd || index === proofs.length - 1) goTo(-1, 'auto'), requestAnimationFrame(() => goTo(0));
      else goTo(index + 1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing, hovering, open, visible, index, goTo, step]);

  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#F4F7F1' }}>
      <div className="container-brand">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="brand-eyebrow">THE RECEIPTS</span>
            <h2 className="brand-heading-lg mt-2">
              Screenshots from <span style={{ color: '#43845F' }}>actual jobs.</span>
            </h2>
            <p className="brand-body mt-3 max-w-xl">
              These are the conversations behind the work — documents delivered, approvals landed,
              clients replying in their own words. Tap any screenshot to read it in full.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#3D6B4E] shadow-sm sm:inline-flex">
              <ShieldCheck size={12} /> Client details blurred
            </span>
            <button
              type="button"
              onClick={() => setPlaying((current) => !current)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE4D6] bg-white text-[#3D5247] transition hover:bg-[#EEF3E9]"
              aria-label={playing ? 'Pause autoplay' : 'Resume autoplay'}
              title={playing ? 'Pause autoplay' : 'Resume autoplay'}
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE4D6] bg-white text-[#3D5247] transition hover:bg-[#EEF3E9]"
              aria-label="Previous screenshots"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE4D6] bg-white text-[#3D5247] transition hover:bg-[#EEF3E9]"
              aria-label="Next screenshots"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="container-brand mt-6">
        <div
          ref={trackRef}
          id="proof-track"
          role="region"
          aria-roledescription="carousel"
          aria-label="Real client conversations"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onFocusCapture={() => setHovering(true)}
          onBlurCapture={() => setHovering(false)}
          onTouchStart={() => setHovering(true)}
          onTouchEnd={() => window.setTimeout(() => setHovering(false), 2500)}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {proofs.map((proof, i) => (
            <button
              key={proof.src}
              ref={i === 0 ? cardRef : undefined}
              type="button"
              onClick={() => setOpen(proof)}
              aria-label={`Open the ${proof.job} conversation`}
              className="group w-[196px] shrink-0 snap-start text-left sm:w-[214px]"
            >
              <div className="relative overflow-hidden rounded-[20px] border border-[#DDE5D7] bg-white p-1 shadow-[0_10px_24px_rgba(29,51,40,0.10)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_34px_rgba(29,51,40,0.18)]">
                <img
                  src={proof.src}
                  alt={`${proof.job} conversation screenshot`}
                  className="h-[336px] w-full rounded-[16px] object-cover"
                  style={{ objectPosition: `center ${proof.pos}` }}
                  loading={i < 4 ? 'eager' : 'lazy'}
                  width={460}
                  height={818}
                />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 rounded-full bg-[#12291F]/85 px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-[.1em] text-white backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
                  {proof.channel}
                </span>
              </div>
              <p className="mt-2.5 text-[12.5px] font-bold" style={{ color: '#1D3328' }}>{proof.job}</p>
              <p className="mt-1 line-clamp-3 text-[11.5px] leading-snug" style={{ color: '#6C7B70' }}>{proof.caption}</p>
            </button>
          ))}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            {proofs.map((proof, i) => (
              <button
                key={proof.src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to the ${proof.job} screenshot`}
                aria-current={i === index}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? '22px' : '7px',
                  backgroundColor: i === index ? '#43845F' : '#C9D5C0',
                }}
              />
            ))}
          </div>
          <span className="flex items-center gap-1 text-[11px] font-medium text-[#8A968C] md:hidden">
            <ArrowLeft size={11} /> swipe <ArrowRight size={11} />
          </span>
          <span className="hidden text-[11px] font-medium text-[#8A968C] sm:block">
            {index + 1} / {proofs.length}
            {!playing && ' · autoplay paused'}
          </span>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.job} conversation`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-[#0E1F18]/75 p-4 backdrop-blur-sm"
        >
          <div
            className="relative max-h-[92vh] w-full max-w-lg overflow-auto rounded-2xl bg-white p-3 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#43845F]">
                  {open.channel} · {open.job}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug" style={{ color: '#66736A' }}>{open.caption}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F4EF] text-[#3D5247] hover:bg-[#E6ECE2]"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>
            <img src={open.src} alt={`${open.job} conversation`} className="w-full rounded-xl border border-[#E4E9E1]" />
            <Link to="/contact" onClick={() => setOpen(null)} className="brand-green-btn mt-3 w-full justify-center py-2.5 text-xs">
              I need something like this <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
