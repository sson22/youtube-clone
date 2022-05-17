import express from "express";
import { edit, remove, logout, view } from "../controllers/userController";

const userRouter = express.Router();

//Differentiate Router and Controller logic
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get("/:id", view);

export default userRouter;
