const express = require("express");
const router = express.Router()
const userCtrl = require("../controller/user.controller")
const Middleware_validator = require("../utils/validate");
const {error500} = require("../controller/errorcontroller")

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        let unique_id = (new Date().getTime()); // Add time in milliseconds
        let newName = unique_id+"-"+file.originalname
        cb(null, newName)
    },
})
var upload = multer({ storage: storage, 
    fileFilter: function (req, file, next) {
        let imgMime = file.mimetype.toLowerCase();
        let allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
        if (allowedTypes.indexOf(imgMime) !== -1) {
            next(null, true);
        } else {
            next(null, false);
            let error = new Error(" Invalid upload: File Should be an image File  ")
            error.status = '422'
            req.errordata = error;
            return next(error500);
        }
    },
    fileSize: 10*1024, // 10 MB ~ Mention in Bytes.
})


//if you send specific route after user means put here, For example user/list is actual uri means use /list/
router.get("/", [Middleware_validator.checkBearertkn], userCtrl.listUser) 
router.post("/", upload.single('profileimage'), [Middleware_validator.checkBearertkn, Middleware_validator.validatePostUser], userCtrl.validateEmailExsit, userCtrl.createUser)
// if we have user id in uri, change it using :id and can access it using req.params.id
router.patch("/", upload.single('profileimage'), [Middleware_validator.checkBearertkn, Middleware_validator.validatePatchUser], userCtrl.validateEmailExsit, userCtrl.updateUser)
router.delete("/:email", [Middleware_validator.checkBearertkn], userCtrl.validateEmailExsit, userCtrl.deleteUser)
module.exports = router

/*
 */