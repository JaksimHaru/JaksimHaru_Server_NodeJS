import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    refreshToken: { type: String, required: true },
  },
  { timestamps: true }
);

const Token = mongoose.model("Token", tokenSchema);
export default Token;
