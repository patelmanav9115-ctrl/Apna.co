import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight, FileText, Heart, Share2, ShieldCheck, Check, Briefcase } from "lucide-react";
import jobs from "../data/jobs.json";
import JobHeader from "../components/JobHeader/JobHeader";
import JobHighlights from "../components/jobHighlight/JobHighlights";
import AboutJob from "../components/AboutJob/AboutJob";
import CompanyInfo from "../components/CompanyInfo/CompanyInfo";
import RelatedJobs from "../components/RelatedJobs/RelatedJobs";
import JobSkeleton from "../components/Skeletons/JobSkeleton";
import SectionCard from "../components/SectionCard/SectionCard";

const JobDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const job = jobs.find((item) => item.id === Number(id));

  // Reset states and simulate loading when route (id) changes
  useEffect(() => {
    setLoading(true);
    setSaved(false); // Reset saved status for new job details
    setOpen(false); // Close modal when navigating
    setShowFullDesc(false);
    setCopied(false);
    setShowStickyHeader(false);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  // Monitor scroll for sticky details sub-header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!job) {
    return (
      <div className="p-12 text-center text-gray-500 bg-white border border-gray-200 rounded-2xl shadow-sm max-w-md mx-auto my-12">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Job Not Found</h2>
        <p className="text-sm mb-6">The job you are looking for does not exist or has been removed.</p>
        <Link to="/" className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-full transition-all cursor-pointer">
          Back to Home
        </Link>
      </div>
    );
  }

  if (loading) {
    return <JobSkeleton />;
  }

  const shareJob = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24 lg:pb-8">
      {/* SEO Title Configuration */}
      <Helmet>
        <title>{`${job.title} at ${job.company} | apna`}</title>
        <meta name="description" content={`Apply for ${job.title} job position at ${job.company} located in ${job.location}.`} />
      </Helmet>

      {/* Sticky subheader scroll interaction */}
      <div 
        className={`fixed top-16 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-md z-30 transition-all duration-300 transform ${
          showStickyHeader ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"
        } py-3.5 px-4 hidden md:block`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-extrabold text-gray-900 text-sm truncate">{job.title}</span>
            <span className="text-gray-300 shrink-0">•</span>
            <span className="text-gray-500 text-xs font-semibold truncate">{job.company}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={shareJob}
              className="flex items-center gap-1.5 border border-gray-200 hover:border-primary/20 hover:text-primary px-4 py-1.5 rounded-full font-bold text-xs cursor-pointer transition-all bg-white"
            >
              {copied ? <Check size={14} className="text-emerald-600 animate-fade-in" /> : <Share2 size={14} className="text-gray-400" />}
              {copied ? "Copied" : "Share"}
            </button>
            <button
              onClick={() => setOpen(true)}
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full font-bold text-xs cursor-pointer transition-all active:scale-[0.98] shadow-sm"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider" aria-label="Breadcrumbs">
        <Link to="/" className="hover:text-primary transition-colors" aria-label="Go to home">
          Home
        </Link>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
        <Link to="/" className="hover:text-primary transition-colors" aria-label="Go to job listing">
          Jobs
        </Link>
        <ChevronRight size={14} className="text-gray-300 shrink-0" />
        <span className="text-gray-600 truncate max-w-[150px] sm:max-w-xs" aria-current="page">
          {job.title}
        </span>
      </nav>

      {/* 2-Column Desktop Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side (Main Content: 2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          <JobHeader job={job} />

          {/* Job Description Card with Show More toggle */}
          <SectionCard title="Job Description" icon={<FileText size={20} />}>
            <div className={`relative overflow-hidden transition-all duration-300 ${showFullDesc ? "max-h-none" : "max-h-24"}`}>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed text-sm">
                {job.description}
                {"\n\n"}
                We are actively looking for candidates who can join immediately and handle day-to-day project milestones. In this position, you will work alongside product leads to drive software integrations, testing, and deployments. Candidate must display good communication, proactiveness, and critical thinking.
              </p>
              {!showFullDesc && (
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
              )}
            </div>
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="mt-3 text-xs font-extrabold text-primary hover:underline flex items-center gap-1 cursor-pointer uppercase tracking-wider"
            >
              {showFullDesc ? "Show Less" : "Show More"}
            </button>
          </SectionCard>

          <JobHighlights job={job} />

          {/* Job Role Grids */}
          <SectionCard title="Job Role" icon={<Briefcase size={20} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-2">
              <div className="border-b border-gray-50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Department</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">{job.category || "Technology"}</span>
              </div>
              <div className="border-b border-gray-50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Role / Category</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">{job.title}</span>
              </div>
              <div className="border-b border-gray-50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Employment type</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">{job.jobType}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Shift</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">{job.shift || "Day Shift"}</span>
              </div>
            </div>
          </SectionCard>

          {/* Job Requirements Grids */}
          <SectionCard title="Job Requirements" icon={<ShieldCheck size={20} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 py-2">
              <div className="border-b border-gray-50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Experience</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">{job.experience}</span>
              </div>
              <div className="border-b border-gray-50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Education</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">{job.education || "Bachelor Degree"}</span>
              </div>
              <div className="border-b border-gray-50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">English level</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">Good (Intermediate / Advanced) English</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">Gender</span>
                <span className="text-sm font-bold text-gray-800 mt-1 block">Any Gender</span>
              </div>
            </div>
          </SectionCard>

          <AboutJob job={job} />

          {/* Skills Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <Check size={18} className="text-primary shrink-0" />
              <span>Skills Required</span>
            </h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="
                    px-4
                    py-2
                    bg-gray-50
                    text-gray-700
                    border
                    border-gray-200
                    rounded-lg
                    text-xs
                    font-semibold
                  "
                  aria-label={`Skill requirement: ${skill}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side (Sidebar: 1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            
            {/* Desktop Apply Card */}
            <div className="hidden lg:block bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <button
                onClick={() => setOpen(true)}
                className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold text-sm hover:scale-102 active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer"
                aria-label={`Apply now for ${job.title} job position`}
              >
                Apply Now
              </button>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => setSaved(!saved)}
                  className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-full font-bold hover:bg-gray-50 hover:border-primary/20 hover:text-primary active:scale-[0.98] transition-all duration-300 text-xs cursor-pointer"
                  aria-label={saved ? "Remove job from saved list" : "Save this job position"}
                >
                  <Heart size={14} className={saved ? "text-rose-500 fill-rose-500" : "text-gray-400"} />
                  {saved ? "Saved" : "Save Job"}
                </button>
                <button
                  onClick={shareJob}
                  className="flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-full font-bold hover:bg-gray-50 hover:border-primary/20 hover:text-primary active:scale-[0.98] transition-all duration-300 text-xs cursor-pointer"
                  aria-label="Share this job position link"
                >
                  {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} className="text-gray-400" />}
                  {copied ? "Copied" : "Share Job"}
                </button>
              </div>
            </div>

            {/* Company Info & Hiring Activity Cards */}
            <CompanyInfo job={job} />

            {/* Similar Jobs Vertical Feed inside Sidebar */}
            <RelatedJobs currentJob={job} jobs={jobs} />

          </div>
        </div>

      </div>

      {/* Mobile Sticky Apply Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t lg:hidden z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <div className="flex gap-3 max-w-lg mx-auto">
          <button
            onClick={() => setOpen(true)}
            className="flex-[2] bg-primary hover:bg-primary-hover text-white py-3.5 rounded-full font-bold active:scale-[0.98] transition-all duration-300 shadow-sm cursor-pointer text-center text-sm"
            aria-label={`Apply now for ${job.title} job position`}
          >
            Apply Now
          </button>
          <button
            onClick={() => setSaved(!saved)}
            className="flex-[1] flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-50 active:scale-[0.98] transition-all duration-300 text-xs cursor-pointer"
            aria-label={saved ? "Remove job from saved list" : "Save this job position"}
          >
            <Heart size={14} className={saved ? "text-rose-500 fill-rose-500" : "text-gray-400"} />
            {saved ? "Saved" : "Save"}
          </button>
          <button
            onClick={shareJob}
            className="flex-[1] flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-50 active:scale-[0.98] transition-all duration-300 text-xs cursor-pointer"
            aria-label="Share this job position link"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} className="text-gray-400" />}
            {copied ? "Copied" : "Share"}
          </button>
        </div>
      </div>

      {/* Apply Success Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl transform transition-all animate-zoom-in border border-gray-100">
            <div className="h-14 w-14 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shrink-0">
              <Check size={26} className="text-emerald-600 font-bold" />
            </div>
            <h3 id="modal-title" className="text-xl font-bold text-gray-900 mb-2">
              Job Applied Successfully
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Your application has been submitted to <strong>{job.company}</strong>. They will review your resume and contact you shortly.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 rounded-full transition-all duration-300 active:scale-[0.98] cursor-pointer text-sm"
              aria-label="Close success modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;