import { useState } from "react";
import Navbar2 from "../components/Navbar2";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "audio",
    fileUrl: "",
    coverImage: "",
    speaker: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/podcasts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        alert("Please login first");
        navigate("/login");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        alert("Podcast uploaded successfully! 🎉");
        navigate("/dashboard");
      } else {
        alert(data.message || "Failed to upload podcast");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar2 />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="bg-gray-900 p-8 rounded-2xl w-full max-w-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-2">Upload Podcast 🎙️</h2>
          <p className="text-gray-400 text-center mb-6">Share your voice with the world</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-400">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="title"
                required
                placeholder="Podcast Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Description <span className="text-red-500">*</span></label>
              <textarea
                name="description"
                required
                placeholder="What is this podcast about?"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Category <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="category"
                  required
                  placeholder="e.g. Technology, Business"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Type <span className="text-red-500">*</span></label>
                <select
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
                >
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400">File URL <span className="text-red-500">*</span></label>
              <input
                type="url"
                name="fileUrl"
                required
                placeholder="Link to your audio or video file"
                value={formData.fileUrl}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Cover Image URL</label>
              <input
                type="url"
                name="coverImage"
                placeholder="Link to cover image (optional)"
                value={formData.coverImage}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Speaker Name</label>
              <input
                type="text"
                name="speaker"
                placeholder="Who is speaking? (optional)"
                value={formData.speaker}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-black py-3 rounded-full font-semibold hover:bg-green-400 transition mt-6"
            >
              Publish Podcast
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
