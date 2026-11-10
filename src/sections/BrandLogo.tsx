import { Link } from 'react-router';

export default function BrandLogo({ inverse = false, light = false }: { inverse?: boolean; light?: boolean }) {
  return (
    <Link to="/" aria-label="Porshure Green home" className="inline-flex items-center gap-3">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[15px] bg-[#E8F2E9] shadow-sm ring-1 ring-black/5">
        <img src="/images/porshure-green-mark.svg" alt="" aria-hidden="true" width="38" height="38" className="h-[38px] w-[38px] object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-[Manrope] text-[18px] font-extrabold tracking-[-.055em] ${inverse ? 'text-[#173B2B]' : light ? 'text-white' : 'text-[#1D3328]'}`}>Porshure Green</span>
        <span className={`mt-1.5 text-[9px] font-bold uppercase tracking-[.23em] ${inverse ? 'text-[#66816E]' : light ? 'text-[#A9D2B2]' : 'text-[#708A76]'}`}>Document Support</span>
      </span>
    </Link>
  );
}
