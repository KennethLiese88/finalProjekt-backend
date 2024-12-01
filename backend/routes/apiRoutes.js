import { Router } from "express";
import * as home from "../controllers/userController.js";
import * as gallery from "../controllers/galleryController.js";
import upload from "../middleware/multerUpload.js";
// import { authCheck } from "../middleware/generateToken.js";

const apiRouter = Router();

apiRouter
  .post("/register", home.registerUser)
  .post("/login", home.loginUser)
  .post("/upload", upload.single("image"), gallery.uploadImage)
  .get("/images", gallery.allImages);

export default apiRouter;
