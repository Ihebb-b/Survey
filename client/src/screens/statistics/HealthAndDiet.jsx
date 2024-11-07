import React from "react";
import DietDistributionChart from "../../components/charts/healthAndDiet/DietDistributionChart";
import AverageFruitIntakeChart from "../../components/charts/healthAndDiet/AverageFruitItakeChart";
import AverageVegetableIntakeChart from "../../components/charts/healthAndDiet/AverageVegetableIntakeChart";
import VegetarianVeganPercentageChart from "../../components/charts/healthAndDiet/VegetarianVeganPercentageChart";
import PhysicalActivityRatioChart from "../../components/charts/healthAndDiet/PhysicalActivityRatioChart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HealthAndDiet = () => {

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleSignIn = () => {
    navigate("/login");
  };


  return (
    <>
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Health Diet Statistics
      </h1>

      <div className="container mx-auto px-4 flex flex-wrap gap-6 justify-center">
        {/* Gender Statistics Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <DietDistributionChart />
        </div>

        {/* Vegetarian Vegan Percentage Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <VegetarianVeganPercentageChart />
        </div>

        {userInfo ? (
          <>

        {/* Average Fruit Intake Chart Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <AverageFruitIntakeChart />
        </div>

        {/* Average Vegetable Intake Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <AverageVegetableIntakeChart />
        </div>


        {/* Physical Activity Ratio Chart */}
        <div className="w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-4 transform transition duration-300 hover:scale-105">
          <PhysicalActivityRatioChart />
        </div>  

        </>
        ) : (
          <div className="w-full md:w-1/2 lg:w-1/3 relative flex items-center justify-center bg-white shadow-lg rounded-lg p-4">
            <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-md rounded-lg flex flex-col items-center justify-center p-6">
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

export default HealthAndDiet;
