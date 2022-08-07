import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2",
});

const s3ProfileImageUploader = multerS3({
  s3: s3,
  bucket: "jaksimharu/images",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  acl: "public-read",
});

const s3PostingImageUploader = multerS3({
  s3: s3,
  bucket: "jaksimharu/posting",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  acl: "public-read",
});

export const profileImageUpload = multer({
  storage: s3ProfileImageUploader,
});

export const postingImageUpload = multer({
  storage: s3PostingImageUploader,
});
