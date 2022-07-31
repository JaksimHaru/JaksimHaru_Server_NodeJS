import express from "express";
import { postEditProfile, getEditProfile } from "../controllers/userController";
import { uploadImage } from "../uploadFiles";
import { verifyToken } from "../verifyToken";

const userRoutes = express.Router();
userRoutes.post("/");

userRoutes.get("/edit-profile", verifyToken, getEditProfile);

userRoutes.post("/edit-profile", verifyToken, uploadImage, postEditProfile);

export default userRoutes;
