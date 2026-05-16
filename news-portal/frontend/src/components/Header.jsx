import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // একটি হেল্পার ফাংশন যা কারেন্ট পেজের ওপর বেস করে একটিভ লিংক হাইলাইট করবে
  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/75 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo - Minimal & Bold */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl font-black tracking-tight text-slate-900 hover:opacity-90 transition-opacity"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-600/20">
            N
          </span>
          <span>News<span className="text-indigo-600">Portal</span></span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-1 sm:gap-4 items-center">
          
          {/* Main Navigation - NavLink Style Items */}
          <div className="hidden md:flex gap-1 mr-2">
            {[
              { name: "Home", path: "/" },
              { name: "News", path: "/news" },
              { name: "Contact", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Conditional Auth Sections */}
          <div className="flex items-center gap-2 border-l border-slate-200/60 pl-2 md:pl-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive("/dashboard")
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 border border-red-100/60 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white hover:border-red-500 shadow-sm transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-slate-950 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-600 shadow-md shadow-slate-950/10 hover:shadow-indigo-600/20 transition-all duration-300 transform active:scale-98"
                >
                  Register
                </Link>
              </>
            )}
          </div>

        </nav>
      </div>
    </header>
  );
};

export default Header;