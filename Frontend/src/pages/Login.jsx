 import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const authenticateUser = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      
      if (res.ok) {
        navigate("/home"); 
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleDemoLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (res.ok) {
        navigate("/home"); 
      } else {
        alert("Failed to login to demo account");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the demo login.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-md shadow-lg">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">Welcome Back 🎧</h2>
        <p className="text-gray-400 text-center mb-6">Login to your account</p>

        {/* Form */}
        <form className="space-y-4" onSubmit={authenticateUser}>
          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-green-500 hover:underline bg-none border-none cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow h-px bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="grow h-px bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <button className="w-full border border-gray-700 py-3 rounded-full hover:bg-gray-800 transition mb-4">
          Continue with Google
        </button>

        {/* Demo Login */}
        <button 
          type="button" 
          onClick={handleDemoLogin} 
          className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-500 transition"
        >
          Try Demo Account
        </button>

        {/* Signup */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-green-500 hover:underline bg-none border-none cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
