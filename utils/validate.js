require("dotenv");
const {error500} = require("../controller/errorcontroller")
exports.uservalidate = (req, res, next) =>{
    console.log(header)
    next();
}
exports.checkBearertkn = (req, res, next) =>{
    if(process.env.bearertkn !== req.header('authorization').replace("Bearer ", '')){
        console.log(req.header('authorization').replace("Bearer ", ''));
        next(error500);
    }else{
        next();
    }
}