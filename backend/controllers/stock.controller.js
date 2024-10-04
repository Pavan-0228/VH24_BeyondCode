// File: controllers/stockController.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Stock from "../models/stock.model.js";

// Get the directory name from the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const stocksFilePath = path.join(__dirname, "../data.json"); // Adjust the path as necessary

export const trainModel = async (req, res) => {
    try {
        const { symbol } = req.params;

        // Assuming trainModel is a method that trains the model based on the stock symbol
        const trainedModel = await Stock.trainModel(symbol);
        res.json({ success: true, model: trainedModel });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

export const getHistoricalData = async (req, res) => {
    const { symbol } = req.params;
    try {
        const dataPath = path.resolve("data.json");
        const rawData = fs.readFileSync(dataPath);
        const stocks = JSON.parse(rawData).stocks;

        // Log the stocks for debugging
        // console.log("Stocks Data:", JSON.stringify(stocks, null, 2)); // Pretty print the stocks data

        const stockData = stocks.find((stock) => stock.symbol === symbol);
        if (!stockData) {
            return res.status(404).json({ success: false, error: "Stock not found" });
        }

        // Log stock data found
        // console.log("Stock Data Found:", JSON.stringify(stockData, null, 2)); // Pretty print the stock data

        // Assuming historical_prices is an array within stockData.data
        const historicalPrices = stockData.data.historical_prices;
        
        // Log historical prices
        // console.log("Historical Prices:", JSON.stringify(historicalPrices, null, 2));

        // Ensure we return the historical prices
        res.json({ success: true, data: historicalPrices });
    } catch (error) {
        console.error("Error in getHistoricalData:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const predictStock = async (req, res) => {
    try {
        const { symbol } = req.params;

        // Read the stock data from the JSON file
        const stockData = JSON.parse(fs.readFileSync(stocksFilePath, "utf8"));
        // console.log("Stock Data:", stockData);

        // Find the stock in the JSON data
        const stock = stockData.stocks.find((stock) => stock.symbol === symbol);
        if (!stock) throw new Error("Stock not found");

        // Check what the stock contains

        // Prepare input data for prediction
        const historicalPrices = stock.data.historical_prices; // Correctly access historical_prices
        if (!historicalPrices) throw new Error("Historical prices not found");

        // Log historical prices

        // Ensure historicalPrices is an array
        if (!Array.isArray(historicalPrices) || historicalPrices.length < 2) {
            throw new Error("Not enough historical price data available");
        }

        const inputFeatures = historicalPrices
            .slice(-2) // Get the last two entries
            .map((price) => [price.open, price.high, price.low, price.volume]);

        // Use the trained model to make predictions
        const trainedModel = await Stock.trainModel(symbol);
        const prediction = Stock.predict(trainedModel, inputFeatures);

        res.json({ success: true, prediction });
    } catch (error) {
        console.error("Error in predictStock:", error.message); // Log the error for debugging
        res.status(400).json({ success: false, error: error.message });
    }
};
