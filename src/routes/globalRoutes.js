import express from "express";
import { test } from "../controllers/globalController";

const globalRoutes = express.Router();

globalRoutes.get("/", test);
globalRoutes.get("/health", (req, res) => {
  res.status(200);
});

export default globalRoutes;
