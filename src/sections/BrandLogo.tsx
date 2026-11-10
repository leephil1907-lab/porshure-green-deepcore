import { Link } from 'react-router';

export default function BrandLogo({ inverse = false, light = false }: { inverse?: boolean; light?: boolean }) {
  return (
    <Link to="/" aria-label="Porshure Green home" className="inline-flex items-center gap-3">
      <span className={`flex h-11 w-11 items-center justify-center rounded-[14px] ${inverse || light ? 'bg-[#E7F1E8]' : 'bg-[#173B2B]'}`}>
        <svg viewBox="0 0 40 40" width="27" height="27" fill="none" aria-hidden="true">
          <path d="M9 27.5C9 17.8 16.2 9.8 29.5 8.5C29 21.8 21.3 29.2 11.5 29.2" stroke={inverse || light ? '#1C553A' : '#C7E2C9'} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 31C15.2 23.8 20.6 18.6 28 13.2" stroke={inverse || light ? '#43845F' : '#86B995'} strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M20.2 20.2C20.2 15.7 23.7 12.2 28.2 12.2" stroke={inverse ? '#43845F' : '#86B995'} strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`text-[17px] font-semibold tracking-[-.045em] ${inverse ? 'text-[#183629]' : light ? 'text-white' : 'text-[#1D3328]'}`}>Porshure Green</span>
        <span className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[.24em] ${inverse ? 'text-[#66816E]' : light ? 'text-[#A9D2B2]' : 'text-[#708A76]'}`}>Document Support</span>
      </span>
    </Link>
  );
}
