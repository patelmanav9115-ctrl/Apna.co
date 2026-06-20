import { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ChevronDown, ChevronRight, FileText, FileCheck, FileSearch, BookOpen } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'jobs', 'resume', or null
  const timeoutRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomepage = location.pathname === "/";

  // Track Y scroll on homepage for collapsed search trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 160) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (name) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate("/", { state: { search: searchText.trim() } });
      setSearchText("");
    }
  };

  const handleDropdownFilter = (type, value) => {
    setActiveDropdown(null);
    if (type === "all") {
      navigate("/", { state: { reset: true } });
    } else if (type === "search") {
      navigate("/", { state: { search: value } });
    } else {
      navigate("/", { state: { filter: { type, value } } });
    }
  };

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-40
          bg-white
          border-b
          border-gray-200
          shadow-sm
          h-16
        "
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 cursor-pointer shrink-0" aria-label="Apna Homepage">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">a</div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">apna</span>
          </Link>

          {/* Search Bar - Desktop (rounded-full) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="hidden md:flex flex-grow max-w-[200px] lg:max-w-[260px] xl:max-w-[360px] items-center border border-gray-250 rounded-full px-4 py-1.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all bg-white"
          >
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search jobs, skills..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="ml-2 w-full outline-none text-xs text-gray-700 bg-transparent placeholder-gray-400"
              aria-label="Search all jobs"
            />
          </form>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 shrink-0">
            
            {/* Jobs Dropdown Wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('jobs')}
              onMouseLeave={handleMouseLeave}
            >
              <Link 
                to="/" 
                className={`text-slate-600 hover:text-primary font-semibold text-sm transition-colors flex items-center gap-1 py-4 ${activeDropdown === 'jobs' ? 'text-primary' : ''}`}
                aria-label="Browse Jobs"
              >
                Jobs
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'jobs' ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
              </Link>
              
              {activeDropdown === 'jobs' && (
                <div 
                  className="
                    absolute 
                    top-full 
                    left-0 
                    mt-0.5 
                    bg-white 
                    rounded-2xl 
                    shadow-xl 
                    border 
                    border-gray-150 
                    py-5 
                    px-6 
                    z-50 
                    flex 
                    gap-0 
                    w-[440px] 
                    animate-zoom-in
                  "
                >
                  {/* Left Column */}
                  <div className="flex flex-col gap-3.5 w-1/2 pr-4">
                    <button 
                      onClick={() => handleDropdownFilter("workMode", "Remote")}
                      className="text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-fit"
                    >
                      Work From Home Jobs
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("jobType", "Part Time")}
                      className="text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-fit"
                    >
                      Part Time Jobs
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("experience", "0-1 Years")}
                      className="text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-fit"
                    >
                      Freshers Jobs
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("dept", "Design")}
                      className="text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-fit"
                    >
                      Jobs for women
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("jobType", "Full Time")}
                      className="text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-fit"
                    >
                      Full Time Jobs
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("shift", "Night Shift")}
                      className="text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-fit"
                    >
                      Night Shift Jobs
                    </button>
                  </div>

                  {/* Vertical Separator */}
                  <div className="border-r border-gray-100" />

                  {/* Right Column */}
                  <div className="flex flex-col gap-3.5 w-1/2 pl-6">
                    <button 
                      onClick={() => handleDropdownFilter("city", "Remote")}
                      className="flex items-center justify-between text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-full group/item"
                    >
                      <span>Jobs By City</span>
                      <ChevronRight size={14} className="text-primary shrink-0 ml-2" />
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("dept", "Frontend")}
                      className="flex items-center justify-between text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-full group/item"
                    >
                      <span>Jobs By Department</span>
                      <ChevronRight size={14} className="text-primary shrink-0 ml-2" />
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("search", "Google")}
                      className="flex items-center justify-between text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-full group/item"
                    >
                      <span>Jobs By Company</span>
                      <ChevronRight size={14} className="text-primary shrink-0 ml-2" />
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("experience", "3+ Years")}
                      className="flex items-center justify-between text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-full group/item"
                    >
                      <span>Jobs By Qualification</span>
                      <ChevronRight size={14} className="text-primary shrink-0 ml-2" />
                    </button>
                    <button 
                      onClick={() => handleDropdownFilter("all", "")}
                      className="flex items-center justify-between text-slate-500 font-medium text-sm hover:text-primary transition-colors cursor-pointer text-left w-full group/item"
                    >
                      <span>Others</span>
                      <ChevronRight size={14} className="text-primary shrink-0 ml-2" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a href="#" className="text-slate-600 hover:text-primary font-semibold text-sm transition-colors flex items-center">
              Job Prep
              <span className="bg-[#e6f4ea] text-[#137333] text-[9px] font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wide">NEW</span>
            </a>
            <a href="#" className="text-slate-600 hover:text-primary font-semibold text-sm transition-colors flex items-center">
              Contests
              <span className="bg-[#e6f4ea] text-[#137333] text-[9px] font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wide">NEW</span>
            </a>
            <a href="#" className="text-slate-600 hover:text-primary font-semibold text-sm transition-colors flex items-center">
              Degree
              <span className="bg-[#e6f4ea] text-[#137333] text-[9px] font-bold px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wide">NEW</span>
            </a>
            {/* Resume Tools Dropdown Wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('resume')}
              onMouseLeave={handleMouseLeave}
            >
              <a 
                href="#" 
                className={`text-slate-600 hover:text-primary font-semibold text-sm transition-colors flex items-center gap-1 py-4 ${activeDropdown === 'resume' ? 'text-primary' : ''}`}
              >
                Resume Tools
                <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === 'resume' ? 'rotate-180 text-primary' : 'text-slate-400'}`} />
              </a>
              
              {activeDropdown === 'resume' && (
                <div 
                  className="
                    absolute 
                    top-full 
                    right-0 
                    mt-0.5 
                    bg-white 
                    rounded-2xl 
                    shadow-xl 
                    border 
                    border-gray-150 
                    py-4 
                    px-4 
                    z-50 
                    flex 
                    flex-col 
                    gap-1.5 
                    w-[320px] 
                    animate-zoom-in
                  "
                >
                  {/* Item 1 */}
                  <a 
                    href="#" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item cursor-pointer text-left"
                  >
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600 transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm group-hover/item:text-primary transition-colors">AI Resume builder</h5>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium leading-normal">Create your best resume using AI</p>
                    </div>
                  </a>

                  {/* Item 2 */}
                  <a 
                    href="#" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item cursor-pointer text-left"
                  >
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 transition-colors">
                      <FileCheck size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm group-hover/item:text-primary transition-colors">AI Resume checker</h5>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium leading-normal">Get instant resume feedback</p>
                    </div>
                  </a>

                  {/* Item 3 */}
                  <a 
                    href="#" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item cursor-pointer text-left"
                  >
                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600 transition-colors">
                      <FileSearch size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm group-hover/item:text-primary transition-colors">AI Cover letter generator</h5>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium leading-normal">Stand out and get hired faster</p>
                    </div>
                  </a>

                  {/* Item 4 */}
                  <a 
                    href="#" 
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item cursor-pointer text-left"
                  >
                    <div className="p-2 bg-rose-50 rounded-lg text-rose-600 transition-colors">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-800 text-sm group-hover/item:text-primary transition-colors">Blog</h5>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium leading-normal">Guidance for securing your dream job</p>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Login/Register Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
            <button
              className="
                px-5 py-2
                border
                border-slate-700
                rounded-full
                font-semibold
                text-sm
                text-slate-700
                hover:bg-slate-50
                hover:scale-102
                active:scale-[0.98]
                transition-all
                duration-200
                cursor-pointer
              "
              aria-label="Employer login"
            >
              Employer Login
            </button>
            <button
              className="
                px-5 py-2
                border
                border-primary
                text-primary
                rounded-full
                font-semibold
                text-sm
                hover:bg-primary/5
                hover:scale-102
                active:scale-[0.98]
                transition-all
                duration-200
                cursor-pointer
              "
              aria-label="Candidate login"
            >
              Candidate Login
            </button>
          </div>

          {/* Mobile Header - Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={() => setOpen(true)}
              aria-label="Open navigation menu"
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} className="text-gray-700" />
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 animate-fade-in">
          <div className="
            bg-white
            h-full
            w-72
            p-5
            shadow-xl
            flex
            flex-col
            justify-between
          ">
            <div>
              <div className="flex items-center justify-between border-b pb-4">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2" aria-label="Apna Homepage">
                  <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-lg">a</div>
                  <span className="font-bold text-xl text-gray-900 tracking-tight">apna</span>
                </Link>
                <button 
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-6">
                <Link 
                  to="/" 
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary font-semibold transition-all"
                  aria-label="Browse Jobs"
                >
                  Jobs
                </Link>
                <a 
                  href="#" 
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-primary/5 hover:text-primary font-semibold transition-all flex items-center justify-between"
                >
                  <span>Job Prep</span>
                  <span className="bg-[#e6f4ea] text-[#137333] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-primary/5 hover:text-primary font-semibold transition-all flex items-center justify-between"
                >
                  <span>Contests</span>
                  <span className="bg-[#e6f4ea] text-[#137333] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-primary/5 hover:text-primary font-semibold transition-all flex items-center justify-between"
                >
                  <span>Degree</span>
                  <span className="bg-[#e6f4ea] text-[#137333] text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">NEW</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-primary/5 hover:text-primary font-semibold transition-all"
                >
                  Resume Tools
                </a>
              </nav>
            </div>

            <div className="flex flex-col gap-3 border-t pt-4">
              <button
                onClick={() => setOpen(false)}
                className="w-full py-2.5 border border-slate-700 rounded-full font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                aria-label="Employer login"
              >
                Employer Login
              </button>
              <button
                onClick={() => setOpen(false)}
                className="w-full py-2.5 border border-primary text-primary rounded-full font-semibold hover:bg-primary/5 transition-colors cursor-pointer"
                aria-label="Candidate login"
              >
                Candidate Login
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;