import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockPrices = () => {
    const [stockPrices, setStockPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockPrices = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/stock/current-prices');
                setStockPrices(response.data.currentPrices);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStockPrices();
    }, []);

    if (loading) {
        return <p className="text-blue-300">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-400">Error: {error}</p>;
    }

    return (
        <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-blue-300">Current Stock Prices</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg shadow-sm">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 bg-gray-600 border-b border-gray-500 text-left text-blue-200">Stock Symbol</th>
                            <th className="py-2 px-4 bg-gray-600 border-b border-gray-500 text-left text-blue-200">Current Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockPrices.map((stock) => (
                            <tr key={stock.symbol} className="hover:bg-gray-600">
                                <td className="py-2 px-4 border-b border-gray-600 text-gray-300">{stock.symbol}</td>
                                <td className="py-2 px-4 border-b border-gray-600 text-gray-300">{stock.currentPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StockPrices;