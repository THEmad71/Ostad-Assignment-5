const router = require("express").Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Public Routes (token লাগবে না)
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Routes (token লাগবে)
router.get("/profile", authMiddleware, getUserProfile);
router.put("/update-profile", authMiddleware, updateUserProfile);

module.exports = router;