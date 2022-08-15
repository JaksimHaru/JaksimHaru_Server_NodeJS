import express from "express";
import {
  getPostingById,
  postPosting,
  editPosting,
  getPostingsByCategory,
  postComment,
  deletePosting,
  getComment,
  deleteComment,
  editComment,
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
  .route("/comment/:id")
  .all(verifyToken)
  .get(getComment)
  .post(editComment)
  .delete(deleteComment);

communityRoutes
  .route("/:id")
  .all(verifyToken)
  .get(getPostingById)
  .post(postingImageUpload.single("image"), editPosting)
  .delete(deletePosting);

communityRoutes.post("/:id/comment", verifyToken, postComment);

export default communityRoutes;
