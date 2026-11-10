import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import TrustedBy from '@/sections/TrustedBy';
import Services from '@/sections/Services';
import Trust from '@/sections/Trust';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      <Navigation />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <Trust />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
