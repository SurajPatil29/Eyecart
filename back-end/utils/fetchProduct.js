const ProductModel = require("../models/product.model");

const fetchProductsWithPaginationAndSorting = async (query, sortOptions, paginationOptions) => {
    const totalProducts = await ProductModel.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / paginationOptions.limit);
    const currentPage = Math.floor(paginationOptions.skip / paginationOptions.limit) + 1;

    const products = await ProductModel.find(query)
        .sort(sortOptions)
        .skip(paginationOptions.skip)
        .limit(paginationOptions.limit);

    return { products, totalProducts, totalPages, currentPage };
};

module.exports = fetchProductsWithPaginationAndSorting;
