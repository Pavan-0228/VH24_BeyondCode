import express from "express";
import {
    trainModel,
    predictStock,
    getHistoricalData,
} from "../controllers/stock.controller.js";
import { promises as fs } from "fs";
import path from 'path';


const router = express.Router();

router.post("/train/:symbol", trainModel);
router.post("/predict/:symbol", predictStock);
router.get("/getHistoricalData/:symbol", getHistoricalData);
router.get("/current-prices", async (req, res) => {
    try {
        // Resolve the path to data.json
        const filePath = path.resolve("./data.json");
        console.log(filePath);

        // Read the data.json file asynchronously
        const data = await fs.readFile(filePath, "utf-8");
        const stocksData = JSON.parse(data);

        // Extract each company's symbol and latest closing price
        const currentPrices = stocksData.stocks.map((stock) => {
            const { symbol, data } = stock;
            const latestPrice =
                data.historical_prices[data.historical_prices.length - 1].close;

            return {
                symbol,
                currentPrice: latestPrice,
            };
        });

        res.json({ currentPrices });
    } catch (error) {
        console.error("Error reading data.json:", error);
        res.status(500).json({ error: "Unable to fetch stock prices" });
    }
});

export default router;
