const express = require("express");
const upload = require("../middlewares/multerConfig.middleware");
const UserModel = require("../models/signUp.model");
const profileRouter = express.Router();

// Route for fetching user profile image
profileRouter.get("/userProfileImg", async (req, res, next) => {
    try {
        const userId = req.query.userId;  // Fetch userId from query parameter

        // Validate userId
        if (!userId) {
            return res.status(400).json({ msg: "No user ID provided." });
        }

        const user = await UserModel.findById(userId);  // Use findById for cleaner syntax

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        const img = user.profileImage;  // Fetch the image URL

        if (!img) {
            return res.status(404).json({ msg: "No image found.", img: "" });
        }

        // Return the image URL
        res.status(200).json({ img });
    } catch (error) {
        console.error("Error fetching user profile image:", error);
        next(error);  // Pass the error to the error-handling middleware
    }
});

// Route for uploading user profile image
profileRouter.post("/upload-image", upload.single("image"), async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No image uploaded." });
        }
        

        const imgUrl = req.file.path;  // Extract the file path (Cloudinary URL)
        const userId = req.query.userId;  // Fetch the userId from the request query

        // Validate userId
        if (!userId) {
            return res.status(400).json({ msg: "No user ID provided." });
        }

        // Update the user's profile image URL
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { profileImage: imgUrl },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ msg: "User not found." });
        }

        // Return a success message along with the image URL
        res.status(200).json({
            msg: "Image uploaded successfully.",
            imgUrl: user.profileImage,
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        next(error);  // Pass the error to the error-handling middleware
    }
});

module.exports = profileRouter;
