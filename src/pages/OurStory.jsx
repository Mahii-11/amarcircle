import { Zap, Users, BadgeDollarSign, Headphones, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from "react-router-dom";

const OurStory = () => {
  return (
    <div className="bg-white min-h-[auto] md:min-h-screen font-sans text-slate-900 -mt-20 md:-mt-26">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-10 md:py-16">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-purple-100/50 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 mt-10 sm:mt-16 md:mt-20">
          <div className="max-w-4xl">
            <span className="inline-block py-1 px-3 sm:px-4 rounded-full bg-purple-100 text-purple-700 text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 sm:mb-6">
              Who We Are
            </span>

            {/* TEXT SIZE MATCHED WITH HERO */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
              We provide the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                best internet
              </span>{" "}
              for your entertainment.
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Are you searching for a reliable internet service provider to suit your entertainment needs? 
              We offer high-speed internet with dedicated real IPs, perfect for buffer-free 4K streaming and gaming.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* IMAGE */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                    alt="Our Team" 
                    className="w-full h-[260px] sm:h-[320px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent flex items-end p-4 sm:p-6 md:p-8">
                    <p className="text-white text-xs sm:text-sm md:text-base font-medium italic">
                      "Dedicated to keeping you connected, no matter what."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARDS */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 sm:gap-6">
              
              {/* Card */}
              <div className="p-5 sm:p-6 md:p-8 border border-slate-100 rounded-2xl md:rounded-3xl bg-white hover:shadow-xl transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                  <Zap size={20} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">High-speed Internet</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Our connection is designed to be stable even during significant weather changes.
                </p>
              </div>

              <div className="p-5 sm:p-6 md:p-8 border border-slate-100 rounded-2xl md:rounded-3xl bg-white hover:shadow-xl transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                  <Users size={20} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Reliable Staff</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Professional teams who arrive on time and complete jobs efficiently.
                </p>
              </div>

              <div className="p-5 sm:p-6 md:p-8 border border-slate-100 rounded-2xl md:rounded-3xl bg-white hover:shadow-xl transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                  <BadgeDollarSign size={20} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Best Value</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Ensure the best connection with quality control procedures.
                </p>
              </div>

              <div className="p-5 sm:p-6 md:p-8 border border-slate-100 rounded-2xl md:rounded-3xl bg-white hover:shadow-xl transition">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white">
                  <Headphones size={20} />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Free Consultation</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Helping you choose a pocket-friendly and high-speed package.
                </p>
              </div>

              {/* Wide Card */}
              <div className="sm:col-span-2 p-6 md:p-8 bg-slate-900 rounded-2xl md:rounded-3xl text-white flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-full flex items-center justify-center text-blue-400 border border-white/20">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">
                    Regulatory Compliant Business
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Our products meet international regulations and standards.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20 bg-purple-600 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-6 md:mb-8">
            Ready to experience the Triangle difference?
          </h2>

          <p className="text-purple-100 text-sm sm:text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
            We provide high-speed home internet following your demand.
          </p>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link to="/our-package">
              <button className="px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-purple-600 font-bold rounded-full hover:bg-slate-100 transition flex items-center">
                View Our Packages 
                <ArrowRight className="ml-2" size={16} />
              </button>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default OurStory;