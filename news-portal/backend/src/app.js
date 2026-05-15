const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const newsRoutes = require("./routes/news.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 News Portal API is running!" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

module.exports = app;