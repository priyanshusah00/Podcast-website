const express = require("express");
const router = express.Router();
const {
    createPodcast,
    getPodcasts,
    deletePodcast,
    getPodcastById,
    updatePodcast,
    addComment,
  } = require("../controllers/podcastController");
const protect = require("../middleware/authMiddleware");

router.route("/")
    .get(getPodcasts)
    .post(protect, createPodcast);

router.route("/:id")
    .get(getPodcastById)
    .delete(protect, deletePodcast)
    .put(protect, updatePodcast);

router.route("/:id/comments")
    .post(protect, addComment);

module.exports = router;
