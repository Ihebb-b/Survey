import React from "react";
import { useGetPhysicalActivityRatioQuery } from "../../../slices/statsApiSlice";
import { PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PhysicalActivityRatioChart = () => {
  const { data, error, isLoading } = useGetPhysicalActivityRatioQuery();

  if (isLoading) return <p>Loading physical activity ratio data...</p>;
  if (error) return <p>Error loading data</p>;

  const yesPercentage = parseFloat(data?.physicalActivityRatio?.yes) || 0;
  const noPercentage = parseFloat(data?.physicalActivityRatio?.no) || 0;

  const chartData = {
    labels: ["Yes (Active)", "No (Inactive)"],
    datasets: [
      {
        data: [yesPercentage, noPercentage],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        r: {
          ticks: {
            display: false,
          },
        },
      },
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw;
            return `${value}% of total responses`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Physical Activity Ratio
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This chart shows the percentage of participants who are physically active.
      </p>
      <div className="w-full h-64 flex justify-center">
        <PolarArea data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PhysicalActivityRatioChart;
