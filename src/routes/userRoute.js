import express from "express";
import { getTodo, postTodo } from "../controllers/userController";
import { verifyToken } from "../verifyToken";

const userRoute = express.Router();

userRoute.route("/todo").all(verifyToken).get(getTodo).post(postTodo);

export default userRoute;
