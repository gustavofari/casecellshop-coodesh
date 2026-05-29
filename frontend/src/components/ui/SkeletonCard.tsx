export function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
      <div className="h-40 bg-gray-100 rounded-xl mb-4"></div>
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-5"></div>
      <div className="h-10 bg-gray-100 rounded-lg w-full"></div>
    </div>
  );
}
