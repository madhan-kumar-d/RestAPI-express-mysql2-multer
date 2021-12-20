const { unlink } = require('fs/promises');

exports.error404 = (req, res, next) => {
    let error = new Error(" Not Found ")
    error.status = '404'
    req.errordata = error;
    next(error500)
}
exports.error500 = async (data, req, res, next) => {
    if(req?.file?.filename){
        await unlink("./uploads/"+req.file.filename);
    }
    let error = req.errordata
    let error_code = error.status || 500;
    res.status(error_code)
    res.json({
        "error": {
            "Message": error.message
        }
    })
}