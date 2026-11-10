import Navigation from '@/sections/Navigation';
import Hero from '@/sections/Hero';
import ImageCarousel from '@/sections/ImageCarousel';
import HomeProcess from '@/sections/HomeProcess';
import TrustedBy from '@/sections/TrustedBy';
import FeaturedServices from '@/sections/FeaturedServices';
import CTABanner from '@/sections/CTABanner';
import Footer from '@/sections/Footer';

export default function Home() {
  return <div className="min-h-screen w-full overflow-x-clip bg-[#FFF9F0]"><Navigation/><main className="w-full min-w-0"><Hero/><ImageCarousel/><HomeProcess/><TrustedBy/><FeaturedServices/><CTABanner/></main><Footer/></div>;
}