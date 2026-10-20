export default function FaqSkeleton() {
  return (
    <section className="w-full py-12 md:py-20 px-4 bg-gray-50 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* Title Skeleton */}
        <div className="h-8 md:h-10 w-2/3 mx-auto bg-gray-300 rounded animate-pulse mb-6 md:mb-10"></div>

        {/* FAQ List Skeleton */}
        <div className="space-y-3 sm:space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white/70 flex justify-between items-center px-4 py-4 sm:px-5 sm:py-5"
            >
              <div className="h-5 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
