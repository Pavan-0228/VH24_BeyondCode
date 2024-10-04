import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    loginUser,
    logoutUser,
    registerUser,
    setInvestorType,
    getUserById
} from "../controllers/auth.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(verifyJWT, logoutUser);
userRouter.route("/setInvestorType").put(verifyJWT, setInvestorType);
userRouter.get("/user/:id", getUserById);

export { userRouter };