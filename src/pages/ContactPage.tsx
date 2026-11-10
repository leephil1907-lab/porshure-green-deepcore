import { useState, type FormEvent } from 'react';
import { Mail, Phone, ArrowUpRight, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import WhatsAppIcon from '@/sections/WhatsAppIcon';

export default function ContactPage() {
  const { data } = trpc.content.get.useQuery();
  const email = data?.contactEmail?.trim() || 'porshuregreen@gmail.com';
  const phone = data?.contactPhone?.trim() || '+1 (814) 791-5478';
  const rawWhatsapp = data?.whatsappPhone?.trim() || '';
  const whatsapp = rawWhatsapp.replace(/\\D/g, '') || '18147915478';
  const [form, setForm] = useState({ fullName: '', email: '', serviceNeeded: '', message: '' });
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const createInquiry = trpc.inquiry.create.useMutation({
    onSuccess: (result) => {
      setSubmittedId(result.id);
      setForm({ fullName: '', email: '', serviceNeeded: '', message: '' });
    },
  });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedId(null);
    createInquiry.mutate(form);
  };
  const items = [
    { title: 'WhatsApp', detail: 'Chat with our team', icon: WhatsAppIcon, href: `https://wa.me/${whatsapp}`, color: '#238A58', brand: true },
    { title: 'Email', detail: email, icon: Mail, href: 'mailto:' + email, color: '#238A58' },
    { title: 'Phone', detail: phone, icon: Phone, href: 'tel:' + phone.replace(/[^+\\d]/g, ''), color: '#238A58' },
  ];
  return <div className="min-h-screen overflow-x-clip bg-[#FFF9F0]"><Navigation/><main className="pt-[72px]">
    <section className="bg-white py-14 md:py-20"><div className="container-brand">
      <p className="brand-label mb-3">Contact</p><h1 className="brand-heading-xl max-w-3xl">Let’s get your documents in order.</h1>
      <p className="brand-body mt-5 max-w-xl">Tell us what you need help with. We’ll review your request and get back to you with the next step.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">{items.map(item=><a key={item.title} href={item.href} target={item.title==='WhatsApp'?'_blank':undefined} rel="noopener noreferrer" className="group flex min-h-[150px] flex-col justify-between rounded-2xl border border-[#e7e8df] bg-[#FFFDF8] p-6 transition hover:-translate-y-1 hover:border-[#8EB99B] hover:shadow-lg"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF3EC] text-[#238A58]">{item.brand?<item.icon size={22}/>:<item.icon size={21} color={item.color}/>}</span><span><strong className="flex items-center gap-2 text-lg text-[#1D3328]">{item.title}<ArrowUpRight size={15}/></strong><span className="mt-1 block break-words text-sm text-[#6E7A70]">{item.detail}</span></span></a>)}</div>
    </div></section>
    <section className="py-14 md:py-20"><div className="container-brand grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <div><p className="brand-label mb-3">Send an enquiry</p><h2 className="brand-heading-lg">What can we help you prepare?</h2><p className="brand-body mt-4">Share a few details about your document or project. Your request will be sent directly to our website enquiry inbox.</p><div className="mt-7 rounded-2xl border border-[#E4E8DE] bg-white p-5"><p className="text-sm font-semibold text-[#1D3328]">What happens next?</p><ol className="mt-3 space-y-3 text-sm text-[#68776C]"><li>1. Your enquiry is saved for our team.</li><li>2. We review the service and details you provided.</li><li>3. We contact you using the email address supplied.</li></ol></div></div>
      <form onSubmit={submit} className="rounded-3xl border border-[#E4E8DE] bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-[#34483B]">Full name<input required minLength={2} maxLength={255} autoComplete="name" value={form.fullName} onChange={e=>setForm(v=>({...v,fullName:e.target.value}))} placeholder="Your name" className="w-full rounded-xl border border-[#DDE4DB] bg-[#FFFDF8] px-4 py-3 text-base text-[#1D3328] outline-none focus:border-[#238A58]"/></label>
          <label className="flex flex-col gap-2 text-sm font-medium text-[#34483B]">Email address<input required type="email" maxLength={320} autoComplete="email" value={form.email} onChange={e=>setForm(v=>({...v,email:e.target.value}))} placeholder="you@example.com" className="w-full rounded-xl border border-[#DDE4DB] bg-[#FFFDF8] px-4 py-3 text-base text-[#1D3328] outline-none focus:border-[#238A58]"/></label>
        </div>
        <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#34483B]">Service needed<select value={form.serviceNeeded} onChange={e=>setForm(v=>({...v,serviceNeeded:e.target.value}))} className="w-full rounded-xl border border-[#DDE4DB] bg-[#FFFDF8] px-4 py-3 text-base text-[#1D3328] outline-none focus:border-[#238A58]"><option value="">Select a service (optional)</option><option>Business documents</option><option>CV and career documents</option><option>Academic document formatting</option><option>Forms and applications</option><option>PDF editing and conversion</option><option>Other document support</option></select></label>
        <label className="mt-5 flex flex-col gap-2 text-sm font-medium text-[#34483B]">How can we help?<textarea required minLength={10} maxLength={5000} rows={6} value={form.message} onChange={e=>setForm(v=>({...v,message:e.target.value}))} placeholder="Describe the document or service you need..." className="w-full resize-y rounded-xl border border-[#DDE4DB] bg-[#FFFDF8] px-4 py-3 text-base text-[#1D3328] outline-none focus:border-[#238A58]"/></label>
        {createInquiry.error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{createInquiry.error.message}</p>}
        {submittedId !== null && <div role="status" className="mt-4 flex items-start gap-3 rounded-xl bg-[#EAF3EC] p-4 text-sm text-[#1D6841]"><CheckCircle2 size={19}/><span><strong>Enquiry received.</strong> Your reference number is #{submittedId}. Our team can now review your request.</span></div>}
        <button type="submit" disabled={createInquiry.isPending} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#238A58] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#176C43] disabled:cursor-not-allowed disabled:opacity-60">{createInquiry.isPending?<><Loader2 size={17} className="animate-spin"/>Sending enquiry…</>:<>Send enquiry<Send size={16}/></>}</button>
        <p className="mt-3 text-center text-xs text-[#788579]">Please do not include passwords, payment card details, or other sensitive information.</p>
      </form>
    </div></section>
  </main><Footer/></div>;
}
