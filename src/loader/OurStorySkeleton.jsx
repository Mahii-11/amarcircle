const Bar = ({ className = "" }) => (
  <div className={`sk-shimmer rounded-lg bg-slate-200 ${className}`} />
);

export default function OurStorySkeleton() {
  return (
    <div className="bg-white min-h-[auto] md:min-h-screen -mt-20 md:-mt-26" aria-busy="true" aria-label="Loading">
      <section className="bg-gradient-to-b from-slate-50 to-white py-10 md:py-16">
        <div className="container mx-auto px-4 mt-10 sm:mt-16 md:mt-20">
          <div className="max-w-4xl">
            <Bar className="h-7 w-32 !rounded-full mb-6" />
            <Bar className="h-10 md:h-14 w-full max-w-2xl mb-3" />
            <Bar className="h-10 md:h-14 w-3/4 max-w-xl mb-6" />
            <Bar className="h-4 w-full max-w-2xl mb-2" />
            <Bar className="h-4 w-5/6 max-w-2xl" />
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-6 md:gap-8">
          <Bar className="h-[260px] sm:h-[320px] md:h-[500px] !rounded-3xl" />
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="p-6 md:p-8 border border-slate-100 rounded-3xl">
                <Bar className="h-12 w-12 !rounded-xl mb-6" />
                <Bar className="h-5 w-2/3 mb-3" />
                <Bar className="h-3 w-full mb-2" />
                <Bar className="h-3 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-purple-100">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Bar className="h-10 w-full max-w-xl mb-6 !bg-purple-200" />
          <Bar className="h-4 w-full max-w-md mb-8 !bg-purple-200" />
          <Bar className="h-12 w-48 !rounded-full !bg-purple-200" />
        </div>
      </section>
    </div>
  );
}
