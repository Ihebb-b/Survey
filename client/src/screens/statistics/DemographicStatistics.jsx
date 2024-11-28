import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import GenderStatisticsChart from "../../components/charts/demographic/GenderStatisticsChart";
import AgeGroupDistributionChart from "../../components/charts/demographic/AgeGroupDistributionChart";
import CountryRepresentationChart from "../../components/charts/demographic/CountryRepresentationChart";
import SocialStatusChart from "../../components/charts/demographic/SocialStatusChart";
import AverageChildrenChart from "../../components/charts/demographic/AverageChildrenChart";

const DemographicStatistics = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-4xl mt-24 font-bold text-center text-black mb-6">
        Demographic Statistics
      </h1>

      <div className="container mx-auto px-4 flex flex-wrap gap-6 justify-center relative">
        {/* Always-visible Charts (first two) */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <GenderStatisticsChart />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <AgeGroupDistributionChart />
        </div>

        {/* Conditionally blurred charts */}
        <div className={`w-full flex flex-wrap gap-6 justify-center ${!userInfo && 'blur-md'}`}>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
            <CountryRepresentationChart />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
            <SocialStatusChart />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
            <AverageChildrenChart />
          </div>
        </div>

        {/* Sign-in overlay for locked charts */}
        {!userInfo && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 rounded-lg">
            <div className="w-full md:w-1/2 lg:w-1/3 bg-white/70 backdrop-blur-lg shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
              <p className="text-lg text-gray-700 text-center mb-4">
                Sign in to view more statistics
              </p>
              <button
                onClick={handleSignIn}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DemographicStatistics;
