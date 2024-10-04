import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { readFile } from "fs/promises";
import Stock from "./models/stock.model.js";
const app = express({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

import { userRouter } from "./routers/user.routes.js";
import stockRoutes from "./routers/stock.routes.js";
import { paymentRouter } from "./routers/payment.routes.js";

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/stock", stockRoutes);
app.use("/api/v1/payment", paymentRouter);

const loadInitialData = async () => {
    try {
        const data = JSON.parse(await readFile("./data.json", "utf8"));
        console.log(data);
        for (const stockData of data.stocks) {
            await Stock.findOneAndUpdate(
                { symbol: stockData.symbol },
                {
                    symbol: stockData.symbol,
                    historical_prices: stockData.data.historical_prices,
                    market_cap: stockData.data.market_cap,
                },
                { upsert: true, new: true }
            );
        }
        console.log("Initial data loaded successfully");
    } catch (error) {
        console.error("Error loading initial data:", error);
    }
};

loadInitialData();

export { app };
