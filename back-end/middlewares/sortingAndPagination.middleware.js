

const applySortingAndPagination = (req, res, next) => {
    try {
        const sortField = req.query.sortField || "createdAt";
        const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
        req.sortOptions = { [sortField]: sortOrder };

        const limit = Math.max(1, Math.min(parseInt(req.query.limit, 10) || 10, 100)); // Default 10, max 100
        const skip = Math.max(0, parseInt(req.query.skip, 10) || 0);

        req.paginationOptions = { limit, skip };
        next();
    } catch (error) {
        next({ status: 400, message: "Invalid sorting or pagination parameters", details: error.message });
    }
};

module.exports = applySortingAndPagination;
