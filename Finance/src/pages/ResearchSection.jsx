import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const predefinedStocks = [
  "AAPL",
  "NFLX",
  "AMZN",
  "MSFT",
  "FB",
  "NVDA",
  "TCS",
  "GOOGL",
  "TSLA",
  "BRK.B",
];

const ResearchSection = () => {
  const [stocks, setStocks] = useState([]);
  const scrollContainerRef = useRef(null);

  const fetchStockData = async () => {
    try {
      const stockDataPromises = predefinedStocks.map((symbol) =>
        axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=crvsumpr01qkji45p4r0crvsumpr01qkji45p4rg`
        )
      );
      const responses = await Promise.all(stockDataPromises);
      const stocksData = responses.map((response, index) => ({
        symbol: predefinedStocks[index],
        ...response.data,
      }));
      setStocks(stocksData);
    } catch (error) {
      console.error("Error fetching stock data", error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollAnimation = () => {
        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 3;
        }
      };

      const animationId = setInterval(scrollAnimation, 50);

      return () => clearInterval(animationId);
    }
  }, [stocks]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Investment Research</h2>

      <div
        ref={scrollContainerRef}
        className="mt-6 flex overflow-x-hidden"
        style={{ width: "calc(100vw - 3rem)" }}
      >
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            className={`flex-shrink-0 p-4 rounded-md shadow-md mx-2 ${
              stock.d > 0 ? "bg-green-500" : "bg-red-500 text-white"
            }`}
            style={{ width: "calc(25% - 1rem)" }}
          >
            <h3 className="text-xl font-bold">{stock.symbol}</h3>
            <p className="text-white">Price: ${stock.c}</p>
            <p
              className={`text-gray-700 ${
                stock.d < 0 ? "text-white" : "text-white"
              }`}
            >
              Change: {stock.d > 0 ? "+" : ""}
              {stock.d} ({((stock.d / (stock.c - stock.d)) * 100).toFixed(2)}%)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchSection;
