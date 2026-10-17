import {
  FaPlay,
  FaFilm,
  FaFutbol,
  FaNewspaper,
  FaWifi,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

const entertainmentCards = [
    {
      id: 1,
      title: "Watch Live Match",
      description: "Enjoy buffer-free FIFA World Cup live streaming.",
      button: "Watch Now",
      icon: <FaFutbol />,
      badge: "LIVE",
      glow: "from-[#0b63ff]/40 to-[#0066ff]/10",
      border: "border-[#0b63ff]/20",
      image:
        "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Movies & Entertainment",
      description: "Stream trending movies and entertainment anytime.",
      button: "Explore Movies",
      icon: <FaFilm />,
      badge: "TRENDING",
      glow: "from-[#0b63ff]/40 to-[#0066ff]/10",
      border: "border-[#0b63ff]/20",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Highlights & Goals",
      description: "Catch every unforgettable moment instantly.",
      button: "Watch Highlights",
      icon: <FaPlay />,
      badge: "HOT",
      glow: "from-[#0b63ff]/40 to-[#0066ff]/10",
      border: "border-[#0b63ff]/20",
      image:
        "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Schedule & News",
      description: "Stay updated with fixtures, standings and football news.",
      button: "See Updates",
      icon: <FaNewspaper />,
      badge: "UPDATE",
      glow: "from-[#0b63ff]/40 to-[#0066ff]/10",
      border: "border-[#0b63ff]/20",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  export default function EntertainmentLandingPage() {
    return (
      <div className="bg-stone-100 text-white overflow-hidden -mt-20">
        <section className="relative min-h-screen flex items-center">

          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="/images/CR7.jpg"
              alt="hero image"
              className="w-full h-full object-cover scale-100"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-black/40" />
          </div>

          {/* Stadium Glow */}
          <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] bg-[#0b63ff]/20 blur-[140px]" />
          <div className="absolute bottom-10 right-20 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px]" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center pt-24">
            <div>
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl mb-8">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm text-white/80">FIFA WORLD CUP LIVE</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
                Enjoy FIFA World Cup Live With <span className="text-[#0b63ff]">Amarcircle</span>
              </h1>

              <p className="mt-8 text-lg text-white/70 max-w-xl leading-relaxed">
                Watch live matches, movies, highlights and entertainment in one place with ultra-fast streaming experience.
              </p>

              <div className="flex flex-wrap gap-5 mt-10">
                <button className="group px-8 h-14 rounded-2xl bg-[#0b63ff] hover:bg-[#0a5bf0] transition-all duration-300 font-semibold flex items-center gap-3 shadow-[0_0_40px_rgba(11,99,255,0.45)]">
                  <FaPlay />
                  Watch Live
                </button>

                <button className="px-8 h-14 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl hover:bg-white/15 transition-all duration-300 font-semibold">
                  Explore Entertainment
                </button>
              </div>
            </div>

            {/* Floating Glass Stats */}
            <div className="relative hidden lg:flex justify-end">
              <div className="w-[420px] p-8 rounded-[32px] bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-white/60 text-sm">Streaming Quality</p>
                    <h3 className="text-3xl font-bold mt-2">4K Ultra HD</h3>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-[#0b63ff]/10 flex items-center justify-center text-[#0b63ff] text-2xl">
                    <FaWifi />
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Internet Speed</span>
                      <span>98%</span>
                    </div>

                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[98%] bg-gradient-to-r from-[#0b63ff] to-[#0066ff] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Live Stability</span>
                      <span>99%</span>
                    </div>

                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full w-[99%] bg-gradient-to-r from-[#0b63ff] to-[#005ce6] rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 p-5 rounded-2xl bg-black/20 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">Connected Users</p>
                      <h2 className="text-3xl font-black mt-2">2.5M+</h2>
                    </div>

                    <div className="w-4 h-4 rounded-full bg-[#0b63ff] animate-pulse shadow-[0_0_20px_rgba(11,99,255,1)]" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="text-xs tracking-[4px] text-white/50">SCROLL</span>
            <div className="w-[1px] h-14 bg-gradient-to-b from-[#0b63ff] to-transparent" />
          </div>
        </section>

        {/* ================= ENTERTAINMENT CARDS ================= */}
        <section className="py-20 relative -mt-7">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="mb-16">
              <p className="text-[#0b63ff] font-semibold uppercase tracking-[4px] mb-4">Entertainment Hub</p>

              <h2 className="text-4xl md:text-5xl font-black max-w-3xl leading-tight text-black">
                Everything You Need For The Ultimate <span className="text-[#0b63ff]">FIFA Experience</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {entertainmentCards.map((card) => (
                <div
                  key={card.id}
                  className={`group relative overflow-hidden rounded-[32px] border ${card.border} bg-white/5 backdrop-blur-2xl min-h-[420px] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(255,255,255,0.08)]`}
                >
                  {/* Background Image */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

                  {/* Glow */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br ${card.glow}`} />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-xl">
                        <span className="text-xs font-semibold tracking-wider">{card.badge}</span>
                      </div>

                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-xl">
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-3xl font-black mb-4">{card.title}</h3>

                    <p className="text-white/70 leading-relaxed max-w-md">{card.description}</p>

                    <button className="mt-8 inline-flex items-center gap-3 text-[#0b63ff] font-semibold group-hover:translate-x-2 transition-all duration-300">
                      {card.button}
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ISP PROMOTION SECTION ================= */}
        <section className="py-28 relative">
          <div className="absolute inset-0">
            <div className="absolute left-0 top-0 w-[350px] h-[350px] bg-[#0b63ff]/10 blur-[140px]" />
            <div className="absolute right-0 bottom-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[140px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#0b63ff] uppercase tracking-[4px] font-semibold mb-5">Ultra Fast Internet</p>

                <h2 className="text-4xl text-slate-900 md:text-5xl font-black leading-tight">Experience Ultra Fast Streaming With <span className="text-blue-600"> Amarcircle Internet</span></h2>

                <p className="mt-8 text-stone-600 text-lg leading-relaxed max-w-xl">
                  Enjoy uninterrupted FIFA live streaming, 4K movies, instant highlights and premium entertainment with blazing fast WiFi connectivity.
                </p>

                <button className="mt-10 px-8 h-14 rounded-2xl bg-[#0b63ff] hover:bg-[#0a5bf0] transition-all duration-300 font-semibold shadow-[0_0_40px_rgba(11,99,255,0.4)]">Get Connected</button>
              </div>

              {/* Speed Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="p-8 rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-2xl">
                  <h3 className="text-blue-600 text-sm mb-4">Download Speed</h3>
                  <h2 className="text-5xl text-slate-900 font-black">1GB<span className="text-[#0b63ff]">PS</span></h2>
                </div>

                <div className="p-8 rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-2xl">
                  <h3 className="text-blue-600 text-sm mb-4">Streaming Quality</h3>
                  <h2 className="text-5xl text-slate-900 font-black">4K<span className="text-blue-600">+</span></h2>
                </div>

                <div className="col-span-2 p-8 rounded-[30px] bg-blue-600 border border-[#0b63ff]/20 backdrop-blur-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white mb-4">Network Stability</p>
                      <h2 className="text-6xl font-black">99.9%</h2>
                    </div>

                    <div className="w-32 h-32 rounded-full border-[12px] border-stone-200 flex items-center justify-center text-3xl font-black shadow-[0_0_40px_rgba(11,99,255,0.5)]">5G</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

     
      </div>
    );
  }
