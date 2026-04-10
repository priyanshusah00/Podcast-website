import { useState } from "react";
import Navbar2 from "../components/Navbar2";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, formData);
      if (response.status === 201) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: "error", message: "Failed to send message. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black text-white">
      <Navbar2 />
      <div className="min-h-screen bg-black text-white px-8 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">
            Have questions or feedback? We’d love to hear from you.
          </p>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-gray-900 p-6 rounded-xl space-y-4">
            <h2 className="text-2xl font-semibold">📬 Get in Touch</h2>
            <p className="text-gray-400">Email: support@podwave.com</p>
            <p className="text-gray-400">Phone: +91 98765 43210</p>
            <p className="text-gray-400">Location: India</p>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-6 rounded-xl">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {status && (
                <div className={`p-3 rounded-lg text-sm ${status.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {status.message}
                </div>
              )}
              
              <div>
                <label className="text-sm text-gray-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Your message..."
                  className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-green-500 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
