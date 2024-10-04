import React, { useState } from 'react';
import HistoricalData from '../components/HistoricalData';
import ResearchSection from './ResearchSection';
import StockPrices from '../components/StockPrices';
import Research2 from './Research2';
import UserProfile from '../components/UserProfile';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [stockSymbol, setStockSymbol] = useState('TCS.NS'); // Moved to Dashboard state
    const username = "sangini";

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
            <Link to="/MutualRecommend">
                <div className='w-max h-40 bg-blue-900 mt-10 flex flex-col justify-center items-center text-white rounded-lg p-4 hover:bg-blue-800 transition-colors'>
                    <h3 className="text-lg">Mutual Funds Recommendation for</h3>
                    <h1 className="text-2xl font-bold">{username}</h1>
                </div>
            </Link>
            <div className='right-10 top-28 fixed border rounded-lg hover:border-blue-500'>
                <StockPrices setStockSymbol={setStockSymbol} /> {/* Pass setter to StockPrices */}
            </div>
            {/* Uncomment if you want to use Research2 component */}
            {/* <div className='bottom-2 fixed'>
                <Research2 />
            </div> */}
            {/* Optional: Include UserProfile component */}
            {/* <UserProfile userId="user_id_here" /> */}
        </div>
    );
};

export default Dashboard;
