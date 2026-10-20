const Bar = ({ className = "" }) => (
  <div className={`sk-shimmer rounded-lg bg-slate-200 ${className}`} />
);

export default function MissionVisionSkeleton() {
  return (
    <section className="py-20 bg-slate-50/50" aria-busy="true" aria-label="Loading">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <Bar className="h-10 w-56 mb-4" />
          <Bar className="h-1.5 w-24 !rounded-full mb-6" />
          <Bar className="h-4 w-full max-w-2xl mb-2" />
          <Bar className="h-4 w-2/3 max-w-xl" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
              <Bar className="h-16 w-16 !rounded-2xl mb-8" />
              <Bar className="h-7 w-40 mb-4" />
              <Bar className="h-4 w-full mb-2" />
              <Bar className="h-4 w-full mb-2" />
              <Bar className="h-4 w-5/6 mb-2" />
              <Bar className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
