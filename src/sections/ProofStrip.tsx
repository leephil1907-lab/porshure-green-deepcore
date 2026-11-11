import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, X } from 'lucide-react';

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
    pos: 'bottom',
    job: 'Utility bill',
    caption: '“Response is quick & prompt! Great turnaround time — I was able to get items same day.”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/apartment-approved.jpg',
    pos: 'center',
    job: 'Apartment application',
    caption: '“Hey there, I was approved for the apartment — thank u so so so much.”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/servsafe-certificate.jpg',
    pos: 'center',
    job: 'ServSafe certificate',
    caption: '“Access and give me feedback” … “You did an amazing job.”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/recommend-files.jpg',
    pos: 'top',
    job: 'Payroll files, split',
    caption: '“I appreciate your patience with me, I’ll be sure to recommend you to anyone and everyone.”',
    channel: 'iMessage',
  },
  {
    src: '/images/proof/ged-transcript.jpg',
    pos: 'center',
    job: 'GED transcript',
    caption: '“Thank you so much” … “It looks great!”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/amazon-form.jpg',
    pos: 'center',
    job: 'Amazon accommodation form',
    caption: 'Reformatted to the client’s exact request, then: “Thank you so much!”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/approved-brittany.jpg',
    pos: 'center',
    job: 'Housing approval',
    caption: '“I got approved 😂😂😂” — “Wow, I’m happy for you.”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/work-review.jpg',
    pos: 'bottom',
    job: 'Same-day paperwork',
    caption: '“It looks great, you did an amazing job 😍😍”',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/rooms-to-go.jpg',
    pos: 'bottom',
    job: 'Furniture order confirmation',
    caption: 'Order documents prepared and payment confirmed, same evening.',
    channel: 'WhatsApp',
  },
  {
    src: '/images/proof/rating-request.jpg',
    pos: 'center',
    job: 'Follow-up after delivery',
    caption: '“Is there anywhere I can put a rating or review?”',
    channel: 'iMessage',
  },
];

export default function ProofStrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Proof | null>(null);

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: 'smooth' });
  };

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
              onClick={() => scrollBy(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DCE4D6] bg-white text-[#3D5247] transition hover:bg-[#EEF3E9]"
              aria-label="Previous screenshots"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
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
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {proofs.map((proof) => (
            <button
              key={proof.src}
              type="button"
              onClick={() => setOpen(proof)}
              className="group w-[196px] shrink-0 snap-start text-left sm:w-[214px]"
            >
              <div className="relative overflow-hidden rounded-[20px] border border-[#DDE5D7] bg-white p-1 shadow-[0_10px_24px_rgba(29,51,40,0.10)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_18px_34px_rgba(29,51,40,0.18)]">
                <img
                  src={proof.src}
                  alt={`${proof.job} conversation screenshot`}
                  className="h-[336px] w-full rounded-[16px] object-cover"
                  style={{ objectPosition: `center ${proof.pos}` }}
                  loading="lazy"
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
        <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[#8A968C] md:hidden">
          <ArrowLeft size={11} /> Swipe <ArrowRight size={11} />
        </p>
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
