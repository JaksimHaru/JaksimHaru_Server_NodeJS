import express from "express";
import {
  signin,
  signup,
  loginWithKakao,
  loginWithNaver,
  refreshToken,
} from "../controllers/authController";
import { verifyToken } from "../verifyToken";

const authRoutes = express.Router();

//Controll JWT
authRoutes.get("/refresh", verifyToken, refreshToken);

//CREATE A USER
authRoutes.post("/signup", signup);

//SIGN IN
authRoutes.post("/signin", signin);

//LOGIN WITH KAKAO
authRoutes.post("/kakao/login", loginWithKakao);

//LOGIN WITH NAVER
authRoutes.post("/naver/login", loginWithNaver);

export default authRoutes;
