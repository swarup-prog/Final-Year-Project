require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connection = require("./database/databaseConnection.js");
const fileUpload = require("express-fileupload");

connection();

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionSuccessStatus: 204,
};

// Middlewares
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(fileUpload({ useTempFiles: true }));

app.listen(process.env.PORT, () => {
  console.log("Server is running on port : ", process.env.PORT);
});
