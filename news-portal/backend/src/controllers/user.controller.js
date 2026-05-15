const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { successResponse, errorResponse } = require("../utils/response.util");

// User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists.");
    }

    // Password encrypt করো
    const hashedPassword = await bcrypt.hash(password, 10);

    // New user তৈরি করো
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return successResponse(res, 201, "User registered successfully", {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    return errorResponse(res, 500, "Registration failed", error.message);
  }
};

// User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // User খোঁজো
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "User not found.");
    }

    // Password চেক করো
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid password.");
    }

    // Token তৈরি করো
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return successResponse(res, 200, "User login successful", { token });
  } catch (error) {
    return errorResponse(res, 500, "Login failed", error.message);
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return errorResponse(res, 404, "User not found.");
    }
    return successResponse(res, 200, "User profile fetched successfully", user);
  } catch (error) {
    return errorResponse(res, 500, "Failed to fetch profile", error.message);
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, profilePicture },
      { new: true }
    ).select("-password");

    return successResponse(res, 200, "Profile updated successfully", updatedUser);
  } catch (error) {
    return errorResponse(res, 500, "Failed to update profile", error.message);
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };