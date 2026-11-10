import Navigation from '@/sections/Navigation';
import Trust from '@/sections/Trust';
import Reviews from '@/sections/Reviews';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Navigation />
      <main className="pt-[72px]">
        <section className="border-b border-[#e8e7dc] bg-white py-14 md:py-20">
          <div className="container-brand grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="brand-label mb-3">About Porshure Green</p>
              <h1 className="brand-heading-xl max-w-3xl">A more thoughtful way to handle important documents.</h1>
            </div>
            <p className="brand-body max-w-xl">We make document preparation and organization feel simpler, clearer, and more dependable — with careful handling at every step.</p>
          </div>
        </section>
        <Trust />
        <Reviews />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
