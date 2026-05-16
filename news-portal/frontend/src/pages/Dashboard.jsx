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

  // Auto-clear notification messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put("/users/update-profile", form);
      setMessage("✨ Profile updated successfully!");
    } catch (error) {
      setMessage("❌ Failed to update profile.");
    }
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/news/create", newNews);
      setMyNews([res.data.data, ...myNews]);
      setNewNews({ title: "", content: "", category: "General", image: "" });
      setMessage("🚀 News published successfully!");
    } catch (error) {
      setMessage("❌ Failed to create news.");
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await API.delete(`/news/delete/${id}`);
      setMyNews(myNews.filter((n) => n._id !== id));
      setMessage("🗑️ News deleted successfully!");
    } catch (error) {
      setMessage("❌ Failed to delete news.");
    }
  };

  const handleEditNews = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put(`/news/edit/${editNews._id}`, editNews);
      setMyNews(myNews.map((n) => (n._id === editNews._id ? res.data.data : n)));
      setEditNews(null);
      setMessage("📝 News updated successfully!");
    } catch (error) {
      setMessage("❌ Failed to update news.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-slate-500 tracking-wide">Loading workspace...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Modern Toast Notification */}
        {message && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-slate-900/20 border border-slate-800 flex items-center gap-3 animate-slideIn text-sm font-medium">
            {message}
          </div>
        )}

        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-slate-200/60">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Creator Studio</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your profile and publish global stories.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-2.5 flex items-center gap-3 self-start md:self-auto">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm uppercase">
              {user?.name ? user.name[0] : "U"}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Logged in as</p>
              <p className="text-sm font-bold text-indigo-950">{user?.name || "User"}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Profile & Content Creation */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            
            {/* 1. Profile Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span>👤</span> Account Settings
              </h2>
              <form onSubmit={handleProfileUpdate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Display Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Short Bio</label>
                  <textarea
                    placeholder="Tell the audience about yourself..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                    rows={3}
                  />
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
                  Save Changes
                </button>
              </form>
            </div>

            {/* 2. Create News Section */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                <span>✍️</span> Compose News
              </h2>
              <form onSubmit={handleCreateNews} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Catchy Headline"
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  required
                />
                <textarea
                  placeholder="Write your scoop here..."
                  value={newNews.content}
                  onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none"
                  rows={5}
                  required
                />
                <input
                  type="text"
                  placeholder="Cover Image URL (Optional)"
                  value={newNews.image}
                  onChange={(e) => setNewNews({ ...newNews, image: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
                  <select
                    value={newNews.category}
                    onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                  >
                    <option>General</option>
                    <option>Politics</option>
                    <option>Sports</option>
                    <option>Technology</option>
                    <option>Entertainment</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-500 shadow-md shadow-indigo-600/10 transition-all">
                  Publish Article
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: News Articles Feed / Manager */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 min-h-[500px]">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span>📰</span> Your Publications 
              <span className="text-xs font-normal bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full ml-1">
                {myNews.length}
              </span>
            </h2>

            {myNews.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                <p className="text-3xl mb-2">📥</p>
                <p className="text-slate-400 text-sm font-medium">No articles published under your name yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {myNews.map((item) => (
                  <div key={item._id} className="border border-slate-100 bg-slate-50/40 rounded-2xl p-5 hover:border-slate-200 hover:bg-slate-50 transition-all duration-200">
                    
                    {editNews && editNews._id === item._id ? (
                      /* Inline Editing Mode */
                      <form onSubmit={handleEditNews} className="flex flex-col gap-4 animate-fadeIn">
                        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Editing Mode</span>
                        <input
                          type="text"
                          value={editNews.title}
                          onChange={(e) => setEditNews({ ...editNews, title: e.target.value })}
                          className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold focus:outline-none focus:border-indigo-500"
                        />
                        <textarea
                          value={editNews.content}
                          onChange={(e) => setEditNews({ ...editNews, content: e.target.value })}
                          className="w-full bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-indigo-500 resize-none"
                          rows={4}
                        />
                        <div className="flex gap-2 justify-end">
                          <button type="button" onClick={() => setEditNews(null)} className="bg-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-medium hover:bg-slate-300 transition-colors">
                            Cancel
                          </button>
                          <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-xs font-medium hover:bg-indigo-500 transition-colors">
                            Save Updates
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* Regular Display Mode */
                      <div className="flex flex-col justify-between h-full gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200/80 text-slate-500">
                              {item.category || "General"}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-slate-500 text-xs mt-1.5 line-clamp-2 font-light leading-relaxed">
                            {item.content}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 items-center justify-end border-t border-slate-100 pt-3 mt-1">
                          <button
                            onClick={() => setEditNews(item)}
                            className="text-slate-500 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNews(item._id)}
                            className="text-red-600 hover:text-white hover:bg-red-500 bg-red-50 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;