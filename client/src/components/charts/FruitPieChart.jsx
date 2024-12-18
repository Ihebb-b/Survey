import React, { useState } from "react";
import { useGetFruitStatisticsByCountryQuery } from "../../slices/statsApiSlice";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ResponsiveContainer } from "recharts";

ChartJS.register(ArcElement, Tooltip, Legend);

const FruitPieChart = () => {
  const { data, error, isLoading } = useGetFruitStatisticsByCountryQuery();
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const countries = data?.map((item) => item.country) || [];

  const countryData = data?.find((item) => item.country === selectedCountry);

  const sortedFruitData = countryData
  ? [...countryData.fruitData].sort((a, b) => a.fruitType.localeCompare(b.fruitType))
  : [];
  
  
  const chartData = {
    labels:
    sortedFruitData.map(
        (item) => `${item.fruitType} (${item.fruitUnit})`
      ) || [],
    datasets: [
      {
        data: sortedFruitData.map((item) => item.count) || [],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FFA726",
          "#AB47BC",
          "#29B6F6",
          "#EF5350",
          "#FF7043",
          "#8D6E63",
          "#4DB6AC",
          "#BA68C8",
          "#9575CD",
          "#4FC3F7",
          "#FFB74D",
          "#F06292",
          "#AED581",
          "#7986CB",
          "#64B5F6",
          "#81C784",
          "#E57373",
        ],
        hoverOffset: 4,
      },
    ],
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800">
            Fruit Consumption by Country
          </h1>
          <p className="text-gray-700 text-md">
            Overview of fruit types and units consumed daily by country. Select
            a country for specific data.
          </p>
      <label htmlFor="country-select" className="text-md font-medium">
        Select Country:
      </label>
      <select
        id="country-select"
        className="p-2 border border-gray-300 rounded-md"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">-- Select a Country --</option>
        {countries.map((country, idx) => (
          <option key={idx} value={country}>
            {country}
          </option>
        ))}
      </select>

      {selectedCountry && countryData && (
        <div className="flex justify-center w-full">
          <div className="w-1/2 md:w-3/3 lg:w-1/4">
            <Pie data={chartData} options={{ maintainAspectRatio: true }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FruitPieChart;
