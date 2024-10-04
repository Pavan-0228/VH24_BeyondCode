// HistoricalData.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

// Register necessary components for Chart.js
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const HistoricalData = ({ stockSymbol, setPredictedPrice }) => {
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStockData = async () => {
        try {
            const predictionResponse = await axios.post(`http://localhost:3000/api/v1/stock/predict/${stockSymbol}`);
            const historicalResponse = await axios.get(`http://localhost:3000/api/v1/stock/getHistoricalData/${stockSymbol}`);

            setHistoricalData(historicalResponse.data.data);
            setPredictedPrice(predictionResponse.data.prediction.predictedPrice);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching stock data:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, [stockSymbol]);

    const chartData = {
        labels: historicalData.length > 0 ? historicalData.map(data => data.date.split('-').slice(1).join('-')) : [],
        datasets: [
            {
                label: 'Closing Price',
                data: historicalData.length > 0 ? historicalData.map(data => data.close) : [],
                borderColor: '#08c614', // Tailwind Emerald-400 color
                fill: false,
                tension: 0.5,
            },
        ],
    };

    return (
        <div className="bg-[#24007d] text-white p-4 rounded-lg shadow-md w-64">
            <div className="flex items-center justify-between mb-2">
                <div className="flex flex-col-reverse items-center justify-center gap-4">
                    <div>
                        <span className="text-emerald-600 font-semibold text-lg">{stockSymbol}</span>
                    </div>
                    <div>
                        <span className="font-semibold">Historical Data</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-sm">Current Price</span>
                    <div className="text-emerald-300 font-semibold">{loading ? "Loading..." : `₹${historicalData[historicalData.length - 1]?.close || 'N/A'}`}</div>
                </div>
            </div>
            <div className="mb-2 text-sm">
                <div className="text-sm">Closing Price of {stockSymbol}</div>
                
            </div>
            <div className="h-32">
                {loading ? (
                    <p className="text-center text-gray-500">Loading historical data...</p>
                ) : (
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { display: false },
                                title: { display: false },
                            },
                            scales: {
                                x: {
                                    ticks: { color: '#ffffff' }, // Set x-axis text color to white
                                    title: { display: false },
                                },
                                y: {
                                    ticks: { color: '#ffffff' }, // Set y-axis text color to white
                                    title: { display: false },
                                },
                            },
                        }}
                        className="text-white"
                    />
                )}
            </div>
        </div>
    );
};

export default HistoricalData;
