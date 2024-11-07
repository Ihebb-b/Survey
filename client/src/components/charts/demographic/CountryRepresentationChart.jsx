// CountryRepresentationChart.js
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useGetCountryRepresentationQuery } from "../../../slices/statsApiSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const CountryRepresentationChart = () => {
  const { data, error, isLoading } = useGetCountryRepresentationQuery();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (data && selectedCountry) {
      const countryData = data.countries.find(
        (country) => country.country === selectedCountry
      );

      if (countryData) {
        setChartData({
          labels: [
            `${selectedCountry} (${countryData.percentage.toFixed(2)}%)`,
            `Other Countries (${(100 - countryData.percentage).toFixed(2)}%)`,
          ],
          datasets: [
            {
              label: "Country Representation",
              data: [countryData.percentage, 100 - countryData.percentage],
              backgroundColor: ["#FF5733", "#DCDCDC"],
              borderColor: ["#FF5733", "#DCDCDC"],
              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [data, selectedCountry]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h2 className="text-lg font-semibold text-center mb-2">
        Country Representation
      </h2>
      <p className="text-sm text-gray-600 text-center mb-4">
        This chart shows the distribution of participants across various
        countries in the Mediterranean.
      </p>
      {isLoading ? (
        <p>Loading country data...</p>
      ) : error ? (
        <p className="text-red-500">Error loading country data</p>
      ) : (
        <>
          <div className="mb-4 text-center">
            <select
              className="border border-gray-300 rounded px-2 py-1"
              onChange={handleCountryChange}
              defaultValue=""
            >
              <option value="" disabled>
                Select a country
              </option>
              {data?.countries.map((country) => (
                <option key={country.country} value={country.country}>
                  {country.country}
                </option>
              ))}
            </select>
          </div>

          {chartData ? (
            <div className="w-full h-64">
              <Pie
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
          ) : (
            <p className="text-center text-gray-500">
              Please select a country to view the chart.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CountryRepresentationChart;
