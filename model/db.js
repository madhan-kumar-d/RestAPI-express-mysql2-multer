require("dotenv");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.db,
    connectionLimit: 10
});

module.exports = db.promise();

