const Podcast = require("../models/Podcast");
const User = require("../models/User");

// @desc    Create a new podcast
// @route   POST /api/podcasts
// @access  Private
const createPodcast = async (req, res) => {
  const { title, description, category, type, fileUrl, coverImage, speaker } = req.body;

  if (!title || !description || !category || !type || !fileUrl) {
    return res.status(400).json({ message: "Please fill in all required fields" });
  }

  try {
    const userObj = await User.findById(req.user);
    if (userObj && userObj.email === "demo@creator.com") {
      return res.status(403).json({ message: "Demo accounts are for showcasing only and cannot upload podcasts." });
    }

    const podcast = await Podcast.create({
      user: req.user, // Got from authMiddleware
      title,
      description,
      category,
      type,
      fileUrl,
      coverImage,
      speaker
    });

    res.status(201).json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all podcasts
// @route   GET /api/podcasts
// @access  Public
const getPodcasts = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      title: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    } : {};
    
    const category = req.query.category ? { category: req.query.category } : {};
    const user = req.query.user ? { user: req.query.user } : {};

    const podcasts = await Podcast.find({ ...keyword, ...category, ...user }).populate("user", "name email");
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single podcast
// @route   GET /api/podcasts/:id
// @access  Public
const getPodcastById = async (req, res) => {
    try {
        const podcast = await Podcast.findById(req.params.id).populate("user", "name email");

        if(podcast) {
            res.json(podcast);
        } else {
            res.status(404).json({ message: "Podcast not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a podcast
// @route   DELETE /api/podcasts/:id
// @access  Private
const deletePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Check if user is the creator
    if (podcast.user.toString() !== req.user.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await podcast.deleteOne();

    res.json({ message: "Podcast removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a podcast
// @route   PUT /api/podcasts/:id
// @access  Private
const updatePodcast = async (req, res) => {
    try {
        const podcast = await Podcast.findById(req.params.id);

        if (!podcast) {
            return res.status(404).json({ message: "Podcast not found" });
        }

        // Check if user is the creator
        if (podcast.user.toString() !== req.user.toString()) {
            return res.status(401).json({ message: "User not authorized" });
        }

        podcast.title = req.body.title || podcast.title;
        podcast.description = req.body.description || podcast.description;
        podcast.category = req.body.category || podcast.category;
        podcast.type = req.body.type || podcast.type;
        podcast.fileUrl = req.body.fileUrl || podcast.fileUrl;
        podcast.coverImage = req.body.coverImage || podcast.coverImage;
        podcast.speaker = req.body.speaker || podcast.speaker;

        const updatedPodcast = await podcast.save();
        res.json(updatedPodcast);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Add a comment to a podcast
// @route   POST /api/podcasts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    const user = await User.findById(req.user._id || req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = {
      user: user._id,
      name: user.name,
      role: user.role || 'user',
      profileImage: user.profileImage,
      text: text
    };

    podcast.comments.push(comment);
    await podcast.save();
    
    res.status(201).json(podcast);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPodcast,
  getPodcasts,
  getPodcastById,
  deletePodcast,
  updatePodcast,
  addComment,
};
