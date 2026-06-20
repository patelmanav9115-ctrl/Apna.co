import React from "react";

const ApplyButton = () => {
  return (
    <div className="flex gap-3 w-full">
      <button
        className="
          flex-1
          bg-blue-600
          text-white
          py-3
          rounded-xl
          font-semibold
          hover:bg-blue-700
          active:scale-[0.98]
          transition-all
          duration-200
          shadow-sm
          hover:shadow
        "
      >
        Apply Now
      </button>
      <button
        className="
          flex-1
          flex
          items-center
          justify-center
          gap-2
          border
          border-gray-300
          text-gray-700
          py-3
          rounded-xl
          font-semibold
          hover:bg-gray-50
          active:scale-[0.98]
          transition-all
          duration-200
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
        Save Job
      </button>
    </div>
  );
};

export default ApplyButton;