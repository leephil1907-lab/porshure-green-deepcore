import Navigation from '@/sections/Navigation';
import Services from '@/sections/Services';
import HowItWorks from '@/sections/HowItWorks';
import DocumentShowcase from '@/sections/DocumentShowcase';
import DocumentSamples from '@/sections/DocumentSamples';
import Pricing from '@/sections/Pricing';
import FAQ from '@/sections/FAQ';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Navigation />
      <main className="pt-[72px]">
        <section className="border-b border-[#e8e7dc] bg-white py-14 md:py-20">
          <div className="container-brand">
            <p className="brand-label mb-3">Our Services</p>
            <h1 className="brand-heading-xl max-w-3xl">Practical document support, <span className="text-[#43845F]">done properly.</span></h1>
            <p className="brand-body mt-5 max-w-2xl">From clean conversions to organized, submission-ready documents, get focused help for the work that matters.</p>
          </div>
        </section>
        <Services />
        <HowItWorks />
        <DocumentShowcase />
        <DocumentSamples />
        <Pricing />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
