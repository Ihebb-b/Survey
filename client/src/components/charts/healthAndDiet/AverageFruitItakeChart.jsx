import React from "react";
import { useGetStatisticsAverageFruitIntakeQuery } from "../../../slices/statsApiSlice";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const AverageFruitIntakeChart = () => {
  const { data, error, isLoading } = useGetStatisticsAverageFruitIntakeQuery();

  if (isLoading) return <p>Loading average fruit intake data...</p>;
  if (error) return <p>Error loading data</p>;

  const averageIntake = data?.averageFruitIntakePerDay || 0;

  const chartData = {
    labels: ["Average Fruit Intake", "Remaining to 10"],
    datasets: [
      {
        data: [averageIntake, 10 - averageIntake],
        backgroundColor: ["#36A2EB", "#E0E0E0"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    cutout: "80%", // Creates a radial (gauge-like) effect
    plugins: {
      tooltip: {
        enabled: true, // Enable tooltip for hover
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            const percentage = ((value / 10) * 100).toFixed(1);
            return `${percentage}% of max daily intake`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Average Daily Fruit Intake
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        Based on survey responses, this chart shows the average units of fruit consumed per day.
      </p>
      <div className="w-full h-64 flex justify-center items-center">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
      {/* <div className="text-lg font-bold mt-4">
        {averageIntake.toFixed(1)} units/day
      </div> */}
    </div>
  );
};

export default AverageFruitIntakeChart;
