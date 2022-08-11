import express from "express";
import { health } from "../controllers/globalController";

const globalRoutes = express.Router();

globalRoutes.get("/health", health);

export default globalRoutes;
