import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PricingCard from "./PricingCard";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function PricingSection({
  title = "Choose Your Perfect Plan",
  subtitle = "Flexible pricing options designed to grow with your business",
  pricingPlans,
}) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-linear-to-br  py-16 md:py-24"
      data-testid="section-pricing"
    >
      <div className="absolute inset-0 bg-linear-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
            data-testid="heading-pricing-title"
          >
            {title}
          </h2>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-pricing-subtitle"
          >
            {subtitle}
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            speed={600}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 24 },
            }}
            className="!pb-12 [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:h-auto"
            data-testid="carousel-pricing"
            onBeforeInit={(swiper) => {
              if (swiper.params.navigation) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
          >
            {pricingPlans?.map((plan, index) => (
              <SwiperSlide key={index} className="h-full flex">
                <PricingCard {...plan} />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 hover-elevate active-elevate-2 transition-all"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            ref={nextRef}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 hover-elevate active-elevate-2 transition-all"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        </div>
      </div>

      <style>{`
        .swiper-pagination {
          bottom: 0 !important;
        }
        .swiper-pagination-bullet {
          background: hsl(var(--primary));
          opacity: 0.4;
          width: 10px;
          height: 10px;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
}

// className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-pink-900/30 py-16 md:py-24"
