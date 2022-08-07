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
    console.log(user);
    res.status(200).json({ success: true, toDos: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const postTodo = async (req, res, next) => {
  try {
    if (!req.user) return next(createError(401, "You are not authenticated."));
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          toDo: {
            date: req.body.date,
            content: req.body.content,
            isChecked: req.body.isChecked,
          },
        },
      }
    );
    const user = await User.findOne({ _id: req.user.id });
    console.log(user);
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
    console.log(user);
    res.status(200).json({ success: true, toDos: user.toDo });
  } catch (err) {
    next(err);
  }
};

export const getEditProfile = async (req, res, next) => {};

export const postEditProfile = async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) return next(createError(404, "File is not found"));
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

export const getSchedule = async (req, res, next) => {
  try {
    const { date } = req.params;
    const user = await User.findOne({ _id: req.user.id });
    const schedules = user.schedule;
    let responseScheduels = [];
    schedules.forEach((element) => {
      if (element.date === date) {
        responseScheduels.push(element);
      }
    });
    console.log(responseScheduels);
    res.status(200).json({ success: true, schedules: responseScheduels });
  } catch (err) {
    next(err);
  }
};

export const postSchedule = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: {
          schedule: {
            date: req.body.date,
            time: req.body.time,
            content: req.body.content,
            isChecked: req.body.isChecked,
          },
        },
      }
    );
    const user = await User.findOne({ _id: req.user.id });
    console.log(user);
    res.status(200).json({ success: true, schedules: user.schedule });
  } catch (err) {
    next(err);
  }
};

export const deleteSchedule = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: { schedule: { _id: req.body.id } },
      }
    );
    const user = await User.findOne({ _id: req.user.id });
    console.log(user);
    res.status(200).json({ success: true, schedules: user.schedule });
  } catch (err) {
    next(err);
  }
};
