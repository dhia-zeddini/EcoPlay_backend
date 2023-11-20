// commentsMulter.js
import multer from "multer";
import { diskStorage } from "multer";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = diskStorage({
  destination: (req, file, callback) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    callback(null, join(__dirname, "../public/images/challenges")); 
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, `${Date.now()}${name}`);
  },
});

export const commentsUpload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single("image");