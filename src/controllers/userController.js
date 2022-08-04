import { createError } from "../error";
import User from "../models/User";

export const getTodo = async (req, res, next) => {
  try {
    if (!req.user) return next(createError(401, "You are not authenticated."));
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({ success: true, toDos: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const getDateTodo = async (req, res, next) => {
  try {
    const { date } = req.params;
    const user = await User.findOne({ _id: req.user.id });
    const toDos = user.toDo;
    let responseTodo = [];
    toDos.forEach((element) => {
      if (element.date === date) {
        responseTodo.push(element);
      }
    });
    console.log(responseTodo);
    res.status(200).json({ success: true, toDos: responseTodo });
  } catch (err) {
    next(err);
  }
};

export const putTodo = async (req, res, next) => {
  try {
    const { isChecked } = req.body;
    await User.findOneAndUpdate(
      { _id: req.user.id, "toDo._id": req.body.id },
      {
        $set: {
          "toDo.$.isChecked": !JSON.parse(isChecked),
        },
      }
    );
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({ success: true, toDos: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const postTodo = async (req, res, next) => {
  try {
    if (!req.user) return next(createError(401, "You are not authenticated."));
    const date = req.body.date.split("T")[0];
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          toDo: {
            date,
            content: req.body.content,
            isChecked: req.body.isChecked,
          },
        },
      }
    );
    res.status(200).json({ success: true, toDos: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    if (!req.user) return next(createError(401, "You are not authenticated."));
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $pull: { toDo: { _id: req.body.id } } }
    );
    const user = await User.findOne({ _id: req.user.id });
    res.status(200).json({ success: true, toDos: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const getEditProfile = async (req, res, next) => {};

export const postEditProfile = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) return next(createError(404, "File not found"));
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        img: req.file.location,
      },
      { new: true }
    );
    res.status(200).json({ success: true, updatedImg: updatedUser.img });
  } catch (err) {
    next(err);
  }
};

export const getSchedule = (req, res, next) => {};

export const postSchedule = (req, res, next) => {};

export const deleteSchedule = (req, res, next) => {};
