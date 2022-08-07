import { createError } from "../error";
import Community from "../models/Community";

export const postPosting = async (req, res, next) => {
  try {
    if (!file) req.file = "";
    const {
      body: { title, desc, category },
      user: { id },
      file,
    } = req;
    const post = await Community.create({
      title,
      desc,
      image: file.location,
      category,
      userId: id,
    });
    res.status(200).json({ success: true, post });
  } catch (err) {
    next(err);
  }
};

export const getPostingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posting = await Community.findOne({ _id: id });
    if (!posting) return next(createError(404, "Posting is not found"));
    res.status(200).json({ success: true, posting });
  } catch (err) {
    next(err);
  }
};

export const modifyPosting = async (req, res, next) => {
  try {
    if (!file) req.file = "";
    const {
      body: { title, desc, category },
      file,
    } = req;
    await Community.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title,
        desc,
        image: file.location,
        category,
      }
    );
  } catch (err) {
    next(err);
  }
};
