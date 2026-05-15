import { useEffect, useState } from "react";
import API from "../api/axios";
import NewsCard from "../components/NewsCard";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const res = await API.get("/news/all");
        setNews(res.data.data);
      } catch (error) {
        console.error("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">📰 All News</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-500">No news available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default News;