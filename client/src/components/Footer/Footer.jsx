import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 mt-12" aria-label="Global Footer">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Jobs Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Jobs
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Frontend Developer Jobs">
                  Frontend Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Backend Developer Jobs">
                  Backend Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Full Stack Developer Jobs">
                  Full Stack Jobs
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Remote Developer Jobs">
                  Remote Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Companies Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Companies
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Jobs at Google">
                  Google
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Jobs at Microsoft">
                  Microsoft
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Jobs at Amazon">
                  Amazon
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Jobs at Netflix">
                  Netflix
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Guide Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Career Guide
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors" aria-label="Resume Writing Tips">
                  Resume Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" aria-label="Interview Preparation Advice">
                  Interview Prep
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" aria-label="Salary Negotiation Guide">
                  Salary Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" aria-label="Career Growth Blog">
                  Career Blog
                </a>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Our Story and Mission">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Join our Careers">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Press and Media information">
                  Press
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Trust and Safety guidelines">
                  Trust & Safety
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Visit Help Center">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="View Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="View Terms of Service">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors" aria-label="Contact support team">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>© 2026 Apna Clone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;