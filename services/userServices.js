const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {config} = require("../config/config");
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

const forgotPasswordToken = async (userEmail)=>{
    const user = await User.findOne({email: userEmail})
    if(!user){
        throw new Error('Email not Found')
    }
    const secret = config.TOKEN_SECRET + user.password;
    const payload = {
        email : user.email,
        id : user._id
    }
    const userToken = jwt.sign(payload,secret,{expiresIn: '15m'})// Put expire Token
    return {
        token: userToken,
        id: user._id
    };
}

const identifyUserBasedOnId = async (userId)=>
{
    const user = await User.findOne({_id: userId})
    if(!user){
        throw new Error('UserId Not Found')
    }

    return user;
}

const updateUserInfo = async (user,password)=>{
    const updatedUser = user;
    const hashpassword = await bcrypt.hash(password, 10);
    updatedUser.password = hashpassword
    return updatedUser.save()
}

const getUserInfoById = async (id)=>
{
    const user = await User.findById(id)
    return user
}

const updatePassword = async (id,oldPassword,newPassword,confirmPassword)=>
{
    const user = await User.findById(id)

    const isPasswordMatched = await bcrypt.compare(oldPassword,user.password)
    if(!isPasswordMatched){
        throw new Error('old password is incorrect')
    }
    if(newPassword !== confirmPassword){
        throw new Error("password does not match")
    }
    const hashPassword =  await bcrypt.hash(newPassword,10)
    user.password = hashPassword
    return user.save()
}

const updateUserProfile = async (id,userData)=>
{
    const user = await User.findByIdAndUpdate(id,userData,{new :true,runValidators :true})
    return user;

}
const findAllUsers = async ()=>{
    const users = await User.find()
    return users;
}

// const deleteUser = async (id)=>
// {
//     const user = User.findById(id)
//
// }

module.exports ={
    register,
    loginUser,
    forgotPasswordToken,
    identifyUserBasedOnId,
    updateUserInfo,
    getUserInfoById,
    updatePassword,
    updateUserProfile,
    findAllUsers

}