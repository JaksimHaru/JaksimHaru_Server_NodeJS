import express from "express";
import {
  getPostingById,
  postPosting,
  modifyPosting,
  getPostingsByCategory,
} from "../controllers/communityController";
import { postingImageUpload } from "../uploadFiles";
import { verifyToken } from "../verifyToken";

const communityRoutes = express.Router();

communityRoutes.post(
  "/upload",
  verifyToken,
  postingImageUpload.single("image"),
  postPosting
);

communityRoutes.get("/category", verifyToken, getPostingsByCategory);

communityRoutes
  .route("/:id")
  .all(verifyToken)
  .get(getPostingById)
  .post(postingImageUpload.single("image"), modifyPosting);

export default communityRoutes;
