const express = require("express");
const ProductModel = require("../models/product.model");
const FavouriteModel = require("../models/favorite.model");

const favouriteRouter = express.Router();

// Add a product to the user's favorites
favouriteRouter.post("/add", async (req, res, next) => {
    const { userId, productId } = req.body;
    // console.log(userId, productId)
    try {
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        let favourite = await FavouriteModel.findOne({ userId });

        if (!favourite) {
            // Create a new favourite document if it doesn't exist
            favourite = new FavouriteModel({ userId, products: [] });
        }

        if (favourite.products.includes(productId)) {
            return res.status(400).json({ msg: "Product already in favorites" });
        }

        favourite.products.push(productId); // Only push the product ID, not the full product
        await favourite.save();

        res.status(200).json(favourite);
    } catch (error) {
        next(error);
    }
});



// Get all favorite products for a user
favouriteRouter.get("/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const favourite = await FavouriteModel.findOne({ userId }).populate('products');

        if (!favourite) {
            return res.status(404).json({ msg: "Favorites not found" });
        }

        if (favourite.products.length === 0) {
            return res.status(200).json({ msg: "Favorites list is empty", products: [] });
        }

        res.status(200).json(favourite.products);
    } catch (error) {
        next(error);
    }
});

// Remove a product from the user's favorites
favouriteRouter.delete("/:userId/product/:productId", async (req, res, next) => {
    const { userId, productId } = req.params;
    try {
        const favourite = await FavouriteModel.findOne({ userId });

        if (!favourite) {
            return res.status(404).json({ msg: 'Favorites not found' });
        }

        const productIndex = favourite.products.indexOf(productId);
        if (productIndex === -1) {
            return res.status(404).json({ msg: 'Product not found in the favorites' });
        }

        // Remove the product from the products array
        favourite.products.splice(productIndex, 1);

        // Save the updated favorites
        await favourite.save();

        res.status(200).json({ msg: 'Product removed from favorites successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = favouriteRouter;
