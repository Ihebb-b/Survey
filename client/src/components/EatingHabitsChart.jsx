import React from 'react';
import { useGetEatingHabitsByEthnicityAndAgeQuery } from '../slices/statsApiSlice';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EatingHabitsChart = () => {
  const { data, error, isLoading } = useGetEatingHabitsByEthnicityAndAgeQuery();

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Eating Habits by Ethnicity' }, 
    },
  };

  
  const chartData = {
    labels: data?.map(item => item.ethnicity) || [], 
    datasets: [
      {
        label: 'Traditional Eating',
        data: data?.map(item => item.traditionalPercentage) || [], 
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'New Eating',
        data: data?.map(item => item.newEatingPercentage) || [], 
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div style={{ width: '600px', height: '500px' }}> 
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default EatingHabitsChart;