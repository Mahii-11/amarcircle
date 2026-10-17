import AboutPage from "./Aboutus";
import Services from "./Services";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Rocket, ArrowRight, Phone, ArrowUp, Contact } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import GirlUsing from "../assets/images/girlusing.png";
import ContactUs from "./ContactUs";
import PayBill from "./PayBill";
import Faq from "../components/Faq";
import PackageSlider from "./PackageSlider";
import MissionVision from "./MissionVision";

function Home() {
  return (
    <div>
      <HomePage />
      <AboutPage />
      <Services />
      <MissionVision />
      <PackageSlider/>
      <ContactUs />
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
    <div className="w-full overflow-x-hidden bg-background">
     

      <HeroSection />

      {showScrollTop && (
        <Button
  onClick={scrollToTop}
  data-testid="button-scroll-top"
  size="icon"
  className="
    fixed bottom-6 right-6 z-50
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
  const imageRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e) => {
    if (!imageRef.current || shouldReduceMotion) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[auto] md:min-h-screen py-6 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            ref={imageRef}
            className="flex justify-center items-center w-full order-2 md:order-1"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={!shouldReduceMotion ? { opacity: 0, scale: 0.9 } : false}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="w-full flex justify-center"
              style={!shouldReduceMotion ? { rotateX, rotateY } : {}}
            >
              <motion.div
                className="w-[220px] xs:w-[260px] sm:w-[320px] md:w-[420px] 
                           aspect-[3/4] rounded-2xl shadow-xl overflow-hidden"
                animate={!shouldReduceMotion ? { y: [0, -15, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <img
                  src={GirlUsing}
                  alt="Girl using laptop"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* TEXT */}
          <motion.div
            className="order-1 md:order-2 text-center md:text-left"
            initial={!shouldReduceMotion ? { opacity: 0, x: 30 } : false}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Badge className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 mb-4 text-sm">
              <Rocket className="w-4 h-4" />
              Welcome to Amarcircle
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Experience{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                lightning-fast
              </span>
              <br className="hidden sm:block" />
              internet
            </h1>

            <p className="text-sm sm:text-base md:text-lg mb-6 max-w-md mx-auto md:mx-0 text-muted-foreground">
              Our internet services are designed to give you lightning-fast
              speeds, reliable connectivity and efficient streaming.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <Button
                onClick={() => scrollToSection("package")}
                className="w-full sm:w-auto px-5 py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-500 text-white"
              >
                Pricing Plans
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="w-full sm:w-auto px-5 py-3 text-sm sm:text-base"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Home;
