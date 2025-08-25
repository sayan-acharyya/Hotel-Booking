import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads folder exists
const dir = "uploads";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

// Storage configuration
const storage = multer.diskStorage({
    destination: dir,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) cb(null, true);
    else cb(new Error("Only image files are allowed (jpeg, jpg, png, gif)"));
};

// Initialize multer
export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB per file
});
