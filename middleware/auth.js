const jwt = require('jsonwebtoken')
const {config} = require("../config/config");
const User = require('../model/userModel')
const isAuthenticatedUser = async (req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token)
    //async handler nat pyin yan
    if(!token){
        res.status(401).json({message: 'Please login to access this source'})
    }
    const verifyUser = jwt.verify(token,config.TOKEN_SECRET)
    req.user = await User.findById(verifyUser.id)
    next()
}

const isAdmin = (req,res,next)=>{
        if(req.user.role === 'user'){
           return next( res.status(403).json({
               success: false,
               message:`Role:${req.user.role} is not allowed to access this source`}))
        }
        next()
}

module.exports = {isAuthenticatedUser,isAdmin}