import { Link } from "react-router-dom";

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
          {news.category}
        </span>
        <h3 className="text-lg font-bold mt-2 mb-1">{news.title}</h3>
        <p className="text-gray-500 text-sm mb-3">
          {news.content.substring(0, 100)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-400">✍️ {news.authorName}</span>
          <Link
            to={`/news/${news._id}`}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;