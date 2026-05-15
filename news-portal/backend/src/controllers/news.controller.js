const News = require("../models/news.model");
const { successResponse, errorResponse } = require("../utils/response.util");

// Create News
const createNews = async (req, res) => {
  try {
    const { title, content, image, category } = req.body;

    const newNews = await News.create({
      title,
      content,
      image,
      category,
      author: req.user.id,
      authorName: req.user.name,
    });

    return successResponse(res, 201, "News created successfully", newNews);
  } catch (error) {
    return errorResponse(res, 500, "Failed to create news", error.message);
  }
};

// Get All News
const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    return successResponse(res, 200, "All news fetched successfully", news);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch news", error.message);
  }
};

// Get Top 6 News
const getTopNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(6);
    return successResponse(res, 200, "Top news fetched successfully", news);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch top news", error.message);
  }
};

// Get Single News
const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return errorResponse(res, 404, "News not found.");
    }
    return successResponse(res, 200, "News fetched successfully", news);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch news", error.message);
  }
};

// Edit News
const editNews = async (req, res) => {
  try {
    const { title, content, image, category } = req.body;

    const news = await News.findById(req.params.id);
    if (!news) {
      return errorResponse(res, 404, "News not found.");
    }

    // শুধু নিজের news edit করতে পারবে
    if (news.author.toString() !== req.user.id) {
      return errorResponse(res, 403, "You can only edit your own news.");
    }

    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, content, image, category },
      { new: true }
    );

    return successResponse(res, 200, "News updated successfully", updatedNews);
  } catch (error) {
    return errorResponse(res, 500, "Failed to update news", error.message);
  }
};

// Delete News
const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return errorResponse(res, 404, "News not found.");
    }

    // শুধু নিজের news delete করতে পারবে
    if (news.author.toString() !== req.user.id) {
      return errorResponse(res, 403, "You can only delete your own news.");
    }

    await News.findByIdAndDelete(req.params.id);

    return successResponse(res, 200, "News deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, "Failed to delete news", error.message);
  }
};

// Get User's Own News
const getUserNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.user.id }).sort({ createdAt: -1 });
    return successResponse(res, 200, "User news fetched successfully", news);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch user news", error.message);
  }
};

module.exports = {
  createNews,
  getAllNews,
  getTopNews,
  getSingleNews,
  editNews,
  deleteNews,
  getUserNews,
};