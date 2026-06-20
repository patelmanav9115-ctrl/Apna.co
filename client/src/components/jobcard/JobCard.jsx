import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, IndianRupee, ArrowRight, ShieldCheck } from "lucide-react";

// Helper function to generate a consistent modern gradient based on company name
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

const JobCard = ({ job }) => {
  const [logoError, setLogoError] = useState(false);

  return (
    <Link
      to={`/jobs/${job.id}`}
      className="
        group
        block
        bg-white
        border
        border-gray-250
        rounded-2xl
        p-5
        hover:shadow-md
        hover:border-primary/30
        hover:-translate-y-0.5
        transition-all
        duration-300
        relative
      "
      aria-label={`Job card for ${job.title} at ${job.company}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left Section: Logo & Job Details */}
        <div className="flex items-start gap-4 w-full min-w-0">
          
          {/* Company Logo */}
          {!logoError ? (
            <img
              src={job.companyLogo}
              alt={`${job.company} Logo`}
              onError={() => setLogoError(true)}
              className="h-14 w-14 rounded-xl object-cover border border-gray-100 bg-white"
            />
          ) : (
            <div 
              className={`h-14 w-14 rounded-xl bg-gradient-to-br ${getCompanyGradient(job.company)} text-white font-bold flex items-center justify-center border border-white/10 uppercase text-lg shrink-0`}
              aria-label={`${job.company} placeholder logo`}
            >
              {job.company.charAt(0)}
            </div>
          )}

          {/* Details */}
          <div className="flex-1 min-w-0">
            {/* Title & Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-tight">
                {job.title}
              </h3>
              {job.verified && (
                <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-emerald-100">
                  <ShieldCheck size={11} />
                  Verified
                </span>
              )}
              {job.featured && (
                <span className="bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-amber-100">
                  ⭐ Featured
                </span>
              )}
              {job.urgentHiring && (
                <span className="bg-rose-50 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold border border-rose-100 animate-pulse">
                  Urgently Hiring
                </span>
              )}
            </div>

            {/* Company Name */}
            <p className="text-gray-600 font-semibold text-sm mt-1 flex items-center gap-1">
              {job.company}
            </p>

            {/* Spec details row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-gray-500 mt-3">
              <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                <IndianRupee size={14} className="text-gray-400" />
                <span className="text-emerald-700 font-bold">{job.salary}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                <Briefcase size={14} className="text-gray-400" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                <MapPin size={14} className="text-gray-400" />
                <span>{job.location}</span>
              </div>
            </div>

            {/* Skill / Tag tags (horizontally scrollable, scrollbars hidden) */}
            <div 
              className="flex overflow-x-auto whitespace-nowrap gap-2 mt-4 pb-0.5 scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {job.jobTypeTag && (
                <span className="bg-[#f0f9f6] text-[#1f8268] text-[11px] px-2.5 py-1 rounded-md font-bold border border-[#d2efe5] shrink-0">
                  {job.jobTypeTag}
                </span>
              )}
              {job.jobType && (
                <span className="bg-[#F4F2F6] text-gray-700 text-[11px] px-2.5 py-1 rounded-md font-semibold border border-gray-200 shrink-0">
                  {job.jobType}
                </span>
              )}
              {job.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-gray-100 text-gray-600 text-[11px] px-2.5 py-1 rounded-md font-semibold border border-gray-150 shrink-0"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </Link>
  );
};

export default JobCard;