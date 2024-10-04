import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const predefinedStocks = [
    "AAPL", "NFLX", "AMZN", "MSFT", "FB",
    "NVDA", "TCS", "GOOGL", "TSLA", "BRK.B",
];

const Research2 = () => {
    const [stocks, setStocks] = useState([]);
    const scrollContainerRef = useRef(null);

    const fetchStockData = async () => {
        try {
            const stockDataPromises = predefinedStocks.map((symbol) =>
                axios.get(
                    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=crvuorhr01qrbtrl55fgcrvuorhr01qrbtrl55g0`
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
        if (scrollContainer && stocks.length > 0) {
            const scrollAnimation = () => {
                if (
                    scrollContainer.scrollLeft >=
                    scrollContainer.scrollWidth / 2
                ) {
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1;
                }
            };

            const animationId = setInterval(scrollAnimation, 30);

            return () => clearInterval(animationId);
        }
    }, [stocks]);

    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : 'N/A';
    };

    const formatChange = (change, currentPrice) => {
        if (typeof change !== 'number' || typeof currentPrice !== 'number') {
            return 'N/A';
        }
        const percentage = ((change / (currentPrice - change)) * 100).toFixed(2);
        return `${change > 0 ? '+' : ''}${change.toFixed(2)} (${percentage}%)`;
    };

    return (
        <div className="p-6 bg-gray-900 text-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-white">Investment Research</h2>

            <div
                ref={scrollContainerRef}
                className="mt-6 flex overflow-x-hidden"
                style={{ width: "calc(100vw - 3rem)" }}
            >
                {[...stocks, ...stocks].map((stock, index) => (
                    <div
                        key={`${stock.symbol}-${index}`}
                        className={`flex-shrink-0 p-4 rounded-md shadow-md mx-2 ${stock.d > 0 ? "bg-green-700" : "bg-red-700"}`}
                        style={{ width: "250px" }}
                    >
                        <h3 className="text-xl font-bold">{stock.symbol}</h3>
                        <p className="text-gray-200">Price: ${formatPrice(stock.c)}</p>
                        <p className="text-gray-300">
                            Change: {formatChange(stock.d, stock.c)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Research2;
