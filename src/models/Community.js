import mongoose from "mongoose";

const communitySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, default: "" },
    userId: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

const Community = mongoose.model("Community", communitySchema);

export default Community;
