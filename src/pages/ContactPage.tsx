import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { trpc } from '@/providers/trpc';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';

export default function ContactPage() {
  const { data } = trpc.content.get.useQuery();
  const email = data?.contactEmail?.trim() || 'porshuregreen@gmail.com';
  const phone = data?.contactPhone?.trim() || '+1 (814) 791-5478';
  const whatsapp = data?.whatsappPhone?.trim() || '+1 (814) 791-5478';
  const digits = (value: string) => value.replace(/\\D/g, '');
  const items = [
    { title: 'WhatsApp', detail: 'Chat with our team', icon: MessageCircle, href: 'https://wa.me/' + digits(whatsapp), color: '#238A58' },
    { title: 'Email', detail: email, icon: Mail, href: 'mailto:' + email, color: '#238A58' },
    { title: 'Phone', detail: phone, icon: Phone, href: 'tel:' + phone.replace(/[^+\\d]/g, ''), color: '#238A58' },
  ];
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Navigation />
      <main className="pt-[72px]">
        <section className="bg-white py-14 md:py-20">
          <div className="container-brand">
            <p className="brand-label mb-3">Contact</p>
            <h1 className="brand-heading-xl max-w-3xl">Let's get your documents in order.</h1>
            <p className="brand-body mt-5 max-w-xl">Tell us what you need help with. We’ll point you in the right direction and explain the next step.</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {items.map((item) => <a key={item.title} href={item.href} target={item.title === 'WhatsApp' ? '_blank' : undefined} rel="noreferrer" className="group flex min-h-[150px] flex-col justify-between rounded-2xl border border-[#e7e8df] bg-[#FFFDF8] p-6 transition hover:-translate-y-1 hover:border-[#8EB99B] hover:shadow-lg">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EC]"><item.icon size={20} color={item.color} /></span>
                <span><strong className="flex items-center gap-2 text-lg text-[#1D3328]">{item.title}<ArrowUpRight size={15} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" /></strong><span className="mt-1 block text-sm text-[#6E7A70]">{item.detail}</span></span>
              </a>)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
