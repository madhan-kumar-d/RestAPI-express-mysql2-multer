const express = require("express");
const app = express();
require("dotenv").config();
const userRoute = require("./router/user.route");
const errorcontroller = require("./controller/errorcontroller");
const port = process.env.port || '404';
//app.use(express.json()); // use if data is JSON formated

app.use("/user", userRoute);

/* 404 - Error */
app.use(errorcontroller.error404)
app.use(errorcontroller.error500)
app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});