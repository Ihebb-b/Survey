import React from "react";
import { useGetEatingHabitsByAgeQuery } from "../../slices/statsApiSlice";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EatingHabitsChart = () => {
  const { data, error, isLoading } = useGetEatingHabitsByAgeQuery();

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Eating Habits by Age" },
    },
  };

  const chartData = {
    labels: data?.map((item) => item.age) || [],
    datasets: [
      {
        label: "Traditional Eating",
        data: data?.map((item) => item.traditionalPercentage) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "New Eating",
        data: data?.map((item) => item.newEatingPercentage) || [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="w-full h-f flex flex-col items-center">

    <h1 className="text-xl font-semibold text-gray-800">
              Eating Habits
            </h1>
            <p className="text-gray-600 text-sm">
              A comparative analysis of traditional vs. modern eating habits
              across Mediterranean age groups.
            </p>
    
    <div style={{ width:"100%", minHeight: "500px" }}>
      
      <Bar options={options} data={chartData} />
    </div>
    </div>
  );
};

export default EatingHabitsChart;
