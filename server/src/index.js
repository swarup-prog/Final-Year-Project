require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/connect.js");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const { createServer } = require("node:http");

const passportSetup = require("./services/passport.js");

const appRoutes = require("./routes/main.js");

connection();

const app = express();

// Middlewares
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionSuccessStatus: 204,
  })
);
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
app.use(appRoutes);

const server = createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});
