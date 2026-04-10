import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";

export default function PodcastDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/podcasts/${id}`);
        const data = await res.json();
        
        if (res.ok) {
          setPodcast(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch podcast details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPodcast();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/podcasts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: newComment })
      });

      const data = await res.json();
      if (res.ok) {
        setPodcast(data);
        setNewComment("");
      } else if (res.status === 401) {
        alert("Please login to comment");
        navigate("/login");
      } else {
        alert(data.message || "Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmittingComment(false);
    }
  };

  const renderMediaPlayer = (podcast) => {
    if (!podcast.fileUrl) return null;

    const isYouTube = podcast.fileUrl.includes("youtube.com") || podcast.fileUrl.includes("youtu.be");

    if (isYouTube) {
      let videoId = "";
      if (podcast.fileUrl.includes("youtube.com/watch")) {
        videoId = new URL(podcast.fileUrl).searchParams.get("v");
      } else if (podcast.fileUrl.includes("youtu.be/")) {
        videoId = podcast.fileUrl.split("youtu.be/")[1]?.split("?")[0];
      }

      if (videoId) {
        return (
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            ></iframe>
          </div>
        );
      }
    }

    if (podcast.type === "video") {
      return (
        <video 
          controls 
          autoPlay 
          src={podcast.fileUrl} 
          className="w-full max-h-[70vh] rounded-xl shadow-2xl object-cover bg-black"
        >
          Your browser does not support the video element.
        </video>
      );
    } else {
      return (
        <div className="w-full p-6 bg-gray-900 rounded-xl shadow-xl flex flex-col items-center">
          <img 
            src={podcast.coverImage || "https://via.placeholder.com/300"} 
            alt={podcast.title} 
            className="w-48 h-48 object-cover rounded-full mb-6 shadow-lg border-4 border-gray-800" 
          />
          <audio controls autoPlay src={podcast.fileUrl} className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar2 />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-gray-400">Loading media...</p>
        </div>
      </div>
    );
  }

  if (!podcast) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar2 />
        <div className="flex-grow flex items-center justify-center flex-col">
          <p className="text-xl text-gray-400 mb-4">Podcast not found.</p>
          <button onClick={() => navigate(-1)} className="text-green-500 hover:text-green-400 transition">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar2 />
      <div className="flex-grow max-w-6xl w-full mx-auto px-6 py-10">
        <button onClick={() => navigate(-1)} className="mb-6 flex items-center text-gray-400 hover:text-white transition">
           &larr; Back
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{podcast.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6">
            <span className="bg-gray-800 px-3 py-1 rounded-full">{podcast.category}</span>
            {podcast.user && <span>By {podcast.user.name}</span>}
            {podcast.speaker && <span>🗣️ {podcast.speaker}</span>}
          </div>
          
          <div className="w-full mb-8">
             {renderMediaPlayer(podcast)}
          </div>
          
          <div className="bg-gray-900 rounded-xl p-8 shadow-lg mb-8">
            <h3 className="text-2xl font-semibold mb-4">About this {podcast.type || "podcast"}</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{podcast.description}</p>
          </div>

          <div className="bg-gray-900 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-6">Comments ({podcast.comments ? podcast.comments.length : 0})</h3>
            
            <form onSubmit={handleCommentSubmit} className="mb-8 flex flex-col items-end">
              <textarea 
                className="w-full bg-gray-800 text-white rounded-lg p-4 focus:ring-2 focus:ring-green-500 focus:outline-none resize-none mb-3"
                rows="3"
                placeholder="What do you think?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button 
                type="submit" 
                disabled={submittingComment}
                className="bg-green-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-green-400 transition disabled:opacity-50"
              >
                {submittingComment ? "Posting..." : "Post Comment"}
              </button>
            </form>

            <div className="space-y-6">
              {podcast.comments && podcast.comments.length > 0 ? (
                // slice().reverse() is used so newest comments appear first without modifying the original array
                podcast.comments.slice().reverse().map((comment) => (
                  <div key={comment._id} className="flex space-x-4 border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                    <img 
                      src={comment.profileImage || "https://via.placeholder.com/150"} 
                      alt={comment.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className={`text-gray-200 ${comment.role === 'creator' ? 'font-bold' : 'font-medium'}`}>
                          {comment.name}
                        </span>
                        {comment.role === 'creator' && (
                          <span className="text-[10px] bg-green-500 text-black px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">CREATOR</span>
                        )}
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-400 mt-1 whitespace-pre-wrap">{comment.text}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
