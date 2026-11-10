import { ArrowRight, ClipboardList, MessageSquareText, FileCheck2 } from 'lucide-react';
import { Link } from 'react-router';

const steps = [
  { number: '01', icon: MessageSquareText, title: 'Tell us what you need', copy: 'Share the document task, the files involved and any deadline or submission requirements.' },
  { number: '02', icon: ClipboardList, title: 'We confirm the next steps', copy: 'We review the request and clarify the work, expected turnaround and any details needed.' },
  { number: '03', icon: FileCheck2, title: 'Receive organized work', copy: 'Your prepared documents are returned in a clear, usable format for your next step.' },
];

export default function HomeProcess() {
  return <section className="bg-white py-14 md:py-20">
    <div className="container-brand">
      <div className="mx-auto mb-9 max-w-2xl text-center md:mb-12"><p className="brand-label mb-3">A straightforward process</p><h2 className="brand-heading-lg">From request to ready-to-use documents.</h2><p className="brand-body mt-4">Clear communication at each stage, so you know what is needed and what happens next.</p></div>
      <div className="grid gap-4 md:grid-cols-3">{steps.map((step) => <article key={step.number} className="relative min-w-0 rounded-2xl border border-[#e5eae2] bg-[#FFFEFA] p-6 md:p-7"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#326648]"><step.icon size={20}/></span><span className="font-[Manrope] text-sm font-extrabold tracking-widest text-[#B6C7B8]">{step.number}</span></div><h3 className="mt-6 text-lg font-bold text-[#203A2B]">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#68766C]">{step.copy}</p></article>)}</div>
      <div className="mt-8 flex justify-center"><Link to="/services#process" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#CAD8CA] px-5 text-sm font-semibold text-[#2D6040] transition hover:bg-[#EFF5EF]">See the full process <ArrowRight size={16}/></Link></div>
    </div>
  </section>;
}
