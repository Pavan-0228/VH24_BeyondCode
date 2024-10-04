import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { createOrder } from "../controllers/payment.controller.js";

const paymentRouter = Router();

paymentRouter.post("/", verifyJWT, createOrder);

export { paymentRouter };
