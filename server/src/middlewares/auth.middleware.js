const jwt = require("jsonwebtoken");
const { User } = require("../models/User");
const asyncHandler = require("express-async-handler");

const decodeToken = (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Not authorized, no token");
    }
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }
};

const protectAdmin = asyncHandler(async (req, res, next) => {
  try {
    let decodedToken = decodeToken(req);

    if (dedodedToken.role !== "admin") {
      throw new Error("Not authorized, token failed");
    }

    req.user = await User.findById(decodedToken._id).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const protect = asyncHandler(async (req, res, next) => {
  try {
    let decodedToken = decodeToken(req);

    req.user = await User.findById(decodedToken._id).select("-password");

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

module.exports = { protectAdmin, protect };
