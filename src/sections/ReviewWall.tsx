import { useState } from 'react';
import { Link } from 'react-router';
import { Mail, MessageCircle, Quote, ThumbsUp, X } from 'lucide-react';

type Item = {
  name: string;
  platform: 'Facebook' | 'WhatsApp' | 'Email';
  quote: string;
  detail: string;
  image?: string;
  tint: string;
  initials: string;
};

// Every quote below is taken from a real message a client sent us.
const items: Item[] = [
  {
    name: 'Joya Lacy',
    platform: 'Facebook',
    quote:
      'Thank you for your help and patience. If anyone is looking for a fast turn around on your documents, I recommend you send a message right now to Ms. Green.',
    detail: 'Facebook recommendation',
    image: '/images/reviews/joya-review.jpg',
    tint: '#43845F',
    initials: 'JL',
  },
  {
    name: 'Liaa Dussè',
    platform: 'Email',
    quote: 'Yes ma’am, everything looks great. Thank you so much — I will be working with you again.',
    detail: 'Email follow-up',
    image: '/images/reviews/liaa-review.jpg',
    tint: '#3E6E9E',
    initials: 'LD',
  },
  {
    name: 'Ma-Lik MightyEast RakMan',
    platform: 'Facebook',
    quote:
      'Once again thank you Ms. Porshure Green — the documents have been approved. Great prices and work quick as hell!',
    detail: 'Facebook comment',
    image: '/images/reviews/malik-review.jpg',
    tint: '#B4633A',
    initials: 'MR',
  },
  {
    name: 'Johári Green',
    platform: 'Facebook',
    quote: 'Thank you so much for helping me out! You definitely did what needed to be done, I appreciate it!',
    detail: 'Facebook recommendation',
    image: '/images/reviews/johari-review.jpg',
    tint: '#7A5AA8',
    initials: 'JG',
  },
];

const platformIcon = {
  Facebook: ThumbsUp,
  WhatsApp: MessageCircle,
  Email: Mail,
};

export default function ReviewWall() {
  const [open, setOpen] = useState<Item | null>(null);

  return (
    <section className="section-padding">
      <div className="container-brand">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="brand-eyebrow">STRAIGHT FROM THE INBOX</span>
            <h2 className="brand-heading-lg mt-2">
              Real clients. <span style={{ color: '#43845F' }}>Real screenshots.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-relaxed" style={{ color: '#66736A' }}>
            No stock testimonial graphics here — open any card to see the message exactly as it arrived.
          </p>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = platformIcon[item.platform];
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setOpen(item)}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[#E4E9E1] bg-white p-5 text-left shadow-[0_10px_26px_rgba(29,51,40,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(29,51,40,0.13)]"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.6 : 0.6}deg)` }}
              >
                <Quote size={26} className="absolute right-4 top-4 opacity-[0.07]" style={{ color: item.tint }} />
                <div>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.12em]"
                    style={{ background: `${item.tint}14`, color: item.tint }}
                  >
                    <Icon size={11} /> {item.platform}
                  </span>
                  <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: '#3D5247' }}>
                    “{item.quote}”
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2.5 border-t border-[#EFF2EC] pt-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ background: item.tint }}
                  >
                    {item.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[12.5px] font-semibold" style={{ color: '#1D3328' }}>{item.name}</p>
                    <p className="truncate text-[10.5px]" style={{ color: '#8A968C' }}>{item.detail}</p>
                  </div>
                  <span className="ml-auto shrink-0 text-[10px] font-bold uppercase tracking-[.1em] text-[#43845F] opacity-0 transition-opacity group-hover:opacity-100">
                    View →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${open.name} review`}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-[1200] flex items-center justify-center bg-[#0E1F18]/70 p-4 backdrop-blur-sm"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-4 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[.14em]" style={{ color: open.tint }}>
                  {open.platform} · {open.name}
                </p>
                <p className="mt-1 text-[13px]" style={{ color: '#66736A' }}>{open.detail}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F4EF] text-[#3D5247] hover:bg-[#E6ECE2]"
                aria-label="Close review"
              >
                <X size={15} />
              </button>
            </div>
            {open.image && (
              <img src={open.image} alt={`Message from ${open.name}`} className="w-full rounded-xl border border-[#E4E9E1]" />
            )}
            <Link to="/contact" className="brand-green-btn mt-4 w-full justify-center py-2.5 text-xs" onClick={() => setOpen(null)}>
              Start a request like this
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
