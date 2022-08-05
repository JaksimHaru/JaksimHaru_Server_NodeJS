import express from "express";
import {
  postEditProfile,
  getTodo,
  getDateTodo,
  postTodo,
  deleteTodo,
  putTodo,
  getSchedule,
  postSchedule,
  deleteSchedule,
} from "../controllers/userController";
import { imageUpload } from "../uploadFiles";
import { verifyToken } from "../verifyToken";

const userRoutes = express.Router();

userRoutes
  .route("/todo")
  .all(verifyToken)
  .get(getTodo)
  .post(postTodo)
  .put(putTodo)
  .delete(deleteTodo);

userRoutes.get("/todo/:date", verifyToken, getDateTodo);

userRoutes
  .route("/schedule/:date")
  .all(verifyToken)
  .get(getSchedule)
  .post(postSchedule)
  .delete(deleteSchedule);

userRoutes.post(
  "/edit-profile",
  verifyToken,
  imageUpload.single("image"),
  postEditProfile
);

export default userRoutes;
