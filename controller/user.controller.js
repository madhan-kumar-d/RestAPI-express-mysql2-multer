const userModel = require("../model/user.model");

exports.listuser = async (req, res) => {
    try{
        let userlist = await userModel.listuser();
        console.log(userlist.id);
        res.status(200).json({
            "status": true,
            "data": userlist.data
        })
    } catch(err){
        res.status(400).json({
            "status": false, 
            "Message": err.message
        })
    }
}