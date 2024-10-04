import React, { useState } from 'react';
import HistoricalData from '../components/HistoricalData';
import ResearchSection from './ResearchSection';
import StockPrices from '../components/StockPrices';
import Research2 from './Research2';

const Dashboard = () => {
    const [predictedPrice, setPredictedPrice] = useState(null);
    const stockSymbol = 'TCS.NS';

    return (
        <div className="p-4 bg-gray-900 text-white min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-white">Stock Market Dashboard</h1>
            <div className="flex items-start gap-4">
                <HistoricalData stockSymbol={stockSymbol} setPredictedPrice={setPredictedPrice} />
                {predictedPrice !== null && (
                    <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-md w-52">
                        <h3 className="text-lg font-semibold text-white">Predicted Price for {stockSymbol}:</h3>
                        <p className="text-xl font-bold text-green-400">₹{predictedPrice}</p>
                    </div>
                )}
            </div>
            <div className='right-10 top-20 fixed border rounded-lg hover:border-blue-500 '>
                <StockPrices />
            </div>
            <div className='bottom-2 fixed'>
                <Research2 />
            </div>
        </div>
    );
};

export default Dashboard;