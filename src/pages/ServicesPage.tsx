import { Link } from 'react-router';
import { ArrowRight, Check } from 'lucide-react';
import DocPreview from '@/components/DocPreview';
import Navigation from '@/sections/Navigation';
import Services from '@/sections/Services';
import HowItWorks from '@/sections/HowItWorks';
import DocumentShowcase from '@/sections/DocumentShowcase';
import DocumentSamples from '@/sections/DocumentSamples';
import ProofStrip from '@/sections/ProofStrip';
import Pricing from '@/sections/Pricing';
import FAQ from '@/sections/FAQ';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Navigation />
      <main className="pt-[72px]">
        <section className="relative overflow-hidden border-b border-[#e8e7dc] bg-white py-12 md:py-16">
          <div className="container-brand grid items-center gap-9 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
            <div>
              <p className="brand-label mb-3">Our Services</p>
              <h1 className="brand-heading-xl max-w-3xl">Practical document support, <span className="text-[#43845F]">done properly.</span></h1>
              <p className="brand-body mt-5 max-w-2xl">From clean conversions to organized, submission-ready documents, get focused help for the work that matters.</p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {['PDF conversion', 'Formatting & editing', 'File merging', 'Signature prep', 'Submission packs'].map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-[#E1E8DC] bg-[#F7FAF5] px-3 py-1.5 text-[12px] font-medium text-[#3D5247]">
                    <Check size={12} className="text-[#43845F]" /> {chip}
                  </span>
                ))}
              </div>
              <Link to="/contact" className="brand-green-btn mt-7 px-6 py-3 text-xs">
                Start a request <ArrowRight size={15} />
              </Link>
            </div>

            {/* Visual: a small fan of prepared documents — keeps the hero from reading as empty space */}
            <div className="relative mx-auto flex w-full max-w-[380px] items-center justify-center lg:mx-0 lg:justify-end">
              <div className="absolute inset-0 -z-0 rounded-[28px] bg-[#F3F7F0]" />
              <div className="relative flex items-end justify-center gap-1 px-6 py-8">
                <DocPreview color="#66816E" title="Transcript Request" variant="form" className="-mr-6 w-[112px] -rotate-6 opacity-95 drop-shadow-[0_12px_24px_rgba(29,51,40,0.16)] transition-transform duration-300 hover:-translate-y-2" />
                <DocPreview color="#D4943A" title="Lease Agreement" variant="letter" className="relative z-10 w-[128px] -translate-y-2 drop-shadow-[0_18px_34px_rgba(29,51,40,0.2)] transition-transform duration-300 hover:-translate-y-3" />
                <DocPreview color="#3B8FD9" title="Visa Application" variant="form" className="-ml-6 w-[112px] rotate-6 opacity-95 drop-shadow-[0_12px_24px_rgba(29,51,40,0.16)] transition-transform duration-300 hover:-translate-y-2" />
              </div>
              <span className="absolute bottom-3 left-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#4C6156] shadow-sm">
                Sample pack
              </span>
            </div>
          </div>
        </section>
        <Services />
        <HowItWorks />
        <DocumentShowcase />
        <DocumentSamples />
        <ProofStrip />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
