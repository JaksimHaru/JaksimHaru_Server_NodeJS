import jwt from "jsonwebtoken";

export const test = (req, res, next) => {
  try {
    const refreshToken = jwt.sign({}, process.env.JWT, {
      algorithm: "HS256",
      expiresIn: "14d",
    });
    res.status(200).cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
    });
  } catch (err) {
    next(err);
  }
};
