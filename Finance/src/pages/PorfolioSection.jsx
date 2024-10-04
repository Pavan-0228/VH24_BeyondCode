import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PortfolioSection = () => {
  // Mock portfolio data
  const portfolio = {
    assets: [
      { name: 'Stocks', allocation: 60, performance: '12.5%', risk: 'High' },
      { name: 'Bonds', allocation: 30, performance: '4.2%', risk: 'Low' },
      { name: 'Mutual Funds', allocation: 10, performance: '7.8%', risk: 'Medium' },
    ],
    totalReturn: '10.5%',
    sharpeRatio: '1.2',
    riskTolerance: 'Moderate',
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <section className="p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      {/* Portfolio Overview Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-semibold text-gray-100">Portfolio Overview</h2>
        <p className="text-gray-400">Your asset allocation, performance, and risk details.</p>
      </div>

      {/* Asset Allocation Section with Pie Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-200">Asset Allocation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolio.assets}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="allocation"
                >
                  {portfolio.assets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {portfolio.assets.map((asset, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-medium text-gray-100">{asset.name}</h4>
                <p className="text-gray-300">Allocation: <span className="font-bold">{asset.allocation}%</span></p>
                <p className="text-gray-300">Performance: <span className="font-bold">{asset.performance}</span></p>
                <p className={`font-bold ${asset.risk === 'High' ? 'text-red-400' : asset.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                  Risk: {asset.risk}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-200">Performance Metrics</h3>
        <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-300">Total Return: <span className="font-bold text-green-400">{portfolio.totalReturn}</span></p>
          <p className="text-gray-300">Sharpe Ratio: <span className="font-bold text-blue-400">{portfolio.sharpeRatio}</span></p>
        </div>
      </div>

      {/* Risk Management Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-200">Risk Management</h3>
        <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-gray-300">Risk Tolerance: <span className="font-bold">{portfolio.riskTolerance}</span></p>
          <p className="text-gray-300">Rebalancing Strategy: <span className="font-bold">Quarterly</span></p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;