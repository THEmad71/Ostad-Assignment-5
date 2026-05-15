const router = require("express").Router();
const {
  createNews,
  getAllNews,
  getTopNews,
  getSingleNews,
  editNews,
  deleteNews,
  getUserNews,
} = require("../controllers/news.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Public Routes (token লাগবে না)
router.get("/all", getAllNews);
router.get("/top", getTopNews);
router.get("/single/:id", getSingleNews);

// Protected Routes (token লাগবে)
router.post("/create", authMiddleware, createNews);
router.put("/edit/:id", authMiddleware, editNews);
router.delete("/delete/:id", authMiddleware, deleteNews);
router.get("/my-news", authMiddleware, getUserNews);

module.exports = router;