import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); // Typing শুরু করলে এরর মেসেজ নিজে থেকেই চলে যাবে
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50/40 font-sans px-4">
      
      {/* Decorative Subtle Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-200/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 w-full max-w-md relative z-10 transition-all duration-300">
        
        {/* Brand / Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white font-bold text-xl mb-4 shadow-md shadow-indigo-600/20">
            N
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-400 mt-1 font-light">
            Enter your credentials to access your account
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-800 rounded-xl flex items-center gap-2.5 animate-fadeIn text-sm font-medium">
            <span className="w-5 h-5 bg-red-500/10 text-red-500 flex items-center justify-center rounded-full text-xs font-bold">!</span>
            {error}
          </div>
        )}

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-indigo-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200/80 px-4 py-3 rounded-xl text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-950 text-white py-3.5 rounded-xl text-sm font-medium shadow-md shadow-slate-950/10 hover:bg-indigo-600 hover:shadow-indigo-600/20 disabled:bg-slate-400 disabled:shadow-none transition-all duration-300 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Bottom Link */}
        <p className="text-center mt-8 text-sm text-slate-500 font-light">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-semibold hover:text-indigo-500 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;