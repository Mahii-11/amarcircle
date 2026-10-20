import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getFaqData } from "../services/api";
import FaqSkeleton from "../loader/FaqSkeleton";

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await getFaqData();
        setFaqs(response);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);


   const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <FaqSkeleton />;

  return (
    <section className="w-full py-12 md:py-20 px-4 bg-gray-50 flex justify-center">
      
      <div className="w-full max-w-3xl">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-10">
          <span className="bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text">
            Frequently Asked Questions
          </span>
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className={`rounded-xl sm:rounded-2xl border transition-all duration-300 
                ${isOpen 
                  ? "bg-white shadow-md border-blue-200" 
                  : "bg-white/70 border-gray-200"}
                `}
              >
                {/* BUTTON */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left px-4 py-4 sm:px-5 sm:py-5"
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 pr-4">
                    {faq.q}
                  </span>

                  <div className="flex-shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </button>

                {/* ANSWER */}
                <div
                  className={`grid transition-all duration-300 ease-in-out 
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}