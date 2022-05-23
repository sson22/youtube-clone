import express from "express";
import {
  view,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();
videoRouter.route("/upload").get(getUpload).post(postUpload);
//Differentiate Router and Controller logic
videoRouter.get("/:id([0-9a-f]{24})", view);
// videoRouter.get("/:id/edit", getEdit);
// videoRouter.post("/:id/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
export default videoRouter;
