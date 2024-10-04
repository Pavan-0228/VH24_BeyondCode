import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const StockCard = () => {
  // Sample data for the chart
  const data = [
    { value: 100 },
    { value: 210 },
    { value: 205 },
    { value: 290 },
    { value: 215 },
    { value: 230 },
    { value: 225 },
    { value: 140 },
    { value: 235 },
    { value: 250 },
    { value: 185 },
    { value: 260 },
  ];

  return (
    <div className="bg-emerald-600 text-white p-4 rounded-lg shadow-md w-64">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-2">
            <TrendingUp className="text-emerald-600" size={20} />
          </div>
          <span className="font-semibold">Nvidia</span>
        </div>
        <div className="text-right">
          <span className="text-sm">NVDA</span>
          <div className="text-emerald-300 font-semibold">+5.63</div>
        </div>
      </div>
      <div className="mb-2">
        <div className="text-sm">Current Value</div>
        <div className="text-3xl font-bold">$203.65</div>
      </div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#34D399" 
              strokeWidth={2} 
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockCard;