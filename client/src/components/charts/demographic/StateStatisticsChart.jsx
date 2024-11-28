import React from "react";
import { Bar } from "react-chartjs-2";
import { useGetParticipantsByStateQuery } from "../../../slices/statsApiSlice";

const StateStatisticsChart = ({ selectedState }) => {
  const { data: statistics, isLoading, isError } = useGetParticipantsByStateQuery(
    selectedState,
    {
      skip: !selectedState, // Skip query if no state is selected
    }
  );

  if (!selectedState) {
    return <p>Please select a state to view statistics.</p>;
  }

  if (isLoading) {
    return <p>Loading statistics for {selectedState}...</p>;
  }

  if (isError) {
    return <p>Failed to load statistics. Please try again.</p>;
  }

  if (!statistics || statistics.details.length === 0) {
    return <p>No data available for {selectedState}.</p>;
  }

  const { totalParticipants, uniqueCities, details } = statistics;

  const chartData = {
    labels: details.map((detail) => detail.city),
    datasets: [
      {
        label: "Number of Participants",
        data: details.map((detail) => detail.count),
        backgroundColor: "#9fc5e8",
        borderColor: "#388e3c",
        borderWidth: 1,
        barThickness: 40, 

      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Participants",
        },
        ticks: {
          stepSize: 1, // Ensure it increments by whole numbers
          callback: (value) => value.toFixed(0), // Remove decimals
        },
      },
      x: {
        title: {
          display: true,
          text: "Cities",
        },
        
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.raw} participants (${details[context.dataIndex].percentage})`,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <h5>Total Participants: {totalParticipants}</h5>
      <div style={{ marginTop: "20px" }}>
        <h5>Participants by City</h5>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default StateStatisticsChart;
