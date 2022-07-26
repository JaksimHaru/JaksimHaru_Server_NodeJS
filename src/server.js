import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoute";
import cookieParser from "cookie-parser";

const app = express();
const logger = morgan("dev");

app.use(logger);
app.use(
  cors({
    origin: "http://jaksimharu.shop:8800",
    optionsSuccessStatus: 200,
  })
);
app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);

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
