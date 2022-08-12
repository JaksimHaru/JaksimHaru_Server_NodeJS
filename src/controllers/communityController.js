import { createError } from "../error";
import Community from "../models/Community";
import Comment from "../models/Comment";
import mongoose from "mongoose";

export const postPosting = async (req, res, next) => {
  try {
    if (!req.file) req.file = "";
    const {
      body: { title, desc, category, anonymous },
      user: { id },
      file,
    } = req;
    const posting = await Community.create({
      title,
      desc,
      image: file.location,
      category,
      userId: id,
      anonymous,
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
    const posting = await Community.findById({ _id: req.params.id });
    if (req.user.id !== posting.userId.toString()) {
      return next(createError(401, "글의 주인이 아닙니다."));
    }
    if (!req.file) req.file = "";
    const {
      body: { title, desc, category },
      file,
    } = req;
    const responsePosting = await Community.findOneAndUpdate(
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
    res.status(200).json({ success: true, posting: responsePosting });
  } catch (err) {
    next(err);
  }
};

export const deletePosting = async (req, res, next) => {
  try {
    const posting = await Community.findById({ _id: req.params.id });
    if (req.user.id !== posting.userId.toString()) {
      return next(createError(401, "게시글의 주인이 아닙니다."));
    }
    await Community.findByIdAndDelete({ _id: req.params.id });
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

export const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById({ _id: req.params.id });
    if (req.user.id !== comment.userId.toString()) {
      return next(createError(401, "댓글의 주인이 아닙니다."));
    }
    await Comment.findByIdAndDelete({ _id: req.params.id });
    await Community.findByIdAndUpdate(
      { _id: comment.postingId },
      {
        $pull: { comments: mongoose.Types.ObjectId(comment._id) },
      }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const editComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById({ _id: req.params.id });
    if (req.user.id !== comment.userId.toString()) {
      return next(createError(401, "댓글의 주인이 아닙니다."));
    }
    comment.desc = req.body.desc;
    comment.save();
    res.status(200).json({ success: true, comment });
  } catch (err) {
    next(err);
  }
};
