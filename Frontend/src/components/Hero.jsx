import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/profile`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setUserRole(data.role);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkUser();
  }, []);

  return (
    <section className="px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-5xl font-bold leading-tight">
          Listen. Create. <br />
          <span className="text-green-500">Monetize Podcasts</span>
        </h2>

        <p className="mt-6 text-gray-400">
          Discover podcasts, follow creators, and upload audio or video shows.
        </p>

        <div className="mt-8 space-x-4">
          <Link to="/explore" className="bg-green-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-green-400 inline-block">
            Explore Podcasts
          </Link>
          {userRole === "creator" ? (
            <Link to="/dashboard" className="border border-gray-700 px-6 py-3 rounded-full hover:bg-gray-900 inline-block text-green-400 font-semibold">
              Go to Dashboard
            </Link>
          ) : userRole === "user" ? (
            <Link to="/dashboard" className="border border-gray-700 px-6 py-3 rounded-full hover:bg-gray-900 inline-block text-white">
              My Profile
            </Link>
          ) : (
            <Link to="/register?role=creator" className="border border-gray-700 px-6 py-3 rounded-full hover:bg-gray-900 inline-block">
              Become a Creator
            </Link>
          )}
        </div>
      </div>

      <img
        src="https://images.unsplash.com/photo-1589903308904-1010c2294adc"
        alt="Podcast"
        className="hidden md:block rounded-xl opacity-80"
      />
    </section>
  );
}
