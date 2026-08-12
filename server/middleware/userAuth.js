const jwt = require("jsonwebtoken");

exports.userAuth = async (req, res, next) => {
  const { rememberme: token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Not Authorized, login again!",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_STR);
    if (!decodedToken.id) {
      return res.status(401).json({
        status: "fail",
        message: "Not authorized. Login again.",
      });
    }
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};
