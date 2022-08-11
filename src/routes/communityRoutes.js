import express from "express";
import {
  getPostingById,
  postPosting,
  editPosting,
  getPostingsByCategory,
  postComment,
  deletePosting,
  getComment,
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

communityRoutes.get("/comment/:id", verifyToken, getComment);

communityRoutes
  .route("/:id")
  .all(verifyToken)
  .get(getPostingById)
  .post(postingImageUpload.single("image"), editPosting)
  .delete(deletePosting);

communityRoutes.post("/:id/comment", verifyToken, postComment);

export default communityRoutes;
