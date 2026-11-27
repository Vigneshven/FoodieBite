import multer from "multer";
import { mkdirSync } from "node:fs";
import path from "node:path";

const uploadRoot = path.resolve("public/uploads/restaurants");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subFolder = file.fieldname === "logo" ? "logo" : "image";
    const dest = path.join(uploadRoot, subFolder);

    mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLocaleLowerCase();
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e5)}${extension}`;

    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG AND PNG images are allowed"));
  }
};

export const restaurantUpload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});
