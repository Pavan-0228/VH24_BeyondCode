import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StockChart from './StockChart'; // Import the StockChart component

const StockData = () => {
    const { symbol } = useParams();
    const [historicalData, setHistoricalData] = useState([]);
    const [predictedData, setPredictedData] = useState(null);

    useEffect(() => {
        const fetchHistoricalData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/stock/getHistoricalData/${symbol}`);
                if (response.data.success) {
                    setHistoricalData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching historical data:", error);
            }
        };

        const fetchPredictedData = async () => {
            try {
                const response = await axios.post(`http://localhost:3000/api/v1/stock/predict/${symbol}`, {
                    // Include any necessary input data if required by your API
                });
                if (response.data.success) {
                    setPredictedData(response.data.prediction);
                }
            } catch (error) {
                console.error("Error fetching predicted data:", error);
            }
        };

        fetchHistoricalData();
        fetchPredictedData();
    }, [symbol]);

    // Extract closing prices for historical data
    const historicalPrices = historicalData.map(entry => entry.close);

    // Prepare predicted prices (make sure to adjust based on your prediction format)
    const predictedPrices = predictedData ? Object.values(predictedData) : [];

    return (
        <div>
            <h1>Stock Data for {symbol}</h1>
            <h2>Historical Data</h2>
            <pre>{JSON.stringify(historicalData, null, 2)}</pre>
            <h2>Predicted Data</h2>
            <pre>{JSON.stringify(predictedData, null, 2)}</pre>

            {/* Render the StockChart with historical and predicted prices */}
            <StockChart historicalPrices={historicalPrices} predictedPrices={predictedPrices} />
        </div>
    );
};

export default StockData;
