const User = require('./../models/userModel')

exports.getUserData = async(req,res)=>{
    try{
        const {userId} = req;
        const user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
              status: 'fail',
              message: 'user not found'
            })
        }
        res.status(200).json({
            status: 'success',
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified
            }
        })
    }catch(error){
        res.status(500).json({
         status: "fail",  
         message: error.message,
       });
    }
}
