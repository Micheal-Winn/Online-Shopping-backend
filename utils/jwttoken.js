const jwt = require("jsonwebtoken");
const {config} = require("../config/config");

//creates token and saving in cookies
const sendToken = async (user,statusCode,res)=>{
    const payload = {id: user._id}
    const token = await jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: config.TOKEN_EXPIRE})

    const options ={
        expires: new Date(
            Date.now() + config.COOKIE_EXPIRE
        ),
        httpOnly: true,
    }
    res.status(statusCode).cookie('token',token,options).json({
        success :true,
        user,
        token
    })
}
module.exports = sendToken