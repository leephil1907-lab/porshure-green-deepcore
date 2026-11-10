import { FileText, Files, PenLine, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const items = [
  { icon: FileText, title: 'PDF Conversion', desc: 'Turn Word files, images and scans into clean, easy-to-share PDFs.' },
  { icon: Files, title: 'Document Merging', desc: 'Bring separate files together in one clear, well-ordered document.' },
  { icon: PenLine, title: 'Formatting & Editing', desc: 'Polish layouts, improve readability and prepare documents for use.' },
  { icon: ShieldCheck, title: 'Signature Preparation', desc: 'Set up signature-ready documents and organized submission packs.' },
];

export default function FeaturedServices() {
  return (
    <section id="services" className="bg-[#F4F6EF] py-14 md:py-16">
      <div className="container-brand">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="brand-label mb-2">How we can help</p><h2 className="brand-heading-lg">Document work, made simpler.</h2></div>
          <Link to="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#326648] hover:gap-3">Explore all services <ArrowRight size={16}/></Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => <article key={item.title} className="rounded-2xl border border-[#e3e9df] bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg">
            <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf4ed] text-[#43845F]"><item.icon size={19}/></span>
            <h3 className="mb-2 text-[16px] font-bold text-[#203A2B]">{item.title}</h3>
            <p className="text-[13px] leading-6 text-[#68766C]">{item.desc}</p>
          </article>)}
        </div>
      </div>
    </section>
  );
}
