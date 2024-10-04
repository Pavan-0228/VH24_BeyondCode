// src/components/StockChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const StockChart = ({ historicalPrices, predictedPrices }) => {
	// Create labels for the chart (make sure to match the number of data points)
	const labels = [
		"2024-09-25",
		"2024-09-26",
		"2024-09-27",
		"2024-09-28",
		"2024-09-29",
		"2024-09-30",
		"2024-10-01",
		"2024-10-02",
		"2024-10-03",
	].slice(0, historicalPrices.length + predictedPrices.length); // Adjust labels based on data length

	// Combine historical and predicted data
	const prices = [...historicalPrices, ...predictedPrices];

	const data = {
		labels: labels,
		datasets: [
			{
				label: "Stock Prices",
				data: prices,
				borderColor: "rgba(75, 192, 192, 1)",
				borderWidth: 2,
				fill: false,
			},
		],
	};

	const options = {
		responsive: true,
		scales: {
			y: {
				beginAtZero: false,
			},
		},
	};

	return (
		<div>
			<h2>Stock Price Prediction</h2>
			<Line data={data} options={options} />
		</div>
	);
};

export default StockChart;
