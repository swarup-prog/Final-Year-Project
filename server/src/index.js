import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import fileUpload from "express-fileupload";

dotenv.config();

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
