import AboutPage from "./Aboutus";
import Services from "./Services";
import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Rocket, ArrowRight, Phone, ArrowUp } from "lucide-react";
import { useState, useEffect, useLayoutEffect, useRef } from "react";
import GirlUsing from "../assets/images/girlusing.png";
import ContactUs from "./ContactUs";
import PayBill from "./PayBill";
import Faq from "../components/Faq";
import PackageSlider from "./PackageSlider";
import MissionVision from "./MissionVision";
import { getHeroData } from "../services/api";
import HeroSkeleton from "../loader/HeroSkeleton";

// Optional local hero background: drop src/assets/images/hero-bg.(png|jpg|webp) to override the API image.
const LOCAL_HERO_BG = Object.values(
  import.meta.glob("../assets/images/hero-bg.{png,jpg,jpeg,webp}", { eager: true, import: "default" })
)[0];

function Home() {
  return (
    <div>
      <HomePage />
      <AboutPage />
      <Services />
      <MissionVision />
      <PackageSlider/>
      <PayBill />
      <Faq />
    </div>
  );
}

function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
      setShowScrollTop(currentScroll > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <div className="w-full overflow-x-clip bg-background">
     

      <HeroSection />

      {showScrollTop && (
        <Button
  onClick={scrollToTop}
  data-testid="button-scroll-top"
  size="icon"
  className="
    fixed bottom-28 right-6 z-50
    h-12 w-12 rounded-full
    bg-white/10 backdrop-blur-md
    border border-white/20
    shadow-lg shadow-black/20
    text-blue-500
    hover:bg-white/20 hover:scale-110
    active:scale-95
    transition-all duration-300
    group
  "
  style={
    !shouldReduceMotion
      ? {
          transition: "all 0.3s ease",
        }
      : undefined
  }
>
  <ArrowUp
    className="
      w-5 h-5
      text-blue-600
      group-hover:text-blue-700
      transition-colors
    "
  />
</Button>
      )}
    </div>
  );
}

function HeroSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const response = await getHeroData();
        setHero(response);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  // Pull the hero up so it starts right under the fixed header (no gap, any layout above it).
  const secRef = useRef(null);
  const [pull, setPull] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      const el = secRef.current;
      const header = document.querySelector("header");
      if (!el || !header) return;
      const natural = el.getBoundingClientRect().top + window.scrollY + pull;
      const next = Math.max(0, Math.round(natural - header.offsetHeight));
      if (next !== pull) setPull(next);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  });

  // Pick text tone (desktop) from the brightness of the image area behind the text.
  const heroImage = (LOCAL_HERO_BG || hero?.image || GirlUsing).replace(/ /g, "%20"); // API file names may contain spaces
  const [darkBg, setDarkBg] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const w = 48;
        const h = 32;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        // cover-crop like the CSS background (centered)
        const ratio = Math.max(w / img.width, h / img.height);
        const dw = img.width * ratio;
        const dh = img.height * ratio;
        ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        // text sits on the right half
        const { data } = ctx.getImageData(Math.floor(w * 0.5), 0, Math.floor(w * 0.5), h);
        let sum = 0;
        for (let i = 0; i < data.length; i += 4) {
          sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
        }
        setDarkBg(sum / (data.length / 4) < 140);
      } catch {
        setDarkBg(true); // cross-origin image can't be sampled
      }
    };
    img.onerror = () => setDarkBg(true); // cross-origin image without CORS headers
    img.src = heroImage;
  }, [heroImage]);

  const tone = darkBg
    ? {
        title: "md:text-[#0a1145] md:[text-shadow:0_0_2px_rgba(255,255,255,0.7),0_2px_14px_rgba(255,255,255,0.5)]",
        accent: "md:[filter:drop-shadow(0_0_8px_rgba(255,255,255,0.55))_drop-shadow(0_0_16px_rgba(162,28,175,0.45))]",
        text: "md:text-[#3d4f7c] md:[text-shadow:0_0_2px_rgba(255,255,255,0.7),0_1px_12px_rgba(255,255,255,0.55)]",
      }
    : {
        title: "md:text-[#0a1145] md:[text-shadow:0_1px_10px_rgba(255,255,255,0.6)]",
        accent: "md:[filter:drop-shadow(0_0_6px_rgba(168,85,247,0.55))_drop-shadow(0_0_16px_rgba(59,130,246,0.45))]",
        text: "md:text-[#3d4f7c] md:[text-shadow:0_1px_8px_rgba(255,255,255,0.6)]",
      };

  // title: first word normal, middle words gradient, last word after line break
  const words = (hero?.title || "Experience lightning-fast internet").split(" ");
  const first = words[0];
  const last = words.length > 1 ? words[words.length - 1] : "";
  const middle = words.slice(1, -1).join(" ");

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) return <HeroSkeleton innerRef={secRef} pull={pull} />;

  return (
    <section
      ref={(el) => {
        secRef.current = el;
        ref(el);
      }}
      style={{ marginTop: -pull }}
      className="relative w-full md:min-h-[calc(100vh-64px)] overflow-hidden bg-[linear-gradient(135deg,#e6dcff_0%,#efe8ff_45%,#d7e4ff_100%)]"
    >
      {/* BACKGROUND IMAGE (slightly more vivid) */}
      <div
        role="img"
        aria-label={hero?.title || "Girl using laptop"}
        className="absolute inset-x-0 top-0 h-72 sm:h-96 md:h-full bg-cover bg-no-repeat bg-[position:50%_25%] md:bg-center"
        style={{ backgroundImage: `url("${heroImage}")` }}
      />
      {/* MOBILE-ONLY FADE */}
      <div className="absolute inset-0 pointer-events-none md:hidden bg-[linear-gradient(180deg,rgba(239,232,255,0)_0,rgba(239,232,255,0)_12rem,#efe8ff_18rem)] sm:bg-[linear-gradient(180deg,rgba(239,232,255,0)_0,rgba(239,232,255,0)_16rem,#efe8ff_24rem)]" />
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 md:px-6 lg:px-10 relative z-10 pt-72 sm:pt-[22rem] pb-16 md:pt-24 md:pb-44 md:min-h-[calc(100vh-64px)] flex items-center">
        <motion.div
          className="w-full md:w-[38%] md:ml-auto md:mr-2 lg:mr-6 text-center md:text-left"
          initial={!shouldReduceMotion ? { opacity: 0, y: 20 } : false}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge className={`inline-flex items-center gap-2 bg-[#F0E7FF]/45 hover:bg-[#F0E7FF]/45 backdrop-blur-md backdrop-saturate-150 text-[#4b1fc7] border border-white/60 px-3 py-1.5 mb-5 text-sm font-semibold rounded-full shadow-sm shadow-purple-500/10 `}>
            <Rocket className="w-4 h-4" />
            {hero?.badge || "Welcome to Amarcircle"}
          </Badge>

          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-[#0a1145] mb-5 ${tone.title}`}>
            {first}{" "}
            <span className={`block whitespace-nowrap bg-gradient-to-r from-[#A21CAF] to-[#2563EB] bg-clip-text text-transparent [text-shadow:none] ${tone.accent}`}>
              {middle}
            </span>
            {last}
          </h1>

          <p className={`text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0 text-[#3d4f7c] ${tone.text}`}>
            {hero?.short_description ||
              "Our internet services are designed to give you lightning-fast speeds, reliable connectivity and efficient streaming."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            <Button
              onClick={() => scrollToSection("package")}
              className="w-full sm:w-auto h-12 px-6 text-base font-semibold rounded-xl text-white border-0 bg-gradient-to-r from-[#8b22f0]/85 via-[#5b3df0]/85 to-[#2f7cf6]/85 backdrop-blur-md shadow-[0_0_22px_rgba(124,58,237,0.55)] hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_32px_rgba(99,102,241,0.75)] transition-all duration-300"
            >
              Pricing Plans
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              onClick={() => scrollToSection("contact")}
              variant="outline"
              className="w-full sm:w-auto h-12 px-6 text-base font-semibold rounded-xl border-0 bg-white/35 hover:bg-white/50 backdrop-blur-md backdrop-saturate-150 text-[#0a1145] hover:text-[#0a1145] shadow-[0_0_22px_rgba(255,255,255,0.6)] hover:shadow-[0_0_32px_rgba(255,255,255,0.85)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </div>
        </motion.div>
      </div>

      {/* BOTTOM WAVE */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-12 md:h-16 pointer-events-none"
      >
        <path d="M0,40 C260,0 520,10 760,38 C1000,66 1220,56 1440,20 L1440,80 L0,80 Z" fill="#a78bfa" fillOpacity="0.25" />
        <path d="M0,58 C240,28 500,30 740,52 C980,74 1220,66 1440,42 L1440,80 L0,80 Z" fill="#ffffff" />
      </svg>
    </section>
  );
}


export default Home;
