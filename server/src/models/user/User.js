const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
    required: false,
  },
  profileImg: {
    type: String,
    default: "",
    required: false,
  },
  interestedGames: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Game",
    default: [],
  },
});

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    return token;
  } catch (error) {
    throw new Error("Token generation error: " + error.message);
  }
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("First Name"),
    email: Joi.string().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
