const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../config/email.js");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Missing details",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        message: "User already exists",
      });
    }
    const user = await User.create(req.body);
    const token = signToken(user._id);

    res.cookie("rememberme", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
    });

    await sendEmail({
      email: email,
      subject: "Welcome to Auth_MERN",
      message: `Welcome to Auth_MERN website. Your account has been created with the email id: ${email}`,
    });

    res.status(201).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Email or Password is required",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePasswordInDB(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }
    const token = signToken(user._id);
    res.cookie("rememberme", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
    });

    return res.status(200).json({
      status: "success",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("rememberme", {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({
      status: "success",
      message: "logged out",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//send verification OPT to the user's email
exports.sendVerifyOtp = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (user.isAccountVerified) {
      //check if the user is already verified
      return res.json({
        status: "false",
        message: "Account is already verified!",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000)); //generating a random otp
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 1 * 60 * 60 * 1000; //otp expires in 1 hour

    await user.save(); //saving the updated document

    await sendEmail({
      //setting email options 
      email: user.email,
      subject: "Account verification OTP",
      message: `your otp is ${otp}. Verify your account using this otp.`,
    });
    res.status(200).json({
      status: "success",
      message: "verification otp sent on your mail!",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
exports.verifyEmail = async (req, res) => {
  const { otp } = req.body;
  if (!req.userId || !otp) {
    return res.status(400).json({
      status: "fail",
      message: "Missing user details",
    });
  }
  try { 
    const user = await User.findById(req.userId);
    if(!user){
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      })
    }
    if(user.verifyOtp === '' || user.verifyOtp !== otp){
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid OTP'
      })
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.status(404).json({
        status: 'fail',
        message: 'OTP has expired'
      })
    }
    user.isAccountVerified = true;   
    user.verifyOtp = ''
    user.verifyOtpExpireAt = 0

    await user.save()
    return res.status(200).json({
        status: 'success',
        message: 'Email verified successfully!'
    })
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
//check if user is authenticated
exports.isAuthenticated = async(req,res)=>{
  try{
    return res.status(200).json({
      status: 'success',
      message: 'user is authenticated'
    })
  }catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}
exports.sendResetPasswordOtp = async (req,res)=>{
      const {email} = req.body;
      if(!email){
        return res.status(400).json({
          status: 'fail',
          message: 'Email is required'
        })
      }
      try{
          const user = await User.findOne({email});
          if(!user){
            return res.status(400).json({
              status: 'fail',
              message: 'user not found'
            })
          }
          const otp = String(Math.floor(100000+Math.random()*900000))
          user.resetOtp = otp;
          user.resetOtpExpireAt = Date.now()+1*60*60*1000

          await user.save()

          await sendEmail({
            //setting email options 
            email: user.email,
            subject: "Password reset OTP",
            message: `your OTP is ${otp}. Reset your password using this OTP.`,
          });
          return res.status(200).json({
                 status: 'success',
                 message: 'OTP sent to your email'
          })
      }catch(error){
         res.status(500).json({
         status: "fail",
         message: error.message,
       });
      }
}

