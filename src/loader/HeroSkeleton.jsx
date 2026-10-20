// Same layout as the hero: full-bleed background, content on the right.
// Soft glass placeholders over a lavender wash, with a gently pulsing Wi-Fi mark.
const Glass = ({ className = "", tint = "bg-white/55" }) => (
  <div className={`sk-shimmer ring-1 ring-white/70 shadow-sm shadow-purple-200/40 ${tint} ${className}`} />
);

export default function HeroSkeleton({ innerRef, pull = 0 }) {
  return (
    <section
      ref={innerRef}
      style={{ marginTop: -pull }}
      className="relative w-full md:min-h-[calc(100vh-64px)] overflow-hidden bg-[linear-gradient(135deg,#e6dcff_0%,#efe8ff_45%,#d7e4ff_100%)]"
      aria-busy="true"
      aria-label="Loading"
    >
      {/* soft light wash + glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_45%,rgba(124,58,237,0.18),transparent_45%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.18),transparent_40%)]" />
      <div className="sk-shimmer absolute inset-x-0 top-0 h-72 sm:h-96 md:h-full" />
      <div className="absolute inset-0 pointer-events-none md:hidden bg-[linear-gradient(180deg,rgba(239,232,255,0)_0,rgba(239,232,255,0)_12rem,#efe8ff_18rem)] sm:bg-[linear-gradient(180deg,rgba(239,232,255,0)_0,rgba(239,232,255,0)_16rem,#efe8ff_24rem)]" />

      {/* pulsing Wi-Fi mark where the picture will be */}
      <div className="absolute left-1/2 md:left-[28%] top-28 sm:top-40 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 animate-pulse">
        <svg viewBox="0 0 64 64" className="w-20 h-20 md:w-28 md:h-28" fill="none" strokeLinecap="round" strokeWidth="4">
          <defs>
            <linearGradient id="hero-sk-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#A21CAF" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <g stroke="url(#hero-sk-grad)" opacity="0.35">
            <path d="M6 24a37 37 0 0 1 52 0" />
            <path d="M15 33a24 24 0 0 1 34 0" />
            <path d="M24 42a11 11 0 0 1 16 0" />
          </g>
          <circle cx="32" cy="52" r="3.5" fill="url(#hero-sk-grad)" opacity="0.45" />
        </svg>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10 pt-72 sm:pt-[22rem] pb-16 md:pt-24 md:pb-44 md:min-h-[calc(100vh-64px)] flex items-center">
        <div className="w-full md:w-[38%] md:ml-auto md:mr-2 lg:mr-6 flex flex-col items-center md:items-start">
          {/* badge */}
          <Glass className="h-8 w-48 rounded-full mb-6" />

          {/* title */}
          <Glass className="h-9 sm:h-11 lg:h-12 w-3/4 rounded-full mb-3" tint="bg-white/60" />
          <Glass className="h-9 sm:h-11 lg:h-12 w-[92%] rounded-full mb-3 !bg-gradient-to-r from-purple-300/55 to-blue-300/55" tint="" />
          <Glass className="h-9 sm:h-11 lg:h-12 w-1/2 rounded-full mb-7" tint="bg-white/60" />

          {/* description */}
          <Glass className="h-3.5 w-full max-w-md rounded-full mb-2.5" tint="bg-white/45" />
          <Glass className="h-3.5 w-5/6 max-w-md rounded-full mb-9" tint="bg-white/45" />

          {/* buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Glass className="h-12 w-full sm:w-44 rounded-xl !bg-gradient-to-r from-purple-400/50 to-blue-400/50" tint="" />
            <Glass className="h-12 w-full sm:w-44 rounded-xl" tint="bg-white/50" />
          </div>
        </div>
      </div>
    </section>
  );
}
