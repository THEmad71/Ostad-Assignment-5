import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/20 transition group">
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />
      )}
      <div className="p-5">
        <span className="text-xs bg-blue-900 text-blue-300 px-2 py-1 rounded-full">
          {news.category}
        </span>
        <h3 className="text-white text-lg font-bold mt-3 mb-2 leading-snug">
          {news.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {news.content.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">✍️ {news.authorName}</span>
          <Link
            to={`/news/${news._id}`}
            className="text-blue-400 text-sm font-semibold hover:text-blue-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;