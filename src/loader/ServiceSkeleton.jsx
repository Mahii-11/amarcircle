export default function ServiceSkeleton() {
  return (
    <div className="w-full bg-white px-6 md:px-16 py-16">
      {/* Header Skeleton */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <div className="w-14 h-14 bg-gray-300 rounded-full animate-pulse mb-4"></div>
        <div className="h-10 w-48 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-20 h-1 bg-gray-300 mt-2 mb-6"></div>
        <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-5 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="bg-white shadow-md rounded-2xl p-8">
            <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
            <div className="h-7 w-2/3 bg-gray-300 rounded animate-pulse mb-3"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
