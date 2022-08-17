import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    img: { type: String, default: "https://jaksimharu.s3.ap-northeast-2.amazonaws.com/images/KakaoTalk_Photo_2022-08-18-01-29-57.png"},
    fromKakao: { type: Boolean, default: false },
    fromNaver: { type: Boolean, default: false },
    name: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    password: { type: String },
    toDo: [
      {
        date: { type: String },
        content: { type: String, trim: true },
        isChecked: { type: Boolean, default: false },
      },
    ],
    schedule: [
      {
        date: { type: String },
        time: { type: String },
        content: { type: String, trim: true },
        isChecked: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
