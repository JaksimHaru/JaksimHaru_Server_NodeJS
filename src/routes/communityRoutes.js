import express from "express";
import {
  getPostingById,
  postPosting,
  editPosting,
  getPostingsByCategory,
  postComment,
  deletePosting,
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
  .post(postingImageUpload.single("image"), editPosting)
  .delete(deletePosting);

communityRoutes.post("/:id/comment", verifyToken, postComment);

export default communityRoutes;
