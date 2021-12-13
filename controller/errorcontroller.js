exports.error404 = (req, res, next) => {
    let error = new Error(" Not Found ")
    error.status = '404'
    next(error)
}
exports.error500 = (error, req, res, next) => {
    let error_code = error.status || 500;
    res.status(error_code)
    res.json({
        "error": {
            "Message": error.message
        }
    })
}