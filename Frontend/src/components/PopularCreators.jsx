import { useState, useEffect } from "react";

export default function PopularCreators() {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/creators`);
        const data = await res.json();
        if (res.ok) {
          setCreators(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  return (
    <section className="px-8 py-10">
      <h3 className="text-2xl font-semibold mb-6">🔥 Popular Creators</h3>
      {loading ? (
        <p className="text-gray-400">Loading creators...</p>
      ) : creators.length === 0 ? (
        <p className="text-gray-400">No creators found.</p>
      ) : (
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {creators.map((creator) => (
            <div key={creator._id} className="text-center min-w-[100px] flex-shrink-0">
              <img 
                src={creator.profileImage || "https://via.placeholder.com/150"} 
                alt={creator.name} 
                className="w-24 h-24 rounded-full mb-2 object-cover mx-auto" 
              />
              <p className="font-medium truncate max-w-[120px]">{creator.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
