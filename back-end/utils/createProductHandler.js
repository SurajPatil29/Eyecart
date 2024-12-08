const fetchProductsWithPaginationAndSorting = require("./fetchProduct");

const createProductRouteHandler = (baseFilter = {}) => {
    return async (req, res, next) => {
        try {
            const { sortOptions, paginationOptions } = req;
            const dynamicFilters = { ...req.query }; // Merge query parameters for dynamic filtering
            delete dynamicFilters.sortField;
            delete dynamicFilters.sortOrder;
            delete dynamicFilters.limit;
            delete dynamicFilters.skip;

            const filters = { ...baseFilter, ...dynamicFilters };

            const { products, totalProducts, totalPages, currentPage } = await fetchProductsWithPaginationAndSorting(
                filters,
                sortOptions,
                paginationOptions
            );

            if (products.length === 0) {
                return res.status(404).json({ message: "No products found" });
            }

            res.status(200).json({
                products,
                pagination: {
                    totalProducts,
                    totalPages,
                    currentPage,
                },
            });
        } catch (error) {
            next(error);
        }
    };
};

module.exports = createProductRouteHandler;
