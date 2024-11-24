import { Router } from "express";
import * as user from "../controllers/userController.js";

const userRouter = Router();

userRouter
    .post("/register", user.registerUser)
    .post("/login", user.loginUser)

export default userRouter;