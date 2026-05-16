import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/60 text-slate-600 font-sans mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-200/60">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-600/20">
                N
              </span>
              <span>News<span className="text-indigo-600">Portal</span></span>
            </Link>
            <p className="text-sm text-slate-400 font-light max-w-xs leading-relaxed">
              Your trusted source for unbiased journalism, real-time updates, and community-driven insights.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Quick Navigation</h4>
            <div className="flex flex-wrap md:flex-col gap-x-4 gap-y-2">
              <Link to="/" className="text-sm text-slate-400 hover:text-indigo-600 font-medium transition-colors">Home</Link>
              <Link to="/news" className="text-sm text-slate-400 hover:text-indigo-600 font-medium transition-colors">Latest News</Link>
              <Link to="/contact" className="text-sm text-slate-400 hover:text-indigo-600 font-medium transition-colors">Contact Us</Link>
            </div>
          </div>

          {/* Column 3: Stats / Note */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1">Empowering Voices</h4>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Every registered user can become a creator. Speak your truth and share insightful stories with the entire world.
            </p>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-xs text-slate-400 font-light">
          <p>© {currentYear} NewsPortal. All rights rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;