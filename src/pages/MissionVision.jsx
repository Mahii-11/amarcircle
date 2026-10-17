import { Target, Eye, Rocket, ShieldCheck } from 'lucide-react';

const MissionVision = () => {
  return (
    <section className="py-20 bg-slate-50/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">Purpose</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">
            We are committed to revolutionizing your digital experience through cutting-edge technology and unwavering support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Mission Card */}
          <div className="group relative bg-white p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2">
            {/* Soft Shadow Layer */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Amar circle broadband connection is set out to do the things our customers want in an Internet service providing company. Which is to provide the <span className="font-semibold text-slate-900">most reliable service</span>, coupled with the most sophisticated and modern equipment available.
              </p>
              
               {/* 
               <div className="mt-8 flex items-center text-purple-600 font-semibold cursor-pointer group/link">
                <span>Learn more</span>
                <Rocket className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>
               */}
            </div>
          </div>

          {/* Vision Card */}
          <div className="group relative bg-white p-10 rounded-3xl transition-all duration-500 hover:-translate-y-2">
            {/* Soft Shadow Layer */}
            <div className="absolute inset-0 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Delivering <span className="font-semibold text-slate-900">innovation and delightful customer experience</span> through passion, commitment and technology for a brighter tomorrow. We strive to be the bridge to your digital future.
              </p>
              
             {/*
              <div className="mt-8 flex items-center text-blue-600 font-semibold cursor-pointer group/link">
                <span>Our values</span>
                <ShieldCheck className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </div>
             */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;