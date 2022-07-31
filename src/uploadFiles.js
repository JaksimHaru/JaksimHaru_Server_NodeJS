import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2",
});

const s3ImageUploader = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "jaksimharu/images",
  }),
});

export const uploadImage = s3ImageUploader.single("image");
