import { useEffect, useState } from "react";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const { user, getProfile } = useAuthStore();
  const [myNews, setMyNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", bio: "" });
  const [editNews, setEditNews] = useState(null);
  const [newNews, setNewNews] = useState({ title: "", content: "", category: "General", image: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getProfile();
        const res = await API.get("/news/my-news");
        setMyNews(res.data.data);
      } catch (error) {
        console.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user) setForm({ name: user.name || "", bio: user.bio || "" });
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/update-profile", form);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage("Failed to update profile.");
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/news/create", newNews);
      setMyNews([res.data.data, ...myNews]);
      setNewNews({ title: "", content: "", category: "General", image: "" });
      setMessage("News created successfully!");
    } catch (error) {
      setMessage("Failed to create news.");
    }
  };

  const handleDeleteNews = async (id) => {
    try {
      await API.delete(`/news/delete/${id}`);
      setMyNews(myNews.filter((n) => n._id !== id));
      setMessage("News deleted successfully!");
    } catch (error) {
      setMessage("Failed to delete news.");
    }
  };

  const handleEditNews = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/news/edit/${editNews._id}`, editNews);
      setMyNews(myNews.map((n) => (n._id === editNews._id ? res.data.data : n)));
      setEditNews(null);
      setMessage("News updated successfully!");
    } catch (error) {
      setMessage("Failed to update news.");
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">📊 Dashboard</h1>

      {message && (
        <p className="text-center text-green-600 font-semibold mb-6">{message}</p>
      )}

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">👤 Update Profile</h2>
        <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          <button type="submit" className="bg-blue-700 text-white py-2 rounded font-semibold hover:bg-blue-800">
            Update Profile
          </button>
        </form>
      </div>

      {/* Create News Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">✍️ Create News</h2>
        <form onSubmit={handleCreateNews} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={newNews.title}
            onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Content"
            value={newNews.content}
            onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newNews.image}
            onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newNews.category}
            onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>General</option>
            <option>Politics</option>
            <option>Sports</option>
            <option>Technology</option>
            <option>Entertainment</option>
          </select>
          <button type="submit" className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">
            Publish News
          </button>
        </form>
      </div>

      {/* My News Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">📰 My News</h2>
        {myNews.length === 0 ? (
          <p className="text-gray-500">No news published yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {myNews.map((item) => (
              <div key={item._id} className="border rounded-lg p-4">
                {editNews && editNews._id === item._id ? (
                  <form onSubmit={handleEditNews} className="flex flex-col gap-3">
                    <input
                      type="text"
                      value={editNews.title}
                      onChange={(e) => setEditNews({ ...editNews, title: e.target.value })}
                      className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={editNews.content}
                      onChange={(e) => setEditNews({ ...editNews, content: e.target.value })}
                      className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
                        Save
                      </button>
                      <button type="button" onClick={() => setEditNews(null)} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.content.substring(0, 100)}...</p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => setEditNews(item)}
                        className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNews(item._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;