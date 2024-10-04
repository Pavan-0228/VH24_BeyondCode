// Dashboard.js
import React, { useState } from 'react';
import HistoricalData from '../components/HistoricalData';

const Dashboard = () => {
    const [predictedPrice, setPredictedPrice] = useState(null);
    const stockSymbol = 'TCS.NS';

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Stock Market Dashboard</h1>
            <div className="flex items-start gap-4">
                <HistoricalData stockSymbol={stockSymbol} setPredictedPrice={setPredictedPrice} />
                {predictedPrice !== null && (
                    <div className="p-4 bg-gray-100 border rounded-lg shadow-md w-1/2">
                        <h3 className="text-lg font-semibold">Predicted Price for {stockSymbol}:</h3>
                        <p className="text-xl font-bold text-green-600">₹{predictedPrice}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
