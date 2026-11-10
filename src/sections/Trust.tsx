import { ClipboardCheck, MessageCircle, FolderCheck, ShieldCheck } from 'lucide-react';

const principles = [
  { icon: ClipboardCheck, title: 'Clear scope', desc: 'We clarify what you need before work begins, so the deliverable and next steps are understood.' },
  { icon: FolderCheck, title: 'Careful organization', desc: 'Files are prepared and arranged with attention to naming, order, readability and the purpose of the document.' },
  { icon: MessageCircle, title: 'Direct communication', desc: 'You can ask questions and receive progress updates through the contact channel that works best for you.' },
  { icon: ShieldCheck, title: 'Respectful handling', desc: 'We treat the documents you share with care and only request information needed to complete the agreed task.' },
];

export default function Trust() {
  return (
    <section id="security" className="bg-[#183829] py-14 md:py-16">
      <div className="container-brand">
        <div className="mb-9 max-w-2xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#A9D2B2]">Our approach</p>
          <h2 className="font-['Manrope'] text-3xl font-extrabold leading-tight tracking-[-.05em] text-white md:text-4xl">Care and clarity at every step.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/65">Good document support is about more than the final file. It is also about understanding the task, communicating clearly and handling each request thoughtfully.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((item) => <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[.045] p-5">
            <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[#B8DCC0]"><item.icon size={19}/></span>
            <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
            <p className="text-[13px] leading-6 text-white/60">{item.desc}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}
