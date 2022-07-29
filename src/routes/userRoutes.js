import express from "express";
import { getTodo, postTodo } from "../controllers/userController";
import { verifyToken } from "../verifyToken";

const userRoutes = express.Router();

userRoutes.route("/todo").all(verifyToken).get(getTodo).post(postTodo);

export default userRoutes;
