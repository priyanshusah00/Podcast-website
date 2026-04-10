import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaPodcast } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function Navbar2() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
    } catch (e) {
      console.error(e);
    }
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
      {/* Logo */}
      <h1
        className="text-2xl font-bold text-green-500 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        PodWave
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search podcasts..."
        className="hidden md:block bg-gray-900 px-4 py-2 rounded-full w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            navigate(`/explore?keyword=${encodeURIComponent(e.target.value)}`);
          }
        }}
      />

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        <button
          className="flex items-center text-gray-400 text-sm hover:underline"
          onClick={() => navigate("/Dashboard")}
        >
          <RxDashboard className="mr-2" />
          My Dashboard
        </button>
        <button
          className="flex items-center text-gray-400 text-sm hover:underline"
          onClick={() => navigate("/explore")}
        >
          <FaPodcast className="mr-2" />
          Explore Podcasts
        </button>
        <button
          className="text-gray-400 text-sm hover:underline"
          onClick={() => navigate("/contact")}
        >
          Contact Us
        </button>
        <button
          className="text-gray-400 text-sm hover:underline"
          onClick={() => navigate("/about")}
        >
          About Us
        </button>
        <button
          className="flex items-center text-red-400 text-sm hover:text-red-300 transition"
          onClick={handleLogout}
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>
    </nav>
  );
}
