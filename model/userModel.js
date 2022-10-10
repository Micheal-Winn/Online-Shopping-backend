const mongoose = require('mongoose')
const validator = require('validator')




const userSchema = new mongoose.Schema({
    name:{
        type:"String",
        unique: true,
        required: true,
        maxLength:30,
        minLength:4
    },
    email: {
        type:"String",
        unique: true,
        validate: validator.isEmail,
        required: true,

    },
    password:{
        type:"String",
        required:true,
        minLength: 8,
        trim:true,


    },
    avatar: {
        public_id: {
            type: "String",
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    role:{
        type:"String",
        default:'user'
    },
    resetPasswordToken : "String",
    resetPasswordExpire : "Date"
})

module.exports = mongoose.model('User',userSchema)