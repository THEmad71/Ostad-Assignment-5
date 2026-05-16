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
    <div className="bg-gray-950 text-white min-h-screen">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 py-28 px-6 text-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 to-transparent"></div>
        <span className="inline-block bg-blue-600 text-xs font-semibold px-4 py-1 rounded-full mb-6 tracking-widest uppercase">
          🗞️ Live News
        </span>
        <h1 className="text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          Stay Ahead with <br />
          <span className="text-blue-400">Today's Top Stories</span>
        </h1>
        <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
          Real news, real people. Publish and discover stories that matter.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/news"
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-bold transition"
          >
            Read All News
          </Link>
          <Link
            to="/register"
            className="border border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-full font-bold transition"
          >
            Start Publishing
          </Link>
        </div>
      </section>

      {/* Top News Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">🔥 Top Stories</h2>
          <Link to="/news" className="text-blue-400 hover:underline text-sm">
            View All →
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : topNews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No news published yet.</p>
            <Link to="/register" className="text-blue-400 hover:underline mt-2 inline-block">
              Be the first to publish →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-4xl font-extrabold">500+</p>
            <p className="text-blue-200 mt-1">News Published</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">200+</p>
            <p className="text-blue-200 mt-1">Active Writers</p>
          </div>
          <div>
            <p className="text-4xl font-extrabold">10K+</p>
            <p className="text-blue-200 mt-1">Monthly Readers</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <span className="inline-block bg-gray-800 text-blue-400 text-xs font-semibold px-4 py-1 rounded-full mb-4 tracking-widest uppercase">
          About Us
        </span>
        <h2 className="text-4xl font-bold mb-6">The Platform for <span className="text-blue-400">Real Stories</span></h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          News Portal is your one-stop destination for the latest news and updates.
          Our registered users can publish their own news and share it with the world.
          No gatekeepers. Just stories.
        </p>
      </section>

      {/* Join Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Ready to Publish?</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
          Join thousands of writers sharing their stories every day.
        </p>
        <Link
          to="/register"
          className="bg-white text-blue-700 px-10 py-3 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Get Started Free
        </Link>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 text-center bg-gray-900">
        <h2 className="text-4xl font-bold mb-4">Have Questions?</h2>
        <p className="text-gray-400 mb-8">
          We're always here to help. Reach out anytime.
        </p>
        <Link
          to="/contact"
          className="border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-bold transition"
        >
          Contact Us
        </Link>
      </section>

    </div>
  );
};

export default Home;