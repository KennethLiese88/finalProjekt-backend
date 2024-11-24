import { Router } from "express";
import * as user from "../controllers/userController.js";

const userRouter = Router();

userRouter
// get route all registered nutzer (als admin) possibility for deletion
    .post("/register", user.registerUser)
    .post("/login", user.loginUser)
// put/patch daten ändern als nutzer

export default userRouter;