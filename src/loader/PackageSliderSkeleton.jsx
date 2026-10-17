import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function PackageSliderSkeleton() {
  return (
    <section id="package">
      <div className="bg-linear-to-b from-[#f5f7ff] to-[#eef1ff] py-20">
        <div className="max-w-7xl mx-auto px-4">

          <Swiper
            spaceBetween={40}
            loop={true}
            centeredSlides={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {[...Array(3)].map((_, index) => (
              <SwiperSlide key={index}>
                <div className="relative mt-10 bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl p-10">

                  {/* Badge */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-24 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>

                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 animate-pulse mb-6"></div>

                  {/* Speed */}
                  <div className="h-10 w-32 mx-auto bg-gray-300 rounded animate-pulse"></div>

                  {/* Price */}
                  <div className="h-5 w-24 mx-auto bg-gray-200 rounded animate-pulse mt-3 mb-8"></div>

                  {/* Feature Title */}
                  <div className="h-8 w-full bg-gray-300 rounded-lg animate-pulse mb-6"></div>

                  {/* Features */}
                  <ul className="space-y-3">
                    {[...Array(6)].map((_, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </li>
                    ))}
                  </ul>

                  {/* Button */}
                  <div className="mt-10 w-full h-12 bg-gray-300 rounded-xl animate-pulse"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </section>
  );
}