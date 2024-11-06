import React from "react";
import GenderStatisticsChart from "../../components/charts/demographic/GenderStatisticsChart";
import AgeGroupDistributionChart from "../../components/charts/demographic/AgegroupDistributionChart";

const DemographicStatistics = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Demographic Statistics
      </h1>

      <div className="container mx-auto px-4 flex flex-wrap gap-4 justify-center">
        {/* Gender Statistics Chart */}
        <div className="flex flex-col items-center w-full md:w-[48%] lg:w-[45%] bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-center mb-2">Gender Distribution</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            This chart represents the distribution of genders among surveyed individuals.
          </p>
          <div className="w-full h-64">
            <GenderStatisticsChart />
          </div>
        </div>

        {/* Age Group Distribution Chart */}
        <div className="flex flex-col items-center w-full md:w-[48%] lg:w-[45%] bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-center mb-2">Age Group Distribution</h2>
          <p className="text-sm text-gray-600 text-center mb-4">
            This chart shows the distribution of various age groups in the surveyed population.
          </p>
          <div className="w-full h-64">
            <AgeGroupDistributionChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default DemographicStatistics;
