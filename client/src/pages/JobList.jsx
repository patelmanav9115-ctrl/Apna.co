import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { 
  Search, 
  MapPin, 
  Briefcase, 
  SlidersHorizontal, 
  X, 
  ArrowRight, 
  Calendar, 
  IndianRupee, 
  Laptop,
  Clock,
  Check
} from "lucide-react";
import jobs from "../data/jobs.json";
import JobCard from "../components/JobCard/JobCard";

const JobList = () => {
  const routerState = useLocation().state;

  // Search Inputs
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchExperience, setSearchExperience] = useState("");

  // Debounced/applied states for filtering
  const [appliedSearch, setAppliedSearch] = useState("");
  const [appliedLocation, setAppliedLocation] = useState("");
  const [appliedExperience, setAppliedExperience] = useState("");

  // Filters Checklist States
  const [datePosted, setDatePosted] = useState("All"); // All, 24h, 3d, 7d
  const [workModes, setWorkModes] = useState([]); // Remote, In Office, Hybrid
  const [jobTypes, setJobTypes] = useState([]); // Full Time, Part Time, Contract
  const [minSalary, setMinSalary] = useState(0); // Slider 0 to 20 LPA
  const [shifts, setShifts] = useState([]); // Day Shift, Night Shift, etc.
  const [deptSearch, setDeptSearch] = useState(""); // Search department checklist
  const [selectedDepts, setSelectedDepts] = useState([]); // Selected departments
  const [sortBy, setSortBy] = useState("relevant"); // relevant, salaryHigh

  const [showAllDepts, setShowAllDepts] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Departments Master Checklist
  const departmentsList = ["Frontend", "Design", "Data Science", "DevOps", "Marketing", "Sales", "HR"];

  // Parse router state search if navigate from other page
  // Parse router state search and filters (from Jobs Dropdown or other pages)
  useEffect(() => {
    if (routerState) {
      // Clear filters first to apply clean dropdown filter
      setSearch("");
      setSearchLocation("");
      setSearchExperience("");
      setAppliedSearch("");
      setAppliedLocation("");
      setAppliedExperience("");
      setDatePosted("All");
      setWorkModes([]);
      setJobTypes([]);
      setMinSalary(0);
      setShifts([]);
      setSelectedDepts([]);
      setSortBy("relevant");

      if (routerState.search) {
        setSearch(routerState.search);
        setAppliedSearch(routerState.search);
      }
      
      if (routerState.filter) {
        const { type, value } = routerState.filter;
        if (type === "workMode") {
          setWorkModes([value]);
        } else if (type === "jobType") {
          setJobTypes([value]);
        } else if (type === "experience") {
          setSearchExperience(value);
          setAppliedExperience(value);
        } else if (type === "shift") {
          setShifts([value]);
        } else if (type === "dept") {
          setSelectedDepts([value]);
        } else if (type === "city") {
          setSearchLocation(value);
          setAppliedLocation(value);
        }
      }
      
      // Clear location state in window history to prevent filter sticky re-triggers on reload
      window.history.replaceState({}, document.title);
    }
  }, [routerState]);

  // Sync search triggers
  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setAppliedSearch(search);
    setAppliedLocation(searchLocation);
    setAppliedExperience(searchExperience);
  };

  const handleClearFilters = () => {
    setSearch("");
    setSearchLocation("");
    setSearchExperience("");
    setAppliedSearch("");
    setAppliedLocation("");
    setAppliedExperience("");
    setDatePosted("All");
    setWorkModes([]);
    setJobTypes([]);
    setMinSalary(0);
    setShifts([]);
    setDeptSearch("");
    setSelectedDepts([]);
    setSortBy("relevant");
  };

  // Helper to parse salary LPA number
  const getSalaryNumber = (salaryStr) => {
    const num = parseInt(salaryStr.replace(/[^0-9]/g, ""), 10);
    return isNaN(num) ? 0 : num;
  };

  // Helper to match date posted
  const matchDate = (postedAt, filterValue) => {
    if (!filterValue || filterValue === "All") return true;
    const lower = postedAt.toLowerCase();
    if (filterValue === "24h") {
      return lower.includes("1 day") || lower.includes("hour");
    }
    if (filterValue === "3d") {
      return lower.includes("1 day") || lower.includes("2 days") || lower.includes("3 days") || lower.includes("hour");
    }
    if (filterValue === "7d") {
      return lower.includes("day") || lower.includes("hour") || lower.includes("1 week");
    }
    return true;
  };

  // Filtering Logic
  const filteredJobs = jobs.filter((job) => {
    // 1. Search Query (Title, Company, Skills)
    const matchSearch =
      appliedSearch === "" ||
      job.title.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      job.company.toLowerCase().includes(appliedSearch.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(appliedSearch.toLowerCase()));

    // 2. Search Location
    const matchLocation =
      appliedLocation === "" ||
      job.location.toLowerCase() === appliedLocation.toLowerCase();

    // 3. Search Experience
    const matchExperience =
      appliedExperience === "" ||
      job.experience.toLowerCase() === appliedExperience.toLowerCase();

    // 4. Date Posted
    const matchDatePosted = matchDate(job.postedAt, datePosted);

    // 5. Work Mode
    const matchWorkMode =
      workModes.length === 0 ||
      workModes.includes(job.jobTypeTag);

    // 6. Job Type
    const matchJobType =
      jobTypes.length === 0 ||
      jobTypes.includes(job.jobType);

    // 7. Salary Slider (Minimum salary check)
    const salaryNum = getSalaryNumber(job.salary);
    const matchSalary = salaryNum >= minSalary;

    // 8. Work Shift
    const matchShift =
      shifts.length === 0 ||
      shifts.some((s) => job.shift?.toLowerCase().includes(s.toLowerCase()));

    // 9. Department checklist
    const matchDept =
      selectedDepts.length === 0 ||
      selectedDepts.some((d) => 
        job.category?.toLowerCase().includes(d.toLowerCase()) ||
        job.title?.toLowerCase().includes(d.toLowerCase())
      );

    return (
      matchSearch &&
      matchLocation &&
      matchExperience &&
      matchDatePosted &&
      matchWorkMode &&
      matchJobType &&
      matchSalary &&
      matchShift &&
      matchDept
    );
  });

  // Sorting Logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === "salaryHigh") {
      return getSalaryNumber(b.salary) - getSalaryNumber(a.salary);
    }
    return 0; // Default relevant
  });

  const toggleWorkMode = (mode) => {
    setWorkModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const toggleJobType = (type) => {
    setJobTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredDepts = departmentsList.filter((d) =>
    d.toLowerCase().includes(deptSearch.toLowerCase())
  );
  const deptsToDisplay = showAllDepts ? filteredDepts : filteredDepts.slice(0, 4);

  // Shared Filter UI Component (Sidebar / Mobile bottom sheet)
  const FilterGroups = () => (
    <div className="space-y-6">
      
      {/* Sort By Filter (Only in mobile drawer, desktop has in listings header) */}
      <div className="lg:hidden">
        <h4 className="text-sm font-bold text-gray-900 mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 bg-white"
        >
          <option value="relevant">Relevant</option>
          <option value="salaryHigh">Salary - High to Low</option>
        </select>
        <hr className="border-gray-100 mt-5" />
      </div>

      {/* Date Posted */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <Calendar size={16} className="text-gray-400" />
          Date Posted
        </h4>
        <div className="space-y-2.5">
          {[
            { label: "All Dates", value: "All" },
            { label: "Last 24 Hours", value: "24h" },
            { label: "Last 3 Days", value: "3d" },
            { label: "Last 7 Days", value: "7d" }
          ].map((option) => (
            <label key={option.value} className="flex items-center text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="radio"
                name="datePosted"
                checked={datePosted === option.value}
                onChange={() => setDatePosted(option.value)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary accent-primary mr-2.5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Minimum Salary Slider */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-1.5">
          <IndianRupee size={16} className="text-gray-400" />
          Min Salary: <span className="text-primary font-extrabold">₹{minSalary} LPA</span>
        </h4>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={minSalary}
          onChange={(e) => setMinSalary(parseInt(e.target.value, 10))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary mt-2"
        />
        <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-1.5">
          <span>₹0 LPA</span>
          <span>₹10 LPA</span>
          <span>₹20 LPA</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Work Mode */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <Laptop size={16} className="text-gray-400" />
          Work Mode
        </h4>
        <div className="space-y-2.5">
          {[
            { label: "Remote", value: "Remote" },
            { label: "Work from Office", value: "In Office" },
            { label: "Hybrid", value: "Hybrid" }
          ].map((option) => (
            <label key={option.value} className="flex items-center text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={workModes.includes(option.value)}
                onChange={() => toggleWorkMode(option.value)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary mr-2.5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Job Type */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <Briefcase size={16} className="text-gray-400" />
          Job Type
        </h4>
        <div className="space-y-2.5">
          {[
            { label: "Full Time", value: "Full Time" },
            { label: "Part Time", value: "Part Time" },
            { label: "Contract", value: "Contract" }
          ].map((option) => (
            <label key={option.value} className="flex items-center text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={jobTypes.includes(option.value)}
                onChange={() => toggleJobType(option.value)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary mr-2.5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Work Shift */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-1.5">
          <Clock size={16} className="text-gray-400" />
          Work Shift
        </h4>
        <div className="space-y-2.5">
          {[
            { label: "Day Shift", value: "Day Shift" },
            { label: "Night Shift", value: "Night Shift" },
            { label: "Rotational Shift", value: "Rotational" }
          ].map((option) => (
            <label key={option.value} className="flex items-center text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={shifts.includes(option.value)}
                onChange={() => {
                  setShifts((prev) =>
                    prev.includes(option.value)
                      ? prev.filter((s) => s !== option.value)
                      : [...prev, option.value]
                  );
                }}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary mr-2.5"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-100" />

      {/* Searchable Departments checklist */}
      <div>
        <h4 className="text-sm font-bold text-gray-900 mb-3">
          Department
        </h4>
        <div className="relative mb-2.5">
          <input
            type="text"
            placeholder="Search departments..."
            value={deptSearch}
            onChange={(e) => setDeptSearch(e.target.value)}
            className="w-full text-xs border border-gray-250 rounded-lg px-2.5 py-1.5 outline-none focus:border-primary bg-gray-50 text-gray-800"
          />
        </div>
        <div className="space-y-2.5">
          {deptsToDisplay.map((dept) => (
            <label key={dept} className="flex items-center text-sm text-gray-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectedDepts.includes(dept)}
                onChange={() => {
                  setSelectedDepts((prev) =>
                    prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
                  );
                }}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary accent-primary mr-2.5"
              />
              {dept}
            </label>
          ))}
        </div>
        {filteredDepts.length > 4 && (
          <button
            onClick={() => setShowAllDepts(!showAllDepts)}
            className="mt-3 text-xs font-bold text-primary hover:underline cursor-pointer flex items-center"
          >
            {showAllDepts ? "Show Less" : `+ Show ${filteredDepts.length - 4} More`}
          </button>
        )}
      </div>

    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* SEO Title Configuration */}
      <Helmet>
        <title>apna - 94,502 Job Vacancies in India 2026 | Search Jobs in India</title>
        <meta name="description" content="Find the latest job openings in India for Freshers & Experienced. Apply to jobs in IT, Designing, Operations, Sales, and Remote Work opportunities." />
      </Helmet>

      {/* Hero Section Title */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Find your dream job in India
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base font-medium">
          Apply to verified, local and remote job openings with one-click
        </p>
      </div>

      {/* Horizontal Multi-Input Search Panel */}
      <form 
        onSubmit={handleSearchSubmit} 
        className="
          bg-white 
          border 
          border-gray-250 
          rounded-2xl 
          md:rounded-full 
          p-2 
          shadow-lg 
          flex 
          flex-col 
          md:flex-row 
          items-stretch 
          gap-2 
          md:gap-0 
          max-w-4xl 
          mx-auto 
          mb-10
          transition-all
          hover:shadow-xl
        "
      >
        {/* Input 1: Title */}
        <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-150">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search by job title, company, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-3 w-full outline-none text-sm text-gray-800 bg-transparent placeholder-gray-400"
            aria-label="Search jobs input"
          />
        </div>

        {/* Input 2: Location */}
        <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-gray-150">
          <MapPin size={20} className="text-gray-400 shrink-0" />
          <select
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="ml-2 w-full outline-none text-sm text-gray-700 bg-transparent cursor-pointer font-bold"
            aria-label="Search by location"
          >
            <option value="">Select Location</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Remote">Remote</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* Input 3: Experience */}
        <div className="flex-1 flex items-center px-4 py-2">
          <Briefcase size={20} className="text-gray-400 shrink-0" />
          <select
            value={searchExperience}
            onChange={(e) => setSearchExperience(e.target.value)}
            className="ml-2 w-full outline-none text-sm text-gray-700 bg-transparent cursor-pointer font-bold"
            aria-label="Search by experience level"
          >
            <option value="">Select Experience</option>
            <option value="0-1 Years">0-1 Years</option>
            <option value="1-3 Years">1-3 Years</option>
            <option value="2-4 Years">2-4 Years</option>
            <option value="3-5 Years">3-5 Years</option>
            <option value="3+ Years">3+ Years</option>
            <option value="3-6 Years">3-6 Years</option>
            <option value="4+ Years">4+ Years</option>
          </select>
        </div>

        {/* Submit Search Button */}
        <button
          type="submit"
          className="
            bg-primary 
            hover:bg-primary-hover 
            text-white 
            px-8 
            py-3 
            rounded-xl 
            md:rounded-full 
            font-bold 
            text-sm 
            transition-all 
            duration-300
            active:scale-[0.98]
            cursor-pointer
            shrink-0
          "
        >
          Search Jobs
        </button>
      </form>

      {/* Main Grid Content (3-Column Desktop Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Column 1: Filters Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-fit sticky top-24">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-base font-extrabold text-gray-900">Filters</h3>
            <button
              onClick={handleClearFilters}
              className="text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              Clear All
            </button>
          </div>
          <FilterGroups />
        </div>

        {/* Column 2 & 3: Job Listings Center */}
        <div className="col-span-1 lg:col-span-2 space-y-4">
          
          {/* Active Filter Indicators / Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50 border border-gray-150 rounded-xl px-4 py-3">
            <p className="text-sm text-gray-500 font-semibold">
              Showing <span className="font-bold text-primary">{filteredJobs.length}</span> jobs matching
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-0 text-xs font-extrabold text-gray-700 outline-none cursor-pointer"
                >
                  <option value="relevant">Relevant</option>
                  <option value="salaryHigh">Salary - High to Low</option>
                </select>
              </div>
              {(appliedSearch || appliedLocation || appliedExperience || datePosted !== "All" || workModes.length > 0 || jobTypes.length > 0 || minSalary > 0 || shifts.length > 0 || selectedDepts.length > 0) && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-red-500 font-bold hover:underline cursor-pointer border-l border-gray-200 pl-3"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Job Card List */}
          {sortedJobs.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center">
              <span className="text-5xl block mb-4 animate-bounce">🔍</span>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Jobs Found</h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                We couldn't find any job matching your current filters. Try resetting your filters or modifying your search terms.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-full transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {sortedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>

        {/* Column 4: Promos / CTAs (Right Sidebar) */}
        <div className="hidden lg:block lg:col-span-1 space-y-5">
          {/* Create Profile Promo Card */}
          <div className="bg-gradient-to-br from-[#1F8268]/10 to-[#1F8268]/5 border border-primary/20 rounded-2xl p-6 shadow-sm">
            <h4 className="font-extrabold text-gray-900 text-lg leading-snug">
              Know more about latest jobs
            </h4>
            <ul className="text-gray-500 text-xs leading-relaxed mt-3 space-y-2 font-medium">
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-[#1F8268] shrink-0 mt-0.5" />
                <span>Personalised job matches</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-[#1F8268] shrink-0 mt-0.5" />
                <span>Direct connect with HRs</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check size={14} className="text-[#1F8268] shrink-0 mt-0.5" />
                <span>Latest updates on the job</span>
              </li>
            </ul>
            <button className="w-full mt-4 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-full text-xs font-bold transition-all shadow-sm">
              Create profile
            </button>
          </div>

          {/* Post a Job Promo Card */}
          <div className="bg-white border border-gray-250 rounded-2xl p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 text-base leading-snug">
              Are you hiring?
            </h4>
            <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
              Post your job vacancies on Apna and connect with over 10 lakh+ active job seekers in minutes.
            </p>
            <a 
              href="#" 
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              Post a Job for Free
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>

      {/* Mobile Floating Filters Sticky Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-30">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="
            bg-primary 
            hover:bg-primary-hover 
            text-white 
            px-6 
            py-3 
            rounded-full 
            shadow-xl 
            flex 
            items-center 
            gap-2 
            text-sm 
            font-bold
            active:scale-95
            transition-all
            cursor-pointer
          "
        >
          <SlidersHorizontal size={16} />
          Filters
          {(workModes.length + jobTypes.length + (datePosted !== "All" ? 1 : 0) + (minSalary > 0 ? 1 : 0) + (shifts.length > 0 ? 1 : 0) + (selectedDepts.length > 0 ? 1 : 0)) > 0 && (
            <span className="h-5 w-5 bg-white text-primary rounded-full text-xs font-extrabold flex items-center justify-center shrink-0">
              {workModes.length + jobTypes.length + (datePosted !== "All" ? 1 : 0) + (minSalary > 0 ? 1 : 0) + (shifts.length > 0 ? 1 : 0) + (selectedDepts.length > 0 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filters Slide-Up Drawer Sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setMobileFiltersOpen(false)}
            className="fixed inset-0 bg-black/40 animate-fade-in"
          />
          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 max-h-[85vh] bg-white rounded-t-3xl p-6 flex flex-col shadow-2xl animate-slide-up">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4 shrink-0">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-gray-600" />
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Scrollable Filters Checklist */}
            <div className="overflow-y-auto flex-1 scrollbar-thin pr-1 pb-6">
              <FilterGroups />
            </div>

            {/* Footer Apply CTA */}
            <div className="border-t pt-4 shrink-0">
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-full font-bold text-sm transition-all active:scale-[0.98]"
              >
                Apply Filters ({filteredJobs.length} Jobs)
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default JobList;