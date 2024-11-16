const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error';

    // Log error to console for dev
    console.error(err);

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorHandler;
