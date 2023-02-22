const userRouter = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { AdminModel } = require("../models/admin.model");


// Registering the user

userRouter.post("/register",async(req,res)=>{
    const {name,email,mobile,password} = req.body;
    try{
        const exits = await UserModel.find({email});
        if(exits.length!==0) res.send({"msg":'User Already Exists, Please Login'});
        else {
            bcrypt.hash(password, 5, async(err,hash)=>{
                if(err) res.send({"error":err.message});
                else{
                    const user = new UserModel({name,email,mobile,password:hash});
                    await user.save();
                    res.send({"msg":'Successfully Registered, Kindly Login to Continue'});
                }
            })
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});


// Registering the Admin

userRouter.post("/register/admin",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const exits = await AdminModel.find({email});
        if(exits.length!==0) res.send({"msg":'User Already Exists, Please Login'});
        else {
            bcrypt.hash(password, 6, async(err,hash)=>{
                if(err) res.send({"error":err.message});
                else{
                    const user = new AdminModel({name,email,password:hash});
                    await user.save();
                    res.send({"msg":'Admin Registered'});
                }
            })
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});


// Admin Login Functionalities & passing id in payload

userRouter.post("/login/admin",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const exits = await AdminModel.find({email});
        if(exits.length==0) res.send({"msg":"Authorization failed"});
        else {
            bcrypt.compare(password, exits[0].password, async(err,result)=>{
                if(err) res.send({"error":`Wrong CRED / ${err.message}`});
                else{
                    const token = jwt.sign({userID:exits[0]._id},process.env.JWT_KEY_A,{ expiresIn:"24H"});
                    res.send({"msg":'Welcome Admin', "token":token});
                }
            })
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});


// User Login Functionalities & passing id in payload

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const exits = await UserModel.find({email});
        if(exits.length==0) res.send({"msg":"User Doesn't Exists, Please Register"});
        else {
            bcrypt.compare(password, exits[0].password, async(err,result)=>{
                if(err) res.send({"error":`Wrong CRED / ${err.message}`});
                else{
                    const token = jwt.sign({userID:exits[0]._id},process.env.JWT_KEY_U,{ expiresIn:"24H"} );
                    res.send({"msg":'Login Success', "token":token});
                }
            })
        }
    }
    catch(err){
        res.send({"error":err.message});
    }
});



module.exports = {
    userRouter,
}
