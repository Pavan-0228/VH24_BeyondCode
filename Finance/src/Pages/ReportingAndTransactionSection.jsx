import React, { useState } from 'react';

const ReportingAndTransactionSection = () => {
  const [transactions] = useState([
    {
      date: '2024-10-01',
      type: 'Buy',
      stock: 'AAPL',
      quantity: 10,
      price: 150,
      fees: 1.5,
    },
    {
      date: '2024-10-02',
      type: 'Sell',
      stock: 'TSLA',
      quantity: 5,
      price: 200,
      fees: 2.0,
    },
    {
      date: '2024-10-03',
      type: 'Dividend',
      stock: 'AAPL',
      quantity: 0,
      price: 0,
      fees: 0,
      dividend: 1.5,
    },
  ]);

  const totalPortfolioValue = transactions.reduce((acc, transaction) => {
    const totalValue = transaction.quantity * transaction.price - transaction.fees;
    return acc + totalValue;
  }, 0);

  const totalDividendIncome = transactions.reduce((acc, transaction) => {
    return acc + (transaction.dividend || 0);
  }, 0);

  const performanceMetrics = {
    totalReturn: totalPortfolioValue - 1000, // Assume original investment of 1000
    percentageGainLoss: ((totalPortfolioValue - 1000) / 1000) * 100,
    annualizedReturn: ((totalPortfolioValue - 1000) / 1000) * 100 / 1, // Placeholder for 1 year
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Reporting & Transactions</h2>

      {/* Transaction History */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Stock/Asset</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Total Value</th>
              <th className="px-4 py-2 border">Fees</th>
              <th className="px-4 py-2 border">Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => {
              const totalValue = (transaction.quantity * transaction.price);
              const netAmount = totalValue - transaction.fees;

              return (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{transaction.date}</td>
                  <td className={`px-4 py-2 border ${transaction.type === 'Buy' ? 'text-green-500' : transaction.type === 'Sell' ? 'text-red-500' : 'text-blue-500'}`}>
                    {transaction.type}
                  </td>
                  <td className="px-4 py-2 border">{transaction.stock}</td>
                  <td className="px-4 py-2 border">{transaction.quantity}</td>
                  <td className="px-4 py-2 border">${transaction.price}</td>
                  <td className={`px-4 py-2 border ${netAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    ${totalValue.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 border">${transaction.fees}</td>
                  <td className={`px-4 py-2 border ${netAmount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    ${netAmount.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Portfolio Performance Reports */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Portfolio Performance Reports</h3>
        <p>Total Return: <span className="font-bold">${performanceMetrics.totalReturn.toFixed(2)}</span></p>
        <p>Percentage Gain/Loss: <span className={`font-bold ${performanceMetrics.percentageGainLoss < 0 ? 'text-red-500' : 'text-green-500'}`}>
          {performanceMetrics.percentageGainLoss.toFixed(2)}%
        </span></p>
        <p>Annualized Return: <span className="font-bold">{performanceMetrics.annualizedReturn.toFixed(2)}%</span></p>
      </div>

      {/* Dividend Reports */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Dividend Reports</h3>
        <p>Dividend Income: <span className="font-bold">${totalDividendIncome.toFixed(2)}</span></p>
      </div>

      {/* Investment Allocation */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Investment Allocation</h3>
        {/* Pie chart or bar graph can be added here */}
        <p>Asset Allocation and Sector Exposure data goes here.</p>
      </div>

      {/* Tax Reporting */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Tax Reporting</h3>
        <p>Realized Gains/Losses and Unrealized Gains/Losses data goes here.</p>
      </div>

      {/* Alerts and Notifications */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Alerts and Notifications</h3>
        <p>Transaction Alerts and Performance Alerts go here.</p>
      </div>

      {/* Investment Insights */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">Investment Insights</h3>
        <p>Market News and Analyst Ratings go here.</p>
      </div>

      {/* User-Friendly Features */}
      <div className="mb-6 p-4 bg-gray-100 rounded-md">
        <h3 className="text-xl font-semibold mb-2">User-Friendly Features</h3>
        <p>Export Options and Filtering/Sorting options go here.</p>
      </div>
    </div>
  );
};

export default ReportingAndTransactionSection;
