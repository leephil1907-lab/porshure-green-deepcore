import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import TrustedBy from '@/sections/TrustedBy';
import Services from '@/sections/Services';
import Security from '@/sections/Security';
import Process from '@/sections/Process';
import Reviews from '@/sections/Reviews';
import Insights from '@/sections/Insights';
import About from '@/sections/About';
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
    <div className="relative">
      <Navigation />
      <Hero />
      <TrustedBy />
      <Services />
      <Security />
      <Process />
      <Reviews />
      <Insights />
      <About />
      <CTABanner />
      <Footer />
      <ContactFloat />
    </div>
  );
}
