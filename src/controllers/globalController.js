export const health = (req, res, next) => {
  try {
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};