import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: "AKIA3N2VAGF4CHMFT6X6",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: "jaksimharu",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  acl: "public-read",
});

export const imageUpload = multer({
  storage: s3ImageUploader,
});
