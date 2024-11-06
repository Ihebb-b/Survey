// GenderStatisticsChart.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useGetGenderStatisticsQuery } from "../../../slices/statsApiSlice";

const GenderStatisticsChart = () => {
  const { data, error, isLoading } = useGetGenderStatisticsQuery();

  const chartData = data
    ? [
        { name: "Male", value: parseFloat(data.male.percentage) },
        { name: "Female", value: parseFloat(data.female.percentage) },
      ]
    : [];

  const COLORS = ["#0088FE", "#FF6361"];

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Gender Distribution
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This chart represents the distribution of genders among surveyed
        individuals.
      </p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching data</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default GenderStatisticsChart;
