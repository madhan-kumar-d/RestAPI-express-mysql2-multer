require("dotenv");
const Joi = require("joi");
const moment = require("moment");
let error
const {error500} = require("../controller/errorcontroller")

exports.checkBearertkn = (req, res, next) =>{
    if(req.header('authorization') === undefined){
        let error = new Error(" Invalid Token ")
        error.status = '401'
        req.errordata = error;
        next(error500);
    }else if(process.env.bearertkn !== req.header('authorization').replace("Bearer ", '')){
        let error = new Error(" Invalid Token ")
        error.status = '401'
        req.errordata = error;
        next(error500);
    }
    next();
}


exports.validatePostUser = async (req, res, next) => {
    try {
        const userSchema = Joi.object({
            name: Joi.string().min(5).alphanum().required(),
            dob: Joi.date().required(),
            email: Joi.string().email(),
        }).options({ abortEarly: false });
        let userValue = await userSchema.validateAsync(req.body).catch((err)=>{
            let error = new Error( err.details[0]?.message ? err.details[0]?.message : err)
            error.status = '422'
            req.errordata = error;
            next(error500) 
        }).then((userDetails) => {
            return userDetails
        })
        req.userValue = userValue // Access verified userdata by following functions 
        next()
    }
    catch (err) { 
        error = new Error( err )
        error.status = '500'
        req.errordata = error;
        next(error500) 
    }
    //next()
}

exports.validatePatchUser = async (req, res, next) => {
    try {
        const userSchema = Joi.object({
            name: Joi.string().min(5).alphanum(),
            dob: Joi.date(),
            email: Joi.string().email().required(),
        }).options({ abortEarly: false });
        let userValue = await userSchema.validateAsync(req.body).catch((err)=>{
            let error = new Error( err.details[0]?.message ? err.details[0]?.message : err)
            error.status = '422'
            req.errordata = error;
            next(error500) 
        }).then((userDetails) => {
            return userDetails
        })
        req.userValue = userValue // Access verified userdata by following functions 
        next()
    }
    catch (err) { 
        error = new Error( err )
        error.status = '500'
        req.errordata = error;
        next(error500) 
    }
    //next()
}