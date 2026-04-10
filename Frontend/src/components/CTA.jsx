
import { useNavigate } from "react-router-dom";
export default function CTA() {
  const navigate = useNavigate();
  return (
    <section className="px-8 py-16 text-center bg-linear-to-r from-green-500 to-green-400 text-black rounded-xl mx-8 my-10">
      <h3 className="text-3xl font-bold">Ready to start your podcast?</h3>
      <p className="mt-4">Upload audio or video and grow your audience.</p>

      <button 
        className="mt-6 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
        onClick={() => navigate("/create-podcast")}
      >
        Start Creating
      </button>
    </section>
  );
}
