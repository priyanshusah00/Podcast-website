import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const presetRole = params.get("role");
    if (presetRole === "creator") {
      setFormData((prev) => ({ ...prev, role: "creator" }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();
      
      if (res.ok) {
        alert("Account created successfully 🎉");
        navigate("/login");
      } else {
        alert(data.message || "Failed to create account");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account 🎧
        </h2>
        <p className="text-gray-400 text-center mb-6">
          Join PodWave and explore podcasts
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <div>
            <label className="text-sm text-gray-400">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Account Type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            >
              <option value="user">User</option>
              <option value="creator">Creator</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition"
          >
            Register
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="grow h-px bg-gray-700"></div>
        </div>

        <button className="w-full border border-gray-700 py-3 rounded-full hover:bg-gray-800 transition">
          Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
};

export default Register;
