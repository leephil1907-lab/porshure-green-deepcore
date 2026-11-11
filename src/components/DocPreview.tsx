type DocPreviewProps = {
  color: string;
  title: string;
  variant?: 'letter' | 'form' | 'certificate';
  className?: string;
};

/**
 * A small, purely decorative document mock-up drawn in SVG.
 * Used to give each document category a real visual sample instead of an icon.
 */
export default function DocPreview({ color, title, variant = 'letter', className = '' }: DocPreviewProps) {
  const lines = variant === 'certificate' ? [46, 42, 38, 30] : [46, 44, 34, 41, 26];

  return (
    <svg viewBox="0 0 220 300" className={className} role="img" aria-label={`Sample ${title} document`}>
      <defs>
        <linearGradient id={`pg-${variant}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FBFCF9" />
        </linearGradient>
      </defs>

      {/* page */}
      <rect x="10" y="6" width="200" height="288" rx="10" fill={`${color}22`} transform="rotate(-3 110 150)" />
      <rect x="14" y="2" width="196" height="288" rx="10" fill={`url(#pg-${variant})`} stroke="#E2E7DE" strokeWidth="1" />

      {/* header band */}
      <rect x="14" y="2" width="196" height="34" rx="10" fill={color} opacity="0.12" />
      <rect x="14" y="24" width="196" height="12" fill={color} opacity="0.12" />
      <circle cx="34" cy="19" r="7" fill={color} opacity="0.85" />
      <path d="M31 19h6M34 16v6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="48" y="14" width="86" height="4" rx="2" fill={color} opacity="0.55" />
      <rect x="48" y="22" width="54" height="3" rx="1.5" fill="#C8D2C4" />

      {/* document title */}
      <text x="26" y="58" fontSize="10.5" fontWeight="700" fill="#1D3328" fontFamily="Manrope, system-ui, sans-serif">
        {title.length > 26 ? `${title.slice(0, 25)}…` : title}
      </text>
      <rect x="26" y="66" width="60" height="3" rx="1.5" fill={color} opacity="0.5" />

      {/* body lines */}
      {lines.map((width, i) => (
        <rect key={i} x="26" y={82 + i * 15} width={width * 3.1} height="5" rx="2.5" fill="#E4E9E0" />
      ))}

      {/* form fields for the form variant */}
      {variant === 'form' ? (
        <>
          <rect x="26" y="162" width="60" height="5" rx="2.5" fill="#D8E0D4" />
          <rect x="26" y="172" width="168" height="16" rx="4" fill="#F2F5EF" stroke="#DDE4D8" />
          <rect x="26" y="196" width="60" height="5" rx="2.5" fill="#D8E0D4" />
          <rect x="26" y="206" width="168" height="16" rx="4" fill="#F2F5EF" stroke="#DDE4D8" />
        </>
      ) : null}

      {/* signature */}
      <path
        d="M26 232c9-8 14 6 22 0s10-9 16-3 9 8 17 3"
        fill="none"
        stroke="#4C6156"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.65"
      />
      <rect x="26" y="242" width="76" height="1.4" rx="0.7" fill="#CFD8CB" />
      <text x="26" y="256" fontSize="5.5" fill="#8A9A8E" fontFamily="DM Sans, system-ui, sans-serif" letterSpacing="0.6">
        SIGNATURE
      </text>

      {/* stamp */}
      <g transform="translate(150 232) rotate(-12)">
        <circle r="20" fill="none" stroke={color} strokeWidth="1.6" opacity="0.85" />
        <circle r="15.5" fill="none" stroke={color} strokeWidth="0.8" opacity="0.65" />
        <path d="M-6 0.5l4 4 8-8.5" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text y="11" textAnchor="middle" fontSize="4.4" fontWeight="700" fill={color} letterSpacing="0.7" fontFamily="Manrope, system-ui, sans-serif">
          REVIEWED
        </text>
      </g>

      {/* page folds */}
      <path d="M186 2h14a10 10 0 0 1 10 10v10z" fill="#F1F4ED" />
    </svg>
  );
}
