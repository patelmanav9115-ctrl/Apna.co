import React, { useState } from "react";
import { Check } from "lucide-react";
import StatItem from "../StatItem/StatItem";

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

const CompanyInfo = ({ job }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="space-y-5">
      {/* Main Company Card */}
      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          p-6
        "
        aria-label="Company Profile Information"
      >
        {/* Company Logo */}
        {!logoError ? (
          <img
            src={job.companyLogo}
            alt={`${job.company} Logo`}
            onError={() => setLogoError(true)}
            className="
              h-12
              w-12
              rounded-lg
              border
              border-gray-100
              object-cover
              bg-white
            "
          />
        ) : (
          <div 
            className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getCompanyGradient(job.company)} text-white font-bold flex items-center justify-center border border-white/10 uppercase text-lg shrink-0`}
            aria-label={`${job.company} placeholder logo`}
          >
            {job.company.charAt(0)}
          </div>
        )}

        {/* Company Name */}
        <h3
          className="
            text-lg
            font-semibold
            mt-4
            text-gray-900
          "
        >
          {job.company}
        </h3>

        {/* Verified Badge */}
        {job.verified && (
          <span
            className="
              inline-block
              mt-2
              px-2.5
              py-1
              bg-green-100
              text-green-700
              rounded-full
              text-xs
              font-semibold
            "
            aria-label="Verified employer badge"
          >
            Verified Employer
          </span>
        )}

        {/* Company Stats Grid */}
        <div
          className="
            grid
            grid-cols-2
            gap-4
            mt-6
            pt-4
            border-t
            border-gray-100
          "
        >
          <StatItem label="Employees" value={job.employees} />
          <StatItem label="Open Jobs" value={job.openJobs} />
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-emerald-700 font-semibold">
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600 shrink-0" />
            <span>Verified Employer</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600 shrink-0" />
            <span>Actively Hiring</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={16} className="text-emerald-600 shrink-0" />
            <span>Fast Response</span>
          </div>
        </div>

        {/* Industry */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-500 text-sm">Industry</p>
          <p className="font-semibold text-gray-900 mt-0.5">{job.industry}</p>
        </div>

        {/* Website Link */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-500 text-sm mb-1">Website</p>
          <a
            href={job.website}
            target="_blank"
            rel="noreferrer"
            className="
              text-blue-600
              break-all
              hover:underline
              font-medium
              text-sm
            "
            aria-label={`Visit ${job.company} website`}
          >
            {job.website}
          </a>
        </div>

        {/* Company Description */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 text-sm">About Company</h4>
          <p
            className="
              text-gray-600
              mt-2
              text-sm
              leading-6
            "
          >
            {job.companyDescription}
          </p>
        </div>
      </div>

      {/* Hiring Activity Card */}
      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          shadow-sm
          p-6
        "
        aria-label="Recent Hiring Activity"
      >
        <h4
          className="
            font-semibold
            text-gray-900
            text-base
          "
        >
          Hiring Activity
        </h4>

        <p className="mt-4 text-gray-700 text-sm">
          {job.applicants} Candidates Applied
        </p>

        {job.activelyHiring && (
          <span
            className="
              inline-block
              mt-4
              px-2.5
              py-1
              bg-blue-100
              text-blue-700
              rounded-full
              text-xs
              font-semibold
            "
            aria-label="Actively hiring tag"
          >
            Actively Hiring
          </span>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo;