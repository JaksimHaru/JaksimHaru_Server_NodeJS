import { createError } from "../error";
import User from "../models/User";

export const getTodo = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user) return next(createError(401, "You are not authenticated."));
    res.status(200).json({ toDo: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const postTodo = async (req, res, next) => {
  try {
    if (!req.user) return next(createError(401, "You are not authenticated."));
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { $push: { toDo: req.body.toDo } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};
