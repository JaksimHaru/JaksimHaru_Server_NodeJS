import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Community",
    },
    desc: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
