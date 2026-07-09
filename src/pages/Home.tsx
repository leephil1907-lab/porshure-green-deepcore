import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import Services from '@/sections/Services';
import HowItWorks from '@/sections/HowItWorks';
import Trust from '@/sections/Trust';
import Reviews from '@/sections/Reviews';
import FAQ from '@/sections/FAQ';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';
import ContactFloat from '@/sections/ContactFloat';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div style={{ backgroundColor: '#FFF8ED' }}>
      <Navigation />
      <Hero />
      <Services />
      <HowItWorks />
      <Trust />
      <Reviews />
      <FAQ />
      <CTABanner />
      <Footer />
      <ContactFloat />
    </div>
  );
}
