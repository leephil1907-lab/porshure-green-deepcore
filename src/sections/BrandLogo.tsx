import { Link } from 'react-router';

export default function BrandLogo({ inverse = false, light = false }: { inverse?: boolean; light?: boolean }) {
  const dark = inverse || light;
  return <Link to="/" aria-label="Porshure Green home" className="inline-flex items-center gap-3">
    <span className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[16px] shadow-sm ring-1 ring-black/5 ${dark ? 'bg-[#E8F2E9]' : 'bg-[#173B2B]'}`}>
      <svg viewBox="0 0 48 48" width="38" height="38" fill="none" aria-hidden="true">
        <path d="M10 35.5V12.5H23.5C29.8 12.5 34 16 34 21.1C34 26.2 29.8 29.5 23.5 29.5H17.5" stroke={dark ? '#1E5439' : '#F4FAF2'} strokeWidth="3.3" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 35.5C22 27.4 28.7 20.8 39 15.8C38.2 25.7 31.3 33 20.2 35.5" stroke={dark ? '#43845F' : '#B8DCC0'} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 33.4C26.7 29.1 30.5 25.8 35 23.1" stroke={dark ? '#43845F' : '#B8DCC0'} strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="10" cy="35.5" r="2" fill={dark ? '#43845F' : '#B8DCC0'}/>
      </svg>
    </span>
    <span className="flex flex-col leading-none">
      <span className={`font-[Manrope] text-[18px] font-extrabold tracking-[-.055em] ${inverse ? 'text-[#173B2B]' : light ? 'text-white' : 'text-[#1D3328]'}`}>Porshure Green</span>
      <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-[.23em] ${inverse ? 'text-[#66816E]' : light ? 'text-[#A9D2B2]' : 'text-[#708A76]'}`}>Document Support</span>
    </span>
  </Link>;
}