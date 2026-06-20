import React, { useState } from "react";
import InfoBadge from "../InfoBadge/InfoBadge";

const getCompanyGradient = (companyName) => {
  const hash = companyName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    "from-emerald-500 to-teal-600",
    "from-teal-500 to-cyan-600",
    "from-indigo-500 to-blue-600",
    "from-purple-500 to-indigo-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600"
  ];
  return gradients[hash % gradients.length];
};

const JobHeader = ({ job }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        p-6
      "
    >
      {/* Top Row: Logo, Title, Company, Location, Verified */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        {/* Left Side */}
        <div className="flex gap-4">
          {!logoError ? (
            <img
              src={job.companyLogo}
              alt={`${job.company} Logo`}
              onError={() => setLogoError(true)}
              className="
                h-14
                w-14
                rounded-xl
                object-cover
                border
                border-gray-100
              "
            />
          ) : (
            <div 
              className={`h-14 w-14 rounded-xl bg-gradient-to-br ${getCompanyGradient(job.company)} text-white font-bold flex items-center justify-center border border-white/10 uppercase text-lg shrink-0`}
              aria-label={`${job.company} placeholder logo`}
            >
              {job.company.charAt(0)}
            </div>
          )}
          <div>
            <h1
              className="
                text-2xl
                md:text-3xl
                font-extrabold
                text-gray-900
                tracking-tight
              "
            >
              {job.title}
            </h1>
            <p
              className="
                text-base
                font-semibold
                mt-1.5
                text-gray-700
                flex
                items-center
                flex-wrap
                gap-2
              "
            >
              {job.company}
              {job.verified && (
                <span
                  className="
                    inline-block
                    bg-emerald-50
                    text-emerald-700
                    border
                    border-emerald-100
                    px-2.5
                    py-0.5
                    rounded-full
                    text-xs
                    font-semibold
                  "
                  aria-label="Verified employer badge"
                >
                  ✔ Verified
                </span>
              )}
            </p>
            <p
              className="
                text-gray-500
                text-sm
                mt-1
              "
            >
              {job.location}
            </p>
          </div>
        </div>
      </div>

      {/* Salary */}
      <div className="mt-5">
        <p
          className="
            text-emerald-700
            font-extrabold
            text-2xl
            tracking-tight
          "
        >
          {job.salary} <span className="text-xs font-semibold text-gray-400 tracking-normal block md:inline md:ml-1 uppercase">Earning Potential</span>
        </p>
        <p className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wider">
          Fixed: {job.salary} • Incentives: Based on Performance
        </p>
      </div>

      {/* Meta Information Row */}
      <div
        className="
          flex
          flex-wrap
          gap-2.5
          mt-4
        "
      >
        <InfoBadge text={job.experience} />
        <InfoBadge text={job.jobType} />
        <InfoBadge text={`${job.openings} Openings`} />
      </div>

      {/* Posted Date */}
      <p
        className="
          text-xs
          font-medium
          text-gray-400
          mt-5
        "
      >
        Posted {job.postedAt}
      </p>
    </div>
  );
};

export default JobHeader;