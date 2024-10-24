import React, { useEffect } from 'react';
import { useGetMedicalHistoryByFoodChoicesQuery } from '../slices/statsApiSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const MedicalHistoryChart = () => {
  const { data, error, isLoading } = useGetMedicalHistoryByFoodChoicesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <ResponsiveContainer width="50%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="foodChoice" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="householdEatersPercentage" fill="#8884d8" name="Household Eaters" />
        <Bar dataKey="readyToEatFoodPercentage" fill="#82ca9d" name="Ready-to-Eat Food" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MedicalHistoryChart;
