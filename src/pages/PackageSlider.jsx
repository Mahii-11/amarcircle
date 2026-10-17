import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { FiWifi } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { useEffect, useState } from "react";
import { getPackageData } from "../services/api";
import PackageSliderSkeleton from "../loader/PackageSliderSkeleton";

export default function PackageSlider() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const data = await getPackageData();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);


  if (loading) { return <PackageSliderSkeleton />; }






  return (
    <section id="package">
       <div className="bg-linear-to-b from-[#f5f7ff] to-[#eef1ff] py-20">
      <div className="max-w-7xl mx-auto px-4">

        <Swiper
          modules={[Autoplay]}
          spaceBetween={40}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {packages.map((pkg, index) => (
            <SwiperSlide key={index}>
              <div className="relative mt-10 bg-white/80 backdrop-blur-lg border border-indigo-100 rounded-3xl shadow-xl p-10 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                {/* Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                  <div className="bg-linear-to-r from-purple-600 to-blue-500  text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    {pkg.badge}
                  </div>
                </div>

                {/* Icon */}
                <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white text-4xl shadow-lg mb-6">
                  <FiWifi />
                </div>

                {/* Speed */}
                <h2 className="text-4xl font-bold text-indigo-600 text-center">
                  {pkg.speed}
                </h2>

                {/* Price */}
                <p className="text-center text-gray-500 mt-2 mb-8 text-lg">
                  {pkg.price}
                </p>

                {/* Feature Title */}
                <div className="bg-linear-to-r from-indigo-500 to-blue-500 text-white py-2 text-center rounded-lg font-semibold mb-6">
                  Package features
                </div>

                {/* Features */}
                <ul className="space-y-3 text-gray-600">
                  {[
                    "24 Hours Unlimited",
                    "Largest FTB Server",
                    "Live TV",
                    "Fiber Optics",
                    "BDIX Connected",
                    "Low Latency",
                    "Public IP Available",
                    "OTC Fee - 1,000 Taka",
                    "24/7 Customer Care",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <BsCheck2Circle className="text-indigo-500 text-lg" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <button className="mt-10 w-full py-3 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Order Package →
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
    </section>
  );
}
