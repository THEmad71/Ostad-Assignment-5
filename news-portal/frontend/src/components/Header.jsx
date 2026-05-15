import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Header = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        📰 News Portal
      </Link>

      <nav className="flex gap-6 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/news" className="hover:underline">News</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>

        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-700 px-4 py-1 rounded font-semibold hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link
              to="/register"
              className="bg-white text-blue-700 px-4 py-1 rounded font-semibold hover:bg-gray-100"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;