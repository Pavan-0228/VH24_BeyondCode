import { useState } from 'react';
import axios from 'axios';

const ResearchSection = () => {
  const [query, setQuery] = useState('');
  const [stock, setStock] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`https://api.example.com/stocks/${query}`);
      setStock(response.data);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Investment Research</h2>
      
      {/* Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchStockData}
          className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Stock Information */}
      {stock && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-xl font-bold">{stock.companyName}</h3>
          <p className="text-gray-700">Symbol: {stock.symbol}</p>
          <p className="text-gray-700">Price: ${stock.latestPrice}</p>
          <p className="text-gray-700">Change: {stock.change > 0 ? '+' : ''}{stock.change} ({stock.changePercent * 100}%)</p>
        </div>
      )}
    </div>
  );
};

export default ResearchSection;
