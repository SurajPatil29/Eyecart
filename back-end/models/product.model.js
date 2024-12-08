const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    page: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    frameType: { type: String, required: true }, // Corrected field name
    showOffers: { type: String }, // Corrected field name
    technicalInformation: { // Corrected field name
        productId: { type: Number, required: true },
        modelNo: { type: String, required: true },
        frameSize: { type: String, required: true },
        frameWidth: { type: String, required: true },
        frameDimensions: { type: String, required: true },
    },
    description: { type: String, required: true },
}, {
    timestamps: true // Automatically add createdAt and updatedAt fields
});

const ProductModel = mongoose.model("Products", productSchema);

module.exports = ProductModel;
// in this module save all product details