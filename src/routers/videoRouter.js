import express from "express";
import {
  view,
  edit,
  upload,
  deleteVideo,
} from "../controllers/videoController";
const videoRouter = express.Router();

//Differentiate Router and Controller logic
videoRouter.get("/upload", upload);
videoRouter.get("/:id", view);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
