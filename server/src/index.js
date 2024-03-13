require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/connect.js");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

const passportSetup = require("./services/passport.js");

const authRoute = require("./routes/auth.routes.js");
const userRoute = require("./routes/user.routes.js");
const gameRoute = require("./routes/game.routes.js");
const emailRoute = require("./routes/emailVerification.routes.js");

connection();

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionSuccessStatus: 204,
};

// Middlewares
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);
app.use("/api/email", emailRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});
