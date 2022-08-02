import express from "express";
import {
  postEditProfile,
  getTodo,
  postTodo,
  deleteTodo,
} from "../controllers/userController";
import { imageUpload } from "../uploadFiles";
import { verifyToken } from "../verifyToken";

const userRoutes = express.Router();

userRoutes
  .route("/todo")
  .all(verifyToken)
  .get(getTodo)
  .post(postTodo)
  .delete(deleteTodo);

userRoutes.post(
  "/edit-profile",
  verifyToken,
  imageUpload.single("image"),
  postEditProfile
);

export default userRoutes;
