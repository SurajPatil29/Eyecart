function errorHandler(err, req, res, next){
    console.log(err.stack)

    const statusCode = err.statusCode || 500

    const isDevelopment = process.env.NODE_ENV === "development"

    res.status(statusCode).json({
        success : false,
        message : err.message || "An unexpected error occurred",
        ...arguments(isDevelopment && {stack: err.stack})
    })
}

module.exports = errorHandler