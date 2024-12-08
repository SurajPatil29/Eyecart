const express = require("express");
const applySortingAndPagination = require("../middlewares/sortingAndPagination.middleware");
const createProductRouteHandler = require("../utils/createProductHandler");
const ProductModel = require("../models/product.model");

// Helper function to generate product routes
const createRoutesForProductType = (router, page) => {
    router.get("/products", applySortingAndPagination, createProductRouteHandler({ page }));
    router.get("/fullrim", applySortingAndPagination, createProductRouteHandler({ page, "Frame-type": "Full Rim" }));
    router.get("/rimless", applySortingAndPagination, createProductRouteHandler({ page, "Frame-type": "Rim Less" }));
    router.get("/halfrim", applySortingAndPagination, createProductRouteHandler({ page, "Frame-type": "Half Rim" }));
    router.get("/mens", applySortingAndPagination, createProductRouteHandler({ page, type: "Men" }));
    router.get("/womens", applySortingAndPagination, createProductRouteHandler({ page, type: "Women" }));
    router.get("/kids", applySortingAndPagination, createProductRouteHandler({ page, type: "Kid" }));

    return router;
};

// Function for individual product route
const createProductDetailsRoute = (router) => {
    router.get("/:id", async (req, res, next) => {
        try {
            const productId = req.params.id;
            const product = await ProductModel.findById(productId);
            if (!product) {
                return res.status(404).json({ error: "Product not found." });
            }
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    });
    return router; 
};

// Initialize routers for different product types
const eyeglassesRoute = createRoutesForProductType(express.Router(), "EYEGLASSES");
const kidsglassesRoute = createRoutesForProductType(express.Router(), "KIDS GLASSES");
const screenglassesRoute = createRoutesForProductType(express.Router(), "SCREEN GLASSES");

// Common product details route
const productRoute = createProductDetailsRoute(express.Router());

// Export all routes
module.exports = {
    eyeglassesRoute,
    kidsglassesRoute,
    screenglassesRoute,
    productRoute,
};
