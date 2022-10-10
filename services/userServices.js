const User = require('../model/userModel')
const bcrypt = require('bcrypt')
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
        const validPassword = bcrypt.compare(userPassword,user.password)
        if(validPassword)
        {
            return user;
        }else {
            throw new Error('Invalid email or password')
        }
    }else {
        throw new Error('Invalid email or password')
    }
}

module.exports ={
    register,
    loginUser
}