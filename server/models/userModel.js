const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

userSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    
    this.password = await bcrypt.hash(this.password,12);
} )
   
userSchema.methods.comparePasswordInDB = async function(pswd,pswdInDB){
    return await bcrypt.compare(pswd,pswdInDB)
}
const User = mongoose.models.user || mongoose.model('user',userSchema)

module.exports = User