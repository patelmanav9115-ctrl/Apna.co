import React from "react";
import { Users, ShieldCheck, Heart, Clock, Laptop, Sparkles, CheckCircle2 } from "lucide-react";

// Dynamic icon mapper based on benefit name
const getBenefitIcon = (benefitName) => {
  const lower = benefitName.toLowerCase();
  if (lower.includes("health") || lower.includes("insur")) {
    return <Heart size={16} className="text-rose-500" />;
  }
  if (lower.includes("flex") || lower.includes("hour") || lower.includes("shift")) {
    return <Clock size={16} className="text-amber-500" />;
  }
  if (lower.includes("mac") || lower.includes("laptop") || lower.includes("comput")) {
    return <Laptop size={16} className="text-[#1F8268]" />;
  }
  return <Sparkles size={16} className="text-[#1F8268]" />;
};

const JobHighlights = ({ job }) => {
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
      aria-label="Job Highlights Section"
    >
      <h2
        className="
          font-bold
          text-lg
          mb-4
          text-gray-900
          border-b
          border-gray-100
          pb-3
          flex
          items-center
          gap-2
        "
      >
        <span className="text-primary font-extrabold">★</span> Job Highlights
      </h2>

      {/* Row 1: Applicants & Trust indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-xl p-3.5">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
            <Users size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-gray-800">{job.applicants || "25"} Candidates</div>
            <div className="text-xs text-gray-400 font-semibold uppercase mt-0.5">Applied in last 3 days</div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 border border-gray-150 rounded-xl p-3.5">
          <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 border border-emerald-100">
            <ShieldCheck size={20} />
          </div>
          <div>
            <div className="text-sm font-bold text-emerald-800">Verified Recruiter</div>
            <div className="text-xs text-emerald-600 font-semibold uppercase mt-0.5">Active hiring status</div>
          </div>
        </div>
      </div>

      {/* Row 2: Benefits checklist */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="pt-2 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-800 mb-3.5">Benefits include:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {job.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2.5 text-sm text-gray-600 font-medium bg-gray-50 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-primary/10 transition-colors">
                <span className="shrink-0">{getBenefitIcon(benefit)}</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobHighlights;