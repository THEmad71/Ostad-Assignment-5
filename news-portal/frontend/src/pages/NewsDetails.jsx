import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await API.get(`/news/single/${id}`);
        setNews(res.data.data);
      } catch (error) {
        console.error("Failed to fetch news");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!news) return <p className="text-center py-20">News not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {news.image && (
        <img src={news.image} alt={news.title} className="w-full h-96 object-cover rounded-lg mb-6" />
      )}
      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{news.category}</span>
      <h1 className="text-4xl font-bold mt-4 mb-2">{news.title}</h1>
      <p className="text-gray-400 text-sm mb-6">✍️ {news.authorName} · {new Date(news.createdAt).toLocaleDateString()}</p>
      <p className="text-gray-700 text-lg leading-relaxed">{news.content}</p>
    </div>
  );
};

export default NewsDetails;