// DietDistributionChart.js
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetStatisticsDietQuery } from "../../../slices/statsApiSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const DietDistributionChart = () => {
  const { data, error, isLoading } = useGetStatisticsDietQuery();
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data) {
      const dietLabels = data.map(diet => diet.diet);
      const dietCounts = data.map(diet => diet.percentage);

      setChartData({
        labels: dietLabels,
        datasets: [
          {
            label: "Diet Distribution (%)",
            data: dietCounts,
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#FF6384",
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
              "#FF6384",
            ],
          },
        ],
      });
    }
  }, [data]);

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Diet Distribution
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This pie chart shows the percentage of respondents for each diet type.
      </p>
      {isLoading ? (
        <p>Loading diet data...</p>
      ) : error ? (
        <p className="text-red-500">Error loading diet data</p>
      ) : (
        chartData && (
          <div className="w-full h-64">
            <Doughnut
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => {
                        const label = tooltipItem.label || "";
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value.toFixed(2)}%`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default DietDistributionChart;
