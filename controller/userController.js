const jwt = require('jsonwebtoken')
const userServices= require('../services/userServices')
const sendToken = require('../utils/jwttoken')
const User = require("../model/userModel");
const sendEmail = require("../utils/sendEmail");
const {config} = require("../config/config");

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


    try {
        const {email , password} = req.body;
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

    try{
        const userEmail = req.body.email;

        const {token , id} = await userServices.forgotPasswordToken(userEmail)
        console.log(token,'*',id)

        const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/user/password/reset/${id}/${token}`;

        const message = `Your password reset token is :~
        \n\n ${resetPasswordUrl} \n\n
        If you have not request this email then,please ignore it`;

        await sendEmail({
            email: userEmail,
            subject : 'Ecommerce Password Recovery',
            message : message
        })
        res.status(200).json({
            success: true,
            message:`Email sent to ${userEmail} successfully`
        })
    }catch (err){
        User.resetPasswordToken =undefined
        User.resetPasswordExpire = undefined


        res.status(400).json({message : `Something went Wrong ${err}`})
    }
}

const resetPassword = async (req,res,next)=>{

    try{
        const {id , token} = req.params;
        const {password , confirmPassword } = req.body
        const user = await userServices.identifyUserBasedOnId(id);
       console.log("User",user)
        if(!user) {
            return new Error('User Not Found')
        }
        const secret = config.TOKEN_SECRET + user.password
        const verifyUser = await jwt.verify(token,secret)
        if(!verifyUser)
        {
            return new Error('User Invalid')
        }

        if(password !== confirmPassword)
        {
            return new Error('Password does not matched')
        }
         const newUserDetail = await userServices.updateUserInfo(user,password)
        // console.log('newUserDetail', newUserDetail)
        await sendToken(newUserDetail, 200, res)
    }catch (e) {
        console.log(e)
        res.status(400).json({message:e.message})
    }
}

const getUserDetail = async (req,res,next)=>
{
  try {
      const userId = req.user.id
      const user = await userServices.getUserInfoById(userId)
      res.status(200).json({
          success:true,
          user
      })
  }catch (e) {
      res.status(400).json({message : e.message})
  }
}

const updatePassword = async (req,res,next)=>
{
   try {
       const userId = req.user.id;
       const {oldPassword, newPassword,confirmPassword} = req.body
       const user = await userServices.updatePassword(userId,oldPassword,newPassword,confirmPassword)
       await sendToken(user,200,res)
   }catch (e) {
       res.status(400).json({success :false,message:e.message})
   }
}

const updateUserProfileData = async (req,res,next)=>
{
    //frontend ka nay validat loat yan
           const userId = req.user.id;
           const {name ,email} = req.body
           const userData = { name,  email}
           const updateUser = await userServices.updateUserProfile(userId, userData)
           res.status(200).json({
               success: true,
               updateUser
           })


}


module.exports ={
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetail,
    updatePassword,
    updateUserProfileData
}


// Extra Checking
//
//