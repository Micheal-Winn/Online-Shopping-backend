const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const register = async (username,email,password)=>
{
    const hashPassword = await bcrypt.hash(password,10)
    let user = new User({
        name :username,
        email : email,
        password : hashPassword,
        avatar   :{
            public_id:"this is a sample id",
            url : 'profilepicture'
        }
    })
    return user.save()
}

const loginUser = async (userEmail,userPassword)=>{
    const filter = {
        email : userEmail
    }
    const user = await User.findOne(filter)
    if(user)
    {
        const validPassword = await bcrypt.compare(userPassword,user.password)
        if(validPassword)
        {
            console.log(validPassword)
            return user;
        }else {
            throw new Error('Invalid email or password')
        }
    }else {
        throw new Error('Invalid email or password')
    }
}

const storeResetPasswordToken = async (userEmail)=>{
    const user = User.findOne({email: userEmail})
    if(!user){
        throw new Error('Email not Found')
    }
    const resetToken = crypto.randomBytes(20).toString('hex')
    User.resetPasswordToken = crypto.createHash('thant123').update(resetToken).digest('hex')
    User.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}

module.exports ={
    register,
    loginUser,
    storeResetPasswordToken
}