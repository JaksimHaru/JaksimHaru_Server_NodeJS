import express from "express";

const globalRoutes = express.Router();

globalRoutes.get("/", (req, res) => {
  const refreshToken = jwt.sign({}, process.env.JWT, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
  res.status(200).cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
  });
});
globalRoutes.get("/health", (req, res) => {
  res.status(200);
});

export default globalRoutes;
