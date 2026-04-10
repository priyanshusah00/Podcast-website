import Navbar2 from "../components/Navbar2";
import { useNavigate } from "react-router-dom";

const StartCreating = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white">
    <Navbar2/>
    <div className="min-h-screen bg-black text-white px-8 py-12">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Start Creating 🎙️
        </h1>
        <p className="text-gray-400 text-lg">
          Share your voice with the world. Create and publish your podcast on PodWave.
        </p>
      </div>

      {/* Steps */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-2">1️⃣ Create Content</h2>
          <p className="text-gray-400">
            Record high-quality audio or video podcasts on topics you love.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-2">2️⃣ Upload Podcast</h2>
          <p className="text-gray-400">
            Upload your episodes with title, description, and category.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-semibold mb-2">3️⃣ Grow Audience</h2>
          <p className="text-gray-400">
            Reach listeners, gain followers, and build your podcast community.
          </p>
        </div>

      </div>

      {/* Creator Benefits */}
      <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-xl mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Why Create on PodWave?
        </h2>

        <ul className="list-disc list-inside text-gray-400 space-y-3">
          <li>Upload audio and video podcasts</li>
          <li>Clean, modern creator dashboard</li>
          <li>Discoverability through categories</li>
          <li>Future monetization support</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button 
          onClick={() => navigate("/upload")}
          className="bg-green-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-green-400 transition"
        >
          Upload Your First Podcast
        </button>
      </div>

    </div>
    </div>
  );
};

export default StartCreating;
