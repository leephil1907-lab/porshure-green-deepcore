import { FileCheck, MessageCircle, FolderCheck, ClipboardCheck, ShieldCheck, Clock, FileSearch, Send } from 'lucide-react';

const strengths = [
  { icon: FileCheck, label: 'Document preparation' },
  { icon: FolderCheck, label: 'Organized files' },
  { icon: ClipboardCheck, label: 'Careful review' },
  { icon: MessageCircle, label: 'Direct communication' },
  { icon: ShieldCheck, label: 'Confidential handling' },
  { icon: Clock, label: 'Agreed turnaround' },
  { icon: FileSearch, label: 'Scope confirmed first' },
  { icon: Send, label: 'Files returned as agreed' },
];

/**
 * Continuous capability strip.
 *
 * Previously a static row that wrapped awkwardly on narrow screens; now a
 * marquee that pauses on hover/focus and freezes entirely for reduced-motion
 * users (CSS handles the reduction, see .marquee in index.css).
 */
export default function TrustedBy() {
  const items = [...strengths, ...strengths];

  return (
    <section aria-label="What to expect" className="group border-y border-[#e8ece4] bg-white py-5 md:py-6">
      <div className="container-brand mb-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[.18em] text-[#879389] md:text-left">
          A clearer way to manage document tasks
        </p>
      </div>
      <div className="marquee overflow-hidden">
        <ul className="marquee-track flex w-max items-center gap-10 pr-10">
          {items.map((item, index) => (
            <li
              key={`${item.label}-${index}`}
              aria-hidden={index >= strengths.length}
              className="inline-flex shrink-0 items-center gap-2 text-[12.5px] font-semibold text-[#52675A]"
            >
              <item.icon size={15} className="text-[#43845F]" />
              {item.label}
              <span className="ml-8 hidden h-1 w-1 rounded-full bg-[#C9D2C6] sm:inline-block" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
