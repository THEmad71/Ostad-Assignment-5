import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopNews = async () => {
      try {
        const res = await API.get("/news/top");
        setTopNews(res.data.data);
      } catch (error) {
        console.error("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    fetchTopNews();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans">
      
      {/* 1. Hero Section - Modern Gradient & Typography */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-28 px-6 text-center">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm border border-indigo-500/30">
            ✨ Welcome to the Future of News
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
            Stay Ahead With Clear, Concise Insights
          </h1>
          <p className="text-base md:text-lg text-slate-300 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Real-time global updates, unbiased journalism, and community-driven stories tailored just for you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/news"
              className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-xl font-medium shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-0.5 text-center"
            >
              Explore All News
            </Link>
            <Link
              to="/register"
              className="w-full sm:w-auto bg-slate-800/60 text-slate-200 px-8 py-3.5 rounded-xl font-medium border border-slate-700 hover:bg-slate-800 hover:text-white backdrop-blur-sm transition-all duration-300 text-center"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Top News Section - Grid with Aesthetic Spacing */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Trending Now</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Today's Highlights
          </h2>
          <div className="w-12 h-1 bg-indigo-600 rounded-full mt-4"></div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-400 tracking-wide">Curating latest feeds...</p>
          </div>
        ) : topNews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm max-w-md mx-auto">
            <p className="text-slate-400 font-medium">No featured stories available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topNews.map((news) => (
              <div key={news._id} className="transition-transform duration-300 hover:-translate-y-1">
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. About Section - Clean White Card Layout */}
      <section className="bg-white border-y border-slate-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">
            Who We Are
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto font-light">
            <strong className="font-semibold text-indigo-600">News Portal</strong> is a decentralized publishing platform empowering voice and truth. We bridge the gap between independent reporters and readers worldwide, ensuring authentic information flows freely.
          </p>
        </div>
      </section>

      {/* 4. Double Action / Footer Promo Sections - Split Aesthetic Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Join Section */}
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-10 rounded-3xl border border-indigo-100 flex flex-col justify-between items-start group">
          <div>
            <div className="w-12 h-12 bg-indigo-600/10 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl mb-6">✍️</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Share Your Story</h3>
            <p className="text-slate-600 leading-relaxed mb-8">
              Got a scoop or an insightful article? Join our community of creators and publish your news globally.
            </p>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-slate-950 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-colors duration-300 shadow-sm"
          >
            Get Started
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-10 rounded-3xl text-white flex flex-col justify-between items-start group">
          <div>
            <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-6">✉️</div>
            <h3 className="text-2xl font-bold mb-3">Need Assistance?</h3>
            <p className="text-slate-400 leading-relaxed mb-8">
              Have questions, feedback, or business inquiries? Our dedicated support team is here to help you 24/7.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-xl font-medium hover:bg-slate-100 transition-colors duration-300 shadow-sm"
          >
            Contact Support
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

      </section>
    </div>
  );
};

export default Home;