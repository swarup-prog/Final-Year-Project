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
const { Server } = require("socket.io");

const passportSetup = require("./services/passport.js");

const appRoutes = require("./routes/main.js");
const { errorHandler, notFound } = require("./middlewares/error.middleware.js");

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
app.use(appRoutes);
app.use(notFound);
app.use(errorHandler);

const server = createServer(app);

server.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log("User joined", userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined chat room: ", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (message) => {
    let chat = message.chat;

    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id === message.sender._id) return;
      socket.in(user._id).emit("message received", message);
    });
  });

  socket.on("new notification", (notification) => {
    socket
      .in(notification.user._id)
      .emit("notification received", notification);
  });
});
