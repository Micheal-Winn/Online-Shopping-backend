const userServices= require('../services/userServices')
const jwt = require('jsonwebtoken')
const {config} = require('../config/config')

async function tokenGenerator(user) {
    const payload = {id: user._id}
    const token = await jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: config.TOKEN_EXPIRE})
    return token;
}

const registerUser = async (req,res,next)=>{
    const{name,email,password} = req.body

    try {
        const user = await userServices.register(name,email,password)
        const token = await tokenGenerator(user);
        res.status(201).json({
            success :true,
            token
        })
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
        const token = await tokenGenerator(user)
        res.status(200).json({
            success :true,
            token
        })
    }catch (err)
    {
        console.log(err)
        res.status(400).send({message: "Invalid User"});
    }
}


module.exports ={
    registerUser,
    loginUser
}