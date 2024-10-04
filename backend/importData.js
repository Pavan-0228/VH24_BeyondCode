// importData.js or in server.js/app.js
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import Stock from './models/stock.model.js'; // Adjust the path as necessary
async function importData() {
    const data = JSON.parse(readFileSync('./data.json', 'utf-8'));
    
    for (const stock of data.stocks) {
        const newStock = new Stock({
            symbol: stock.symbol,
            historical_prices: stock.data.historical_prices,
            market_cap: stock.data.market_cap
        });
        await newStock.save();
    }
    
    console.log('Data imported successfully');
}
