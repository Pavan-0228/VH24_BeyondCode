import React, { useState, useEffect, useRef } from 'react';

// Sample trendy stocks data
const trendyStocks = [
  { id: 1, name: 'Nvidia', ticker: 'NVDA', currentValue: 203.65, change: '+5.63' },
  { id: 2, name: 'Apple', ticker: 'AAPL', currentValue: 145.09, change: '+1.23' },
  { id: 3, name: 'Tesla', ticker: 'TSLA', currentValue: 789.23, change: '-3.45' },
  { id: 4, name: 'Amazon', ticker: 'AMZN', currentValue: 3412.56, change: '+12.30' },
  { id: 5, name: 'Google', ticker: 'GOOGL', currentValue: 2750.18, change: '+7.89' },
  { id: 6, name: 'Microsoft', ticker: 'MSFT', currentValue: 301.45, change: '+8.41' },
  { id: 7, name: 'Facebook', ticker: 'META', currentValue: 325.25, change: '+2.19' },
  { id: 8, name: 'Netflix', ticker: 'NFLX', currentValue: 510.75, change: '-1.89' },
  { id: 9, name: 'Adobe', ticker: 'ADBE', currentValue: 573.48, change: '+6.23' },
  { id: 10, name: 'Intel', ticker: 'INTC', currentValue: 48.67, change: '-0.45' }
];

const Navbar = () => (
  <nav className="w-full bg-gray-800 p-4 shadow-lg">
    <h1 className="text-white text-center text-2xl font-bold">Trendy Stocks</h1>
  </nav>
);

const StockCard = ({ stock }) => (
  <div className="bg-green-600 rounded-lg p-4 w-64 text-white shadow-lg mx-2 transition-all duration-500 ease-in-out transform">
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1">
          <img
            src={`https://logo.clearbit.com/${stock.name.toLowerCase()}.com`}
            alt={stock.name}
            className="w-8 h-8"
          />
        </div>
        <span className="font-bold">{stock.name}</span>
      </div>
      <div className="text-right">
        <span className="block font-semibold">{stock.ticker}</span>
        <span className={`${stock.change.startsWith('+') ? 'text-green-200' : 'text-red-200'}`}>
          {stock.change}
        </span>
      </div>
    </div>
    <div className="mb-4">
      <span className="block text-lg font-bold">Current Value</span>
      <span className="text-3xl font-bold">${stock.currentValue}</span>
    </div>
    <div className="w-full h-20 flex justify-center items-center bg-green-700 rounded-lg">
      <svg width="100%" height="100%" viewBox="0 0 100 40">
        <rect x="0" y="0" width="100%" height="100%" fill="none" />
        <path
          d="M 0 30 Q 20 20, 40 25 Q 60 15, 80 20 Q 100 10, 120 12"
          stroke="white"
          strokeWidth="2"
          fill="transparent"
        />
      </svg>
    </div>
  </div>
);

const StockCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  // Clone stocks to create an infinite loop effect
  const clonedStocks = [...trendyStocks, ...trendyStocks, ...trendyStocks];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % trendyStocks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
          carouselRef.current.style.transition = 'none';
          carouselRef.current.style.transform = `translateX(-${trendyStocks.length * 16}rem)`;
          setTimeout(() => {
            carouselRef.current.style.transition = 'transform 0.5s ease';
          }, 50);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isTransitioning, currentIndex]);

  const handleTransitionEnd = () => {
    setIsTransitioning(true);
  };

  return (
    <div className="flex justify-center mt-8 overflow-hidden">
      <div className="relative w-full max-w-4xl">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex + trendyStocks.length) * 16}rem)`,
            width: `${clonedStocks.length * 16}rem`
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {clonedStocks.map((stock, index) => (
            <StockCard key={`${stock.id}-${index}`} stock={stock} />
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <StockCarousel />
    </div>
  );
};

export default App;