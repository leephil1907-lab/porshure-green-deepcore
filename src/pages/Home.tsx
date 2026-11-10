import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import ImageCarousel from '@/sections/ImageCarousel';
import TrustedBy from '@/sections/TrustedBy';
import FeaturedServices from '@/sections/FeaturedServices';
import HomeProcess from '@/sections/HomeProcess';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function Home() {
  return <div className="min-h-screen overflow-x-clip bg-[#FFF9F0]"><Navigation/><main className="min-w-0"><Hero/><ImageCarousel/><TrustedBy/><FeaturedServices/><HomeProcess/><CTABanner/></main><Footer/></div>;
}