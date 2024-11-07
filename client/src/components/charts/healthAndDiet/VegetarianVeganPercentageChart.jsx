import React from "react";
import { useGetStatisticsVegetarianVeganPercentageQuery } from "../../../slices/statsApiSlice";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip);

const VegetarianVeganPercentageChart = () => {
  const { data, error, isLoading } = useGetStatisticsVegetarianVeganPercentageQuery();

  if (isLoading) return <p>Loading vegetarian/vegan percentage...</p>;
  if (error) return <p>Error loading data</p>;

  const percentage = parseFloat(data?.vegetarianVeganPercentage || 0);

  const chartData = {
    labels: ["Vegetarian/Vegan", "Non-Vegetarian/Non-Vegan"],
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ["#4CAF50", "#E0E0E0"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      r: {
        ticks: { display: false }, // Hide axis labels for a cleaner look
        grid: { color: "#f0f0f0" },
        angleLines: { display: false },
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toFixed(1)}% ${tooltipItem.label}`,
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Vegetarian/Vegan Percentage
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This chart shows the percentage of survey participants with a vegetarian or vegan diet.
      </p>
      <div className="w-full h-64 flex justify-center items-center">
        <PolarArea data={chartData} options={chartOptions} />
      </div>
      {/* <div className="text-lg font-bold mt-4">
        {percentage.toFixed(2)}% of participants
      </div> */}
    </div>
  );
};

export default VegetarianVeganPercentageChart;
