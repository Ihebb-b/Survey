import React, { useEffect, useState } from "react";
import { useGetMedicalHistoryByFoodChoicesQuery } from "../../slices/statsApiSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MedicalHistoryChart = () => {
  const { data, error, isLoading } = useGetMedicalHistoryByFoodChoicesQuery();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data) {
      // Transform the data to prepare for chart display
      const transformedData = data.map((item) => {
        const homemadeConsumption = item.foodStatistics
          .filter((stat) => stat.foodType === "homemade")
          .reduce((acc, curr) => {
            acc[curr.consumption] = (acc[curr.consumption] || 0) + curr.count;
            return acc;
          }, {});

        const orderedConsumption = item.foodStatistics
          .filter((stat) => stat.foodType === "ordered")
          .reduce((acc, curr) => {
            acc[curr.consumption] = (acc[curr.consumption] || 0) + curr.count;
            return acc;
          }, {});

        return {
          medicalHistory: item._id,
          ...Object.keys(homemadeConsumption).reduce((acc, key) => {
            acc[`homemade_${key}`] = homemadeConsumption[key];
            return acc;
          }, {}),
          ...Object.keys(orderedConsumption).reduce((acc, key) => {
            acc[`ordered_${key}`] = orderedConsumption[key];
            return acc;
          }, {}),
        };
      });

      setChartData(transformedData);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ResponsiveContainer width="100%" maxHeight={500}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="medicalHistory" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar
          dataKey="homemade_Every Day"
          fill="#8884d8"
          name="Homemade - Every Day"
        />
        <Bar
          dataKey="homemade_2-3 Times a Week"
          fill="#83a6ed"
          name="Homemade - 2-3 Times a Week"
        />
        <Bar
          dataKey="homemade_1-2 Times a Week"
          fill="#8dd1e1"
          name="Homemade - 1-2 Times a Week"
        />
        <Bar
          dataKey="homemade_1-2 Times a Month"
          fill="#82ca9d"
          name="Homemade - 1-2 Times a Month"
        />
        <Bar
          dataKey="homemade_Rarely"
          fill="#a4de6c"
          name="Homemade - Rarely"
        />
        <Bar dataKey="homemade_Never" fill="#d0ed57" name="Homemade - Never" />

        <Bar
          dataKey="ordered_Every Day"
          fill="#ffc658"
          name="Ordered - Every Day"
        />
        <Bar
          dataKey="ordered_2-3 Times a Week"
          fill="#ff8042"
          name="Ordered - 2-3 Times a Week"
        />
        <Bar
          dataKey="ordered_1-2 Times a Week"
          fill="#ffbb28"
          name="Ordered - 1-2 Times a Week"
        />
        <Bar
          dataKey="ordered_1-2 Times a Month"
          fill="#ff9999"
          name="Ordered - 1-2 Times a Month"
        />
        <Bar dataKey="ordered_Rarely" fill="#ff6666" name="Ordered - Rarely" />
        <Bar dataKey="ordered_Never" fill="#ff3333" name="Ordered - Never" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MedicalHistoryChart;
