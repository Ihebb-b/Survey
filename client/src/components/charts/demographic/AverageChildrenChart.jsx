import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { useGetAverageChildrenStatisticsQuery } from "../../../slices/statsApiSlice";
import "chart.js/auto";
const AverageChildrenChart = () => {
 
  const { data, isLoading, isError } = useGetAverageChildrenStatisticsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const averageChildren = data?.averageChildren || 0;

  const chartData = {
    labels: ["Average Children", "Remaining to 6"],
    datasets: [
      {
        label: "Average Children per Household",
        data: [averageChildren, 6], // Assuming a range up to 6 for remaining count
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#4CAF50",
        pointBackgroundColor: "#4CAF50",
        fill: true, // Enables the area fill
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 6, // Optional: set max to match your remaining-to-6 logic
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Average Children per Household
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Average Children per Household: <strong>{averageChildren.toFixed(2)}</strong>
      </p>
      <div className="w-full h-64 justify-center">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default AverageChildrenChart;
