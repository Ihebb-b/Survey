import React from "react";
import GenderStatisticsChart from "../../components/charts/demographic/GenderStatisticsChart";
import AgeGroupDistributionChart from "../../components/charts/demographic/AgeGroupDistributionChart";
import CountryRepresentationChart from "../../components/charts/demographic/CountryRepresentationChart";
import SocialStatusChart from "../../components/charts/demographic/SocialStatusChart";

const DemographicStatistics = () => {
  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Demographic Statistics
      </h1>

      <div className="container mx-auto px-4 flex flex-wrap gap-6 justify-center">
        {/* Gender Statistics Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <GenderStatisticsChart />
        </div>

        {/* Age Group Distribution Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <AgeGroupDistributionChart />
        </div>

        {/* Country Representation Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <CountryRepresentationChart />
        </div>

        {/* Country Representation Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4">
          <SocialStatusChart />
        </div>

        

      </div>
    </>
  );
};

export default DemographicStatistics;
