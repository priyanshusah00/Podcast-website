const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, demoLogin } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/demo", demoLogin);

module.exports = router;
