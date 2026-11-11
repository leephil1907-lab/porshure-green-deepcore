import { Link } from 'react-router';
import { ArrowRight, Coffee, Heart, MessageCircle } from 'lucide-react';

/**
 * A deliberately human section: the site is run by one person, and this is
 * where that shows. Personality without inventing credentials or claims.
 */
export default function DeskNote() {
  return (
    <section className="section-padding">
      <div className="container-brand">
        <div className="relative overflow-hidden rounded-[28px] border border-[#e3e8dd] bg-white p-6 shadow-[0_18px_50px_rgba(29,51,40,0.07)] md:p-10">
          <span className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-[#EFF4EC]" />
          <span className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#FBF3E4]" />

          <div className="relative grid gap-8 md:grid-cols-[240px_1fr] md:items-center md:gap-10">
            {/* a taped photo, like something pinned above a desk */}
            <div className="relative mx-auto w-[220px] rotate-[-2.5deg]">
              <span className="absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-[#E8DFC8]/80 shadow-sm" aria-hidden="true" />
              <img
                src="/images/hands-docs.jpg"
                alt="Documents being sorted and prepared by hand"
                className="w-full rounded-lg border-4 border-white object-cover shadow-[0_14px_30px_rgba(29,51,40,0.18)]"
                loading="lazy"
                width={440}
                height={330}
              />
              <span className="absolute -bottom-4 -right-3 rotate-[6deg] rounded-full bg-[#244D36] px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-white shadow-md">
                Prepared by hand
              </span>
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F6EE] px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[.16em] text-[#3D6B4E]">
                <Coffee size={12} /> A note from the desk
              </span>
              <h2 className="mt-4 text-[clamp(1.5rem,3.2vw,2.1rem)] font-semibold leading-tight" style={{ color: '#1D3328' }}>
                You send the messy version. <span style={{ color: '#43845F' }}>It comes back ready to submit.</span>
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed" style={{ color: '#59695F' }}>
                There is no call centre behind this website. Requests are read by the person who prepares
                them — so if something is unclear, you get a straight question back instead of a ticket number.
                Awkward files, tight deadlines and “I don’t know where to start” are all normal here.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {[
                  { icon: MessageCircle, text: 'Reply usually within a few hours' },
                  { icon: Heart, text: 'Your files stay private' },
                ].map((item) => (
                  <span key={item.text} className="inline-flex items-center gap-1.5 rounded-full border border-[#E1E8DC] bg-[#F9FBF7] px-3 py-1.5 text-[12px] font-medium text-[#3D5247]">
                    <item.icon size={12} className="text-[#43845F]" /> {item.text}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="brand-green-btn px-5 py-2.5 text-xs">
                  Send me the messy version <ArrowRight size={14} />
                </Link>
                <span className="text-[13px] italic" style={{ color: '#7A8B7C' }}>— the Porshure Green desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
