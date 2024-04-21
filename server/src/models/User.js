const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema(
  {
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
      // required: true,
    },
    password: {
      type: String,
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
      default:
        "https://res.cloudinary.com/dsu4m9vef/image/upload/v1713198772/jot0zv7vip4pgif50cft.png",
    },
    interestedGames: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Game",
      default: [],
    },
    buddies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    buddyRequest: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    pendingRequest: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    googleAuthId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  try {
    const token = jwt.sign(
      { _id: this._id, role: this.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "20d",
      }
    );
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
    // password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
