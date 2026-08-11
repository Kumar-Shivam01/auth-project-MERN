import User from "../models/userModel";
const jwt = require('jsonwebtoken') 

const signToken=(id)=>{
  return jwt.sign({id},process.env.SECRET_STR,{
    expiresIn: process.env.JWT_EXPIRE
  })
}
export const register = async (req, res) => {
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
    signToken(user._id)
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
