import React from "react";

const JobSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse space-y-6" aria-label="Loading content placeholder">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 bg-gray-200 rounded-xl w-1/4 mb-4"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="flex gap-4">
              <div className="h-16 w-16 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-3 py-1">
                <div className="h-6 bg-gray-200 rounded-xl w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded-xl w-1/2"></div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
              <div className="h-6 bg-gray-200 rounded-full w-24"></div>
            </div>
          </div>

          {/* Highlights Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="h-6 bg-gray-200 rounded-xl w-1/4"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="h-16 bg-gray-100 rounded-xl"></div>
              <div className="h-16 bg-gray-100 rounded-xl"></div>
              <div className="h-16 bg-gray-100 rounded-xl"></div>
              <div className="h-16 bg-gray-100 rounded-xl"></div>
            </div>
          </div>

          {/* Responsibilities/Details Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="h-6 bg-gray-200 rounded-xl w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded-xl w-full"></div>
              <div className="h-4 bg-gray-200 rounded-xl w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded-xl w-4/5"></div>
            </div>
          </div>
        </div>

        {/* Right Side Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
            <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSkeleton;