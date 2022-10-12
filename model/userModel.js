const mongoose = require('mongoose')





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
        required: true,

    },
    password:{
        type:"String",
        required:true,
        minLength: 8,
        trim:true,
        unique :true


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