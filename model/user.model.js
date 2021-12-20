const db = require("./db");

exports.listUserAll = async (req, res) =>{
    const result = await db.execute("SELECT name, email, profile_image, modified_date As last_modified, created_date AS DOJ FROM user");
    return result;
}

exports.createuser = async (arrayData, req, res, next) => {
    let sql = db.format("INSERT INTO user set name=?, email=?, profile_image=?, dob=?, created_date=now(), modified_date = now() ", arrayData)
    let result = await db.execute(sql);
    return result
}

exports.listUser = async (where, req, res, next) => {
    let sql = db.format(`SELECT name, email, profile_image, modified_date As last_modified, created_date AS DOJ FROM user ${where}`)
    let result = await db.execute(sql);
    return result
}

exports.updateUser = async (update, where, req, res, next) => {
    if(update!='') update = `${update} ,`
    let sql = db.format(`UPDATE user set ${update} modified_date = now()  ${where}`)
    let result = await db.execute(sql);
    return result
}

exports.deleteUser = async (data, req, res, next) => {
    let sql = db.format(`DELETE FROM user WHERE email = ?`,data)
    console.log(sql);
    let result = await db.execute(sql);
    return result
}