/** An original SVG illustration, not an image of the recording artist. Replace with licensed media if desired. */
export function DivaIllustration({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 360 460" fill="none" role="img" aria-label="Ilustração original de uma diva natalina com vestido vermelho e cabelo volumoso">
    <defs>
      <linearGradient id="redDress" x1="40" x2="300" y1="270" y2="440" gradientUnits="userSpaceOnUse"><stop stopColor="#FF5261"/><stop offset=".47" stopColor="#CB203A"/><stop offset="1" stopColor="#710F35"/></linearGradient>
      <linearGradient id="hair" x1="80" x2="270" y1="63" y2="300"><stop stopColor="#E1A64C"/><stop offset=".45" stopColor="#9A5036"/><stop offset="1" stopColor="#4D263C"/></linearGradient>
      <linearGradient id="skin" x1="140" x2="235" y1="160" y2="260"><stop stopColor="#FAD3B8"/><stop offset="1" stopColor="#CB836C"/></linearGradient>
      <linearGradient id="sparkle" x1="60" x2="290" y1="50" y2="390"><stop stopColor="#FFF7CD"/><stop offset="1" stopColor="#FFCC5B"/></linearGradient>
      <filter id="shadow"><feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#310B23" floodOpacity=".4"/></filter>
    </defs>
    <g opacity=".86" fill="#FFE7A0"><path d="M45 88v-11m0 34V99M29 94h11m11 0h11" stroke="#FFE7A0" strokeWidth="3" strokeLinecap="round"/><path d="M301 134v-11m0 34v-12m-16-5h11m11 0h11" stroke="#FFE7A0" strokeWidth="3" strokeLinecap="round"/><circle cx="63" cy="191" r="3"/><circle cx="295" cy="257" r="4"/><circle cx="73" cy="328" r="2"/><circle cx="281" cy="75" r="3"/></g>
    <g filter="url(#shadow)">
      <path d="M136 127C91 73 61 133 78 175c-42 45-16 76 2 86-16 61 27 89 59 53 13 34 71 37 82-4 35 41 81-6 56-55 25-23 26-57 2-80 15-44-10-89-54-80-23-35-66-37-89 32Z" fill="url(#hair)" />
      <path d="M119 185c-36 27-27 68-11 90m125-87c25 25 29 59 12 94" stroke="#F3B55D" strokeOpacity=".4" strokeWidth="12" strokeLinecap="round"/>
      <path d="M165 255h31v48h-31z" fill="#D99578"/>
      <path d="M128 285c23-14 72-16 100 0 18 46 52 90 62 158H69c10-67 44-116 59-158Z" fill="url(#redDress)" />
      <path d="M116 300c-10 24-21 64-34 107m167-107c12 27 22 60 35 107" stroke="#F0AE92" strokeWidth="24" strokeLinecap="round"/>
      <path d="M121 292c10-10 19-15 39-17l19 28 17-28c21 2 32 7 45 17l-17 33-44 13-43-13-16-33Z" fill="#F4ECE1"/>
      <path d="m166 275 13 26 15-26" stroke="#D9AB82" strokeWidth="3"/>
      <path d="M146 164c-9-12-20 6-12 24 2 7 7 12 14 10 8 27 18 50 39 51 26 0 40-28 45-53 10 1 17-14 13-24-3-10-12-8-15-3-2-25-19-52-50-53-28-1-36 24-34 48Z" fill="url(#skin)"/>
      <path d="M141 167c10-22 11-38 15-47 23 24 52 33 79 30-3-47-32-69-71-58-26 9-36 39-23 75Z" fill="url(#hair)" />
      <path d="M156 183c7-5 14-5 20 0m23 0c7-5 14-5 20 0" stroke="#4E3040" strokeWidth="3.5" strokeLinecap="round"/>
      <path d="M178 213c8 6 18 6 27-1" stroke="#9D4555" strokeWidth="4" strokeLinecap="round"/>
      <path d="M180 201c6 3 10 3 15 0" stroke="#BE755F" strokeWidth="2" strokeLinecap="round"/>
      <path d="M122 112c-2-39 41-60 78-49 26 7 40 24 48 46-36 4-89 7-126 3Z" fill="#CB2B45" />
      <path d="M116 112c40-12 95-11 137 0" stroke="#FFF7E9" strokeWidth="14" strokeLinecap="round" />
      <circle cx="222" cy="62" r="16" fill="#FFF8E6" />
      <path d="M124 292c21 16 94 18 114 0" stroke="#FFFAEE" strokeWidth="12" strokeLinecap="round"/>
      <path d="M126 335c31 14 69 15 104 0" stroke="#F7A8AD" strokeOpacity=".5" strokeWidth="3"/>
      <path d="M94 441h181" stroke="#FFD9AC" strokeWidth="10" strokeLinecap="round"/>
    </g>
    <path d="m42 271 8 14 15 3-12 11 2 15-13-8-14 8 3-15-12-11 16-3 7-14ZM291 344l6 11 12 3-9 9 2 12-11-6-11 6 2-12-9-9 12-3 6-11Z" fill="url(#sparkle)" />
  </svg>;
}
