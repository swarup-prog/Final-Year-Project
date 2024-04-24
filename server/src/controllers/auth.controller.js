const { User } = require("../models/User.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  let body = { ...req.body };

  try {
    // Giving default role: user
    if (!body.role) body = { ...body, role: "user" };

    // Checking if user already exists
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(409).send({ message: "User already registered." });
    }

    // Password Hashing
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Send the data to database
    await new User({
      ...body,
      password: hashedPassword,
    }).save();
    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    console.log("Error in registration", error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

const login = async (req, res) => {
  let { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ message: "Invalid username or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid username or password." });
    }

    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;

    const token = user.generateAuthToken();
    res
      .cookie("session-token", token, {
        httpOnly: true,
        sameSite: true,
      })
      .status(200)
      .send({ token, user: userWithoutPassword, message: "Login successful." });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
};


const googleLogin = async (req, res) => {
  try {
    const googleUser = req.user?._json;

    let user = await User.findOne({ email: googleUser.email });
    if (!user) {
      user = await new User({
        name: googleUser.name,
        email: googleUser.email,
        username: googleUser.email.match(/^(.+)@/)[1],
        role: "user",
        profileImg: googleUser.picture,
        googleAuthId: googleUser.sub,
      }).save();
    } else {
      user.googleAuthId = googleUser.sub;
      // console.log(user, "user");
      await user.save();
    }

    const token = user.generateAuthToken();
    res.redirect(
      `${process.env.GOOGLE_CLIENT_URL}/authenticating/?token=${token}`
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
};
