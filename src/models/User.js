import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    img: { type: String },
    fromKakao: { type: Boolean, default: false },
    fromNaver: { type: Boolean, default: false },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    toDo: [
      {
        date: { type: String, trim: true },
        contents: [
          {
            content: { type: String, trim: true },
            isChecked: { type: Boolean, default: false },
          },
        ],
      },
    ],
    password: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
