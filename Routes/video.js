import express from "express";

import upload from "../Helpers/fileHelpers.js";

import { uploadVideo, getALLVideos } from "../Controllers/video.js";

import {
  likeVideoController,
  getAllLikeVideoController,
  deleteLikeVideoController,
} from "../Controllers/likeVideo.js";

import {
  HistoryController,
  getAllHistoryController,
  deleteHistoryController,
  deleteAllHistoryController,
} from "../Controllers/History.js";

import {
  watchLaterController,
  getAllwatchLaterController,
  deletewatchLaterController,
} from "../Controllers/watchLater.js";

import { likeController } from "../Controllers/like.js";
import { viewController } from "../Controllers/view.js";
import auth from "../Middleware/auth.js";

const routes = express.Router();

routes.post("/uploadVideo", auth, upload.single("file"), uploadVideo);
routes.get("/getVideos", getALLVideos);
routes.patch("/like/:id", auth, likeController);
routes.patch("/view/:id", viewController);

routes.get("/getAllLikedVideo", getAllLikeVideoController);
routes.post("/likeVideo", auth, likeVideoController);
routes.delete(
  "/deleteLikedVideo/:videoId/:Viewer",
  auth,
  deleteLikeVideoController
);

routes.get("/getAllWatchLater", getAllwatchLaterController);
routes.post("/watchLater", auth, watchLaterController);
routes.delete(
  "/deleteWatchlater/:videoId/:Viewer",
  auth,
  deletewatchLaterController
);

routes.get("/getAllHistory", getAllHistoryController);
routes.post("/History", auth, HistoryController);
routes.delete("/deleteHistory/:videoId/:Viewer", auth, deleteHistoryController);
routes.delete("/deleteAllHistory/:userId", auth, deleteAllHistoryController);

export default routes;
