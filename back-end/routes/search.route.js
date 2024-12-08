const express = require("express");
const applySortingAndPagination = require("../middlewares/sortingAndPagination.middleware");
const ProductModel = require("../models/product.model");

const searchRouter = express.Router();

// Route for product search
searchRouter.get("/product", applySortingAndPagination, async (req, res, next) => {
    const { title } = req.query;
    const { sortOptions = {}, paginationOptions = { skip: 0, limit: 10 } } = req;  // Destructure with defaults

    try {
        // Validate if 'title' is provided
        if (!title) {
            return res.status(400).json({ msg: "Search title is required." });
        }

        // Perform case-insensitive search
        const products = await ProductModel.find({ title: new RegExp(title, "i") })
            .sort(sortOptions)
            .skip(paginationOptions.skip)
            .limit(paginationOptions.limit);

        // If no products are found, return 404
        if (products.length === 0) {
            return res.status(404).json({ msg: "No results found for the given search criteria." });
        }

        // Return found products
        res.status(200).json(products);
    } catch (error) {
        // Error handling
        next(error);
    }
});

module.exports = searchRouter;
