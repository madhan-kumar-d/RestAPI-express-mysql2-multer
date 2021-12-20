const express = require("express");
const app = express();
require("dotenv").config();
const multer = require("multer");
const userRoute = require("./router/user.route");
const errorcontroller = require("./controller/errorcontroller");
const res = require("express/lib/response");
const port = process.env.port || '404';
//app.use(express.json()); // use if data is JSON formated
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
app.use("/user", userRoute);

/* 404 - Error */
app.use(errorcontroller.error404)
app.use(errorcontroller.error500)
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});