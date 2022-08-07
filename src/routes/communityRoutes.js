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

communityRoutes
  .route("/:id")
  .all(verifyToken)
  .get(getPostingById)
  .post(modifyPosting);

communityRoutes.get("/category", verifyToken, getPostingsByCategory);

export default communityRoutes;
