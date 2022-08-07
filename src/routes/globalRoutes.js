import express from "express";

const globalRoutes = express.Router();

globalRoutes.get("/health", (req, res) => {
  res.status(200);
});

export default globalRoutes;
