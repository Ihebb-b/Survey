// AgeGroupDistributionChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { useGetAgeGroupDistributionQuery } from "../../../../slices/statsApiSlice";

const AgeGroupDistributionChart = () => {
  const { data, error, isLoading } = useGetAgeGroupDistributionQuery();

  const chartData =
    data?.ageGroups.map((ageGroup) => ({
      ageGroup: ageGroup.ageGroup,
      percentage: parseFloat(ageGroup.percentage.toFixed(2)),
    })) || [];

  return (
    <div className="w-full h-full  flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Age Group Distribution
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This chart shows the distribution of various age groups in the surveyed
        population.
      </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AgeGroupDistributionChart;
