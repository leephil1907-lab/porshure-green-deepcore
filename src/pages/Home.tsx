import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import TrustedBy from '@/sections/TrustedBy';
import Services from '@/sections/Services';
import HowItWorks from '@/sections/HowItWorks';
import DocumentShowcase from '@/sections/DocumentShowcase';
import DocumentSamples from '@/sections/DocumentSamples';
import Trust from '@/sections/Trust';
import Reviews from '@/sections/Reviews';
import Pricing from '@/sections/Pricing';
import FAQ from '@/sections/FAQ';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';
import ContactFloat from '@/sections/ContactFloat';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  }, []);

  return (
    <div style={{ backgroundColor: '#FFF8ED' }}>
      <Navigation />
      <Hero />
      <TrustedBy />
      <Services />
      <HowItWorks />
      <DocumentShowcase />
      <DocumentSamples />
      <Trust />
      <Reviews />
      <Pricing />
      <FAQ />
      <CTABanner />
      <Footer />
      <ContactFloat />
    </div>
  );
}
