function Logo({ size = 48 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="My Pocket logo"
    >
      <defs>
        <radialGradient id="suede" cx="40%" cy="55%" r="70%">
          <stop offset="0%" stopColor="#F0AE6A" />
          <stop offset="55%" stopColor="#D98A45" />
          <stop offset="100%" stopColor="#9A5520" />
        </radialGradient>
        <linearGradient id="neck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#C77A38" />
          <stop offset="45%" stopColor="#E9A564" />
          <stop offset="100%" stopColor="#A9612A" />
        </linearGradient>
        <radialGradient id="patch" cx="45%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#9A6440" />
          <stop offset="100%" stopColor="#5E3519" />
        </radialGradient>
        <linearGradient id="tab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6A3A1C" />
          <stop offset="100%" stopColor="#3E1F0C" />
        </linearGradient>
        <radialGradient id="rivet" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F6E7B0" />
          <stop offset="100%" stopColor="#8E7434" />
        </radialGradient>
        <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* shadow under the pouch */}
      <ellipse cx="64" cy="114" rx="34" ry="5" fill="url(#shadow)" />

      {/* long cord loop */}
      <path
        d="M50 46 C36 30 34 14 50 12 C62 11 74 22 82 40"
        stroke="#C98545" strokeWidth="2.6" fill="none" strokeLinecap="round"
      />

      {/* gathered neck */}
      <path
        d="M50 46 C47 38 47 30 50 24 C56 22 72 22 78 24 C81 30 81 38 78 46 Z"
        fill="url(#neck)"
      />
      <g stroke="#8A4C1C" strokeOpacity="0.5" strokeWidth="1" fill="none" strokeLinecap="round">
        <path d="M56 24 C55 32 56 40 57 46" />
        <path d="M64 23 C63 31 64 39 64 46" />
        <path d="M72 24 C73 32 72 40 71 46" />
      </g>
      <path d="M50 24 C56 21 72 21 78 24 C72 26 56 26 50 24 Z" fill="#7A4318" />

      {/* pouch body */}
      <path
        d="M50 46 C34 54 26 74 28 92 C30 108 98 108 100 92 C102 74 94 54 78 46 Z"
        fill="url(#suede)"
      />
      <g stroke="#8A4C1C" strokeOpacity="0.35" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M54 50 C46 58 40 70 40 80" />
        <path d="M74 50 C82 58 88 68 89 78" />
      </g>
      <g fill="#7A4318" opacity="0.18">
        <circle cx="40" cy="88" r="1" />
        <circle cx="46" cy="96" r="0.8" />
        <circle cx="86" cy="92" r="1" />
        <circle cx="90" cy="70" r="0.8" />
        <circle cx="36" cy="72" r="0.9" />
        <circle cx="80" cy="100" r="0.8" />
        <circle cx="52" cy="102" r="1" />
        <circle cx="94" cy="84" r="0.8" />
      </g>

      {/* cord through the tabs */}
      <path
        d="M46 49 C56 52 72 52 82 49"
        stroke="#C98545" strokeWidth="2.6" fill="none" strokeLinecap="round"
      />

      {/* leather tabs with rivets */}
      <path d="M47 44 L55 45 L54 55 L50 58 L46 54 Z" fill="url(#tab)" />
      <circle cx="50.5" cy="52" r="1.9" fill="url(#rivet)" />
      <path d="M60 45 L68 45 L68 56 L64 59 L60 56 Z" fill="url(#tab)" />
      <circle cx="64" cy="53" r="1.9" fill="url(#rivet)" />
      <path d="M73 45 L81 44 L82 54 L78 58 L74 55 Z" fill="url(#tab)" />
      <circle cx="77.5" cy="52" r="1.9" fill="url(#rivet)" />

      {/* hanging cord end */}
      <path
        d="M82 49 C92 56 96 70 92 82"
        stroke="#C98545" strokeWidth="2.6" fill="none" strokeLinecap="round"
      />

      {/* oval patch with stitching */}
      <ellipse cx="64" cy="82" rx="15" ry="18" fill="url(#patch)" />
      <ellipse
        cx="64" cy="82" rx="12.5" ry="15.5" fill="none"
        stroke="#2E1608" strokeWidth="1" strokeDasharray="2 1.8" opacity="0.8"
      />

      {/* embossed rupee sign */}
      <text
        x="64.8" y="91.8" textAnchor="middle" fontSize="24" fontWeight="bold"
        fontFamily="Georgia, 'Times New Roman', serif" fill="#2E1608" opacity="0.7"
      >
        ₹
      </text>
      <text
        x="64" y="91" textAnchor="middle" fontSize="24" fontWeight="bold"
        fontFamily="Georgia, 'Times New Roman', serif" fill="#E8B988"
      >
        ₹
      </text>
    </svg>
  );
}

export default Logo;