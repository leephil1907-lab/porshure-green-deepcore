import { FileCheck, MessageCircle, FolderCheck, ClipboardCheck } from 'lucide-react';

const strengths = [
  { icon: FileCheck, label: 'Document preparation' },
  { icon: FolderCheck, label: 'Organized files' },
  { icon: ClipboardCheck, label: 'Careful review' },
  { icon: MessageCircle, label: 'Direct communication' },
];

export default function TrustedBy() {
  return (
    <section aria-label="What to expect" className="border-y border-[#e8ece4] bg-white py-5 md:py-6">
      <div className="container-brand flex flex-wrap items-center justify-center gap-x-8 gap-y-4 md:justify-between">
        <p className="w-full text-center text-[10px] font-bold uppercase tracking-[.18em] text-[#879389] md:w-auto md:text-left">A clearer way to manage document tasks</p>
        {strengths.map((item) => <div key={item.label} className="inline-flex items-center gap-2 text-[12px] font-semibold text-[#52675A]"><item.icon size={15} className="text-[#43845F]"/>{item.label}</div>)}
      </div>
    </section>
  );
}
