import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "fileZero",
        allowed_formats: ["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"]
    }
})

const upload = multer({storage});

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml", "image/avif"];
//         if (!allowedMimeTypes.includes(file.mimetype)) {
//             return cb(new Error("Ungültiger Dateityp"));
//         }
//         cb(null, true);
//     },
// });

export default upload;