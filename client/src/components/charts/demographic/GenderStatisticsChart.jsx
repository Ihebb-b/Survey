// GenderStatisticsChart.js
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useGetGenderStatisticsQuery } from "../../../slices/statsApiSlice";
const GenderStatisticsChart = () => {
  const { data, error, isLoading } = useGetGenderStatisticsQuery();

  // Data processing
  const chartData = data
    ? [
        { name: "Male", value: parseFloat(data.male.percentage) },
        { name: "Female", value: parseFloat(data.female.percentage) },
      ]
    : [];

  const COLORS = ["#0088FE", "#FF6361"];

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Gender Distribution</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching data</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
