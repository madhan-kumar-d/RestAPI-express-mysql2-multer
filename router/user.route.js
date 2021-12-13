const express = require("express");
const app = express();
const router = express.Router()
const userCtrl = require("../controller/user.controller")
const Middleware_validator = require("../utils/validate");

//router.get("/create/", [Middleware_validator.checkBearertkn][Middleware_validator.uservalidate], userModel.createuser)

router.get("/listuser/", [Middleware_validator.checkBearertkn], userCtrl.listuser)
module.exports = router

/*
 */