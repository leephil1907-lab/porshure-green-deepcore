type HeroImageProps = {
  className?: string;
};

export default function HeroImage({ className = '' }: HeroImageProps) {
  return (
    <img
      src="/images/hero-main.jpg"
      alt="Porshure Green professional document support"
      className={`h-full w-full object-cover object-center ${className}`}
      width={1200}
      height={900}
      fetchPriority="high"
      decoding="async"
    />
  );
}
