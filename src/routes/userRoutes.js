import express from "express";
import {
  postEditProfile,
  getTodo,
  postTodo,
} from "../controllers/userController";
import { imageUpload } from "../uploadFiles";
import { verifyToken } from "../verifyToken";

const userRoutes = express.Router();

userRoutes.route("/todo").all(verifyToken).get(getTodo).post(postTodo);

userRoutes.post(
  "/edit-profile",
  verifyToken,
  imageUpload.single("image"),
  postEditProfile
);

export default userRoutes;
