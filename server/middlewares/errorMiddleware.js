const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
    })
};

module.exports = { errorHandler }