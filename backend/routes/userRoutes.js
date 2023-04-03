const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  updateUserProfile,
} = require("../controllers/userController");

// for register
router.post("/register", registerUser);
// for login
router.post("/login", loginUser);
// for updating
router.route("/profile").post(protect, updateUserProfile);

module.exports = router;
