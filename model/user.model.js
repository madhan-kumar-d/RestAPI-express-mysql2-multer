const db = require("./db");

exports.listuser = async (req, res) =>{
    const listdata = await db.execute("SELECT id,name, email, profile_image, modified_date As last_modified, created_date FROM user");
    return listdata;
}

exports.createuser = async (req, res) => {
    const insertdata = await db.execute("INSERT INTO user set name=?, email=?, profile_image=?, created_date=now()", ['Madhan', "madhan@gmail.com", '']);
}