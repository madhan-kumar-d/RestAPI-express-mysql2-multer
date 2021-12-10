const express = require("express");
const app = express();
const dotenv = require("dotenv");
const userRoute = require("./router/user.route");

const port = process.env.port;
//app.use(express.json()); // use if data is JSON formated

app.use("/user", userRoute.create)(app)


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});