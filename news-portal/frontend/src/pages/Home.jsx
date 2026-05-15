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
    <div>
      {/* Hero Section */}
      <section className="bg-blue-700 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Welcome to News Portal</h1>
        <p className="text-xl mb-8">Stay updated with the latest news</p>
        <Link
          to="/news"
          className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100"
        >
          Read All News
        </Link>
      </section>

      {/* Top News Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">🔥 Top News</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : topNews.length === 0 ? (
          <p className="text-center text-gray-500">No news available yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topNews.map((news) => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          News Portal is your one-stop destination for the latest news and
          updates. Our registered users can publish their own news and share
          it with the world.
        </p>
      </section>

      {/* Join Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
        <p className="text-gray-600 mb-6">
          Register and start publishing your own news!
        </p>
        <Link
          to="/register"
          className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800"
        >
          Get Started
        </Link>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-50 py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-600 mb-6">
          Have any questions? We'd love to hear from you.
        </p>
        <Link
          to="/contact"
          className="bg-blue-700 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};

export default Home;