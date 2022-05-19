import express from "express";
import {
  view,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
} from "../controllers/videoController";
const videoRouter = express.Router();
videoRouter.route("/upload").get(getUpload).post(postUpload);
//Differentiate Router and Controller logic
videoRouter.get("/:id", view);
// videoRouter.get("/:id/edit", getEdit);
// videoRouter.post("/:id/edit", postEdit);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;
