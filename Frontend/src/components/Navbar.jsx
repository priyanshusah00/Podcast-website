import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
      <h1
        className="text-2xl font-bold text-green-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        PodWave
      </h1>

      <input
        type="text"
        placeholder="Search podcasts..."
        className="hidden md:block bg-gray-900 px-4 py-2 rounded-full w-96 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      <div className="space-x-4">
        <button
          className="text-gray-300 hover:text-white"
          onClick={() => navigate("/login")}
        >
          Login
        </button>

        <button
          className="bg-green-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-green-400"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}
