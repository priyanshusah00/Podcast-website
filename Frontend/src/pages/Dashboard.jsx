import { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("user");
  const [profileImage, setProfileImage] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        // First check session and get user ID
        const userRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/profile`, {
          credentials: "include"
        });
        
        if (!userRes.ok) {
          navigate("/login");
          return;
        }
        
        const user = await userRes.json();
        setUserName(user.name);
        setUserRole(user.role);
        setProfileImage(user.profileImage);
        setNewProfileImage(user.profileImage);

        // Then fetch podcasts for that user
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/podcasts?user=${user._id}`, {
          credentials: "include"
        });
        
        const data = await res.json();
        
        if (res.ok) {
          setPodcasts(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/user/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ profileImage: newProfileImage })
      });
      const data = await res.json();
      if (res.ok) {
        setProfileImage(data.profileImage);
        alert("Profile image updated successfully");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset || cloudName === "your_cloud_name_here") {
      alert("Please configure your Cloudinary credentials in the .env file.");
      setUploadingImage(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setNewProfileImage(data.secure_url);
        alert("Image uploaded successfully! Click Save to update your profile.");
      } else {
        alert("Upload failed: " + data.error.message);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong during image upload");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="bg-black text-white">
      <Navbar2 />
      <div className="min-h-screen bg-black text-white px-8 py-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {userName || "User"}! 👋</h1>
            <p className="text-gray-400 mt-1">Manage your {userRole === 'creator' ? 'podcasts and view stats' : 'profile and preferences'}</p>
          </div>
          <div className="flex flex-col items-center">
            <img src={profileImage || "https://via.placeholder.com/150"} alt="Profile" className="w-16 h-16 rounded-full object-cover mb-2" />
            <span className="bg-green-500 text-black px-2 py-1 text-xs rounded font-bold uppercase">{userRole}</span>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="bg-gray-900 rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
          <div className="flex space-x-4 items-end">
            <div className="flex-1">
              <label className="text-sm text-gray-400 block mb-1">Profile Image URL</label>
              <input 
                type="text" 
                value={newProfileImage || ""} 
                onChange={(e) => setNewProfileImage(e.target.value)} 
                placeholder="https://example.com/avatar.jpg" 
                className="w-full px-4 py-3 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
              />
              <label className="text-sm text-gray-400 block mb-1">Or Upload from Gallery</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploadingImage}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-black hover:file:bg-green-400 disabled:opacity-50"
              />
              {uploadingImage && <p className="text-sm text-green-400 mt-2">Uploading image to Cloudinary...</p>}
            </div>
            <button 
              onClick={handleUpdateProfile} 
              className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              Save
            </button>
          </div>
        </div>

        {userRole === 'creator' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-gray-400 text-sm">Total Podcasts</h3>
                <p className="text-3xl font-bold mt-2">{podcasts.length}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-gray-400 text-sm">Total Listeners</h3>
                <p className="text-3xl font-bold mt-2">--</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-xl">
                <h3 className="text-gray-400 text-sm">Total Likes</h3>
                <p className="text-3xl font-bold mt-2">--</p>
              </div>
            </div>

            {/* Podcast List */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Your Podcasts</h2>

              {loading ? (
                <p className="text-gray-400">Loading podcasts...</p>
              ) : podcasts.length === 0 ? (
                <p className="text-gray-400">You haven't uploaded any podcasts yet.</p>
              ) : (
                <div className="space-y-4">
                  {podcasts.map((podcast) => (
                    <div key={podcast._id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{podcast.title}</h4>
                        <p className="text-sm text-gray-400">{podcast.category}</p>
                      </div>
                      <button className="text-green-500 hover:underline">Edit</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="mt-8 text-right">
              <button 
                onClick={() => navigate("/upload")}
                className="bg-green-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-green-400 transition"
              >
                Upload New Podcast
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
