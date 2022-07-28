import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    img: { type: String },
    fromKakao: { type: Boolean, default: false },
    fromNaver: { type: Boolean, default: false },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    toDo: [{ type: String, trim: true }],
    password: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
