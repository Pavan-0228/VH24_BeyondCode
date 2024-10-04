import express from "express";
import {
    trainModel,
    predictStock,
    getHistoricalData,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.post("/train/:symbol", trainModel);
router.post("/predict/:symbol", predictStock);
router.get("/getHistoricalData/:symbol", getHistoricalData);

export default router;
