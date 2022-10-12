const crypto = require('crypto')
const userServices= require('../services/userServices')

const sendToken = require('../utils/jwttoken')
const User = require("../model/userModel");

const registerUser = async (req,res,next)=>{
    const{name,email,password} = req.body

    try {
        const user = await userServices.register(name,email,password)
        await sendToken(user, 201, res)
    }catch (err)
    {
        console.log(err)
        res.status(400).send({message: "User already existed"});
    }

}

const loginUser = async (req,res,next)=>{
    const {email , password} = req.body;

    try {
        const user = await userServices.loginUser(email,password)
         await sendToken(user, 200, res)
    }catch (err)
    {
        console.log(err)
        res.status(400).send({message: "Invalid User"});
    }
}



const logoutUser = async (req,res,next)=>{
    res.clearCookie('token',{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({success:true,message:'logged Out Successful'})
}

const forgotPassword = async (req,res,next)=>{
    const userEmail = req.body['email']
    try{
        const user = await userServices.storeResetPasswordToken(userEmail)
        await  user.save()
    }catch (){

    }
}

module.exports ={
    registerUser,
    loginUser,
    logoutUser
}