import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import userRoutes from "./Routes/user.js";
import videoRoutes from "./Routes/video.js";
import commentsRoutes from "./Routes/comments.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/Uploads", express.static(path.join("Uploads")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/user", userRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentsRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));

const DB_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database Connected successfully"))
  .catch((err) => console.log(err));
