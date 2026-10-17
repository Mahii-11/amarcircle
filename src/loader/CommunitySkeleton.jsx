export default function CommunitySkeleton() {
  return (
    <section className="w-full bg-[#f6f7fb] py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Skeleton */}
        <div className="space-y-6">
          <div className="h-10 w-2/3 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 w-4/6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Right Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="shadow-lg rounded-2xl p-6 bg-white flex items-center gap-4"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>

              {/* Text */}
              <div className="flex-1 space-y-2">
                <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}