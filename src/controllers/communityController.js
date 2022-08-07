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
    if (!req.file) req.file = "";
    const {
      body: { title, desc, category },
      file,
    } = req;
    const posting = await Community.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        desc,
        image: file.location,
        category,
      },
      { new: true }
    );
    res.status(200).json({ success: true, posting });
  } catch (err) {
    next(err);
  }
};

export const getPostingsByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    let responsePostings = [];
    responsePostings = await Community.find({ category });
    res.status(200).json({ success: true, responsePostings });
  } catch (err) {
    next(err);
  }
};
