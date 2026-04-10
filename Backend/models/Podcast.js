const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    type: {
        type: String,
        enum: ['audio', 'video'],
        required: [true, "Please specify type (audio or video)"],
    },
    fileUrl: {
      type: String,
      required: [true, "Please add a file URL"],
    },
    coverImage: {
      type: String, // URL to cover image
      default: "https://via.placeholder.com/150", 
    },
    speaker: {
        type: String,
        default: ""
    },
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        profileImage: { type: String },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  {
    timestamps: true,
  }
);

// Indexes for query optimization
podcastSchema.index({ user: 1 });
podcastSchema.index({ category: 1 });

module.exports = mongoose.model("Podcast", podcastSchema);
