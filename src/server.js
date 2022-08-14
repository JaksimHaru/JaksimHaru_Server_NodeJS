import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import globalRoutes from "./routes/globalRoutes";
import communityRoutes from "./routes/communityRoutes";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const logger = morgan("dev");

app.use(logger);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Origin", "https://jaksimharu.netlify.app");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cookieParser());
app.use(express.json());

app.use("/", globalRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/community", communityRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "오류 발생";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

export default app;
