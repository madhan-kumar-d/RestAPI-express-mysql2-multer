const {error500} = require("../controller/errorcontroller")
const userModel = require("../model/user.model");
const db = require("../model/db");
const { unlink } = require('fs/promises');

exports.listUser = async (req, res, next) => {
    try{  
        let userlist = await userModel.listUserAll(); // Without Promises 
        res.status(200).json({  
            "status": true,
            "data": userlist[0]
        })
    } catch(err){
        let error = new Error(err)
        error.status = '500'
        req.errordata = error;
        next(error500);
    }
}
// Validate user
exports.validateEmailExsit = async (req, res, next) => {
    try{
        if(req.userValue === undefined) new Error("Unable to Verify input Data");
        let where;
        if(req?.userValue){
            where = `WHERE email = ${db.escape(req.userValue.email)} `;
        }
        else if(req?.params){
            where = `WHERE email = ${db.escape(req.params.email)} `;
        }
        
        await userModel.listUser(where).then( async result => {
            let oldUsers = result['0'].length;
            if(req.method === 'POST'){
                if(oldUsers>0) throw "EmailID already exist";
                next();
            }else if(req.method === 'PATCH'){
                if(oldUsers===0) throw "Invalid Email ID, Please Create user before update";
                if(result['0']['0'].profile_image && req?.file?.filename){
                    await unlink("./uploads/"+result['0']['0'].profile_image);
                }
                next();
            }else if(req.method === 'DELETE'){
                if(oldUsers===0) throw "Invalid Email ID, Please Create user before update";
                if(result['0']['0'].profile_image){
                    await unlink("./uploads/"+result['0']['0'].profile_image);
                }
                next();
            }
        }).catch(err => {
            let error = new Error(err);
            error.status = 422;
            req.errordata = error
            next(error500)
        });
    }catch (err){
        let error = new Error(err)
        error.status = '500'
        req.errordata = error;
        next(error500)
    }
}

exports.createUser = async (req, res, next) =>{
    try{
        if(req.userValue === undefined) new Error("Unable to Verify input Data");
        let age = new Date(req.userValue.dob);
        age = `${age.getFullYear()}-${age.getMonth()}-${age.getDate()}`
        let insert_array = [req.userValue.name, req.userValue.email, req.file.filename, age];
        await userModel.createuser(insert_array).then( async (result)=>{
            let where = `WHERE id = ${result[0].insertId}`;
            await userModel.listUser(where).then((resultUser) => {
                res.status(201).json({  // 201 - Record inserted Status 
                    "status": true,
                    "data": resultUser[0]
                })
            }).catch((err)=>{
                console.log(err);
                let error = new Error(err)
                error.status = '422'
                req.errordata = error;
                next(error500)
            });
        }).catch((err)=>{
            let error = new Error(err)
            error.status = '422'
            req.errordata = error;
            next(error500)
        });
        
    }catch (err){
        let error = new Error(err)
        error.status = '500'
        req.errordata = error;
        next(error500)
    }
}

exports.updateUser = async (req, res, next) => {
    try{
        if(req.userValue === undefined) new Error("Unable to Verify input Data");
        let updateArray = [];
        if(req.userValue?.name) updateArray.push(`name = ${db.escape(req.userValue.name)}`)
        if(req?.file?.filename) updateArray.push(`profile_image = ${db.escape(req.file.filename)}`)
        if(req.userValue?.dob) {
            let age = new Date(req.userValue.dob);
            age = `${age.getFullYear()}-${age.getMonth()}-${age.getDate()}`
            updateArray.push(`dob = ${db.escape(age)}`)
        }
        let update = updateArray.join(" , ");
        let where = `WHERE email=${db.escape(req.userValue.email)}`;
        await userModel.updateUser(update, where).then(result=>{
            if(result[0].affectedrow === 0) throw "Unable to update Data"
            res.status(200).json({
                "Message": "User Updated Successfully"
            })
        }).catch(err=>{
            let error = new Error(err)
            error.status = '422'
            req.errordata = error;
            next(error500)
        })
    }catch (err){ // Will show Server Error 
        let error = new Error(err)
        error.status = '500'
        req.errordata = error;
        next(error500)
    }
}
exports.deleteUser = async (req, res, next) => {
    try{
        if(req.userValue === undefined) new Error("Unable to Verify input Data");
        let deleterec = [req.params.email];
        await userModel.deleteUser(deleterec).then( async (result)=>{
            if(result[0].affectedrow === 0) throw "Unable to update Data"
            await userModel.listUserAll().then((resultUser) => {
                res.status(200).json({  // 201 - Record inserted Status 
                    "status": true,
                    "data": resultUser[0]
                })
            }).catch((err)=>{
                console.log(err);
                let error = new Error(err)
                error.status = '422'
                req.errordata = error;
                next(error500)
            });
        }).catch((err)=>{
            let error = new Error(err)
            error.status = '422'
            req.errordata = error;
            next(error500)
        });
        
    }catch (err){
        let error = new Error(err)
        error.status = '500'
        req.errordata = error;
        next(error500)
    }
}