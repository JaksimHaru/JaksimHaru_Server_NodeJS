import express from "express";
import { postEditProfile, getEditProfile } from "../controllers/userController";
import { imageUpload } from "../uploadFiles";
import { verifyToken } from "../verifyToken";

const userRoutes = express.Router();

userRoutes.get("/edit-profile", verifyToken, getEditProfile);

userRoutes.post(
  "/edit-profile",
  verifyToken,
  imageUpload.single("image"),
  postEditProfile
);

export default userRoutes;
