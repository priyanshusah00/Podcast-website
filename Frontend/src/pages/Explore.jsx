import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const fetchPodcasts = async (searchKeyword = "", searchCategory = "") => {
    setLoading(true);
    try {
      let query = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/podcasts?`;
      if (searchKeyword) query += `keyword=${encodeURIComponent(searchKeyword)}&`;
      if (searchCategory) query += `category=${encodeURIComponent(searchCategory)}&`;

      const res = await fetch(query);
      const data = await res.json();

      if (res.ok) {
        setPodcasts(data);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch podcasts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch using state derived from URL
    fetchPodcasts(keyword, category);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchPodcasts(keyword, category);
  };

  const categories = ["Technology", "Lifestyle", "Education", "Comedy", "Business", "Health", "Music"];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar2 />
      <div className="flex-grow max-w-7xl w-full mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">Explore Podcasts 🎙️</h1>

        {/* Search and Filter Section */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search by title..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-grow bg-gray-900 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-800"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-900 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 border border-gray-800 appearance-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-green-400 transition"
          >
            Search
          </button>
        </form>

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <p className="text-xl text-gray-400">Loading podcasts...</p>
          </div>
        ) : podcasts.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
            <p className="text-2xl text-gray-400 mb-4">No podcasts found.</p>
            <button 
              onClick={() => { setKeyword(""); setCategory(""); fetchPodcasts(); }} 
              className="text-green-500 hover:text-green-400"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {podcasts.map((podcast) => (
              <div
                key={podcast._id}
                onClick={() => navigate(`/podcast/${podcast._id}`)}
                className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition duration-200 cursor-pointer flex flex-col h-full border border-transparent hover:border-gray-700"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 bg-gray-800">
                  <img
                    src={podcast.coverImage || "https://via.placeholder.com/300"}
                    alt={podcast.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs font-bold text-white uppercase backdrop-blur-sm">
                    {podcast.type || "audio"}
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg truncate mb-1 text-white">{podcast.title}</h3>
                
                <p className="text-sm text-gray-400 mb-2 truncate">
                  {podcast.user ? podcast.user.name : "Unknown Creator"}
                </p>
                
                <div className="mt-auto flex justify-between items-center text-xs text-gray-500">
                  <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded">{podcast.category}</span>
                  {podcast.speaker && <span>🗣️ {podcast.speaker}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
