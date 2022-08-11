import { createError } from "../error";
import Community from "../models/Community";
import Comment from "../models/Comment";

export const postPosting = async (req, res, next) => {
  try {
    if (!req.file) req.file = "";
    const {
      body: { title, desc, category },
      user: { id },
      file,
    } = req;
    const posting = await Community.create({
      title,
      desc,
      image: file.location,
      category,
      userId: id,
    });
    res.status(200).json({ success: true, posting });
  } catch (err) {
    next(err);
  }
};

export const getPostingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posting = await Community.findById(id)
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .populate("userId");
    if (!posting) return next(createError(404, "Posting is not found"));
    res.status(200).json({ success: true, posting });
  } catch (err) {
    next(err);
  }
};

export const editPosting = async (req, res, next) => {
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
    )
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .populate("userId");
    res.status(200).json({ success: true, posting });
  } catch (err) {
    next(err);
  }
};

export const deletePosting = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Community.findByIdAndDelete({ _id: id });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getPostingsByCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    let postings = [];
    postings = await Community.find({ category })
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .populate("userId");
    res.status(200).json({ success: true, postings });
  } catch (err) {
    next(err);
  }
};

export const postComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({
      userId: req.user.id,
      postingId: req.params.id,
      desc: req.body.desc,
    });
    const posting = await Community.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          comments: {
            _id: comment._id,
          },
        },
      },
      { new: true }
    )
      .populate({
        path: "comments",
        populate: {
          path: "userId",
          model: "User",
        },
      })
      .populate("userId");
    res.status(200).json({ success: true, posting });
  } catch (err) {
    next(err);
  }
};

export const getComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.id }).populate(
      "userId"
    );
    if (!comment) return next(createError(400, "Comment is not found"));
    res.status(200).json({ success: true, comment });
  } catch (err) {
    next(err);
  }
};
