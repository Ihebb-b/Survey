import React from "react";
import { useGetSocialStatusQuery } from "../../../slices/statsApiSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const SocialStatusChart = () => {
  const { data, error, isLoading } = useGetSocialStatusQuery();

  if (isLoading) return <p>Loading social status data...</p>;
  if (error) return <p>Error loading social status data</p>;

  const chartData = {
    labels: data.socialStates.map((state) => state.socialState),
    datasets: [
      {
        label: "Social Status Distribution",
        data: data.socialStates.map((state) => state.percentage),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FFA726",
          "#AB47BC",
          "#29B6F6",
          "#EF5350",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Social Status Distribution
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This chart shows the percentage distribution of survey participants
        based on their social status.
      </p>
      <div className="w-full h-64 justify-center">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                },
              },
            }}
          />
      </div>
    </div>
  );
};

export default SocialStatusChart;
