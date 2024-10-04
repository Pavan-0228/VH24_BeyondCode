import React from 'react';

const PortfolioSection = () => {
  // Mock portfolio data
  const portfolio = {
    assets: [
      { name: 'Stocks', allocation: '60%', performance: '12.5%', risk: 'High' },
      { name: 'Bonds', allocation: '30%', performance: '4.2%', risk: 'Low' },
      { name: 'Real Estate', allocation: '10%', performance: '7.8%', risk: 'Medium' },
    ],
    totalReturn: '10.5%',
    sharpeRatio: '1.2',
    riskTolerance: 'Moderate',
  };

  return (
    <section className="p-8 bg-gray-100 rounded-lg shadow-lg">
      {/* Portfolio Overview Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Portfolio Overview</h2>
        <p className="text-gray-600">Your asset allocation, performance, and risk details.</p>
      </div>

      {/* Asset Allocation Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Asset Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {portfolio.assets.map((asset, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-medium text-gray-800">{asset.name}</h4>
              <p className="text-gray-600">Allocation: <span className="font-bold">{asset.allocation}</span></p>
              <p className="text-gray-600">Performance: <span className="font-bold">{asset.performance}</span></p>
              <p className={`text-gray-600 font-bold ${asset.risk === 'High' ? 'text-red-500' : asset.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                Risk: {asset.risk}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700">Performance Metrics</h3>
        <div className="mt-4">
          <p className="text-gray-600">Total Return: <span className="font-bold text-green-600">{portfolio.totalReturn}</span></p>
          <p className="text-gray-600">Sharpe Ratio: <span className="font-bold text-blue-600">{portfolio.sharpeRatio}</span></p>
        </div>
      </div>

      {/* Risk Management Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700">Risk Management</h3>
        <div className="mt-4">
          <p className="text-gray-600">Risk Tolerance: <span className="font-bold">{portfolio.riskTolerance}</span></p>
          <p className="text-gray-600">Rebalancing Strategy: <span className="font-bold">Quarterly</span></p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
