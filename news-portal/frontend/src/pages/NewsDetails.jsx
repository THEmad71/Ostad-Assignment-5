import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-400 tracking-wide">Loading article...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-center px-4">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Article Not Found</h2>
        <p className="text-slate-400 text-sm max-w-xs mb-6 font-light">The story you are looking for might have been removed or deleted.</p>
        <Link to="/news" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
          Back to News Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-24">
      
      {/* 1. Header / Meta Info Area */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 md:pt-24 text-center">
        
        {/* Category Tag */}
        <span className="inline-block text-[11px] font-extrabold tracking-widest uppercase bg-indigo-50 text-indigo-600 px-3.5 py-1.5 rounded-md border border-indigo-100/80 mb-6">
          {news.category || "General"}
        </span>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-8 max-w-3xl mx-auto">
          {news.title}
        </h1>

        {/* Author & Date Section */}
        <div className="flex items-center justify-center gap-3 pb-10 border-b border-slate-200/60 max-w-xl mx-auto">
          {/* Avatar Icon */}
          <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm uppercase shadow-sm">
            {news.authorName ? news.authorName[0] : "A"}
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900 leading-none mb-1">
              {news.authorName || "Independent Reporter"}
            </p>
            <p className="text-xs text-slate-400 font-light">
              Published on {new Date(news.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </header>

      {/* 2. Featured Image Section */}
      {news.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 my-10">
          <div className="relative aspect-[16/9] md:max-h-[500px] w-full overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <img 
              src={news.image} 
              alt={news.title} 
              className="w-full h-full object-cover transform hover:scale-[1.01] transition-transform duration-700 ease-out" 
            />
          </div>
        </div>
      )}

      {/* 3. Main Body Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6">
        <article className="prose prose-slate max-w-none">
          {/* Paragraph Formatting with proper Reading Spacing */}
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal whitespace-pre-line selection:bg-indigo-100">
            {news.content}
          </p>
        </article>

        {/* Back Button Shortcut at the end */}
        <div className="mt-16 pt-8 border-t border-slate-200/60 flex justify-start">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 
            Back to Articles
          </Link>
        </div>
      </main>

    </div>
  );
};

export default NewsDetails;