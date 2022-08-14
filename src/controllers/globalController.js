export const health = (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const test = (req, res, next) => {
  res
    .status(200)
    .cookie("refresh_token", {
      secure: true,
      sameSite: "None",
    })
    .json({ success: true });
};
