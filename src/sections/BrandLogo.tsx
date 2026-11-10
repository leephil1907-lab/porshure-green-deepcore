import { Link } from 'react-router';

export default function BrandLogo({ inverse = false, light = false }: { inverse?: boolean; light?: boolean }) {
  const dark = inverse || light;
  return <Link to="/" aria-label="Porshure Green home" className="inline-flex items-center gap-3">
    <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[15px] shadow-sm ${dark ? 'bg-[#E8F2E9]' : 'bg-[#173B2B]'}`}>
      <svg viewBox="0 0 48 48" width="35" height="35" fill="none" aria-hidden="true">
        <path d="M11 36V12h13.5c6 0 9.5 3.2 9.5 8s-3.5 8-9.5 8H18" stroke={dark ? '#1E5439' : '#F4FAF2'} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 28c3.5-8 9.5-12.5 19-14-1.1 9.8-7.3 16-16.8 16.5" stroke={dark ? '#43845F' : '#A9D5B4'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 37c4.5-7 9.7-11.5 16.5-15" stroke={dark ? '#43845F' : '#A9D5B4'} strokeWidth="2.4" strokeLinecap="round"/>
      </svg>
    </span>
    <span className="flex flex-col leading-none">
      <span className={`font-[Manrope] text-[18px] font-extrabold tracking-[-.055em] ${inverse ? 'text-[#173B2B]' : light ? 'text-white' : 'text-[#1D3328]'}`}>Porshure Green</span>
      <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-[.23em] ${inverse ? 'text-[#66816E]' : light ? 'text-[#A9D2B2]' : 'text-[#708A76]'}`}>Document Support</span>
    </span>
  </Link>;
}