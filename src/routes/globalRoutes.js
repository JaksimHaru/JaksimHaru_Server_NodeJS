import express from "express";
import { health, test } from "../controllers/globalController";

const globalRoutes = express.Router();

globalRoutes.get("/", test);
globalRoutes.get("/health", health);

export default globalRoutes;
