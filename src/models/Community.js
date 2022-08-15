import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    category: { type: String, required: true },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
