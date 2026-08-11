const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true,'name is a required field']
    },
    email:{
        unique: true,
        type: String,
        required: [true,'email is a required field']
    },
    password: {
        type: String,
        select: false,
        required: [true,'password is a required filed']
    },
    verifyOtp:{
        type: String,
        default: ''
    },
    verifyOtpExpireAt:{
        type: Number,
        default: 0
    },
    isAccountVerified:{
        type: Boolean,
        default: false
    },
    resetOtp:{
        type: String,
        default: ''
    },
    resetOtpExpireAt:{
        type: Number,
        default: 0
    }
})

const User = mongoose.models.user || mongoose.model('user',userSchema)
module.exports = User