export default function AboutSkeleton() {
  return (
    <section id="about">
      <div className="w-full bg-white px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start gap-16">

          {/* Text Skeleton */}
          <div className="lg:w-1/2 w-full">
            <div className="h-10 w-48 bg-gray-300 rounded animate-pulse mb-4"></div>
            <div className="space-y-3 mb-10">
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-8 w-72 bg-gray-300 rounded animate-pulse mb-6"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Image Skeleton */}
          <div className="lg:w-1/2 relative w-full flex justify-center items-center mt-10 lg:mt-0">
            <div className="rounded-xl w-[75%] md:w-[90%] aspect-[4/3] bg-gray-300 animate-pulse"></div>
            <div className="rounded-xl w-[50%] md:w-[45%] aspect-[4/3] absolute -bottom-10 left-5 md:left-20 border-4 border-white bg-gray-200 animate-pulse"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
