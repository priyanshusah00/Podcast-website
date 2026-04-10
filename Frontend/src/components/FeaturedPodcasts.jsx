import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FeaturedPodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/podcasts`);
        const data = await res.json();
        
        if (res.ok) {
          setPodcasts(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch featured podcasts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcasts();
  }, []);

  return (
    <section className="px-8 py-10">
      <h3 className="text-2xl font-semibold mb-6">🎧 Featured Podcasts</h3>

      {loading ? (
        <p className="text-gray-400">Loading podcasts...</p>
      ) : podcasts.length === 0 ? (
        <p className="text-gray-400">No podcasts available yet. Be the first to upload!</p>
      ) : (
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {podcasts.map((podcast) => (
            <div
              key={podcast._id}
              onClick={() => navigate(`/podcast/${podcast._id}`)}
              className="bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition duration-200 cursor-pointer w-[300px] flex-shrink-0"
            >
              <img
                src={podcast.coverImage || "https://via.placeholder.com/150"}
                alt={podcast.title}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />
              <h4 className="font-semibold truncate" title={podcast.title}>{podcast.title}</h4>
              <p className="text-sm text-gray-400 truncate">{podcast.category}</p>
              {podcast.user && <p className="text-xs text-gray-500 mt-1">By {podcast.user.name}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
