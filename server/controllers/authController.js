import User from "../models/userModel";
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_STR, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

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
    const token = signToken(user._id);

    res.cookie("rememberme", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
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

export const login = async (req, res) => {
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

export const logout = async (req,res)=>{
  try{
    res.clearCookie('rememberme',{
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    return res.status(200).json({
      status: "success",
      message: "logged out"
    });
  }catch(error){
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
}


