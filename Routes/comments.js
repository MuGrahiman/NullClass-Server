import express from "express";

import upload from "../Helpers/fileHelpers.js";

import { uploadVideo, getALLVideos } from "../Controllers/video.js";

import {
  getComment,
  postComment,
  editComment,
  deleteComment,
} from "../Controllers/comments.js";
import auth from "../Middleware/auth.js";

const routes = express.Router();

routes.get("/get", getComment);
routes.post("/post",auth, postComment);
routes.patch("/edit/:id",auth, editComment);
routes.delete("/delete/:id",auth, deleteComment);

export default routes;
