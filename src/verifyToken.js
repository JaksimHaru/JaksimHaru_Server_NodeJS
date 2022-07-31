import jwt from "jsonwebtoken";
import { createError } from "./error";

export const verifyToken = (req, res, next) => {
  console.log(req.headers);
  const accessToken = req.headers.accesstoken;
  if (!accessToken) {
    return next(createError(401, "로그인이 필요합니다"));
  }
  const verifyAccessToken = accessToken.split(" ")[1];
  jwt.verify(verifyAccessToken, process.env.JWT, (error, user) => {
    if (error) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};
