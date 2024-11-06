// AgeGroupDistributionChart.js
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { useGetAgeGroupDistributionQuery } from "../../../slices/statsApiSlice";

const AgeGroupDistributionChart = () => {
  const { data, error, isLoading } = useGetAgeGroupDistributionQuery();

  const chartData = data?.ageGroups.map((ageGroup) => ({
    ageGroup: ageGroup.ageGroup,
    percentage: parseFloat(ageGroup.percentage.toFixed(2)),
  })) || [];

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Age Group Distribution</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">Error fetching data</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ageGroup" label={{ value: "Age Group", position: "insideBottom", dy: 10 }} />
            <YAxis label={{ value: "Percentage (%)", angle: -90, position: "insideLeft", dx: -10  }}/>
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
