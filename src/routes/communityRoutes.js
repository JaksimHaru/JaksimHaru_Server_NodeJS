import express from "express";
import {
  getPostingById,
  postPosting,
  modifyPosting,
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

export default communityRoutes;
